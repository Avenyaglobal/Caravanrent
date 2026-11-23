const BASE = "https://kvdb.io/WTFgBCizawrnS1nj5gw9kg";

export type Look = {
  vehicle?: string;
  from?: string;
  to?: string;
  total?: number;
  session?: string;
  at?: string;
};

function keyFor(row: Look) {
  if (row.session?.startsWith("digest-")) return `d-${row.session.slice("digest-".length)}`;
  const stamp = (row.at || new Date().toISOString()).replace(/[^0-9]/g, "").slice(0, 17);
  return `l-${stamp}-${Math.random().toString(36).slice(2, 10)}`;
}

function bust(path: string) {
  const join = path.includes("?") ? "&" : "?";
  return `${path}${join}t=${Date.now()}`;
}

async function kv(path: string, init?: RequestInit) {
  const response = await fetch(`${BASE}${path}`, {
    ...init,
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
    headers: { "cache-control": "no-cache", ...init?.headers },
  });
  if (!response.ok) throw new Error(`box ${response.status}`);
  return response;
}

async function rows(prefix: string) {
  const response = await kv(bust(`/?prefix=${encodeURIComponent(prefix)}&values=true&format=json`));
  const data = (await response.json()) as unknown;
  if (!Array.isArray(data)) return [] as Look[];
  const looks: Look[] = [];
  for (const pair of data) {
    if (!Array.isArray(pair) || typeof pair[1] !== "string") continue;
    try {
      looks.push(JSON.parse(pair[1]) as Look);
    } catch {
      // Not one of our records.
    }
  }
  return looks;
}

export async function saveLook(row: Look) {
  await kv(`/${keyFor(row)}`, { method: "POST", body: JSON.stringify(row) });
}

export async function readLooks() {
  const [looks, marks] = await Promise.all([rows("l-"), rows("d-")]);
  return [...looks, ...marks];
}

export async function daySent(day: string) {
  const response = await fetch(`${BASE}/${bust(`d-${day}`)}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
    headers: { "cache-control": "no-cache" },
  });
  if (response.status === 404) return false;
  if (!response.ok) throw new Error(`box ${response.status}`);
  return (await response.text()).includes(`"session":"digest-${day}"`);
}

// Atomic counter: only the caller that receives "1" may send.
export async function takeTurn(day: string) {
  const response = await kv(`/n-${day}`, { method: "PATCH", body: "+1" });
  return (await response.text()).trim() === "1";
}

export async function releaseTurn(day: string) {
  await kv(`/n-${day}`, { method: "POST", body: "0" });
}

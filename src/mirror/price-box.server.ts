const TOKEN = "308d4b154e16b8bb25317694a3d51da87a2559947e665425e7b4d0468b13";
const PATH = "Caravan-price-looks-11-24";
const TITLE = "Caravan price looks";

export type Look = {
  vehicle?: string;
  from?: string;
  to?: string;
  total?: number;
  session?: string;
  at?: string;
};

type State = { sent: string; looks: Look[] };

function textOf(content: unknown) {
  const node = Array.isArray(content) ? content[0] : undefined;
  const children = node && typeof node === "object" && "children" in node ? (node as { children: unknown }).children : [];
  if (!Array.isArray(children)) return "";
  return children.map((part) => (typeof part === "string" ? part : "")).join("");
}

function parseState(content: unknown): State {
  try {
    const data = JSON.parse(textOf(content)) as { sent?: string; looks?: Look[] };
    return { sent: String(data.sent || ""), looks: Array.isArray(data.looks) ? data.looks : [] };
  } catch {
    return { sent: "", looks: [] };
  }
}

async function getState() {
  const response = await fetch(`https://api.telegra.ph/getPage/${PATH}?return_content=true`, {
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
    headers: { "cache-control": "no-cache" },
  });
  if (!response.ok) throw new Error(`box ${response.status}`);
  const json = (await response.json()) as { ok?: boolean; result?: { content?: unknown } };
  if (!json.ok) throw new Error("box page");
  return parseState(json.result?.content);
}

async function putState(state: State) {
  const body = new URLSearchParams();
  body.set("access_token", TOKEN);
  body.set("path", PATH);
  body.set("title", TITLE);
  body.set("content", JSON.stringify([{ tag: "pre", children: [JSON.stringify({ sent: state.sent, looks: state.looks })] }]));
  const response = await fetch("https://api.telegra.ph/editPage", {
    method: "POST",
    body,
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`box ${response.status}`);
  const json = (await response.json()) as { ok?: boolean };
  if (!json.ok) throw new Error("box write");
}

export async function readLooks() {
  return (await getState()).looks;
}

export async function saveLook(row: Look) {
  const state = await getState();
  const looks = [...state.looks, row]
    .filter((item) => {
      const at = Date.parse(item.at || "");
      return !item.at || Date.now() - at < 4 * 86400000;
    })
    .slice(-200);
  await putState({ sent: state.sent, looks });
}

export async function claimDay(day: string) {
  const state = await getState();
  if (state.sent === day) return false;
  await putState({ sent: day, looks: state.looks });
  return true;
}

export async function releaseDay(day: string) {
  const state = await getState();
  if (state.sent !== day) return;
  await putState({ sent: "", looks: state.looks });
}

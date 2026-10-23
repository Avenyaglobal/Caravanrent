import { readFile, writeFile } from "node:fs/promises";

async function readText(path) {
  try {
    return (await readFile(path, "utf8")).trim();
  } catch {
    return "";
  }
}

async function pause(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function createStore() {
  let last = "network";
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      const created = await fetch("https://crudcrud.com/api", { method: "POST" });
      last = String(created.status);
      if (created.ok) {
        const id = (await created.text()).trim().replace(/^"|"$/g, "");
        if (/^[a-f0-9]{32}$/i.test(id)) return `https://crudcrud.com/api/${id}/looks`;
        last = `bad id ${id}`;
      }
    } catch (error) {
      last = error instanceof Error ? error.message : "network";
    }
    await pause(4000 * attempt);
  }
  throw new Error(`create ${last}`);
}

function keep(row) {
  if (!row || !row.vehicle || !row.from || !row.to) return false;
  const at = Date.parse(row.at || "");
  return !Number.isFinite(at) || at >= Date.now() - 36 * 60 * 60 * 1000;
}

const current = await readText("data/store-url.txt");
if (!current.startsWith("https://crudcrud.com/api/")) throw new Error("no store");
let rows = [];
let last = "network";
for (let attempt = 1; attempt <= 5; attempt += 1) {
  const listed = await fetch(current);
  last = String(listed.status);
  if (listed.ok) {
    const data = await listed.json();
    if (!Array.isArray(data)) throw new Error("store was not a list");
    rows = data.filter(keep);
    last = "";
    break;
  }
  if (listed.status < 500 && listed.status !== 429) break;
  await pause(4000 * attempt);
}
if (last) throw new Error(`store read ${last}`);

const next = await createStore();
for (const row of rows) {
  const saved = await fetch(next, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      vehicle: row.vehicle,
      from: row.from,
      to: row.to,
      total: row.total,
      session: row.session || "",
      at: row.at,
    }),
  });
  if (!saved.ok) console.error("copy failed", saved.status);
}
await writeFile("data/store-url.txt", `${next}\n`);
console.log("refreshed", rows.length, next);

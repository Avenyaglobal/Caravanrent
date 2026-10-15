import { readFile, writeFile } from "node:fs/promises";

async function readText(path) {
  try {
    return (await readFile(path, "utf8")).trim();
  } catch {
    return "";
  }
}

async function createStore() {
  const created = await fetch("https://crudcrud.com/api", { method: "POST" });
  if (!created.ok) throw new Error(`create ${created.status}`);
  const id = (await created.text()).trim().replace(/^"|"$/g, "");
  if (!/^[a-f0-9]{32}$/i.test(id)) throw new Error(`bad id ${id}`);
  return `https://crudcrud.com/api/${id}/looks`;
}

function keep(row) {
  if (!row || !row.vehicle || !row.from || !row.to) return false;
  const at = Date.parse(row.at || "");
  return !Number.isFinite(at) || at >= Date.now() - 36 * 60 * 60 * 1000;
}

const current = await readText("data/store-url.txt");
let rows = [];
if (current.startsWith("https://crudcrud.com/api/")) {
  const listed = await fetch(current);
  if (listed.ok) {
    const data = await listed.json();
    if (Array.isArray(data)) rows = data.filter(keep);
    else console.log("unexpected store body");
  } else {
    console.log("old store unreadable", listed.status);
  }
}

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

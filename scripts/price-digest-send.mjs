import { readFile, writeFile } from "node:fs/promises";

const ORDER = ["fiat-mclouis-mc4-379", "ford-weinsberg", "peugeot-chausson"];
const NAMES = {
  "fiat-mclouis-mc4-379": "Фиат",
  "ford-weinsberg": "Форд",
  "peugeot-chausson": "Пежо",
};
const EMPTY = "За прошедшие сутки просмотров цен не было.";

function madrid(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

function pretty(iso) {
  const [, month, day] = String(iso).split("-");
  return `${day}.${month}`;
}

function fresh(rows) {
  const cutoff = Date.now() - 30 * 60 * 60 * 1000;
  const seen = new Set();
  const next = [];
  for (const row of rows) {
    const at = Date.parse(row.at || "");
    if (Number.isFinite(at) && at < cutoff) continue;
    const key = `${row.vehicle}|${row.from}|${row.to}|${row.total}|${row.session}`;
    if (seen.has(key)) continue;
    seen.add(key);
    next.push(row);
  }
  return next;
}

function letter(rows) {
  const blocks = [];
  for (const id of ORDER) {
    const list = rows.filter((row) => row.vehicle === id);
    if (!list.length) continue;
    const lines = list.map((row, index) => `${index + 1}. ${pretty(row.from)}–${pretty(row.to)} — ${row.total} €`);
    blocks.push([NAMES[id], "", lines.join("\n\n")].join("\n"));
  }
  return blocks.length ? `${blocks.join("\n\n")}\n` : `${EMPTY}\n`;
}

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

const clock = madrid();
const today = `${clock.year}-${clock.month}-${clock.day}`;
const hour = Number(clock.hour);
const forced = process.env.FORCE === "1";
if (!forced && hour !== 8) {
  console.log(`skip hour ${clock.hour}`);
  process.exit(0);
}
if (!forced && (await readText("data/digest-day.txt")) === today) {
  console.log("already sent today");
  process.exit(0);
}

const url = await readText("data/store-url.txt");
let rows = [];
if (url.startsWith("https://crudcrud.com/api/")) {
  const listed = await fetch(url);
  if (listed.ok) {
    const data = await listed.json();
    if (Array.isArray(data)) rows = fresh(data);
    else console.error("store was not a list");
  } else {
    console.error("store read", listed.status);
  }
}
const text = letter(rows);
await writeFile("data/digest-letter.txt", text);
console.log("letter", rows.length);

const nextUrl = await createStore();
await writeFile("data/store-url.txt", `${nextUrl}\n`);
await writeFile("data/digest-day.txt", `${today}\n`);
console.log("rotated", nextUrl);

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

function plausible(row) {
  if (!ORDER.includes(row.vehicle)) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(row.from) || !/^\d{4}-\d{2}-\d{2}$/.test(row.to)) return false;
  const total = Number(row.total);
  if (!Number.isInteger(total) || total < 200 || total > 30000) return false;
  const day = (iso) => {
    const [year, month, date] = iso.split("-").map(Number);
    const value = new Date(Date.UTC(year, month - 1, date));
    return value.getUTCFullYear() === year && value.getUTCMonth() === month - 1 && value.getUTCDate() === date
      ? value.getTime()
      : NaN;
  };
  const days = (day(row.to) - day(row.from)) / 86400000;
  return Number.isFinite(days) && days >= 2 && days <= 90;
}

function fresh(rows) {
  const cutoff = Date.now() - 30 * 60 * 60 * 1000;
  const seen = new Set();
  const next = [];
  for (const row of rows) {
    if (!plausible(row)) continue;
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

async function readLooks(url) {
  let last = "network";
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      const listed = await fetch(url);
      last = String(listed.status);
      if (listed.ok) {
        const data = await listed.json();
        if (!Array.isArray(data)) throw new Error("store was not a list");
        return data;
      }
      if (listed.status < 500 && listed.status !== 429) break;
    } catch (error) {
      last = error instanceof Error ? error.message : "network";
    }
    await pause(4000 * attempt);
  }
  throw new Error(`store read ${last}`);
}

const clock = madrid();
const today = `${clock.year}-${clock.month}-${clock.day}`;
const hour = Number(clock.hour);
const forced = process.env.FORCE === "1";
if (!forced && (hour < 7 || hour > 10)) {
  console.log(`skip hour ${clock.hour}`);
  process.exit(0);
}
if (!forced && (await readText("data/digest-day.txt")) === today) {
  console.log("already sent today");
  process.exit(0);
}

const url = await readText("data/store-url.txt");
if (!url.startsWith("https://crudcrud.com/api/")) throw new Error("no store");
const rows = fresh(await readLooks(url));
const text = `${today}\n${letter(rows)}`;
await writeFile("data/digest-letter.txt", text);
await writeFile("public/price-letter.txt", text);
console.log("letter", rows.length);

try {
  const nextUrl = await createStore();
  await writeFile("data/store-url.txt", `${nextUrl}\n`);
  console.log("rotated", nextUrl);
} catch (error) {
  console.error("keep current store", error instanceof Error ? error.message : error);
}
await writeFile("data/digest-day.txt", `${today}\n`);

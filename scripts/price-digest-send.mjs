import { readFile, writeFile } from "node:fs/promises";

const TO = "info@caravanrent-alicante.com";
const ORDER = ["fiat-mclouis-mc4-379", "ford-weinsberg", "peugeot-chausson"];
const NAMES = {
  "fiat-mclouis-mc4-379": "Фиат",
  "ford-weinsberg": "Форд",
  "peugeot-chausson": "Пежо",
};

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

function letter(rows) {
  const blocks = [];
  for (const id of ORDER) {
    const list = rows.filter((row) => row.vehicle === id);
    if (!list.length) continue;
    const lines = list.map((row, index) => `${index + 1}  ${pretty(row.from)}–${pretty(row.to)} — ${row.total} €`);
    blocks.push(`${NAMES[id]}\n${lines.join("\n")}`);
  }
  return blocks.join("\n\n");
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

async function readText(path) {
  try {
    return (await readFile(path, "utf8")).trim();
  } catch {
    return "";
  }
}

const clock = madrid();
const today = `${clock.year}-${clock.month}-${clock.day}`;
const hour = Number(clock.hour);
if (hour < 9 || hour > 11) {
  console.log(`skip hour ${clock.hour}`);
  process.exit(0);
}
if ((await readText("data/digest-day.txt")) === today) {
  console.log("already sent today");
  process.exit(0);
}

const url = await readText("data/store-url.txt");
if (!url.startsWith("https://crudcrud.com/api/")) {
  console.error("missing store");
  process.exit(1);
}

const listed = await fetch(url);
if (!listed.ok) {
  console.error("store read", listed.status);
  process.exit(1);
}
const rows = fresh(await listed.json());
const text = letter(rows);
if (text) {
  const response = await fetch(`https://formsubmit.co/ajax/${TO}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: "Календарь сайта",
      email: TO,
      _subject: `Просмотры цен ${clock.day}.${clock.month}.${clock.year}`,
      _template: "box",
      _captcha: "false",
      message: text,
    }),
  });
  if (!response.ok) {
    console.error("mail", response.status);
    process.exit(1);
  }
  console.log("mailed", rows.length);
} else {
  console.log("empty");
}

const created = await fetch("https://crudcrud.com/api", { method: "POST" });
if (!created.ok) {
  console.error("new store", created.status);
  process.exit(1);
}
const id = (await created.text()).trim();
const nextUrl = `https://crudcrud.com/api/${id}/looks`;
const again = await fetch(url);
const leftovers = again.ok ? fresh(await again.json()) : [];
const sent = new Set(rows.map((row) => row._id));
for (const row of leftovers) {
  if (sent.has(row._id)) continue;
  await fetch(nextUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      vehicle: row.vehicle,
      from: row.from,
      to: row.to,
      total: row.total,
      session: row.session,
      at: row.at,
    }),
  });
}
await writeFile("data/store-url.txt", `${nextUrl}\n`);
await writeFile("data/digest-day.txt", `${today}\n`);
console.log("rotated");

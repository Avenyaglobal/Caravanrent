import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const FILE = "/workspace/data/price-looks.json";
const TO = "info@caravanrent-alicante.com";
const ORDER = ["fiat-mclouis-mc4-379", "ford-weinsberg", "peugeot-chausson"];
const NAMES = {
  "fiat-mclouis-mc4-379": "Фиат",
  "ford-weinsberg": "Форд",
  "peugeot-chausson": "Пежо",
};

function madrid(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

function dayKey(parts) {
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function pretty(iso) {
  const [, month, day] = iso.split("-");
  return `${day}.${month}`;
}

export function digestText(looks) {
  const pending = looks.filter((look) => !look.sent);
  const blocks = [];
  for (const id of ORDER) {
    const rows = pending.filter((look) => look.vehicle === id);
    if (!rows.length) continue;
    const lines = rows.map((look, index) => `${index + 1}  ${pretty(look.from)}–${pretty(look.to)} — ${look.total} €`);
    blocks.push(`${NAMES[id]}\n${lines.join("\n")}`);
  }
  return blocks.join("\n\n");
}

async function readStore() {
  try {
    const parsed = JSON.parse(await readFile(FILE, "utf8"));
    if (!parsed || !Array.isArray(parsed.looks)) return { looks: [], digestDay: "" };
    return { looks: parsed.looks, digestDay: parsed.digestDay || "" };
  } catch {
    return { looks: [], digestDay: "" };
  }
}

async function writeStore(store) {
  await mkdir(dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(store));
}

export async function sendDigest(now = new Date()) {
  const parts = madrid(now);
  const today = dayKey(parts);
  if (parts.hour !== "09" || Number(parts.minute) > 10) return { sent: false, reason: "time" };
  const store = await readStore();
  if (store.digestDay === today) return { sent: false, reason: "already" };
  const text = digestText(store.looks);
  if (!text) {
    store.digestDay = today;
    await writeStore(store);
    return { sent: false, reason: "empty" };
  }
  const response = await fetch(`https://formsubmit.co/ajax/${TO}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: "Календарь сайта",
      email: TO,
      _subject: `Просмотры цен ${parts.day}.${parts.month}.${parts.year}`,
      _template: "box",
      _captcha: "false",
      message: text,
    }),
  });
  if (!response.ok) return { sent: false, reason: `mail ${response.status}` };
  const ids = new Set(store.looks.filter((look) => !look.sent).map((look) => look.id));
  const fresh = await readStore();
  for (const look of fresh.looks) {
    if (ids.has(look.id)) look.sent = true;
  }
  fresh.digestDay = today;
  await writeStore(fresh);
  return { sent: true };
}

const isMain = process.argv[1] && import.meta.url === new URL(process.argv[1], "file:").href;
if (isMain) {
  const started = madrid();
  console.log(`price digest waiting, Madrid ${started.hour}:${started.minute}`);
  setInterval(() => {
    sendDigest().catch((error) => console.error("price digest", error));
  }, 30_000);
  sendDigest().catch((error) => console.error("price digest", error));
}

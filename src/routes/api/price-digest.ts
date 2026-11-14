import { createFileRoute } from "@tanstack/react-router";
import nodemailer from "nodemailer";

const TO = ["info@caravanrent-alicante.com", "caravanrentalicante@gmail.com"];
const ORDER = ["fiat-mclouis-mc4-379", "ford-weinsberg", "peugeot-chausson"] as const;
const NAMES: Record<(typeof ORDER)[number], string> = {
  "fiat-mclouis-mc4-379": "Фиат",
  "ford-weinsberg": "Форд",
  "peugeot-chausson": "Пежо",
};
const EMPTY = "За прошедшие сутки просмотров цен не было.";

type Look = {
  vehicle?: string;
  from?: string;
  to?: string;
  total?: number;
  session?: string;
  at?: string;
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

function pretty(iso: string) {
  const [, month, day] = iso.split("-");
  return `${day}.${month}`;
}

function plausible(row: Look) {
  if (!row.vehicle || !ORDER.includes(row.vehicle as (typeof ORDER)[number])) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(row.from || "") || !/^\d{4}-\d{2}-\d{2}$/.test(row.to || "")) return false;
  const total = Number(row.total);
  if (!Number.isInteger(total) || total < 200 || total > 30000) return false;
  const day = (iso: string) => {
    const [year, month, date] = iso.split("-").map(Number);
    const value = new Date(Date.UTC(year, month - 1, date));
    return value.getUTCFullYear() === year && value.getUTCMonth() === month - 1 && value.getUTCDate() === date
      ? value.getTime()
      : NaN;
  };
  const days = (day(row.to || "") - day(row.from || "")) / 86400000;
  return Number.isFinite(days) && days >= 2 && days <= 90;
}

function letter(rows: Look[]) {
  const blocks: string[] = [];
  for (const id of ORDER) {
    const list = rows.filter((row) => row.vehicle === id);
    if (!list.length) continue;
    const lines = list.map((row, index) => `${index + 1}. ${pretty(row.from || "")}–${pretty(row.to || "")} — ${row.total} €`);
    blocks.push([NAMES[id], "", lines.join("\n\n")].join("\n"));
  }
  return blocks.length ? `${blocks.join("\n\n")}\n` : `${EMPTY}\n`;
}

async function readStore() {
  const meta = await fetch("https://raw.githubusercontent.com/Avenyaglobal/Caravanrent/main/data/store-url.txt", {
    cache: "no-store",
  });
  if (!meta.ok) throw new Error("store url");
  const url = (await meta.text()).trim();
  if (!url.startsWith("https://crudcrud.com/api/") || !url.endsWith("/looks")) throw new Error("store url");
  const listed = await fetch(url, { cache: "no-store" });
  if (!listed.ok) throw new Error(`store ${listed.status}`);
  const data = (await listed.json()) as Look[];
  if (!Array.isArray(data)) throw new Error("store");
  return { url, data };
}

export const Route = createFileRoute("/api/price-digest")({
  server: {
    handlers: {
      GET: async () => {
        const clock = madrid();
        const hour = Number(clock.hour);
        if (hour < 9 || hour > 11) return Response.json({ sent: false, reason: "hour", hour });
        const today = `${clock.year}-${clock.month}-${clock.day}`;
        const { url, data } = await readStore();
        if (data.some((row) => row.session === `digest-${today}`)) {
          return Response.json({ sent: false, reason: "already" });
        }
        const cutoff = Date.now() - 25 * 60 * 60 * 1000;
        const rows = data.filter((row) => plausible(row) && Date.parse(row.at || "") > cutoff);
        const text = letter(rows);
        const pass = process.env.SMTP_PASS;
        if (!pass) return Response.json({ sent: false, reason: "smtp" }, { status: 500 });
        const transport = nodemailer.createTransport({
          host: "smtp.titan.email",
          port: 465,
          secure: true,
          auth: { user: "info@caravanrent-alicante.com", pass },
        });
        await transport.sendMail({
          from: "Caravan Rent Alicante <info@caravanrent-alicante.com>",
          to: TO.join(", "),
          subject: `Просмотры цен ${clock.day}.${clock.month}.${clock.year}`,
          text,
        });
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            vehicle: "digest",
            from: today,
            to: today,
            total: 0,
            session: `digest-${today}`,
            at: new Date().toISOString(),
          }),
        });
        return Response.json({ sent: true, count: rows.length });
      },
    },
  },
});

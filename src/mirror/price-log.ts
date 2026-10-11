import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";

const TO = "info@caravanrent-alicante.com";
const known = new Set(["ford-weinsberg", "peugeot-chausson", "fiat-mclouis-mc4-379"]);
const order = ["fiat-mclouis-mc4-379", "ford-weinsberg", "peugeot-chausson"] as const;
const names: Record<(typeof order)[number], string> = {
  "fiat-mclouis-mc4-379": "Фиат",
  "ford-weinsberg": "Форд",
  "peugeot-chausson": "Пежо",
};

type LookRow = { id: number; vehicle: string; from_date: string; to_date: string; total: number };

function pretty(iso: string) {
  const [, month, day] = iso.split("-");
  return `${day}.${month}`;
}

function letter(rows: LookRow[]) {
  const blocks: string[] = [];
  for (const id of order) {
    const list = rows.filter((row) => row.vehicle === id);
    if (!list.length) continue;
    const lines = list.map((row, index) => `${index + 1}  ${pretty(row.from_date)}–${pretty(row.to_date)} — ${row.total} €`);
    blocks.push(`${names[id]}\n${lines.join("\n")}`);
  }
  return blocks.join("\n\n");
}

function madridHour(now: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    hour: "2-digit",
    hourCycle: "h23",
  }).format(now);
}

export const logPriceLook = createServerFn({ method: "POST" })
  .inputValidator((input: { vehicle: string; from: string; to: string; total: number; session: string }) => {
    if (!input || !known.has(input.vehicle)) throw new Error("vehicle");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.from) || !/^\d{4}-\d{2}-\d{2}$/.test(input.to)) throw new Error("dates");
    if (!Number.isFinite(input.total)) throw new Error("total");
    return {
      vehicle: input.vehicle,
      from: input.from,
      to: input.to,
      total: Math.round(input.total),
      session: String(input.session || "").slice(0, 40),
    };
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      insert into price_looks (vehicle, from_date, to_date, total, session)
      select ${data.vehicle}, ${data.from}, ${data.to}, ${data.total}, ${data.session}
      where not exists (
        select 1 from price_looks
        where sent_at is null
          and vehicle = ${data.vehicle}
          and from_date = ${data.from}::date
          and to_date = ${data.to}::date
          and total = ${data.total}
          and session = ${data.session}
          and created_at > now() - interval '1 day'
      )
    `;
    return { ok: true as const };
  });

export async function sendPriceDigest(now = new Date()) {
  if (madridHour(now) !== "09") return { sent: false as const, reason: "time" };
  const sql = await getSql();
  const rows = await sql<LookRow>`
    select id, vehicle, from_date::text as from_date, to_date::text as to_date, total
    from price_looks
    where sent_at is null
      and created_at > now() - interval '26 hours'
    order by created_at
  `;
  const text = letter(rows);
  if (!text) {
    await sql`delete from price_looks where created_at < now() - interval '2 days'`;
    return { sent: false as const, reason: "empty" };
  }
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(now);
  const stamp = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const response = await fetch(`https://formsubmit.co/ajax/${TO}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: "Календарь сайта",
      email: TO,
      _subject: `Просмотры цен ${stamp.day}.${stamp.month}.${stamp.year}`,
      _template: "box",
      _captcha: "false",
      message: text,
    }),
  });
  if (!response.ok) return { sent: false as const, reason: "mail" };
  for (const row of rows) await sql`delete from price_looks where id = ${row.id}`;
  return { sent: true as const };
}

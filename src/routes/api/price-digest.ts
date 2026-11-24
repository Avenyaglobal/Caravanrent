import { createFileRoute } from "@tanstack/react-router";
import nodemailer from "nodemailer";

const TO = "caravanrentalicante@gmail.com";
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

function answer(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

export const Route = createFileRoute("/api/price-digest")({
  server: {
    handlers: {
      GET: async () => {
        const clock = madrid();
        const hour = Number(clock.hour);
        if (hour < 8 || hour > 22) return answer({ sent: false, reason: "hour", hour });
        const today = `${clock.year}-${clock.month}-${clock.day}`;
        const pass = process.env.SMTP_PASS;
        if (!pass) return answer({ sent: false, reason: "smtp" }, 500);
        const { readLooks, saveLook, daySent, takeTurn, releaseTurn, markStarted, startedAt } = await import(
          "@/mirror/price-box.server"
        );
        const failed = (error: unknown, reason: string) => {
          const message = error instanceof Error ? error.message.replace(pass, "***").slice(-240) : reason;
          return answer({ sent: false, reason, message }, 500);
        };
        const ownTheSend = async () => {
          if (await daySent(today)) return false;
          const turn = await takeTurn(today);
          if (turn === 1) {
            await markStarted(today);
            return true;
          }
          await new Promise((resolve) => setTimeout(resolve, 2500));
          if (await daySent(today)) return false;
          const since = Date.parse(await startedAt(today));
          if (Number.isFinite(since) && Date.now() - since < 3 * 60 * 1000) return false;
          await releaseTurn(today);
          if ((await takeTurn(today)) !== 1) return false;
          await markStarted(today);
          return true;
        };
        let owned = false;
        try {
          owned = await ownTheSend();
        } catch (error) {
          return failed(error, "box");
        }
        if (!owned) return answer({ sent: false, reason: "already" });
        let data: Look[] = [];
        try {
          data = await readLooks();
        } catch (error) {
          await releaseTurn(today).catch(() => undefined);
          return failed(error, "box");
        }
        const cutoff = Date.now() - 25 * 60 * 60 * 1000;
        const rows = data.filter((row) => plausible(row) && Date.parse(row.at || "") > cutoff);
        const text = letter(rows);
        const transport = nodemailer.createTransport({
          host: "smtp.titan.email",
          port: 465,
          secure: true,
          auth: { user: "info@caravanrent-alicante.com", pass },
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 15000,
        });
        try {
          await transport.sendMail({
            from: "Caravan Rent Alicante <info@caravanrent-alicante.com>",
            to: TO,
            subject: `Просмотры цен ${clock.day}.${clock.month}.${clock.year}`,
            text,
          });
        } catch (error) {
          await releaseTurn(today).catch(() => undefined);
          return failed(error, "mail");
        }
        let marked = false;
        for (let attempt = 0; attempt < 2 && !marked; attempt += 1) {
          try {
            await saveLook({
              vehicle: "digest",
              from: today,
              to: today,
              total: 0,
              session: `digest-${today}`,
              at: new Date().toISOString(),
            });
            marked = true;
          } catch {
            marked = false;
          }
        }
        return answer({ sent: true, count: rows.length, marked });
      },
    },
  },
});

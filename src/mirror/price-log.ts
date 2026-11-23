import { createServerFn } from "@tanstack/react-start";

const known = new Set(["ford-weinsberg", "peugeot-chausson", "fiat-mclouis-mc4-379"]);

function realDay(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
    ? date.getTime()
    : NaN;
}

export const logPriceLook = createServerFn({ method: "POST" })
  .inputValidator((input: { vehicle: string; from: string; to: string; total: number; session: string }) => {
    if (!input || !known.has(input.vehicle)) throw new Error("vehicle");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.from) || !/^\d{4}-\d{2}-\d{2}$/.test(input.to)) throw new Error("dates");
    const from = realDay(input.from);
    const to = realDay(input.to);
    const span = (to - from) / 86400000;
    if (!Number.isFinite(span) || span < 2 || span > 90) throw new Error("dates");
    if (!Number.isFinite(input.total) || input.total < 200 || input.total > 30000) throw new Error("total");
    return {
      vehicle: input.vehicle,
      from: input.from,
      to: input.to,
      total: Math.round(input.total),
      session: String(input.session || "").replace(/[^a-z0-9-]/gi, "").slice(0, 40),
    };
  })
  .handler(async ({ data }) => {
    const { saveLook } = await import("./price-box.server");
    await saveLook({ ...data, at: new Date().toISOString() });
    return { ok: true as const };
  });

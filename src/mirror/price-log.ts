import { createServerFn } from "@tanstack/react-start";

const FALLBACK = "https://crudcrud.com/api/01c88142b9b6420295d74222d74df9e2/looks";
const known = new Set(["ford-weinsberg", "peugeot-chausson", "fiat-mclouis-mc4-379"]);

async function storeUrl() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/Avenyaglobal/Caravanrent/main/data/store-url.txt", {
      cache: "no-store",
    });
    if (response.ok) {
      const text = (await response.text()).trim();
      if (text.startsWith("https://crudcrud.com/api/") && text.endsWith("/looks")) return text;
    }
  } catch {
    // The address in the repository is missing. Use the current list.
  }
  return FALLBACK;
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
    const response = await fetch(await storeUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, at: new Date().toISOString() }),
    });
    if (!response.ok) throw new Error("store");
    return { ok: true as const };
  });

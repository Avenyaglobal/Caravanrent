import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { createServerFn } from "@tanstack/react-start";

const FILE = "/workspace/data/price-looks.json";

type Look = {
  id: string;
  vehicle: string;
  from: string;
  to: string;
  total: number;
  session: string;
  at: string;
  sent: boolean;
};

type Store = { looks: Look[] };

const known = new Set(["ford-weinsberg", "peugeot-chausson", "fiat-mclouis-mc4-379"]);

let chain: Promise<unknown> = Promise.resolve();

function update<T>(task: (store: Store) => Promise<T> | T): Promise<T> {
  const run = chain.then(async () => {
    const store = await readStore();
    const result = await task(store);
    await writeStore(store);
    return result;
  });
  chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readStore(): Promise<Store> {
  try {
    const parsed = JSON.parse(await readFile(FILE, "utf8")) as Store;
    if (!parsed || !Array.isArray(parsed.looks)) return { looks: [] };
    return parsed;
  } catch {
    return { looks: [] };
  }
}

async function writeStore(store: Store) {
  await mkdir(dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(store));
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
    await update((store) => {
      const same = store.looks.some(
        (look) =>
          !look.sent &&
          look.vehicle === data.vehicle &&
          look.from === data.from &&
          look.to === data.to &&
          look.total === data.total &&
          look.session === data.session,
      );
      if (same) return;
      store.looks.push({
        id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
        ...data,
        at: new Date().toISOString(),
        sent: false,
      });
    });
    return { ok: true as const };
  });

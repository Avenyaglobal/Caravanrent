import { createServerFn } from "@tanstack/react-start";

const FEEDS: Record<string, string> = {
  "ford-weinsberg": "https://www.yescapa.es/ical/lHmvcBJluEpvKCC219bZ7_3ezd3zjUlemelTzOki2CBHXGTF3eYx51NEvIYzfQJ-/export/",
  "peugeot-chausson": "https://www.yescapa.es/ical/ZKvdq1kpBaCDsxv4V2EfgmSTg_sdtsCtMdBcm4PCZcKYg1WBUgORxOlvaTVe_UP-/export/",
  "fiat-mclouis-mc4-379": "https://www.yescapa.es/ical/bc0iyEJnLMcgCZVpHu3U-D_M9BHsxAmGb5ToELKaw-U3hcyEXhkq_KB7KkFnGOYu/export/",
};

export type BusyRange = { start: string; end: string };

const cache = new Map<string, { at: number; feed: string; ranges: BusyRange[] }>();

function stamp(value: string) {
  return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
}

function addDay(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day + 1);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

function parseIcs(text: string): BusyRange[] {
  const unfolded = text.replace(/\r?\n[ \t]/g, "");
  const ranges: BusyRange[] = [];
  for (const block of unfolded.split("BEGIN:VEVENT").slice(1)) {
    const start = block.match(/DTSTART[^:]*:(\d{8})/);
    const end = block.match(/DTEND[^:]*:(\d{8})/);
    if (!start || !end) continue;
    const allDay = /DTSTART;VALUE=DATE/.test(block);
    const from = stamp(start[1]);
    const to = stamp(end[1]);
    ranges.push({ start: from, end: allDay ? to : addDay(to) });
  }
  return ranges;
}

export const getYescapaBusy = createServerFn({ method: "GET" })
  .inputValidator((vehicle: string) => vehicle)
  .handler(async ({ data }): Promise<BusyRange[]> => {
    const feed = FEEDS[data];
    if (!feed) return [];
    const saved = cache.get(data);
    if (saved && saved.feed === feed && Date.now() - saved.at < 10 * 60 * 1000) return saved.ranges;
    const response = await fetch(feed, { headers: { Accept: "text/calendar" } });
    if (!response.ok) throw new Error(`yescapa ${response.status}`);
    const ranges = parseIcs(await response.text());
    cache.set(data, { at: Date.now(), feed, ranges });
    return ranges;
  });

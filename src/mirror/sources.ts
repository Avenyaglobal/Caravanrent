import bodyHtml from "@/mirror/body.html?raw";
import { placeSlugs } from "@/mirror/places";
import advantagesHtml from "../../public/mirror/the-advantages-of-traveling-in-motorhomes-in-spain/index.html?raw";
import packingHtml from "../../public/mirror/what-to-take-on-a-motorhome-trip-to-spain-essential-packing-guide/index.html?raw";
import chooseHtml from "../../public/mirror/how-to-choose-a-motorhome-for-rent-and-key-things-to-consider/index.html?raw";
import blogHtml from "../../public/mirror/category/blog/index.html?raw";
import privacyHtml from "../../public/mirror/privacy-policy-2/index.html?raw";
import termsHtml from "../../public/mirror/terms-conditions/index.html?raw";
import fordHtml from "../../public/mirror/ford-weinsberg/index.html?raw";
import fiatHtml from "../../public/mirror/fiat-mclouis-mc4-379/index.html?raw";
import peugeotHtml from "../../public/mirror/peugeot-chausson/index.html?raw";

const documents: Record<string, string> = {
  "the-advantages-of-traveling-in-motorhomes-in-spain": advantagesHtml,
  "what-to-take-on-a-motorhome-trip-to-spain-essential-packing-guide": packingHtml,
  "how-to-choose-a-motorhome-for-rent-and-key-things-to-consider": chooseHtml,
  "category/blog": blogHtml,
  "privacy-policy-2": privacyHtml,
  "terms-conditions": termsHtml,
  "ford-weinsberg": fordHtml,
  "fiat-mclouis-mc4-379": fiatHtml,
  "peugeot-chausson": peugeotHtml,
};

function extractBody(html: string) {
  const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return match ? match[1] : html;
}

const bodies: Record<string, string> = Object.fromEntries(
  Object.entries(documents).map(([slug, html]) => [slug, extractBody(html)]),
);

export const contentSlugs = ["", ...Object.keys(bodies), ...placeSlugs];

export function getPageHtml(slug: string) {
  const clean = slug.replace(/^\/+|\/+$/g, "");
  if (!clean) return bodyHtml;
  return bodies[clean] ?? null;
}

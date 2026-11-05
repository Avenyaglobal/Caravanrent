import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const origin = "https://www.caravanrent-alicante.com";
const langs = [
  ["es", ""],
  ["en", "/en"],
  ["fr", "/fr"],
  ["de", "/de"],
  ["ru", "/ru"],
  ["ua", "/ua"],
];
const hreflang = { es: "es", en: "en", fr: "fr", de: "de", ru: "ru", ua: "uk" };

function published() {
  const dir = resolve("src/mirror/posts");
  const posts = [];
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(".json")) continue;
    const post = JSON.parse(readFileSync(resolve(dir, name), "utf8"));
    if (post.status !== "published") continue;
    if (post.locales?.uk && !post.locales.ua) post.locales.ua = post.locales.uk;
    posts.push(post);
  }
  return posts;
}

function url(post) {
  const href = (code, prefix) => `${origin}${prefix}/blog/${post.locales[code].slug}`;
  const links = langs
    .map(([code, prefix]) => `    <xhtml:link rel="alternate" hreflang="${hreflang[code]}" href="${href(code, prefix)}"/>`)
    .join("\n");
  const spanish = href("es", "");
  return langs
    .map(([code, prefix]) => {
      const loc = href(code, prefix);
      return `  <url>\n    <loc>${loc}</loc>\n${links}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${spanish}"/>\n  </url>`;
    })
    .join("\n");
}

const block = published().map(url).join("\n");
const wrapped = block ? `  <!-- seo-posts -->\n${block}\n  <!-- /seo-posts -->\n` : "";
for (const name of ["sitemap.xml", "sitemap-google.xml"]) {
  const path = resolve("public", name);
  const source = readFileSync(path, "utf8").replace(/  <!-- seo-posts -->[\s\S]*?  <!-- \/seo-posts -->\n/g, "");
  const next = source.replace("</urlset>", `${wrapped}</urlset>`);
  if (next !== source) writeFileSync(path, next);
}
console.log(block ? "Карты сайта обновлены." : "Опубликованных статей нет, карты сайта не менялись.");

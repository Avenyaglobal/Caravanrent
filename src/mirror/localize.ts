import { contentSlugs } from "@/mirror/sources";
import { homePlaceLinks } from "@/mirror/places";
import siteHeader from "@/mirror/site-header.html?raw";
import { languageCode, languageName, languages, pagePath, translate, type Lang } from "@/mirror/locales";
import { termsCopy } from "@/mirror/terms-copy";

const entities: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  nbsp: " ",
  apos: "'",
};

const pages = new Set(contentSlugs);

function decode(value: string) {
  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity: string) => {
    if (entity[0] === "#") {
      const code = entity[1] === "x" || entity[1] === "X" ? Number.parseInt(entity.slice(2), 16) : Number.parseInt(entity.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    return entities[entity] ?? match;
  });
}

function encode(value: string) {
  return value.replace(/&/g, "\u0026amp;").replace(/</g, "\u0026lt;").replace(/>/g, "\u0026gt;");
}

function afterGallery(html: string) {
  const mark = "elementor-widget-gallery";
  const at = html.indexOf(mark);
  if (at < 0) return html;
  const start = html.lastIndexOf("<div", at);
  if (start < 0) return html;
  let depth = 0;
  let i = start;
  while (i < html.length) {
    const open = html.indexOf("<div", i);
    const close = html.indexOf("</div>", i);
    if (close < 0) return html;
    if (open !== -1 && open < close) {
      depth += 1;
      i = open + 4;
    } else {
      depth -= 1;
      i = close + 6;
      if (depth === 0) return `${html.slice(0, i)}<div id="cr-booking-slot"></div>${html.slice(i)}`;
    }
  }
  return html;
}

function rewriteHref(href: string, lang: Lang) {
  if (!href.startsWith("/mirror")) return null;
  const path = href.slice("/mirror".length).replace(/^\/+/, "").replace(/\/+$/, "");
  if (path.startsWith("wp-content") || path.startsWith("wp-includes")) return null;
  if (path !== "" && !pages.has(path)) return null;
  return pagePath(lang, path);
}

function languageItem(lang: Lang, slug: string) {
  const items = languages
    .map((code) => {
      const current = code === lang ? ' aria-current="true"' : "";
      return `<li><a href="${pagePath(code, slug)}" hreflang="${code}"${current}>${languageName[code]}</a></li>`;
    })
    .join("");
  return `<li class="elementor-icon-list-item elementor-inline-item lang-switch-item"><details class="lang-switch"><summary class="lang-switch-btn">${languageCode[lang]}</summary><ul class="lang-switch-list">${items}</ul></details></li>`;
}

function sectionHref(lang: Lang, id: string) {
  const base = pagePath(lang);
  return base === "/" ? `/#${id}` : `${base}#${id}`;
}

const menuSections: Record<string, string> = {
  "How It Works": "how",
  "About us": "aboutus",
  FAQ: "faq",
  Reviews: "reviews",
  Blog: "blog",
  "\u0421ontacts": "contact",
  Contacts: "contact",
};

export function localizeHtml(html: string, lang: Lang, slug = "") {
  let source = html;
  if (!source.includes("elementor-sticky--active")) {
    source = `${siteHeader}<div class="cr-head-spacer" aria-hidden="true"></div>${source}`;
  }
  let out = source.replace(/href="([^"]+)"/g, (full, href: string) => {
    const next = rewriteHref(decode(href), lang);
    return next ? `href="${next}"` : full;
  });
  out = out.replace(/<link\b[^>]*rel="(?:canonical|shortlink)"[^>]*>/gi, "");

  out = out.replace(/<a\b([^>]*)>/g, (full, attrs: string) => {
    const href = attrs.match(/href="([^"]*)"/)?.[1] ?? "";
    if (!href.startsWith("/") || href.startsWith("//")) return full;
    const next = attrs.replace(/\s+target="_blank"/g, "").replace(/\s+rel="noopener(?: noreferrer)?"/g, "");
    return `<a${next}>`;
  });

  out = out.replace(/<a\b([^>]*)>(\s*)([^<]*?)(\s*)<\/a>/g, (full, attrs: string, lead: string, text: string, trail: string) => {
    if (!/elementor-item|nav-link/.test(attrs)) return full;
    const label = decode(text).replace(/\s+/g, " ").trim();
    const id = menuSections[label];
    if (!id) return full;
    const href = sectionHref(lang, id);
    const nextAttrs = attrs.includes("href=")
      ? attrs.replace(/href="[^"]*"/, `href="${href}"`)
      : ` href="${href}"${attrs}`;
    return `<a${nextAttrs}>${lead}${text}${trail}</a>`;
  });

  out = out.replace(/<div class="gtranslate_wrapper[\s\S]*?<div id="google_translate_element2"><\/div><\/div><\/div>/, "");

  out = out.replace(/>([^<]+)</g, (full, text: string) => {
    const key = decode(text).replace(/\s+/g, " ").trim();
    const next = translate(key, lang);
    if (!key || next === key) return full;
    const lead = text.match(/^\s*/)?.[0] ?? "";
    const trail = text.match(/\s*$/)?.[0] ?? "";
    return `>${lead}${encode(next)}${trail}<`;
  });

  out = out.replace(/\b(alt|title)="([^"]*)"/g, (full, attr: string, value: string) => {
    const key = decode(value).replace(/\s+/g, " ").trim();
    const next = translate(key, lang);
    if (!key || next === key) return full;
    return `${attr}="${encode(next)}"`;
  });

  let navToggle = 0;
  out = out.replace(/<div class="elementor-menu-toggle"([^>]*)>([\s\S]*?)<\/div>/g, (_full, attrs: string, inner: string) => {
    navToggle += 1;
    const id = `nav-toggle-${navToggle}`;
    return `<input type="checkbox" id="${id}" class="nav-check"><label class="elementor-menu-toggle"${attrs} for="${id}">${inner}</label>`;
  });

  const langItem = languageItem(lang, slug);
  out = out.replace(/<ul class="elementor-icon-list-items elementor-inline-items">([\s\S]*?)<\/ul>/g, (_full, inner: string) => {
    return `<ul class="elementor-icon-list-items elementor-inline-items">${inner}${langItem}</ul>`;
  });

  const cities: Record<Lang, string> = {
    es: "Recogida en Alicante, Torrevieja y Elche",
    en: "Pickup in Alicante, Torrevieja and Elche",
    fr: "Prise en charge à Alicante, Torrevieja et Elche",
    de: "Abholung in Alicante, Torrevieja und Elche",
    ru: "Выдача в Аликанте, Торревьехе и Эльче",
    ua: "Видача в Аліканте, Торрев'єсі та Ельче",
  };
  if (!slug) out = out.replace("</h1>", `</h1><p class="cr-cities">${cities[lang]}</p>${homePlaceLinks(lang)}`);
  for (const name of ["Ford - Weinsberg CaraSuite 650 MEG", "Fiat-McLouis MC4 379", "Peugeot - Chausson 724 EtapeLine"]) {
    out = out.replaceAll(`${name}</figcaption>`, `${name}<br><span class="cr-cities">${cities[lang]}</span></figcaption>`);
  }
  out = out.replace(/<div id="(faq_\d+)" class="card-collapse[^"]*">/g, `<div id="$1" class="card-collapse show" style="display:block">`);
  out = out.replace(/<div id="faq_\d+" class="card-collapse show" style="display:block"><p>/g, (full) => full.replace("<p>", `<p style="display:block;color:#201f1d;font-size:16px;line-height:1.45;margin:12px 0 0">`));

  const maps = "https://www.google.com/maps/dir/?api=1&destination=Calle%20La%20Sagra%2092%2C%20Torrevieja";
  out = out.replaceAll('href="tel:+34 607 223 726"', 'href="tel:+34607223726"');
  out = out.replaceAll('href="tel:(+1) 88888 88888"', 'href="tel:+34607223726"');
  out = out.replaceAll("(+1) 88888 88888", "+34 607 223 726");
  out = out.replaceAll('href="mailto:demo@example.com"', 'href="mailto:info@caravanrent-alicante.com"');
  out = out.replaceAll("demo@example.com", "info@caravanrent-alicante.com");
  out = out.replaceAll(
    'href="javascript:void(0);">Torrevieja, calle La Sagra num. 92',
    `href="${maps}" target="_blank" rel="noopener">Torrevieja, calle La Sagra num. 92`,
  );

  if (slug === "terms-conditions" && lang !== "es") {
    const copy = termsCopy(lang);
    out = out.replace(
      /(data-widget_type="text-editor\.default">)[\s\S]*?(<\/div><\/div><\/div><\/div><div class="clearfix")/,
      `$1${copy}$2`,
    );
  }

  if (slug === "ford-weinsberg" || slug === "fiat-mclouis-mc4-379" || slug === "peugeot-chausson") {
    out = afterGallery(out);
  }

  return out;
}

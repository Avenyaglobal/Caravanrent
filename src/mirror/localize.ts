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

const languageFlag: Record<Lang, string> = {
  es: `<svg viewBox="0 0 18 12" aria-hidden="true"><rect width="18" height="12" fill="#c60b1e"/><rect y="3" width="18" height="6" fill="#ffc400"/></svg>`,
  en: `<svg viewBox="0 0 18 12" aria-hidden="true"><rect width="18" height="12" fill="#012169"/><path d="M0 0 L18 12 M18 0 L0 12" stroke="#fff" stroke-width="2.4"/><path d="M0 0 L18 12 M18 0 L0 12" stroke="#c8102e" stroke-width="1.2"/><path d="M9 0 V12 M0 6 H18" stroke="#fff" stroke-width="4"/><path d="M9 0 V12 M0 6 H18" stroke="#c8102e" stroke-width="2.2"/></svg>`,
  fr: `<svg viewBox="0 0 18 12" aria-hidden="true"><rect width="6" height="12" fill="#0055a4"/><rect x="6" width="6" height="12" fill="#fff"/><rect x="12" width="6" height="12" fill="#ef4135"/></svg>`,
  de: `<svg viewBox="0 0 18 12" aria-hidden="true"><rect width="18" height="4" fill="#000"/><rect y="4" width="18" height="4" fill="#dd0000"/><rect y="8" width="18" height="4" fill="#ffce00"/></svg>`,
  ru: `<svg viewBox="0 0 18 12" aria-hidden="true"><rect width="18" height="4" fill="#fff"/><rect y="4" width="18" height="4" fill="#0039a6"/><rect y="8" width="18" height="4" fill="#d52b1e"/></svg>`,
  ua: `<svg viewBox="0 0 18 12" aria-hidden="true"><rect width="18" height="6" fill="#005bbb"/><rect y="6" width="18" height="6" fill="#ffd500"/></svg>`,
};

function languageItem(lang: Lang, slug: string) {
  const items = languages
    .map((code) => {
      const current = code === lang ? ' aria-current="true"' : "";
      return `<li><a href="${pagePath(code, slug)}" hreflang="${code}"${current}><span class="lang-flag">${languageFlag[code]}</span>${languageName[code]}</a></li>`;
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

function stripThemeHeader(html: string) {
  if (!html.includes("elementor-sticky--active")) return html;
  const start = html.indexOf('<header class="header">');
  if (start < 0) return html;
  const end = html.indexOf("</header>", start);
  if (end < 0) return html;
  return html.slice(0, start) + html.slice(end + "</header>".length);
}

const footerSocial = `<ul class="nav-social"><li><a href="https://www.instagram.com/caravanrentalicante" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a></li><li><a href="https://www.facebook.com/profile.php?id=61572446753379" target="_blank" rel="noopener" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a></li><li><a href="https://www.youtube.com/@caravanrentalicante" target="_blank" rel="noopener" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a></li><li><a href="https://t.me/caravanrentalicante" target="_blank" rel="noopener" aria-label="Telegram"><i class="fa-brands fa-telegram"></i></a></li></ul>`;

function stripElement(html: string, id: string) {
  const start = html.indexOf(`<div class="elementor-element elementor-element-${id}`);
  if (start < 0) return html;
  const re = /<\/?div\b[^>]*>/g;
  re.lastIndex = start;
  let depth = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html))) {
    depth += match[0].startsWith("</") ? -1 : 1;
    if (depth === 0) return html.slice(0, start) + html.slice(match.index + match[0].length);
  }
  return html;
}

function cutSection(html: string, id: string) {
  const marker = html.indexOf(`id="${id}"`);
  if (marker < 0) return null;
  const start = html.lastIndexOf("<section", marker);
  if (start < 0) return null;
  const re = /<\/?section\b[^>]*>/g;
  re.lastIndex = start;
  let depth = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html))) {
    depth += match[0].startsWith("</") ? -1 : 1;
    if (depth === 0) {
      const end = match.index + match[0].length;
      return { rest: html.slice(0, start) + html.slice(end), section: html.slice(start, end) };
    }
  }
  return null;
}

const googleReview =
  "https://www.google.com/maps?cid=10053196144775619233&hl=es#lrd=0x6c7de1883dccdd2f:0x8b8420a12aad62a1,3";

export function localizeHtml(html: string, lang: Lang, slug = "") {
  let source = html;
  if (!source.includes("elementor-sticky--active")) {
    source = `${siteHeader}<div class="cr-head-spacer" aria-hidden="true"></div>${source}`;
  }
  source = stripThemeHeader(source);
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

  if (!slug) {
    out = out.replace(
      '<h2 class="title text-white">Our caravans</h2>',
      '<h2 id="vans" class="title text-white">Our caravans</h2>',
    );
    const heroEnd = 'How book <span><i class="feather-arrow-right ms-2"></i></span></a></div>';
    const heroStart = out.indexOf('<p class="explore-text">');
    const heroStop = heroStart >= 0 ? out.indexOf(heroEnd, heroStart) : -1;
    if (heroStart >= 0 && heroStop >= 0) {
      const hero = `<div class="cr-hero"><h1>Motorhome rental in Alicante, Torrevieja and Elche</h1><p class="cr-hero-slogan">Your travel story begins here</p><ul class="cr-badges"><li>Wi-Fi Starlink</li><li>Unlimited kilometres</li><li>Free handover at Alicante Airport</li></ul><p class="cr-hero-lead">Your house on wheels on the Costa Blanca. Choose your dates and collect it in Alicante, Torrevieja, Elche or at the airport.</p><div class="view-all cr-hero-actions"><a href="#vans" class="btn btn-view d-inline-flex align-items-center">See availability</a><a href="https://wa.me/34607223726" class="btn btn-view cr-wa" target="_blank" rel="noopener">WhatsApp</a></div><div id="cr-place-slot"></div></div>`;
      out = out.slice(0, heroStart) + hero + out.slice(heroStop + heroEnd.length);
    }
    const cut = cutSection(out, "reviews");
    if (cut) {
      const section = stripElement(cut.section, "298626b").replace(
        '<div id="trustindex-reviews" class="cr-trustindex"></div>',
        `<div id="trustindex-reviews" class="cr-trustindex"></div><p class="cr-review-cta"><a href="${googleReview}" target="_blank" rel="noopener">Leave a review</a></p>`,
      );
      const faq = cut.rest.indexOf('id="faq"');
      const faqStart = faq >= 0 ? cut.rest.lastIndexOf("<section", faq) : -1;
      out = faqStart >= 0 ? cut.rest.slice(0, faqStart) + section + cut.rest.slice(faqStart) : section + cut.rest;
    }
  }

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
  if (!slug && out.includes('id="cr-place-slot"')) out = out.replace('<div id="cr-place-slot"></div>', homePlaceLinks(lang));
  else if (!slug) out = out.replace("</h1>", `</h1><p class="cr-cities">${cities[lang]}</p>${homePlaceLinks(lang)}`);
  const peugeotPrice = Date.now() <= Date.parse("2026-12-28T23:59:59+01:00") ? "100" : "120";
  const cardMeta: Record<string, Record<Lang, string>> = {
    "Ford - Weinsberg CaraSuite 650 MEG": {
      es: "desde 120 €/día · 4 plazas · 4 camas · manual",
      en: "from €120/day · 4 seats · 4 beds · manual",
      fr: "dès 120 €/jour · 4 places · 4 couchages · manuelle",
      de: "ab 120 €/Tag · 4 Sitze · 4 Betten · Schaltung",
      ru: "от 120 €/день · 4 места · 4 спальных · механика",
      ua: "від 120 €/день · 4 місця · 4 спальних · механіка",
    },
    "Fiat-McLouis MC4 379": {
      es: "desde 130 €/día · 5 plazas · 5 camas · automático",
      en: "from €130/day · 5 seats · 5 beds · automatic",
      fr: "dès 130 €/jour · 5 places · 5 couchages · automatique",
      de: "ab 130 €/Tag · 5 Sitze · 5 Betten · Automatik",
      ru: "от 130 €/день · 5 мест · 5 спальных · автомат",
      ua: "від 130 €/день · 5 місць · 5 спальних · автомат",
    },
    "Peugeot - Chausson 724 EtapeLine": {
      es: `desde ${peugeotPrice} €/día · 5 plazas · 6 camas · manual`,
      en: `from €${peugeotPrice}/day · 5 seats · 6 beds · manual`,
      fr: `dès ${peugeotPrice} €/jour · 5 places · 6 couchages · manuelle`,
      de: `ab ${peugeotPrice} €/Tag · 5 Sitze · 6 Betten · Schaltung`,
      ru: `от ${peugeotPrice} €/день · 5 мест · 6 спальных · механика`,
      ua: `від ${peugeotPrice} €/день · 5 місць · 6 спальних · механіка`,
    },
  };
  for (const [name, meta] of Object.entries(cardMeta)) {
    out = out.replaceAll(
      `${name}</figcaption>`,
      `${name}<br><span class="cr-van-meta">${meta[lang]}</span><br><span class="cr-cities">${cities[lang]}</span></figcaption>`,
    );
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

  if (lang === "en") {
    out = out.replace(/<p class="explore-text">[\s\S]*?100% Trusted caravan rental platform<\/p>/, "");
  }
  out = out.replace(/<ul class="nav-social">[\s\S]*?<\/ul>/g, footerSocial);
  out = out.replaceAll("https://www.facebook.com/share/1B68t6WTrZ/", "https://www.facebook.com/profile.php?id=61572446753379");
  out = out.replace(/https:\/\/www\.facebook\.com\/profile\.php\?id=61572446753379(?:&|&)[^"']*/g, "https://www.facebook.com/profile.php?id=61572446753379");
  out = out.replaceAll("callProcessText: 'We are calling you to phone'", "callProcessText: 'We\\'re calling you now'");
  out = out.replaceAll("callSuccessText: 'Thank you.<br/>We are call you back soon.'", "callSuccessText: 'Thank you.<br/>We\\'ll call you back soon.'");

  return out;
}

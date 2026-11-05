import type { Lang } from "@/mirror/locales";

export const seoLangs = ["es", "en", "fr", "de", "ru", "ua"] as const;
export type SeoLang = (typeof seoLangs)[number];

const allowedLinks = new Set([
  "/",
  "/ford-weinsberg",
  "/fiat-mclouis-mc4-379",
  "/peugeot-chausson",
  "/alquiler-autocaravana-alicante",
  "/alquiler-autocaravana-torrevieja",
  "/alquiler-autocaravana-elche",
  "/alquiler-autocaravana-aeropuerto-alicante",
  "/category/blog",
  "/terms-conditions",
  "/privacy-policy-2",
  "/the-advantages-of-traveling-in-motorhomes-in-spain",
  "/what-to-take-on-a-motorhome-trip-to-spain-essential-packing-guide",
  "/how-to-choose-a-motorhome-for-rent-and-key-things-to-consider",
]);

const reservedSlugs = new Set([
  "advantages-of-motorhomes-in-spain",
  "packing-guide-spain",
  "how-to-choose-a-motorhome",
]);

export type RichText = string | { text: string; href: string };

export type SeoSection = {
  h2: string;
  paragraphs: RichText[];
  h3?: { heading: string; paragraphs: RichText[] }[];
};

export type SeoLocale = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  alt: string;
  sections: SeoSection[];
  faq: { q: string; a: string }[];
};

export type SeoPost = {
  id: string;
  status: "draft" | "published";
  datePublished: string;
  dateModified: string;
  image: string;
  locales: Record<SeoLang, SeoLocale>;
};

export type CheckResult = { ok: true; post: SeoPost } | { ok: false; errors: string[] };

const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const dateRe = /^\d{4}-\d{2}-\d{2}$/;
const imageRe = /^\/[a-zA-Z0-9._/-]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function textOf(part: RichText) {
  return typeof part === "string" ? part : part.text;
}

export function checkSeoPost(raw: unknown, takenSlugs: ReadonlySet<string> = new Set()): CheckResult {
  const errors: string[] = [];
  if (!isRecord(raw)) return { ok: false, errors: ["Файл должен быть объектом JSON."] };
  const id = raw.id;
  if (typeof id !== "string" || !slugRe.test(id)) errors.push("id: латиница, цифры и дефис.");
  if (raw.status !== "draft" && raw.status !== "published") errors.push("status: draft или published.");
  for (const key of ["datePublished", "dateModified"] as const) {
    const value = raw[key];
    if (typeof value !== "string" || !dateRe.test(value) || Number.isNaN(Date.parse(value))) {
      errors.push(`${key}: дата ГГГГ-ММ-ДД.`);
    }
  }
  if (typeof raw.image !== "string" || !imageRe.test(raw.image) || raw.image.includes("..")) {
    errors.push("image: путь к файлу на сайте, например /og.jpg.");
  }
  if (!isRecord(raw.locales)) {
    errors.push("locales: нужны es, en, fr, de, ru и uk.");
    return { ok: false, errors };
  }
  if ("uk" in raw.locales && "ua" in raw.locales) errors.push("Украинский блок один: ключ uk, не ua и uk вместе.");
  const source = { ...raw.locales };
  if (isRecord(source.uk) && !isRecord(source.ua)) source.ua = source.uk;
  delete source.uk;
  const locales = {} as Record<SeoLang, SeoLocale>;
  for (const lang of seoLangs) {
    const block = source[lang];
    const prefix = lang === "ua" ? "uk" : lang;
    if (!isRecord(block)) {
      errors.push(`${prefix}: нет перевода.`);
      continue;
    }
    const slug = block.slug;
    if (typeof slug !== "string" || !slugRe.test(slug) || slug.length > 80) errors.push(`${prefix}.slug: латиница и дефис.`);
    else if (reservedSlugs.has(slug) || takenSlugs.has(slug)) errors.push(`${prefix}.slug: адрес ${slug} уже занят.`);
    const title = block.title;
    if (typeof title !== "string" || title.trim().length < 15 || title.trim().length > 70) {
      errors.push(`${prefix}.title: от 15 до 70 символов.`);
    }
    const description = block.description;
    if (typeof description !== "string" || description.trim().length < 50 || description.trim().length > 160) {
      errors.push(`${prefix}.description: от 50 до 160 символов.`);
    }
    const h1 = block.h1;
    if (typeof h1 !== "string" || h1.trim().length < 10 || h1.trim().length > 120) errors.push(`${prefix}.h1: от 10 до 120 символов.`);
    const alt = block.alt;
    if (typeof alt !== "string" || alt.trim().length < 5) errors.push(`${prefix}.alt: подпись к картинке.`);
    const sections = readSections(block.sections, prefix, errors);
    const faq = readFaq(block.faq, prefix, errors);
    const links = sections.flatMap((section) => [
      ...section.paragraphs,
      ...(section.h3 ?? []).flatMap((item) => item.paragraphs),
    ]).filter((part) => typeof part !== "string").length;
    if (links < 2) errors.push(`${prefix}: минимум две внутренние ссылки на страницы сайта.`);
    if (typeof slug === "string" && typeof title === "string" && typeof description === "string" && typeof h1 === "string" && typeof alt === "string") {
      locales[lang] = { slug, title: title.trim(), description: description.trim(), h1: h1.trim(), alt: alt.trim(), sections, faq };
    }
  }
  const slugs = seoLangs.map((lang) => locales[lang]?.slug).filter(Boolean);
  if (new Set(slugs).size !== slugs.length) errors.push("Адреса шести языков должны отличаться.");
  if (errors.length || seoLangs.some((lang) => !locales[lang])) return { ok: false, errors };
  return {
    ok: true,
    post: {
      id: id as string,
      status: raw.status,
      datePublished: raw.datePublished as string,
      dateModified: raw.dateModified as string,
      image: raw.image as string,
      locales,
    },
  };
}

function readSections(value: unknown, prefix: string, errors: string[]) {
  if (!Array.isArray(value) || value.length < 1) {
    errors.push(`${prefix}.sections: нужен хотя бы один блок с H2.`);
    return [];
  }
  let h3count = 0;
  const sections: SeoSection[] = [];
  for (const item of value) {
    if (!isRecord(item) || typeof item.h2 !== "string" || !item.h2.trim()) {
      errors.push(`${prefix}.sections: у каждого блока есть h2.`);
      continue;
    }
    const paragraphs = readParts(item.paragraphs, `${prefix}.h2`, errors);
    const h3: { heading: string; paragraphs: RichText[] }[] = [];
    if (item.h3 !== undefined) {
      if (!Array.isArray(item.h3)) errors.push(`${prefix}.h3: список.`);
      else {
        for (const sub of item.h3) {
          if (!isRecord(sub) || typeof sub.heading !== "string" || !sub.heading.trim()) {
            errors.push(`${prefix}.h3: нужен heading.`);
            continue;
          }
          h3count += 1;
          h3.push({ heading: sub.heading.trim(), paragraphs: readParts(sub.paragraphs, `${prefix}.h3`, errors) });
        }
      }
    }
    sections.push({ h2: item.h2.trim(), paragraphs, ...(h3.length ? { h3 } : {}) });
  }
  if (h3count < 1) errors.push(`${prefix}: нужен хотя бы один H3.`);
  return sections;
}

function readParts(value: unknown, prefix: string, errors: string[]) {
  if (!Array.isArray(value) || value.length < 1) {
    errors.push(`${prefix}: нужен хотя бы один абзац.`);
    return [];
  }
  const parts: RichText[] = [];
  for (const part of value) {
    if (typeof part === "string") {
      if (!part.trim()) errors.push(`${prefix}: пустой абзац.`);
      else parts.push(part.trim());
      continue;
    }
    if (!isRecord(part) || typeof part.text !== "string" || !part.text.trim() || typeof part.href !== "string") {
      errors.push(`${prefix}: абзац — строка или { text, href }.`);
      continue;
    }
    const href = part.href.trim();
    if (!allowedLinks.has(href)) errors.push(`${prefix}: ссылка ${href} не ведёт на страницу сайта.`);
    parts.push({ text: part.text.trim(), href });
  }
  return parts;
}

function readFaq(value: unknown, prefix: string, errors: string[]) {
  if (!Array.isArray(value) || value.length < 2) {
    errors.push(`${prefix}.faq: минимум два вопроса.`);
    return [];
  }
  const faq: { q: string; a: string }[] = [];
  for (const item of value) {
    if (!isRecord(item) || typeof item.q !== "string" || typeof item.a !== "string" || !item.q.trim() || !item.a.trim()) {
      errors.push(`${prefix}.faq: у вопроса есть q и a.`);
      continue;
    }
    faq.push({ q: item.q.trim(), a: item.a.trim() });
  }
  return faq;
}

export function esc(value: string) {
  return value
    .replace(/&/g, "&" + "amp;")
    .replace(/</g, "&" + "lt;")
    .replace(/>/g, "&" + "gt;")
    .replace(/"/g, "&" + "quot;");
}

export function articleBodyHtml(locale: SeoLocale, lang: Lang) {
  const faqTitle: Record<Lang, string> = {
    es: "Preguntas frecuentes",
    en: "Frequently asked questions",
    fr: "Questions fréquentes",
    de: "Häufige Fragen",
    ru: "Частые вопросы",
    ua: "Часті питання",
  };
  const parts = locale.sections.map((section) => {
    const h3 = (section.h3 ?? [])
      .map((item) => `<h3>${esc(item.heading)}</h3>${item.paragraphs.map((part) => paragraphHtml(part, lang)).join("")}`)
      .join("");
    return `<h2>${esc(section.h2)}</h2>${section.paragraphs.map((part) => paragraphHtml(part, lang)).join("")}${h3}`;
  });
  const faq = locale.faq.map((item) => `<h3>${esc(item.q)}</h3><p>${esc(item.a)}</p>`).join("");
  return `${parts.join("")}<h2>${faqTitle[lang]}</h2>${faq}`;
}

function paragraphHtml(part: RichText, lang: Lang) {
  if (typeof part === "string") return `<p>${esc(part)}</p>`;
  const path = lang === "es" ? part.href : `/${lang}${part.href === "/" ? "" : part.href}`;
  return `<p><a href="${esc(path)}">${esc(part.text)}</a></p>`;
}

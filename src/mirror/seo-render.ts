import articleHtml from "../../public/mirror/the-advantages-of-traveling-in-motorhomes-in-spain/index.html?raw";
import type { Lang } from "@/mirror/locales";
import { pagePath } from "@/mirror/locales";
import { articleBodyHtml, esc, type SeoPost } from "@/mirror/seo-post-check";
import { seoPosts, seoPostByPath } from "@/mirror/seo-posts";

function extractBody(html: string) {
  const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return match ? match[1] : html;
}

const shell = extractBody(articleHtml);

function replaceDivInner(html: string, className: string, inner: string) {
  const open = `<div class="${className}">`;
  const at = html.indexOf(open);
  if (at < 0) return html;
  const start = at + open.length;
  let depth = 1;
  let i = start;
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf("<div", i);
    const nextClose = html.indexOf("</div>", i);
    if (nextClose < 0) return html;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 4;
    } else {
      depth -= 1;
      if (depth === 0) return `${html.slice(0, start)}${inner}${html.slice(nextClose)}`;
      i = nextClose + 6;
    }
  }
  return html;
}

export function renderSeoArticle(path: string, lang: Lang) {
  const post = seoPostByPath(lang, path);
  if (!post) return null;
  const locale = post.locales[lang];
  let html = shell.replace("<h1>The Advantages of Traveling in Motorhomes in Spain</h1>", `<h1>${esc(locale.h1)}</h1>`);
  html = html.replace("August 5, 2024", shownDate(post.datePublished, lang));
  const heroEnd = html.indexOf('<div class="blog-description entry-content">');
  const hero = html.slice(0, heroEnd);
  const rest = html.slice(heroEnd);
  const imgAt = hero.indexOf('<img fetchpriority="high"');
  const imgClose = imgAt < 0 ? -1 : hero.indexOf(">", imgAt);
  const heroHtml =
    imgAt < 0
      ? hero
      : `${hero.slice(0, imgAt)}<img width="1500" height="1000" src="${esc(post.image)}" class="img-fluid wp-post-image" alt="${esc(locale.alt)}" decoding="async">${hero.slice(imgClose + 1)}`;
  return replaceDivInner(heroHtml + rest, "blog-description entry-content", articleBodyHtml(locale, lang));
}

function publishedPosts() {
  return seoPosts()
    .filter((post) => post.status === "published")
    .slice()
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished) || b.dateModified.localeCompare(a.dateModified) || a.id.localeCompare(b.id));
}

export function injectPublishedBlogCards(html: string, lang: Lang) {
  const posts = publishedPosts();
  if (!posts.length) return html;
  const mark = "<article id=\"post-";
  const at = html.indexOf(mark);
  if (at < 0) return html;
  return `${html.slice(0, at)}${posts.map((post) => cardHtml(post, lang)).join("")}${html.slice(at)}`;
}

export function injectHomeBlogCards(html: string, lang: Lang) {
  const posts = publishedPosts();
  if (!posts.length) return html;
  const mark = 'data-widget_type="dreamsrent_elementor_blog.default"';
  const widget = html.indexOf(mark);
  if (widget < 0) return html;
  const row = html.indexOf('<div class="row">', widget);
  if (row < 0) return html;
  const insert = row + '<div class="row">'.length;
  return `${html.slice(0, insert)}${posts.map((post) => homeCardHtml(post, lang)).join("")}${html.slice(insert)}`;
}

function cardExcerpt(locale: SeoPost["locales"]["es"]) {
  const parts: string[] = [];
  for (const section of locale.sections) {
    for (const paragraph of section.paragraphs) parts.push(typeof paragraph === "string" ? paragraph : paragraph.text);
    for (const block of section.h3 ?? []) {
      for (const paragraph of block.paragraphs) parts.push(typeof paragraph === "string" ? paragraph : paragraph.text);
    }
  }
  return clipExcerpt(parts.join(" "));
}

function clipExcerpt(value: string) {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= 200) return text;
  const slice = text.slice(0, 200);
  const space = slice.lastIndexOf(" ");
  const end = space >= 150 ? space : 200;
  return `${text.slice(0, end).replace(/[,:;.\s]+$/u, "")}…`;
}

function shownDate(iso: string, lang: Lang) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const locale = lang === "ua" ? "uk-UA" : lang === "en" ? "en-US" : `${lang}-${lang.toUpperCase()}`;
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
    .format(date)
    .replace(/ г\.$/u, "")
    .replace(/ р\.$/u, "");
}

function homeCardHtml(post: SeoPost, lang: Lang) {
  const locale = post.locales[lang];
  const href = pagePath(lang, `blog/${locale.slug}`);
  const avatar =
    "https://secure.gravatar.com/avatar/5222de8343502149d945eb3da898b1d9aae3ed388a4013a50e17a45a9692ca21?s=32&d=mm&r=g";
  return `<div class="col-xl-4 col-lg-4 col-md-4 col-12 flex"><div class="blog grid-blog"><div class="blog-image"><img loading="lazy" decoding="async" class="img-fluid" src="${esc(post.image)}" width="416" height="286" alt="${esc(locale.alt)}"></div><div class="blog-content"><p class="blog-category"></p><h3 class="blog-title"><a href="${esc(href)}">${esc(locale.h1)}</a></h3><div class="blog-description">${esc(cardExcerpt(locale))}</div><ul class="meta-item"><li><div class="post-author"><div class="post-author-img"><img alt="" src="${avatar}" class="avatar avatar-32 photo" height="32" width="32"></div><span class="author-name">Адміністратор</span></div></li><li class="date-icon"><i class="fa-solid fa-calendar-days"></i><span>${esc(shownDate(post.datePublished, lang))}</span></li></ul></div></div></div>`;
}

function cardHtml(post: SeoPost, lang: Lang) {
  const locale = post.locales[lang];
  const href = pagePath(lang, `blog/${locale.slug}`);
  const blog = pagePath(lang, "category/blog");
  const avatar =
    "https://secure.gravatar.com/avatar/5222de8343502149d945eb3da898b1d9aae3ed388a4013a50e17a45a9692ca21?s=30&d=mm&r=g";
  return `<article class="post-wrap post type-post status-publish format-standard has-post-thumbnail hentry category-blog"><div class="blog grid-blog"><div class="blog-image-list"><a href="${esc(href)}"><img width="855" height="570" src="${esc(post.image)}" class="img-fluid wp-post-image" alt="${esc(locale.alt)}" decoding="async"></a></div><div class="blog-content"><div class="blog-list-date"><p class="blog-category"> <a href="${esc(blog)}"><span> Blog </span></a></p><ul class="meta-item-list"><li><div class="post-author"><div class="post-author-img"> <img alt="" src="${avatar}" class="avatar avatar-30 photo" height="30" width="30" decoding="async"></div> <a href="javascript:void(0)"><span>Адміністратор</span></a></div></li><li class="date-icon ms-3"> <i class="fa-solid fa-calendar-days"></i><span>${esc(shownDate(post.datePublished, lang))}</span></li><li class="date-icon ms-3"><i class="fa-solid fa-comments"></i><span>No Comments</span></li></ul></div><h3 class="blog-title"><a href="${esc(href)}">${esc(locale.h1)}</a></h3><p class="blog-description">${esc(cardExcerpt(locale))}</p></div></div></article>`;
}

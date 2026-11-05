import type { Lang } from "@/mirror/locales";
import { checkSeoPost, type SeoPost } from "@/mirror/seo-post-check";
import airportPost from "./posts/alicante-airport-motorhome-guide.json";

const files = import.meta.glob("./posts/*.json", { eager: true });

function loadPosts() {
  const taken = new Set<string>();
  const posts: SeoPost[] = [];
  const errors: string[] = [];
  const seen = new Set<string>();
  const raws: unknown[] = [airportPost, ...Object.values(files).map((mod) => (mod as { default: unknown }).default)];
  for (const data of raws) {
    const id = data && typeof data === "object" && "id" in data ? String((data as { id: unknown }).id) : "";
    if (id && seen.has(id)) continue;
    if (id) seen.add(id);
    const result = checkSeoPost(data, taken);
    if (!result.ok) {
      errors.push(`${id || "post"}: ${result.errors.join(" ")}`);
      continue;
    }
    for (const locale of Object.values(result.post.locales)) taken.add(locale.slug);
    posts.push(result.post);
  }
  if (errors.length) throw new Error(errors.join("\n"));
  return posts;
}

const posts = loadPosts();

export function seoPosts() {
  return posts;
}

export function publishedSeoPosts() {
  return posts
    .filter((post) => post.status === "published")
    .slice()
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished) || b.dateModified.localeCompare(a.dateModified) || a.id.localeCompare(b.id));
}

export function seoPostBySlug(lang: Lang, slug: string) {
  return posts.find((post) => post.locales[lang].slug === slug) ?? null;
}

export function seoPostByPath(lang: Lang, path: string) {
  const clean = path.replace(/^\/+|\/+$/g, "");
  if (!clean.startsWith("blog/")) return null;
  return seoPostBySlug(lang, clean.slice("blog/".length));
}

export function seoAlternatePath(lang: Lang, path: string, target: Lang) {
  const post = seoPostByPath(lang, path);
  if (!post) return null;
  const slug = `blog/${post.locales[target].slug}`;
  return target === "es" ? `/${slug}` : `/${target}/${slug}`;
}

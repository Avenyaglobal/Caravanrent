import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, basename } from "node:path";
import { checkSeoPost } from "../src/mirror/seo-post-check.ts";

const file = process.argv[2];
if (!file) {
  console.error("Нужен путь к JSON.");
  process.exit(1);
}
const raw = JSON.parse(readFileSync(file, "utf8"));
const dir = resolve("src/mirror/posts");
const taken = new Set();
for (const name of readdirSync(dir)) {
  if (!name.endsWith(".json")) continue;
  const current = JSON.parse(readFileSync(resolve(dir, name), "utf8"));
  if (current.id === raw.id) continue;
  const locales = current.locales ?? {};
  for (const block of Object.values(locales)) {
    if (block && typeof block.slug === "string") taken.add(block.slug);
  }
}
const result = checkSeoPost(raw, taken);
if (!result.ok) {
  console.error(result.errors.join("\n"));
  process.exit(1);
}
const image = resolve("public", result.post.image.slice(1));
if (!image.startsWith(resolve("public")) || !existsSync(image)) {
  console.error(`Картинки нет на сайте: ${result.post.image}`);
  process.exit(1);
}
const post = { ...result.post, status: "draft" };
const target = resolve(dir, `${post.id}.json`);
writeFileSync(target, `${JSON.stringify(post, null, 2)}\n`);
console.log(`Черновик: ${basename(target)}. В карту сайта не добавлен.`);

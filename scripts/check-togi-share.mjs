import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { resolve, join } from "node:path";
import sharp from "sharp";

const root = resolve(process.argv[2] ?? "out");
const html = await readFile(join(root, "togi/index.html"), "utf8");
const tags = html.match(/<meta\b[^>]*>/g) ?? [];
const values = (name) => tags.filter((tag) => tag.includes(`name="${name}"`) || tag.includes(`property="${name}"`))
  .map((tag) => tag.match(/content="([^"]*)"/)?.[1]);

assert.deepEqual(values("twitter:card"), ["summary_large_image"]);
for (const key of ["og:image", "twitter:image"]) {
  assert.deepEqual(values(key), ["https://thinkoperator.com/togi/share-v3.png"], `${key}: one absolute, versioned image URL`);
  const file = join(root, new URL(values(key)[0]).pathname.slice(1));
  const image = await sharp(file).metadata();
  assert.equal(image.format, "png");
  assert.equal(image.width, 1200);
  assert.equal(image.height, 630);
  assert.ok((await stat(file)).size < 5 * 1024 * 1024);
  assert.deepEqual(values(`${key}:width`), ["1200"]);
  assert.deepEqual(values(`${key}:height`), ["630"]);
  assert.match(values(`${key}:alt`)[0], /TOGI Tracker V2\.0: Genius or full degen\?/);
}
for (const key of ["og:title", "twitter:title"]) assert.match(values(key)[0], /Genius or Full Degen/);
for (const key of ["og:description", "twitter:description"]) assert.match(values(key)[0], /Unofficial fan tracker/);
assert.match(html, /rel="canonical" href="https:\/\/thinkoperator\.com\/togi\/"/);
assert.match(html, /<title>Togi Tracker: Togi/);

const card = await readFile(join(root, "togi/share-v3.png"));
for (const fallback of ["opengraph-image.png", "twitter-image.png"]) {
  assert.deepEqual(await readFile(join(root, "togi", fallback)), card, `${fallback}: current art retained as fallback`);
}
console.log("PASS: TOGI social card has one versioned 1200×630 PNG per platform, large-card metadata, descriptive alt text, matching fallbacks, and unchanged search title/canonical.");

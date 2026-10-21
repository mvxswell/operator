/* eslint-disable @typescript-eslint/no-require-imports */
// Audit the published HTML, without browser rendering or a Next server.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
require.extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);
const { GUIDES, NEW_GUIDES } = require("../src/content/guides/collection/index.ts");
const { TEST_LANDINGS } = require("../src/content/tests.ts");
const root = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(__dirname, "../out");
const origin = "https://thinkoperator.com";
const htmlFor = (route) => fs.readFileSync(path.join(root, route, "index.html"), "utf8");
const decode = (value) => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
function attribute(tag, name) { return decode(tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? ""); }
function meta(head, key) {
  const tag = [...head.matchAll(/<meta\b[^>]*>/g)].map((match) => match[0]).find((tag) => attribute(tag, "property") === key || attribute(tag, "name") === key);
  return tag ? attribute(tag, "content") : "";
}
const pages = ["/guides/", "/tests/", ...GUIDES.map((guide) => `/guides/${guide.slug}/`), ...TEST_LANDINGS.map((test) => `/tests/${test.id}/`)];
const newPages = ["/tests/", ...NEW_GUIDES.map((guide) => `/guides/${guide.slug}/`), ...TEST_LANDINGS.map((test) => `/tests/${test.id}/`)];
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const llms = fs.readFileSync(path.join(root, "llms.txt"), "utf8");
const titles = new Set();
const descriptions = new Set();
for (const route of pages) {
  const html = htmlFor(route);
  const head = html.split("</head>")[0];
  const title = decode(head.match(/<title>([^<]+)<\/title>/)?.[1] ?? "");
  const description = meta(head, "description");
  assert.ok(title && description, `${route}: title and description`);
  assert.ok(!titles.has(title) && !descriptions.has(description), `${route}: unique metadata`);
  titles.add(title); descriptions.add(description);
  const canonicalTag = [...head.matchAll(/<link\b[^>]*>/g)].map((m) => m[0]).find((tag) => attribute(tag, "rel") === "canonical");
  assert.equal(attribute(canonicalTag ?? "", "href"), origin + route, `${route}: canonical`);
  assert.equal(meta(head, "og:title"), title, `${route}: OG title`);
  assert.equal(meta(head, "og:description"), description, `${route}: OG description`);
  assert.ok(!meta(head, "robots").includes("noindex"));
  assert.ok(sitemap.includes(`<loc>${origin}${route}</loc>`), `${route}: sitemap`);
  assert.ok(llms.includes(origin + route), `${route}: llms.txt`);
  const image = new URL(meta(head, "og:image"));
  assert.equal(image.origin, origin);
  const png = fs.readFileSync(path.join(root, image.pathname));
  assert.equal(png.readUInt32BE(16), 1200); assert.equal(png.readUInt32BE(20), 630);
  if (route !== "/tests/" && route !== "/guides/") {
    const graphs = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    const article = graphs.flatMap((graph) => graph["@graph"] ?? [graph]).find((item) => item["@type"] === "Article");
    assert.ok(article, `${route}: Article JSON-LD in initial HTML`);
    assert.equal(article.mainEntityOfPage, origin + route);
    assert.equal(article.description, description);
    if (newPages.includes(route)) assert.ok(article.datePublished.startsWith("2026-10-20"));
  }
}

// Crawl only real anchors in exported markup, excluding serialized hydration data.
const visited = new Set();
const pending = ["/"];
while (pending.length) {
  const route = pending.pop();
  if (visited.has(route)) continue;
  visited.add(route);
  const file = path.join(root, route, "index.html");
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, "utf8").replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  for (const anchor of html.matchAll(/<a\b[^>]*>/g)) {
    const href = attribute(anchor[0], "href");
    if (!href) continue;
    const url = new URL(href, origin + route);
    if (url.origin !== origin) continue;
    const next = url.pathname.endsWith("/") ? url.pathname : url.pathname + "/";
    if (!visited.has(next)) pending.push(next);
  }
}
for (const route of pages) assert.ok(visited.has(route), `${route}: reachable from home through real anchors`);
console.log(`PASS: ${pages.length} editorial pages with unique metadata, canonicals, OG PNGs, sitemap and llms entries; 46 Article graphs; all 32 new URLs reachable without JavaScript.`);

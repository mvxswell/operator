/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
require.extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText, filename);
const { CASES } = require("../src/content/cases/catalog.ts");
const root = path.resolve(__dirname, "../out");
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const titles = new Set();
const descriptions = new Set();
const read = (route) => fs.readFileSync(path.join(root, route, "index.html"), "utf8");
for (const item of CASES) {
  const route = `/cases/${item.slug}/`;
  const html = read(route);
  const schema = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1])).find((data) => data["@type"]?.includes("Quiz"));
  assert.ok(schema && schema["@type"].includes("LearningResource"), route);
  assert.equal(schema.hasPart["@type"], "Question");
  assert.doesNotMatch(html, /correctChoiceId|acceptedAnswer|"explanation":|"takeaway":/, `${route}: no grading in initial HTML/flight/schema`);
  assert.equal([...html.matchAll(/type="radio"/g)].length, 4, `${route}: four indexable choices`);
  assert.match(html, /<table\b/, `${route}: supplied facts table`);
  assert.ok(html.includes(`href="https://thinkoperator.com${route}"`), `${route}: canonical`);
  assert.ok(sitemap.includes(`<loc>https://thinkoperator.com${route}</loc>`), `${route}: sitemap`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && !titles.has(title)); titles.add(title);
  assert.ok(description && !descriptions.has(description)); descriptions.add(description);
  assert.ok(fs.existsSync(path.join(root, "guides", item.guideSlug, "index.html")), `${route}: guide`);
  assert.ok(fs.existsSync(path.join(root, "skills", item.category, "index.html")), `${route}: quiz`);
}
const hub = read("/cases/");
for (const item of CASES) assert.ok(hub.includes(`href="/cases/${item.slug}/"`), `${item.slug}: crawlable hub link`);
const manifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../.next/prerender-manifest.json"), "utf8"));
let pages = 0;
for (const route of Object.keys(manifest.routes)) {
  if (route.startsWith("/_") || path.extname(route)) continue;
  assert.ok(fs.existsSync(path.join(root, route, "index.html")), `${route}: exported existing/new route`);
  pages++;
}
console.log(`PASS: ${CASES.length} gated cases plus hub; unique SEO/schema, no initial grading, all case URLs in sitemap, and ${pages} existing/new HTML routes exported.`);

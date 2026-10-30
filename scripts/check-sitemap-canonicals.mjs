// Fails the build when a sitemap URL is not the canonical URL of that page.
// GitHub Pages serves directory indexes at /path/ and 301s /path to /path/.
// Every public URL in the export must use that same form.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] ?? "out";
const origin = "https://thinkoperator.com";
const sitemapPath = join(root, "sitemap.xml");
const sitemap = readFileSync(sitemapPath, "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (!locs.length) {
  console.error("sitemap has no <loc> entries");
  process.exit(1);
}

function pageFile(url) {
  const path = new URL(url).pathname;
  if (path === "/") return join(root, "index.html");
  return join(root, path.replace(/^\//, ""), "index.html");
}

function canonicalHref(html) {
  const head = html.split("</head>")[0];
  for (const tag of head.match(/<link\b[^>]*>/g) ?? []) {
    if (!/\brel="canonical"/.test(tag)) continue;
    return tag.match(/\bhref="([^"]*)"/)?.[1] ?? "";
  }
  return "";
}

const failures = [];
const pagePaths = new Set();
for (const loc of locs) {
  let url;
  try {
    url = new URL(loc);
  } catch {
    failures.push(`sitemap URL is not absolute: ${loc}`);
    continue;
  }
  if (url.origin !== origin) failures.push(`sitemap URL is off-origin: ${loc}`);
  if (!url.pathname.endsWith("/")) failures.push(`sitemap URL missing trailing slash: ${loc}`);
  pagePaths.add(url.pathname);
  let html;
  try {
    html = readFileSync(pageFile(loc), "utf8");
  } catch {
    failures.push(`sitemap URL has no exported page: ${loc}`);
    continue;
  }
  const canonical = canonicalHref(html);
  if (canonical !== loc) {
    failures.push(`canonical mismatch for ${loc}: page canonical is ${canonical || "(missing)"}`);
  }
}

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (/\.(html|js|txt|xml)$/.test(name)) files.push(full);
  }
  return files;
}

const slashless = new Set([...pagePaths].filter((path) => path !== "/").map((path) => path.slice(0, -1)));
const found = new Set();
const urlPattern = /(?:https:\/\/thinkoperator\.com)?(\/(?:[A-Za-z0-9-]+\/)*[A-Za-z0-9-]+)(?=[?"'#\s<\\]|$)/g;
for (const file of walk(root)) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(urlPattern)) {
    const path = match[1];
    if (!slashless.has(path)) continue;
    found.add(`${file}: ${path}`);
    if (found.size >= 30) break;
  }
  if (found.size >= 30) break;
}
for (const item of found) failures.push(`slashless page URL in export: ${item}`);

if (failures.length) {
  console.error(failures.join("\n"));
  console.error(`FAIL: ${failures.length} sitemap/canonical problem(s)`);
  process.exit(1);
}

console.log(`PASS: ${locs.length} sitemap URLs match their page canonicals on the trailing-slash form`);

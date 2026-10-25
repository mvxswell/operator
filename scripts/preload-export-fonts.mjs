import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

/** next/font's manifest can be empty in an export; find the actual Latin face. */
export function primaryFontHref(css) {
  const faces = css.match(/@font-face\s*\{[^}]+\}/g) ?? [];
  const latin = faces.find((face) => /font-family\s*:\s*["']?Geist["']?\s*;/.test(face) && /unicode-range\s*:\s*u\+00/i.test(face));
  return latin?.match(/url\(["']?(\/_next\/static\/media\/[^)"']+\.woff2)["']?\)/)?.[1] ?? null;
}

export function withFontPreload(html, href) {
  if (!/^\/_next\/static\/media\/[\w.-]+\.woff2$/.test(href)) throw new Error("Invalid font preload path");
  if (html.includes("data-reading-page=")) return html;
  if (html.includes(`rel="preload" href="${href}"`)) return html;
  return html.replace("<head>", `<head><link rel="preload" href="${href}" as="font" type="font/woff2" crossorigin="anonymous">`);
}

export async function preloadExportFont(root) {
  const cssRoot = join(root, "_next/static/css");
  const css = await Promise.all((await readdir(cssRoot)).filter((name) => name.endsWith(".css")).map((name) => readFile(join(cssRoot, name), "utf8")));
  const href = primaryFontHref(css.join("\n"));
  if (!href) throw new Error("Cannot find the primary Latin Geist font in exported CSS");
  async function walk(folder) {
    let count = 0;
    for (const entry of await readdir(folder, { withFileTypes: true })) {
      const file = join(folder, entry.name);
      if (entry.isDirectory()) count += await walk(file);
      else if (entry.name.endsWith(".html")) {
        const original = await readFile(file, "utf8");
        const optimized = withFontPreload(original, href);
        if (optimized !== original) { await writeFile(file, optimized); count++; }
      }
    }
    return count;
  }
  return walk(root);
}

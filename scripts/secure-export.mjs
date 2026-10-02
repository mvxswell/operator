import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Hash the exact inline hydration scripts; GitHub Pages cannot set CSP headers.
export function secureHtml(html, presenceOrigin = "", analyticsEnabled = false) {
  const clean = html.replace(/<meta data-export-security="true"[^>]*>/g, "");
  const hashes = new Set();
  for (const match of clean.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!/\bsrc\s*=/i.test(match[1])) hashes.add(`'sha256-${createHash("sha256").update(match[2]).digest("base64")}'`);
  }
  const analyticsScript = analyticsEnabled ? " https://static.cloudflareinsights.com/beacon.min.js" : "";
  const analyticsConnect = analyticsEnabled ? " https://cloudflareinsights.com" : "";
  const policy = ["default-src 'self'", `script-src 'self' ${[...hashes].join(" ")}${analyticsScript}`, "script-src-attr 'none'", "style-src 'self' 'unsafe-inline'", "img-src 'self' data: blob:", "font-src 'self'", `connect-src 'self' ${presenceOrigin}${analyticsConnect}`, "object-src 'none'", "base-uri 'none'", "form-action 'none'", "frame-src 'none'"].join("; ");
  if (!clean.includes("<head>")) throw new Error("Exported HTML has no head element");
  return clean.replace("<head>", `<head><meta data-export-security="true" http-equiv="Content-Security-Policy" content="${policy}"><meta data-export-security="true" name="referrer" content="strict-origin-when-cross-origin">`);
}

export async function secureExport(root, presenceOrigin = "", analyticsEnabled = false) {
  let count = 0;
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const path = join(root, entry.name);
    if (entry.isDirectory()) count += await secureExport(path, presenceOrigin, analyticsEnabled);
    else if (entry.name.endsWith(".html")) {
      await writeFile(path, secureHtml(await readFile(path, "utf8"), presenceOrigin, analyticsEnabled));
      count += 1;
    }
  }
  return count;
}

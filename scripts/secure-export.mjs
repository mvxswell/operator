import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Hash the exact inline hydration scripts; GitHub Pages cannot set CSP headers.
// presenceOrigin is the presence worker origin. connect-src covers POST /online,
// POST /e, and POST /subscribe. form-action stays 'none': the signup form uses
// fetch(), not a document navigation, so a no-JS form cannot post elsewhere.
export function secureHtml(html, presenceOrigin = "", analyticsEnabled = false, extraOrigin = "") {
  const clean = html.replace(/<meta data-export-security="true"[^>]*>/g, "");
  const hashes = new Set();
  for (const match of clean.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!/\bsrc\s*=/i.test(match[1])) hashes.add(`'sha256-${createHash("sha256").update(match[2]).digest("base64")}'`);
  }
  const analyticsScript = analyticsEnabled ? " https://static.cloudflareinsights.com/beacon.min.js" : "";
  const analyticsConnect = analyticsEnabled ? " https://cloudflareinsights.com" : "";
  const extraConnect = extraOrigin ? ` ${extraOrigin}` : "";
  const policy = ["default-src 'self'", `script-src 'self' ${[...hashes].join(" ")}${analyticsScript}`, "script-src-attr 'none'", "style-src 'self' 'unsafe-inline'", "img-src 'self' data: blob:", "font-src 'self'", `connect-src 'self' ${presenceOrigin}${analyticsConnect}${extraConnect}`, "object-src 'none'", "base-uri 'none'", "form-action 'none'", "frame-src 'none'"].join("; ");
  if (!clean.includes("<head>")) throw new Error("Exported HTML has no head element");
  return clean.replace("<head>", `<head><meta data-export-security="true" http-equiv="Content-Security-Policy" content="${policy}"><meta data-export-security="true" name="referrer" content="strict-origin-when-cross-origin">`);
}

const TOGI_FEED_ORIGIN = "https://togi-tracker.mrm1244.workers.dev";

/**
 * Origins every exported document may contact. The homepage hero reads the Togi
 * feed, and a client navigation keeps the CSP of the first document, so the
 * origin has to be present even on pages that do not fetch it themselves.
 */
export const SHARED_CONNECT_ORIGINS = [TOGI_FEED_ORIGIN];

/**
 * Extra connect-src origins for one route only, keyed by the export directory.
 * /togi/ reads the same feed (see src/lib/togi.ts).
 */
export const ROUTE_CONNECT_ORIGINS = {
  togi: TOGI_FEED_ORIGIN,
};

function connectOrigins(...parts) {
  const seen = new Set();
  const out = [];
  for (const part of parts) {
    for (const origin of String(part ?? "").split(/\s+/)) {
      if (!origin || seen.has(origin)) continue;
      seen.add(origin);
      out.push(origin);
    }
  }
  return out.join(" ");
}

export async function secureExport(root, presenceOrigin = "", analyticsEnabled = false, extraOrigin = "", rel = "") {
  let count = 0;
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const path = join(root, entry.name);
    if (entry.isDirectory()) count += await secureExport(path, presenceOrigin, analyticsEnabled, extraOrigin, rel ? `${rel}/${entry.name}` : entry.name);
    else if (entry.name.endsWith(".html")) {
      const routeOrigin = ROUTE_CONNECT_ORIGINS[rel] ?? "";
      const origins = connectOrigins(extraOrigin, ...SHARED_CONNECT_ORIGINS, routeOrigin);
      await writeFile(path, secureHtml(await readFile(path, "utf8"), presenceOrigin, analyticsEnabled, origins));
      count += 1;
    }
  }
  return count;
}

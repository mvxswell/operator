// Builds the static export for GitHub Pages.
//
// Sets GITHUB_PAGES itself rather than relying on inline env-var syntax, which
// npm cannot use on Windows (scripts run through cmd.exe). Works from bash,
// cmd and PowerShell alike, with no extra dependency.

import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { secureExport } from "./secure-export.mjs";

const env = {
  ...process.env,
  GITHUB_PAGES: "true",
  NEXT_PUBLIC_PRESENCE_URL: process.env.NEXT_PUBLIC_PRESENCE_URL || "https://think-operator-presence.mrm1244.workers.dev/online",
};
const presenceOrigin = env.NEXT_PUBLIC_PRESENCE_URL
  ? new URL(env.NEXT_PUBLIC_PRESENCE_URL).origin
  : "";
if (presenceOrigin && !presenceOrigin.startsWith("https://")) throw new Error("Presence service must use HTTPS");

function httpsOrigin(name, value) {
  if (!value) return "";
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${name} is not a valid URL`);
  }
  if (url.protocol !== "https:") throw new Error(`${name} must use HTTPS`);
  return url.origin;
}

const supabaseOrigin = httpsOrigin("NEXT_PUBLIC_SUPABASE_URL", env.NEXT_PUBLIC_SUPABASE_URL);

// Run Next's JS entry with the current node binary. Resolving the shell shim
// (`npx.cmd`) is unreliable under spawn on Windows.
const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");

// Webpack also works on Windows hosts where Turbopack's CSS worker cannot start.
const build = spawnSync(process.execPath, [nextBin, "build", "--webpack"], {
  stdio: "inherit",
  env,
});
if (build.error) {
  console.error(build.error);
  process.exit(1);
}
if (build.status !== 0) process.exit(build.status ?? 1);

const flatten = spawnSync(
  process.execPath,
  ["scripts/flatten-rsc-payloads.mjs", "out"],
  { stdio: "inherit", env },
);
if (flatten.status !== 0) process.exit(flatten.status ?? 1);
console.log(`secure-export: protected ${await secureExport("out", presenceOrigin, true, supabaseOrigin)} HTML files`);

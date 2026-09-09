// Builds the static export for GitHub Pages.
//
// Sets GITHUB_PAGES itself rather than relying on inline env-var syntax, which
// npm cannot use on Windows (scripts run through cmd.exe). Works from bash,
// cmd and PowerShell alike, with no extra dependency.

import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { secureExport } from "./secure-export.mjs";

const env = { ...process.env, GITHUB_PAGES: "true" };

// Run Next's JS entry with the current node binary. Resolving the shell shim
// (`npx.cmd`) is unreliable under spawn on Windows.
const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");

const build = spawnSync(process.execPath, [nextBin, "build"], {
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
console.log(`secure-export: protected ${await secureExport("out")} HTML files`);

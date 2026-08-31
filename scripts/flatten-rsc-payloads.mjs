// Post-build fix for static export on plain static hosts (GitHub Pages).
//
// `next build` with output: "export" writes per-segment prefetch payloads as
// nested directories, e.g.  quick/__next.quick/__PAGE__.txt
// but the client requests them dot-joined, e.g.
//                           quick/__next.quick.__PAGE__.txt
//
// A Next server resolves that mapping at request time; a static host cannot.
// This copies each payload to the flattened name the client actually asks for,
// which keeps Link prefetching working instead of falling back to full page
// loads. The nested originals are left in place.

import { readdir, copyFile, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const OUT_DIR = process.argv[2] ?? "out";

/** Every directory under root whose own name starts with "__next.". */
async function findPayloadDirs(root) {
  const found = [];
  async function walk(dir) {
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const full = join(dir, entry.name);
      if (entry.name.startsWith("__next.")) {
        found.push({ parent: dir, dir: full });
      }
      await walk(full);
    }
  }
  await walk(root);
  return found;
}

async function filesUnder(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await filesUnder(full)));
    else out.push(full);
  }
  return out;
}

const dirs = await findPayloadDirs(OUT_DIR);
let copied = 0;

for (const { parent, dir } of dirs) {
  for (const file of await filesUnder(dir)) {
    // "__next.skills/$d$category/__PAGE__.txt" -> "__next.skills.$d$category.__PAGE__.txt"
    const flatName = relative(parent, file).split(sep).join(".");
    const target = join(parent, flatName);
    try {
      await stat(target);
      continue; // already present
    } catch {
      /* not there yet */
    }
    await copyFile(file, target);
    copied += 1;
  }
}

console.log(`flatten-rsc-payloads: wrote ${copied} flattened payload(s) across ${dirs.length} dir(s)`);

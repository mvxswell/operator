/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const ts = require("typescript");

require.extensions[".ts"] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename);
};

const togi = require("../src/lib/togi.ts");
const snapshot = require("../src/data/togiSnapshot.json");

test("bundled Togi snapshot is valid fallback data", () => {
  assert.equal(togi.isTogiData(snapshot), true);
  assert.match(snapshot.meta.last_updated, /^\d{4}-\d{2}-\d{2}$/);
});

test("feed links are limited to X posts", () => {
  assert.equal(togi.safeXUrl("https://x.com/ShaneStoffer/status/2117345071418716335"), "https://x.com/ShaneStoffer/status/2117345071418716335");
  for (const bad of ["javascript:alert(1)", "https://evil.example/x.com/a/status/1", "https://x.com/a/status/1\" onmouseover=\"x", null, 7]) {
    assert.equal(togi.safeXUrl(bad), togi.TOGI_PROFILE_URL);
  }
});

test("malformed feeds are rejected", () => {
  assert.equal(togi.isTogiData(null), false);
  assert.equal(togi.isTogiData({}), false);
  assert.equal(togi.isTogiData({ ...snapshot, trades: [] }), false);
  assert.equal(togi.isTogiData({ ...snapshot, meta: { ...snapshot.meta, latest_value: "lots" } }), false);
  assert.equal(togi.isTogiData({ ...snapshot, trades: [{ ...snapshot.trades[0], pnl: "1" }] }), false);
});

test("live data is used when the feed answers, the snapshot otherwise", async () => {
  const live = { ...snapshot, meta: { ...snapshot.meta, last_updated: "2030-01-01" } };
  const ok = async (url, init) => {
    assert.equal(url, togi.TOGI_LIVE_URL);
    assert.equal(init.credentials, "omit");
    return { ok: true, json: async () => live };
  };
  assert.deepEqual(await togi.loadTogiData(snapshot, ok), { data: live, source: "live" });
  const cases = [
    async () => { throw new TypeError("Failed to fetch"); },
    async () => ({ ok: false, status: 503, json: async () => live }),
    async () => ({ ok: true, json: async () => { throw new SyntaxError("bad json"); } }),
    async () => ({ ok: true, json: async () => ({ meta: {} }) }),
    (_url, init) => new Promise((_, reject) => init.signal.addEventListener("abort", () => reject(new Error("aborted")))),
  ];
  for (const fetchImpl of cases) {
    const result = await togi.loadTogiData(snapshot, fetchImpl, 20);
    assert.equal(result.source, "snapshot");
    assert.equal(result.data, snapshot);
  }
});

test("only /togi/ may connect to the Togi feed", async () => {
  const { ROUTE_CONNECT_ORIGINS } = await import("../scripts/secure-export.mjs");
  assert.deepEqual(ROUTE_CONNECT_ORIGINS, { togi: togi.TOGI_LIVE_ORIGIN });
});

test("Togi page keeps its disclaimer and neutral call to action", () => {
  const page = fs.readFileSync("src/components/togi/TogiTracker.tsx", "utf8");
  assert.match(page, /Unofficial fan tracker\./);
  assert.match(page, /Not affiliated with, endorsed by, or run by Togi \/ Shane Stoffer/);
  assert.match(page, /Not financial advice\./);
  assert.match(page, /href="\/operator\/"/);
  assert.doesNotMatch(page, /Togi or a Buffett|We're building a test|We&apos;re building a test/);
  const css = fs.readFileSync("src/app/togi/togi.css", "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  for (const rule of css.match(/(?:^|})\s*([^@{}][^{}]*)\{/g) ?? []) {
    const selectors = rule.replace(/^}?\s*/, "").slice(0, -1).trim();
    if (selectors.startsWith("@")) continue;
    if (/^(?:\d+%|to|from)(?:\s*,\s*(?:\d+%|to|from))*$/.test(selectors.trim())) continue;
    for (const sel of selectors.split(",")) assert.ok(sel.trim().startsWith(".togi-tracker"), `unscoped selector: ${sel}`);
  }
  for (const name of css.matchAll(/@keyframes\s+([\w-]+)/g)) assert.ok(name[1].startsWith("tg-"), name[1]);
});

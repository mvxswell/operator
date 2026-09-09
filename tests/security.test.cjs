/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const ts = require("typescript");
// Exercise production TypeScript without adding a test dependency.
require.extensions[".ts"] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText, filename);
};
const storage = require("../src/lib/storage.ts");

test("malformed saved structures normalize to a usable profile", () => {
  for (const input of [null, [], "bad", { version: 1, operator: { runs: "bad", best: "999" }, skills: { financial: { runs: {} } }, daily: [] }]) {
    const profile = storage.reviveProfile(input);
    assert.ok(Array.isArray(profile.operator.runs));
    assert.ok(Array.isArray(profile.skills.financial.runs));
    assert.equal(profile.operator.best, 0);
  }
});
test("invalid dates, duplicate IDs, dangerous keys and invalid scores are handled", () => {
  const raw = storage.emptyProfile();
  raw.operator.best = Infinity;
  raw.operator.runs = [
    { id: "x", at: "2026-09-08T12:00:00Z", score: 90000, total: 20, correct: 50, skills: { financial: -1 } },
    { id: "x", at: "2026-09-08T12:00:00Z" }, { id: "y", at: "bad" },
  ];
  raw.daily = JSON.parse('{"__proto__":{"polluted":true}}');
  const profile = storage.reviveProfile(raw);
  assert.equal(profile.operator.best, 0);
  assert.equal(profile.operator.runs.length, 1);
  assert.equal(profile.operator.runs[0].score, 1000);
  assert.equal(profile.operator.runs[0].correct, 20);
  assert.equal(profile.operator.runs[0].accuracy, 1);
  assert.equal(profile.operator.runs[0].skills.financial, 0);
  assert.deepEqual(profile.daily, {});
  assert.equal({}.polluted, undefined);
});
test("history is bounded and valid backups round-trip", () => {
  const raw = storage.emptyProfile();
  raw.skills.financial.runs = Array.from({ length: 130 }, (_, i) => ({ id: `run-${i}`, at: new Date(1700000000000 + i * 1000).toISOString(), category: "financial", score: 500, accuracy: 0.7, highestLevel: 3 }));
  const profile = storage.reviveProfile(JSON.parse(JSON.stringify(raw)));
  assert.equal(profile.skills.financial.runs.length, storage.MAX_RUNS_KEPT);
  assert.equal(profile.skills.financial.runs[0].id, "run-129");
  assert.deepEqual(storage.reviveProfile(JSON.parse(JSON.stringify(profile))), profile);
  assert.throws(() => storage.importProfileBackup('{"version":9}'));
  assert.throws(() => storage.importProfileBackup("x".repeat(storage.MAX_BACKUP_BYTES + 1)));
});
test("blocked persistence warns and retains the current session", () => {
  global.window = { localStorage: { setItem() { throw new Error("quota"); }, removeItem() { throw new Error("denied"); } } };
  const profile = storage.emptyProfile();
  profile.operator.best = 700;
  storage.profileStore.save(profile);
  assert.equal(storage.profileStore.load().operator.best, 700);
  assert.match(storage.getStorageWarning(), /could not save/);
  storage.profileStore.clear();
  assert.equal(storage.profileStore.load().operator.best, 0);
  assert.match(storage.getStorageWarning(), /could not be cleared/);
  delete global.window;
});
test("export CSP hashes inline scripts without allowing arbitrary inline JS", async () => {
  const { secureHtml } = await import("../scripts/secure-export.mjs");
  const html = '<html><head></head><body><script>window.example=1</script></body></html>';
  const protectedHtml = secureHtml(html);
  assert.match(protectedHtml, /script-src 'self' 'sha256-/);
  assert.match(protectedHtml, /object-src 'none'/);
  assert.doesNotMatch(protectedHtml, /script-src[^;]*unsafe-inline/);
  assert.equal(secureHtml(protectedHtml), protectedHtml);
});

test("cross-tab events invalidate cached progress and unsubscribe removes listener", () => {
  let handler;
  let notifications = 0;
  const profile = storage.emptyProfile();
  profile.operator.best = 825;
  global.window = {
    localStorage: { getItem: () => JSON.stringify(profile) },
    addEventListener(name, callback) { assert.equal(name, "storage"); handler = callback; },
    removeEventListener(name, callback) { assert.equal(name, "storage"); assert.equal(callback, handler); handler = null; },
  };
  const unsubscribe = storage.profileStore.subscribe(() => notifications++);
  handler({ key: "unrelated" });
  assert.equal(notifications, 0);
  handler({ key: storage.STORAGE_KEY });
  assert.equal(notifications, 1);
  assert.equal(storage.profileStore.load().operator.best, 825);
  unsubscribe();
  assert.equal(handler, null);
  delete global.window;
});

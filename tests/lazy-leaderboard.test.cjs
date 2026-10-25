/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const ts = require("typescript");
require.extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);

test("Supabase loads only for a configured request and preserves board RPC mapping", async () => {
  const original = { url: process.env.NEXT_PUBLIC_SUPABASE_URL, key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, stub: process.env.NEXT_PUBLIC_LEADERBOARD_STUB, fetch: global.fetch };
  const sdkLoaded = () => Object.keys(require.cache).some((file) => file.includes("@supabase"));
  delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  delete process.env.NEXT_PUBLIC_LEADERBOARD_STUB;
  try {
    const { fetchLeaderboard } = require("../src/lib/leaderboard.ts");
    assert.equal(sdkLoaded(), false);
    assert.deepEqual(await fetchLeaderboard("financial", 5), []);
    assert.equal(sdkLoaded(), false);
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test-project.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "public-test-key";
    const requests = [];
    global.fetch = async (url, options) => {
      requests.push({ url: String(url), body: JSON.parse(options.body) });
      return new Response(JSON.stringify([{ board_rank: 2, nickname: "Test operator", score: 700, duration_ms: 90000, created_at: "2026-10-24T12:00:00Z" }]), { status: 200, headers: { "Content-Type": "application/json" } });
    };
    assert.deepEqual(await fetchLeaderboard("financial", 5), [{ rank: 2, nickname: "Test operator", score: 700, durationMs: 90000, createdAt: "2026-10-24T12:00:00Z" }]);
    assert.equal(sdkLoaded(), true);
    assert.equal(requests.length, 1);
    assert.ok(requests[0].url.endsWith("/rest/v1/rpc/leaderboard"));
    assert.deepEqual(requests[0].body, { p_mode: "financial", p_limit: 5 });
  } finally {
    for (const [name, value] of [["NEXT_PUBLIC_SUPABASE_URL", original.url], ["NEXT_PUBLIC_SUPABASE_ANON_KEY", original.key], ["NEXT_PUBLIC_LEADERBOARD_STUB", original.stub]]) {
      if (value === undefined) delete process.env[name]; else process.env[name] = value;
    }
    global.fetch = original.fetch;
  }
});

/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const ts = require("typescript");

require.extensions[".ts"] = (module, filename) => {
  module._compile(
    ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText,
    filename,
  );
};

const subscribe = require("../src/lib/subscribe.ts");

function form(fields) {
  return new URLSearchParams(fields).toString();
}

test("email is lowercased and rejected when the format is wrong", () => {
  assert.equal(subscribe.normalizeSubscriberEmail("  Maxwell@Example.com "), "maxwell@example.com");
  assert.equal(subscribe.normalizeSubscriberEmail("owner+brief@thinkoperator.com"), "owner+brief@thinkoperator.com");
  for (const bad of ["", "not-an-email", "a@b", "a@b.c", "a@.com", "@example.com", "a@example", "a b@example.com", `${"a".repeat(65)}@example.com`]) {
    assert.equal(subscribe.normalizeSubscriberEmail(bad), null, bad);
  }
});

test("subscribe decision stores a new address, hides a duplicate shape, and drops a honeypot", () => {
  const type = "application/x-www-form-urlencoded;charset=UTF-8";
  const first = subscribe.decideSubscribe(type, form({ email: "Owner@Example.com", company: "" }));
  const again = subscribe.decideSubscribe(type, form({ email: "owner@example.com", company: "  " }));
  assert.deepEqual(first, { ok: true, email: "owner@example.com" });
  assert.deepEqual(again, { ok: true, email: "owner@example.com" });
  assert.deepEqual(subscribe.decideSubscribe(type, form({ email: "owner@example.com", company: "acme" })), { ok: true, email: null });
  assert.deepEqual(subscribe.decideSubscribe(type, form({ email: "nope", company: "" })), { ok: false });
  assert.deepEqual(subscribe.decideSubscribe("application/json", form({ email: "owner@example.com" })), { ok: false });
  assert.deepEqual(subscribe.decideSubscribe(type, ""), { ok: false });
});

test("subscribe endpoint replaces the presence path and the worker contract matches it", () => {
  assert.equal(
    subscribe.subscribeEndpoint("https://think-operator-presence.mrm1244.workers.dev/online"),
    "https://think-operator-presence.mrm1244.workers.dev/subscribe",
  );
  assert.equal(subscribe.subscribeEndpoint(undefined), null);
  assert.equal(subscribe.subscribeEndpoint("not a url"), null);
  assert.equal(subscribe.SUBSCRIBE_MAX_BYTES, 512);
  assert.equal(subscribe.HONEYPOT_FIELD, "company");

  const worker = fs.readFileSync("worker/presence.js", "utf8");
  assert.match(worker, /path === "\/subscribe"/);
  assert.match(worker, /CREATE TABLE IF NOT EXISTS subscribers \(email TEXT PRIMARY KEY, subscribed_at TEXT NOT NULL\)/);
  assert.match(worker, /INSERT INTO subscribers \(email, subscribed_at\) VALUES \(\?, \?\) ON CONFLICT\(email\) DO NOTHING/);
  assert.match(worker, /saveSubscriber\(decision\.email, new Date\(\)\.toISOString\(\)\)/);
  assert.match(worker, /env\.SUBSCRIBE_RATE\.limit/);
  const handler = worker.slice(worker.indexOf("async function handleSubscribe"));
  assert.ok(handler.indexOf(".limit(") < handler.indexOf("readBoundedText("), "rate limit before the body");
  assert.match(handler, /saveSubscriber\(decision\.email, new Date\(\)\.toISOString\(\)\)/);
  assert.doesNotMatch(handler, /User-Agent|saveSubscriber\([^)]*CF-Connecting-IP/);
  assert.match(worker, /return new Response\(null, \{ status: 204, headers \}\)/);

  const wrangler = fs.readFileSync("wrangler.jsonc", "utf8");
  assert.match(wrangler, /"name": "SUBSCRIBE_RATE", "namespace_id": "1003", "simple": \{ "limit": 5, "period": 60 \}/);

  const privacy = fs.readFileSync("src/app/privacy/page.tsx", "utf8");
  assert.match(privacy, /stored only to send that brief/);
  assert.match(privacy, /unsubscribe by replying/);
  assert.doesNotMatch(privacy, /home_view|three layouts/);
});

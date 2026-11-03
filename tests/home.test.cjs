/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

require.extensions[".ts"] = (module, filename) => {
  module._compile(
    ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText,
    filename,
  );
};

const V = require("../src/lib/homeVariant.ts");
const events = require("../src/lib/funnelEvents.ts");

/** Run the inline head script against a fake browser and return [variant, stored value]. */
function runInline(search, stored, random, { storageThrows = false } = {}) {
  const store = new Map(stored === null ? [] : [[V.HOME_VARIANT_KEY, stored]]);
  const attrs = {};
  const localStorage = {
    getItem: (k) => { if (storageThrows) throw new Error("denied"); return store.has(k) ? store.get(k) : null; },
    setItem: (k, v) => { if (storageThrows) throw new Error("denied"); store.set(k, String(v)); },
  };
  const math = Object.create(Math);
  math.random = () => random;
  vm.runInNewContext(V.HOME_VARIANT_SCRIPT, {
    location: { search }, localStorage, Math: math,
    document: { documentElement: { setAttribute: (k, v) => { attrs[k] = v; } } },
  });
  return [attrs[V.HOME_VARIANT_ATTR], store.get(V.HOME_VARIANT_KEY) ?? null];
}

test("variant: new visitors split 50/50 and the choice sticks", () => {
  assert.deepEqual(V.resolveHomeVariant("", null, 0.1), { variant: "a", store: "a" });
  assert.deepEqual(V.resolveHomeVariant("", null, 0.49), { variant: "a", store: "a" });
  assert.deepEqual(V.resolveHomeVariant("", null, 0.5), { variant: "b", store: "b" });
  assert.deepEqual(V.resolveHomeVariant("", null, 0.99), { variant: "b", store: "b" });
  // Returning visitors keep their variant whatever the coin says.
  assert.deepEqual(V.resolveHomeVariant("", "a", 0.99), { variant: "a", store: null });
  assert.deepEqual(V.resolveHomeVariant("", "b", 0.01), { variant: "b", store: null });
  // Garbage in storage is replaced by a fresh draw.
  assert.deepEqual(V.resolveHomeVariant("", "c", 0.7), { variant: "b", store: "b" });
  // Roughly even over many draws.
  let b = 0;
  for (let i = 0; i < 1000; i++) if (V.resolveHomeVariant("", null, i / 1000).variant === "b") b++;
  assert.equal(b, 500);
});

test("variant: ?v=a / ?v=b force a variant without overwriting the stored one", () => {
  assert.deepEqual(V.resolveHomeVariant("?v=b", "a", 0.1), { variant: "b", store: null });
  assert.deepEqual(V.resolveHomeVariant("?v=a", "b", 0.9), { variant: "a", store: null });
  assert.deepEqual(V.resolveHomeVariant("?utm_source=x&v=B", null, 0.1), { variant: "b", store: null });
  assert.deepEqual(V.resolveHomeVariant("?v=c", "b", 0.1), { variant: "b", store: null });
  assert.deepEqual(V.resolveHomeVariant("?vv=a", "b", 0.1), { variant: "b", store: null });
  assert.deepEqual(V.resolveHomeVariant("?v=ab", null, 0.9), { variant: "b", store: "b" });
});

test("variant: the inline head script agrees with resolveHomeVariant", () => {
  const searches = ["", "?v=a", "?v=b", "?v=B", "?x=1&v=a", "?v=c", "?vv=b", "?v=ab"];
  const storedValues = [null, "a", "b", "zz"];
  for (const search of searches) for (const stored of storedValues) for (const r of [0.2, 0.8]) {
    const expected = V.resolveHomeVariant(search, stored, r);
    const [variant, after] = runInline(search, stored, r);
    assert.equal(variant, expected.variant, `${search} ${stored} ${r}`);
    assert.equal(after, expected.store ?? stored, `stored after ${search} ${stored} ${r}`);
  }
  // Blocked storage still picks and applies a variant.
  assert.match(runInline("", null, 0.8, { storageThrows: true })[0], /^[ab]$/);
});

test("variant: the homepage runs the script inline before the sections and CSS orders by it", () => {
  const page = fs.readFileSync("src/app/page.tsx", "utf8");
  const script = page.indexOf("dangerouslySetInnerHTML={{ __html: HOME_VARIANT_SCRIPT }}");
  assert.ok(script > 0, "inline variant script");
  assert.ok(script < page.indexOf('className="hh-hero"'), "script comes before the hero");
  const css = fs.readFileSync("src/app/home.css", "utf8");
  assert.match(css, /\.home-hub \.hh-trackers\{order:1\}/);
  assert.match(css, /\.home-hub \.hh-quiz\{order:2\}/);
  assert.match(css, /html\[data-home-v="b"\] \.home-hub \.hh-quiz\{order:1\}/);
  assert.match(css, /html\[data-home-v="b"\] \.home-hub \.hh-trackers\{order:2\}/);
  // One h1 and no second canonical for either variant.
  assert.equal((page.match(/<h1\b/g) || []).length, 1);
  assert.doesNotMatch(page, /canonical/);
});

test("trackers: Grok Bot comes before Togi, then the coming-soon card, in both variants", () => {
  const page = fs.readFileSync("src/app/page.tsx", "utf8");
  const grok = page.indexOf('card="grok"');
  const togi = page.indexOf('card="togi"');
  const next = page.indexOf("Next tracker coming soon");
  assert.ok(grok > 0 && togi > grok && next > togi, "DOM order grok < togi < next");
  // Variants only reorder whole sections, never cards inside the tracker grid.
  const css = fs.readFileSync("src/app/home.css", "utf8");
  assert.doesNotMatch(css, /hh-(?:grok|togi|next)\{(?:[^}]*;)?order:/);
  // Togi stays a plain <a> (its page has its own CSP).
  const client = fs.readFileSync("src/components/home/HomeClient.tsx", "utf8");
  assert.match(client, /if \(card === "togi"\) \{\s*return <a href=\{href\}/);
});

test("trackers: built homepage HTML shows Grok Bot first with the real numbers", { skip: !fs.existsSync("out/index.html") }, () => {
  const html = fs.readFileSync("out/index.html", "utf8");
  const body = html.slice(html.indexOf('id="trackers"'));
  const grok = body.indexOf('href="/grok-bot-savings-tracker/"');
  const togi = body.indexOf('href="/togi/"');
  assert.ok(grok > 0 && togi > grok);
  const S = require("../src/data/grokBotSavings.json").summary;
  assert.ok(html.includes(`+$${S.return_full.toFixed(2)}`));
  assert.match(html, /Watch real operators\./);
  assert.ok(html.replace(/<!-- -->/g, "").includes(" / $10M<"), "Togi ticker shows the $10M goal");
  assert.doesNotMatch(html, /\/ \$1M</);
  assert.match(html, /<link rel="canonical" href="https:\/\/thinkoperator.com\/"/);
  assert.doesNotMatch(html, /name="robots" content="noindex/);
});

test("home events: allow-listed, tagged with the variant, and off unless the flag is set", () => {
  const H = require("../src/lib/homeEvents.ts");
  assert.equal(H.HOME_EVENTS_ENABLED, process.env.NEXT_PUBLIC_HOME_AB_EVENTS === "1");
  for (const v of ["a", "b"]) {
    assert.equal(H.homeEventName("view", v), `home_view:${v}`);
    for (const card of ["grok", "togi"]) assert.equal(events.isFunnelEvent(H.homeEventName("tracker", v, card)), true);
    for (const quiz of ["operator", "daily", "quick"]) assert.equal(events.isFunnelEvent(H.homeEventName("quiz", v, quiz)), true);
    assert.equal(events.isFunnelEvent(`home_view:${v}`), true);
  }
  for (const bad of ["home_view", "home_view:c", "home_view:a:1", "tracker_click:next:a", "tracker_click:grok", "quiz_start:skills:a", "quiz_start:operator:a ", "home_view:a:742"]) {
    assert.equal(events.isFunnelEvent(bad), false, bad);
  }
  // Existing quiz funnel names are untouched.
  for (const name of ["operator:start", "quick:start", "daily:answer", "skill:financial:start"]) assert.equal(events.isFunnelEvent(name), true);
  assert.equal(events.funnelEventFromBody("text/plain", "tracker_click:grok:b"), "tracker_click:grok:b");
});

test("nav: five hub links, Togi pill kept", () => {
  const nav = fs.readFileSync("src/components/Nav.tsx", "utf8");
  const labels = [...nav.matchAll(/label: "([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(labels, ["Trackers", "Tests", "Daily", "Leaderboard", "Playbooks"]);
  assert.match(nav, />\s*Togi Tracker\s*<\/a>/);
});

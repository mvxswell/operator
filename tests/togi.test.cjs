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

test("header nav links to /togi/ with a plain anchor (full load picks up the /togi/ CSP)", () => {
  const nav = fs.readFileSync("src/components/Nav.tsx", "utf8");
  assert.match(nav, /const TOGI_HREF = "\/togi\/";/);
  // A plain <a> (never next/link) with the quiz-leave guard and aria-current.
  const anchor = nav.match(/<a\b[^>]*?href=\{TOGI_HREF\}[\s\S]*?<\/a>/);
  assert.ok(anchor, "Nav renders <a href={TOGI_HREF}>");
  assert.match(anchor[0], />\s*Togi Tracker\s*<\/a>/);
  assert.match(anchor[0], /onClick=\{\(event\) => leaveIfNeeded\(event, TOGI_HREF\)\}/);
  assert.match(anchor[0], /aria-current=\{isActive\(TOGI_HREF\)/);
  assert.doesNotMatch(nav, /<Link\b[^>]*href=\{TOGI_HREF\}/);
  // No other source file may link to /togi/ through next/link or the router.
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(`${dir}/${e.name}`) : /\.(tsx?|mjs)$/.test(e.name) ? [`${dir}/${e.name}`] : []);
  for (const file of walk("src")) {
    const src = fs.readFileSync(file, "utf8");
    assert.doesNotMatch(src, /<Link\b[^>]*href=["'{`]*\/togi/, `${file} uses next/link for /togi/`);
    assert.doesNotMatch(src, /router\.(push|replace)\(\s*["'`]\/togi/, `${file} routes to /togi/ client-side`);
  }
});

// ---- Portfolio (optional `portfolio` object in the feed) ----
const { renderPortfolioHtml, isStale, ND } = require("../src/components/togi/portfolio.ts");
const P = snapshot.portfolio;
const ON = new Date(P.as_of + "T15:00:00");
const clone = (v) => JSON.parse(JSON.stringify(v));

test("bundled snapshot carries a valid portfolio", () => {
  assert.equal(togi.isTogiPortfolio(P), true);
});

test("missing or malformed portfolio hides the section without breaking the page", () => {
  const { portfolio: _drop, ...noPortfolio } = snapshot;
  assert.equal(togi.isTogiData(noPortfolio), true);
  assert.equal(togi.isTogiPortfolio(undefined), false);
  for (const bad of [null, "x", [], {}, { ...P, positions: "lots" }, { ...P, accounts: [] },
    { ...P, positions: [{ ...P.positions[0], value: "big" }] }, { ...P, accounts: [{ ...P.accounts[0], cash: "some" }] }]) {
    assert.equal(togi.isTogiPortfolio(bad), false);
    assert.equal(togi.isTogiData({ ...snapshot, portfolio: bad }), true, "rest of the feed still renders");
  }
  const render = fs.readFileSync("src/components/togi/renderTogi.ts", "utf8");
  assert.match(render, /if \(isTogiPortfolio\(D\.portfolio\)\)/);
  assert.match(render, /pf\.hidden = !pfHtml;/);
  const page = fs.readFileSync("src/components/togi/TogiTracker.tsx", "utf8");
  assert.match(page, /<section id="portfolio"[^>]*\bhidden>/);
  // Placed right after the top block, before the tape.
  const top = page.indexOf('className="tg-topblock"'), pf = page.indexOf('id="portfolio"'), tape = page.indexOf('className="tape"');
  assert.ok(top < pf && pf < tape);
});

test("null renders 'not disclosed' and derived figures are labelled", () => {
  const html = renderPortfolioHtml(P, ON);
  assert.ok(ND.includes("not disclosed"));
  const fund = html.slice(html.indexOf('class="pf-row" data-t="FGMNX"'));
  assert.match(fund.slice(0, fund.indexOf("pf-foot")), /not disclosed/); // unrealized + cost basis are null
  assert.match(html, /Cash<\/p><p class="v ndv"><span class="nd">not disclosed<\/span>/);
  assert.match(html, /\$MSTR<\/b><span class="ty">puts<\/span><span class="mono ">.*not disclosed/);
  assert.match(html, /cost ≈\$1\.05M <span class="dv">derived<\/span>/);
  assert.match(html, /\+\$422,355 <span class="dv">derived<\/span>/);
  assert.doesNotMatch(html, /\$0(?![\d.,])/);
});

test("rows older than stale_after_days read 'Last known'", () => {
  assert.equal(isStale({ as_of: "2026-11-02", status: "current" }, P, ON), false);
  assert.equal(isStale({ as_of: "2026-10-30", status: "last_known" }, P, ON), true);
  const later = new Date("2026-11-12T15:00:00");
  assert.equal(isStale({ as_of: "2026-11-02", status: "current" }, P, later), true);
  const fresh = renderPortfolioHtml(P, ON);
  assert.equal((fresh.match(/Last known · /g) || []).length, 1, "only the Robinhood account is last_known today");
  const old = renderPortfolioHtml(P, later);
  const gpro = old.slice(old.indexOf('data-t="GPRO"', old.indexOf("pf-rows")));
  assert.match(gpro.slice(0, gpro.indexOf("</div>\n    </div>")), /Last known · Nov 2, 2026/);
});

test("Fidelity and Robinhood totals are never combined", () => {
  const html = renderPortfolioHtml(P, ON);
  const [a, b] = P.accounts.map((x) => x.total_value);
  const sum = a + b;
  for (const s of [sum.toLocaleString("en-US", { maximumFractionDigits: 0 }), sum.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), "$" + +(sum / 1e6).toFixed(2) + "M"]) {
    assert.ok(!html.includes(s), `combined total ${s} must not appear`);
  }
  assert.match(html, /never added together/);
});

test("latest_update is shown as the newer figure", () => {
  const html = renderPortfolioHtml(P, ON);
  const row = html.slice(html.indexOf('data-t="GPRO"', html.indexOf("pf-rows")));
  assert.match(row, /<span class="mono">\$929,142<\/span>/);
  assert.match(row, /Earlier: \$925,572/);
});

test("portfolio links only to X posts and escapes feed text", () => {
  const p = clone(P);
  p.positions[0].note = '<img src=x onerror=alert(1)>';
  p.positions[0].latest_update.source_url = "javascript:alert(1)";
  p.commentary[0].source_url = "https://evil.example/status/1";
  p.accounts[0].name = '"><script>x</script>';
  const html = renderPortfolioHtml(p, ON);
  assert.doesNotMatch(html, /<img|<script|javascript:|evil\.example/);
  for (const [, href] of html.matchAll(/href="([^"]*)"/g)) assert.match(href, /^https:\/\/(x|twitter)\.com\/[A-Za-z0-9_]+\/status\/\d+$/);
});

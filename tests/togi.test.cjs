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

test("the old 'Open shares' panel is gone (the Portfolio section replaces it)", () => {
  const page = fs.readFileSync("src/components/togi/TogiTracker.tsx", "utf8");
  const render = fs.readFileSync("src/components/togi/renderTogi.ts", "utf8");
  assert.doesNotMatch(page, /Open shares|id="positions"|id="snapdate"|id="possrc"/);
  assert.doesNotMatch(render, /open_positions_snapshot|"snapdate"|"possrc"|"positions"/);
  assert.match(page, /Side quests/);
});

test("tip button only accepts https x.com / twitter.com links", () => {
  for (const ok of ["https://x.com/ShaneStoffer", "https://twitter.com/ShaneStoffer", "https://x.com/ShaneStoffer/status/2117345071418716335"]) {
    assert.equal(togi.safeTipUrl(ok), ok);
  }
  for (const bad of [
    "javascript:alert(1)", "JAVASCRIPT:alert(1)", " javascript:alert(1)", "data:text/html,<script>alert(1)</script>",
    "http://x.com/ShaneStoffer", "https://evil.com/ShaneStoffer", "https://x.com.evil.com/a", "https://evilx.com/a",
    "https://notx.com", "https://x.com@evil.com/", "https://user:pw@x.com/a", "https://x.com:8443/a",
    "//x.com/ShaneStoffer", "x.com/ShaneStoffer", "", null, undefined, 42, {}, ["https://x.com/a"],
    "https://x.com/" + "a".repeat(400),
  ]) {
    assert.equal(togi.safeTipUrl(bad), null, String(bad));
  }
});

// ---- Robinhood options panel (optional `robinhood_stats`) and the degen gauge ----
const { renderRobinhoodHtml } = require("../src/components/togi/robinhood.ts");
const { degenNeedleAngle } = require("../src/components/togi/renderTogi.ts");

const RH = {
  starting_deposit: "not disclosed",
  first_posted: { date: "2026-10-05", value: 48518, label: "First MRNA calls", source_url: "https://x.com/ShaneStoffer/status/2107162184111321310" },
  peak: { date: "2026-10-22", value: 915450.97, label: "Peak", source_url: "https://x.com/ShaneStoffer/status/2113333655863242975" },
  low_after_fidelity_move: { date: "2026-11-03", value: 36345.65, label: "Low", source_url: "https://x.com/ShaneStoffer/status/2117684405791854807" },
  latest: {
    date: "2026-11-12", value: 360650.39, day_change: 281804.75, day_change_pct: 357.41,
    label: "Now", source_url: "https://x.com/ShaneStoffer/status/2120915114518011948",
  },
  today_start: {
    value: 78845.64, derived: true,
    method: "latest value minus the day's change from the same screenshot",
    source_url: "https://x.com/ShaneStoffer/status/2120915114518011948",
  },
  note: "The ~$800,000 withdrawal to buy GPRO and the Nov 2–3 move to Fidelity mean there's no clean all-time gain for Robinhood alone, and it's not summed into the Fidelity headline.",
  withdrawal_source_url: "https://x.com/ShaneStoffer/status/2118777789960925617",
};

test("robinhood_stats is optional and a bad copy does not reject the rest of the feed", () => {
  assert.equal(togi.isRobinhoodStats(undefined), false);
  assert.equal(togi.isRobinhoodStats(RH), true);
  assert.equal(snapshot.robinhood_stats, undefined);
  assert.equal(togi.isTogiData(snapshot), true);
  for (const bad of [null, "x", [], {}, { ...RH, starting_deposit: 1 }, { ...RH, latest: { ...RH.latest, day_change: "up" } },
    { ...RH, today_start: { ...RH.today_start, derived: "yes" } }, { ...RH, first_posted: { ...RH.first_posted, date: "Tuesday" } }]) {
    assert.equal(togi.isRobinhoodStats(bad), false);
    assert.equal(togi.isTogiData({ ...snapshot, robinhood_stats: bad }), true);
  }
});

test("robinhood panel formats currency, links each stat, and links the withdrawal in the note", () => {
  const html = renderRobinhoodHtml(RH);
  const all = html.kpis + html.note;
  assert.match(html.kpis, /not disclosed/);
  assert.match(html.kpis, /deposit never posted/);
  assert.match(html.kpis, /\$48,518\.00/);
  assert.match(html.kpis, /\$915,450\.97/);
  assert.match(html.kpis, /\$36,345\.65/);
  assert.match(html.kpis, /after the move to Fidelity/);
  assert.match(html.kpis, /\$360,650\.39/);
  assert.match(html.kpis, /class="pos">\+\$281,804\.75 \(\+357\.41%\)/);
  assert.match(html.kpis, /\$78,845\.64/);
  assert.match(html.kpis, /class="derived"[^>]*>derived</);
  assert.match(html.kpis, /latest value minus the day&#39;s change from the same screenshot/);
  assert.match(html.note, /href="https:\/\/x\.com\/ShaneStoffer\/status\/2118777789960925617"/);
  assert.match(html.note, /~\$800,000 withdrawal to buy \$GPRO/);
  assert.match(html.note, /not summed into the Fidelity headline/);
  for (const [, href] of all.matchAll(/href="([^"]*)"/g)) {
    assert.match(href, /^https:\/\/(x|twitter)\.com\/[A-Za-z0-9_]+\/status\/\d+$/);
  }
});

test("robinhood panel escapes feed text and drops non-X links", () => {
  const html = renderRobinhoodHtml({
    ...RH,
    starting_deposit: "<b>not disclosed</b>",
    note: '<img src=x onerror=alert(1)> The ~$800,000 withdrawal to buy GPRO',
    withdrawal_source_url: "javascript:alert(1)",
    latest: { ...RH.latest, label: '"><script>x</script>', source_url: "https://evil.example/status/1" },
    today_start: { ...RH.today_start, method: "<script>alert(1)</script>", source_url: "javascript:alert(1)" },
  });
  const all = html.kpis + html.note;
  assert.doesNotMatch(all, /<img|<script|javascript:|evil\.example/);
  assert.match(all, /&lt;img/);
  assert.match(all, /&lt;script&gt;/);
  assert.match(html.note, /~\$800,000 withdrawal to buy GPRO/);
  assert.doesNotMatch(html.note, /<a /);
  assert.match(html.kpis, new RegExp(`href="${togi.TOGI_PROFILE_URL}"`));
});

test("a down day on Robinhood renders in the loss color", () => {
  const html = renderRobinhoodHtml({ ...RH, latest: { ...RH.latest, day_change: -1200.5, day_change_pct: -3.2 } });
  assert.match(html.kpis, /class="neg">-\$1,200\.50 \(-3\.2%\)/);
});

test("degen needle sits at the left at 0 and the right at 100", () => {
  assert.equal(degenNeedleAngle(0), -90);
  assert.equal(degenNeedleAngle(50), 0);
  assert.equal(degenNeedleAngle(100), 90);
  assert.equal(degenNeedleAngle(120), 90);
  assert.equal(degenNeedleAngle(-4), -90);
});

test("degen meter keeps the joke formula and only animates when motion is allowed", () => {
  const src = fs.readFileSync("src/components/togi/renderTogi.ts", "utf8");
  assert.match(src, /const nOpt = T\.filter\(\(t\) => \/puts\|calls\/i\.test\(t\.type\)\)\.length;/);
  assert.match(src, /const raw = parts\.reduce\(\(a, p\) => a \+ p\[1\] \* p\[2\], 0\), degen = Math\.min\(100, raw\);/);
  assert.match(src, /\$\("degenfine"\)\.textContent = `Joke formula: options play \+10, 0DTE \+15, "full port" \+10, dream thesis \+5, casino or sports side quest \+5, capped at 100 \(raw \$\{raw\}\)\. The counts are real, from the posts below\. The score means nothing\.`;/);
  assert.match(src, /if \(RM\) \{ setAng\(targetAng\); \}/);
  assert.match(src, /if \(!RM && degen >= 100\) later\(\(\) => party\(\$\("degen-panel"\), 28\), 1500\);/);
  const page = fs.readFileSync("src/components/togi/TogiTracker.tsx", "utf8");
  assert.match(page, /<span className="badge joke">Joke formula<\/span>/);
  assert.match(page, /id="degen-gauge"/);
  assert.match(page, /id="degenlatest"/);
  assert.match(page, /id="robinhood-stats"[^>]*\bhidden>/);
  const chart = page.indexOf('id="chart"'), rh = page.indexOf('id="robinhood-stats"'), twist = page.indexOf("Plot twist");
  assert.ok(chart > -1 && chart < rh && rh < twist, "Robinhood panel sits right after the account chart");
  const render = src;
  assert.match(render, /isRobinhoodStats\(D\.robinhood_stats\)/);
  assert.match(render, /rh\.hidden = false/);
  assert.match(render, /rh\.hidden = true/);
});

test("tip button hides without a valid tip_url and keeps the note as plain text", () => {
  const meta = snapshot.meta;
  assert.equal(meta.tip_url, "https://x.com/ShaneStoffer");
  assert.match(meta.tip_note, /Tip Togi on X/);
  assert.deepEqual(togi.togiTip(meta), { url: "https://x.com/ShaneStoffer", note: meta.tip_note });
  const { tip_url: _u, ...noUrl } = meta;
  assert.equal(togi.togiTip(noUrl), null);
  assert.equal(togi.togiTip({ ...meta, tip_url: "javascript:alert(1)" }), null);
  assert.equal(togi.togiTip({ ...meta, tip_url: "" }), null);
  assert.equal(togi.togiTip(null), null);
  assert.deepEqual(togi.togiTip({ tip_url: "https://x.com/ShaneStoffer" }), { url: "https://x.com/ShaneStoffer", note: null });
  assert.equal(togi.tipNoteText(42), null);
  assert.equal(togi.tipNoteText("   "), null);
  assert.equal(togi.tipNoteText("<b>hi</b>\n there"), "<b>hi</b> there");
  assert.equal(togi.tipNoteText("a".repeat(500)).length, togi.TIP_NOTE_MAX);
  // A feed without the new fields still passes the shape check (the fields are additive).
  assert.equal(togi.isTogiData({ ...snapshot, meta: noUrl }), true);
  // The component renders the note through React text and the link with noopener noreferrer.
  const src = fs.readFileSync(require.resolve("../src/components/togi/TogiTracker.tsx"), "utf8");
  assert.match(src, /state\?\.tip && \(/);
  assert.match(src, /<p className="tip-note">\{state\.tip\.note\}<\/p>/);
  assert.match(src, /const ext = \{ target: "_blank", rel: "noopener noreferrer" \}/);
  assert.ok(!/dangerouslySetInnerHTML/.test(src));
});

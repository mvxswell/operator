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

const lib = require("../src/lib/grokBotSavings.ts");
const data = require("../src/data/grokBotSavings.json");
const config = require("../src/data/grokBotSavings.config.json");
const sync = () => import("../scripts/sync-savings.mjs");

const HEADER = "date,bot,business,task,evidence,role,hours,rate,value,credit,issues\n";
const csv = (...lines) => HEADER + lines.join("\n") + "\n";

test("committed savings JSON is valid and its totals add up", () => {
  assert.equal(lib.isSavingsData(data), true);
  const S = data.summary;
  const sum = (xs, k) => xs.reduce((a, x) => a + x[k], 0);
  assert.equal(S.total, sum(data.tasks, "value"));
  assert.equal(S.hours, sum(data.tasks, "hours"));
  assert.equal(S.credited, data.tasks.filter((t) => t.value > 0).length);
  assert.equal(Math.round(sum(S.by_role, "value") * 100), Math.round(S.total * 100));
  assert.equal(Math.round(sum(S.by_biz, "value") * 100), Math.round(S.total * 100));
  for (const t of data.tasks) assert.equal(t.value, Math.round(t.hours * t.rate * 100) / 100);
  assert.equal(S.spend, 300);
  assert.deepEqual(S.plans, [200, 100]);
});

test("CSV parser handles quotes, commas and blank lines", async () => {
  const { parseCsv } = await sync();
  const rows = parseCsv(csv('2026-11-02,Bot,Biz,"Task, with ""quotes""","/a, /b",Web developer,1,40,40,Full,', "", "\r\n"));
  assert.equal(rows.length, 1);
  assert.equal(rows[0].task, 'Task, with "quotes"');
  assert.equal(rows[0].evidence, "/a, /b");
  assert.deepEqual(parseCsv(HEADER), []);
});

test("sync math matches build_roi.py (proration, filters, breakdowns, $0 rows)", async () => {
  const { parseCsv, buildSavings } = await sync();
  const rows = parseCsv(csv(
    "2026-11-01,Bot,Biz A,Before the month,/x,Web developer,9,40,360,Full,",
    "2026-11-02,Bot,Biz A,Build,https://github.com/mvxswell/operator/pull/14,Web developer,4,40,160,Full,",
    "2026-11-02,Bot,Biz B,Drafts,/x,(no credit),0,0,0,None,Not posted yet",
    "2026-11-03,Bot,Biz B,Research,/x,Research VA,1.5,20,30.0,Full,Redo: v1",
    "2026-11-09,Bot,Biz B,Future row,/x,Research VA,1,20,20,Full,",
  ));
  const { data: d, problems } = buildSavings(rows, config, "2026-11-04");
  assert.deepEqual(problems, []);
  const S = d.summary;
  assert.equal(S.day, 3); assert.equal(S.days, 30);
  assert.equal(S.prorated, 30);
  assert.equal(d.tasks.length, 3, "rows before start and after as_of are dropped");
  assert.equal(S.total, 190); assert.equal(S.hours, 5.5); assert.equal(S.credited, 2);
  assert.equal(S.net_full, -110); assert.equal(S.net_pro, 160);
  assert.deepEqual(S.by_role.map((r) => r.label), ["Web developer", "Research VA"]);
  assert.deepEqual(S.by_biz, [{ label: "Biz A", value: 160, hours: 4 }, { label: "Biz B", value: 30, hours: 1.5 }]);
  // as_of is clamped to the month, like build_roi.py.
  assert.equal(buildSavings(rows, config, "2026-10-20").data.summary.day, 1);
  assert.equal(buildSavings(rows, config, "2027-01-01").data.summary.day, 30);
});

test("sync flags value or rate drift instead of silently trusting the CSV", async () => {
  const { parseCsv, buildSavings } = await sync();
  const { problems } = buildSavings(parseCsv(csv(
    "2026-11-02,Bot,Biz,Bad value,/x,Web developer,1,40,45,Full,",
    "2026-11-02,Bot,Biz,Bad rate,/x,Web developer,1,99,99,Full,",
    "2026-11-02,Bot,Biz,Unknown role,/x,Astronaut,1,10,10,Full,",
  )), config, "2026-11-02");
  assert.equal(problems.length, 3);
  assert.throws(() => buildSavings([{ date: "2026-11-02" }], config, "2026-11-02"), /missing column/);
});

test("box paths and private repo links never reach the public JSON", async () => {
  const { publicEvidence } = await sync();
  const pub = ["mvxswell/operator"];
  assert.deepEqual(publicEvidence("https://github.com/mvxswell/operator/pull/14", pub), { kind: "pr", label: "PR #14", href: "https://github.com/mvxswell/operator/pull/14" });
  assert.deepEqual(publicEvidence("https://github.com/mvxswell/secret/pull/3", pub), { kind: "pr", label: "PR (private repo)" });
  assert.equal(publicEvidence("/workspace/social/x.py (08:05)", pub).label, "File on the box");
  assert.equal(publicEvidence("repo commit 2026-11-02 (box)", pub).label, "Commit");
  const raw = JSON.stringify(data);
  assert.doesNotMatch(raw, /\/workspace\/|\.py\b|mvxswell\/bimmerquote/);
  for (const t of data.tasks) if (t.evidence.href) assert.match(t.evidence.href, /^https:\/\/github\.com\/(mvxswell\/operator|mvxswell\/tonnagecheck)\/pull\/\d+$/);
});

test("0 and 1 rows render a Month 1 in-progress state", async () => {
  const { parseCsv, buildSavings } = await sync();
  const empty = buildSavings(parseCsv(HEADER), config, "2026-11-02").data;
  assert.equal(lib.isSavingsData(empty), true);
  assert.equal(empty.summary.total, 0);
  assert.equal(lib.ratio(empty.summary.ratio_full), "–");
  assert.deepEqual(lib.monthStatus(empty.summary), { label: "Month 1 in progress · Day 1 of 30", inProgress: true, pct: 100 / 30 });
  const one = buildSavings(parseCsv(csv("2026-11-02,Bot,Biz,Only task,/x,Web developer,1,40,40,Full,")), config, "2026-11-02").data;
  assert.equal(lib.isSavingsData(one), true);
  assert.equal(one.summary.by_role.length, 1);
  assert.equal(lib.monthStatus({ ...one.summary, day: 30 }).label, "Month 1 complete · 30 days");
  const page = fs.readFileSync("src/components/savings/GrokBotSavings.tsx", "utf8");
  assert.match(page, /No tasks logged yet\./);
  assert.match(page, /hasValue \?/);
});

test("formatters", () => {
  assert.equal(lib.usd(1009.5), "$1,009.50");
  assert.equal(lib.usd(300), "$300");
  assert.equal(lib.usd(-110, false), "−$110");
  assert.equal(lib.ratio(1009.5 / 300), "3.4x");
  assert.equal(lib.ratio(100.95), "101x");
  assert.equal(lib.niceDate("2026-12-01", true), "Dec 1, 2026");
  assert.equal(lib.safeHref("javascript:alert(1)"), "");
  assert.equal(lib.safeHref("http://example.com"), "");
});

test("page says Estimates, cites every rate source, and keeps CSS scoped", () => {
  const page = fs.readFileSync("src/components/savings/GrokBotSavings.tsx", "utf8");
  assert.match(page, /className="chip est">Estimates</);
  assert.match(page, /Estimates, not invoices\./);
  assert.doesNotMatch(page, /^"use client"/m, "server-rendered, no client JS");
  for (const r of data.rates) assert.ok(data.sources.some((s) => s.key === r.source), `rate ${r.role} has a cited source`);
  for (const s of data.sources) assert.match(s.href, /^https:\/\/(www\.upwork\.com|www\.the-efa\.org|www\.bls\.gov)\//);
  const css = fs.readFileSync("src/app/grok-bot-savings-tracker/savings.css", "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  for (const rule of css.match(/(?:^|})\s*([^@{}][^{}]*)\{/g) ?? []) {
    const selectors = rule.replace(/^}?\s*/, "").slice(0, -1).trim();
    if (selectors.startsWith("@")) continue;
    if (/^(?:\d+%|to|from)(?:\s*,\s*(?:\d+%|to|from))*$/.test(selectors)) continue;
    for (const sel of selectors.split(",")) assert.ok(sel.trim().startsWith(".gb-savings"), `unscoped selector: ${sel}`);
  }
  for (const name of css.matchAll(/@keyframes\s+([\w-]+)/g)) assert.ok(name[1].startsWith("gb-"), name[1]);
});

test("launched: indexable, in the sitemap, not in the nav, no extra CSP origin", async () => {
  const route = fs.readFileSync("src/app/grok-bot-savings-tracker/page.tsx", "utf8");
  assert.match(route, /const LAUNCHED = true;/);
  assert.match(route, /robots: LAUNCHED \? undefined : \{ index: false, follow: false \}/);
  assert.match(route, /alternates: \{ canonical: url \}/);
  assert.match(fs.readFileSync("src/app/sitemap.ts", "utf8"), /\{ path: "\/grok-bot-savings-tracker" \}/);
  assert.doesNotMatch(fs.readFileSync("src/components/Nav.tsx", "utf8"), /grok-bot-savings-tracker/);
  const { ROUTE_CONNECT_ORIGINS } = await import("../scripts/secure-export.mjs");
  assert.equal(ROUTE_CONNECT_ORIGINS["grok-bot-savings-tracker"], undefined);
});

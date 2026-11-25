const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const snapshot = require("../src/data/togiSnapshot.json");
const { spyTrades, spyPnlText, isSpyTicker } = require("../src/lib/togiSpy.ts");

test("SPY filter keeps ticker SPY and the posted Oct 26 call", () => {
  const rows = spyTrades(snapshot.trades);
  assert.ok(rows.length >= 1, "snapshot must include a SPY trade so the static page is not empty");
  assert.ok(rows.every((trade) => trade.ticker === "SPY"));
  const oct = rows.find((trade) => trade.date === "2026-10-26");
  assert.ok(oct, "expected the posted 2026-10-26 SPY trade");
  assert.equal(oct.type, "0DTE calls");
  assert.equal(oct.direction, "long");
  assert.equal(oct.outcome, "loss");
  assert.equal(oct.pnl, -12000);
  assert.equal(spyPnlText(oct), "-$12,000");
  assert.match(oct.details, /SPY \$771 Call/);
  assert.equal(isSpyTicker("SPXW"), false);
  assert.equal(isSpyTicker(" spy "), true);
});

test("SPY filter does not pull SPXW or invent a P&L", () => {
  const spy = snapshot.trades.find((trade) => trade.ticker === "SPY");
  const rows = spyTrades([
    { ...spy, ticker: "SPXW", date: "2026-11-25", pnl: null },
    { ...spy, ticker: "SPY", date: "2026-11-01", pnl: null },
    spy,
  ]);
  assert.deepEqual(rows.map((trade) => trade.date), ["2026-11-01", "2026-10-26"]);
  assert.equal(spyPnlText({ pnl: null }), "P&L not disclosed");
  assert.equal(spyPnlText({ pnl: 10.5, pnl_derived: true }), "$10.50 (derived)");
});

test("SPY calls page and tracker SEO copy stay factual and linked", () => {
  const page = fs.readFileSync("src/app/togi/spy-calls/page.tsx", "utf8");
  const tracker = fs.readFileSync("src/components/togi/TogiTracker.tsx", "utf8");
  const home = fs.readFileSync("src/app/togi/page.tsx", "utf8");
  const sitemap = fs.readFileSync("src/app/sitemap.ts", "utf8");
  assert.match(page, /Togi SPY Calls Tracker: Every SPY Options Trade/);
  assert.match(page, /alternates: \{ canonical: url \}/);
  assert.match(page, /absoluteUrl\("\/togi\/spy-calls"\)/);
  assert.match(page, /share-v3\.png/);
  assert.match(page, /href="\/togi\/"/);
  assert.match(page, /Unofficial fan tracker\./);
  assert.match(page, /Not financial advice\./);
  assert.doesNotMatch(page, /<Link\b/);
  assert.match(home, /Togi Tracker: Togi's SPY Calls/);
  assert.match(home, /FAQPage/);
  assert.match(tracker, /Togi Tracker: SPY calls and the \$10M challenge/);
  assert.match(tracker, /href="\/togi\/spy-calls\/"/);
  assert.match(tracker, /Last updated/);
  assert.match(sitemap, /\{ path: "\/togi\/spy-calls" \}/);
});

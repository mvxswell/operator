/* eslint-disable @typescript-eslint/no-require-imports */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);
const { isTogiPortfolio, isRobinhoodStats } = require('../src/lib/togi.ts');
const { renderBrokerPnlHtml } = require('../src/components/togi/pnl.ts');
const { renderRobinhoodHtml } = require('../src/components/togi/robinhood.ts');
const { renderPortfolioHtml, renderPortfolioSummaryHtml } = require('../src/components/togi/portfolio.ts');
const snapshot = require('../src/data/togiSnapshot.json');
const source = 'https://x.com/ShaneStoffer/status/2125267313071104429';
const account = { id: 'robinhood', name: 'Robinhood', status: 'current', as_of: '2026-11-24', total_value: 94222.62, period_change_3m: 223889.42, cash: null, source_url: source };
const data = () => ({ ...structuredClone(snapshot), portfolio: { ...structuredClone(snapshot.portfolio), accounts: [account] } });

test('broker return uses its own window and receipt without double counting', () => {
  const d = data(), before = structuredClone(d);
  const html = renderBrokerPnlHtml(d);
  assert.match(html, /\+\$223,889\.42/);
  assert.match(html, /\$94,222\.62/);
  assert.match(html, /Past 3 months/);
  assert.ok(html.includes(source));
  assert.match(html, /not a verified options-only realized total/);
  assert.match(html, /do not count wires as profit/);
  assert.match(html, /no defensible combined current balance/);
  assert.deepEqual(d, before);
  d.portfolio.closed.known_realized_total = 10000000;
  assert.equal(renderBrokerPnlHtml(d), html, 'partial trade totals do not alter broker P&L');
});

test('missing, stale or untrusted broker evidence never becomes an estimated profit', () => {
  assert.equal(renderBrokerPnlHtml(snapshot), null);
  for (const changes of [{ period_change_3m: null }, { period_change_3m: undefined }, { status: 'last_known' }, { source_url: 'javascript:alert(1)' }]) {
    const d = data(); d.portfolio.accounts = [{ ...account, ...changes }];
    assert.equal(renderBrokerPnlHtml(d), null);
  }
  for (const value of [NaN, Infinity, '223889.42']) {
    const d = data(); d.portfolio.accounts = [{ ...account, period_change_3m: value }];
    assert.equal(isTogiPortfolio(d.portfolio), false);
    assert.equal(renderBrokerPnlHtml(d), null);
  }
  for (const value of [0, -42.50]) {
    const d = data(); d.portfolio.accounts = [{ ...account, period_change_3m: value }];
    assert.match(renderBrokerPnlHtml(d), value === 0 ? /\$0\.00/ : /−\$42\.50/);
  }
});

test('3M screenshot without daily numbers still renders historical Robinhood stats', () => {
  const point = { date: account.as_of, value: account.total_value, label: '3M screenshot', source_url: source };
  const stats = { starting_deposit: 'not disclosed', first_posted: point, peak: point, low_after_fidelity_move: point,
    latest: { ...point, day_change: null, day_change_pct: null }, today_start: null, note: 'separate accounts', withdrawal_source_url: source };
  assert.equal(isRobinhoodStats(stats), true);
  const html = renderRobinhoodHtml(stats).kpis;
  assert.match(html, /Daily P&amp;L not disclosed/);
  assert.match(html, /Started today/);
  assert.doesNotMatch(html, /NaN|\$0\.00|derived/);
  assert.equal(isRobinhoodStats({ ...stats, latest: { ...stats.latest, day_change: 'unknown' } }), false);
  assert.equal(isRobinhoodStats({ ...stats, today_start: { value: null } }), false);
});

test('a quote without position size preserves the portfolio and dated last valuation', () => {
  const p = structuredClone(snapshot.portfolio);
  const position = p.positions[0];
  position.latest_update = { as_of: '2026-11-24', value: null, pct_of_account: null, unrealized_pct: null, source_url: source, label: 'Quote only; position size not shown' };
  assert.equal(isTogiPortfolio(p), true);
  const html = renderPortfolioHtml(p, new Date('2026-11-24T12:00:00'));
  assert.match(html, /Quote only; position size not shown/);
  assert.ok(html.includes(source));
  assert.ok(html.includes(position.value.toLocaleString('en-US', { maximumFractionDigits: 0 })));
  const summary = renderPortfolioSummaryHtml(p);
  assert.doesNotMatch(summary, /NaN|\$0</);
  assert.ok(summary.includes(position.value.toLocaleString('en-US', { maximumFractionDigits: 0 })));
  position.latest_update.value = 'unknown';
  assert.equal(isTogiPortfolio(p), false);
});

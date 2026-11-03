// Portfolio section for /togi/, built only from the feed's optional `portfolio` object.
// Pure string rendering (no DOM) so it can be unit-tested. Every feed string is escaped,
// and a source link is drawn only when it is an X post URL.
//
// Rules from the tracker's data notes:
// - null means he didn't show it: render "not disclosed", never 0.
// - *_derived figures are labelled "derived".
// - anything older than stale_after_days (or marked last_known) reads "Last known".
// - the Fidelity and Robinhood totals are never added together (money moved between them).
// - a position's latest_update, when present, is the figure shown; the earlier one is kept as context.
import { xPostUrl, type TogiAccount, type TogiPortfolio, type TogiPosition } from "../../lib/togi";

export const ND = '<span class="nd">not disclosed</span>';
const DERIVED = '<span class="dv">derived</span>';
const ext = 'target="_blank" rel="noopener noreferrer"';

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const usd = (n: number, dp = 0) =>
  (n < 0 ? "-" : "") + "$" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
const short = (n: number) => {
  const a = Math.abs(n), s = n < 0 ? "-" : "";
  return a >= 1e6 ? s + "$" + +(a / 1e6).toFixed(2) + "M" : a >= 1e3 ? s + "$" + Math.round(a / 1e3) + "K" : s + "$" + a;
};
const fmtDate = (d: string) =>
  new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const signed = (n: number | null | undefined, f: (v: number) => string) => (n == null ? ND : (n > 0 ? "+" : "") + f(n));
const pct = (n: number | null | undefined) => (n == null ? "" : (n > 0 ? "+" : "") + n.toFixed(2) + "%");
const tone = (n: number | null | undefined) => (n == null ? "" : n >= 0 ? "pos" : "neg");
const link = (url: unknown, label: string, cls = "") => {
  const u = xPostUrl(url);
  return u ? `<a${cls ? ` class="${cls}"` : ""} href="${u}" ${ext}>${label}</a>` : "";
};

/** Whole days between an ISO date (taken at noon, local) and `today`. */
export function ageDays(isoDate: string, today: Date): number {
  return Math.floor((today.getTime() - new Date(isoDate + "T12:00:00").getTime()) / 864e5);
}

export function isStale(row: { as_of: string; status?: string }, P: Pick<TogiPortfolio, "stale_after_days">, today: Date): boolean {
  return row.status === "last_known" || ageDays(row.as_of, today) > (P.stale_after_days ?? 7);
}

const asOf = (row: { as_of: string; status?: string }, P: TogiPortfolio, today: Date) =>
  isStale(row, P, today)
    ? `<span class="asof stale">Last known · ${fmtDate(row.as_of)}</span>`
    : `<span class="asof">As of ${fmtDate(row.as_of)}</span>`;

/** The figure to show for a position: its latest_update when present. */
function shown(p: TogiPosition) {
  const u = p.latest_update;
  return u
    ? { value: u.value, pct: u.pct_of_account, unrealized_pct: u.unrealized_pct ?? null, as_of: u.as_of, status: p.status, updated: true }
    : { value: p.value, pct: p.pct_of_account, unrealized_pct: p.unrealized_pct, as_of: p.as_of, status: p.status, updated: false };
}

const GREYS = ["#c9a24a", "#9c8250", "#7a6a4c", "#5d5546", "#4a4640", "#3a3936", "#2e2f31"];

/** Inner HTML for the Portfolio section. */
export function renderPortfolioHtml(P: TogiPortfolio, today: Date = new Date()): string {
  const days = P.stale_after_days ?? 7;
  const primary: TogiAccount = P.accounts.find((a) => a.status === "current") ?? P.accounts[0];
  const K = P.concentration ?? null;
  const C = P.closed ?? null;
  const opts = P.open_options ?? [];
  const pos = P.positions.slice().sort((a, b) => shown(b).value - shown(a).value);
  const donutAcct = K?.account ?? primary.id;
  const dpos = pos.filter((p) => p.account === donutAcct);
  const color = (p: TogiPosition, i: number) => (K && p.ticker === K.ticker ? "#f2b441" : GREYS[Math.min(Math.max(i - 1, 0), GREYS.length - 1)]);
  const maxPct = Math.max(...pos.map((p) => shown(p).pct), 1);

  const kpis: [string, string, string, string][] = [
    [esc(primary.name), usd(primary.total_value, 0), `${signed(primary.day_change, (v) => usd(v, 2))} on the day · ${asOf(primary, P, today)}`, ""],
    ["Open positions", String(pos.length + opts.length), `${pos.length} stock/fund · ${opts.length} options`, ""],
    ["Unrealized P&amp;L", signed(primary.unrealized_total, (v) => usd(v, 0)), primary.unrealized_total_pct == null ? "on open positions" : `${pct(primary.unrealized_total_pct)} on open positions`, tone(primary.unrealized_total)],
    ["Known realized P&amp;L", C ? signed(C.known_realized_total, (v) => usd(v, 0)) : ND, C ? `${C.count_known ?? 0} closed with P&amp;L · ${C.count_undisclosed ?? 0} not disclosed` : "", C ? tone(C.known_realized_total) : ""],
    ["Cash", primary.cash == null ? ND : usd(primary.cash, 2), primary.pending_activity != null ? `${usd(primary.pending_activity, 2)} pending activity` : "", primary.cash == null ? "ndv" : ""],
  ];

  let donut = "";
  const dtot = dpos.reduce((a, p) => a + shown(p).value, 0);
  if (dpos.length && dtot > 0) {
    const R = 70, CIRC = 2 * Math.PI * R;
    let off = 0, segs = "";
    dpos.forEach((p, i) => {
      const L = (shown(p).value / dtot) * CIRC;
      segs += `<circle data-t="${esc(p.ticker)}" r="${R}" cx="90" cy="90" fill="none" stroke="${color(p, i)}" stroke-width="26" stroke-dasharray="${Math.max(L - 1.5, 0.5).toFixed(2)} ${CIRC.toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}" transform="rotate(-90 90 90)"><title>${esc(p.ticker)}: ${usd(shown(p).value)} (${shown(p).pct}% of account)</title></circle>`;
      off += L;
    });
    const top = K ?? { ticker: dpos[0].ticker, pct_of_account: shown(dpos[0]).pct };
    donut = `<div class="pf-donut"><svg viewBox="0 0 180 180" role="img" aria-label="Allocation by position value"><circle r="${R}" cx="90" cy="90" fill="none" stroke="#14171b" stroke-width="26"/>${segs}<text x="90" y="84" text-anchor="middle" class="dn-big">${Math.round(top.pct_of_account)}%</text><text x="90" y="104" text-anchor="middle" class="dn-sm">${esc(top.ticker)}</text></svg>
      <div class="dn-legend">${dpos.map((p, i) => `<span data-t="${esc(p.ticker)}"><i style="background:${color(p, i)}"></i>${esc(p.ticker)} <b>${((shown(p).value / dtot) * 100).toFixed(1)}%</b></span>`).join("")}</div></div>`;
  }

  const kp = K ? pos.find((p) => p.ticker === K.ticker) : undefined;
  const conc = K
    ? `<div class="pf-conc brand-card"><div class="topline"></div><p class="eyebrow">Concentration check</p><p class="conc-h"><span class="acc">${K.pct_of_account}%</span> in one ticker</p><p class="conc-t">${esc(K.text ?? "")} ${usd(K.value, 2)} of $${esc(K.ticker)}${kp && kp.cost_basis != null ? `, bought for about ${usd(kp.cost_basis)}${kp.cost_basis_derived ? ` ${DERIVED}` : ""}` : ""}. A 10% move in $${esc(K.ticker)} swings the account by about ${short(K.value * 0.1)}.</p><p class="conc-f">${asOf(K, P, today)} ${link(K.source_url, "post ↗", "src")}</p></div>`
    : "";

  const rows = pos.map((p) => {
    const s = shown(p), u = p.latest_update;
    const opt = p.option ? ` · ${esc(p.option.right ?? "")} ${p.option.strike != null ? "$" + esc(p.option.strike) : ""} ${esc(p.option.expiry ?? "")} ×${esc(p.option.contracts ?? "?")}` : "";
    const unit = p.asset_type === "fund" ? "units" : p.asset_type === "option" ? "contracts" : "sh";
    const cost = p.cost_basis == null ? `cost ${ND}` : `cost ≈${short(p.cost_basis)}${p.cost_basis_derived ? ` ${DERIVED}` : ""}`;
    const earlier = u
      ? `<span class="upd">${esc(u.label ?? "Later update")}. Earlier: ${usd(p.value, 0)} · ${p.pct_of_account}% · ${signed(p.unrealized, (v) => short(v))}${p.unrealized_pct == null ? "" : ` (${pct(p.unrealized_pct)})`} as of ${fmtDate(p.as_of)} ${link(p.source_url, "post ↗")}</span>`
      : "";
    return `<div class="pf-row" data-t="${esc(p.ticker)}">
      <div class="pf-c1"><b class="tk2">$${esc(p.ticker)}</b><span class="tag">${esc(p.asset_type)}${opt}</span>${s.updated ? '<span class="tag new">latest update</span>' : ""}
        <span class="meta2">${esc(p.name)} · ${Number(p.shares).toLocaleString("en-US")} ${unit} @ ${p.last_price == null ? ND : "$" + p.last_price}</span></div>
      <div class="pf-c2"><span class="mono">${usd(s.value, 0)}</span><span class="bt"><i style="width:${Math.min(100, (s.pct / maxPct) * 100).toFixed(1)}%;background:${p.account === donutAcct ? color(p, dpos.indexOf(p)) : GREYS[3]}"></i></span><span class="meta2">${s.pct}% of acct</span></div>
      <div class="pf-c3"><span class="mono ${tone(u ? s.unrealized_pct : p.unrealized)}">${u ? (s.unrealized_pct == null ? ND : pct(s.unrealized_pct)) : signed(p.unrealized, (v) => short(v))}</span><span class="meta2">${u ? "unrealized" : pct(p.unrealized_pct)}</span><span class="meta2">${cost}</span></div>
      <div class="pf-foot">${asOf(s, P, today)} ${link(u ? u.source_url : p.source_url, "source ↗")}${earlier}${p.note ? ` <span class="pnote">${esc(p.note)}</span>` : ""}</div>
    </div>`;
  }).join("");

  const accounts = `<p class="lbl">Accounts</p>${P.accounts.map((a) => `<div class="acct"><div class="acct-h"><b>${esc(a.name)}</b>${asOf(a, P, today)}</div>
      <p class="mono acct-v">${usd(a.total_value, 2)}${a.buying_power != null ? ` <span class="meta2">· buying power ${usd(a.buying_power, 2)}</span>` : ""}</p>
      <p class="meta2">Cash: ${a.cash == null ? ND : usd(a.cash, 2)}. ${esc(a.cash_note ?? "")} ${esc(a.open_positions_note ?? "")} ${link(a.source_url, "source ↗")}</p></div>`).join("")}
    <div class="acct"><div class="acct-h"><b>Open options</b><span class="asof">${opts.length || "None"} disclosed</span></div><p class="meta2">${esc(P.open_options_note ?? "")}</p></div>
    ${P.accounts.length > 1 ? '<p class="meta2 sep">Accounts are shown separately and never added together: money moves between them.</p>' : ""}`;

  const items = (C?.items ?? []).slice().sort((a, b) => b.date.localeCompare(a.date));
  const closed = C
    ? `<p class="lbl">Closed positions · realized</p><p class="closed-tot mono ${tone(C.known_realized_total)}">${signed(C.known_realized_total, (v) => usd(v, 0))}</p><p class="meta2">${esc(C.note ?? "")}</p>
      <ul class="closed">${items.map((t) => `<li><span class="dt">${fmtDate(t.date).replace(/, \d{4}$/, "")}</span><b>$${esc(t.ticker)}</b><span class="ty">${esc(t.type)}</span><span class="mono ${tone(t.pnl)}">${t.pnl == null ? ND : signed(t.pnl, (v) => usd(v, 0))}${t.pnl != null && t.pnl_derived ? ` ${DERIVED}` : ""}</span><span class="lk">${link(t.source_url, "↗")}</span></li>`).join("")}</ul>`
    : "";

  const say = (P.commentary ?? []).map((c) => `<blockquote><p>${esc(c.text)}</p><cite>${fmtDate(c.date)} ${link(c.source_url, "· post ↗")}</cite></blockquote>`).join("");

  return `<div class="sechead"><div><p class="eyebrow">Portfolio</p><h2>The portfolio, rebuilt from his posts</h2></div><span class="badge">As of ${fmtDate(P.as_of)}</span></div>
  <div class="pf-kpis">${kpis.map(([l, v, s, c]) => `<div class="pf-kpi brand-card"><div class="topline"></div><p class="lbl">${l}</p><p class="v ${c}">${v}</p><p class="s">${s}</p></div>`).join("")}</div>
  <div class="pf-grid">
    <div class="pf-donut-wrap">${donut}${conc}</div>
    <div><div class="pf-thead"><span>Position</span><span>Value · % of acct</span><span>Unrealized</span></div><div class="pf-rows">${rows}</div></div>
  </div>
  <div class="pf-sub"><div class="pf-box">${accounts}</div>${closed ? `<div class="pf-box">${closed}</div>` : ""}</div>
  ${say ? `<div class="pf-say">${say}</div>` : ""}
  <p class="fine">${esc(P.method ?? "")} “derived” = worked out from his screenshots. Anything older than ${days} days without an update is marked “Last known”.</p>`;
}

// Robinhood (options) account panel for /togi/. Built only from the feed's optional
// `robinhood_stats` object. Pure string rendering so it can be unit-tested.
// Every feed string is escaped, and a source link is drawn only for an X post URL.
import { safeXUrl, xPostUrl, type RobinhoodStats } from "../../lib/togi";

const ext = 'target="_blank" rel="noopener noreferrer"';
const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Same currency shape as the rest of /togi/, with cents so posted screenshots stay exact. */
const usd = (n: number, dp = 2) =>
  (n < 0 ? "-" : "") + "$" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });

const fmtDate = (d: string) =>
  new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const signedUsd = (n: number) => (n > 0 ? "+" : "") + usd(n, 2);

const signedPct = (n: number) => {
  const sign = n > 0 ? "+" : n < 0 ? "-" : "";
  const body = Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 2 });
  return sign + body + "%";
};

const WITHDRAWAL = /~\$800,000 withdrawal to buy \$?GPRO/i;

function moneyLink(value: number, url: unknown, title: string): string {
  return `<a class="v tabular" href="${esc(safeXUrl(url))}" title="${esc(title)}" ${ext}>${usd(value)} <span class="ext" aria-hidden="true">↗</span></a>`;
}

function cell(label: string, valueHtml: string, subHtml: string, extra = ""): string {
  return `<div class="rh-kpi brand-card${extra ? " " + extra : ""}"><div class="topline"></div><p class="lbl">${esc(label)}</p>${valueHtml}<p class="s">${subHtml}</p></div>`;
}

/** Caveat line. The ~$800K withdrawal phrase links the withdrawal post when that URL is an X post. */
export function robinhoodNoteHtml(note: string, withdrawalUrl: unknown): string {
  const safeNote = esc(note);
  const url = xPostUrl(withdrawalUrl);
  if (!url || !WITHDRAWAL.test(note)) return safeNote;
  const link = `<a href="${esc(url)}" ${ext}>~$800,000 withdrawal to buy $GPRO</a>`;
  return safeNote.replace(WITHDRAWAL, link);
}

/** The six stat cards. Caller shows the panel only after isRobinhoodStats passes. */
export function renderRobinhoodHtml(R: RobinhoodStats): { kpis: string; note: string } {
  const deposit = R.starting_deposit.trim();
  const undisclosed = /^not disclosed$/i.test(deposit);
  const started = undisclosed ? "not disclosed" : deposit;
  const fp = R.first_posted, pk = R.peak, lo = R.low_after_fidelity_move, lt = R.latest, ts = R.today_start;
  const day = `<span class="${lt.day_change >= 0 ? "pos" : "neg"}">${signedUsd(lt.day_change)} (${signedPct(lt.day_change_pct)})</span> today · ${fmtDate(lt.date)}`;
  const method = ts.method.trim();
  const todaySub = `${ts.derived ? `<span class="derived" title="${esc(method)}">derived</span>` : ""}${method ? `${ts.derived ? " · " : ""}${esc(method)}` : ""}`;
  const kpis = [
    cell("Started with", `<span class="v">${esc(started)}</span>`, undisclosed ? "deposit never posted" : "", undisclosed ? "nd" : ""),
    cell("First posted", moneyLink(fp.value, fp.source_url, fp.label), fmtDate(fp.date)),
    cell("Peak", moneyLink(pk.value, pk.source_url, pk.label), fmtDate(pk.date)),
    cell("Low", moneyLink(lo.value, lo.source_url, lo.label), `${fmtDate(lo.date)} · after the move to Fidelity`),
    cell("Now", moneyLink(lt.value, lt.source_url, lt.label), day, "now"),
    cell("Started today", moneyLink(ts.value, ts.source_url, method || ts.method), todaySub, "today"),
  ].join("");
  return { kpis, note: robinhoodNoteHtml(R.note, R.withdrawal_source_url) };
}

// DOM rendering for the Togi Tracker page, ported from the standalone tracker's app.js.
// Runs only in the browser, after the data has loaded. Every string from the feed is
// HTML-escaped and every link goes through safeXUrl, since the feed is third-party data.
import { isTogiPortfolio, safeXUrl, type TogiData, type TogiTrade } from "@/lib/togi";
import { renderPortfolioHtml } from "./portfolio";

const usd = (n: number, dp = 0) =>
  (n < 0 ? "-" : "") + "$" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
const short = (n: number) => {
  const a = Math.abs(n), s = n < 0 ? "-" : "";
  return a >= 1e6 ? s + "$" + +(a / 1e6).toFixed(2) + "M" : a >= 1e3 ? s + "$" + Math.round(a / 1e3) + "K" : s + "$" + a;
};
export const fmtDate = (d: string) =>
  new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const linkify = (s: string) =>
  esc(s).replace(/(https:\/\/x\.com\/ShaneStoffer\/status\/\d+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">post ↗</a>');
const ext = 'target="_blank" rel="noopener noreferrer"';

/** Renders the tracker into `root`. Returns a cleanup function. */
export function renderTogi(root: HTMLElement, D: TogiData): () => void {
  const m = D.meta, T = D.trades;
  const timers: number[] = [];
  let alive = true;
  const $ = (id: string) => root.querySelector<HTMLElement>(`#${id}`)!;
  const later = (fn: () => void, ms: number) => { timers.push(window.setTimeout(() => alive && fn(), ms)); };
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function count(el: HTMLElement, to: number, fmt: (v: number) => string, from = 0, ms = 1400) {
    if (RM) { el.textContent = fmt(to); return; }
    const t0 = performance.now();
    const f = (t: number) => {
      if (!alive) return;
      const p = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(from + (to - from) * e);
      if (p < 1) requestAnimationFrame(f);
    };
    f(t0);
  }

  // ---- Meter ----
  const cur = m.latest_value, goal = m.goal, start = m.starting_value;
  const pct = Math.min(100, (cur / goal) * 100);
  count($("cur"), cur, (v) => usd(v), start);
  count($("pctbadge"), pct, (v) => v.toFixed(1) + "% to $10M");
  const curSrc = $("cursrc") as HTMLAnchorElement;
  curSrc.href = safeXUrl(m.latest_value_source);
  curSrc.textContent = m.latest_value_label + " · " + fmtDate(m.latest_value_date) + " ↗";
  ($("latestbtn") as HTMLAnchorElement).href = safeXUrl(m.latest_value_source);
  count($("togo"), Math.max(0, goal - cur), (v) => short(v));
  count($("fromstart"), ((cur - start) / (goal - start)) * 100, (v) => v.toFixed(1) + "%");
  const mult = goal / cur, dbl = Math.log2(mult);
  $("mult").textContent = mult.toFixed(2) + "x";
  $("mult2").textContent = mult.toFixed(2) + "x";
  $("dbl").textContent = dbl.toFixed(1);
  $("caveat").textContent = "Start: " + usd(start) + ". " + (m.starting_value_note ?? "") + " " + (m.latest_value_caveat ?? "");
  $("bar").setAttribute("aria-valuenow", pct.toFixed(1));
  later(() => { $("fill").style.width = Math.max(pct, 4) + "%"; }, 120);
  const MS: [number, string, string][] = [[start, "Start", ""], [2e6, "", " alt"], [m.previous_goal, "Old goal", ""], [5e6, "Halfway", ""], [goal, "Goal 🏁", ""]];
  $("milestones").innerHTML = MS.map(([v, t, c]) => {
    const l = Math.max(0, Math.min(100, (v / goal) * 100));
    const edge = l >= 99 ? " edge-r" : l <= 1 ? " edge-l" : "";
    return `<div class="m${cur >= v ? " hit" : ""}${c}${edge}" style="left:${l}%">${short(v)}${cur >= v && v > start ? " ✓" : ""}${t ? `<span class="t">${t}</span>` : ""}</div>`;
  }).join("");
  $("herometa").textContent = `${T.length} trades tracked · announced ${fmtDate(m.original_announcement.date)} · updated ${fmtDate(m.last_updated)}`;
  $("gcdate").textContent = fmtDate(m.goal_changed_on);
  ($("gcsrc") as HTMLAnchorElement).href = safeXUrl(m.goal_change_source);

  // ---- Stats (known data only) ----
  const decided = T.filter((t) => t.outcome === "win" || t.outcome === "loss");
  const wins = decided.filter((t) => t.outcome === "win");
  const known = T.filter((t): t is TogiTrade & { pnl: number } => typeof t.pnl === "number");
  const best = known.reduce<(typeof known)[number] | null>((a, b) => (!a || b.pnl > a.pnl ? b : a), null);
  const worst = known.reduce<(typeof known)[number] | null>((a, b) => (!a || b.pnl < a.pnl ? b : a), null);
  const wr = decided.length ? (wins.length / decided.length) * 100 : null;
  const stats: [string, number | null, (v: number) => string, string, string][] = [
    ["Trades tracked", T.length, (v) => String(Math.round(v)), "posts with a stock or options move", ""],
    ["Biggest W", best ? best.pnl : null, (v) => "+" + short(v), best ? best.ticker + " " + best.type + (best.pnl_derived ? " (derived)" : "") : "", "pos party"],
    ["Biggest L", worst ? worst.pnl : null, (v) => short(v), worst ? worst.ticker + " " + worst.type + " · known P&L only" : "", "neg"],
    ["Win rate", wr, (v) => Math.round(v) + "%", wins.length + "W / " + (decided.length - wins.length) + "L where the result is known", ""],
  ];
  $("stats").innerHTML = stats.map((s, i) =>
    `<div class="stat brand-card ${s[4].includes("party") ? "party" : ""}" id="st${i}"><div class="topline"></div><p class="lbl">${s[0]}</p><p class="v ${s[4].replace("party", "")}" id="sv${i}">${s[1] == null ? "n/a" : ""}</p><p class="s">${esc(s[3])}</p></div>`,
  ).join("");
  stats.forEach((s, i) => { if (s[1] != null) count($("sv" + i), s[1], s[2]); });

  // ---- Degen meter (joke formula, counts come from the data) ----
  const txt = (t: TogiTrade) => (t.type + " " + t.details + " " + (t.note || "")).toLowerCase();
  const nOpt = T.filter((t) => /puts|calls/i.test(t.type)).length;
  const n0 = T.filter((t) => /0dte/i.test(t.type)).length;
  const nFP = T.filter((t) => /full port/.test(txt(t))).length;
  const nDream = T.filter((t) => /dream/.test(txt(t))).length;
  const nCasino = D.side_quests.filter((s) => /shuffle|slot|bet|units/i.test(s.text)).length;
  const parts: [string, number, number][] = [["Options plays", nOpt, 10], ["0DTE lottery tickets", n0, 15], ['"Full port" moments', nFP, 10], ["Dream-based theses", nDream, 5], ["Casino & sports side quests", nCasino, 5]];
  const raw = parts.reduce((a, p) => a + p[1] * p[2], 0), degen = Math.min(100, raw);
  count($("degen"), degen, (v) => String(Math.round(v)));
  $("degenverdict").textContent = degen >= 90 ? "fully cooked 🔥" : degen >= 60 ? "spicy" : degen >= 30 ? "mildly unhinged" : "suspiciously responsible";
  const maxPts = Math.max(...parts.map((p) => p[1] * p[2]), 1);
  $("degenbars").innerHTML = parts.map((p) =>
    `<div class="barrow"><span>${p[0]}</span><span class="bt"><i data-w="${((p[1] * p[2]) / maxPts * 100).toFixed(0)}"></i></span><span class="n">${p[1]} · +${p[1] * p[2]}</span></div>`,
  ).join("");
  later(() => root.querySelectorAll<HTMLElement>("#degenbars i").forEach((i) => { i.style.width = i.dataset.w + "%"; }), 200);
  $("degenfine").textContent = `Joke formula: options play +10, 0DTE +15, "full port" +10, dream thesis +5, casino or sports side quest +5, capped at 100 (raw ${raw}). The counts are real, from the posts below. The score means nothing.`;

  // ---- Magic 8-ball (joke) ----
  const ANS = ["Ask again after his next dream.", "Signs point to GPRO.", "Outlook: 0DTE.", "Reply hazy. Check his X.", "Only if MRNA cooperates.", "Concentrate and full port again.", "Don't count on it. He might, though.", "Cannot predict now. Market's closed.", "It is decidedly… not financial advice."];
  let last = -1;
  ($("shake") as HTMLButtonElement).onclick = () => {
    let i: number;
    do { i = Math.floor(Math.random() * ANS.length); } while (i === last);
    last = i;
    const e = $("eight"), a = $("answer");
    e.classList.remove("shake"); a.classList.remove("pop"); void e.offsetWidth;
    e.classList.add("shake");
    later(() => { a.textContent = ANS[i]; a.classList.add("pop"); }, RM ? 0 : 450);
  };

  // ---- Tape ----
  const tape = T.map((t) =>
    `<span><b>${esc(t.ticker)}</b> ${esc(t.type.toUpperCase())} ${typeof t.pnl === "number" ? `<b class="${t.pnl > 0 ? "pos" : "neg"}">${t.pnl > 0 ? "▲ +" : "▼ "}${short(t.pnl)}</b>` : esc(t.outcome.toUpperCase())}</span>`,
  ).join("");
  const tapeAll = tape + `<span><b>ROAD TO $10M</b> ${pct.toFixed(1)}%</span><span>NOT FINANCIAL ADVICE</span>`;
  $("tape").innerHTML = tapeAll + tapeAll;

  // ---- Chart (inline SVG) ----
  (function chart() {
    const H = D.account_history.slice().sort((a, b) => a.date.localeCompare(b.date));
    const narrow = $("chart").clientWidth < 600, W = narrow ? 520 : 900, Ht = narrow ? 340 : 360, P = { l: 60, r: 12, t: 14, b: 30 };
    const t0 = new Date(H[0].date).getTime(), t1 = new Date(H[H.length - 1].date).getTime() || t0 + 1;
    const vmax = Math.max(...H.map((h) => h.value)) * 1.12;
    const x = (d: string) => P.l + ((new Date(d).getTime() - t0) / (t1 - t0 || 1)) * (W - P.l - P.r);
    const y = (v: number) => Ht - P.b - (v / vmax) * (Ht - P.t - P.b);
    let g = '<defs><linearGradient id="ga" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#f2b441" stop-opacity=".28"/><stop offset="1" stop-color="#f2b441" stop-opacity="0"/></linearGradient></defs>';
    for (let i = 0; i <= 4; i++) {
      const v = (vmax / 4) * i;
      g += `<line x1="${P.l}" x2="${W - P.r}" y1="${y(v)}" y2="${y(v)}" stroke="#1a1d22"/><text x="${P.l - 8}" y="${y(v) + 4}" fill="#7d848e" font-size="13" font-family="Geist Mono,monospace" text-anchor="end">${short(v)}</text>`;
    }
    // Axis ticks on the 1st and 15th of each month (15th only when narrow).
    const ticks: string[] = [];
    const d0 = new Date(t0);
    for (let y0 = d0.getUTCFullYear(), mo = d0.getUTCMonth(); ticks.length < 24; mo++) {
      const days = narrow ? [15] : [1, 15];
      const first = Date.UTC(y0, mo, 1);
      if (first > t1) break;
      for (const day of days) {
        const t = Date.UTC(y0, mo, day);
        if (t >= t0 && t <= t1) ticks.push(new Date(t).toISOString().slice(0, 10));
      }
    }
    ticks.forEach((d) => { g += `<text x="${x(d)}" y="${Ht - 8}" fill="#7d848e" font-size="13" text-anchor="middle">${fmtDate(d).replace(/, \d{4}$/, "")}</text>`; });
    g += `<line x1="${P.l}" x2="${W - P.r}" y1="${y(start)}" y2="${y(start)}" stroke="#f2b44166" stroke-dasharray="4 6"/><text x="${P.l + 6}" y="${y(start) + 16}" fill="#f2b441aa" font-size="12">start ${short(start)}</text>`;
    ([["challenge", "#f2b441", true], ["options", "#c9ced6", false]] as const).forEach(([k, c, area]) => {
      const pts = H.filter((h) => h.account === k);
      if (!pts.length) return;
      const line = pts.map((p) => x(p.date) + "," + y(p.value)).join(" ");
      if (area) g += `<polygon fill="url(#ga)" points="${x(pts[0].date)},${y(0)} ${line} ${x(pts[pts.length - 1].date)},${y(0)}"/>`;
      g += `<polyline class="ln" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" points="${line}"/>`;
      pts.forEach((p) => {
        g += `<a href="${safeXUrl(p.source_url)}" ${ext}><circle cx="${x(p.date)}" cy="${y(p.value)}" r="5.5" fill="${c}" stroke="#08090b" stroke-width="2.5"><title>${fmtDate(p.date)}: ${usd(p.value, 0)} (${esc(p.label)})</title></circle></a>`;
      });
    });
    $("chart").innerHTML = `<svg viewBox="0 0 ${W} ${Ht}" role="img" aria-label="Account value over time">${g}</svg>`;
  })();

  // ---- Trades ----
  const vibe = (t: TogiTrade) => {
    const ty = t.type.toLowerCase();
    if (/0dte/.test(ty)) return "🎟️ lottery ticket";
    if (/puts/.test(ty)) return "🐻 bear mode";
    if (/calls/.test(ty)) return "🐂 bull mode";
    if (/transfer/.test(ty)) return "🔁 reshuffle";
    return "🧱 shares";
  };
  const verdict = (t: TogiTrade): [string, string] =>
    t.outcome === "win" ? ["vw", "W · printed"] : t.outcome === "loss" ? ["vl", "L · tuition paid"] : t.outcome === "update" ? ["vu", "Update"] : ["vu", t.outcome.replace("open→", "entry → ")];
  function render(f: string) {
    const list = T.slice().sort((a, b) => b.date.localeCompare(a.date))
      .filter((t) => f === "all" || (f === "other" ? !["win", "loss"].includes(t.outcome) : t.outcome === f));
    $("timeline").innerHTML = list.map((t, i) => {
      const k = t.outcome === "win" ? "win" : t.outcome === "loss" ? "loss" : "other", [vc, vt] = verdict(t), isBest = best && t === best;
      const pnl = typeof t.pnl === "number"
        ? `<span class="pnl ${t.pnl >= 0 ? "pos" : "neg"}">${t.pnl >= 0 ? "+" : ""}${usd(t.pnl)}${t.pnl_derived ? "*" : ""}</span>`
        : `<span class="pnl nd">P&amp;L not disclosed</span>`;
      return `<article class="trade brand-card k-${k}${isBest ? " biggest" : ""}" style="animation-delay:${Math.min(i, 8) * 40}ms"><div class="topline"></div>
        <div class="row"><span class="tk">$${esc(t.ticker)}</span>${pnl}</div>
        <div class="tags"><span class="tag ${vc}">${esc(vt)}</span>${isBest ? '<span class="tag trophy">🏆 Biggest W</span>' : ""}<span class="tag">${vibe(t)}</span><span class="tag">${esc(t.type)}${t.direction ? " · " + esc(t.direction) : ""}</span><span class="date">${fmtDate(t.date)}</span></div>
        <p class="d">${esc(t.details)}</p>
        ${isFinite(Number(t.account_value)) && t.account_value ? `<p class="n">Account value shown: <b>${usd(Number(t.account_value), 2)}</b></p>` : ""}
        ${t.note ? `<p class="n">${linkify(t.note)}${t.pnl_derived ? " (*derived from his screenshots)" : ""}</p>` : ""}
        <a class="go" href="${safeXUrl(t.source_url)}" ${ext}>View the post on X <span>→</span></a>
      </article>`;
    }).join("");
    root.querySelectorAll<HTMLElement>(".trade.biggest").forEach((el) => {
      el.addEventListener("mouseenter", () => party(el));
      el.addEventListener("click", (e) => { if (!(e.target as HTMLElement).closest("a")) party(el); });
    });
  }
  root.querySelectorAll<HTMLButtonElement>(".seg button").forEach((b) => {
    b.onclick = () => {
      root.querySelectorAll(".seg button").forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      render(b.dataset.f ?? "all");
    };
  });
  render("all");

  // ---- Confetti ----
  let lastParty = 0;
  function party(el: HTMLElement) {
    if (RM || !alive) return;
    const now = Date.now();
    if (now - lastParty < 1500) return;
    lastParty = now;
    const r = el.getBoundingClientRect(), box = $("confetti"), cols = ["#f2b441", "#52d18b", "#f3f5f7", "#ffd98a", "#a8781f"];
    for (let i = 0; i < 46; i++) {
      const c = document.createElement("i");
      const a = Math.random() * Math.PI * 2, d = 80 + Math.random() * 180;
      c.style.left = r.left + r.width / 2 + "px";
      c.style.top = r.top + Math.min(r.height / 2, 60) + "px";
      c.style.background = cols[i % cols.length];
      c.style.setProperty("--dx", Math.cos(a) * d + "px");
      c.style.setProperty("--dy", Math.sin(a) * d + 140 + "px");
      c.style.setProperty("--r", Math.random() * 720 - 360 + "deg");
      c.style.animationDelay = Math.random() * 80 + "ms";
      box.appendChild(c);
      later(() => c.remove(), 1700);
    }
  }
  const ps = root.querySelector<HTMLElement>(".stat.party");
  if (ps) { ps.addEventListener("mouseenter", () => party(ps)); ps.addEventListener("click", () => party(ps)); }

  // ---- Positions ----
  const S = D.open_positions_snapshot;
  const tot = S.positions.reduce((a, p) => a + p.value, 0) || 1;
  $("snapdate").textContent = fmtDate(S.date);
  ($("possrc") as HTMLAnchorElement).href = safeXUrl(S.source_url);
  $("positions").innerHTML = S.positions.map((p) => {
    const u = typeof p.unrealized === "number" ? p.unrealized : null;
    const pc = typeof p.pct === "number" ? p.pct : null;
    return `<div class="pos-r"><b>${esc(p.ticker)}</b><div><div class="bt"><i style="width:${((p.value / tot) * 100).toFixed(1)}%"></i></div><span class="meta2">${usd(p.value)} · ${Number(p.shares).toLocaleString("en-US")} sh</span></div><span class="u ${u == null ? "" : u >= 0 ? "pos" : "neg"}">${u == null ? "n/a" : (u >= 0 ? "+" : "") + short(u) + (pc != null ? " (" + pc + "%)" : "")}</span></div>`;
  }).join("");
  $("side").innerHTML = D.side_quests.map((s) =>
    `<li><span class="dt">${fmtDate(s.date)}</span>${esc(s.text)} <a href="${safeXUrl(s.source_url)}" ${ext}>post ↗</a></li>`,
  ).join("");

  // ---- Portfolio (optional part of the feed; hidden when missing or malformed) ----
  const pf = $("portfolio");
  let pfHtml = "";
  if (isTogiPortfolio(D.portfolio)) {
    try { pfHtml = renderPortfolioHtml(D.portfolio); } catch { pfHtml = ""; }
  }
  $("pf").innerHTML = pfHtml;
  pf.hidden = !pfHtml;
  if (pfHtml) {
    const marks = Array.from(pf.querySelectorAll<HTMLElement | SVGElement>("[data-t]"));
    const hl = (t: string | null) => marks.forEach((e) => e.classList.toggle("hl", t != null && e.dataset.t === t));
    marks.forEach((e) => { e.addEventListener("mouseenter", () => hl(e.dataset.t ?? null)); e.addEventListener("mouseleave", () => hl(null)); });
  }

  return () => { alive = false; timers.forEach((t) => clearTimeout(t)); };
}

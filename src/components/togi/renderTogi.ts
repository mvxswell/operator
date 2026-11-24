// DOM rendering for the Togi Tracker page, ported from the standalone tracker's app.js.
// Runs only in the browser, after the data has loaded. Every string from the feed is
// HTML-escaped and every link goes through safeXUrl, since the feed is third-party data.
import { isRobinhoodStats, isTogiPortfolio, safeXUrl, type TogiData, type TogiTrade } from "../../lib/togi";
import { renderPortfolioHtml, renderPortfolioSummaryHtml } from "./portfolio";
import { renderRobinhoodHtml } from "./robinhood";
import { degenHeat, pickEightBallAnswer, reportedLoss } from "./personality";

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

/** Needle angle in CSS degrees: 0 sits on the left, 100 on the right, 50 straight up. */
export function degenNeedleAngle(score: number): number {
  const clamped = Math.max(0, Math.min(100, score));
  return -90 + 180 * (clamped / 100);
}

/** Semicircle gauge markup. The needle starts at 0; the caller sweeps it to `degenNeedleAngle`. */
function degenGaugeSvg(degen: number, verdict: string): string {
  const cx = 120, cy = 118, r = 86;
  const xy = (a: number, rr = r): [number, number] => [cx + Math.cos(a) * rr, cy - Math.sin(a) * rr];
  const arc = (a0: number, a1: number, rr = r) => {
    const p0 = xy(a0, rr), p1 = xy(a1, rr);
    return `M ${p0[0].toFixed(2)} ${p0[1].toFixed(2)} A ${rr} ${rr} 0 0 1 ${p1[0].toFixed(2)} ${p1[1].toFixed(2)}`;
  };
  const cuts: [number, string][] = [[0, "#5d5546"], [30, "#c9a24a"], [60, "#f2b441"], [90, "#f2b441"]];
  const segs = cuts.map((c, i) => {
    const a0 = Math.PI * (1 - c[0] / 100);
    const next = cuts[i + 1] ? cuts[i + 1][0] : 100;
    const a1 = Math.PI * (1 - next / 100);
    return `<path class="seg" d="${arc(a0, a1)}" stroke="${c[1]}"${c[0] >= 90 ? ' stroke-linecap="round"' : ""}/>`;
  }).join("");
  const ticks = [0, 25, 50, 75, 100].map((v) => {
    const a = Math.PI * (1 - v / 100);
    const inner = xy(a, r + 4), outer = xy(a, r + 12), lab = xy(a, r + 24);
    return `<line class="tick" x1="${inner[0].toFixed(1)}" y1="${inner[1].toFixed(1)}" x2="${outer[0].toFixed(1)}" y2="${outer[1].toFixed(1)}"/><text class="tick-lab" x="${lab[0].toFixed(1)}" y="${lab[1].toFixed(1)}" text-anchor="middle" dominant-baseline="middle">${v}</text>`;
  }).join("");
  const label = verdict.replace(/🔥/g, "").trim();
  return `<svg class="degen-gauge" viewBox="0 0 240 156" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${degen}" aria-label="Degen meter ${degen} out of 100, ${esc(label)}">
    <path class="glow" d="${arc(Math.PI, 0)}" />
    <path class="track" d="${arc(Math.PI, 0)}" />
    ${segs}
    ${ticks}
    <g class="needle" id="degen-needle" transform="rotate(-90 120 118)">
      <polygon points="120,34 123.5,118 116.5,118" fill="#f3f5f7"/>
      <circle class="hub" cx="120" cy="118" r="6.5"/>
    </g>
  </svg>`;
}

/** Renders the tracker into `root`. Returns a cleanup function. */
export function renderTogi(root: HTMLElement, D: TogiData): () => void {
  const m = D.meta, T = D.trades;
  const timers: number[] = [];
  let needleFrame = 0;
  let alive = true;
  const $ = (id: string) => root.querySelector<HTMLElement>(`#${id}`)!;
  const later = (fn: () => void, ms: number) => { timers.push(window.setTimeout(() => alive && fn(), ms)); };
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function count(el: HTMLElement, to: number, fmt: (v: number) => string, from = 0, ms = 0) {
    if (RM || ms === 0) { el.textContent = fmt(to); return; }
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
  if (isTogiPortfolio(D.portfolio)) {
    const account = D.portfolio.accounts.find((a) => a.status === "current") ?? D.portfolio.accounts[0];
    $("hero-day").innerHTML = typeof account.day_change === "number" ? `<span class="${account.day_change >= 0 ? "pos" : "neg"}">${account.day_change >= 0 ? "+" : ""}${usd(account.day_change, 2)}${typeof account.day_change_pct === "number" ? ` (${account.day_change_pct > 0 ? "+" : ""}${account.day_change_pct}%)` : ""}</span><span>Posted ${fmtDate(account.as_of)}</span>` : "";
  }
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
  const heat = degenHeat(raw);
  $("degen-heat").textContent = heat.points.toLocaleString("en-US");
  $("degen-tier").textContent = `${heat.icon} ${heat.name}`;
  $("degen-next").textContent = `${heat.remaining.toLocaleString("en-US")} to next tier`;
  $("degen-strip").setAttribute("aria-valuenow", String(heat.points));
  $("degen-strip").setAttribute("aria-valuemax", String(heat.next));
  $("degen-strip").setAttribute("aria-valuetext", `${heat.name}: ${heat.points} joke heat points, next tier at ${heat.next}`);
  $("degen-strip").innerHTML = Array.from({ length: 20 }, (_, i) => `<i aria-hidden="true"${i < heat.progress / 5 ? ' class="lit"' : ""}></i>`).join("");
  $("degen-panel").dataset.heat = heat.points >= 500 ? "nuclear" : heat.points >= 250 ? "cooked" : "warming";
  count($("degen"), degen, (v) => String(Math.round(v)));
  const degenVerdict = degen >= 90 ? "fully cooked 🔥" : degen >= 60 ? "spicy" : degen >= 30 ? "mildly unhinged" : "suspiciously responsible";
  const verdictEl = $("degenverdict");
  verdictEl.textContent = degen >= 90 ? "fully cooked " : degenVerdict;
  if (degen >= 90) {
    const flame = document.createElement("span");
    flame.className = "degen-flame";
    flame.setAttribute("aria-hidden", "true");
    flame.textContent = "🔥";
    verdictEl.appendChild(flame);
  }
  const panel = $("degen-panel");
  const tier = degen >= 90 ? "cooked" : degen >= 60 ? "spicy" : degen >= 30 ? "unhinged" : "chill";
  panel.dataset.tier = tier;
  panel.classList.toggle("degen-hot", degen >= 90);
  panel.classList.toggle("degen-max", degen >= 100);
  $("degen-gauge").innerHTML = degenGaugeSvg(degen, degenVerdict);
  const needle = $("degen-needle");
  const targetAng = degenNeedleAngle(degen);
  const setAng = (a: number) => needle.setAttribute("transform", `rotate(${a.toFixed(3)} 120 118)`);
  // Overshoot ease (easeOutBack): the needle sweeps past the score, then settles.
  const easeOutBack = (t: number) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };
  if (RM) { setAng(targetAng); }
  else {
    const t0 = performance.now(), ms = 1400;
    const sweep = (t: number) => {
      if (!alive) return;
      const p = Math.min(1, (t - t0) / ms);
      setAng(-90 + (targetAng + 90) * easeOutBack(p));
      if (p < 1) needleFrame = requestAnimationFrame(sweep);
    };
    needleFrame = requestAnimationFrame(sweep);
  }
  const maxPts = Math.max(...parts.map((p) => p[1] * p[2]), 1);
  $("degenbars").innerHTML = parts.map((p, i) =>
    `<div class="barrow" style="${RM ? "" : `animation-delay:${i * 90}ms`}"><span>${p[0]}</span><span class="bt"><i data-w="${((p[1] * p[2]) / maxPts * 100).toFixed(0)}" style="${RM ? "" : `transition-delay:${120 + i * 90}ms`}"></i></span><span class="n">${p[1]} · +${p[1] * p[2]}</span></div>`,
  ).join("");
  later(() => root.querySelectorAll<HTMLElement>("#degenbars i").forEach((i) => { i.style.width = i.dataset.w + "%"; }), RM ? 0 : 200);
  let latestMove = T[0];
  for (const t of T) if (t.date > latestMove.date) latestMove = t;
  $("degenlatest").innerHTML = `Latest degen move: <a href="${esc(safeXUrl(latestMove.source_url))}" ${ext}>$${esc(latestMove.ticker)} ${esc(latestMove.type)} · ${fmtDate(latestMove.date)} ↗</a>`;
  $("degenfine").textContent = `Joke formula: options play +10, 0DTE +15, "full port" +10, dream thesis +5, casino or sports side quest +5, capped at 100 (raw ${raw}). The counts are real, from the posts below. The score means nothing.`;

  // ---- Magic 8-ball (joke) ----
  const recentAnswers: number[] = [];
  ($("shake") as HTMLButtonElement).onclick = () => {
    const result = pickEightBallAnswer(recentAnswers);
    recentAnswers.push(result.index);
    if (recentAnswers.length > 3) recentAnswers.shift();
    const e = $("eight"), a = $("answer");
    const button = $("shake") as HTMLButtonElement;
    button.disabled = true;
    button.textContent = "Consulting…";
    e.classList.remove("shake"); a.classList.remove("pop"); void e.offsetWidth;
    e.classList.add("shake");
    later(() => { a.textContent = result.answer; a.classList.add("pop"); button.disabled = false; button.textContent = "Shake again"; }, RM ? 0 : 450);
  };

  const lossClaim = reportedLoss(D);
  const lossContext = $("reported-loss");
  lossContext.hidden = !lossClaim;
  if (lossClaim) {
    lossContext.innerHTML = `<div><span class="reported-label">${lossClaim.attribution} · ${fmtDate(lossClaim.date)}</span><strong>≈$700K <span>in his own words</span></strong></div><p>His caption describes “losing the 700k.” Exact realized P&amp;L and the measurement period are unconfirmed; deposits and intraday marks complicate the daily total. This claim is excluded from trade P&amp;L, balances and win-rate calculations.</p><a href="${lossClaim.source}" ${ext}>Read his post ↗</a>`;
  }

  // ---- Tape ----
  const tape = T.map((t) =>
    `<span><b>${esc(t.ticker)}</b> ${esc(t.type.toUpperCase())} ${typeof t.pnl === "number" ? `<b class="${t.pnl > 0 ? "pos" : "neg"}">${t.pnl > 0 ? "▲ +" : "▼ "}${short(t.pnl)}</b>` : esc(t.outcome.toUpperCase())}</span>`,
  ).join("");
  const tapeAll = tape + `<span><b>ROAD TO $10M</b> ${pct.toFixed(1)}%</span><span>NOT FINANCIAL ADVICE</span>`;
  $("tape").innerHTML = tapeAll + tapeAll;

  // ---- Historical account chart: one account at a time, with source receipts. ----
  let chartAccount = D.account_history.some((p) => p.account === "challenge") ? "challenge" : "options";
  let chartRange = "all";
  function chart() {
    const history = D.account_history.slice().sort((a, b) => a.date.localeCompare(b.date));
    const accountPoints = history.filter((p) => p.account === chartAccount);
    if (!accountPoints.length) return;
    const latestTime = Date.parse(accountPoints[accountPoints.length - 1].date);
    const cutoff = chartRange === "all" ? -Infinity : latestTime - Number(chartRange) * 864e5;
    const selected = accountPoints.filter((p) => Date.parse(p.date) >= cutoff);
    const W = Math.max(240, $("chart").clientWidth), Ht = 184, P = { l: 10, r: 65, t: 16, b: 28 };
    const firstTime = Date.parse(selected[0].date), lastTime = Date.parse(selected[selected.length - 1].date);
    const min = Math.min(...selected.map((p) => p.value)), max = Math.max(...selected.map((p) => p.value));
    const pad = Math.max((max - min) * .18, max * .025, 1);
    const low = Math.max(0, min - pad), high = max + pad;
    const x = (date: string) => P.l + (lastTime === firstTime ? .5 : (Date.parse(date) - firstTime) / (lastTime - firstTime)) * (W - P.l - P.r);
    const y = (v: number) => Ht - P.b - ((v - low) / (high - low)) * (Ht - P.t - P.b);
    const readout = (point: typeof history[number]) => {
      $("chart-readout").innerHTML = `<strong>${usd(point.value, 2)}</strong><span>${fmtDate(point.date)}</span><a href="${safeXUrl(point.source_url)}" ${ext}>Source post ↗</a>`;
    };
    $("chart-context").textContent = chartAccount === "challenge" ? "Fidelity · challenge shares" : "Robinhood · options account";
    readout(selected[selected.length - 1]);
    let g = '<defs><linearGradient id="tg-chart-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#35d87c" stop-opacity=".22"/><stop offset="1" stop-color="#35d87c" stop-opacity=".015"/></linearGradient></defs>';
    for (let i = 0; i <= 3; i++) {
      const value = low + ((high - low) / 3) * i;
      g += `<line x1="${P.l}" x2="${W - P.r}" y1="${y(value)}" y2="${y(value)}" stroke="#202524"/><text x="${W - P.r + 12}" y="${y(value) + 4}" fill="#9a9e9d" font-size="12">${short(value)}</text>`;
    }
    const ticks = firstTime === lastTime ? 1 : W < 420 ? 3 : 4;
    for (let i = 0; i < ticks; i++) {
      const time = firstTime + (lastTime - firstTime) * i / (ticks - 1 || 1);
      const date = new Date(time).toISOString().slice(0, 10);
      g += `<text x="${ticks === 1 ? x(date) : P.l + (W - P.l - P.r) * i / (ticks - 1)}" y="${Ht - 5}" fill="#9a9e9d" font-size="11" text-anchor="${ticks === 1 ? "middle" : i === 0 ? "start" : i === ticks - 1 ? "end" : "middle"}">${fmtDate(date).replace(/, \d{4}$/, "")}</text>`;
    }
    const line = selected.map((p) => `${x(p.date)},${y(p.value)}`).join(" ");
    g += `<polygon fill="url(#tg-chart-area)" points="${x(selected[0].date)},${y(low)} ${line} ${x(selected[selected.length - 1].date)},${y(low)}"/><polyline fill="none" stroke="#35d87c" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" points="${line}"/>`;
    g += `<line id="chart-crosshair" y1="${P.t}" y2="${Ht - P.b}" stroke="#7e8983" stroke-dasharray="3 4" opacity="0"/>`;
    // Keep every source point in the DOM. Account/range controls select its visibility.
    history.forEach((p, index) => {
      const visible = p.account === chartAccount && Date.parse(p.date) >= cutoff;
      const last = visible && p === selected[selected.length - 1];
      g += `<a class="chart-point${last ? " last" : ""}" data-point="${index}" href="${safeXUrl(p.source_url)}" aria-label="${esc(p.account)} · ${fmtDate(p.date)}: ${usd(p.value, 2)} · ${esc(p.label)} · open source post" ${visible ? "" : 'style="display:none"'} ${ext}><circle class="point-hit" cx="${x(p.date)}" cy="${y(p.value)}" r="12" fill="transparent"/><circle class="point-dot" cx="${x(p.date)}" cy="${y(p.value)}" r="${last ? 4 : 3.5}" fill="#35d87c" stroke="#0a100d" stroke-width="2"><title>${fmtDate(p.date)}: ${usd(p.value, 2)} (${esc(p.label)})</title></circle></a>`;
    });
    $("chart").innerHTML = `<svg viewBox="0 0 ${W} ${Ht}" role="img" aria-label="${chartAccount === "challenge" ? "Fidelity" : "Robinhood"} posted account history">${g}</svg>`;
    root.querySelectorAll<SVGAElement>(".chart-point").forEach((point) => {
      const show = () => {
        const p = history[Number(point.dataset.point)];
        readout(p);
        const crosshair = $("chart-crosshair");
        crosshair.setAttribute("x1", String(x(p.date))); crosshair.setAttribute("x2", String(x(p.date))); crosshair.setAttribute("opacity", ".65");
      };
      point.onmouseenter = show;
      point.onfocus = show;
      point.onmouseleave = () => { $("chart-crosshair").setAttribute("opacity", "0"); };
    });
  }
  root.querySelectorAll<HTMLButtonElement>(".chart-accounts button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.account === chartAccount));
    button.disabled = !D.account_history.some((p) => p.account === button.dataset.account);
    button.onclick = () => {
      chartAccount = button.dataset.account!;
      root.querySelectorAll<HTMLButtonElement>(".chart-accounts button").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      chart();
    };
  });
  root.querySelectorAll<HTMLButtonElement>(".chart-ranges button").forEach((button) => {
    button.onclick = () => {
      chartRange = button.dataset.range!;
      root.querySelectorAll<HTMLButtonElement>(".chart-ranges button").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      chart();
    };
  });
  chart();
  const chartObserver = new ResizeObserver(chart);
  chartObserver.observe($("chart"));

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
      return `<article class="trade brand-card k-${k}${isBest ? " biggest" : ""}" style="animation-delay:${Math.min(i, 8) * 40}ms">
        <div class="trade-position"><span class="date">${fmtDate(t.date)}</span><h3 class="tk">$${esc(t.ticker)}</h3><span class="tag ${vc}">${esc(vt)}</span>${isBest ? '<span class="tag trophy">🏆 Biggest W</span>' : ""}</div>
        <div class="trade-body"><div class="tags"><span class="tag">${vibe(t)}</span><span class="tag">${esc(t.type)}${t.direction ? " · " + esc(t.direction) : ""}</span></div>
        <p class="d">${esc(t.details)}</p>
        ${isFinite(Number(t.account_value)) && t.account_value ? `<p class="n">Account value shown: <b>${usd(Number(t.account_value), 2)}</b></p>` : ""}
        ${t.note ? `<p class="n">${linkify(t.note)}${t.pnl_derived ? " (*derived from his screenshots)" : ""}</p>` : ""}
        <a class="go" href="${safeXUrl(t.source_url)}" ${ext}>View source post ↗</a></div><div class="trade-result">${pnl}</div>
      </article>`;
    }).join("");
    root.querySelectorAll<HTMLElement>(".trade.biggest").forEach((el) => {
      el.addEventListener("mouseenter", () => party(el));
      el.addEventListener("click", (e) => { if (!(e.target as HTMLElement).closest("a")) party(el); });
    });
  }
  root.querySelectorAll<HTMLButtonElement>(".seg button").forEach((b) => {
    b.onclick = () => {
      root.querySelectorAll(".seg button").forEach((x) => { x.classList.remove("on"); x.setAttribute("aria-pressed", "false"); });
      b.classList.add("on");
      b.setAttribute("aria-pressed", "true");
      render(b.dataset.f ?? "all");
    };
  });
  root.querySelectorAll<HTMLButtonElement>(".seg button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.f === "all")));
  render("all");

  // The overview is a window into the complete ledger below, never a replacement for it.
  $("recent-trades").innerHTML = `<table class="summary-table"><thead><tr><th>Date</th><th>Symbol</th><th>Result</th><th>P&amp;L</th></tr></thead><tbody>${T.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5).map((t) => `<tr><td>${fmtDate(t.date).replace(/, \d{4}$/, "")}</td><td><b>${esc(t.ticker)}</b><span>${esc(t.type)}</span></td><td><span class="tag ${verdict(t)[0]}">${esc(t.outcome === "win" ? "Win" : t.outcome === "loss" ? "Loss" : t.outcome === "update" ? "Update" : t.outcome === "open" ? "Open" : t.outcome.replace("open→", "entry → "))}</span></td><td class="${typeof t.pnl === "number" ? t.pnl >= 0 ? "pos" : "neg" : "nd"}">${typeof t.pnl === "number" ? (t.pnl >= 0 ? "+" : "") + short(t.pnl) + (t.pnl_derived ? "*" : "") : "—"}</td></tr>`).join("")}</tbody></table><p class="summary-foot">— P&amp;L not disclosed · <a href="#trades">All ${T.length} trades &amp; receipts</a></p>`;

  // ---- Confetti ----
  let lastParty = 0;
  function party(el: HTMLElement, count = 46) {
    if (RM || !alive) return;
    const now = Date.now();
    if (now - lastParty < 1500) return;
    lastParty = now;
    const r = el.getBoundingClientRect(), box = $("confetti"), cols = ["#f2b441", "#52d18b", "#f3f5f7", "#ffd98a", "#a8781f"];
    for (let i = 0; i < count; i++) {
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
  if (!RM && degen >= 100) later(() => party($("degen-panel"), 28), 1500);

  // ---- Side quests ----
  $("side").innerHTML = D.side_quests.map((s) =>
    `<li><span class="dt">${fmtDate(s.date)}</span>${esc(s.text)} <a href="${safeXUrl(s.source_url)}" ${ext}>post ↗</a></li>`,
  ).join("");

  // ---- Robinhood options account (optional; hidden when robinhood_stats is missing or malformed) ----
  const rh = $("robinhood-stats");
  if (isRobinhoodStats(D.robinhood_stats)) {
    const html = renderRobinhoodHtml(D.robinhood_stats);
    $("rh-kpis").innerHTML = html.kpis;
    $("rh-note").innerHTML = html.note;
    rh.hidden = false;
  } else {
    $("rh-kpis").innerHTML = "";
    $("rh-note").textContent = "";
    rh.hidden = true;
  }

  // ---- Portfolio (optional part of the feed; hidden when missing or malformed) ----
  const pf = $("portfolio");
  let pfHtml = "";
  if (isTogiPortfolio(D.portfolio)) {
    try { pfHtml = renderPortfolioHtml(D.portfolio); } catch { pfHtml = ""; }
    $("portfolio-preview").innerHTML = renderPortfolioSummaryHtml(D.portfolio);
  }
  $("portfolio-preview").hidden = !pfHtml;
  $("pf").innerHTML = pfHtml;
  pf.hidden = !pfHtml;
  if (pfHtml) {
    const marks = Array.from(pf.querySelectorAll<HTMLElement | SVGElement>("[data-t]"));
    const hl = (t: string | null) => marks.forEach((e) => e.classList.toggle("hl", t != null && e.dataset.t === t));
    marks.forEach((e) => { e.addEventListener("mouseenter", () => hl(e.dataset.t ?? null)); e.addEventListener("mouseleave", () => hl(null)); });
  }

  return () => { alive = false; chartObserver.disconnect(); cancelAnimationFrame(needleFrame); timers.forEach((t) => clearTimeout(t)); };
}

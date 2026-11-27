"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import snapshotJson from "@/data/togiSnapshot.json";
import { DONATE_FALLBACK_URL, isRobinhoodStats, isTogiData, isTogiDonations, isTogiPortfolio, loadTogiData, safeDonateUrl, TOGI_PROFILE_URL, togiTip, togiVersionLabel, type TogiData, type TogiSource } from "@/lib/togi";
import { fmtDate, renderTogi } from "./renderTogi";

if (!isTogiData(snapshotJson)) throw new Error("Togi Tracker snapshot does not match the expected shape");
const SNAPSHOT: TogiData = snapshotJson;

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Mark({ small = false }: { small?: boolean }) {
  return (
    <svg className={small ? "mark sm" : "mark"} viewBox="0 0 64 64" aria-hidden="true">
      <path fill="#f2b441" d="M22 4H38V14H26L14 26V38L26 50H38L50 38V26H60V42L42 60H22L4 42V22Z" />
      <path fill="#f2b441" d="M42 4H60V22H50V21L33 38L26 31L43 14H42Z" />
    </svg>
  );
}

/** The tracker markup. Data-driven parts are filled by renderTogi once the feed (or snapshot) loads. */
export function TogiTracker() {
  const root = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<{ source: TogiSource; asOf: string; tip: ReturnType<typeof togiTip>; hasPortfolio: boolean; hasRobinhood: boolean; hasDonations: boolean; version: string; donateUrl: string } | null>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    loadTogiData(SNAPSHOT).then(({ data, source }) => {
      if (cancelled || !root.current) return;
      cleanup = renderTogi(root.current, data);
      setState({ source, asOf: data.meta.last_updated, tip: togiTip(data.meta), hasPortfolio: isTogiPortfolio(data.portfolio), hasRobinhood: isRobinhoodStats(data.robinhood_stats), hasDonations: isTogiDonations(data.donations), version: togiVersionLabel(data.meta), donateUrl: safeDonateUrl(data.meta.donate_url) });
    });
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return (
    <div className="togi-tracker" ref={root} data-togi-source={state?.source ?? "loading"}>
      <div className="wrap tg-main">
        <div className="tg-topblock">
          <header className="tg-top">
            <Mark />
            <h1 className="tg-title">Togi Tracker</h1>
            <span className="tg-version">{state?.version ?? "V2.1"}</span>
            <span className="chip">Unofficial</span>
          <nav className="tg-jump" aria-label="Tracker sections">
            <a href="#overview">Dashboard</a>
            {state?.hasPortfolio && <a href="#portfolio">Portfolio</a>}
            <a href="#trades">Trade history</a>
            {state?.hasRobinhood && <a href="#robinhood-stats">Robinhood stats</a>}
            <a href="#extras">Degen zone</a>
            {state?.hasDonations && <a href="#donations">Donations</a>}
          </nav>
            <div className="feed-status" role="status"><span className="feed-dot" />{state ? state.source === "live" ? "Live feed connected" : "Saved snapshot" : "Connecting to feed…"}<span className="feed-date">{state ? `Updated ${fmtDate(state.asOf)}` : "Public posts, tracked"}</span></div>
            <Link className="navcta" href="/operator/">Take the Operator Test</Link>
          </header>
          <p className="tg-follow-row"><a className="tg-follow" href={TOGI_PROFILE_URL} {...ext}>Follow Togi on X · @ShaneStoffer ↗</a></p>
          <div className="donate-call">
            <a className="btn primary donate-btn" href={state?.donateUrl ?? DONATE_FALLBACK_URL} {...ext}>Donate to the kids</a>
            <p className="fine">Unofficial fan-site link. Not affiliated with Ronald McDonald House Charities or with Togi.</p>
          </div>

          <div id="overview" className="overview-anchor" />
          <div className="tg-lead" id="accounts">
            <section className="panel panel-depth meter" aria-label="Road to $1M">
              <div className="meter-top">
                <div>
                  <p className="lbl" id="meter-kicker">Robinhood · $6K to $1M challenge</p>
                  <p className="score tabular" id="cur">$–</p><p id="hero-day" className="hero-day"></p>
                  <a className="src" id="cursrc" href={TOGI_PROFILE_URL} {...ext}></a>
                </div>
                <span className="badge" id="pctbadge">% to $1M</span>
              </div>
              <div className="meter-scale">
                <div className="meter-now-row"><span className="meter-now edge-l" id="meter-now">$–</span></div>
                <div className="meter-bar-track" id="meter-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-label="Progress to $1M">
                  <div className="meter-bar-fill" id="meter-fill"></div>
                  <div className="meter-marker" id="meter-marker"></div>
                </div>
                <div className="meter-ticks" id="meter-ticks"></div>
              </div>
              <div className="meter-foot">
                <div><p className="lbl">To go</p><p className="mono tabular" id="togo">–</p></div>
                <div><p className="lbl">Progress from start</p><p className="mono tabular" id="fromstart">–</p></div>
                <div><p className="lbl">Multiple needed</p><p className="mono tabular acc" id="mult">–</p></div>
              </div>
              <details className="account-context"><summary>Account context &amp; important caveats</summary><p className="caveat" id="caveat"></p></details>
            </section>

            <section className="panel panel-depth chartp">
              <div className="chart-toolbar">
                <div className="chart-ranges" role="group" aria-label="Chart date range">
                  <button type="button" data-range="7" aria-pressed="false">1W</button>
                  <button type="button" data-range="30" aria-pressed="false">1M</button>
                  <button type="button" data-range="all" aria-pressed="true">ALL</button>
                </div>
                <div className="chart-accounts" role="group" aria-label="Chart account">
                  <button type="button" data-account="options" aria-pressed="true">Robinhood</button>
                  <button type="button" data-account="challenge" aria-pressed="false">Previous run</button>
                </div>
              </div>
              <div className="chart-heading"><h2>Posted account balances</h2><span id="chart-context">Posted account values</span></div>
              <div className="chart-readout" id="chart-readout" aria-live="polite"></div>
              <div id="chart" className="chart"></div>
              <p className="fine">Posted values, not a live market chart. Hover or focus a point for its receipt. Accounts are shown separately; money moved between them.</p>
            </section>

          </div>



        </div>

        <section className="panel broker-pnl" id="broker-pnl" aria-label="Broker-reported Robinhood P&L" hidden></section>
        <aside className="reported-loss" id="reported-loss" aria-label="Self-reported loss context" hidden></aside>

        <section className="grid2" id="extras">
            <div className="panel challenge-progress"><h2><span aria-hidden="true">◎</span> <span id="road-title">$1,000,000 challenge</span></h2>              <div className="road"><div className="road-heading"><span id="road-to">The road to $1,000,000</span><span aria-hidden="true">🏁</span></div>
                <div className="track" role="progressbar" id="bar" aria-valuemin={0} aria-valuemax={100} aria-label="Progress to $1M">
                  <div className="fill" id="fill"><span className="rider" aria-hidden="true">🚀</span></div>
                </div>
                <div className="ms" id="milestones"></div>
              </div>
</div>
            <div className="panel panel-depth degen" id="degen-panel">
              <div className="phead">
                <div><p className="lbl">🔥 Degen meter</p><p className="heat-value"><span id="degen-heat">0</span><small>HEAT</small></p></div>
                <span className="badge joke">Joke formula</span>
              </div>
              <div className="heat-status"><span id="degen-tier"></span><span id="degen-next"></span></div>
              <div className="degen-strip" id="degen-strip" role="progressbar" aria-label="Joke heat points toward next tier" aria-valuemin={0}></div>
              <details className="degen-breakdown"><summary>Joke heat, not investment advice · see formula</summary><p className="legacy-degen">Original gauge: <span id="degen">0</span>/100 · <span id="degenverdict"></span></p><div className="degen-gauge-wrap" id="degen-gauge"></div><div className="bars" id="degenbars"></div>
              <p className="fine" id="degenfine"></p><p className="degen-latest" id="degenlatest"></p></details>
            </div>

            <div className="panel panel-depth odds">
              <div className="phead">
                <div><p className="lbl">Magic 8-Ball</p><p className="eight" id="eight" aria-hidden="true"><span>8</span></p></div>
                <span className="badge joke">Joke · not a probability</span>
              </div>
              <p className="answer" id="answer" aria-live="polite">Will he hit $1M?</p>
              <button className="btn primary sm" id="shake" type="button">Shake it</button>
              <details className="realmath">
                <summary>The real math</summary>
                <p><b className="mono tabular" id="mult2">–</b> from his latest posted value, or about <b className="mono tabular" id="dbl">–</b> doublings.</p>
              </details>
            </div>
          </section>

        <div className="dashboard-panels">
          <section className="panel overview-portfolio" id="portfolio-preview" aria-label="Portfolio summary" hidden></section>
          <section className="panel overview-trades" aria-label="Recent trades"><div className="summary-head"><h2><span aria-hidden="true">⇄</span> Recent trades</h2><a href="#trades">View all</a></div><div id="recent-trades"></div></section>
          {/* Filled from the feed's `donations` array. Stays hidden when that key is missing. */}
          <section id="donations" className="panel panel-depth donations" aria-label="Donations" hidden>
            <div className="donations-head">
              <div><p className="eyebrow">From his posts</p><h2>Donations</h2></div>
              <p className="donations-sum" id="donations-sum"></p>
            </div>
            <div id="donations-list"></div>
          </section>

        </div>
        <section className="stats" id="stats" aria-label="Stats from known data"></section>
            {/* Filled from the feed's `robinhood_stats`. Stays hidden when that key is missing. */}
            <section id="robinhood-stats" className="panel panel-depth rh-stats" aria-label="Robinhood (options) account" hidden>
              <div className="sechead"><div><p className="eyebrow">Options account</p><h2>Robinhood (options) account</h2></div></div>
              <div className="rh-kpis" id="rh-kpis"></div>
              <p className="caveat" id="rh-note"></p>
            </section>

        {/* Optional: filled from the feed's `portfolio` object, stays hidden without one. */}
        <section id="portfolio" className="panel panel-depth portfolio" aria-label="Portfolio" hidden>
          <div id="pf"></div>
        </section>

        <div className="tape" aria-hidden="true"><div className="tape-inner" id="tape"></div></div>

        <section id="trades" className="trades">
          <div className="sechead"><div><p className="eyebrow">The tape</p><h2>Every trade he&apos;s posted</h2></div>
            <div className="seg" role="group" aria-label="Filter trades">
              <button type="button" data-f="all" className="on">All</button>
              <button type="button" data-f="win">W&apos;s</button>
              <button type="button" data-f="loss">L&apos;s</button>
              <button type="button" data-f="other">Other</button>
            </div></div>
          <div className="trade-columns" aria-hidden="true"><span>Position / outcome</span><span>Trade notes &amp; receipts</span><span>Reported P&amp;L</span></div>
          <div id="timeline" className="timeline" aria-live="polite"></div>
        </section>

        <section className="panel prior-card" id="prior-challenge" aria-label="Previous challenge" hidden></section>

          <section className="twist brand-card rise d1">
            <div className="topline"></div>
            <div className="twist-l">
              <p className="eyebrow">Plot twist · <span id="gcdate"></span></p>
              <p className="twist-h"><span id="twist-from">$6,000</span> <span className="arrow">→</span> <span className="acc" id="twist-to">$1,000,000</span></p>
            </div>
            <p className="twist-q">“<span id="twist-quote">Now in operation 6k to $1m</span>” <a id="gcsrc" href="https://x.com/ShaneStoffer/status/2125652479945883664" {...ext}>post ↗</a></p>
          </section>

        <section className="brand-hero hero solo">
          <p className="eyebrow">Stock market challenge · Fan tracker</p>
          <h2 className="hero-h" id="hero-q">Can Togi turn <span className="acc">$6K</span> into <span className="acc">$1M</span>?</h2>
          <p className="lede">Every trade he&apos;s posted on X, tracked to the dollar. The W&apos;s, the L&apos;s, and the occasional dream-based thesis.</p>
          <div className="btns">
            <a className="btn primary" href="#trades">See the trades</a>
            <a className="btn ghost" id="latestbtn" href={TOGI_PROFILE_URL} {...ext}>Latest post ↗</a>
          </div>
          <p className="meta" id="herometa"></p>
        </section>

        <section className="brand-hero cta">
          <div>
            <p className="eyebrow">ThinkOperator</p>
            <h2 className="cta-h">Think you&apos;d make better calls?</h2>
            <p className="lede">Take the free Operator Test: twenty real business scenarios, an Operator Score, and a breakdown across eight skills.</p>
            <div className="btns"><Link className="btn primary" href="/operator/">Take the free Operator Test</Link></div>
          </div>
          <div className="vs" aria-hidden="true"><span className="vs-a">🎰</span><span className="vs-x">vs</span><span className="vs-b">📈</span></div>
        </section>
      </div>

      <footer className="wrap foot">
          {/* Shown only when the feed has an https x.com / twitter.com tip_url. The note is plain text. */}
          {state?.tip && (
            <div className="tg-tip">
              <a className="tip-btn" href={state.tip.url} {...ext}>
                <span aria-hidden="true">💸</span> Tip Togi
              </a>
              {state.tip.note && <p className="tip-note">{state.tip.note}</p>}
            </div>
          )}


        <p><b>Unofficial fan tracker.</b> Not affiliated with, endorsed by, or run by Togi / Shane Stoffer. Every number comes from his public posts on X (<a href={TOGI_PROFILE_URL} {...ext}>@ShaneStoffer</a>), and every trade links its source. If he didn&apos;t post a number, it says &quot;not disclosed&quot;. Some figures may be partial or out of date.</p>
        <p><b>Not financial advice.</b> Please don&apos;t copy anyone&apos;s options trades because of a dream. 0DTE contracts can go to zero by lunch.</p>
        <div className="footrow">
          <Link className="powered" href="/"><Mark small />Powered by ThinkOperator</Link>
          <span className="fine" id="asof">
            {state
              ? `Data as of ${fmtDate(state.asOf)}${state.source === "snapshot" ? " · saved snapshot (live feed unavailable)" : " · live"}`
              : `Data as of ${fmtDate(SNAPSHOT.meta.last_updated)} · loading live feed…`}
          </span>
        </div>
      </footer>
      <div id="confetti" aria-hidden="true"></div>
    </div>
  );
}

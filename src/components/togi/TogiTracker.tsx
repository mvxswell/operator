"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import snapshotJson from "@/data/togiSnapshot.json";
import { isTogiData, loadTogiData, TOGI_PROFILE_URL, type TogiData, type TogiSource } from "@/lib/togi";
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
  const [state, setState] = useState<{ source: TogiSource; asOf: string } | null>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    loadTogiData(SNAPSHOT).then(({ data, source }) => {
      if (cancelled || !root.current) return;
      cleanup = renderTogi(root.current, data);
      setState({ source, asOf: data.meta.last_updated });
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
            <span className="chip">Unofficial</span>
            <Link className="navcta" href="/operator/">Take the test →</Link>
          </header>

          <div className="tg-lead">
            <section className="panel panel-depth meter" aria-label="Road to $10M">
              <div className="meter-top">
                <div>
                  <p className="lbl">Currently at · latest posted value</p>
                  <p className="score tabular" id="cur">$–</p>
                  <a className="src" id="cursrc" href={TOGI_PROFILE_URL} {...ext}></a>
                </div>
                <span className="badge" id="pctbadge">–</span>
              </div>
              <div className="road">
                <div className="track" role="progressbar" id="bar" aria-valuemin={0} aria-valuemax={100} aria-label="Progress to $10M">
                  <div className="fill" id="fill"><span className="rider" aria-hidden="true">🚀</span></div>
                </div>
                <div className="ms" id="milestones"></div>
              </div>
              <div className="meter-foot">
                <div><p className="lbl">To go</p><p className="mono tabular" id="togo">–</p></div>
                <div><p className="lbl">From his start</p><p className="mono tabular" id="fromstart">–</p></div>
                <div><p className="lbl">Needs</p><p className="mono tabular acc" id="mult">–</p></div>
              </div>
              <p className="caveat" id="caveat"></p>
            </section>

            <section className="panel panel-depth chartp">
              <div className="sechead"><div><p className="eyebrow">Receipts</p><h2>Account value over time</h2></div>
                <div className="legend"><span><i className="dot g"></i>Challenge (Fidelity shares)</span><span><i className="dot w"></i>Options (Robinhood)</span></div></div>
              <div id="chart" className="chart"></div>
              <p className="fine">Every dot is a screenshot or number he posted. Tap one to open the post. Money moved between accounts on Nov 2, so the two lines aren&apos;t one running total.</p>
            </section>
          </div>

          <section className="twist brand-card rise d1">
            <div className="topline"></div>
            <div className="twist-l">
              <p className="eyebrow">Plot twist · <span id="gcdate"></span></p>
              <p className="twist-h"><s>$3,000,000</s> <span className="arrow">→</span> <span className="acc">$10,000,000</span></p>
            </div>
            <p className="twist-q">“no longer 3ms goal. I&apos;m going for 10ms now.” <a id="gcsrc" href={TOGI_PROFILE_URL} {...ext}>post ↗</a></p>
          </section>

          <section className="stats" id="stats" aria-label="Stats from known data"></section>

          <section className="grid2">
            <div className="panel panel-depth degen">
              <div className="phead">
                <div><p className="lbl">Degen meter</p><p className="score tabular" id="degen">0</p><p className="sub">out of 100 · <span id="degenverdict"></span></p></div>
                <span className="badge joke">Joke formula</span>
              </div>
              <div className="bars" id="degenbars"></div>
              <p className="fine" id="degenfine"></p>
            </div>

            <div className="panel panel-depth odds">
              <div className="phead">
                <div><p className="lbl">Odds he hits $10M</p><p className="eight" id="eight">🎱</p></div>
                <span className="badge joke">Joke · not a probability</span>
              </div>
              <p className="answer" id="answer" aria-live="polite">Shake the Magic 8-Ball.</p>
              <button className="btn primary sm" id="shake" type="button">Shake it</button>
              <div className="realmath">
                <p className="lbl">The real math</p>
                <p><b className="mono tabular" id="mult2">–</b> from his latest posted value, or about <b className="mono tabular" id="dbl">–</b> doublings.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Optional: filled from the feed's `portfolio` object, stays hidden without one. */}
        <section id="portfolio" className="panel panel-depth portfolio" aria-label="Portfolio" hidden>
          <div id="pf"></div>
        </section>

        <div className="tape" aria-hidden="true"><div className="tape-inner" id="tape"></div></div>

        <section className="brand-hero hero solo">
          <p className="eyebrow">Stock market challenge · Fan tracker</p>
          <h2 className="hero-h">Can Togi turn <span className="acc">$950K</span> into <span className="acc">$10M</span>?</h2>
          <p className="lede">Every trade he&apos;s posted on X, tracked to the dollar. The W&apos;s, the L&apos;s, and the occasional dream-based thesis.</p>
          <div className="btns">
            <a className="btn primary" href="#trades">See the trades</a>
            <a className="btn ghost" id="latestbtn" href={TOGI_PROFILE_URL} {...ext}>Latest post ↗</a>
          </div>
          <p className="meta" id="herometa"></p>
        </section>

        <section id="trades" className="trades">
          <div className="sechead"><div><p className="eyebrow">The tape</p><h2>Every trade he&apos;s posted</h2></div>
            <div className="seg" role="group" aria-label="Filter trades">
              <button type="button" data-f="all" className="on">All</button>
              <button type="button" data-f="win">W&apos;s</button>
              <button type="button" data-f="loss">L&apos;s</button>
              <button type="button" data-f="other">Other</button>
            </div></div>
          <div id="timeline" className="timeline"></div>
        </section>

        <section className="grid2">
          <div className="panel panel-depth">
            <p className="eyebrow">Bag check</p>
            <h2>Open shares · <span id="snapdate"></span></h2>
            <div id="positions" className="positions"></div>
            <a className="src" id="possrc" href={TOGI_PROFILE_URL} {...ext}>source ↗</a>
          </div>
          <div className="panel panel-depth side">
            <p className="eyebrow">Side quests</p>
            <h2>Not counted in the challenge</h2>
            <ul id="side"></ul>
          </div>
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

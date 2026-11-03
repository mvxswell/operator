import Image from "next/image";
import Link from "next/link";
import "./home.css";
import { SiteFooter } from "@/components/SiteFooter";
import {
  BestOperator, BestQuick, DailyDetails, HomeVariantBoot, QuizLink, TickerDaily, TickerOnline, TopThree, TrackerLink,
} from "@/components/home/HomeClient";
import { CASES } from "@/content/cases/catalog";
import { getGuide } from "@/content/guides/collection";
import { BANK_STATS } from "@/data/counts";
import savingsJson from "@/data/grokBotSavings.json";
import togiJson from "@/data/togiSnapshot.json";
import { isSavingsData, niceDate, ratio, signedUsd, usd } from "@/lib/grokBotSavings";
import { HOME_VARIANT_SCRIPT } from "@/lib/homeVariant";

const GUIDE_PICKS = ["how-to-find-the-bottleneck", "how-to-delegate", "should-i-raise-prices", "how-to-improve-cash-flow"];

function compactUsd(n: number): string {
  if (n >= 1_000_000) return `$${Number((n / 1_000_000).toFixed(2))}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return usd(n);
}

function playbooks() {
  const guides = GUIDE_PICKS.map(getGuide).filter((g): g is NonNullable<typeof g> => g !== null)
    .map((g) => ({ kind: "Guide", href: `/guides/${g.slug}/`, title: g.title, meta: g.description }));
  const seen = new Set<string>();
  const cases = CASES.filter((c) => (seen.has(c.topic) ? false : (seen.add(c.topic), true))).slice(0, 4)
    .map((c) => ({ kind: "Case", href: `/cases/${c.slug}/`, title: c.title, meta: `${c.topic} · ${c.industry}` }));
  // Interleave so the row reads guide, case, guide, case.
  return guides.flatMap((g, i) => (cases[i] ? [g, cases[i]] : [g]));
}

export default function HomePage() {
  if (!isSavingsData(savingsJson)) throw new Error("grokBotSavings.json is invalid");
  const S = savingsJson.summary;
  const togi = togiJson.meta;
  const togiPct = Math.max(0, Math.min(100, (togi.latest_value / togi.goal) * 100));
  const items = playbooks();

  return (
    <div data-reading-page className="home-hub mx-auto max-w-6xl px-4 sm:px-6">
      {/* Picks variant A, B or C before the sections below are parsed, so the wrong order never paints. */}
      <script dangerouslySetInnerHTML={{ __html: HOME_VARIANT_SCRIPT }} />
      <HomeVariantBoot />

      {/* ---------------------------------- Hero ----------------------------------
          C shows the full intro. A (quizzes first) and B (trackers first) hide the
          .hh-full parts and keep one short headline line; see home.css. */}
      <section className="hh-hero" aria-labelledby="home-title">
        <div className="hh-hero-copy">
          <p className="hh-eyebrow hh-full">The operator&apos;s dashboard</p>
          <h1 id="home-title" className="hh-h1">
            <span className="hh-h1-watch">Watch real operators.</span><br className="hh-full" />{" "}
            <span className="hh-h1-test hh-gold">Test your own judgment.</span>
          </h1>
          <p className="hh-lede hh-full">
            Live trackers of real money and real results, next to business judgment tests: the Operator Test,
            Quick Decisions, eight skill tests and a Daily Decision. No account needed.
          </p>
          <div className="hh-cta hh-cta-c">
            <a href="#trackers" className="hh-btn hh-btn-primary">See the live trackers</a>
            <QuizLink quiz="operator" href="/operator/" className="hh-btn hh-btn-ghost">Take the Operator Test</QuizLink>
          </div>
          <div className="hh-cta hh-cta-a">
            <QuizLink quiz="operator" href="/operator/" className="hh-btn hh-btn-primary">Take the Operator Test</QuizLink>
            <QuizLink quiz="daily" href="/daily/" className="hh-btn hh-btn-ghost">Today&apos;s Daily Decision</QuizLink>
          </div>
          <p className="hh-fine hh-full">{BANK_STATS.standard} scenarios · 8 skills · 6 difficulty levels</p>
        </div>
        <div className="hh-art hh-full" aria-hidden="true">
          <div className="hh-art-tile">
            <Image src="/brand/mark.svg" alt="" width={96} height={96} unoptimized className="hh-art-mark" />
          </div>
          <span className="hh-art-line l1" /><span className="hh-art-line l2" /><span className="hh-art-line l3" />
        </div>

        {/* Live numbers. Each chip is a link; Grok Bot first, then Togi, then the Daily Decision. */}
        <ul className="hh-ticker" aria-label="Live numbers">
          <li className="hh-tick-li hh-tick-grok">
            <TrackerLink card="grok" href="/grok-bot-savings-tracker/" className="hh-tick hh-tick-link" ariaLabel={`Grok Bot Savings Tracker: ${ratio(S.ratio_full)}, ${signedUsd(S.return_full)} return`}>
              <span className="hh-tick-k">Grok Bot</span>
              <span className="hh-tick-v">{ratio(S.ratio_full)} · {signedUsd(S.return_full)} return</span>
              <span className="hh-chev" aria-hidden="true">›</span>
            </TrackerLink>
          </li>
          <li className="hh-tick-li hh-tick-togi">
            <TrackerLink card="togi" href="/togi/" className="hh-tick hh-tick-link" ariaLabel={`Togi Tracker: ${compactUsd(togi.latest_value)} of ${compactUsd(togi.goal)}`}>
              <span className="hh-tick-k">Togi</span>
              <span className="hh-tick-v">{compactUsd(togi.latest_value)} / {compactUsd(togi.goal)}</span>
              <span className="hh-chev" aria-hidden="true">›</span>
            </TrackerLink>
          </li>
          <li className="hh-tick-li hh-tick-daily">
            <TrackerLink card="daily" href="/daily/" className="hh-tick hh-tick-link">
              <span className="hh-tick-k">Daily Decision</span>
              <TickerDaily />
              <span className="hh-chev" aria-hidden="true">›</span>
            </TrackerLink>
          </li>
          <TickerOnline />
        </ul>
      </section>

      {/* ------------- Live trackers. Grok Bot comes before Togi in every variant. ------------- */}
      <section id="trackers" className="hh-sec hh-trackers" aria-labelledby="trackers-title">
        <div className="hh-row-head">
          <h2 id="trackers-title" className="hh-h2">Live Trackers</h2>
          <span className="hh-sub">Real operators, real numbers, sources shown</span>
        </div>
        <div className="hh-tgrid">
          <TrackerLink card="grok" href="/grok-bot-savings-tracker/" className="hh-card hh-tcard hh-grok" ariaLabel={`Grok Bot Savings Tracker: ${signedUsd(S.return_full)} total return`}>
            <div className="hh-tcard-top">
              <p className="hh-kicker">Grok Bot Savings Tracker</p>
              <span className="hh-chip hh-chip-green">Month {S.month} · day {S.day}</span>
            </div>
            <p className="hh-big hh-green tabular">{signedUsd(S.return_full)}<span className="hh-big-unit">total return</span></p>
            <p className="hh-card-body">$300 a month on Grok Bot, every real task priced at what a freelancer would charge.</p>
            <dl className="hh-stats">
              <div><dt>Savings</dt><dd className="tabular">{usd(S.total)}</dd></div>
              <div><dt>Revenue</dt><dd className="tabular">{usd(S.revenue)}</dd></div>
              <div><dt>Spend</dt><dd className="tabular">{usd(S.spend)}</dd></div>
            </dl>
            <p className="hh-card-foot">{ratio(S.ratio_full)} value per dollar · estimates · as of {niceDate(S.as_of)}<span className="hh-arrow">→</span></p>
          </TrackerLink>

          <TrackerLink card="togi" href="/togi/" className="hh-card hh-tcard hh-togi" ariaLabel={`Togi Tracker: ${compactUsd(togi.latest_value)} of ${compactUsd(togi.goal)}`}>
            <div className="hh-tcard-top">
              <p className="hh-kicker hh-gold">Togi Tracker</p>
              <span className="hh-chip hh-chip-live"><span className="hh-dot hh-dot-red" />Live</span>
            </div>
            <p className="hh-big tabular">{compactUsd(togi.latest_value)}<span className="hh-big-unit">of {compactUsd(togi.goal)}</span></p>
            <p className="hh-card-body">Shane Stoffer&apos;s public $10M stock market challenge, every trade with its source. Unofficial fan tracker.</p>
            <div className="hh-bar" role="img" aria-label={`${togiPct.toFixed(1)}% of the goal`}><i style={{ width: `${togiPct}%` }} /></div>
            <div className="hh-bar-legend tabular"><span>{compactUsd(togi.starting_value)} start</span><span>{togiPct.toFixed(1)}%</span><span>{compactUsd(togi.goal)}</span></div>
            <p className="hh-card-foot">Last reported {niceDate(togi.latest_value_date)} · not financial advice<span className="hh-arrow">→</span></p>
          </TrackerLink>

          <div className="hh-card hh-tcard hh-next">
            <Image src="/brand/mark.svg" alt="" width={28} height={28} unoptimized className="hh-next-mark" />
            <p className="hh-next-title">Next tracker coming soon</p>
            <p className="hh-card-body">Another operator, tracked in the open with sources.</p>
          </div>
        </div>
      </section>

      {/* ------------------------------ Test yourself ---------------------------- */}
      <section className="hh-sec hh-quiz" aria-labelledby="quiz-title">
        <div className="hh-row-head">
          <h2 id="quiz-title" className="hh-h2">Test Yourself</h2>
          <Link prefetch={false} href="/tests/" className="hh-more">All tests →</Link>
        </div>
        <div className="hh-qgrid">
          <QuizLink quiz="operator" href="/operator/" className="hh-card hh-qcard">
            <p className="hh-qtitle">Operator Test</p>
            <p className="hh-card-meta">About 20 questions · adaptive</p>
            <p className="hh-card-body">Difficulty adapts as you go. Finish with an Operator Score and a breakdown across all eight skills.</p>
            <BestOperator />
          </QuizLink>
          <QuizLink quiz="daily" href="/daily/" className="hh-card hh-qcard hh-daily">
            <p className="hh-qtitle">Daily Decision</p>
            <DailyDetails />
          </QuizLink>
          <QuizLink quiz="quick" href="/quick/" className="hh-card hh-qcard">
            <p className="hh-qtitle">Quick Test</p>
            <p className="hh-card-meta">60 seconds · two choices</p>
            <p className="hh-card-body">One right call, no time to overthink. Built to replay immediately.</p>
            <BestQuick />
          </QuizLink>
        </div>
        <TopThree />
      </section>

      {/* -------------------------------- Playbooks ------------------------------ */}
      <section className="hh-sec hh-play" aria-labelledby="play-title">
        <div className="hh-row-head">
          <h2 id="play-title" className="hh-h2">Playbooks</h2>
          <Link prefetch={false} href="/guides/" className="hh-more">All guides →</Link>
        </div>
        <ul className="hh-prow">
          {items.map((item) => (
            <li key={item.href}>
              <Link prefetch={false} href={item.href} className="hh-card hh-pcard">
                <span className={item.kind === "Guide" ? "hh-chip" : "hh-chip hh-chip-green"}>{item.kind}</span>
                <p className="hh-ptitle">{item.title}</p>
                <p className="hh-pmeta">{item.meta}</p>
              </Link>
            </li>
          ))}
          <li>
            <Link prefetch={false} href="/cases/" className="hh-card hh-pcard hh-pall">
              <p className="hh-ptitle">{CASES.length} business cases</p>
              <p className="hh-pmeta">Pick an action first, then read the worked reasoning.</p>
            </Link>
          </li>
        </ul>
      </section>

      <section className="hh-follow" aria-label="Follow the build">
        <a href="https://x.com/mvxswell" target="_blank" rel="noopener noreferrer" className="hh-follow-link">
          Follow the build <b>@mvxswell</b>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        </a>
      </section>

      <div className="hh-footer"><SiteFooter /></div>
    </div>
  );
}

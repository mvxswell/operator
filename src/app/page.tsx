import Image from "next/image";
import Link from "next/link";
import "./home.css";
import { WeeklySignup } from "@/components/home/WeeklySignup";
import { SiteFooter } from "@/components/SiteFooter";
import { CASES } from "@/content/cases/catalog";
import { GUIDES, getGuide } from "@/content/guides/collection";
import { BANK_STATS } from "@/data/counts";
import savingsJson from "@/data/grokBotSavings.json";
import togiJson from "@/data/togiSnapshot.json";
import { CATEGORIES } from "@/lib/categories";
import { isSavingsData, niceDate, ratio, signedUsd, usd } from "@/lib/grokBotSavings";

const START_HERE = [
  {
    slug: "how-to-find-the-bottleneck",
    blurb:
      "The bottleneck is where the queue keeps growing, not the busiest person. Measure what each step finishes, then improve that step first.",
  },
  {
    slug: "how-to-improve-cash-flow",
    blurb:
      "Profit is not cash. Collect what you are owed, take deposits on lumpy jobs, and build a 13-week view before you cut what creates the next sale.",
  },
  {
    slug: "how-to-run-a-weekly-operating-review",
    blurb:
      "Run the week around exceptions, decisions, and commitments. Name the owner of the next action, and revisit last week’s promises before adding new ones.",
  },
  {
    slug: "how-to-decide-which-product-to-shut-down",
    blurb:
      "Compare future contribution with the capacity it consumes. Ignore sunk spending, and choose explicitly among repair, maintenance, transfer, or shutdown.",
  },
] as const;

function compactUsd(n: number): string {
  if (n >= 1_000_000) return `$${Number((n / 1_000_000).toFixed(2))}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return usd(n);
}

export default function HomePage() {
  if (!isSavingsData(savingsJson)) throw new Error("grokBotSavings.json is invalid");
  const savings = savingsJson.summary;
  const togi = togiJson.meta;
  const togiPct = Math.max(0, Math.min(100, (togi.latest_value / togi.goal) * 100));
  const togiValue = compactUsd(togi.latest_value);
  const togiGoal = compactUsd(togi.goal);
  const togiStart = compactUsd(togi.starting_value);
  const togiPctLabel = `${togiPct.toFixed(1)}%`;
  const guides = START_HERE.map((item) => {
    const guide = getGuide(item.slug);
    if (!guide) throw new Error(`Missing start-here guide ${item.slug}`);
    return { ...item, title: guide.title };
  });

  return (
    <div className="home-hub mx-auto max-w-6xl px-4 sm:px-6">
      <section className="hh-hero" aria-labelledby="home-title">
        <div className="hh-hero-copy">
          <p className="hh-eyebrow">Think Operator</p>
          <h1 id="home-title">
            Make the calls an owner has to make.<br />
            <span className="hh-gold">Practice them here.</span>
          </h1>
          <p className="hh-lede">
            Think Operator is the playbook and practice ground for people who run businesses. Read a short guide, practice the same judgment, and watch live trackers of real work, with sources shown. No account needed.
          </p>
          <div className="hh-cta">
            <Link prefetch={false} href="/guides/" className="hh-btn hh-btn-primary">Browse the playbooks</Link>
            <Link prefetch={false} href="/operator/" className="hh-btn hh-btn-ghost">Take the Operator Test</Link>
          </div>
          <p className="hh-fine">{`${GUIDES.length} guides · ${CASES.length} cases · ${BANK_STATS.standard} scenarios · ${CATEGORIES.length} skills`}</p>
        </div>
        <div className="hh-art" aria-hidden="true">
          <div className="hh-art-tile">
            <Image src="/brand/mark.svg" alt="" width={96} height={96} unoptimized className="hh-art-mark" />
          </div>
          <span className="hh-art-line l1" /><span className="hh-art-line l2" /><span className="hh-art-line l3" />
        </div>

        <ul className="hh-ticker" aria-label="Live numbers">
          <li className="hh-tick-li hh-tick-togi">
            <a href="/togi/" className="hh-tick" aria-label={`Togi Tracker: ${togiValue} of ${togiGoal}`}>
              <span className="hh-tick-k">Togi</span>
              <span className="hh-tick-v">{togiValue} / {togiGoal}</span>
              <span className="hh-chev" aria-hidden="true">›</span>
            </a>
          </li>
          <li className="hh-tick-li">
            <Link prefetch={false} href="/grok-bot-savings-tracker/" className="hh-tick" aria-label={`Grok Bot Savings Tracker: ${ratio(savings.ratio_full)}, ${signedUsd(savings.return_full)} return`}>
              <span className="hh-tick-k">Grok Bot</span>
              <span className="hh-tick-v">{ratio(savings.ratio_full)} · {signedUsd(savings.return_full)} return</span>
              <span className="hh-chev" aria-hidden="true">›</span>
            </Link>
          </li>
          <li className="hh-tick-li">
            <Link prefetch={false} href="/daily/" className="hh-tick" aria-label="Daily Decision: New call every day">
              <span className="hh-tick-k">Daily Decision</span>
              <span className="hh-tick-v">New call every day</span>
              <span className="hh-chev" aria-hidden="true">›</span>
            </Link>
          </li>
        </ul>
      </section>

      <section className="hh-sec" aria-labelledby="what-title">
        <div className="hh-row-head">
          <div>
            <h2 id="what-title">What this is</h2>
            <p className="hh-sub">Three ways to get sharper at the work of running a business.</p>
          </div>
        </div>
        <div className="hh-pillars">
          <Link prefetch={false} href="/guides/" className="hh-card hh-pillar hh-pillar-play">
            <p className="hh-kicker">Playbooks</p>
            <p>{`${GUIDES.length} short guides on hiring, finance, operations, strategy, and people. Each one starts with the decision in front of you, then gives a framework and a worked scenario.`}</p>
            <span className="hh-more">All guides →</span>
          </Link>
          <Link prefetch={false} href="/tests/" className="hh-card hh-pillar hh-pillar-practice">
            <p className="hh-kicker">Practice</p>
            <p>{`${CASES.length} business cases, the Operator Test, eight skill tests, and a Daily Decision. Results stay in this browser.`}</p>
            <span className="hh-more">All tests →</span>
          </Link>
          <Link prefetch={false} href="/#trackers" className="hh-card hh-pillar hh-pillar-track">
            <p className="hh-kicker">Live trackers</p>
            <p>Real numbers from real work, with sources shown. Including an unofficial tracker of Togi’s public $10M challenge.</p>
            <span className="hh-more">See the trackers →</span>
          </Link>
        </div>
      </section>

      <section className="hh-sec" id="start" aria-labelledby="start-title">
        <div className="hh-row-head">
          <div>
            <h2 id="start-title">Start here</h2>
            <p className="hh-sub">If a decision is already on your desk, start with a guide. If you want to test your judgment, take a practice test.</p>
          </div>
          <Link prefetch={false} href="/guides/" className="hh-more">All guides →</Link>
        </div>
        <div className="hh-guides">
          {guides.map((guide) => (
            <Link prefetch={false} key={guide.slug} href={`/guides/${guide.slug}/`} className="hh-card hh-gcard">
              <span className="hh-chip">Guide</span>
              <p className="hh-gtitle">{guide.title}</p>
              <p className="hh-gmeta">{guide.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="hh-sec" aria-labelledby="practice-title">
        <div className="hh-row-head">
          <div>
            <h2 id="practice-title">Practice the judgment</h2>
            <p className="hh-sub">Choose first, then read the reasoning. No account needed.</p>
          </div>
          <Link prefetch={false} href="/tests/" className="hh-more">All tests →</Link>
        </div>
        <div className="hh-qgrid">
          <Link prefetch={false} href="/operator/" className="hh-card hh-qcard">
            <p className="hh-qtitle">Operator Test</p>
            <p className="hh-qmeta">About 20 questions, adaptive</p>
            <p className="hh-qbody">Finish with an Operator Score and a breakdown across all eight skills.</p>
          </Link>
          <Link prefetch={false} href="/daily/" className="hh-card hh-qcard hh-daily">
            <p className="hh-qtitle">Daily Decision</p>
            <p className="hh-qmeta">One shared scenario a day</p>
            <p className="hh-qbody">The same call for every operator.</p>
            <p className="hh-qfoot">Keep a streak that counts only the days you show up.</p>
          </Link>
          <Link prefetch={false} href="/quick/" className="hh-card hh-qcard">
            <p className="hh-qtitle">Quick Test</p>
            <p className="hh-qmeta">60 seconds, two choices</p>
            <p className="hh-qbody">One right call, no time to overthink.</p>
            <p className="hh-qfoot">Score is correct decisions per minute.</p>
          </Link>
        </div>
        <div className="hh-xgrid">
          <Link prefetch={false} href="/cases/" className="hh-card hh-xcard">
            <div>
              <h3>{`${CASES.length} business cases`}</h3>
              <p>Pick an action first, then read the worked reasoning.</p>
            </div>
            <span className="hh-arrow" aria-hidden="true">→</span>
          </Link>
          <Link prefetch={false} href="/skills/" className="hh-card hh-xcard">
            <div>
              <h3>Eight skill tests</h3>
              <p>Bottleneck detection, prioritization, resource allocation, financial judgment, sales and marketing, operations, people and delegation, strategy.</p>
            </div>
            <span className="hh-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="hh-sec" id="trackers" aria-labelledby="trackers-title">
        <div className="hh-row-head">
          <div>
            <h2 id="trackers-title">Live trackers</h2>
            <p className="hh-sub">Real operators, real numbers, sources shown.</p>
          </div>
        </div>
        <div className="hh-tgrid">
          <a href="/togi/" className="hh-card hh-tcard hh-togi" aria-label={`Togi Tracker: ${togiValue} of ${togiGoal}`}>
            <div className="hh-tcard-top">
              <p className="hh-kicker hh-kicker-gold">Togi Tracker</p>
              <span className="hh-chip hh-chip-live"><span className="hh-dot" aria-hidden="true" />Live</span>
            </div>
            <p className="hh-big tabular">{togiValue}<span className="hh-big-unit">of {togiGoal}</span></p>
            <p className="hh-card-body">Shane Stoffer’s public $10M stock market challenge, every trade with its source. Unofficial fan tracker.</p>
            <div className="hh-bar" role="img" aria-label={`${togiPctLabel} of the goal`}><i style={{ width: `${togiPct}%` }} /></div>
            <div className="hh-bar-legend tabular"><span>{togiStart} start</span><span>{togiPctLabel}</span><span>{togiGoal}</span></div>
            <p className="hh-card-foot">Last reported {niceDate(togi.latest_value_date)} · not financial advice<span className="hh-arrow">→</span></p>
          </a>
          <Link prefetch={false} href="/grok-bot-savings-tracker/" className="hh-card hh-tcard hh-grok" aria-label={`Grok Bot Savings Tracker: ${signedUsd(savings.return_full)} total return`}>
            <div className="hh-tcard-top">
              <p className="hh-kicker hh-kicker-green">Grok Bot Savings Tracker</p>
              <span className="hh-chip hh-chip-green">Month {savings.month} · day {savings.day}</span>
            </div>
            <p className="hh-big hh-green tabular">{signedUsd(savings.return_full)}<span className="hh-big-unit">total return</span></p>
            <p className="hh-card-body">$300 a month on Grok Bot, every real task priced at what a freelancer would charge.</p>
            <dl className="hh-stats">
              <div><dt>Savings</dt><dd className="tabular">{usd(savings.total)}</dd></div>
              <div><dt>Revenue</dt><dd className="tabular">{usd(savings.revenue)}</dd></div>
              <div><dt>Spend</dt><dd className="tabular">{usd(savings.spend)}</dd></div>
            </dl>
            <p className="hh-card-foot">{ratio(savings.ratio_full)} value per dollar · estimates · as of {niceDate(savings.as_of)}<span className="hh-arrow">→</span></p>
          </Link>
        </div>
      </section>

      <section className="hh-sec" id="weekly" aria-labelledby="weekly-title">
        <div className="hh-signup">
          <div>
            <p className="hh-eyebrow">Think Operator Weekly</p>
            <h2 id="weekly-title">One decision, one live number, one playbook.</h2>
            <p className="hh-lede">A short weekly brief, signed by Maxwell. Skip a week rather than send a thin issue.</p>
          </div>
          <div className="hh-signup-form">
            <WeeklySignup />
            <noscript>
              <p className="hh-form-note">The weekly brief signup needs JavaScript. This browser is not shown a form.</p>
            </noscript>
            <p className="hh-form-note">We’ll only email the brief. You can unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      <section className="hh-sec" aria-labelledby="founder-title">
        <div className="hh-founder">
          <div className="hh-mono" aria-hidden="true">M</div>
          <div>
            <h2 id="founder-title">Built by Maxwell</h2>
            <p>Maxwell grew a home-services company to $5M+ in revenue. He is a sales leader and AI builder in Greater Philadelphia, and he builds in public. Think Operator is the business brand. The other companies he is building show up here as case studies, not as a product grid.</p>
            <div className="hh-founder-links">
              <Link prefetch={false} href="/about/">About Maxwell →</Link>
              <a href="https://x.com/mvxswell" target="_blank" rel="noopener noreferrer">Follow the build @mvxswell</a>
            </div>
          </div>
        </div>
      </section>

      <section className="hh-sec" aria-labelledby="work-title">
        <div className="hh-row-head">
          <div>
            <h2 id="work-title">Work in public</h2>
            <p className="hh-sub">BimmerQuote and TonnageCheck are companies Maxwell is building. They stay on their own sites. They appear here as case studies of real operating work, not as the product.</p>
          </div>
        </div>
        <div className="hh-cgrid">
          <div className="hh-card hh-ccard">
            <span className="hh-chip hh-chip-placeholder">Case study not published yet</span>
            <h3>BimmerQuote</h3>
            <p>A live site of BMW repair prices, based on real shop quotes, published as price only.</p>
            <p className="hh-status">First-party case study not written yet.</p>
          </div>
          <div className="hh-card hh-ccard">
            <span className="hh-chip hh-chip-placeholder">Case study not published yet</span>
            <h3>TonnageCheck</h3>
            <p>A heat-pump and HVAC sizing site for homeowners, built in public.</p>
            <p className="hh-status">First-party case study not written yet.</p>
          </div>
        </div>
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

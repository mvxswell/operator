import Link from "next/link";
import savingsJson from "@/data/grokBotSavings.json";
import {
  hoursLabel, isSavingsData, monthStatus, niceDate, ratio, safeHref, signedUsd, usd,
  type SavingsAgg, type SavingsData,
} from "@/lib/grokBotSavings";

if (!isSavingsData(savingsJson)) throw new Error("grokBotSavings.json does not match the expected shape; re-run npm run savings:sync");
const DATA: SavingsData = savingsJson;

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Bars({ items }: { items: SavingsAgg[] }) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <ul className="bars">
      {items.map((i) => (
        <li key={i.label} className="barrow">
          <span className="bl">{i.label}</span>
          <span className="bt" aria-hidden="true"><i style={{ width: `${(i.value / max) * 100}%` }} /></span>
          <span className="n mono">{usd(i.value)}</span>
          <span className="h mono">{hoursLabel(i.hours)}</span>
        </li>
      ))}
    </ul>
  );
}

/** Server-rendered from the committed JSON: no client JS, no network calls. */
export function GrokBotSavings({ data = DATA }: { data?: SavingsData }) {
  const S = data.summary;
  const status = monthStatus(S);
  const hasValue = S.total > 0;
  const tasks = data.tasks;
  const plans = S.plans.length ? S.plans.map((p) => usd(p)).join(" + ") + " plans" : "Monthly plans";
  const sourceByKey = Object.fromEntries(data.sources.map((s) => [s.key, s]));

  return (
    <div className="gb-savings" data-rows={tasks.length}>
      <div className="wrap">
        <header className="gb-head">
          <p className="eyebrow">Grok Bot Savings Tracker</p>
          <h1 className="gb-title">I spend <span className="acc">{usd(S.spend)}/mo</span> on Grok Bot.</h1>
          <p className="gb-sub">I&apos;m tracking how much money it saves me every month: every real task my bots finish, priced at what a freelancer would charge.</p>
          <div className="chips">
            <span className="chip est">Estimates</span>
            <span className={status.inProgress ? "chip live" : "chip"}>{status.label}</span>
          </div>
        </header>

        <section className="panel panel-depth month" aria-label={`Month ${S.month} progress`}>
          <div className="row">
            <p className="lbl">Month {S.month} · {niceDate(S.start)} to {niceDate(S.end, true)}</p>
            <p className="lbl mono">Day {S.day} of {S.days}</p>
          </div>
          <div className="track" role="progressbar" aria-valuemin={0} aria-valuemax={S.days} aria-valuenow={S.day} aria-label={`Day ${S.day} of ${S.days}`}>
            <div className="fill" style={{ width: `${status.pct}%` }} />
          </div>
          <p className="fine">
            {status.inProgress
              ? `Month ${S.month} is in progress. The real scorecard is the full month against the full ${usd(S.spend)}, posted after ${niceDate(S.end)}.`
              : `Month ${S.month} is complete. This is the full month against the full ${usd(S.spend)}.`}
            {" "}Data as of {niceDate(S.as_of, true)}.
          </p>
        </section>

        <section className="kpis" aria-label="Headline numbers">
          <div className="kpi panel panel-depth">
            <p className="lbl">Spend</p>
            <p className="v mono">{usd(S.spend)}</p>
            <p className="s">{plans} · {usd(S.prorated, true)} prorated to day {S.day}</p>
          </div>
          <div className="kpi panel panel-depth">
            <p className="lbl">Savings <span className="tag est">est.</span></p>
            <p className="v mono acc">{usd(S.total)}</p>
            <p className="s">{hoursLabel(S.hours)} of freelancer time · {S.credited} credited {S.credited === 1 ? "task" : "tasks"}</p>
          </div>
          <div className="kpi panel panel-depth">
            <p className="lbl">Revenue earned</p>
            <p className={S.revenue > 0 ? "v mono pos" : "v mono"}>{usd(S.revenue)}</p>
            <p className="s">{S.revenue_count ? `${S.revenue_count} received ${S.revenue_count === 1 ? "payment" : "payments"}, with evidence` : "Received money only. Nothing yet."}</p>
          </div>
          <div className="kpi panel panel-depth hero-kpi">
            <div className="topline" />
            <p className="lbl">Total return</p>
            <p className={S.return_full >= 0 ? "v mono pos" : "v mono neg"}>{signedUsd(S.return_full)}</p>
            <p className="s">savings + revenue − {usd(S.spend)}</p>
          </div>
        </section>
        <p className="net fine">
          {hasValue ? <>Savings are {ratio(S.ratio_full)} the full {usd(S.spend)} month ({ratio(S.ratio_pro)} vs prorated spend). </> : null}
          Against spend prorated to day {S.day}, the total return is <b className={S.return_pro >= 0 ? "pos" : "neg"}>{signedUsd(S.return_pro)}</b>.
        </p>

        {hasValue ? (
          <section className="grid2">
            <div className="panel panel-depth" id="role">
              <div className="sechead"><div><p className="eyebrow">By role</p><h2>Who I didn&apos;t have to hire</h2></div></div>
              <Bars items={S.by_role} />
              <p className="fine">What each role would cost for the same hours, at the rates below.</p>
            </div>
            <div className="panel panel-depth" id="business">
              <div className="sechead"><div><p className="eyebrow">By business</p><h2>Where the work went</h2></div></div>
              <Bars items={S.by_biz} />
            </div>
          </section>
        ) : null}

        <section className="panel panel-depth" id="log">
          <div className="sechead">
            <div><p className="eyebrow">Task log</p><h2>Every task, priced</h2></div>
            <span className="badge">{tasks.length} {tasks.length === 1 ? "entry" : "entries"}</span>
          </div>
          {tasks.length ? (
            <ol className="tasks">
              {tasks.map((t, i) => {
                const href = t.evidence.href ? safeHref(t.evidence.href) : "";
                return (
                  <li key={i} className={t.value > 0 ? "task" : "task zero"}>
                    <div className="row">
                      <p className="tt">{t.task}</p>
                      <p className={t.value > 0 ? "tv mono" : "tv mono neg"}>{usd(t.value)}</p>
                    </div>
                    <div className="tags">
                      <span className="tag">{niceDate(t.date)}</span>
                      <span className="tag">{t.business}</span>
                      <span className="tag">{t.bot}</span>
                      {t.value > 0 ? <span className="tag">{t.role} · {hoursLabel(t.hours)} × {usd(t.rate)}/h</span> : <span className="tag vl">No credit</span>}
                      {href ? <a className="tag ev" href={href} {...ext}>{t.evidence.label} ↗</a> : <span className="tag ev">{t.evidence.label}</span>}
                      {t.issues ? <span className="tag vu">{t.issues}</span> : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="empty">
              <p className="tt">No tasks logged yet.</p>
              <p className="fine">Month {S.month} started {niceDate(S.start)}. Tasks show up here once each one has a PR, a file or a log entry behind it.</p>
            </div>
          )}
          {tasks.length > 0 && tasks.length < 5 && status.inProgress ? (
            <p className="fine">Just getting started: the log fills in through {niceDate(S.end)} and updates weekly.</p>
          ) : null}
        </section>

        {data.revenue.length ? (
          <section className="panel panel-depth" id="revenue">
            <div className="sechead">
              <div><p className="eyebrow">Revenue ledger</p><h2>Money actually received</h2></div>
              <span className="badge">{usd(S.revenue)} · {S.revenue_count} {S.revenue_count === 1 ? "entry" : "entries"}</span>
            </div>
            <div className="ledger" role="table" aria-label="Revenue received">
              <div className="lrow lh" role="row"><span role="columnheader">Date</span><span role="columnheader">Business · source</span><span role="columnheader">Evidence</span><span role="columnheader">Amount</span></div>
              {data.revenue.map((r, i) => {
                const href = r.evidence.href ? safeHref(r.evidence.href) : "";
                return (
                  <div className="lrow" role="row" key={i}>
                    <span role="cell" className="muted">{niceDate(r.date)}</span>
                    <span role="cell"><b>{r.business}</b> · {r.source}{r.notes ? <span className="ln">{r.notes}</span> : null}</span>
                    <span role="cell">{href ? <a className="tag ev" href={href} {...ext}>{r.evidence.label} ↗</a> : <span className="tag ev">{r.evidence.label}</span>}</span>
                    <span role="cell" className="mono pos">{usd(r.amount)}</span>
                  </div>
                );
              })}
            </div>
            {S.revenue_by_biz.length > 1 ? (
              <div className="tags">{S.revenue_by_biz.map((b) => <span key={b.label} className="tag">{b.label} · {usd(b.value)}</span>)}</div>
            ) : null}
          </section>
        ) : null}

        {data.misses.length ? (
          <section className="panel panel-depth" id="misses">
            <div className="sechead"><div><p className="eyebrow">Misses and redos</p><h2>What went wrong</h2></div></div>
            <ul className="misses">
              {data.misses.map((m, i) => (
                <li key={i}>
                  <div className="row"><p className="tt">{m.title}</p><span className={m.tone === "danger" ? "tag vl" : "tag vu"}>{m.label}</span></div>
                  <p className="md">{m.detail}</p>
                </li>
              ))}
            </ul>
            <p className="fine">Redone work is credited once. Unused work is logged at $0.</p>
          </section>
        ) : null}

        <section className="panel panel-depth" id="method">
          <div className="sechead"><div><p className="eyebrow">Methodology</p><h2>How the numbers work</h2></div><span className="chip est">Estimates</span></div>
          <div className="method">
            <p>Value is hours times rate. Hours are a conservative guess at what a competent freelancer would bill, not how long the bot took. A task is logged only if a merged PR, a file or a bot log entry backs it. Code written by Cursor cloud agents, or built and deployed by the bots themselves, gets full developer credit. Code written by Claude Code or Codex gets only spec-and-review time at the project manager rate. Unused drafts and abandoned work are logged at $0 until they&apos;re used.</p>
            <p>Revenue counts only money actually received, with evidence (a payment, payout or royalty record). Pending, invoiced, pledged or projected money never counts. Savings and revenue are kept as separate figures, and total return is savings plus revenue minus the {usd(S.spend)} spend.</p>
            <p>Month {S.month} runs {niceDate(S.start)} to {niceDate(S.end, true)} ({S.days} days). Spend is {usd(S.spend)} for the month: {plans.toLowerCase()}. Nothing before {niceDate(S.start)} counts. Rows marked &ldquo;inferred&rdquo; credit the bot that most likely did the work. The plan&apos;s usage is shared with other apps, so some of the {usd(S.spend)} may pay for things this tracker doesn&apos;t cover. Updated weekly.</p>
          </div>
          <div className="rates">
            <div className="rrow rh"><span>Role</span><span>Rate used</span><span>Basis</span></div>
            {data.rates.map((r) => {
              const src = sourceByKey[r.source];
              const href = src ? safeHref(src.href) : "";
              return (
                <div className="rrow" key={r.role}>
                  <span>{r.role}</span>
                  <span className="mono">{usd(r.rate)}/h</span>
                  <span className="muted">{href ? <a href={href} {...ext}>{r.basis} ↗</a> : r.basis}</span>
                </div>
              );
            })}
          </div>
          <p className="fine">Mid-range US freelance or median rates, loaded {niceDate(S.start, true)}. Sources: {data.sources.map((s, i) => (
            <span key={s.key}>{i ? " · " : ""}<a href={safeHref(s.href)} {...ext}>{s.site}: {s.title}</a></span>
          ))}.</p>
        </section>

        <footer className="foot">
          <p><b>Estimates, not invoices.</b> These figures estimate what the same work would have cost from a freelancer. They aren&apos;t money saved in a bank account, and real quotes vary.</p>
          <p className="fine"><Link href="/">ThinkOperator</Link> · Data as of {niceDate(S.as_of, true)}</p>
        </footer>
      </div>
    </div>
  );
}

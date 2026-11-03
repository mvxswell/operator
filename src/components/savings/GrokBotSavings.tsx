import Link from "next/link";
import savingsJson from "@/data/grokBotSavings.json";
import {
  hoursLabel, isSavingsData, monthStatus, niceDate, ratio, safeHref, usd,
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
            <p className="lbl">Spend this month</p>
            <p className="v mono">{usd(S.spend)}</p>
            <p className="s">{plans} · {usd(S.prorated, true)} prorated to day {S.day}</p>
          </div>
          <div className="kpi panel panel-depth hero-kpi">
            <div className="topline" />
            <p className="lbl">Estimated value replaced <span className="tag est">est.</span></p>
            <p className="v mono acc">{usd(S.total)}</p>
            <p className="s">{hoursLabel(S.hours)} of freelancer time · {S.credited} credited {S.credited === 1 ? "task" : "tasks"}</p>
          </div>
          <div className="kpi panel panel-depth">
            <p className="lbl">Ratio</p>
            <p className="v mono">{ratio(S.ratio_full)}</p>
            <p className="s">{hasValue ? `Value so far vs the full ${usd(S.spend)} month (${ratio(S.ratio_pro)} vs prorated spend)` : "Shows once the first task is logged"}</p>
          </div>
        </section>
        {hasValue ? (
          <p className="net fine">
            Net so far: <b className={S.net_full >= 0 ? "pos" : "neg"}>{usd(S.net_full, true)}</b> against the full month, <b className={S.net_pro >= 0 ? "pos" : "neg"}>{usd(S.net_pro, true)}</b> against spend prorated to day {S.day}.
          </p>
        ) : null}

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

"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Button, ButtonLink, CategoryIcon, Eyebrow, Panel } from "@/components/ui";
import { CATEGORIES } from "@/lib/categories";
import { importProfileBackup, MAX_BACKUP_BYTES, MAX_RUNS_KEPT, resetProfile, todayKey } from "@/lib/storage";
import { useProfile } from "@/lib/useProfile";

export default function ProgressPage() {
  const { profile, hydrated } = useProfile();
  const [notice, setNotice] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const [backup, setBackup] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = [
    ...profile.operator.runs.map((run) => ({ ...run, mode: "Operator Test", result: `${run.score} / 1000`, href: "/operator" })),
    ...profile.quick.runs.map((run) => ({ ...run, mode: "Quick Decisions", result: `${run.dpm} DPM`, href: "/quick" })),
    ...CATEGORIES.flatMap((category) => profile.skills[category.id].runs.map((run) => ({ ...run, mode: category.name, result: `${run.score} / 1000`, href: `/skills/${category.id}` }))),
    ...Object.values(profile.daily).map((run) => ({ ...run, id: `daily-${run.date}`, mode: "Daily Decision", result: run.correct ? "Best call" : "Reviewed", accuracy: run.correct ? 1 : 0, href: "/daily" })),
  ].sort((a, b) => Date.parse(b.at) - Date.parse(a.at));
  const dates = new Set(history.map((run) => todayKey(new Date(run.at))));
  const cursor = new Date();
  let streak = 0;
  if (!dates.has(todayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (dates.has(todayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  const recent = [...profile.operator.runs].slice(0, 12).reverse();
  const latest = profile.operator.runs[0];
  const previous = profile.operator.runs[1];
  const change = latest && previous ? latest.score - previous.score : null;
  const activity = Array.from({ length: 28 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (27 - index));
    const key = todayKey(date);
    return { key, active: dates.has(key) };
  });
  const activeWeek = activity.slice(-7).filter((day) => day.active).length;
  const trainedSkills = CATEGORIES.filter((category) => profile.skills[category.id].runs.length).length;

  function exportBackup() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(profile, null, 2)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `think-operator-progress-${todayKey()}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Backup downloaded. Keep it somewhere you can find again.");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div><Eyebrow>Your training record</Eyebrow><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">My progress</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">See what is improving and choose what to train next. Your progress is saved on this browser; it does not sync between devices.</p></div>
        <ButtonLink href="/operator">Take the test</ButtonLink>
      </div>
      {!hydrated ? <p className="mt-8 text-muted">Loading your progress…</p> : <>
        <section className="progress-hero mt-8 flex flex-col gap-7 rounded-2xl border border-accent/20 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8" aria-label="Training momentum">
          <div className="max-w-md"><span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Your momentum</span><h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{activeWeek >= 3 ? "You’re building a rhythm." : activeWeek ? "Keep the momentum going." : "Small reps. Sharper decisions."}</h2><p className="mt-3 text-sm leading-relaxed text-muted">{activeWeek ? `${activeWeek} active ${activeWeek === 1 ? "day" : "days"} in the last seven. Every completed round is another chance to sharpen your judgment.` : "You don’t need an hour. Start with one 60-second round and build from there."}</p><Link href="/quick" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-ink">Get a quick rep in <span aria-hidden="true">↗</span></Link></div>
          <div className="shrink-0 rounded-xl border border-white/10 bg-bg/30 p-5 sm:w-56"><div className="flex items-baseline gap-2"><span className="tabular text-4xl font-semibold text-accent">{activeWeek}</span><span className="text-sm text-muted">/ 7 active days</span></div><div className="mt-4 flex gap-2" role="img" aria-label={`Last seven days, oldest first: ${activity.slice(-7).map((day) => `${day.key} ${day.active ? "active" : "inactive"}`).join(", ")}`}>{activity.slice(-7).map((day) => <span key={day.key} title={day.key} className={`h-7 flex-1 rounded ${day.active ? "bg-accent shadow-[0_0_12px_#f2b44133]" : "border border-white/10 bg-white/5"}`} />)}</div><p className="mt-3 text-[11px] text-muted">Last 7 days · any mode counts</p></div>
        </section>
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Best Operator Score" value={profile.operator.best || "—"} detail="Out of 1,000" />
          <Stat label="Best Quick Decisions" value={profile.quick.bestDpm || "—"} detail="Decisions per minute" />
          <Stat label="Training streak" value={streak} detail="Consecutive active days" />
          <Stat label="Saved sessions" value={history.length} detail="Across all four modes" />
        </div>
        {!history.length ? <Panel className="mt-6 p-8 text-center"><h2 className="text-xl font-semibold">Your first result starts the story</h2><p className="mx-auto mt-2 max-w-md text-sm text-muted">Finish an Operator Test, skill test, quick round, or daily decision to build your training record.</p><div className="mt-5"><ButtonLink href="/daily" variant="secondary">Try today’s decision</ButtonLink></div></Panel> : null}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Panel className="p-5"><h2 className="font-semibold">Operator Score trend</h2><p className="mt-1 text-xs text-muted">Last {recent.length} saved tests · {change === null ? "Complete two tests to compare" : `${change >= 0 ? "+" : ""}${change} points since your previous test`}</p>
            {recent.length ? <div className="mt-6 flex h-36 items-end gap-2" role="img" aria-label={`Scores from oldest to newest: ${recent.map((run) => run.score).join(", ")}`}>
              {recent.map((run) => <div key={run.id} className="flex h-full min-w-0 flex-1 flex-col justify-end gap-2 text-center"><span className="text-[10px] text-muted">{run.score}</span><div className="min-h-1 rounded-t bg-accent/80" style={{ height: `${Math.max(1, run.score / 10)}%` }} title={`${new Date(run.at).toLocaleDateString()}: ${run.score}`} /></div>)}
            </div> : <p className="py-12 text-sm text-faint">Your completed Operator Tests will appear here.</p>}
          </Panel>
          <Panel className="p-5"><h2 className="font-semibold">Keep showing up</h2><p className="mt-1 text-xs text-muted">Training activity over the last 28 days</p><div className="mt-8 grid grid-cols-7 gap-2">
            {activity.map((day) => <div key={day.key} title={`${day.key}: ${day.active ? "Trained" : "No saved session"}`} aria-label={`${day.key}: ${day.active ? "Trained" : "No saved session"}`} className={`h-6 rounded ${day.active ? "bg-accent" : "bg-surface-2 border border-line"}`} />)}
          </div><p className="mt-4 text-xs text-muted">{activity.filter((day) => day.active).length} active days · any completed mode counts</p></Panel>
        </div>
        <details className="skill-disclosure panel-depth mt-9 rounded-xl border border-line bg-surface"><summary className="flex cursor-pointer items-center justify-between gap-4 rounded-xl p-5 hover:bg-white/[0.02]"><div><h2 className="text-lg font-semibold">Your skills</h2><p className="mt-1 text-sm text-muted">{trainedSkills} of {CATEGORIES.length} skills trained · expand your breakdown</p></div><span aria-hidden="true" className="disclosure-arrow flex h-8 w-8 items-center justify-center rounded-full border border-line text-accent transition-transform">⌄</span></summary><div className="border-t border-line p-5"><p className="mb-4 text-xs text-muted">Best focused-test scores, out of 1,000. Select a skill to train.</p><div className="grid gap-3 sm:grid-cols-2">
{CATEGORIES.map((category) => { const skill = profile.skills[category.id]; return <Link key={category.id} href={`/skills/${category.id}`} className="rounded-xl border border-line bg-bg/40 p-4 transition-colors hover:border-accent/50"><div className="flex items-center gap-3"><CategoryIcon category={category.id} /><span className="flex-1 text-sm font-medium">{category.name}</span><span className="tabular text-sm" style={{ color: category.accent }}>{skill.runs.length ? skill.best : "—"}</span></div><div className="mt-4 h-1.5 rounded-full bg-line"><div className="h-full rounded-full" style={{ width: `${skill.best / 10}%`, backgroundColor: category.accent }} /></div><p className="mt-3 text-xs text-muted">{skill.runs.length ? `${skill.runs.length} saved tests · train again →` : "Start your first test →"}</p></Link>; })}
        </div></div></details>
        <section className="mt-9"><h2 className="text-lg font-semibold">Recent sessions</h2><Panel className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b border-line text-xs text-muted"><tr><th className="p-4">Session</th><th className="p-4">Result</th><th className="p-4">Accuracy</th><th className="p-4">Date</th></tr></thead><tbody>{history.slice(0, 30).map((run) => <tr key={`${run.mode}-${run.id}`} className="border-b border-line-soft last:border-0"><td className="p-4"><Link className="hover:text-accent" href={run.href}>{run.mode}</Link></td><td className="whitespace-nowrap p-4 tabular">{run.result}</td><td className="p-4 tabular">{Math.round(run.accuracy * 100)}%</td><td className="whitespace-nowrap p-4 text-muted">{new Date(run.at).toLocaleDateString()}</td></tr>)}</tbody></table>{!history.length ? <p className="p-5 text-sm text-muted">No saved sessions yet.</p> : null}</Panel></section>
        <Panel className="mt-9 p-5"><h2 className="font-semibold">Your data, your control</h2><p className="mt-2 text-sm leading-relaxed text-muted">We keep up to {MAX_RUNS_KEPT} recent runs per test type and skill, plus up to ten years of daily decisions. Personal bests are kept separately. Clearing browser data removes progress. Export a backup before switching browsers or devices.</p>
          <div className="mt-4 flex flex-wrap gap-3"><Button variant="secondary" onClick={exportBackup}>Export backup</Button><Button variant="secondary" onClick={() => inputRef.current?.click()}>Restore backup</Button><Button variant="ghost" onClick={() => setConfirmReset(true)}>Reset progress</Button></div>
          <input ref={inputRef} type="file" accept="application/json,.json" className="hidden" aria-label="Choose a progress backup" onChange={async (event) => { const file = event.target.files?.[0]; event.target.value = ""; if (!file) return; try { if (file.size > MAX_BACKUP_BYTES) throw new Error("Backup is too large (maximum 2 MB)."); const contents = await file.text(); const parsed = JSON.parse(contents); if (parsed?.version !== 1) throw new Error("Unsupported backup version."); setBackup(contents); setNotice(""); } catch (error) { setNotice(error instanceof Error ? error.message : "Could not read this backup."); } }} />
          {backup !== null ? <div className="mt-4 rounded-lg border border-accent/40 p-4"><p className="text-sm">Restoring replaces the progress in this browser. Export your current progress first if you want to keep it.</p><div className="mt-3 flex gap-3"><Button onClick={() => { try { importProfileBackup(backup); setNotice("Backup restored."); } catch (error) { setNotice(error instanceof Error ? error.message : "Could not restore backup."); } setBackup(null); }}>Replace with backup</Button><Button variant="ghost" onClick={() => setBackup(null)}>Cancel</Button></div></div> : null}
          {confirmReset ? <div className="mt-4 rounded-lg border border-neg/40 p-4"><p className="text-sm">Delete all saved progress from this browser? This cannot be undone without an exported backup.</p><div className="mt-3 flex gap-3"><Button variant="secondary" onClick={() => { resetProfile(); setConfirmReset(false); setNotice("Progress reset for this browser."); }}>Delete my progress</Button><Button variant="ghost" onClick={() => setConfirmReset(false)}>Cancel</Button></div></div> : null}
          <p role="status" className="mt-3 text-sm text-accent">{notice}</p><Link href="/privacy" className="text-xs text-muted underline">How we handle your data</Link>
        </Panel>
      </>}
    </div>
  );
}

function Stat({ label, value, detail }: { label: string; value: string | number; detail: string }) {
  return <Panel className="relative overflow-hidden p-5"><div aria-hidden="true" className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-accent/60 to-transparent" /><p className="text-xs text-muted">{label}</p><p className="tabular mt-3 text-3xl font-semibold tracking-tight text-accent sm:text-4xl">{value}</p><p className="mt-2 text-[11px] text-muted">{detail}</p></Panel>;
}

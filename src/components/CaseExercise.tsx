"use client";

import { useRef, useState } from "react";
import { DataTable, Button } from "./ui";
import { Calculator } from "./Calculator";
import { loadCaseSolution } from "@/content/cases/loadSolution";
import type { CaseSolution, PublicCase } from "@/content/cases/types";

export function CaseExercise({ slug, question, skillName }: { slug: string; question: PublicCase; skillName: string }) {
  const [choice, setChoice] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [solution, setSolution] = useState<CaseSolution | null>(null);
  const [error, setError] = useState("");
  const submitted = useRef(false);
  const feedback = useRef<HTMLDivElement>(null);

  async function grade() {
    if (!choice || solution || submitted.current) return;
    submitted.current = true;
    setLocked(true);
    setError("");
    try {
      const next = await loadCaseSolution(slug);
      setSolution(next);
      // Focus follows the newly revealed explanation, without stealing radio focus beforehand.
      requestAnimationFrame(() => feedback.current?.focus());
    } catch {
      setError("The explanation could not load. Your choice is locked; try loading it again.");
    } finally { submitted.current = false; }
  }

  return <div className="mt-8">
    <section className="rounded-2xl border border-line bg-surface p-5 sm:p-7" aria-label="Practice case">
      <p className="text-xs uppercase tracking-wider text-accent">{question.industry} · {question.subskill}</p>
      <p className="mt-4 text-lg leading-relaxed text-ink">{question.scenario}</p>
      {question.data ? <DataTable data={question.data} /> : null}
      <fieldset disabled={locked} className="mt-6">
        <legend className="text-base font-semibold text-ink">{question.prompt}</legend>
        <p className="mt-2 text-sm text-muted">Choose an action, then lock it in to reveal the reasoning. This is untimed practice.</p>
        <div className="mt-4 grid gap-3">
          {question.choices.map((item, index) => <label key={item.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm leading-relaxed transition-colors ${choice === item.id ? "border-accent bg-accent-soft" : "border-line bg-surface-2"} has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent`}>
            <input type="radio" name={`case-${slug}`} value={item.id} checked={choice === item.id} onChange={() => setChoice(item.id)} className="mt-1 h-4 w-4 shrink-0 accent-[#f2b441]" />
            <span className="text-faint" aria-hidden="true">{String.fromCharCode(65 + index)}</span>
            <span className="text-ink">{item.text}</span>
          </label>)}
        </div>
      </fieldset>
      {!solution ? <Button className="mt-5 min-h-12 w-full sm:w-auto" disabled={!choice || (locked && !error)} onClick={() => { void grade(); }}>{error ? "Load explanation again" : locked ? "Loading explanation…" : "Lock in my choice"}</Button> : null}
      <p role="status" className="mt-3 text-sm text-muted">{error || (locked && !solution ? "Loading worked reasoning…" : "")}</p>
      {solution ? <div ref={feedback} role="region" tabIndex={-1} className="mt-6 rounded-xl border border-accent/30 bg-bg p-5 outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent" aria-label="Graded breakdown">
        <h2 className={`text-xl font-semibold ${choice === solution.correctChoiceId ? "text-pos" : "text-ink"}`}>{choice === solution.correctChoiceId ? "You made the best call." : "A stronger call was available."}</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink"><strong>Best-supported action: </strong>{question.choices.find((item) => item.id === solution.correctChoiceId)?.text}</p>
        <h3 className="mt-6 font-semibold text-ink">Worked reasoning</h3>
        <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted">{solution.work.map((step) => <li key={step}>{step}</li>)}</ol>
        <p className="mt-5 text-sm leading-relaxed text-muted">{solution.explanation}</p>
        <h3 className="mt-6 font-semibold text-accent">Operator takeaway</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink">{solution.takeaway}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={`/skills/${question.category}/?start=1`} className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 py-3 text-center text-sm font-semibold text-[#16120a]">Take the full {skillName} quiz</a>
          <a href="/daily/" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-line px-5 py-3 text-center text-sm font-medium text-ink">Make today&apos;s Daily Decision</a>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-faint">The adaptive quiz records your score and decision time. Case practice does not post scores or change your streak.</p>
      </div> : null}
    </section>
    <Calculator />
    <noscript><p className="mt-4 text-sm text-muted">JavaScript is needed to lock your choice and load the graded explanation. The full prompt and choices are available above.</p></noscript>
  </div>;
}

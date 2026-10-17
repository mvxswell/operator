"use client";

import { useState } from "react";
import type { Guide } from "@/content/guides";
import { CATEGORY_MAP } from "@/lib/categories";

export function GuideScenario({ guide }: { guide: Guide }) {
  const [selected, setSelected] = useState<number | null>(null);
  const scenario = guide.scenario;
  return (
    <section className="my-10 rounded-xl border border-line bg-surface p-5 sm:p-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.13em] text-accent">{CATEGORY_MAP[guide.skill].name} · sample scenario</p>
      <p className="mt-4 text-lg leading-relaxed text-ink">{scenario.text}</p>
      <p className="mt-4 text-base font-semibold text-ink">{scenario.prompt}</p>
      <div className="mt-4 grid gap-2">
        {scenario.choices.map((choice, index) => (
          <button key={choice} type="button" disabled={selected !== null}
            onClick={() => setSelected(index)}
            className={`rounded-lg border p-3.5 text-left text-[15px] transition-colors ${selected === null ? "border-line bg-surface-2 text-ink hover:border-accent/50" : index === scenario.correct ? "border-accent/60 bg-accent-soft text-ink" : selected === index ? "border-neg/50 bg-neg-soft text-ink" : "border-line-soft text-muted opacity-60"}`}>
            <span className="mr-3 text-accent">{String.fromCharCode(65 + index)}</span>{choice}
          </button>
        ))}
      </div>
      {selected !== null ? <div className="mt-4 rounded-lg border border-line bg-surface-2 p-4 text-sm leading-relaxed text-muted" role="status"><span className="font-semibold text-ink">{selected === scenario.correct ? "Good call." : `Best answer: ${String.fromCharCode(65 + scenario.correct)}.`}</span> {scenario.explanation}</div> : null}
    </section>
  );
}

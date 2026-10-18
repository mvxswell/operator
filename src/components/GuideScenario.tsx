"use client";

import { useEffect, useState } from "react";
import { CATEGORY_MAP } from "@/lib/categories";
import { track } from "@/lib/track";
import type { Guide } from "@/content/guides/types";
import { GuideTestCta } from "./GuideTestCta";
import { CategoryIcon } from "./ui";

const LETTERS = ["A", "B", "C", "D"];

export function GuideScenario({ guide }: { guide: Guide }) {
  const scenario = guide.scenario;
  const meta = CATEGORY_MAP[guide.skill];
  const [selected, setSelected] = useState<string | null>(null);
  const revealed = selected !== null;

  useEffect(() => {
    if (!revealed) return;
    track(`guide:${guide.slug}:scenario`);
  }, [revealed, guide.slug]);

  useEffect(() => {
    if (revealed) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.target instanceof HTMLElement && event.target.closest("input, textarea, select, [contenteditable='true']")) {
        return;
      }
      const key = event.key.toLowerCase();
      const index = "1234".includes(key) ? "1234".indexOf(key) : "abcd".indexOf(key);
      const choice = scenario.choices[index];
      if (!choice) return;
      event.preventDefault();
      setSelected(choice.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [revealed, scenario.choices]);

  return (
    <div className="guide-scenario mt-[1.4em] rounded-xl border border-line bg-bg/40 p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-accent">
          <CategoryIcon category={guide.skill} className="h-3.5 w-3.5" />
          {meta.name}
        </span>
        <span className="text-[11px] text-faint">{scenario.industry}</span>
      </div>
      <p className="text-lg leading-relaxed text-ink sm:text-xl">{scenario.scenario}</p>
      <p className="mt-5 text-[15px] font-semibold text-ink">{scenario.prompt}</p>
      <div className="mt-4 flex flex-col gap-2">
        {scenario.choices.map((choice, index) => {
          const state = !revealed
            ? "idle"
            : choice.id === scenario.correctChoiceId
              ? "correct"
              : choice.id === selected
                ? "wrong"
                : "muted";
          return (
            <button
              key={choice.id}
              type="button"
              disabled={revealed}
              onClick={() => setSelected(choice.id)}
              className={`group flex w-full items-start gap-3 rounded-lg border p-3.5 text-left transition-all duration-150 disabled:cursor-default sm:p-4 ${STATE_CLASS[state]}`}
            >
              <span className={`mt-px grid h-6 w-6 shrink-0 place-items-center rounded-md border text-[11px] font-semibold ${LETTER_CLASS[state]}`}>
                {LETTERS[index]}
              </span>
              <span className="text-[15px] leading-snug text-ink">{choice.text}</span>
              {state === "correct" ? (
                <span className="ml-auto shrink-0 self-center text-xs font-medium text-pos">Best</span>
              ) : null}
            </button>
          );
        })}
      </div>
      {revealed ? (
        <div className="mt-5 rounded-lg border border-line bg-surface-2 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            {scenario.work?.length ? "How to get there" : "Why this is the best call"}
          </p>
          {scenario.work?.length ? (
            <div className="mt-3 space-y-2 border-l border-accent/30 pl-4 text-sm leading-relaxed text-ink">
              {scenario.work.map((step, index) => (
                <p key={step}>{index + 1}. {step}</p>
              ))}
            </div>
          ) : null}
          <p className="mt-3 text-sm leading-relaxed text-muted">{scenario.explanation}</p>
          <div className="mt-4 flex flex-col items-start gap-3 border-t border-line pt-4">
            <p className="text-sm text-ink">That was a {meta.name} call.</p>
            <GuideTestCta skill={guide.skill} skillName={meta.name} slug={guide.slug} />
          </div>
        </div>
      ) : (
        <p className="mt-3 text-[12px] text-faint">Pick an answer to see the call and why.</p>
      )}
    </div>
  );
}

const STATE_CLASS = {
  idle: "border-line bg-surface-2 hover:border-faint hover:bg-raised cursor-pointer",
  correct: "border-pos/60 bg-pos-soft",
  wrong: "border-neg/60 bg-neg-soft",
  muted: "border-line-soft bg-surface opacity-55",
};

const LETTER_CLASS = {
  idle: "border-line text-muted group-hover:border-faint group-hover:text-ink",
  correct: "border-pos/60 bg-pos text-[#08150d]",
  wrong: "border-neg/60 bg-neg text-[#1a0b0a]",
  muted: "border-line-soft text-ink",
};

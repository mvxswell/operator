"use client";

import { useEffect } from "react";
import { CATEGORY_MAP } from "@/lib/categories";
import type { Choice, DailyQuestion, Question } from "@/lib/types";
import { CategoryIcon, DataTable } from "./ui";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

/**
 * The question surface used by the Operator Test, Skill Tests and the Daily
 * Decision. It renders one question, collects an answer, and — once answered —
 * reveals the correct choice with its explanation.
 */
export function QuestionCard({
  question,
  choices,
  selectedChoiceId,
  onSelect,
  revealed,
  showMeta = true,
}: {
  question: Question | DailyQuestion;
  choices: Choice[];
  selectedChoiceId: string | null;
  onSelect: (choiceId: string) => void;
  revealed: boolean;
  showMeta?: boolean;
}) {
  const meta = CATEGORY_MAP[question.category];

  // Number and letter keys answer the question; this is a keyboard-first product.
  useEffect(() => {
    if (revealed) return;
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector('[data-calculator-open="true"]')) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key.toLowerCase();
      const byNumber = "1234".indexOf(key);
      const byLetter = "abcd".indexOf(key);
      const index = byNumber >= 0 ? byNumber : byLetter;
      if (index >= 0 && index < choices.length) {
        e.preventDefault();
        onSelect(choices[index].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choices, onSelect, revealed]);

  return (
    <div key={question.id} className="animate-[var(--animate-rise)]">
      {showMeta ? (
        <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em]"
            style={{ color: meta.accent }}
          >
            <CategoryIcon category={question.category} className="h-3.5 w-3.5" />
            {meta.name}
          </span>
          <span className="text-[11px] text-faint">{question.industry}</span>
        </div>
      ) : null}

      <p className="text-lg leading-relaxed text-ink sm:text-xl sm:leading-relaxed">
        {question.scenario}
      </p>

      {question.data ? <DataTable data={question.data} /> : null}

      <p className="mt-5 text-[15px] font-semibold text-ink sm:text-base">{question.prompt}</p>

      <div className="mt-4 flex flex-col gap-2">
        {choices.map((choice, i) => (
          <ChoiceRow
            key={choice.id}
            letter={LETTERS[i]}
            choice={choice}
            state={choiceState(choice.id, question.correctChoiceId, selectedChoiceId, revealed)}
            disabled={revealed}
            onSelect={() => onSelect(choice.id)}
          />
        ))}
      </div>

      {revealed ? (
        <div className="mt-5 animate-[var(--animate-rise)] rounded-lg border border-line bg-surface-2 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
            {question.work?.length ? "How to get there" : "Why this is the best call"}
          </p>
          {question.work?.length ? (
            <ol className="mt-3 space-y-2 border-l border-accent/30 pl-4 text-sm leading-relaxed text-ink">
              {question.work.map((step, index) => (
                <li key={step} className="relative">
                  <span className="absolute -left-[21px] top-0.5 grid h-4 w-4 place-items-center rounded-full bg-accent-soft text-[9px] font-semibold text-accent">{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          ) : null}
          {question.work?.length ? (
            <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.14em] text-faint">Why it matters</p>
          ) : null}
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{question.explanation}</p>
        </div>
      ) : null}
    </div>
  );
}

type ChoiceState = "idle" | "correct" | "wrong" | "muted";

function choiceState(
  id: string,
  correctId: string,
  selectedId: string | null,
  revealed: boolean,
): ChoiceState {
  if (!revealed) return "idle";
  if (id === correctId) return "correct";
  if (id === selectedId) return "wrong";
  return "muted";
}

const CHOICE_STYLES: Record<ChoiceState, string> = {
  idle: "border-line bg-surface-2 hover:border-faint hover:bg-raised cursor-pointer",
  correct: "border-pos/60 bg-pos-soft",
  wrong: "border-neg/60 bg-neg-soft",
  muted: "border-line-soft bg-surface opacity-55",
};

const LETTER_STYLES: Record<ChoiceState, string> = {
  idle: "border-line text-muted group-hover:border-faint group-hover:text-ink",
  correct: "border-pos/60 bg-pos text-[#08150d]",
  wrong: "border-neg/60 bg-neg text-[#1a0b0a]",
  muted: "border-line-soft text-faint",
};

function ChoiceRow({
  letter,
  choice,
  state,
  disabled,
  onSelect,
}: {
  letter: string;
  choice: Choice;
  state: ChoiceState;
  disabled: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={`group flex w-full items-start gap-3 rounded-lg border p-3.5 text-left transition-all duration-150 disabled:cursor-default sm:p-4 ${CHOICE_STYLES[state]}`}
    >
      <span
        className={`mt-px grid h-6 w-6 shrink-0 place-items-center rounded-md border text-[11px] font-semibold transition-colors ${LETTER_STYLES[state]}`}
      >
        {letter}
      </span>
      <span className="text-[15px] leading-snug text-ink">{choice.text}</span>
      {state === "correct" ? (
        <span className="ml-auto shrink-0 self-center text-xs font-medium text-pos">Best</span>
      ) : null}
    </button>
  );
}

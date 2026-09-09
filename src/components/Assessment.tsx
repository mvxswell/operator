"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { Calculator } from "@/components/Calculator";
import { CountUp } from "@/components/CountUp";
import { Button, ButtonLink, DifficultyPips, Eyebrow, Panel, SkillBar } from "@/components/ui";
import { findQuestion } from "@/data";
import { CATEGORY_MAP } from "@/lib/categories";
import { operatorTier, type OperatorResult } from "@/lib/scoring";
import type { CategoryId, Question } from "@/lib/types";
import { useQuizEngine } from "@/lib/useQuizEngine";

export interface AssessmentProps {
  variant: "operator" | "skill";
  /** Heading on the intro and results screens. */
  title: string;
  introBody: string;
  scoreLabel: string;
  pool: readonly Question[];
  length: number;
  restrictTo?: readonly CategoryId[];
  personalBest: number;
  onComplete: (result: OperatorResult) => void;
  /** Extra links rendered under the results actions. */
  backHref?: string;
  backLabel?: string;
}

export function Assessment(props: AssessmentProps) {
  const { pool, length, restrictTo } = props;
  const engine = useQuizEngine({ pool, length, restrictTo });

  switch (engine.phase) {
    case "intro":
      return <Intro {...props} total={engine.total} onStart={engine.start} />;
    case "complete":
      return <Results {...props} engine={engine} />;
    default:
      return <Run {...props} engine={engine} />;
  }
}

type Engine = ReturnType<typeof useQuizEngine>;

/* ---------------------------------- Intro --------------------------------- */

function Intro({
  title,
  introBody,
  personalBest,
  scoreLabel,
  total,
  onStart,
  backHref,
  backLabel,
}: AssessmentProps & { total: number; onStart: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="brand-hero stack-rise">
        <Eyebrow>{total} questions · adaptive difficulty</Eyebrow>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-muted">{introBody}</p>

        <Panel className="mt-8 divide-y divide-line-soft">
          <Rule text="Questions get harder as you get them right, and easier if you slip." />
          <Rule text="Everything you need to answer is in the scenario. No trivia, no outside knowledge." />
          <Rule text="Accuracy counts most, difficulty next, speed last — guessing quickly will not help." />
          <Rule text="Press 1–4 or A–D to answer, then Enter for the next question." />
          <Rule text="A scratch calculator is available during every question." />
        </Panel>

        {personalBest > 0 ? (
          <p className="mt-6 text-sm text-muted">
            Your best {scoreLabel.toLowerCase()}:{" "}
            <span className="tabular font-semibold text-accent">{personalBest}</span>
          </p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={onStart}>
            {personalBest > 0 ? `Beat ${personalBest}` : "Start"}
          </Button>
          {backHref ? (
            <ButtonLink href={backHref} variant="secondary" size="lg">
              {backLabel ?? "Back"}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Rule({ text }: { text: string }) {
  return (
    <p className="flex gap-3 px-5 py-3.5 text-sm leading-relaxed text-muted">
      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
      {text}
    </p>
  );
}

/* ----------------------------------- Run ---------------------------------- */

function Run({ engine }: AssessmentProps & { engine: Engine }) {
  const { current, phase, selectedChoiceId, answeredCount, total, next, answer, streak } = engine;

  // Enter or Space advances once an answer has been revealed.
  useEffect(() => {
    if (phase !== "feedback") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.repeat || document.querySelector('[data-calculator-open="true"]') || (e.target instanceof HTMLElement && e.target.closest('button, a, input, textarea, select, [contenteditable="true"]'))) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, next]);

  if (!current) return null;

  const revealed = phase === "feedback";
  const correct = revealed && selectedChoiceId === current.question.correctChoiceId;
  const progress = (answeredCount / total) * 100;

  return (
    <div className="mx-auto max-w-2xl px-4 pb-28 pt-8 sm:px-6 sm:pb-32 sm:pt-12">
      {/* Progress header */}
      <div className="panel-depth mb-8 rounded-xl border border-line bg-surface p-4">
        <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-faint">
          <span>
            Question {current.index + 1} of {total}
          </span>
          <span className="flex items-center gap-3">
            {streak >= 3 ? (
              <span className="font-medium text-accent">{streak} streak</span>
            ) : null}
            <span className="hidden sm:inline">Level</span>
            <DifficultyPips level={current.question.difficulty} />
          </span>
        </div>
        <div className="h-0.5 overflow-hidden rounded-full bg-line-soft">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <QuestionCard
        question={current.question}
        choices={current.choices}
        selectedChoiceId={selectedChoiceId}
        onSelect={answer}
        revealed={revealed}
      />

      <Calculator />

      {revealed ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/92 backdrop-blur-md">
          <div className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-3.5 sm:px-6">
            <span
              className={`text-sm font-semibold ${correct ? "text-pos" : "text-neg"}`}
            >
              {correct ? "Correct" : "Not the best call"}
            </span>
            <Button className="ml-auto" onClick={next}>
              {answeredCount >= total ? "See results" : "Next"}
              <span className="hidden text-[11px] opacity-60 sm:inline">Enter</span>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* --------------------------------- Results -------------------------------- */

function Results({
  variant,
  title,
  scoreLabel,
  personalBest,
  onComplete,
  backHref,
  backLabel,
  engine,
}: AssessmentProps & { engine: Engine }) {
  const { result, attempts, reset, start } = engine;
  const savedRef = useRef(false);
  const [previousBest] = useState(personalBest);

  useEffect(() => {
    if (result && !savedRef.current) {
      savedRef.current = true;
      onComplete(result);
    }
  }, [result, onComplete]);

  const replay = useCallback(() => {
    savedRef.current = false;
    reset();
    start();
  }, [reset, start]);

  if (!result) return null;

  const tier = operatorTier(result.score);
  const isRecord = result.score > previousBest;
  const missed = attempts.filter((a) => !a.correct);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Score */}
      <div className="brand-hero text-center">
        <Eyebrow>{scoreLabel}</Eyebrow>
        <p className="tabular mt-3 text-[80px] font-semibold leading-none tracking-[-0.04em] text-accent sm:text-[104px]">
          <CountUp value={result.score} durationMs={1300} />
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-md border border-accent/30 bg-accent-soft px-2.5 py-1 text-[12px] font-medium text-accent">
            {tier.label}
          </span>
          {isRecord ? (
            <span className="rounded-md border border-pos/40 bg-pos-soft px-2.5 py-1 text-[12px] font-medium text-pos">
              New personal best
            </span>
          ) : previousBest > 0 ? (
            <span className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] text-muted">
              Best {previousBest}
            </span>
          ) : null}
        </div>
        <p className="mt-3 text-sm text-muted">{tier.note}</p>
      </div>

      {/* Headline stats */}
      <Panel className="mt-10 grid grid-cols-3 divide-x divide-line-soft">
        <ResultStat label="Highest Level" value={result.highestLevel} />
        <ResultStat label="Accuracy" value={`${Math.round(result.accuracy * 100)}%`} />
        <ResultStat label="Avg Decision" value={`${result.avgSeconds.toFixed(1)}s`} />
      </Panel>

      <ScoreBreakdown result={result} />

      {variant === "operator" ? <SkillSection result={result} /> : null}

      {missed.length ? <ReviewSection missedIds={missed.map((m) => m.questionId)} /> : null}

      {/* Actions */}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/progress" variant="secondary" size="lg">View my progress</ButtonLink>
        {variant === "operator" && result.weakest ? (
          <ButtonLink href={`/skills/${result.weakest.category}`} size="lg">
            Train {CATEGORY_MAP[result.weakest.category].name}
          </ButtonLink>
        ) : null}
        <Button
          size="lg"
          variant={variant === "operator" ? "secondary" : "primary"}
          onClick={replay}
        >
          Retake {title}
        </Button>
        {backHref ? (
          <ButtonLink href={backHref} variant="ghost" size="lg">
            {backLabel ?? "Back"}
          </ButtonLink>
        ) : null}
      </div>
    </div>
  );
}

function ResultStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="px-4 py-5 text-center">
      <p className="text-[11px] uppercase tracking-[0.13em] text-faint">{label}</p>
      <p className="tabular mt-1.5 text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}

function ScoreBreakdown({ result }: { result: OperatorResult }) {
  const parts = [
    { label: "Accuracy", value: result.breakdown.accuracy, max: 500 },
    { label: "Difficulty handled", value: result.breakdown.difficulty, max: 350 },
    { label: "Speed", value: result.breakdown.speed, max: 150 },
  ];

  return (
    <div className="mt-3 flex flex-col gap-1.5 rounded-xl border border-line bg-surface px-5 py-4">
      <p className="mb-1 text-[11px] uppercase tracking-[0.13em] text-faint">Where the score came from</p>
      {parts.map((part) => (
        <div key={part.label} className="flex items-center gap-3">
          <p className="w-[128px] shrink-0 text-[12px] text-muted sm:w-[150px]">{part.label}</p>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-line-soft">
            <div
              className="h-full rounded-full bg-accent/70 transition-[width] duration-1000 ease-out"
              style={{ width: `${(part.value / part.max) * 100}%` }}
            />
          </div>
          <p className="tabular w-16 shrink-0 text-right text-[12px] text-muted">
            {part.value}
            <span className="text-faint">/{part.max}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

function SkillSection({ result }: { result: OperatorResult }) {
  const { strongest, weakest } = result;

  return (
    <section className="mt-10">
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-faint">
        Skill breakdown
      </h2>

      <Panel className="mt-3 divide-y divide-line-soft px-5">
        {result.skills.map((skill) => (
          <SkillBar
            key={skill.category}
            category={skill.category}
            score={skill.score}
            detail={
              skill.asked
                ? `${skill.correct}/${skill.asked} correct · avg level ${skill.avgDifficulty.toFixed(1)}`
                : "Not sampled in this run"
            }
          />
        ))}
      </Panel>

      {strongest && weakest && strongest.category !== weakest.category ? (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-surface p-5">
            <p className="text-[11px] uppercase tracking-[0.13em] text-faint">Strongest skill</p>
            <p className="mt-1.5 text-lg font-semibold text-ink">
              {CATEGORY_MAP[strongest.category].name}
            </p>
            <p className="mt-1 text-sm text-muted">
              {CATEGORY_MAP[strongest.category].blurb} — scored {strongest.score}.
            </p>
          </div>
          <div className="rounded-xl border border-accent/25 bg-accent-soft/40 p-5">
            <p className="text-[11px] uppercase tracking-[0.13em] text-accent/80">
              Biggest opportunity
            </p>
            <p className="mt-1.5 text-lg font-semibold text-ink">
              {CATEGORY_MAP[weakest.category].name}
            </p>
            <p className="mt-1 text-sm text-muted">
              {CATEGORY_MAP[weakest.category].name} is currently your biggest opportunity for
              improvement.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ReviewSection({ missedIds }: { missedIds: string[] }) {
  const [open, setOpen] = useState(false);
  const questions = missedIds.map(findQuestion).filter(Boolean) as Question[];
  if (!questions.length) return null;

  return (
    <section className="mt-10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl border border-line bg-surface px-5 py-4 text-left transition-colors hover:border-faint"
      >
        <span className="text-sm font-medium text-ink">
          Review the {questions.length} you missed
        </span>
        <span className="text-muted">{open ? "−" : "+"}</span>
      </button>

      {open ? (
        <div className="mt-2 flex flex-col gap-2">
          {questions.map((q) => (
            <div key={q.id} className="rounded-xl border border-line bg-surface p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="text-[11px] font-medium uppercase tracking-[0.12em]"
                  style={{ color: CATEGORY_MAP[q.category].accent }}
                >
                  {CATEGORY_MAP[q.category].name}
                </span>
                <Link
                  href={`/skills/${q.category}`}
                  className="text-[11px] text-faint underline-offset-2 hover:text-muted hover:underline"
                >
                  Train this
                </Link>
                <span className="ml-auto text-[11px] text-faint">Level {q.difficulty}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{q.scenario}</p>
              <p className="mt-3 text-sm text-ink">
                <span className="text-pos">Best answer: </span>
                {q.choices.find((c) => c.id === q.correctChoiceId)?.text}
              </p>
              {q.work?.length ? (
                <ol className="mt-3 space-y-1.5 border-l border-accent/30 pl-4 text-sm leading-relaxed text-muted">
                  {q.work.map((step) => <li key={step}>{step}</li>)}
                </ol>
              ) : null}
              <p className="mt-2 text-sm leading-relaxed text-muted">{q.explanation}</p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

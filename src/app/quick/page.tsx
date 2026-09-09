"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CountUp } from "@/components/CountUp";
import { Button, ButtonLink, Eyebrow, Panel } from "@/components/ui";
import { QUICK_QUESTIONS } from "@/data";
import { dpmTier, type QuickResult } from "@/lib/scoring";
import { newId, recordQuickRun } from "@/lib/storage";
import type { QuickQuestion } from "@/lib/types";
import { useProfile } from "@/lib/useProfile";
import { ROUND_MS, useQuickGame, type Side } from "@/lib/useQuickGame";

export default function QuickDecisionsPage() {
  const game = useQuickGame(QUICK_QUESTIONS);
  const { profile, hydrated } = useProfile();
  const best = hydrated ? profile.quick.bestDpm : 0;

  const savedRef = useRef<string | null>(null);
  const [bestAtStart, setBestAtStart] = useState(0);

  useEffect(() => {
    if (game.phase !== "done" || !game.result) return;
    const signature = `${game.result.made}-${game.result.correct}-${game.result.dpm}`;
    if (savedRef.current === signature) return;
    savedRef.current = signature;
    recordQuickRun({
      id: newId(),
      at: new Date().toISOString(),
      dpm: game.result.dpm,
      made: game.result.made,
      correct: game.result.correct,
      accuracy: game.result.accuracy,
      avgSeconds: game.result.avgSeconds,
      bestStreak: game.result.bestStreak,
    });
  }, [game.phase, game.result]);

  const startRun = useCallback(() => {
    // Snapshot the record to beat before this run's result overwrites it.
    setBestAtStart(best);
    savedRef.current = null;
    game.start();
  }, [game, best]);

  // Enter or Space starts a run from the idle and results screens.
  useEffect(() => {
    if (game.phase !== "idle" && game.phase !== "done") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        startRun();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [game.phase, startRun]);

  if (game.phase === "idle") return <IdleScreen best={best} onStart={startRun} />;
  if (game.phase === "done" && game.result) {
    return (
      <ResultsScreen
        result={game.result}
        previousBest={bestAtStart}
        missedIds={game.attempts.filter((a) => !a.correct).map((a) => a.questionId)}
        onReplay={startRun}
      />
    );
  }
  return <Board game={game} />;
}

/* ---------------------------------- Idle ---------------------------------- */

function IdleScreen({ best, onStart }: { best: number; onStart: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="brand-hero stack-rise">
        <Eyebrow>60 seconds · two choices</Eyebrow>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
          Quick Decisions
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-muted">
          One scenario, two options, one right call. Make as many correct decisions as you can
          before the clock runs out.
        </p>

        <Panel className="mt-8 divide-y divide-line-soft">
          <Row left="Score" right="DPM — correct decisions per minute" />
          <Row left="Controls" right="A / ← for left, D / → for right, or tap" />
          <Row left="Wrong answers" right="Cost you a second and break your streak" />
          <Row left="Difficulty" right="Rises as your run gets stronger" />
        </Panel>

        {best > 0 ? (
          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-sm text-muted">Personal best</span>
            <span className="tabular text-2xl font-semibold text-accent">{best}</span>
            <span className="text-sm text-muted">DPM</span>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={onStart}>
            {best > 0 ? `Beat ${best} DPM` : "Start 60 seconds"}
            <span className="text-[11px] opacity-60">Enter</span>
          </Button>
          <ButtonLink href="/" variant="secondary" size="lg">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

function Row({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex items-baseline gap-4 px-5 py-3.5">
      <span className="w-24 shrink-0 text-[11px] uppercase tracking-[0.13em] text-faint">
        {left}
      </span>
      <span className="text-sm text-muted">{right}</span>
    </div>
  );
}

/* ---------------------------------- Board --------------------------------- */

function Board({ game }: { game: ReturnType<typeof useQuickGame> }) {
  const { phase, countdown, remainingMs, card, labels, feedback, streak, correctCount, press } =
    game;

  const seconds = Math.ceil(remainingMs / 1000);
  const urgent = remainingMs <= 10_000;
  const pct = (remainingMs / ROUND_MS) * 100;

  if (phase === "countdown") {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
        <p
          key={countdown}
          className="tabular animate-[var(--animate-pop)] text-[120px] font-semibold leading-none text-ink"
        >
          {countdown > 0 ? countdown : "GO"}
        </p>
      </div>
    );
  }

  return (
    <div className="no-select flex min-h-[calc(100vh-3.5rem)] flex-col">
      {/* Timer bar */}
      <div className="h-0.5 w-full bg-line-soft">
        <div
          className={`h-full transition-[width] duration-100 ease-linear ${
            urgent ? "bg-neg" : "bg-accent"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 sm:px-6">
        {/* Status */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`tabular text-3xl font-semibold leading-none transition-colors sm:text-4xl ${
                urgent ? "text-neg" : "text-ink"
              }`}
            >
              {seconds}
            </span>
            <span className="text-[11px] uppercase tracking-[0.13em] text-faint">sec</span>
          </div>

          <div className="flex items-center gap-5">
            {streak >= 3 ? (
              <span className="animate-[var(--animate-pop)] text-[13px] font-medium text-accent">
                {streak} streak
              </span>
            ) : null}
            <div className="text-right">
              <p className="tabular text-xl font-semibold leading-none text-ink">
                {correctCount}
              </p>
              <p className="text-[10px] uppercase tracking-[0.13em] text-faint">correct</p>
            </div>
          </div>
        </div>

        {/* Scenario */}
        <div className="flex flex-1 items-center justify-center py-4">
          <p
            key={card?.question.id}
            className="animate-[var(--animate-fade)] max-w-xl text-center text-xl font-medium leading-snug text-ink sm:text-[28px] sm:leading-snug"
          >
            {card?.question.scenario}
          </p>
        </div>

        {/* Choices */}
        <div className="grid grid-cols-2 gap-3 pb-6 sm:gap-4 sm:pb-10">
          <SideButton
            side="left"
            label={labels?.left ?? ""}
            hint="A / ←"
            feedback={feedback}
            onPress={() => press("left")}
          />
          <SideButton
            side="right"
            label={labels?.right ?? ""}
            hint="D / →"
            feedback={feedback}
            onPress={() => press("right")}
          />
        </div>
      </div>
    </div>
  );
}

function SideButton({
  side,
  label,
  hint,
  feedback,
  onPress,
}: {
  side: Side;
  label: string;
  hint: string;
  feedback: ReturnType<typeof useQuickGame>["feedback"];
  onPress: () => void;
}) {
  const isCorrectSide = feedback?.correctSide === side;
  const isChosenWrong = feedback && !feedback.correct && feedback.chosenSide === side;

  const tone = isCorrectSide
    ? "border-pos bg-pos-soft"
    : isChosenWrong
      ? "border-neg bg-neg-soft"
      : feedback
        ? "border-line-soft bg-surface opacity-50"
        : "border-line bg-surface-2 hover:border-faint hover:bg-raised active:scale-[0.99]";

  return (
    <button
      type="button"
      onPointerDown={(e) => {
        e.preventDefault();
        onPress();
      }}
      className={`flex min-h-[172px] flex-col items-center justify-center gap-3 rounded-xl border px-3 py-6 text-center transition-all duration-150 sm:min-h-[180px] sm:px-6 ${tone}`}
    >
      <span className="text-[15px] font-semibold uppercase leading-tight tracking-[0.04em] text-ink sm:text-lg">
        {label}
      </span>
      <span className="min-h-4 text-[11px] tracking-[0.1em] text-faint">
        {isCorrectSide && feedback ? (
          "CORRECT ANSWER"
        ) : (
          /* Keyboard hints are noise on touch devices. */
          <span className="hidden sm:inline">{hint}</span>
        )}
      </span>
    </button>
  );
}

/* --------------------------------- Results -------------------------------- */

function ResultsScreen({
  result,
  previousBest,
  missedIds,
  onReplay,
}: {
  result: QuickResult;
  previousBest: number;
  missedIds: string[];
  onReplay: () => void;
}) {
  const { profile } = useProfile();
  const tier = dpmTier(result.dpm);
  const isRecord = result.dpm > previousBest;
  const recent = profile.quick.runs.slice(0, 6);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="brand-hero text-center">
        <Eyebrow>Decisions per minute</Eyebrow>
        <p className="tabular mt-3 text-[86px] font-semibold leading-none tracking-[-0.04em] text-accent sm:text-[110px]">
          <CountUp value={result.dpm} durationMs={1100} />
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
              Best {previousBest} DPM
            </span>
          ) : null}
        </div>
        <p className="mt-3 text-sm text-muted">{tier.note}</p>
      </div>

      <Panel className="mt-9 grid grid-cols-2 divide-line-soft sm:grid-cols-4 sm:divide-x">
        <Cell label="Decisions made" value={result.made} />
        <Cell label="Correct" value={result.correct} tone="pos" />
        <Cell label="Incorrect" value={result.incorrect} tone="neg" />
        <Cell label="Accuracy" value={`${Math.round(result.accuracy * 100)}%`} />
      </Panel>

      <Panel className="mt-3 grid grid-cols-2 divide-line-soft sm:divide-x">
        <Cell label="Avg decision time" value={`${result.avgSeconds.toFixed(2)}s`} />
        <Cell label="Best streak" value={result.bestStreak} />
      </Panel>

      {result.penaltyApplied ? (
        <p className="mt-3 rounded-lg border border-neg/30 bg-neg-soft px-4 py-3 text-[13px] text-muted">
          Accuracy penalty applied. You made {result.correct} correct decisions, but at{" "}
          {Math.round(result.accuracy * 100)}% accuracy your DPM was reduced to {result.dpm}.
          Guessing does not pay here.
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={onReplay}>
          Go again
          <span className="text-[11px] opacity-60">Enter</span>
        </Button>
        <ButtonLink href="/operator" variant="secondary" size="lg">
          Take the Operator Test
        </ButtonLink>
      </div>

      {missedIds.length ? <MissedReview ids={missedIds} /> : null}

      {recent.length > 1 ? (
        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-faint">
            Recent runs
          </h2>
          <Panel className="mt-3 divide-y divide-line-soft">
            {recent.map((run) => (
              <div key={run.id} className="flex items-center gap-4 px-5 py-3">
                <span className="tabular w-10 text-lg font-semibold text-ink">{run.dpm}</span>
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-line-soft">
                  <div
                    className="h-full rounded-full bg-accent/60"
                    style={{
                      width: `${Math.min(100, (run.dpm / Math.max(1, profile.quick.bestDpm)) * 100)}%`,
                    }}
                  />
                </div>
                <span className="tabular w-12 text-right text-[12px] text-faint">
                  {Math.round(run.accuracy * 100)}%
                </span>
              </div>
            ))}
          </Panel>
        </section>
      ) : null}
    </div>
  );
}

function Cell({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone?: "pos" | "neg";
}) {
  const color = tone === "pos" ? "text-pos" : tone === "neg" ? "text-neg" : "text-ink";
  return (
    <div className="border-b border-line-soft px-4 py-4 text-center last:border-b-0 sm:border-b-0">
      <p className="text-[10px] uppercase tracking-[0.13em] text-faint">{label}</p>
      <p className={`tabular mt-1 text-2xl font-semibold ${color}`}>{value}</p>
    </div>
  );
}

function MissedReview({ ids }: { ids: string[] }) {
  const [open, setOpen] = useState(false);
  const unique = Array.from(new Set(ids));
  const questions = unique
    .map((id) => QUICK_QUESTIONS.find((q) => q.id === id))
    .filter(Boolean) as QuickQuestion[];

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
              <p className="text-[15px] leading-relaxed text-ink">{q.scenario}</p>
              <p className="mt-3 text-sm">
                <span className="text-pos">Best call: </span>
                <span className="font-medium uppercase tracking-[0.03em] text-ink">
                  {q.correct === "left" ? q.left : q.right}
                </span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{q.explanation}</p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { pickOne, shuffle } from "./random";
import { computeQuickResult, type QuickResult } from "./scoring";
import type { QuickAttemptRecord, QuickQuestion } from "./types";

/**
 * Quick Decisions game loop.
 *
 * Feel is the product here, so the rules are tight:
 *  - a correct answer advances instantly, with no confirmation step
 *  - a wrong answer freezes the board briefly, which is the real cost of guessing
 *  - a short lockout after each new question stops key-mashing from registering
 */

export const ROUND_MS = 60_000;
export const COUNTDOWN_STEPS = 3;
export const COUNTDOWN_STEP_MS = 550;
/** Input is ignored this long after a new question appears. */
export const INPUT_LOCKOUT_MS = 220;
/** How long the board freezes after a wrong answer. */
export const WRONG_FREEZE_MS = 1200;

export type QuickPhase = "idle" | "countdown" | "running" | "done";
export type Side = "left" | "right";

export interface QuickCard {
  question: QuickQuestion;
  /** When true the authored left/right are swapped on screen. */
  flipped: boolean;
}

export interface QuickFeedback {
  correct: boolean;
  /** Side the player pressed, in screen space. */
  chosenSide: Side;
  /** Side that was correct, in screen space. */
  correctSide: Side;
}

export interface QuickGame {
  phase: QuickPhase;
  countdown: number;
  remainingMs: number;
  card: QuickCard | null;
  feedback: QuickFeedback | null;
  streak: number;
  correctCount: number;
  attempts: QuickAttemptRecord[];
  result: QuickResult | null;
  /** Screen-space labels for the current card. */
  labels: { left: string; right: string } | null;
  start: () => void;
  press: (side: Side) => void;
  reset: () => void;
}

/** Compressed 1-3 ramp: reaches level 2 around six correct, level 3 around eleven. */
const LEVEL_UP = 0.18;
const LEVEL_DOWN = 0.5;

export function useQuickGame(pool: readonly QuickQuestion[]): QuickGame {
  const [phase, setPhase] = useState<QuickPhase>("idle");
  const [countdown, setCountdown] = useState(COUNTDOWN_STEPS);
  const [remainingMs, setRemainingMs] = useState(ROUND_MS);
  const [card, setCard] = useState<QuickCard | null>(null);
  const [feedback, setFeedback] = useState<QuickFeedback | null>(null);
  const [attempts, setAttempts] = useState<QuickAttemptRecord[]>([]);
  const [streak, setStreak] = useState(0);
  const [result, setResult] = useState<QuickResult | null>(null);

  const levelRef = useRef(1);
  const usedRef = useRef<Set<string>>(new Set());
  const shownAtRef = useRef(0);
  const lockUntilRef = useRef(0);
  const deadlineRef = useRef(0);
  const attemptsRef = useRef<QuickAttemptRecord[]>([]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const later = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  const present = useCallback(() => {
    const target = Math.round(levelRef.current);
    let candidates = pool.filter((q) => !usedRef.current.has(q.id) && q.difficulty === target);

    // Widen to neighbouring levels, then allow reuse rather than ever stalling.
    if (!candidates.length) {
      candidates = pool.filter((q) => !usedRef.current.has(q.id));
    }
    if (!candidates.length) {
      usedRef.current = new Set();
      candidates = pool.filter((q) => q.difficulty === target);
      if (!candidates.length) candidates = [...pool];
    }

    const question = pickOne(shuffle(candidates));
    usedRef.current.add(question.id);
    setCard({ question, flipped: Math.random() < 0.5 });
    setFeedback(null);
    shownAtRef.current = performance.now();
    lockUntilRef.current = performance.now() + INPUT_LOCKOUT_MS;
  }, [pool]);

  const finish = useCallback(() => {
    clearTimers();
    setPhase("done");
    setCard(null);
    setFeedback(null);
    setResult(computeQuickResult(attemptsRef.current));
  }, [clearTimers]);

  /* --------------------------------- Timer --------------------------------- */

  useEffect(() => {
    if (phase !== "running") return;
    const tick = () => {
      const left = Math.max(0, deadlineRef.current - performance.now());
      setRemainingMs(left);
      if (left <= 0) finish();
    };
    const id = setInterval(tick, 50);
    tick();
    return () => clearInterval(id);
  }, [phase, finish]);

  useEffect(() => clearTimers, [clearTimers]);

  /* -------------------------------- Controls ------------------------------- */

  const beginRound = useCallback(() => {
    deadlineRef.current = performance.now() + ROUND_MS;
    setRemainingMs(ROUND_MS);
    setPhase("running");
    present();
  }, [present]);

  const start = useCallback(() => {
    clearTimers();
    levelRef.current = 1;
    usedRef.current = new Set();
    attemptsRef.current = [];
    setAttempts([]);
    setStreak(0);
    setResult(null);
    setCard(null);
    setFeedback(null);
    setCountdown(COUNTDOWN_STEPS);
    setPhase("countdown");

    for (let step = 1; step <= COUNTDOWN_STEPS; step++) {
      later(() => setCountdown(COUNTDOWN_STEPS - step), COUNTDOWN_STEP_MS * step);
    }
    later(beginRound, COUNTDOWN_STEP_MS * COUNTDOWN_STEPS);
  }, [beginRound, clearTimers, later]);

  const press = useCallback(
    (side: Side) => {
      const now = performance.now();
      if (phase !== "running" || !card || feedback || now < lockUntilRef.current) return;

      const authoredSide: Side = card.flipped ? flip(side) : side;
      const correct = authoredSide === card.question.correct;
      const correctSide: Side = card.flipped
        ? flip(card.question.correct)
        : card.question.correct;

      const record: QuickAttemptRecord = {
        questionId: card.question.id,
        correct,
        elapsedMs: Math.max(0, now - shownAtRef.current),
        chosen: authoredSide,
      };
      attemptsRef.current = [...attemptsRef.current, record];
      setAttempts(attemptsRef.current);

      if (correct) {
        levelRef.current = Math.min(3, levelRef.current + LEVEL_UP);
        setStreak((s) => s + 1);
        // Straight to the next card; responsiveness is the whole point of the mode.
        present();
      } else {
        levelRef.current = Math.max(1, levelRef.current - LEVEL_DOWN);
        setStreak(0);
        setFeedback({ correct: false, chosenSide: side, correctSide });
        lockUntilRef.current = now + WRONG_FREEZE_MS;
        later(() => {
          if (performance.now() >= deadlineRef.current) finish();
          else present();
        }, WRONG_FREEZE_MS);
      }
    },
    [phase, card, feedback, present, later, finish],
  );

  const reset = useCallback(() => {
    clearTimers();
    setPhase("idle");
    setCard(null);
    setFeedback(null);
    setResult(null);
    setAttempts([]);
    attemptsRef.current = [];
    setRemainingMs(ROUND_MS);
  }, [clearTimers]);

  /* ------------------------------- Keyboard -------------------------------- */

  useEffect(() => {
    if (phase !== "running") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key.toLowerCase();
      if (key === "arrowleft" || key === "a") {
        e.preventDefault();
        press("left");
      } else if (key === "arrowright" || key === "d") {
        e.preventDefault();
        press("right");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, press]);

  const labels = card
    ? card.flipped
      ? { left: card.question.right, right: card.question.left }
      : { left: card.question.left, right: card.question.right }
    : null;

  return {
    phase,
    countdown,
    remainingMs,
    card,
    feedback,
    streak,
    correctCount: attempts.filter((a) => a.correct).length,
    attempts,
    result,
    labels,
    start,
    press,
    reset,
  };
}

function flip(side: Side): Side {
  return side === "left" ? "right" : "left";
}

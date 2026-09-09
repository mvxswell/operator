"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  advance,
  clampDifficulty,
  createAdaptiveState,
  noteServed,
  selectQuestion,
  START_LEVEL,
  type AdaptiveState,
} from "./adaptive";
import { shuffle } from "./random";
import { computeOperatorResult, type OperatorResult } from "./scoring";
import type { AttemptRecord, CategoryId, Choice, Question } from "./types";

/**
 * Shared engine behind the Operator Test and the Skill Tests.
 *
 * Owns question selection, adaptive difficulty, timing and scoring. The UI only
 * renders what it is given and calls `answer` / `next`.
 */

export interface QuizConfig {
  pool: readonly Question[];
  /** How many questions the run should contain. */
  length: number;
  /** Restrict selection to these categories (skill tests pass one). */
  restrictTo?: readonly CategoryId[];
  startLevel?: number;
}

export type QuizPhase = "intro" | "question" | "feedback" | "complete";

export interface CurrentQuestion {
  question: Question;
  /** Display order; shuffled so answer position carries no signal. */
  choices: Choice[];
  index: number;
}

export interface QuizEngine {
  phase: QuizPhase;
  current: CurrentQuestion | null;
  /** Choice the player picked, available during the feedback phase. */
  selectedChoiceId: string | null;
  attempts: AttemptRecord[];
  total: number;
  answeredCount: number;
  level: number;
  highestServed: number;
  streak: number;
  result: OperatorResult | null;
  start: () => void;
  answer: (choiceId: string) => void;
  next: () => void;
  reset: () => void;
}

export function useQuizEngine(config: QuizConfig): QuizEngine {
  const { pool, length, restrictTo, startLevel = START_LEVEL } = config;

  const [phase, setPhase] = useState<QuizPhase>("intro");
  const [current, setCurrent] = useState<CurrentQuestion | null>(null);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [adaptive, setAdaptive] = useState<AdaptiveState>(() => createAdaptiveState(startLevel));

  const askedRef = useRef<Set<string>>(new Set());
  const categoryCountsRef = useRef<Partial<Record<CategoryId, number>>>({});
  const shownAtRef = useRef<number>(0);
  const answeredRef = useRef(false);

  /** Effective run length can never exceed what the pool can supply. */
  const total = useMemo(() => {
    const available = restrictTo
      ? pool.filter((q) => restrictTo.includes(q.category)).length
      : pool.length;
    return Math.min(length, available);
  }, [pool, length, restrictTo]);

  const present = useCallback(
    (state: AdaptiveState, index: number) => {
      const question = selectQuestion({
        pool,
        askedIds: askedRef.current,
        level: state.level,
        categoryCounts: categoryCountsRef.current,
        restrictTo,
      });

      if (!question) {
        setPhase("complete");
        return;
      }

      askedRef.current.add(question.id);
      categoryCountsRef.current[question.category] =
        (categoryCountsRef.current[question.category] ?? 0) + 1;

      setAdaptive(noteServed(state, question.difficulty));
      setCurrent({ question, choices: shuffle(question.choices), index });
      setSelectedChoiceId(null);
      setPhase("question");
      answeredRef.current = false;
      shownAtRef.current = performance.now();
    },
    [pool, restrictTo],
  );

  const start = useCallback(() => {
    askedRef.current = new Set();
    categoryCountsRef.current = {};
    setAttempts([]);
    const fresh = createAdaptiveState(startLevel);
    setAdaptive(fresh);
    present(fresh, 0);
  }, [present, startLevel]);

  const answer = useCallback(
    (choiceId: string) => {
      if (phase !== "question" || !current) return;
      if (answeredRef.current || !current.choices.some((choice) => choice.id === choiceId)) return;
      answeredRef.current = true;

      const elapsedMs = Math.max(0, performance.now() - shownAtRef.current);
      const correct = choiceId === current.question.correctChoiceId;

      const record: AttemptRecord = {
        questionId: current.question.id,
        category: current.question.category,
        difficulty: current.question.difficulty,
        correct,
        elapsedMs,
        chosenChoiceId: choiceId,
      };

      setAttempts((prev) => [...prev, record]);
      setAdaptive((prev) =>
        advance(prev, { difficulty: current.question.difficulty, correct, elapsedMs }),
      );
      setSelectedChoiceId(choiceId);
      setPhase("feedback");
    },
    [phase, current],
  );

  const next = useCallback(() => {
    if (phase !== "feedback" || !current) return;
    const nextIndex = current.index + 1;
    if (nextIndex >= total) {
      setPhase("complete");
      return;
    }
    present(adaptive, nextIndex);
  }, [phase, current, total, present, adaptive]);

  const reset = useCallback(() => {
    askedRef.current = new Set();
    categoryCountsRef.current = {};
    setAttempts([]);
    setCurrent(null);
    setSelectedChoiceId(null);
    setAdaptive(createAdaptiveState(startLevel));
    setPhase("intro");
  }, [startLevel]);

  const result = useMemo(
    () =>
      phase === "complete" && attempts.length
        ? computeOperatorResult(attempts, clampDifficulty(adaptive.highestServed))
        : null,
    [phase, attempts, adaptive.highestServed],
  );

  return {
    phase,
    current,
    selectedChoiceId,
    attempts,
    total,
    answeredCount: attempts.length,
    level: adaptive.level,
    highestServed: adaptive.highestServed,
    streak: adaptive.streak,
    result,
    start,
    answer,
    next,
    reset,
  };
}

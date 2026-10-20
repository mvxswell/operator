"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  advance,
  clampDifficulty,
  createAdaptiveState,
  noteServed,
  selectQuestion,
  START_LEVEL,
  type AdaptiveState,
} from "./adaptive";
import { QUIZ_SAVE_TTL_MS, readQuizSave, removeQuizSave, writeQuizSave, type QuizSave } from "./quizProgress";
import { shuffle } from "./random";
import { computeOperatorResult, type OperatorResult } from "./scoring";
import type { AttemptRecord, CategoryId, Choice, Question } from "./types";

/**
 * Shared engine behind the Operator Test and the Skill Tests.
 *
 * Owns question selection, adaptive difficulty, timing and scoring. The UI only
 * renders what it is given and calls `answer` / `next`. An optional `persist`
 * block stores the run after each question is shown and each answer is locked,
 * so resume restores that snapshot instead of selecting again.
 */

export interface QuizConfig {
  pool: readonly Question[];
  /** How many questions the run should contain. */
  length: number;
  /** Restrict selection to these categories (skill tests pass one). */
  restrictTo?: readonly CategoryId[];
  startLevel?: number;
  /** When set, an unfinished run is kept locally for 24 hours. */
  persist?: {
    variant: "operator" | "skill";
    category?: CategoryId;
  };
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
  /** Wall-clock milliseconds from start to the results screen. */
  durationMs: number;
  /** Unfinished run available from the intro, when it still matches this test. */
  pending: QuizSave | null;
  start: () => void;
  resume: () => void;
  answer: (choiceId: string) => void;
  next: () => void;
  reset: () => void;
}

export function useQuizEngine(config: QuizConfig): QuizEngine {
  const { pool, length, restrictTo, startLevel = START_LEVEL, persist } = config;
  const persistVariant = persist?.variant;
  const persistCategory = persist?.category;

  const [phase, setPhase] = useState<QuizPhase>("intro");
  const [current, setCurrent] = useState<CurrentQuestion | null>(null);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [adaptive, setAdaptive] = useState<AdaptiveState>(() => createAdaptiveState(startLevel));
  const [pending, setPending] = useState<QuizSave | null>(null);

  const askedRef = useRef<Set<string>>(new Set());
  const categoryCountsRef = useRef<Partial<Record<CategoryId, number>>>({});
  const shownAtRef = useRef<number>(0);
  const answeredRef = useRef(false);
  const startedAtRef = useRef<number | null>(null);
  const [durationMs, setDurationMs] = useState(0);

  const phaseRef = useRef<QuizPhase>("intro");
  const currentRef = useRef<CurrentQuestion | null>(null);
  const attemptsRef = useRef<AttemptRecord[]>([]);
  const adaptiveRef = useRef<AdaptiveState>(adaptive);
  const selectedRef = useRef<string | null>(null);
  const pendingRef = useRef<QuizSave | null>(null);

  const freezeDuration = useCallback(() => {
    if (startedAtRef.current == null) return;
    setDurationMs(Math.max(1, Math.round(performance.now() - startedAtRef.current)));
  }, []);

  /** Effective run length can never exceed what the pool can supply. */
  const total = useMemo(() => {
    const available = restrictTo
      ? pool.filter((q) => restrictTo.includes(q.category)).length
      : pool.length;
    return Math.min(length, available);
  }, [pool, length, restrictTo]);

  const forgetSave = useCallback(() => {
    pendingRef.current = null;
    setPending(null);
    if (!persistVariant) return;
    removeQuizSave(persistVariant, persistCategory);
  }, [persistVariant, persistCategory]);

  const rememberSave = useCallback(() => {
    if (!persistVariant) return;
    const phaseNow = phaseRef.current;
    const shown = currentRef.current;
    if ((phaseNow !== "question" && phaseNow !== "feedback") || !shown || startedAtRef.current == null) return;
    const save: QuizSave = {
      version: 1,
      variant: persistVariant,
      category: persistCategory ?? null,
      length: total,
      savedAt: Date.now(),
      runElapsedMs: Math.min(QUIZ_SAVE_TTL_MS, Math.max(0, performance.now() - startedAtRef.current)),
      questionElapsedMs: Math.min(2 * 60 * 60 * 1000, Math.max(0, performance.now() - shownAtRef.current)),
      phase: phaseNow,
      index: shown.index,
      questionId: shown.question.id,
      choiceIds: shown.choices.map((choice) => choice.id),
      selectedChoiceId: selectedRef.current,
      attempts: attemptsRef.current.map((attempt) => ({ ...attempt })),
      askedIds: [...askedRef.current],
      categoryCounts: { ...categoryCountsRef.current },
      adaptive: { ...adaptiveRef.current },
    };
    pendingRef.current = save;
    setPending(save);
    writeQuizSave(save);
  }, [persistVariant, persistCategory, total]);

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
        freezeDuration();
        phaseRef.current = "complete";
        pendingRef.current = null;
        setPending(null);
        setPhase("complete");
        return;
      }

      askedRef.current.add(question.id);
      categoryCountsRef.current[question.category] =
        (categoryCountsRef.current[question.category] ?? 0) + 1;

      const nextAdaptive = noteServed(state, question.difficulty);
      const nextCurrent = { question, choices: shuffle(question.choices), index };
      adaptiveRef.current = nextAdaptive;
      currentRef.current = nextCurrent;
      selectedRef.current = null;
      phaseRef.current = "question";
      setAdaptive(nextAdaptive);
      setCurrent(nextCurrent);
      setSelectedChoiceId(null);
      setPhase("question");
      answeredRef.current = false;
      shownAtRef.current = performance.now();
      rememberSave();
    },
    [pool, restrictTo, freezeDuration, rememberSave],
  );

  const start = useCallback(() => {
    forgetSave();
    askedRef.current = new Set();
    categoryCountsRef.current = {};
    attemptsRef.current = [];
    setAttempts([]);
    startedAtRef.current = performance.now();
    setDurationMs(0);
    const fresh = createAdaptiveState(startLevel);
    adaptiveRef.current = fresh;
    setAdaptive(fresh);
    present(fresh, 0);
  }, [present, startLevel, forgetSave]);

  const resume = useCallback(() => {
    const snap = pendingRef.current;
    if (!snap) return;
    const question = pool.find((item) => item.id === snap.questionId);
    if (!question) return;
    const choices = snap.choiceIds
      .map((id) => question.choices.find((choice) => choice.id === id))
      .filter((choice): choice is Choice => Boolean(choice));
    if (choices.length !== question.choices.length) return;

    askedRef.current = new Set(snap.askedIds);
    categoryCountsRef.current = { ...snap.categoryCounts };
    attemptsRef.current = snap.attempts.map((attempt) => ({ ...attempt }));
    adaptiveRef.current = { ...snap.adaptive };
    const restored: CurrentQuestion = { question, choices, index: snap.index };
    currentRef.current = restored;
    selectedRef.current = snap.selectedChoiceId;
    phaseRef.current = snap.phase;
    startedAtRef.current = performance.now() - snap.runElapsedMs;
    shownAtRef.current = performance.now() - snap.questionElapsedMs;
    answeredRef.current = snap.phase === "feedback";

    setAttempts(attemptsRef.current);
    setAdaptive(adaptiveRef.current);
    setCurrent(restored);
    setSelectedChoiceId(snap.selectedChoiceId);
    setPhase(snap.phase);
    setDurationMs(0);
  }, [pool]);

  const answer = useCallback(
    (choiceId: string) => {
      const shown = currentRef.current;
      if (phaseRef.current !== "question" || !shown) return;
      if (answeredRef.current || !shown.choices.some((choice) => choice.id === choiceId)) return;
      answeredRef.current = true;

      const elapsedMs = Math.max(0, performance.now() - shownAtRef.current);
      const correct = choiceId === shown.question.correctChoiceId;

      const record: AttemptRecord = {
        questionId: shown.question.id,
        category: shown.question.category,
        difficulty: shown.question.difficulty,
        correct,
        elapsedMs,
        chosenChoiceId: choiceId,
      };

      const nextAttempts = [...attemptsRef.current, record];
      const nextAdaptive = advance(adaptiveRef.current, {
        difficulty: shown.question.difficulty,
        correct,
        elapsedMs,
      });
      attemptsRef.current = nextAttempts;
      adaptiveRef.current = nextAdaptive;
      selectedRef.current = choiceId;
      phaseRef.current = "feedback";
      setAttempts(nextAttempts);
      setAdaptive(nextAdaptive);
      setSelectedChoiceId(choiceId);
      setPhase("feedback");
      rememberSave();
    },
    [rememberSave],
  );

  const next = useCallback(() => {
    const shown = currentRef.current;
    if (phaseRef.current !== "feedback" || !shown) return;
    const nextIndex = shown.index + 1;
    if (nextIndex >= total) {
      freezeDuration();
      phaseRef.current = "complete";
      pendingRef.current = null;
      setPending(null);
      setPhase("complete");
      return;
    }
    present(adaptiveRef.current, nextIndex);
  }, [total, present, freezeDuration]);

  const reset = useCallback(() => {
    forgetSave();
    askedRef.current = new Set();
    categoryCountsRef.current = {};
    attemptsRef.current = [];
    currentRef.current = null;
    selectedRef.current = null;
    startedAtRef.current = null;
    const fresh = createAdaptiveState(startLevel);
    adaptiveRef.current = fresh;
    phaseRef.current = "intro";
    setDurationMs(0);
    setAttempts([]);
    setCurrent(null);
    setSelectedChoiceId(null);
    setAdaptive(fresh);
    setPhase("intro");
  }, [startLevel, forgetSave]);

  useLayoutEffect(() => {
    if (!persistVariant || phaseRef.current !== "intro") return;
    const loaded = readQuizSave({
      variant: persistVariant,
      category: persistCategory,
      length: total,
      pool,
      restrictTo,
    });
    pendingRef.current = loaded;
    setPending(loaded);
  }, [persistVariant, persistCategory, total, pool, restrictTo]);

  useEffect(() => {
    if (phase !== "complete" || !persistVariant) return;
    removeQuizSave(persistVariant, persistCategory);
  }, [phase, persistVariant, persistCategory]);

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
    durationMs,
    pending,
    start,
    resume,
    answer,
    next,
    reset,
  };
}

import type { CategoryId, Difficulty, Question } from "./types";
import { MAX_DIFFICULTY, MIN_DIFFICULTY } from "./types";
import { shuffle } from "./random";

/**
 * Adaptive difficulty.
 *
 * Difficulty is tracked as a float so a run can drift smoothly instead of
 * snapping between integer levels. A strong player reaches level 5-6 within a
 * few questions; nothing is gated behind account progression.
 */

/** Expected solve time in seconds at each difficulty. Index = difficulty. */
export const PAR_SECONDS: Record<Difficulty, number> = {
  1: 10,
  2: 16,
  3: 24,
  4: 32,
  5: 40,
  6: 48,
};

export const START_LEVEL = 2.2;

export interface AdaptiveState {
  /** Float level, clamped to [1, 6]. */
  level: number;
  /** Highest integer difficulty actually served to the player. */
  highestServed: Difficulty;
  streak: number;
  missStreak: number;
}

export function createAdaptiveState(level: number = START_LEVEL): AdaptiveState {
  return {
    level,
    highestServed: clampDifficulty(Math.round(level)),
    streak: 0,
    missStreak: 0,
  };
}

export function clampDifficulty(n: number): Difficulty {
  return Math.min(MAX_DIFFICULTY, Math.max(MIN_DIFFICULTY, Math.round(n))) as Difficulty;
}

export interface AdaptiveOutcome {
  difficulty: Difficulty;
  correct: boolean;
  elapsedMs: number;
}

/**
 * Difficulty responds to correctness first and speed second. A correct answer
 * well inside par moves fastest; a very fast wrong answer is treated as a guess
 * and drops hardest.
 */
export function advance(state: AdaptiveState, outcome: AdaptiveOutcome): AdaptiveState {
  const par = PAR_SECONDS[outcome.difficulty];
  const seconds = outcome.elapsedMs / 1000;
  let delta: number;

  if (outcome.correct) {
    if (seconds <= par * 0.5) delta = 0.95;
    else if (seconds <= par) delta = 0.7;
    else delta = 0.4;
    // Answering below the level you are being served should still pull you up.
    if (outcome.difficulty < state.level - 1) delta *= 0.5;
  } else {
    delta = seconds <= par * 0.3 ? -1.1 : -0.8;
  }

  const streak = outcome.correct ? state.streak + 1 : 0;
  const missStreak = outcome.correct ? 0 : state.missStreak + 1;

  if (streak >= 3) delta += 0.25;
  if (missStreak >= 2) delta -= 0.3;

  const level = Math.min(MAX_DIFFICULTY, Math.max(MIN_DIFFICULTY, state.level + delta));
  return { level, highestServed: state.highestServed, streak, missStreak };
}

export interface SelectOptions {
  pool: readonly Question[];
  askedIds: ReadonlySet<string>;
  level: number;
  /** Questions already asked per category; used to spread coverage. */
  categoryCounts?: Partial<Record<CategoryId, number>>;
  /** When set, only these categories are eligible. */
  restrictTo?: readonly CategoryId[];
  rand?: () => number;
}

/**
 * Pick the next question: nearest available difficulty to the current level,
 * breaking ties toward the least-covered category so a 20-question run still
 * touches all eight skills.
 */
export function selectQuestion(opts: SelectOptions): Question | null {
  const { pool, askedIds, level, categoryCounts = {}, restrictTo, rand = Math.random } = opts;

  const eligible = pool.filter(
    (q) => !askedIds.has(q.id) && (!restrictTo || restrictTo.includes(q.category)),
  );
  if (eligible.length === 0) return null;

  const target = clampDifficulty(level);

  const scored = eligible.map((q) => ({
    q,
    distance: Math.abs(q.difficulty - target),
    coverage: categoryCounts[q.category] ?? 0,
  }));

  const minDistance = Math.min(...scored.map((s) => s.distance));
  const nearest = scored.filter((s) => s.distance <= minDistance);

  const minCoverage = Math.min(...nearest.map((s) => s.coverage));
  const leastCovered = nearest.filter((s) => s.coverage === minCoverage);

  return shuffle(leastCovered, rand)[0].q;
}

/** Record that a question of this difficulty was actually shown. */
export function noteServed(state: AdaptiveState, difficulty: Difficulty): AdaptiveState {
  return difficulty > state.highestServed ? { ...state, highestServed: difficulty } : state;
}

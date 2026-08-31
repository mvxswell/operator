import { PAR_SECONDS } from "./adaptive";
import { CATEGORY_IDS } from "./categories";
import type { AttemptRecord, CategoryId, Difficulty, QuickAttemptRecord } from "./types";

/**
 * Scoring.
 *
 * Design constraints from the product:
 *  - accuracy matters most
 *  - difficulty actually handled matters next
 *  - speed matters least, and fast guessing must not produce a strong score
 */

export const ACCURACY_POINTS = 500;
export const DIFFICULTY_POINTS = 350;
export const SPEED_POINTS = 150;
export const MAX_OPERATOR_SCORE = ACCURACY_POINTS + DIFFICULTY_POINTS + SPEED_POINTS;

/** Relative worth of a correct answer at each difficulty. */
export const DIFFICULTY_WEIGHT: Record<Difficulty, number> = {
  1: 1,
  2: 1.6,
  3: 2.4,
  4: 3.4,
  5: 4.6,
  6: 6,
};

export interface SkillScore {
  category: CategoryId;
  /** 0-100, or null when the run never sampled this skill. */
  score: number | null;
  asked: number;
  correct: number;
  avgDifficulty: number;
}

export interface OperatorResult {
  score: number;
  accuracy: number;
  correct: number;
  total: number;
  avgSeconds: number;
  highestLevel: Difficulty;
  skills: SkillScore[];
  strongest: SkillScore | null;
  weakest: SkillScore | null;
  breakdown: { accuracy: number; difficulty: number; speed: number };
}

/** 0-1 speed credit for a single answer, relative to par for its difficulty. */
export function speedCredit(elapsedMs: number, difficulty: Difficulty): number {
  const par = PAR_SECONDS[difficulty];
  const seconds = elapsedMs / 1000;
  return clamp01((1.8 * par - seconds) / (1.4 * par));
}

export function computeOperatorResult(
  attempts: readonly AttemptRecord[],
  highestServed: Difficulty,
): OperatorResult {
  const total = attempts.length;
  const correctAttempts = attempts.filter((a) => a.correct);
  const correct = correctAttempts.length;
  const accuracy = total ? correct / total : 0;

  // Difficulty credit: how hard were the questions you actually solved, with a
  // minority weight on the highest level the adaptive engine served you.
  const avgCorrectDifficulty = correct
    ? correctAttempts.reduce((sum, a) => sum + a.difficulty, 0) / correct
    : 1;
  const solvedDepth = clamp01((avgCorrectDifficulty - 1) / 5);
  const reachedDepth = clamp01((highestServed - 1) / 5);
  const difficultyFactor = correct === 0 ? 0 : 0.75 * solvedDepth + 0.25 * reachedDepth;

  const speedFactor = total
    ? attempts.reduce((sum, a) => sum + speedCredit(a.elapsedMs, a.difficulty), 0) / total
    : 0;

  const accuracyPart = ACCURACY_POINTS * accuracy;
  const difficultyPart = DIFFICULTY_POINTS * difficultyFactor;
  // Squaring accuracy here is what stops fast guessing from paying.
  const speedPart = SPEED_POINTS * speedFactor * accuracy * accuracy;

  const totalMs = attempts.reduce((sum, a) => sum + a.elapsedMs, 0);

  const skills = computeSkillScores(attempts);
  const sampled = skills.filter((s) => s.score !== null);
  const ranked = [...sampled].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  return {
    score: Math.round(accuracyPart + difficultyPart + speedPart),
    accuracy,
    correct,
    total,
    avgSeconds: total ? totalMs / total / 1000 : 0,
    highestLevel: highestServed,
    skills,
    strongest: ranked[0] ?? null,
    weakest: ranked.length ? ranked[ranked.length - 1] : null,
    breakdown: {
      accuracy: Math.round(accuracyPart),
      difficulty: Math.round(difficultyPart),
      speed: Math.round(speedPart),
    },
  };
}

/**
 * Per-skill score on 0-100.
 *
 * Uses difficulty-weighted credit plus Bayesian shrinkage toward 50, so that a
 * skill sampled by only two questions does not read as a flat 0 or 100.
 */
export function computeSkillScores(attempts: readonly AttemptRecord[]): SkillScore[] {
  const PRIOR_WEIGHT = DIFFICULTY_WEIGHT[3];

  return CATEGORY_IDS.map((category) => {
    const own = attempts.filter((a) => a.category === category);
    if (own.length === 0) {
      return { category, score: null, asked: 0, correct: 0, avgDifficulty: 0 };
    }

    let earned = 0;
    let possible = 0;
    for (const a of own) {
      const w = DIFFICULTY_WEIGHT[a.difficulty];
      possible += w;
      if (a.correct) earned += w;
    }

    const ratio = (earned + PRIOR_WEIGHT * 0.5) / (possible + PRIOR_WEIGHT);
    return {
      category,
      score: Math.round(100 * ratio),
      asked: own.length,
      correct: own.filter((a) => a.correct).length,
      avgDifficulty: own.reduce((s, a) => s + a.difficulty, 0) / own.length,
    };
  });
}

/* ------------------------------ Quick Decisions ------------------------------ */

/**
 * Below this accuracy, DPM is scaled down so mashing cannot out-score judgment.
 *
 * The multiplier is squared: a player at 70% loses about 13% of their score,
 * while someone alternating randomly at 50% loses more than half of theirs.
 */
export const DPM_ACCURACY_FLOOR = 0.75;

export interface QuickResult {
  /** Headline metric: correct decisions per minute. */
  dpm: number;
  rawCorrect: number;
  made: number;
  correct: number;
  incorrect: number;
  accuracy: number;
  avgSeconds: number;
  bestStreak: number;
  penaltyApplied: boolean;
}

export function computeQuickResult(attempts: readonly QuickAttemptRecord[]): QuickResult {
  const made = attempts.length;
  const correct = attempts.filter((a) => a.correct).length;
  const incorrect = made - correct;
  const accuracy = made ? correct / made : 0;

  let bestStreak = 0;
  let streak = 0;
  for (const a of attempts) {
    if (a.correct) {
      streak += 1;
      bestStreak = Math.max(bestStreak, streak);
    } else {
      streak = 0;
    }
  }

  const penaltyApplied = made > 0 && accuracy < DPM_ACCURACY_FLOOR;
  const dpm = penaltyApplied
    ? Math.round(correct * Math.pow(accuracy / DPM_ACCURACY_FLOOR, 2))
    : correct;

  const totalMs = attempts.reduce((s, a) => s + a.elapsedMs, 0);

  return {
    dpm,
    rawCorrect: correct,
    made,
    correct,
    incorrect,
    accuracy,
    avgSeconds: made ? totalMs / made / 1000 : 0,
    bestStreak,
    penaltyApplied,
  };
}

/* --------------------------------- Labels ---------------------------------- */

export interface Tier {
  min: number;
  label: string;
  note: string;
}

export const OPERATOR_TIERS: Tier[] = [
  { min: 900, label: "Elite Operator", note: "Top-tier judgment under pressure." },
  { min: 800, label: "Senior Operator", note: "Reads systems, not symptoms." },
  { min: 700, label: "Operator", note: "Sound instincts, few wasted moves." },
  { min: 580, label: "Manager", note: "Solid fundamentals, some blind spots." },
  { min: 440, label: "Coordinator", note: "Sees the parts, not yet the system." },
  { min: 0, label: "Apprentice", note: "Learning to spot the real constraint." },
];

export function operatorTier(score: number): Tier {
  return OPERATOR_TIERS.find((t) => score >= t.min) ?? OPERATOR_TIERS[OPERATOR_TIERS.length - 1];
}

export const DPM_TIERS: Tier[] = [
  { min: 30, label: "Instinctive", note: "Pattern recognition on autopilot." },
  { min: 24, label: "Sharp", note: "Fast and accurate." },
  { min: 18, label: "Steady", note: "Good calls, room to speed up." },
  { min: 12, label: "Deliberate", note: "Thinking it through each time." },
  { min: 0, label: "Warming Up", note: "Run it again." },
];

export function dpmTier(dpm: number): Tier {
  return DPM_TIERS.find((t) => dpm >= t.min) ?? DPM_TIERS[DPM_TIERS.length - 1];
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

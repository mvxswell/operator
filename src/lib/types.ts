/**
 * Core domain types.
 *
 * The question bank is intentionally plain data so it can grow to thousands of
 * entries (or be swapped for a database / AI generator) without touching the UI.
 */

export type CategoryId =
  | "bottleneck"
  | "prioritization"
  | "resource"
  | "financial"
  | "sales"
  | "operations"
  | "people"
  | "strategy";

/** 1 = obvious single-variable, 6 = second-order tradeoffs under uncertainty. */
export type Difficulty = 1 | 2 | 3 | 4 | 5 | 6;

export const MIN_DIFFICULTY: Difficulty = 1;
export const MAX_DIFFICULTY: Difficulty = 6;

export interface Choice {
  /** Stable within a question: "a" | "b" | "c" | "d". */
  id: string;
  text: string;
}

/** Multiple-choice question used by the Operator Test and Skill Tests. */
export interface Question {
  id: string;
  mode: "standard";
  category: CategoryId;
  /** Narrow concept being tested, e.g. "throughput constraint". */
  subskill: string;
  industry: string;
  difficulty: Difficulty;
  /** The situation. Kept short; the visual focus of the screen. */
  scenario: string;
  /** Optional operating data rendered as a compact table/list. */
  data?: DataBlock;
  /** The actual question being asked. */
  prompt: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation: string;
}

/** Optional structured figures shown beneath a scenario. */
export interface DataBlock {
  /** Column headers. First column is the row label; omit for a simple list. */
  columns?: string[];
  rows: { label: string; values: string[] }[];
  note?: string;
}

/** Two-choice question used by Quick Decisions. */
export interface QuickQuestion {
  id: string;
  mode: "quick";
  category: CategoryId;
  industry: string;
  /** Quick mode uses a compressed 1-3 ramp; reading speed must not be the skill. */
  difficulty: 1 | 2 | 3;
  scenario: string;
  left: string;
  right: string;
  correct: "left" | "right";
  explanation: string;
}

/** A Daily Decision is a standard question plus a community distribution. */
export interface DailyQuestion extends Omit<Question, "mode"> {
  mode: "daily";
  /** Simulated community response share per choice id. Must sum to 100. */
  distribution: Record<string, number>;
}

export type AnyQuestion = Question | QuickQuestion | DailyQuestion;

/** One answered question inside a run. */
export interface AttemptRecord {
  questionId: string;
  category: CategoryId;
  difficulty: Difficulty;
  correct: boolean;
  /** Milliseconds from question render to answer. */
  elapsedMs: number;
  chosenChoiceId: string;
}

export interface QuickAttemptRecord {
  questionId: string;
  correct: boolean;
  elapsedMs: number;
  chosen: "left" | "right";
}

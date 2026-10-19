import { CATEGORY_IDS } from "./categories";
import type { AdaptiveState } from "./adaptive";
import type { AttemptRecord, CategoryId, Difficulty, Question } from "./types";

/**
 * In-progress Operator and skill tests.
 *
 * Finished runs stay in the profile. This is a separate 24-hour snapshot so a
 * refresh or a closed tab can resume the same questions, in the same order,
 * without asking the selector to pick again.
 */

export const QUIZ_SAVE_VERSION = 1;
export const QUIZ_SAVE_TTL_MS = 24 * 60 * 60 * 1000;
export const QUIZ_SAVE_PREFIX = "operator.quiz.v1.";

const MAX_RUN_MS = QUIZ_SAVE_TTL_MS;
const MAX_QUESTION_MS = 2 * 60 * 60 * 1000;
const MAX_ATTEMPT_MS = QUIZ_SAVE_TTL_MS;

export interface QuizSave {
  version: 1;
  variant: "operator" | "skill";
  category: CategoryId | null;
  length: number;
  savedAt: number;
  runElapsedMs: number;
  questionElapsedMs: number;
  phase: "question" | "feedback";
  index: number;
  questionId: string;
  choiceIds: string[];
  selectedChoiceId: string | null;
  attempts: AttemptRecord[];
  askedIds: string[];
  categoryCounts: Partial<Record<CategoryId, number>>;
  adaptive: AdaptiveState;
}

export interface QuizSaveContext {
  variant: "operator" | "skill";
  category?: CategoryId;
  /** Run length actually being played (pool size can shorten it). */
  length: number;
  pool: readonly Question[];
  restrictTo?: readonly CategoryId[];
  now?: number;
}

type Store = Pick<Storage, "getItem" | "setItem" | "removeItem" | "key" | "length">;

export function quizSaveKey(variant: "operator" | "skill", category?: CategoryId | null): string {
  if (variant === "operator") return `${QUIZ_SAVE_PREFIX}operator`;
  return `${QUIZ_SAVE_PREFIX}skill.${category ?? "unknown"}`;
}

function storeOr(storage?: Store | null): Store | null {
  if (storage) return storage;
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

function object(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function finite(value: unknown, max: number): number | null {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > max) return null;
  return value;
}

function int(value: unknown, max: number): number | null {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0 || value > max) return null;
  return value;
}

function isCategory(value: unknown): value is CategoryId {
  return typeof value === "string" && (CATEGORY_IDS as readonly string[]).includes(value);
}

function isDifficulty(value: unknown): value is Difficulty {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5 || value === 6;
}

function reviveAttempt(value: unknown): AttemptRecord | null {
  const row = object(value);
  if (!row) return null;
  const questionId = typeof row.questionId === "string" ? row.questionId : "";
  const chosenChoiceId = typeof row.chosenChoiceId === "string" ? row.chosenChoiceId : "";
  const elapsedMs = finite(row.elapsedMs, MAX_ATTEMPT_MS);
  if (!questionId || questionId.length > 80 || !isCategory(row.category) || !isDifficulty(row.difficulty)) return null;
  if (elapsedMs == null || !chosenChoiceId || chosenChoiceId.length > 8) return null;
  if (row.correct !== true && row.correct !== false) return null;
  return {
    questionId,
    category: row.category,
    difficulty: row.difficulty,
    correct: row.correct,
    elapsedMs,
    chosenChoiceId,
  };
}

function sameChoices(question: Question, ids: string[]): boolean {
  if (ids.length !== question.choices.length || new Set(ids).size !== ids.length) return false;
  const expected = question.choices.map((choice) => choice.id).sort();
  return [...ids].sort().every((id, index) => id === expected[index]);
}

/** Restore a snapshot only when it still matches this test and is inside the TTL. */
export function parseQuizSave(raw: unknown, ctx: QuizSaveContext): QuizSave | null {
  const row = object(raw);
  if (!row || row.version !== QUIZ_SAVE_VERSION) return null;
  if (row.variant !== ctx.variant) return null;
  const category = row.category === null ? null : isCategory(row.category) ? row.category : undefined;
  if (category === undefined) return null;
  if ((ctx.category ?? null) !== category) return null;
  if (row.phase !== "question" && row.phase !== "feedback") return null;

  const length = int(row.length, 100);
  const index = int(row.index, 100);
  const savedAt = finite(row.savedAt, Number.MAX_SAFE_INTEGER);
  const runElapsedMs = finite(row.runElapsedMs, MAX_RUN_MS);
  const questionElapsedMs = finite(row.questionElapsedMs, MAX_QUESTION_MS);
  if (length == null || length !== ctx.length || length < 1) return null;
  if (index == null || index >= length) return null;
  if (savedAt == null || runElapsedMs == null || questionElapsedMs == null) return null;

  const now = ctx.now ?? Date.now();
  const age = now - savedAt;
  if (age < -60_000 || age > QUIZ_SAVE_TTL_MS) return null;

  const questionId = typeof row.questionId === "string" ? row.questionId : "";
  const question = ctx.pool.find((item) => item.id === questionId);
  if (!question) return null;
  if (ctx.restrictTo && !ctx.restrictTo.includes(question.category)) return null;

  const choiceIds = Array.isArray(row.choiceIds)
    ? row.choiceIds.filter((id): id is string => typeof id === "string")
    : [];
  if (!sameChoices(question, choiceIds)) return null;

  const selectedChoiceId =
    row.selectedChoiceId === null
      ? null
      : typeof row.selectedChoiceId === "string"
        ? row.selectedChoiceId
        : undefined;
  if (selectedChoiceId === undefined) return null;
  if (row.phase === "question" && selectedChoiceId !== null) return null;
  if (row.phase === "feedback" && (selectedChoiceId === null || !choiceIds.includes(selectedChoiceId))) return null;

  if (!Array.isArray(row.attempts) || row.attempts.length > length) return null;
  const attempts: AttemptRecord[] = [];
  for (const item of row.attempts) {
    const attempt = reviveAttempt(item);
    if (!attempt) return null;
    attempts.push(attempt);
  }
  if (row.phase === "question" && attempts.length !== index) return null;
  if (row.phase === "feedback" && attempts.length !== index + 1) return null;
  if (row.phase === "question" && attempts.some((attempt) => attempt.questionId === questionId)) return null;
  if (row.phase === "feedback" && attempts[attempts.length - 1]?.questionId !== questionId) return null;

  if (!Array.isArray(row.askedIds) || row.askedIds.length > 200) return null;
  const askedIds = row.askedIds.filter((id): id is string => typeof id === "string" && id.length > 0 && id.length <= 80);
  if (askedIds.length !== row.askedIds.length) return null;
  const asked = new Set(askedIds);
  if (asked.size !== askedIds.length) return null;
  if (!asked.has(questionId)) return null;
  if (attempts.some((attempt) => !asked.has(attempt.questionId))) return null;

  const countsRow = object(row.categoryCounts);
  if (!countsRow) return null;
  const categoryCounts: Partial<Record<CategoryId, number>> = {};
  for (const [key, value] of Object.entries(countsRow)) {
    if (!isCategory(key)) return null;
    const count = int(value, 100);
    if (count == null) return null;
    categoryCounts[key] = count;
  }

  const adaptiveRow = object(row.adaptive);
  if (!adaptiveRow) return null;
  const level =
    typeof adaptiveRow.level === "number" &&
    Number.isFinite(adaptiveRow.level) &&
    adaptiveRow.level >= 1 &&
    adaptiveRow.level <= 6
      ? adaptiveRow.level
      : null;
  const streak = int(adaptiveRow.streak, 100);
  const missStreak = int(adaptiveRow.missStreak, 100);
  if (level == null || streak == null || missStreak == null) return null;
  if (!isDifficulty(adaptiveRow.highestServed)) return null;

  return {
    version: 1,
    variant: ctx.variant,
    category,
    length,
    savedAt,
    runElapsedMs,
    questionElapsedMs,
    phase: row.phase,
    index,
    questionId,
    choiceIds,
    selectedChoiceId,
    attempts,
    askedIds,
    categoryCounts,
    adaptive: { level, highestServed: adaptiveRow.highestServed, streak, missStreak },
  };
}

export function readQuizSave(ctx: QuizSaveContext, storage?: Store | null): QuizSave | null {
  const store = storeOr(storage);
  if (!store) return null;
  const key = quizSaveKey(ctx.variant, ctx.category);
  try {
    const raw = store.getItem(key);
    if (!raw) return null;
    const parsed = parseQuizSave(JSON.parse(raw), ctx);
    if (!parsed) store.removeItem(key);
    return parsed;
  } catch {
    try {
      store.removeItem(key);
    } catch {
      // Ignore a storage backend that refuses deletes.
    }
    return null;
  }
}

export function writeQuizSave(save: QuizSave, storage?: Store | null): void {
  const store = storeOr(storage);
  if (!store) return;
  try {
    store.setItem(quizSaveKey(save.variant, save.category), JSON.stringify(save));
  } catch {
    // Private mode or a full disk: the run still continues in memory.
  }
}

export function removeQuizSave(
  variant: "operator" | "skill",
  category?: CategoryId | null,
  storage?: Store | null,
): void {
  const store = storeOr(storage);
  if (!store) return;
  try {
    store.removeItem(quizSaveKey(variant, category));
  } catch {
    // The in-memory run is already moving on.
  }
}

export function clearQuizSaves(storage?: Store | null): void {
  const store = storeOr(storage);
  if (!store) return;
  const keys: string[] = [];
  for (let i = 0; i < store.length; i += 1) {
    const key = store.key(i);
    if (key?.startsWith(QUIZ_SAVE_PREFIX)) keys.push(key);
  }
  for (const key of keys) store.removeItem(key);
}

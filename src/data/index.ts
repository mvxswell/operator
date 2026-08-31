import { hashString } from "@/lib/random";
import type { CategoryId, DailyQuestion, Difficulty, Question } from "@/lib/types";
import { BOTTLENECK_QUESTIONS } from "./questions/bottleneck";
import { FINANCIAL_QUESTIONS } from "./questions/financial";
import { OPERATIONS_QUESTIONS } from "./questions/operations";
import { PEOPLE_QUESTIONS } from "./questions/people";
import { PRIORITIZATION_QUESTIONS } from "./questions/prioritization";
import { RESOURCE_QUESTIONS } from "./questions/resource";
import { SALES_QUESTIONS } from "./questions/sales";
import { STRATEGY_QUESTIONS } from "./questions/strategy";
import { DAILY_QUESTIONS } from "./daily";
import { QUICK_QUESTIONS } from "./quick";

/**
 * Single entry point to the question bank.
 *
 * Adding questions means adding to (or adding) a category file. Nothing else in
 * the app enumerates questions directly, so the bank can later be replaced by a
 * database query or an AI generator behind the same exports.
 */
export const QUESTION_BANK: Question[] = [
  ...BOTTLENECK_QUESTIONS,
  ...PRIORITIZATION_QUESTIONS,
  ...RESOURCE_QUESTIONS,
  ...FINANCIAL_QUESTIONS,
  ...SALES_QUESTIONS,
  ...OPERATIONS_QUESTIONS,
  ...PEOPLE_QUESTIONS,
  ...STRATEGY_QUESTIONS,
];

export { QUICK_QUESTIONS, DAILY_QUESTIONS };

export function questionsForCategory(category: CategoryId): Question[] {
  return QUESTION_BANK.filter((q) => q.category === category);
}

export function questionsAtDifficulty(difficulty: Difficulty): Question[] {
  return QUESTION_BANK.filter((q) => q.difficulty === difficulty);
}

export function findQuestion(id: string): Question | undefined {
  return QUESTION_BANK.find((q) => q.id === id);
}

/** Deterministic per-day pick so everyone gets the same scenario. */
export function dailyQuestionFor(dateKey: string): DailyQuestion {
  const index = hashString(dateKey) % DAILY_QUESTIONS.length;
  return DAILY_QUESTIONS[index];
}

export const BANK_STATS = {
  standard: QUESTION_BANK.length,
  quick: QUICK_QUESTIONS.length,
  daily: DAILY_QUESTIONS.length,
};

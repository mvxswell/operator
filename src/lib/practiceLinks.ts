import { CASES } from "../content/cases/catalog";
import type { CategoryId } from "./types";

/** Exact case first, then subskill, then a relevant category starting point. */
export function practiceFor(question: { id?: string; category: CategoryId; subskill?: string }) {
  return CASES.find((item) => item.questionId === question.id)
    ?? CASES.find((item) => item.category === question.category && item.subskill === question.subskill)
    ?? CASES.find((item) => item.category === question.category);
}

import type { CategoryId, Question } from "../../lib/types";

export const CASE_TOPICS = ["Finance", "Pricing", "Operations", "Growth", "Strategy", "People", "Capital Allocation", "Crisis"] as const;
export type CaseTopic = typeof CASE_TOPICS[number];
export interface CaseMeta {
  questionId: string; slug: string; title: string; description: string;
  topic: CaseTopic; category: CategoryId; subskill: string; industry: string;
  guideSlug: string; guideTitle: string;
}
export type PublicCase = Pick<Question, "id" | "category" | "subskill" | "industry" | "difficulty" | "scenario" | "prompt" | "data" | "choices">;
export interface CaseSolution { correctChoiceId: string; explanation: string; work: string[]; takeaway: string; }

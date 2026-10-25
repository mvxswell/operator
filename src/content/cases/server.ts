// Build-time use only. Explicit fields prevent solution data entering page props.
import { QUESTION_BANK } from "../../data";
import { CASES } from "./catalog";
import facts from "./facts.json";
import type { PublicCase } from "./types";

export function publicCaseFor(slug: string): PublicCase | null {
  const entry = CASES.find((item) => item.slug === slug);
  const q = QUESTION_BANK.find((item) => item.id === entry?.questionId);
  if (!q) return null;
  const rows = (facts as Record<string, string[][]>)[q.id];
  const data = q.data ?? (rows ? { columns: ["Given fact", "Scenario data"], rows: rows.map(([label, value]) => ({ label, values: [value] })) } : undefined);
  return { id: q.id, category: q.category, subskill: q.subskill, industry: q.industry, difficulty: q.difficulty, scenario: q.scenario, prompt: q.prompt, ...(data ? { data } : {}), choices: q.choices };
}

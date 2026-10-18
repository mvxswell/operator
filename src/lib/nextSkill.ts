import { CATEGORY_IDS } from "./categories";
import type { CategoryId } from "./types";

/** Next skill to train after a single-skill test: an untried skill, or the lowest best. */
export function nextSkillToTrain(
  current: CategoryId,
  skills: Partial<Record<CategoryId, { best: number; runs: readonly unknown[] }>>,
): CategoryId {
  const others = CATEGORY_IDS.filter((id) => id !== current);
  const untried = others.find((id) => (skills[id]?.runs.length ?? 0) === 0);
  if (untried) return untried;
  return others.reduce((lowest, id) => {
    const best = skills[id]?.best ?? 0;
    const lowestBest = skills[lowest]?.best ?? 0;
    return best < lowestBest ? id : lowest;
  }, others[0]);
}

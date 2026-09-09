import type { QuickQuestion } from "./types";

/** Preserve the difficulty ramp, favor unseen cards, then recycle oldest first. */
export function selectQuickQuestion(pool: readonly QuickQuestion[], target: number, used: ReadonlySet<string>, recent: readonly string[], random = Math.random): QuickQuestion {
  if (!pool.length) throw new Error("Quick Decisions needs at least one scenario.");
  let available = pool.filter((question) => !used.has(question.id));
  if (!available.length) available = [...pool];
  const distance = Math.min(...available.map((question) => Math.abs(question.difficulty - target)));
  const candidates = available.filter((question) => Math.abs(question.difficulty - target) === distance);
  const oldest = Math.min(...candidates.map((question) => recent.indexOf(question.id)));
  const fresh = candidates.filter((question) => recent.indexOf(question.id) === oldest);
  return fresh[Math.min(fresh.length - 1, Math.max(0, Math.floor(random() * fresh.length)))];
}

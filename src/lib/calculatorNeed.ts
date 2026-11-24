import type { DataBlock, Question } from "./types";

/**
 * The scratch calculator is only useful when a question asks the player to
 * work figures. Judgment-only scenarios leave the phone dock off the screen.
 */
export function questionNeedsCalculator(question: Pick<Question, "work" | "data">): boolean {
  if (question.work?.some((step) => step.trim().length > 0)) return true;
  return dataHasDigit(question.data);
}

function dataHasDigit(data: DataBlock | undefined): boolean {
  if (!data) return false;
  const cells = [
    ...(data.columns ?? []),
    ...data.rows.flatMap((row) => [row.label, ...row.values]),
    data.note ?? "",
  ];
  return cells.some((cell) => /\d/.test(cell));
}

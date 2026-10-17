import type { Guide } from "./types";

export function guidePlainText(guide: Guide): string {
  const parts: string[] = [guide.answer];
  for (const block of guide.blocks) {
    if (block.type === "p" || block.type === "h2" || block.type === "h3") parts.push(block.text);
    if (block.type === "ol" || block.type === "ul" || block.type === "panel") parts.push(...block.items);
    if (block.type === "table") parts.push(...block.columns, ...block.rows.flat());
  }
  const scenario = guide.scenario;
  parts.push(
    scenario.scenario,
    scenario.prompt,
    scenario.explanation,
    ...scenario.choices.map((choice) => choice.text),
    ...(scenario.work ?? []),
  );
  for (const faq of guide.faqs) parts.push(faq.question, faq.answer);
  return parts.join(" ");
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function guideWordCount(guide: Guide): number {
  return wordCount(guidePlainText(guide));
}

/** About 220 words a minute of this prose. */
export function readMinutes(guide: Guide): number {
  return Math.max(1, Math.round(guideWordCount(guide) / 220));
}

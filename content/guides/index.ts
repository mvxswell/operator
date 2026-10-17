import type { CategoryId } from "@/lib/types";
import { peopleGuides } from "./people";
import { financialGuides } from "./financial";
import { bottleneckGuides } from "./bottleneck";
import { salesGuides } from "./sales";
import { operationsGuides } from "./operations";
import { strategyGuides } from "./strategy";
import { resourceGuides } from "./resource";
import { prioritizationGuides } from "./prioritization";

export interface Guide {
  slug: string;
  title: string;
  description: string;
  skill: CategoryId;
  minutes: number;
  intro: string;
  steps: { title: string; paragraphs: string[] }[];
  framework: { title: string; items: string[] };
  workedExample: { title: string; paragraphs: string[] };
  mistakes: string[];
  scenario: { text: string; prompt: string; choices: [string, string, string, string]; correct: number; explanation: string };
  faq: { question: string; answer: string }[];
  related: string[];
}

export const GUIDES: Guide[] = [
  ...peopleGuides, ...financialGuides, ...bottleneckGuides, ...salesGuides,
  ...operationsGuides, ...strategyGuides, ...resourceGuides, ...prioritizationGuides,
];
export const GUIDE_SLUGS = GUIDES.map((guide) => guide.slug);
export function guideForSlug(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

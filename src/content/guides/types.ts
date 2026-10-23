import type { CategoryId } from "@/lib/types";

export interface GuideScenario {
  industry: string;
  scenario: string;
  prompt: string;
  choices: { id: string; text: string }[];
  correctChoiceId: string;
  explanation: string;
  work?: string[];
}

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ol"; items: string[] }
  | { type: "ul"; items: string[] }
  | { type: "panel"; items: string[] }
  | { type: "table"; columns: string[]; rows: string[][] }
  | { type: "scenario" };

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideLink {
  href: string;
  label: string;
}

export interface Guide {
  datePublished?: string;
  dateModified?: string;
  slug: string;
  skill: CategoryId;
  title: string;
  description: string;
  /** One or two sentences. This is the opening paragraph. */
  answer: string;
  blocks: GuideBlock[];
  scenario: GuideScenario;
  faqs: GuideFaq[];
  related: string[];
  /** Extra buttons beside the skill test and Quick Decisions. */
  extraLinks?: GuideLink[];
}

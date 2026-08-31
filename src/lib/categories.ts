import type { CategoryId } from "./types";

export interface CategoryMeta {
  id: CategoryId;
  name: string;
  /** Short line used on cards and the results breakdown. */
  blurb: string;
  /** One-sentence description of what the skill actually is. */
  description: string;
  /** Inline SVG path data (24x24 viewBox), stroked. */
  icon: string;
  /** Tailwind-free raw hex used for accent rings and bars. */
  accent: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "bottleneck",
    name: "Bottleneck Detection",
    blurb: "Find the real constraint",
    description:
      "Spotting the one step that caps the whole system, and refusing to invest anywhere else until it moves.",
    icon: "M3 6h18M6 12h12M10 18h4",
    accent: "#5eead4",
  },
  {
    id: "prioritization",
    name: "Prioritization",
    blurb: "Sequence what matters",
    description:
      "Choosing what to do first when everything looks urgent, and deciding what not to do at all.",
    icon: "M4 6h10M4 12h16M4 18h6",
    accent: "#93c5fd",
  },
  {
    id: "resource",
    name: "Resource Allocation",
    blurb: "Deploy capital and people",
    description:
      "Putting limited money, time and headcount where the return is highest, including the cost of not choosing.",
    icon: "M12 3v18M4 8h5a3 3 0 0 1 0 6H4M20 8h-5a3 3 0 0 0 0 6h5",
    accent: "#c4b5fd",
  },
  {
    id: "financial",
    name: "Financial Judgment",
    blurb: "Read the money",
    description:
      "Understanding margin, cash flow, unit economics and payback well enough to tell healthy growth from expensive growth.",
    icon: "M4 19V5m0 14h16M8 15l3-4 3 3 4-6",
    accent: "#fcd34d",
  },
  {
    id: "sales",
    name: "Sales & Marketing",
    blurb: "Diagnose the funnel",
    description:
      "Locating where demand is actually breaking — traffic, leads, appointments, close rate — before spending more.",
    icon: "M3 5h18l-7 8v6l-4 2v-8z",
    accent: "#fda4af",
  },
  {
    id: "operations",
    name: "Operations",
    blurb: "Make throughput reliable",
    description:
      "Improving how work actually gets done: cycle time, quality, rework, scheduling and standardization.",
    icon: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M12 2v3m0 14v3M4.2 4.2l2.1 2.1m11.4 11.4 2.1 2.1M2 12h3m14 0h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1",
    accent: "#7dd3fc",
  },
  {
    id: "people",
    name: "People & Delegation",
    blurb: "Get leverage from others",
    description:
      "Deciding who does what, when to hire, when to train, when to remove, and what only you can do.",
    icon: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6M2 20a6 6 0 0 1 12 0M17 11a3 3 0 1 0 0-6M16 20h6a5 5 0 0 0-4-4.9",
    accent: "#f9a8d4",
  },
  {
    id: "strategy",
    name: "Strategy",
    blurb: "Pick the right game",
    description:
      "Choosing where to compete and what tradeoffs to accept, weighing second-order effects over quick wins.",
    icon: "M12 21s7-4.6 7-10a7 7 0 1 0-14 0c0 5.4 7 10 7 10M12 11h.01",
    accent: "#a3e635",
  },
];

export const CATEGORY_MAP: Record<CategoryId, CategoryMeta> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, CategoryMeta>;

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id);

export function categoryName(id: CategoryId): string {
  return CATEGORY_MAP[id]?.name ?? id;
}

/** URL slug <-> id. Ids are already slug-safe, kept as a seam for renaming. */
export function categoryFromSlug(slug: string): CategoryId | null {
  return CATEGORY_IDS.includes(slug as CategoryId) ? (slug as CategoryId) : null;
}

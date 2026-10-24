import type { CategoryId } from "./types";

export interface DailyGuideLink {
  slug: string;
  title: string;
}

/**
 * One stable guide per skill for the daily verdict.
 * Slugs are the public collection; the client does not import guide bodies.
 */
export const DAILY_GUIDE_BY_SKILL: Record<CategoryId, DailyGuideLink> = {
  bottleneck: {
    slug: "how-to-find-the-bottleneck",
    title: "How to Find the Bottleneck in Your Business",
  },
  prioritization: {
    slug: "how-to-prioritize",
    title: "How to Prioritize as a Business Owner",
  },
  resource: {
    slug: "where-to-invest-next-dollar",
    title: "How to Allocate a Limited Budget",
  },
  financial: {
    slug: "how-to-improve-cash-flow",
    title: "How to Improve Cash Flow in a Small Business",
  },
  sales: {
    slug: "why-are-sales-down",
    title: "Why Are Sales Down",
  },
  operations: {
    slug: "how-to-scale-operations",
    title: "How to Scale Operations Without Losing Quality",
  },
  people: {
    slug: "how-to-delegate",
    title: "How to Delegate as a Business Owner",
  },
  strategy: {
    slug: "should-you-expand",
    title: "How to Decide Whether to Expand to a New Location or Market",
  },
};

export function guideForSkill(category: CategoryId): DailyGuideLink {
  return DAILY_GUIDE_BY_SKILL[category];
}

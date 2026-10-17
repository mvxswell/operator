import type { Metadata } from "next";
import { CATEGORIES } from "./categories";
import { GUIDE_SLUGS } from "@/content/guides";
import { leaderboardEnabled } from "./leaderboard";

export const SITE_ORIGIN = "https://thinkoperator.com";

export const HOME = {
  title: "Think Operator — Test your business judgment",
  description:
    "Test your judgment across real-world business scenarios. Train your weaknesses. Make better decisions faster.",
};

/** Public routes, in sitemap order. The prose demo is intentionally absent. */
export const PUBLIC_PAGES: { path: string; title: string; description: string }[] = [
  { path: "/", ...HOME },
  {
    path: "/operator",
    title: "Operator Test — Think Operator",
    description:
      "Twenty adaptive business scenarios. Finish with an Operator Score and a breakdown across all eight skills.",
  },
  {
    path: "/quick",
    title: "Quick Decisions — Think Operator",
    description:
      "Two choices and sixty seconds. Score correct decisions per minute, then replay immediately.",
  },
  {
    path: "/skills",
    title: "Skill Tests — Think Operator",
    description:
      "Focused tests for one business skill at a time. Ten questions, one score, and a personal best to beat.",
  },
  {
    path: "/daily",
    title: "Daily Decision — Think Operator",
    description:
      "One business scenario a day. Make the call, read the explanation, and build a training habit.",
  },
  {
    path: "/progress",
    title: "My Progress — Think Operator",
    description:
      "Your Operator Score trend, skill bests, streaks, and recent sessions, stored in this browser.",
  },
  {
    path: "/privacy",
    title: "Your data — Think Operator",
    description:
      "How browser progress and optional public leaderboard posts are stored, plus what the online counter sends and how to export or delete local progress.",
  },
  { path: "/guides", title: "Business decision guides — Think Operator", description: "Practical guides for better decisions in hiring, pricing, cash flow, operations, sales and strategy." },
  ...(leaderboardEnabled ? [{ path: "/leaderboard", title: "Leaderboard — Think Operator", description: "Compare scores across Think Operator tests." }] : []),
];

export function pageMetadata(path: string): Metadata {
  const page = PUBLIC_PAGES.find((entry) => entry.path === path);
  if (!page) throw new Error(`No metadata for ${path}`);
  return { title: page.title, description: page.description };
}

export function skillMetadata(name: string, description: string): Metadata {
  return {
    title: `${name} skill test — Think Operator`,
    description,
  };
}

/** Canonical production URL, with the trailing slash GitHub Pages serves. */
export function absoluteUrl(path: string): string {
  if (path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path.endsWith("/") ? path : `${path}/`}`;
}

export function sitemapEntries(): { path: string }[] {
  return [
    ...PUBLIC_PAGES.map((page) => ({ path: page.path })),
    ...CATEGORIES.map((category) => ({ path: `/skills/${category.id}` })),
    ...GUIDE_SLUGS.map((slug) => ({ path: `/guides/${slug}` })),
  ];
}

import type { Metadata } from "next";
import { CATEGORIES } from "./categories";

export const SITE_ORIGIN = "https://thinkoperator.com";

export const HOME = {
  title: "Think Operator — Test your business judgment",
  description:
    "Test your judgment across real-world business scenarios. Train your weaknesses. Make better decisions faster.",
};

/** Public routes, in sitemap order. Guide articles are added beside this list. */
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
      "One shared business scenario a day. Make the call, read the tradeoff, and keep a streak that counts only on the day you show up.",
  },
  {
    path: "/progress",
    title: "My Progress — Think Operator",
    description:
      "Your Operator Score trend, skill bests, streaks, and recent sessions, stored in this browser.",
  },
  {
    path: "/badges",
    title: "Badges — Think Operator",
    description:
      "Badges earned in this browser for finishing quizzes, reaching a score, keeping a daily streak, placing in the top 10, and sharing a result.",
  },
  {
    path: "/guides",
    title: "Guides — Think Operator",
    description:
      "Practical guides for owners who need a decision: delegation, hiring, pricing, cash, bottlenecks, sales, systems, and where your next dollar should go.",
  },
  {
    path: "/leaderboard",
    title: "Leaderboard — Think Operator",
    description:
      "A separate board for the Operator Test, Quick Decisions, and each skill test. Highest score wins. A faster finish breaks a tie.",
  },
  {
    path: "/privacy",
    title: "Your data — Think Operator",
    description:
      "Scores stay in this browser. What is stored, what the online counter and anonymous event counts send, and how to export or delete progress.",
  },
];

export function pageMetadata(path: string): Metadata {
  const page = PUBLIC_PAGES.find((entry) => entry.path === path);
  if (!page) throw new Error(`No metadata for ${path}`);
  return socialMetadata(page.title, page.description, path);
}

export function skillMetadata(name: string, description: string): Metadata {
  const category = CATEGORIES.find((entry) => entry.name === name);
  return socialMetadata(`${name} skill test — Think Operator`, description, `/skills/${category?.id ?? ""}`);
}

/** Same line as src/app/opengraph-image.alt.txt, the image /privacy used before explicit social metadata. */
const BRAND_SHARE_ALT =
  "Think Operator — Test your judgment. Train your weaknesses. Make better decisions faster.";

function shareImage(url: string, alt: string) {
  return [{ url, width: 1200, height: 630, alt }];
}

/** Explicit social copy and static previews without a runtime image route. */
function socialMetadata(title: string, description: string, path: string): Metadata {
  const quiz = path.split("/").at(-1)!;
  const isQuiz = ["operator", "quick", "daily"].includes(quiz) || path.startsWith("/skills/");
  // Quiz pages use their preview. /privacy sets Open Graph on the page, which drops the
  // root opengraph-image file, so the brand image is attached here. Other pages still
  // inherit that file from their layout and must not list it a second time.
  const images = isQuiz ? shareImage(`/og/quizzes/${quiz}.png`, title) : undefined;
  const privacyImage = path === "/privacy" ? shareImage("/opengraph-image.png", BRAND_SHARE_ALT) : undefined;
  const privacyTwitter = path === "/privacy" ? shareImage("/twitter-image.png", BRAND_SHARE_ALT) : undefined;
  const openGraphImages = images ?? privacyImage;
  const twitterImages = images ?? privacyTwitter;
  return {
    title, description,
    openGraph: { title, description, siteName: "Think Operator", type: "website", url: absoluteUrl(path), ...(openGraphImages ? { images: openGraphImages } : {}) },
    twitter: { card: "summary_large_image", title, description, ...(twitterImages ? { images: twitterImages } : {}) },
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
  ];
}

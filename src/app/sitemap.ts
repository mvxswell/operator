import type { MetadataRoute } from "next";
import { GUIDES } from "@/content/guides/collection";
import { TEST_LANDINGS } from "@/content/tests";
import { leaderboardConfigured } from "@/lib/leaderboardConfig";
import { absoluteUrl, sitemapEntries } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = [
    ...sitemapEntries().filter((entry) => entry.path !== "/leaderboard" || leaderboardConfigured()),
    ...GUIDES.map((guide) => ({ path: `/guides/${guide.slug}` })),
    { path: "/tests" },
    ...TEST_LANDINGS.map((test) => ({ path: `/tests/${test.id}` })),
  ];
  return entries.map((entry) => ({
    url: absoluteUrl(entry.path),
    changeFrequency: entry.path === "/" ? "weekly" : "monthly",
    priority:
      entry.path === "/"
        ? 1
        : entry.path.startsWith("/skills/")
          ? 0.6
          : entry.path.startsWith("/guides/")
            ? 0.7
            : 0.8,
  }));
}

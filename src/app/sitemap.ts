import type { MetadataRoute } from "next";
import { GUIDES } from "@/content/guides";
import { leaderboardConfigured } from "@/lib/leaderboardConfig";
import { absoluteUrl, sitemapEntries } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = [
    ...sitemapEntries().filter((entry) => entry.path !== "/leaderboard" || leaderboardConfigured()),
    ...GUIDES.map((guide) => ({ path: `/guides/${guide.slug}` })),
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

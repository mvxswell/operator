import type { MetadataRoute } from "next";
import { absoluteUrl, sitemapEntries } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries().map((entry) => ({
    url: absoluteUrl(entry.path),
    changeFrequency: entry.path === "/" ? "weekly" : "monthly",
    priority: entry.path === "/" ? 1 : entry.path.startsWith("/skills/") ? 0.6 : 0.8,
  }));
}

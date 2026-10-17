import type { Metadata } from "next";
import { leaderboardConfigured } from "@/lib/leaderboardConfig";
import { pageMetadata } from "@/lib/site";

const base = pageMetadata("/leaderboard");

export const metadata: Metadata = leaderboardConfigured()
  ? base
  : { ...base, robots: { index: false, follow: false } };

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}

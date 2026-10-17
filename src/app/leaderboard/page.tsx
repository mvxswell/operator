import type { Metadata } from "next";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { leaderboardEnabled } from "@/lib/leaderboard";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Leaderboard — Think Operator",
  description: "Compare Operator Test, Quick Decisions, and skill test scores with other Think Operator players.",
  alternates: { canonical: absoluteUrl("/leaderboard") },
};

export default function LeaderboardPage() {
  if (!leaderboardEnabled) return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-muted">
      <h1 className="text-3xl font-semibold text-ink">Leaderboard unavailable</h1>
      <p className="mt-3">The community leaderboard has not been configured yet. Your test results still stay in this browser.</p>
    </div>
  );
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent">Community scores</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Leaderboard</h1>
      <p className="mb-8 mt-3 max-w-2xl text-sm leading-relaxed text-muted">One best run per nickname in each mode. Scores are self-posted by players.</p>
      <LeaderboardTable />
    </div>
  );
}

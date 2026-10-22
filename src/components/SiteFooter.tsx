import Link from "next/link";
import { leaderboardVisible } from "@/lib/leaderboardConfig";

export function SiteFooter() {
  return (
    <footer className="border-t border-line-soft py-8 text-[12px] text-faint">
      <span className="font-medium text-muted">Think Operator</span> · Scores and history are stored in this browser.
      <Link href="/guides" className="ml-3 underline">
        Guides
      </Link>
      {leaderboardVisible() ? (
        <Link href="/leaderboard" className="ml-3 underline">
          Leaderboard
        </Link>
      ) : null}
      <Link href="/badges" className="ml-3 underline">
        Badges
      </Link>
      <Link href="/progress" className="ml-3 underline">
        My progress
      </Link>
      <Link href="/privacy" className="ml-3 underline">
        Your data
      </Link>
    </footer>
  );
}

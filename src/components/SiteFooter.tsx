import Link from "next/link";
import { leaderboardVisible } from "@/lib/leaderboardConfig";

export function SiteFooter() {
  return (
    <footer className="border-t border-line-soft py-8 text-[12px] text-faint">
      <span className="font-medium text-muted">Think Operator</span> · Scores and history are stored in this browser.
      <Link prefetch={false} href="/guides/" className="ml-3 underline">
        Guides
      </Link>
      <Link prefetch={false} href="/cases/" className="ml-3 underline">Cases</Link>
      <Link prefetch={false} href="/tests/" className="ml-3 underline">Tests</Link>
      {leaderboardVisible() ? (
        <Link prefetch={false} href="/leaderboard/" className="ml-3 underline">
          Leaderboard
        </Link>
      ) : null}
      <Link prefetch={false} href="/badges/" className="ml-3 underline">
        Badges
      </Link>
      <Link prefetch={false} href="/progress/" className="ml-3 underline">
        My progress
      </Link>
      <Link prefetch={false} href="/privacy/" className="ml-3 underline">
        Your data
      </Link>
    </footer>
  );
}

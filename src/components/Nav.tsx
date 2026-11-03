"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { dailyHabitStatus } from "@/lib/dailyStreak";
import { leaderboardVisible } from "@/lib/leaderboardConfig";
import { blockQuizLeave } from "@/lib/quizGuard";
import { sameSitePath, siteHref } from "@/lib/site";
import { todayKey } from "@/lib/storage";
import { useProfile } from "@/lib/useProfile";
import { BrandLogo } from "./BrandLogo";
import { OnlineNow } from "./OnlineNow";

type NavLink = { href: string; label: string; compact: string };

/**
 * /togi/ ships its own CSP (connect-src adds the Togi feed, see
 * scripts/secure-export.mjs). A client-side transition would keep the previous
 * page's CSP and block the feed, so this link is a plain <a> (full document load).
 */
const TOGI_HREF = "/togi/";

const LINKS: NavLink[] = [
  { href: "/operator/", label: "Operator Test", compact: "Operator" },
  { href: "/quick/", label: "Quick Decisions", compact: "Quick" },
  { href: "/skills/", label: "Skills", compact: "Skills" },
  { href: "/cases/", label: "Cases", compact: "Cases" },
  { href: "/guides/", label: "Guides", compact: "Guides" },
  { href: "/daily/", label: "Daily", compact: "Daily" },
  ...(leaderboardVisible()
    ? [{ href: "/leaderboard/", label: "Leaderboard", compact: "Leaderboard" }]
    : []),
  { href: "/badges/", label: "Badges", compact: "Badges" },
  { href: "/progress/", label: "My progress", compact: "Progress" },
];

export function Nav() {
  const pathname = usePathname();
  const { profile, hydrated } = useProfile();
  const daily = hydrated ? dailyHabitStatus(profile.daily, todayKey()) : null;

  const isActive = (href: string) => {
    const current = siteHref(pathname.split(/[?#]/)[0] || "/");
    const target = siteHref(href.split(/[?#]/)[0] || "/");
    if (target === "/") return current === "/";
    return current === target || current.startsWith(target);
  };

  const leaveIfNeeded = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (sameSitePath(pathname, href)) return;
    blockQuizLeave(event);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-bg/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 sm:px-6 lg:flex-nowrap lg:gap-6">
        <Link prefetch={false}
          href="/"
          aria-label="ThinkOperator home"
          className="flex h-10 shrink-0 items-center"
          onClick={(event) => leaveIfNeeded(event, "/")}
        >
          <BrandLogo />
        </Link>

        <div className="order-last flex w-full flex-wrap gap-1 lg:order-none lg:min-w-0 lg:flex-1">
          {LINKS.map((link) => (
            <Link prefetch={false}
              key={link.href}
              href={link.href}
              aria-label={sameSitePath(link.href, "/daily/") ? dailyLinkLabel(daily) : undefined}
              onClick={(event) => leaveIfNeeded(event, link.href)}
              className={`shrink-0 rounded-md px-2.5 py-1.5 text-[13px] transition-colors sm:px-3 lg:px-2.5 ${
                isActive(link.href)
                  ? "bg-surface-2 text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              <span className="inline-flex items-center gap-1">
                <span className="lg:hidden">{link.compact}</span>
                <span className="hidden lg:inline">{link.label}</span>
                {sameSitePath(link.href, "/daily/") ? <DailyMark status={daily} /> : null}
              </span>
            </Link>
          ))}
        </div>

        {/* No reserved width: the badge only takes space while it is visible. */}
        {/* Logo row on mobile (the links wrap below), last item on desktop. */}
        <div className="ml-auto flex h-10 shrink-0 items-center gap-2 lg:ml-0">
          <a
            href={TOGI_HREF}
            aria-current={isActive(TOGI_HREF) ? "page" : undefined}
            onClick={(event) => leaveIfNeeded(event, TOGI_HREF)}
            className={`inline-flex h-7 items-center whitespace-nowrap rounded-full border px-3 text-[12px] font-semibold leading-none tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
              isActive(TOGI_HREF)
                ? "border-accent bg-accent-soft text-accent"
                : "border-accent/60 text-accent hover:border-accent hover:bg-accent-soft"
            }`}
          >
            Togi Tracker
          </a>
          <OnlineNow />
        </div>
      </nav>
    </header>
  );
}

function dailyLinkLabel(status: { answeredToday: boolean; streak: number } | null): string | undefined {
  if (!status) return undefined;
  if (status.answeredToday) {
    const days = status.streak === 1 ? "1-day streak" : `${status.streak}-day streak`;
    return `Daily, completed today, ${days}`;
  }
  return "Daily, today's call waiting";
}

/** Fixed-width slot so the dot or streak count does not move the nav when it hydrates. */
function DailyMark({ status }: { status: { answeredToday: boolean; streak: number } | null }) {
  return (
    <span className="inline-grid h-4 w-6 place-items-center" aria-hidden="true">
      {status?.answeredToday ? (
        <span className="tabular text-[10px] font-semibold leading-none text-accent">{status.streak}</span>
      ) : status ? (
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      ) : null}
    </span>
  );
}

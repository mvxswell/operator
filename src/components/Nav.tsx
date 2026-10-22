"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { leaderboardVisible } from "@/lib/leaderboardConfig";
import { blockQuizLeave } from "@/lib/quizGuard";
import { BrandLogo } from "./BrandLogo";
import { OnlineNow } from "./OnlineNow";

const LINKS = [
  { href: "/operator", label: "Operator Test", compact: "Operator" },
  { href: "/quick", label: "Quick Decisions", compact: "Quick" },
  { href: "/skills", label: "Skills", compact: "Skills" },
  { href: "/guides", label: "Guides", compact: "Guides" },
  { href: "/daily", label: "Daily", compact: "Daily" },
  ...(leaderboardVisible()
    ? [{ href: "/leaderboard", label: "Leaderboard", compact: "Leaderboard" }]
    : []),
  { href: "/badges", label: "Badges", compact: "Badges" },
  { href: "/progress", label: "My progress", compact: "Progress" },
];

export function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const leaveIfNeeded = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === href) return;
    blockQuizLeave(event);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-bg/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 sm:px-6 lg:flex-nowrap lg:gap-6">
        <Link
          href="/"
          aria-label="Think Operator home"
          className="flex h-10 shrink-0 items-center"
          onClick={(event) => leaveIfNeeded(event, "/")}
        >
          <BrandLogo />
        </Link>

        <div className="order-last flex w-full flex-wrap gap-1 lg:order-none lg:min-w-0 lg:flex-1">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(event) => leaveIfNeeded(event, link.href)}
              className={`shrink-0 rounded-md px-2.5 py-1.5 text-[13px] transition-colors sm:px-3 ${
                isActive(link.href)
                  ? "bg-surface-2 text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              <span className="lg:hidden">{link.compact}</span>
              <span className="hidden lg:inline">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* No reserved width: the badge only takes space while it is visible. */}
        <div className="ml-auto flex h-10 shrink-0 items-center lg:ml-0">
          <OnlineNow />
        </div>
      </nav>
    </header>
  );
}

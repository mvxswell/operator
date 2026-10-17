"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { leaderboardVisible } from "@/lib/leaderboardConfig";
import { BrandLogo } from "./BrandLogo";
import { OnlineNow } from "./OnlineNow";

const LINKS = [
  { href: "/operator", label: "Operator Test", short: "Operator" },
  { href: "/quick", label: "Quick Decisions", short: "Quick" },
  { href: "/skills", label: "Skills", short: "Skills" },
  { href: "/guides", label: "Guides", short: "Guides" },
  { href: "/daily", label: "Daily", short: "Daily" },
  ...(leaderboardVisible()
    ? [{ href: "/leaderboard", label: "Leaderboard", short: "Board" }]
    : []),
  { href: "/progress", label: "My progress", short: "Progress" },
];

export function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-bg/85 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" aria-label="Think Operator home" className="group flex shrink-0 items-center gap-2">
          <BrandLogo />
        </Link>

        <div className="-mx-4 flex flex-1 items-center gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 rounded-md px-3 py-1.5 text-[13px] transition-colors ${
                isActive(link.href)
                  ? "bg-surface-2 text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              <span className="sm:hidden">{link.short}</span>
              <span className="hidden sm:inline">{link.label}</span>
            </Link>
          ))}
        </div>
        {/* Fixed slot so the badge can appear without shifting the links. */}
        <div className="flex h-8 w-[6.75rem] shrink-0 items-center justify-end">
          <OnlineNow />
        </div>
      </nav>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/operator", label: "Operator Test", short: "Operator" },
  { href: "/quick", label: "Quick Decisions", short: "Quick" },
  { href: "/skills", label: "Skills", short: "Skills" },
  { href: "/daily", label: "Daily", short: "Daily" },
];

export function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-bg/85 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-[5px] bg-accent text-[13px] font-bold text-[#16120a]">
            O
          </span>
          <span className="hidden text-[13px] font-semibold tracking-[0.16em] text-ink sm:inline">
            OPERATOR
          </span>
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
      </nav>
    </header>
  );
}

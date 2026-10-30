"use client";

import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { celebrationSnapshot, dismissCelebrations, subscribeCelebrations } from "@/lib/badgeCelebration";
import { badgeById, badgeEventName } from "@/lib/badges";
import { track } from "@/lib/track";

export function BadgeEarned() {
  const pending = useSyncExternalStore(subscribeCelebrations, celebrationSnapshot, celebrationSnapshot);
  const announced = useRef<readonly string[]>([]);

  useEffect(() => {
    const previous = new Set(announced.current);
    for (const id of pending) {
      if (previous.has(id)) continue;
      const name = badgeEventName(id);
      if (name) track(name);
    }
    announced.current = pending;
  }, [pending]);

  const badges = pending.flatMap((id) => {
    const badge = badgeById(id);
    return badge ? [badge] : [];
  });

  useEffect(() => {
    document.body.style.paddingBottom = badges.length ? "11rem" : "";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [badges.length]);

  const heading = badges.length === 1 ? "Badge earned" : `${badges.length} badges earned`;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div
        role="status"
        aria-live="polite"
        className={
          badges.length === 0
            ? "sr-only"
            : "panel-depth pointer-events-auto mx-auto max-h-[50vh] w-full max-w-md overflow-y-auto rounded-xl border border-accent/40 bg-surface p-4 shadow-[0_18px_50px_rgba(0,0,0,0.45)] animate-[var(--animate-rise)]"
        }
      >
        {badges.length > 0 ? (
          <>
            <div className="flex items-start justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{heading}</p>
              <button
                type="button"
                className="min-h-11 shrink-0 rounded-md px-2 text-sm text-muted hover:text-ink"
                onClick={() => dismissCelebrations()}
              >
                Dismiss
              </button>
            </div>
            <ul className="mt-2 space-y-1">
              {badges.map((badge) => (
                <li key={badge.id} className="text-sm leading-snug text-ink">
                  <span className="font-semibold">{badge.name}</span>
                  <span className="text-muted"> — {badge.description}</span>
                </li>
              ))}
            </ul>
            <Link href="/badges/" className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-accent hover:text-ink">
              See all badges
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
}

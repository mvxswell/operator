"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { leaderboardVisible } from "@/lib/leaderboardConfig";
import { fetchLeaderboard, type BoardRow } from "@/lib/leaderboard";
import { Eyebrow } from "./ui";

export function LeaderboardTeaser() {
  const section = useRef<HTMLElement>(null);
  const [rows, setRows] = useState<BoardRow[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!leaderboardVisible()) return;
    let cancelled = false;
    const load = () => { if (cancelled) return; void fetchLeaderboard("operator", 5)
      .then((next) => {
        if (!cancelled) setRows(next);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      }); };
    const observer = typeof IntersectionObserver === "function" ? new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { observer?.disconnect(); load(); }
    }, { rootMargin: "100px" }) : null;
    if (observer && section.current) observer.observe(section.current);
    else load();
    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, []);

  if (!leaderboardVisible()) return null;

  return (
    <section ref={section} className="border-t border-line-soft py-14 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Eyebrow>Top 5</Eyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.01em] text-ink">Operator Test</h2>
        </div>
        <Link href="/leaderboard?quiz=operator" className="text-[13px] font-medium text-accent">
          Full leaderboard
        </Link>
      </div>
      <ol className="mt-6 divide-y divide-line-soft rounded-xl border border-line bg-surface">
        {rows?.map((row) => (
          <li key={row.rank} className="flex items-center gap-4 px-5 py-3.5">
            <span className="tabular w-6 text-sm text-muted">{row.rank}</span>
            <span className="min-w-0 flex-1 truncate text-sm text-ink">{row.nickname}</span>
            <span className="font-mono tabular text-sm text-ink">{row.score}</span>
          </li>
        ))}
        {rows === null && !failed ? <li className="px-5 py-4 text-sm text-muted">Loading scores…</li> : null}
        {rows && rows.length === 0 ? (
          <li className="px-5 py-4 text-sm text-muted">No scores posted yet.</li>
        ) : null}
        {failed ? <li className="px-5 py-4 text-sm text-muted">Scores could not be loaded.</li> : null}
      </ol>
    </section>
  );
}

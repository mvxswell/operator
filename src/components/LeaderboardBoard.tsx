"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";
import { leaderboardVisible } from "@/lib/leaderboardConfig";
import { fetchLeaderboard, rememberedNickname, subscribeNickname, type BoardRow } from "@/lib/leaderboard";
import { formatDuration, isLeaderboardMode } from "@/lib/leaderboardRules";
import { Eyebrow } from "./ui";

const TABS = [
  { id: "operator", label: "Operator Test" },
  { id: "quick", label: "Quick Decisions" },
  ...CATEGORIES.map((category) => ({ id: category.id, label: category.name })),
];

export function LeaderboardBoard() {
  const router = useRouter();
  const params = useSearchParams();
  const requested = params.get("mode") ?? "operator";
  const mode = isLeaderboardMode(requested) ? requested : "operator";
  const [loaded, setLoaded] = useState<{ mode: string; rows: BoardRow[]; error: string | null } | null>(null);
  const nickname = useSyncExternalStore(subscribeNickname, rememberedNickname, () => "");

  useEffect(() => {
    if (!leaderboardVisible()) return;
    let cancelled = false;
    fetchLeaderboard(mode, 50)
      .then((next) => {
        if (!cancelled) setLoaded({ mode, rows: next, error: null });
      })
      .catch((cause: unknown) => {
        if (!cancelled) {
          setLoaded({
            mode,
            rows: [],
            error: cause instanceof Error ? cause.message : "Could not load the leaderboard.",
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [mode]);

  const rows = loaded?.mode === mode ? loaded.rows : null;
  const error = loaded?.mode === mode ? loaded.error : null;

  if (!leaderboardVisible()) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Eyebrow>Leaderboard</Eyebrow>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-ink">Scores stay on this browser</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
          The public board is off until the site is connected to a database. Finish a test and your result still saves in this browser.
        </p>
        <Link href="/progress" className="mt-6 inline-block text-sm text-accent">
          My progress
        </Link>
      </div>
    );
  }

  const mine = nickname.trim().toLowerCase();
  const caption =
    mode === "quick"
      ? "Score is correct decisions per minute. Ties go to the faster run."
      : "Highest score ranks first. Ties go to the faster run.";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Eyebrow>Global board</Eyebrow>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">Leaderboard</h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">{caption}</p>

      <div className="-mx-4 mt-8 flex gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              if (tab.id === mode) return;
              router.replace(`/leaderboard?mode=${tab.id}`, { scroll: false });
            }}
            className={`shrink-0 rounded-md px-3 py-1.5 text-[13px] transition-colors ${
              mode === tab.id ? "bg-surface-2 text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="border-b border-line text-[11px] uppercase tracking-[0.12em] text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Rank</th>
              <th className="px-4 py-3 font-medium">Nickname</th>
              <th className="px-4 py-3 text-right font-medium">Score</th>
              <th className="px-4 py-3 text-right font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((row) => {
              const own = mine.length > 0 && row.nickname.trim().toLowerCase() === mine;
              return (
                <tr
                  key={`${row.rank}-${row.nickname}`}
                  className={`border-b border-line-soft last:border-0 ${own ? "bg-accent-soft text-ink" : ""}`}
                >
                  <td className={`tabular px-4 py-3 ${own ? "font-semibold text-accent" : "text-muted"}`}>
                    {row.rank}
                  </td>
                  <td className="px-4 py-3 text-ink">{row.nickname}</td>
                  <td className="font-mono tabular px-4 py-3 text-right text-ink">{row.score}</td>
                  <td className="tabular px-4 py-3 text-right text-muted">{formatDuration(row.durationMs)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows === null ? <p className="px-4 py-6 text-sm text-muted">Loading scores…</p> : null}
        {rows && rows.length === 0 && !error ? (
          <p className="px-4 py-6 text-sm text-muted">No scores for this mode yet.</p>
        ) : null}
        {error ? <p className="px-4 py-6 text-sm text-neg">{error}</p> : null}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";
import { leaderboardVisible } from "@/lib/leaderboardConfig";
import { fetchLeaderboard, rememberedNickname, subscribeNickname, type BoardRow } from "@/lib/leaderboard";
import { formatDuration, quizLabel, selectedQuiz } from "@/lib/leaderboardRules";
import { Eyebrow } from "./ui";

const TABS = [
  { id: "operator", label: "Operator Test" },
  { id: "quick", label: "Quick Decisions" },
  ...CATEGORIES.map((category) => ({ id: category.id, label: category.name })),
];

export function LeaderboardBoard() {
  const router = useRouter();
  const params = useSearchParams();
  const mode = selectedQuiz(params.get("quiz"), params.get("mode"));
  const label = quizLabel(mode);
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
        <Link href="/progress/" className="mt-6 inline-block text-sm text-accent">
          My progress
        </Link>
      </div>
    );
  }

  const mine = nickname.trim().toLowerCase();
  const caption =
    mode === "quick"
      ? "This board is only Quick Decisions. Score is correct decisions per minute. Ties go to the faster run."
      : "This board is only this quiz. Highest score ranks first. Ties go to the faster run.";
  const ownRow = rows?.find((row) => mine.length > 0 && row.nickname.trim().toLowerCase() === mine);

  function openQuiz(quiz: string) {
    if (quiz === mode) return;
    router.replace(`/leaderboard/?quiz=${quiz}`, { scroll: false });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Eyebrow>Leaderboard</Eyebrow>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">{label}</h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">{caption}</p>

      <label className="mt-8 block sm:hidden">
        <span className="sr-only">Quiz</span>
        <select
          value={mode}
          onChange={(event) => openQuiz(event.target.value)}
          className="h-12 w-full rounded-lg border border-line bg-surface-2 px-4 text-[15px] text-ink"
        >
          {TABS.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
      </label>

      <div className="-mx-4 mt-8 hidden gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:flex sm:px-0 [&::-webkit-scrollbar]:hidden">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            aria-current={mode === tab.id ? "true" : undefined}
            onClick={() => openQuiz(tab.id)}
            className={`shrink-0 rounded-md px-3 py-1.5 text-[13px] transition-colors ${
              mode === tab.id ? "bg-surface-2 text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {ownRow ? (
        <p className="mt-4 text-sm text-ink">
          Your rank on this quiz is <span className="font-semibold text-accent">#{ownRow.rank}</span>.
        </p>
      ) : null}

      <div className="mt-4 overflow-hidden rounded-xl border border-line bg-surface">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">{label} leaderboard</caption>
          <thead className="border-b border-line text-[11px] uppercase tracking-[0.12em] text-muted">
            <tr>
              <th className="px-3 py-3 font-medium sm:px-4">Rank</th>
              <th className="px-3 py-3 font-medium sm:px-4">Nickname</th>
              <th className="px-3 py-3 text-right font-medium sm:px-4">Score</th>
              <th className="px-3 py-3 text-right font-medium sm:px-4">Time</th>
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
                  <td className={`tabular px-3 py-3 sm:px-4 ${own ? "font-semibold text-accent" : "text-muted"}`}>
                    {row.rank}
                  </td>
                  <td className="max-w-[9rem] truncate px-3 py-3 text-ink sm:max-w-none sm:px-4">{row.nickname}</td>
                  <td className="font-mono tabular px-3 py-3 text-right text-ink sm:px-4">{row.score}</td>
                  <td className="tabular px-3 py-3 text-right text-muted sm:px-4">{formatDuration(row.durationMs)}</td>
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

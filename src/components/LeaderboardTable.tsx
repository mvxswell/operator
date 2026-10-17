"use client";

import { useEffect, useState } from "react";
import { CATEGORIES, CATEGORY_MAP } from "@/lib/categories";
import { formatDuration, getLeaderboard, type LeaderboardMode, type LeaderboardRow } from "@/lib/leaderboard";

const MODE_OPTIONS: { id: LeaderboardMode; name: string }[] = [
  { id: "operator", name: "Operator Test" }, { id: "quick", name: "Quick Decisions" },
  ...CATEGORIES.map((category) => ({ id: category.id, name: category.name })),
];

export function LeaderboardTable({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState<LeaderboardMode>("operator");
  const [rows, setRows] = useState<LeaderboardRow[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    getLeaderboard(mode, compact ? 5 : 50).then((result) => {
      if (!cancelled) { setRows(result); setStatus("ready"); }
    }).catch(() => { if (!cancelled) setStatus("error"); });
    return () => { cancelled = true; };
  }, [mode, compact]);

  return (
    <div>
      {!compact ? (
        <div role="tablist" aria-label="Leaderboard mode" className="mb-6 flex flex-wrap gap-2">
          {MODE_OPTIONS.map((option) => (
            <button key={option.id} type="button" role="tab" aria-selected={mode === option.id}
              onClick={() => {
                if (mode !== option.id) {
                  setRows([]);
                  setStatus("loading");
                  setMode(option.id);
                }
              }}
              className={`rounded-lg border px-3 py-2 text-sm transition-colors ${mode === option.id ? "border-accent/50 bg-accent-soft text-accent" : "border-line bg-surface text-muted hover:text-ink"}`}>
              {option.name}
            </button>
          ))}
        </div>
      ) : null}
      <div className="overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line text-[11px] uppercase tracking-[0.12em] text-muted">
            <tr><th className="px-4 py-3">Rank</th><th className="px-4 py-3">Nickname</th><th className="px-4 py-3 text-right">Score</th><th className="px-4 py-3 text-right">Time</th></tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {status === "ready" && rows.map((row) => (
              <tr key={row.id} className={row.is_mine ? "bg-accent-soft text-accent" : "text-ink"}>
                <td className="px-4 py-3">#{row.rank}</td>
                <td className="px-4 py-3 font-medium">{row.nickname}{row.is_mine ? <span className="ml-2 text-xs">You</span> : null}</td>
                <td className="px-4 py-3 text-right font-mono font-semibold tabular-nums">{row.score}</td>
                <td className="px-4 py-3 text-right text-muted">{formatDuration(row.duration_ms)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {status !== "ready" || rows.length === 0 ? (
          <p className="px-4 py-4 text-sm text-muted" role="status">
            {status === "loading" ? "Loading scores…" : status === "error" ? "Leaderboard unavailable right now." : "No scores yet. Be the first."}
          </p>
        ) : null}
      </div>
      {!compact && mode !== "operator" && mode !== "quick" ? (
        <p className="mt-3 text-xs text-faint">{CATEGORY_MAP[mode].name} uses the 0–1000 result-screen score.</p>
      ) : null}
    </div>
  );
}

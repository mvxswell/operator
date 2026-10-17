"use client";

import Link from "next/link";
import { useState } from "react";
import { postScore, rememberedNickname, type LeaderboardMode, leaderboardEnabled } from "@/lib/leaderboard";

export function PostScore({ mode, score, durationMs }: {
  mode: LeaderboardMode; score: number; durationMs: number;
}) {
  const [nickname, setNickname] = useState(rememberedNickname);
  const [state, setState] = useState<"ready" | "posting" | "posted">("ready");
  const [rank, setRank] = useState<number | null>(null);
  const [error, setError] = useState("");

  if (!leaderboardEnabled) return null;

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state !== "ready") return;
    if (!/^[A-Za-z0-9_ -]{2,20}$/.test(nickname) || !nickname.trim()) {
      setError("Use 2–20 letters, numbers, spaces, _ or -.");
      return;
    }
    setError("");
    setState("posting");
    try {
      const result = await postScore({ nickname, mode, score, durationMs });
      setRank(result.player_rank);
      setState("posted");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not post your score. Try again.");
      setState("ready");
    }
  }

  return (
    <section className="mt-10 rounded-xl border border-accent/25 bg-surface p-5 sm:p-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent">Community leaderboard</p>
      <h2 className="mt-2 text-xl font-semibold text-ink">Post to leaderboard</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">Optional. Pick a public nickname; no account is needed.</p>
      {state === "posted" ? (
        <div className="mt-4 text-sm text-ink" role="status">
          {rank ? `Posted — your rank is #${rank}.` : "Posted. Your previous best under this nickname ranks higher."}{" "}
          <Link href="/leaderboard" className="text-accent hover:underline">View leaderboard →</Link>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="flex-1 text-xs text-muted">
            Nickname
            <input
              value={nickname} onChange={(event) => setNickname(event.target.value)}
              minLength={2} maxLength={20} required pattern="[A-Za-z0-9_ -]{2,20}"
              autoComplete="nickname" aria-describedby={error ? "leaderboard-error" : undefined}
              className="mt-1.5 w-full rounded-lg border border-line bg-surface-2 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
            />
          </label>
          <button type="submit" disabled={state === "posting"}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg disabled:opacity-50">
            {state === "posting" ? "Posting…" : "Post score"}
          </button>
        </form>
      )}
      {error ? <p id="leaderboard-error" role="alert" className="mt-2 text-sm text-neg">{error}</p> : null}
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore, type FormEvent } from "react";
import { leaderboardVisible } from "@/lib/leaderboardConfig";
import {
  fetchLeaderboard,
  postScore,
  rememberedNickname,
  subscribeNickname,
  type BoardRow,
  type PostResult,
} from "@/lib/leaderboard";
import { formatDuration, nicknameError, quizBoardPath, quizLabel } from "@/lib/leaderboardRules";
import { track } from "@/lib/track";
import { Button } from "./ui";

export function PostScore({
  mode,
  score,
  durationMs,
}: {
  mode: string;
  score: number;
  durationMs: number;
}) {
  const savedNickname = useSyncExternalStore(subscribeNickname, rememberedNickname, () => "");
  const [draft, setDraft] = useState<string | null>(null);
  const nickname = draft ?? savedNickname;
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posted, setPosted] = useState<PostResult | null>(null);
  const label = quizLabel(mode);
  const boardHref = quizBoardPath(mode);

  if (!leaderboardVisible() || durationMs <= 0) return null;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const problem = nicknameError(nickname);
    if (problem) {
      setError(problem);
      return;
    }
    track("result:post");
    setPending(true);
    setError(null);
    try {
      setPosted(await postScore({ mode, score, durationMs, nickname }));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not reach the leaderboard. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="mt-8 rounded-xl border border-line bg-surface px-5 py-5">
      <h2 className="text-sm font-semibold text-ink">{label} leaderboard</h2>
      <p className="mt-1 text-sm text-muted">
        Optional. A nickname is enough. No account. This board ranks only this quiz.
      </p>
      {posted ? (
        <p className="mt-4 text-sm text-ink">
          {posted.isBest ? (
            <>
              You&apos;re ranked <span className="font-semibold text-accent">#{posted.rank}</span> on {label}.
            </>
          ) : (
            <>
              Posted. Your best run on {label} is{" "}
              <span className="font-semibold text-accent">#{posted.rank}</span>.
            </>
          )}{" "}
          <Link href={boardHref} className="text-accent underline-offset-2 hover:underline">
            View this quiz&apos;s leaderboard
          </Link>
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start">
          <label className="block flex-1">
            <span className="sr-only">Nickname</span>
            <input
              value={nickname}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={20}
              autoComplete="nickname"
              placeholder="Nickname"
              className="h-12 w-full rounded-lg border border-line bg-surface-2 px-4 text-[15px] text-ink outline-none placeholder:text-faint focus:border-accent"
            />
          </label>
          <Button type="submit" size="lg" disabled={pending}>
            {pending ? "Posting…" : "Post to leaderboard"}
          </Button>
        </form>
      )}
      {error ? <p className="mt-3 text-sm text-neg">{error}</p> : null}
      <QuizStandings mode={mode} href={boardHref} nickname={posted?.nickname ?? nickname} />
    </section>
  );
}

function QuizStandings({ mode, href, nickname }: { mode: string; href: string; nickname: string }) {
  const [rows, setRows] = useState<BoardRow[] | null>(null);
  const [failed, setFailed] = useState(false);
  const mine = nickname.trim().toLowerCase();

  useEffect(() => {
    let cancelled = false;
    fetchLeaderboard(mode, 5)
      .then((next) => {
        if (!cancelled) setRows(next);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [mode]);

  return (
    <div className="mt-5 border-t border-line-soft pt-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Top of this quiz</h3>
        <Link href={href} className="text-sm text-accent underline-offset-2 hover:underline">
          Full board
        </Link>
      </div>
      <ol className="mt-3 divide-y divide-line-soft">
        {rows?.map((row) => {
          const own = mine.length > 0 && row.nickname.trim().toLowerCase() === mine;
          return (
            <li key={row.rank} className={`flex items-center gap-3 py-2.5 text-sm ${own ? "text-accent" : ""}`}>
              <span className="tabular w-6 text-muted">{row.rank}</span>
              <span className="min-w-0 flex-1 truncate text-ink">{row.nickname}</span>
              <span className="tabular text-muted">{formatDuration(row.durationMs)}</span>
              <span className="font-mono tabular w-12 text-right text-ink">{row.score}</span>
            </li>
          );
        })}
        {rows === null && !failed ? <li className="py-2.5 text-sm text-muted">Loading scores…</li> : null}
        {rows && rows.length === 0 ? <li className="py-2.5 text-sm text-muted">No scores for this quiz yet.</li> : null}
        {failed ? <li className="py-2.5 text-sm text-muted">Scores could not be loaded.</li> : null}
      </ol>
    </div>
  );
}

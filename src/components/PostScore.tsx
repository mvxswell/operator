"use client";

import Link from "next/link";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import { leaderboardVisible } from "@/lib/leaderboardConfig";
import { postScore, rememberedNickname, subscribeNickname, type PostResult } from "@/lib/leaderboard";
import { nicknameError } from "@/lib/leaderboardRules";
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
      <h2 className="text-sm font-semibold text-ink">Post to leaderboard</h2>
      <p className="mt-1 text-sm text-muted">
        Optional. A nickname is enough. No account.
      </p>
      {posted ? (
        <p className="mt-4 text-sm text-ink">
          {posted.isBest ? (
            <>
              You&apos;re ranked <span className="font-semibold text-accent">#{posted.rank}</span>.
            </>
          ) : (
            <>
              Posted. Your best run on this board is{" "}
              <span className="font-semibold text-accent">#{posted.rank}</span>.
            </>
          )}{" "}
          <Link href={`/leaderboard?mode=${mode}`} className="text-accent underline-offset-2 hover:underline">
            View the leaderboard
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
    </section>
  );
}

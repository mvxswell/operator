"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { usePresenceCount, ONLINE_BADGE_MIN } from "@/components/OnlineNow";
import { dailyDecisionNumber, dailyPreviewFor } from "@/data/dailyPreview";
import { formatDailyDecisionNumber } from "@/data/dailyCycle";
import { CATEGORY_MAP } from "@/lib/categories";
import { dailyHabitStatus } from "@/lib/dailyStreak";
import { trackHome, type QuizCard, type TrackerCard } from "@/lib/homeEvents";
import { applyHomeVariant, HOME_VARIANT_ATTR, isHomeVariant, type HomeVariant } from "@/lib/homeVariant";
import { fetchLeaderboard, type BoardRow } from "@/lib/leaderboard";
import { leaderboardVisible } from "@/lib/leaderboardConfig";
import { todayKey } from "@/lib/storage";
import { useProfile } from "@/lib/useProfile";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function currentVariant(): HomeVariant {
  const value = typeof document === "undefined" ? null : document.documentElement.getAttribute(HOME_VARIANT_ATTR);
  return isHomeVariant(value) ? value : "a";
}

/** Applies the variant on client-side navigation and counts one home view. */
export function HomeVariantBoot() {
  useIsoLayoutEffect(() => {
    trackHome("view", applyHomeVariant());
  }, []);
  return null;
}

type TrackProps = { href: string; className?: string; children: ReactNode; ariaLabel?: string };

/** Tracker card link. /togi/ must be a full document load for its CSP, so it is a plain <a>. */
export function TrackerLink({ card, href, className, children, ariaLabel }: TrackProps & { card: TrackerCard }) {
  const onClick = () => trackHome("tracker", currentVariant(), card);
  if (card === "togi") {
    return <a href={href} className={className} aria-label={ariaLabel} onClick={onClick}>{children}</a>;
  }
  return <Link prefetch={false} href={href} className={className} aria-label={ariaLabel} onClick={onClick}>{children}</Link>;
}

export function QuizLink({ quiz, href, className, children, ariaLabel }: TrackProps & { quiz: QuizCard }) {
  return (
    <Link prefetch={false} href={href} className={className} aria-label={ariaLabel} onClick={() => trackHome("quiz", currentVariant(), quiz)}>
      {children}
    </Link>
  );
}

function useToday() {
  const { profile, hydrated } = useProfile();
  const dateKey = hydrated ? todayKey() : null;
  return { profile, hydrated, dateKey };
}

/** Ticker item: today's Daily Decision number and industry, after hydration. */
export function TickerDaily() {
  const { dateKey } = useToday();
  const number = dateKey ? dailyDecisionNumber(dateKey) : null;
  const question = dateKey ? dailyPreviewFor(dateKey) : null;
  return (
    <span className="hh-tick-v">
      {question && number !== null ? `${formatDailyDecisionNumber(number)} · ${question.industry}` : "New call every day"}
    </span>
  );
}

/** Ticker item: people online from the existing presence worker. Hidden below the header badge threshold. */
export function TickerOnline() {
  const count = usePresenceCount();
  if (count === null || count < ONLINE_BADGE_MIN) return null;
  return (
    <li className="hh-tick hh-tick-online">
      <span className="hh-dot" aria-hidden="true" />
      <span className="hh-tick-v">{count} online</span>
    </li>
  );
}

export function DailyDetails() {
  const { profile, dateKey } = useToday();
  const question = dateKey ? dailyPreviewFor(dateKey) : null;
  const number = dateKey ? dailyDecisionNumber(dateKey) : null;
  const status = dateKey ? dailyHabitStatus(profile.daily, dateKey) : null;
  if (!question || !status) {
    return (
      <>
        <p className="hh-card-body">One shared scenario a day, the same call for every operator.</p>
        <p className="hh-streak">Keep a streak that counts only the days you show up.</p>
      </>
    );
  }
  const streak = status.streak;
  return (
    <>
      <p className="hh-card-meta">{number !== null ? `${formatDailyDecisionNumber(number)} · ` : ""}{question.industry} · {CATEGORY_MAP[question.category].name}</p>
      <p className="hh-card-body">{question.teaser}</p>
      <p className="hh-streak">
        {status.answeredToday
          ? `Done today · ${streak}-day streak`
          : streak > 0
            ? `${streak}-day streak · today's call waiting`
            : "Start a streak today"}
      </p>
    </>
  );
}

export function BestOperator() {
  const { profile, hydrated } = useProfile();
  if (!hydrated || profile.operator.best <= 0) return <p className="hh-best">No account needed. Results stay in this browser.</p>;
  return <p className="hh-best">Your best: <b className="tabular">{profile.operator.best}</b></p>;
}

export function BestQuick() {
  const { profile, hydrated } = useProfile();
  if (!hydrated || profile.quick.bestDpm <= 0) return <p className="hh-best">Score is correct decisions per minute.</p>;
  return <p className="hh-best">Your best: <b className="tabular">{Math.round(profile.quick.bestDpm * 10) / 10}</b> DPM</p>;
}

/** Top 3 on the Operator Test board. Read-only, loaded when scrolled near. */
export function TopThree() {
  const section = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<BoardRow[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!leaderboardVisible()) return;
    let cancelled = false;
    const load = () => {
      if (cancelled) return;
      void fetchLeaderboard("operator", 3)
        .then((next) => { if (!cancelled) setRows(next); })
        .catch(() => { if (!cancelled) setFailed(true); });
    };
    const observer = typeof IntersectionObserver === "function" ? new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { observer?.disconnect(); load(); }
    }, { rootMargin: "200px" }) : null;
    if (observer && section.current) observer.observe(section.current);
    else load();
    return () => { cancelled = true; observer?.disconnect(); };
  }, []);

  if (!leaderboardVisible()) return null;
  return (
    <div ref={section} className="hh-card hh-top3">
      <div className="hh-row-head">
        <p className="hh-kicker">Operator Test · top 3</p>
        <Link prefetch={false} href="/leaderboard/?quiz=operator" className="hh-more">Full leaderboard →</Link>
      </div>
      <ol className="hh-top3-list">
        {rows?.map((row) => (
          <li key={row.rank}>
            <span className="hh-rank tabular">{row.rank}</span>
            <span className="hh-nick">{row.nickname}</span>
            <span className="hh-score tabular">{row.score}</span>
          </li>
        ))}
        {rows === null && !failed ? <li className="hh-muted">Loading scores…</li> : null}
        {rows && rows.length === 0 ? <li className="hh-muted">No scores posted yet. Be the first.</li> : null}
        {failed ? <li className="hh-muted">Scores could not be loaded.</li> : null}
      </ol>
    </div>
  );
}

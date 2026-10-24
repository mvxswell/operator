"use client";

import { useState } from "react";
import { dailyQuestionFor } from "@/data";
import { CATEGORY_MAP } from "@/lib/categories";
import {
  longestDailyStreak,
  recentDateKeys,
  shiftDateKey,
  summarizeDaily,
} from "@/lib/dailyStreak";
import type { DailyRecord } from "@/lib/storage";
import { QuestionCard } from "./QuestionCard";
import { Panel, Stat } from "./ui";

/**
 * Seven-day strip, personal stats, and recent-day practice.
 * Practice choices stay in component state. They are not written with
 * recordDaily, so a retroactive answer cannot extend a streak.
 */
export function DailyReview({
  dateKey,
  daily,
  streak,
  todayAnswered,
}: {
  dateKey: string;
  daily: Record<string, DailyRecord>;
  streak: number;
  todayAnswered: boolean;
}) {
  const keys = recentDateKeys(dateKey, 7);
  const pastKeys = keys.filter((key) => key !== dateKey);
  const stats = summarizeDaily(daily);
  const best = longestDailyStreak(daily);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [practice, setPractice] = useState<Record<string, string>>({});

  return (
    <section className="mt-4" aria-label="Daily habit">
      <WeekStrip dateKey={dateKey} daily={daily} todayAnswered={todayAnswered} keys={keys} />
      <p className="mt-3 text-[12px] leading-relaxed text-faint">
        A filled day is a call you made on that day. Only that answer counts toward the streak.
      </p>

      {todayAnswered ? (
        <>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Current streak" value={streak} hint={streak === 1 ? "day" : "days"} />
            <Stat label="Best streak" value={best} hint={best === 1 ? "day" : "days"} />
            <Stat label="Dailies answered" value={stats.answered} />
            <Stat
              label="Best-call rate"
              value={stats.answered ? `${Math.round(stats.accuracy * 100)}%` : "—"}
              hint={stats.answered ? `${stats.correct} of ${stats.answered}` : "No saved days yet"}
            />
          </div>

          <details className="skill-disclosure mt-4 rounded-xl border border-line bg-surface">
            <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-4 hover:bg-white/[0.02] sm:px-5">
              <span>
                <span className="block text-sm font-semibold text-ink">Recent days</span>
                <span className="mt-1 block text-[12px] leading-relaxed text-muted">
                  Review a day you already answered, or practice one you missed. Practice on this page is not saved and does not change the streak.
                </span>
              </span>
              <span aria-hidden="true" className="disclosure-arrow flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-accent">
                ⌄
              </span>
            </summary>
            <div className="border-t border-line px-4 py-4 sm:px-5">
              <div className="flex flex-wrap gap-2">
                {pastKeys.map((key) => {
                  const saved = daily[key];
                  const selected = openKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setOpenKey(selected ? null : key)}
                      className={`rounded-lg border px-3 py-2 text-left text-[12px] ${
                        selected
                          ? "border-accent bg-accent-soft text-ink"
                          : "border-line bg-surface-2 text-muted hover:text-ink"
                      }`}
                    >
                      <span className="block font-medium text-ink">{chipLabel(key, dateKey)}</span>
                      <span className="mt-0.5 block text-[11px]">
                        {saved ? (saved.correct ? "Answered · best call" : "Answered") : "Missed · practice"}
                      </span>
                    </button>
                  );
                })}
              </div>

              {openKey ? (
                <ArchiveDay
                  dateKey={openKey}
                  saved={daily[openKey]}
                  practiceChoice={practice[openKey] ?? null}
                  onPractice={(choiceId) =>
                    setPractice((current) => ({ ...current, [openKey]: choiceId }))
                  }
                />
              ) : (
                <p className="mt-4 text-[13px] text-muted">Pick a day to open it.</p>
              )}
            </div>
          </details>
        </>
      ) : (
        <p className="mt-3 text-[13px] leading-relaxed text-muted">
          Finish today&apos;s call to practice a missed day. Yesterday stays marked as missed unless you answered it yesterday.
        </p>
      )}
    </section>
  );
}

function WeekStrip({
  dateKey,
  daily,
  todayAnswered,
  keys,
}: {
  dateKey: string;
  daily: Record<string, DailyRecord>;
  todayAnswered: boolean;
  keys: string[];
}) {
  const described = keys
    .map((key) => {
      const label = key === dateKey ? "Today" : weekdayLabel(key);
      return `${label} ${dayState(key, dateKey, daily[key], todayAnswered).label}`;
    })
    .join(", ");

  return (
    <Panel className="px-3 py-4 sm:px-4">
      <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">Last 7 days</p>
      <ol className="mt-3 grid grid-cols-7 gap-1" aria-label={`Last 7 days, oldest first: ${described}`}>
        {keys.map((key) => {
          const state = dayState(key, dateKey, daily[key], todayAnswered);
          const label = key === dateKey ? "Today" : weekdayLabel(key);
          return (
            <li key={key} className="flex min-w-0 flex-col items-center gap-1.5 text-center">
              <span className="w-full truncate text-[10px] font-medium uppercase tracking-wide text-faint">
                {label}
              </span>
              <span
                className={`grid h-7 w-7 place-items-center rounded-full text-[12px] ${state.className}`}
                title={`${label}: ${state.label}`}
              >
                {state.mark}
              </span>
            </li>
          );
        })}
      </ol>
    </Panel>
  );
}

function ArchiveDay({
  dateKey,
  saved,
  practiceChoice,
  onPractice,
}: {
  dateKey: string;
  saved: DailyRecord | undefined;
  practiceChoice: string | null;
  onPractice: (choiceId: string) => void;
}) {
  const question = dailyQuestionFor(dateKey);
  const sameQuestion = saved?.questionId === question.id;
  const selected = sameQuestion ? saved?.chosenChoiceId ?? null : practiceChoice;
  const revealed = selected !== null;
  const correct = selected === question.correctChoiceId;
  const pretty = new Date(`${dateKey}T12:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mt-4">
      <p className="text-[13px] leading-relaxed text-muted">
        {sameQuestion
          ? `You answered ${pretty}. This is the call you made that day.`
          : saved
            ? `${pretty} already counts toward your streak. This card is the scenario now tied to that date, for practice only. It does not replace the call you made.`
            : `Practice for ${pretty}. This answer stays on this page. It is not saved and does not extend your streak.`}
      </p>
      <div className="mt-3 rounded-xl border border-line bg-bg/40 p-4 sm:p-5">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
          {sameQuestion ? "Saved day" : "Archive practice"} · {CATEGORY_MAP[question.category].name}
        </p>
        <QuestionCard
          question={question}
          choices={question.choices}
          selectedChoiceId={selected}
          revealed={revealed}
          onSelect={(choiceId) => {
            if (sameQuestion || revealed) return;
            onPractice(choiceId);
          }}
        />
      </div>
      {revealed && !sameQuestion ? (
        <p className={`mt-3 text-sm font-medium ${correct ? "text-pos" : "text-ink"}`}>
          {correct ? "Best call on the practice card." : "Not the best call. The streak is unchanged."}
        </p>
      ) : null}
    </div>
  );
}

function dayState(
  key: string,
  today: string,
  record: DailyRecord | undefined,
  todayAnswered: boolean,
): { label: string; mark: string; className: string } {
  if (record?.correct) {
    return { label: "answered, best call", mark: "✓", className: "bg-pos-soft text-pos" };
  }
  if (record) {
    return { label: "answered", mark: "✓", className: "bg-accent-soft text-accent" };
  }
  if (key === today && todayAnswered) {
    return { label: "answered", mark: "✓", className: "bg-accent-soft text-accent" };
  }
  if (key === today) {
    return {
      label: "not answered yet",
      mark: "",
      className: "border border-accent bg-transparent",
    };
  }
  return { label: "missed", mark: "", className: "border border-line bg-surface-2" };
}

function weekdayLabel(dateKey: string): string {
  return new Date(`${dateKey}T12:00:00`).toLocaleDateString(undefined, { weekday: "short" });
}

function chipLabel(dateKey: string, today: string): string {
  if (dateKey === shiftDateKey(today, -1)) return "Yesterday";
  const date = new Date(`${dateKey}T12:00:00`);
  return date.toLocaleDateString(undefined, { weekday: "short", day: "numeric" });
}

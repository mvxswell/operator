"use client";

import { dailyDecisionNumber, dailyQuestionFor } from "@/data";
import { formatDailyDecisionNumber } from "@/data/dailyCycle";
import { CATEGORY_MAP } from "@/lib/categories";
import { dailyHabitStatus } from "@/lib/dailyStreak";
import { todayKey } from "@/lib/storage";
import { useProfile } from "@/lib/useProfile";
import { ButtonLink, Eyebrow } from "./ui";

/** Live status for today's shared scenario. Details render after hydration. */
export function DailyCallout() {
  const { profile, hydrated } = useProfile();
  const dateKey = hydrated ? todayKey() : null;
  const question = dateKey ? dailyQuestionFor(dateKey) : null;
  const number = dateKey ? dailyDecisionNumber(dateKey) : null;
  const status = dateKey ? dailyHabitStatus(profile.daily, dateKey) : null;
  const skill = question ? CATEGORY_MAP[question.category].name : "";
  const pretty = dateKey
    ? new Date(`${dateKey}T12:00:00`).toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";
  const numberLabel = number === null ? null : formatDailyDecisionNumber(number);
  const done = Boolean(status?.answeredToday);
  const statusLine = !status
    ? ""
    : done
      ? `Completed today · ${status.streak}-day streak`
      : "Today's call waiting";

  return (
    <section aria-labelledby="daily-callout-title" className="pb-2">
      <div className="relative overflow-hidden rounded-xl border border-accent/35 bg-surface px-5 py-5 sm:px-7 sm:py-6">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
        />
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 flex-1">
            <Eyebrow>Today&apos;s Daily Decision</Eyebrow>
            <h2 id="daily-callout-title" className="mt-2 text-xl font-semibold tracking-[-0.01em] text-ink sm:text-2xl">
              One hard call. The same scenario for everyone.
            </h2>
            <div className="mt-3 min-h-[5.75rem]">
              {question && status ? (
                <>
                  <p className="text-[13px] font-medium text-accent">
                    {pretty}
                    {numberLabel ? ` · ${numberLabel}` : ""}
                  </p>
                  <p className="mt-1 text-sm font-medium text-ink">
                    {question.industry} · {skill}
                  </p>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">{question.teaser}</p>
                  <p className="mt-2 text-sm font-medium text-ink">{statusLine}</p>
                </>
              ) : (
                <p className="max-w-2xl text-sm leading-relaxed text-muted">
                  One scenario today, the same call for every operator. Your streak stays in this browser.
                </p>
              )}
            </div>
          </div>
          <ButtonLink href="/daily" size="lg" className="shrink-0 sm:min-w-52">
            {done ? "Review today's call" : "Make today's call"}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

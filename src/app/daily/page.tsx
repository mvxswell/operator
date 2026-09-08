"use client";

import { useCallback, useMemo, useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { Calculator } from "@/components/Calculator";
import { ButtonLink, Eyebrow, Panel } from "@/components/ui";
import { dailyQuestionFor } from "@/data";
import { CATEGORY_MAP } from "@/lib/categories";
import { recordDaily, todayKey } from "@/lib/storage";
import { useProfile } from "@/lib/useProfile";

export default function DailyPage() {
  const { profile, hydrated } = useProfile();
  const dateKey = useMemo(() => todayKey(), []);
  const question = useMemo(() => dailyQuestionFor(dateKey), [dateKey]);

  const saved = hydrated ? profile.daily[dateKey] : undefined;
  const [localChoice, setLocalChoice] = useState<string | null>(null);
  const selected = localChoice ?? saved?.chosenChoiceId ?? null;
  const revealed = selected !== null;

  const handleSelect = useCallback(
    (choiceId: string) => {
      if (revealed) return;
      setLocalChoice(choiceId);
      recordDaily({
        date: dateKey,
        questionId: question.id,
        chosenChoiceId: choiceId,
        correct: choiceId === question.correctChoiceId,
        at: new Date().toISOString(),
      });
    },
    [revealed, dateKey, question],
  );

  const completedDays = hydrated ? Object.keys(profile.daily).length : 0;
  const streak = useMemo(
    () => (hydrated ? currentStreak(profile.daily, dateKey) : 0),
    [hydrated, profile.daily, dateKey],
  );

  const prettyDate = useMemo(
    () =>
      new Date(`${dateKey}T12:00:00`).toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    [dateKey],
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Daily Decision</Eyebrow>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.01em] text-ink sm:text-3xl">
            {prettyDate}
          </h1>
        </div>
        {completedDays > 0 ? (
          <div className="flex gap-6">
            <div className="text-right">
              <p className="tabular text-xl font-semibold text-ink">{streak}</p>
              <p className="text-[10px] uppercase tracking-[0.13em] text-faint">day streak</p>
            </div>
            <div className="text-right">
              <p className="tabular text-xl font-semibold text-ink">{completedDays}</p>
              <p className="text-[10px] uppercase tracking-[0.13em] text-faint">completed</p>
            </div>
          </div>
        ) : null}
      </div>

      <Panel className="p-5 sm:p-7">
        <QuestionCard
          question={question}
          choices={question.choices}
          selectedChoiceId={selected}
          onSelect={handleSelect}
          revealed={revealed}
        />
      </Panel>

      <Calculator />

      {revealed ? (
        <>
          <div
            className={`mt-4 rounded-xl border px-5 py-4 ${
              selected === question.correctChoiceId
                ? "border-pos/40 bg-pos-soft"
                : "border-neg/40 bg-neg-soft"
            }`}
          >
            <p className="text-sm font-semibold text-ink">
              {selected === question.correctChoiceId
                ? "You made the best call."
                : "Not the best call today."}
            </p>
            <p className="mt-1 text-[13px] text-muted">
              This scenario tests {CATEGORY_MAP[question.category].name.toLowerCase()} at level{" "}
              {question.difficulty}.
            </p>
          </div>

          <Distribution question={question} selected={selected} />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quick" size="lg">
              Play Quick Decisions
            </ButtonLink>
            <ButtonLink href="/operator" variant="secondary" size="lg">
              Take the Operator Test
            </ButtonLink>
          </div>

          <p className="mt-6 text-[13px] text-faint">
            A new scenario unlocks tomorrow. Everyone sees the same one each day.
          </p>
        </>
      ) : (
        <p className="mt-5 text-center text-[13px] text-faint">
          Answer before you can see how everyone else voted.
        </p>
      )}
    </div>
  );
}

function Distribution({
  question,
  selected,
}: {
  question: ReturnType<typeof dailyQuestionFor>;
  selected: string | null;
}) {
  const letters = ["A", "B", "C", "D"];

  return (
    <section className="mt-8">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-faint">
          How everyone answered
        </h2>
        <span className="rounded-md border border-line bg-surface-2 px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-faint">
          Simulated
        </span>
      </div>

      <Panel className="mt-3 divide-y divide-line-soft">
        {question.choices.map((choice, i) => {
          const pct = question.distribution[choice.id] ?? 0;
          const isCorrect = choice.id === question.correctChoiceId;
          const isYours = choice.id === selected;

          return (
            <div key={choice.id} className="px-5 py-3.5">
              <div className="flex items-baseline gap-3">
                <span className="w-4 shrink-0 text-[12px] font-semibold text-faint">
                  {letters[i]}
                </span>
                <p className="min-w-0 flex-1 truncate text-[13px] text-muted">{choice.text}</p>
                {isYours ? (
                  <span className="shrink-0 text-[10px] uppercase tracking-[0.1em] text-accent">
                    Your pick
                  </span>
                ) : null}
                <span className="tabular w-12 shrink-0 text-right text-sm font-semibold text-ink">
                  {pct}%
                </span>
                <span className="w-3 shrink-0 text-pos">{isCorrect ? "✓" : ""}</span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-line-soft">
                <div
                  className={`h-full rounded-full transition-[width] duration-700 ease-out ${
                    isCorrect ? "bg-pos" : "bg-line"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </Panel>

      <p className="mt-3 text-[12px] leading-relaxed text-faint">
        Community percentages are simulated for this preview and do not represent real players.
        They will be replaced by live results once accounts ship.
      </p>
    </section>
  );
}

/** Consecutive days completed, counting back from today. */
function currentStreak(daily: Record<string, unknown>, today: string): number {
  let streak = 0;
  const cursor = new Date(`${today}T12:00:00`);
  while (true) {
    const key = [
      cursor.getFullYear(),
      String(cursor.getMonth() + 1).padStart(2, "0"),
      String(cursor.getDate()).padStart(2, "0"),
    ].join("-");
    if (!daily[key]) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

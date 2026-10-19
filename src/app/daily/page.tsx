"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { ShareScoreButton } from "@/components/ShareScoreButton";
import { Calculator } from "@/components/Calculator";
import { ButtonLink, Eyebrow, Panel } from "@/components/ui";
import { dailyQuestionFor } from "@/data";
import { CATEGORY_MAP } from "@/lib/categories";
import { consecutiveDailyStreak, nextScenarioLabel, shiftDateKey } from "@/lib/dailyStreak";
import { dailyShareText } from "@/lib/shareResult";
import { recordDaily, todayKey } from "@/lib/storage";
import { track } from "@/lib/track";
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
      track("daily:answer");
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

  const heldStreak = hydrated ? consecutiveDailyStreak(profile.daily, shiftDateKey(dateKey, -1)) : 0;
  const todayStreak = hydrated ? consecutiveDailyStreak(profile.daily, dateKey) : 0;
  const streak = !hydrated
    ? 0
    : revealed
      ? profile.daily[dateKey]
        ? todayStreak
        : heldStreak + 1
      : heldStreak;

  const prettyDate = useMemo(
    () =>
      new Date(`${dateKey}T12:00:00`).toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    [dateKey],
  );

  const correct = selected === question.correctChoiceId;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="brand-hero mb-6">
        <Eyebrow>Daily Decision</Eyebrow>
        <h1 className="mt-2 text-2xl font-semibold tracking-[-0.01em] text-ink sm:text-3xl">
          {prettyDate}
        </h1>
      </div>

      {hydrated ? (
        <Panel className="mb-6 flex items-center justify-between gap-4 px-4 py-4 sm:px-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">Streak</p>
            <p className="mt-1 text-sm text-muted">
              {revealed
                ? streak === 1
                  ? "Day 1 is in. Come back tomorrow."
                  : "Today is done. Come back tomorrow to extend it."
                : streak > 0
                  ? "Answer today to keep it."
                  : "Answer today to start one."}
            </p>
          </div>
          <p className="tabular text-4xl font-semibold leading-none text-accent">{streak}</p>
        </Panel>
      ) : null}

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
              correct ? "border-pos/40 bg-pos-soft" : "border-neg/40 bg-neg-soft"
            }`}
          >
            <p className="text-sm font-semibold text-ink">
              {correct ? "You made the best call." : "Not the best call today."}
            </p>
            <p className="mt-1 text-[13px] text-muted">
              This scenario tests {CATEGORY_MAP[question.category].name.toLowerCase()} at level{" "}
              {question.difficulty}.
            </p>
          </div>

          <ReturnTomorrow streak={streak} />

          <div className="mt-4">
            <ShareScoreButton
              text={dailyShareText(dateKey, correct, question.difficulty, streak).text}
              event="daily:share"
              className="w-full sm:w-auto"
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quick" size="lg">
              Play Quick Decisions
            </ButtonLink>
            <ButtonLink href="/operator" variant="secondary" size="lg">
              Take the Operator Test
            </ButtonLink>
          </div>
        </>
      ) : (
        <p className="mt-5 text-center text-[13px] text-faint">
          Everyone sees the same scenario today. A new one unlocks tomorrow.
        </p>
      )}
    </div>
  );
}

function ReturnTomorrow({ streak }: { streak: number }) {
  const [when, setWhen] = useState("at midnight");

  useEffect(() => {
    const update = () => setWhen(nextScenarioLabel());
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const headline = streak <= 1 ? "Day 1 streak started." : `${streak}-day streak.`;
  const next = streak <= 1 ? "Come back tomorrow and make it 2." : `Come back tomorrow and make it ${streak + 1}.`;

  return (
    <section className="mt-4 rounded-xl border border-accent/30 bg-accent-soft px-5 py-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">Tomorrow</p>
      <h2 className="mt-2 text-xl font-semibold tracking-[-0.01em] text-ink">{headline}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{next}</p>
      <p className="mt-3 text-sm text-ink">
        Next scenario unlocks <span className="tabular font-semibold text-accent">{when}</span>.
      </p>
    </section>
  );
}

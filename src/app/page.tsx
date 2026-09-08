"use client";

import Link from "next/link";
import { useMemo } from "react";
import { CountUp } from "@/components/CountUp";
import { ButtonLink, CategoryIcon, Eyebrow, Panel } from "@/components/ui";
import { BANK_STATS } from "@/data";
import { CATEGORIES } from "@/lib/categories";
import { operatorTier } from "@/lib/scoring";
import type { OperatorRun } from "@/lib/storage";
import { useProfile } from "@/lib/useProfile";

const SAMPLE_SKILLS: { name: string; score: number }[] = [
  { name: "Bottleneck Detection", score: 91 },
  { name: "Operations", score: 88 },
  { name: "Prioritization", score: 84 },
  { name: "Sales & Marketing", score: 81 },
  { name: "Strategy", score: 79 },
  { name: "Resource Allocation", score: 77 },
  { name: "People & Delegation", score: 73 },
  { name: "Financial Judgment", score: 68 },
];

export default function HomePage() {
  const { profile, hydrated } = useProfile();

  // The run that produced the personal best, so the card never pairs a real
  // score with the sample skill bars.
  const bestRun = useMemo(() => {
    if (!hydrated) return null;
    return profile.operator.runs.reduce<OperatorRun | null>(
      (best, run) => (!best || run.score > best.score ? run : best),
      null,
    );
  }, [hydrated, profile.operator.runs]);

  const skillRows = useMemo(() => {
    const own = CATEGORIES.map((c) => ({ name: c.name, score: bestRun?.skills[c.id] }))
      .filter((row): row is { name: string; score: number } => typeof row.score === "number")
      .sort((a, b) => b.score - a.score);
    return own.length ? own : SAMPLE_SKILLS;
  }, [bestRun]);

  const hasScore = hydrated && profile.operator.best > 0;
  const displayScore = hasScore ? profile.operator.best : 782;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* ---------------------------------- Hero --------------------------------- */}
      <section className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="stack-rise">
          <Eyebrow>Business decision testing</Eyebrow>
          <h1 className="mt-4 text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[56px]">
            How good are you at making business decisions?
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
            Test your judgment. Train your weaknesses. Make better decisions faster.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/operator" size="lg">
              Take the Operator Test
            </ButtonLink>
            <ButtonLink href="/quick" variant="secondary" size="lg">
              Quick Decisions — 60 sec
            </ButtonLink>
          </div>
          <p className="mt-5 text-[13px] text-faint">
            {BANK_STATS.standard} scenarios · 8 skills · 6 difficulty levels · no account needed
          </p>
        </div>

        {/* Sample (or personal) score card */}
        <Panel className="animate-[var(--animate-pop)] overflow-hidden">
          <div className="border-b border-line px-6 py-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-faint">
                  Operator Score
                </p>
                <p className="tabular mt-1 text-[64px] font-semibold leading-none tracking-[-0.03em] text-ink">
                  <CountUp value={displayScore} durationMs={1200} />
                </p>
              </div>
              <span className="rounded-md border border-accent/30 bg-accent-soft px-2 py-1 text-[11px] font-medium text-accent">
                {operatorTier(displayScore).label}
              </span>
            </div>
            <p className="mt-3 text-xs text-faint">
              {hasScore ? "Your personal best" : "Sample result — take the test to see yours"}
            </p>
          </div>

          <div className="px-6 py-5">
            <div className="flex flex-col gap-2.5">
              {skillRows.map((skill, i) => (
                <div key={skill.name} className="flex items-center gap-3">
                  <p className="w-[132px] shrink-0 truncate text-[12px] text-muted sm:w-[150px]">
                    {skill.name}
                  </p>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-line-soft">
                    <div
                      className="h-full rounded-full bg-accent/70 transition-[width] duration-1000 ease-out"
                      style={{
                        width: `${skill.score}%`,
                        transitionDelay: `${i * 60}ms`,
                      }}
                    />
                  </div>
                  <p className="tabular w-7 shrink-0 text-right text-[12px] text-ink">
                    {skill.score}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </section>

      {/* --------------------------------- Modes --------------------------------- */}
      <section className="border-t border-line-soft py-14 sm:py-16">
        <div className="grid gap-3 sm:grid-cols-2">
          <ModeCard
            href="/operator"
            title="Operator Test"
            meta="~20 questions · adaptive"
            body="The flagship assessment. Difficulty adapts to how you perform, then you get an Operator Score and a breakdown across all eight skills."
            accent="#f2b441"
          />
          <ModeCard
            href="/quick"
            title="Quick Decisions"
            meta="60 seconds · two choices"
            body="Two options, one right call, no time to overthink. Score is DPM — correct decisions per minute. Built to replay immediately."
            accent="#7dd3fc"
          />
          <ModeCard
            href="/skills"
            title="8 Skill Tests"
            meta="10 questions each"
            body="Focused runs on a single skill, from bottleneck detection to strategy. Each one keeps its own score and personal best."
            accent="#a3e635"
          />
          <ModeCard
            href="/daily"
            title="Daily Decision"
            meta="One scenario a day"
            body="A single hard call each day. Answer first, then see how your choice compares with everyone else's."
            accent="#f9a8d4"
          />
        </div>
      </section>

      {/* --------------------------------- Skills -------------------------------- */}
      <section className="border-t border-line-soft py-14 sm:py-16">
        <Eyebrow>What gets measured</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-[-0.01em] text-ink sm:text-3xl">
          Eight skills that decide whether a business works
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
          Every scenario contains everything you need to answer it. No jargon, no trivia, no
          industry knowledge required — just the judgment to read a situation and choose well.
        </p>

        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/skills/${cat.id}`}
              className="group rounded-lg border border-line bg-surface p-4 transition-colors hover:border-faint hover:bg-surface-2"
            >
              <span style={{ color: cat.accent }}>
                <CategoryIcon category={cat.id} className="h-5 w-5" />
              </span>
              <p className="mt-3 text-sm font-medium text-ink">{cat.name}</p>
              <p className="mt-1 text-[12px] leading-snug text-faint">{cat.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-line-soft py-8 text-[12px] text-faint">
        <span className="font-medium text-muted">Think Operator</span> · Scores and history are
        stored locally in your browser. Accounts, leaderboards and AI-generated scenarios come later.
      </footer>
    </div>
  );
}

function ModeCard({
  href,
  title,
  meta,
  body,
  accent,
}: {
  href: string;
  title: string;
  meta: string;
  body: string;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-xl border border-line bg-surface p-6 transition-colors hover:border-faint hover:bg-surface-2"
    >
      <div
        className="absolute inset-x-0 top-0 h-px opacity-60"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        <span className="shrink-0 text-[11px] text-faint">{meta}</span>
      </div>
      <p className="mt-2.5 text-sm leading-relaxed text-muted">{body}</p>
      <p className="mt-4 text-[13px] font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
        Start →
      </p>
    </Link>
  );
}

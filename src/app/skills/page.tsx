"use client";

import Link from "next/link";
import { CategoryIcon, Eyebrow } from "@/components/ui";
import { questionsForCategory } from "@/data";
import { CATEGORIES } from "@/lib/categories";
import { useProfile } from "@/lib/useProfile";

export default function SkillsPage() {
  const { profile, hydrated } = useProfile();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="stack-rise">
        <Eyebrow>Focused practice</Eyebrow>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
          Train your business skills
        </h1>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted">
          Each test pulls scenarios from a single skill and adapts to how you perform. Ten
          questions, one score, one number to beat.
        </p>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {CATEGORIES.map((cat) => {
          const best = hydrated ? (profile.skills[cat.id]?.best ?? 0) : 0;
          const lastRun = hydrated ? profile.skills[cat.id]?.runs[0] : undefined;

          return (
            <Link
              key={cat.id}
              href={`/skills/${cat.id}`}
              className="group flex flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-faint hover:bg-surface-2"
            >
              <div className="flex items-start gap-3">
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-surface-2"
                  style={{ color: cat.accent }}
                >
                  <CategoryIcon category={cat.id} className="h-4.5 w-4.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-[15px] font-semibold text-ink">{cat.name}</h2>
                  <p className="mt-1 text-[13px] leading-snug text-muted">{cat.description}</p>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between border-t border-line-soft pt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-faint">
                    {best > 0 ? "Best score" : "Not attempted"}
                  </p>
                  <p className="tabular mt-0.5 text-xl font-semibold text-ink">
                    {best > 0 ? best : <span className="text-faint">—</span>}
                    {lastRun ? (
                      <span className="ml-2 text-[11px] font-normal text-faint">
                        Level {lastRun.highestLevel} reached
                      </span>
                    ) : null}
                  </p>
                </div>
                <span className="text-[13px] font-medium text-accent">
                  {best > 0 ? `Beat ${best}` : "Start test"} →
                </span>
              </div>

              <p className="mt-3 text-[11px] text-faint">
                {questionsForCategory(cat.id).length} scenarios in this skill
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

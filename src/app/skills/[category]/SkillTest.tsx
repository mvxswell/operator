"use client";

import { useCallback, useMemo } from "react";
import { Assessment } from "@/components/Assessment";
import { QUESTION_BANK } from "@/data";
import { CATEGORY_MAP } from "@/lib/categories";
import type { OperatorResult } from "@/lib/scoring";
import { newId, recordSkillRun } from "@/lib/storage";
import type { CategoryId } from "@/lib/types";
import { useProfile } from "@/lib/useProfile";

export const SKILL_TEST_LENGTH = 10;

export function SkillTest({ category }: { category: CategoryId }) {
  const { profile } = useProfile();
  const meta = CATEGORY_MAP[category];
  // Stable identity so the engine's selection callbacks are not rebuilt each render.
  const restrictTo = useMemo(() => [category], [category]);

  const handleComplete = useCallback(
    (result: OperatorResult) => {
      recordSkillRun({
        id: newId(),
        at: new Date().toISOString(),
        category,
        score: result.score,
        accuracy: result.accuracy,
        highestLevel: result.highestLevel,
      });
    },
    [category],
  );

  return (
    <Assessment
      variant="skill"
      title={meta.name}
      scoreLabel={`${meta.name} Score`}
      introBody={meta.description}
      pool={QUESTION_BANK}
      length={SKILL_TEST_LENGTH}
      restrictTo={restrictTo}
      personalBest={profile.skills[category]?.best ?? 0}
      onComplete={handleComplete}
      backHref="/skills"
      backLabel="All skills"
    />
  );
}

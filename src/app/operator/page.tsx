"use client";

import { useCallback } from "react";
import { Assessment } from "@/components/Assessment";
import { QUESTION_BANK } from "@/data";
import { newId, recordOperatorRun } from "@/lib/storage";
import type { OperatorResult } from "@/lib/scoring";
import { useProfile } from "@/lib/useProfile";

export const OPERATOR_TEST_LENGTH = 20;

export default function OperatorTestPage() {
  const { profile } = useProfile();

  const handleComplete = useCallback((result: OperatorResult) => {
    recordOperatorRun({
      id: newId(),
      at: new Date().toISOString(),
      score: result.score,
      accuracy: result.accuracy,
      avgSeconds: result.avgSeconds,
      highestLevel: result.highestLevel,
      total: result.total,
      correct: result.correct,
      skills: Object.fromEntries(
        result.skills.filter((s) => s.score !== null).map((s) => [s.category, s.score as number]),
      ),
    });
  }, []);

  return (
    <Assessment
      variant="operator"
      title="Operator Test"
      scoreLabel="Operator Score"
      introBody="Twenty scenarios drawn from every corner of business — construction, SaaS, restaurants, logistics, healthcare, retail. Your job is to read each situation and make the call an owner would make."
      pool={QUESTION_BANK}
      length={OPERATOR_TEST_LENGTH}
      personalBest={profile.operator.best}
      onComplete={handleComplete}
      backHref="/"
      backLabel="Back to home"
    />
  );
}

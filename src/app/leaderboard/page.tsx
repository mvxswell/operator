"use client";

import { Suspense } from "react";
import { LeaderboardBoard } from "@/components/LeaderboardBoard";

export default function LeaderboardPage() {
  return (
    <Suspense fallback={<p className="px-6 py-16 text-sm text-muted">Loading scores…</p>}>
      <LeaderboardBoard />
    </Suspense>
  );
}

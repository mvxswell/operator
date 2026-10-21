"use client";

import { useEffect, useSyncExternalStore } from "react";
import { sharedScore } from "@/lib/shareResult";
import { track } from "@/lib/track";

const subscribe = (callback: () => void) => {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
};

export function SharedChallenge({ quiz }: { quiz: string }) {
  const search = useSyncExternalStore(subscribe, () => window.location.search, () => "");
  const score = sharedScore(search, quiz);
  useEffect(() => {
    if (score !== null) {
      const source = new URLSearchParams(search).get("utm_source");
      if (["x", "linkedin", "copy", "native"].includes(source ?? "")) track(`share_visit:${source}`);
    }
  }, [search, score]);
  if (score === null) return null;
  return <p className="mb-6 rounded-xl border border-accent/30 bg-accent-soft px-5 py-4 text-sm text-ink">
    Your friend scored <strong className="tabular text-accent">{score}{quiz === "daily" ? "/1" : quiz === "quick" ? " DPM" : ""}</strong>. Can you beat it?
  </p>;
}

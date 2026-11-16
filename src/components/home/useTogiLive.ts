"use client";

import { useEffect, useState } from "react";
import { usd } from "@/lib/grokBotSavings";
import { loadTogiHeadline, type TogiHeadline, type TogiSource } from "@/lib/togi";

export type TogiLive = { headline: TogiHeadline; source: TogiSource };

let inflight: Promise<TogiLive> | null = null;

function sharedLoad(fallback: TogiHeadline): Promise<TogiLive> {
  if (!inflight) inflight = loadTogiHeadline(fallback);
  return inflight;
}

/** One live fetch shared by the hero and the tracker card. Snapshot numbers until it lands. */
export function useTogiLive(fallback: TogiHeadline): TogiLive {
  const [state, setState] = useState<TogiLive>({ headline: fallback, source: "snapshot" });
  const { goal, starting_value, latest_value, latest_value_date } = fallback;

  useEffect(() => {
    let cancelled = false;
    void sharedLoad({ goal, starting_value, latest_value, latest_value_date }).then((next) => {
      if (!cancelled) setState(next);
    });
    return () => {
      cancelled = true;
    };
  }, [goal, starting_value, latest_value, latest_value_date]);

  return state;
}

export function compactUsd(n: number): string {
  if (n >= 1_000_000) return `$${Number((n / 1_000_000).toFixed(2))}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return usd(n);
}

export function togiFigures(headline: TogiHeadline) {
  const pct = headline.goal > 0 ? Math.max(0, Math.min(100, (headline.latest_value / headline.goal) * 100)) : 0;
  return {
    value: compactUsd(headline.latest_value),
    goal: compactUsd(headline.goal),
    start: compactUsd(headline.starting_value),
    pct,
    pctLabel: `${pct.toFixed(1)}%`,
    date: headline.latest_value_date,
  };
}

"use client";

import { niceDate } from "@/lib/grokBotSavings";
import type { TogiHeadline } from "@/lib/togi";
import { togiFigures, useTogiLive } from "./useTogiLive";

/** Tracker card. Numbers come from the same live feed as /togi/, with the bundled snapshot until that fetch returns. */
export function TogiHomeCard({ togi }: { togi: TogiHeadline }) {
  const { data } = useCard(togi);
  return (
    <a href="/togi/" className="hh-card hh-tcard hh-togi" aria-label={`Togi Tracker: ${data.value} of ${data.goal}`}>
      <div className="hh-tcard-top">
        <p className="hh-kicker hh-kicker-gold">Togi Tracker</p>
        {data.live ? <span className="hh-chip hh-chip-live"><span className="hh-dot" aria-hidden="true" />Live</span> : null}
      </div>
      <p className="hh-big tabular">{data.value}<span className="hh-big-unit">of {data.goal}</span></p>
      <p className="hh-card-body">Shane Stoffer’s public $10M stock market challenge, every trade with its source. Unofficial fan tracker.</p>
      <div className="hh-bar" role="img" aria-label={`${data.pctLabel} of the goal`}><i style={{ width: `${data.pct}%` }} /></div>
      <div className="hh-bar-legend tabular"><span>{data.start} start</span><span>{data.pctLabel}</span><span>{data.goal}</span></div>
      <p className="hh-card-foot">Last reported {niceDate(data.date)} · not financial advice<span className="hh-arrow">→</span></p>
    </a>
  );
}

function useCard(togi: TogiHeadline) {
  const live = useTogiLive(togi);
  const figures = togiFigures(live.headline);
  return { data: { ...figures, live: live.source === "live" } };
}

"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { LeaderboardTeaser } from "@/components/LeaderboardTeaser";
import { ONLINE_BADGE_MIN, usePresenceCount } from "@/components/OnlineNow";
import { dailyPreviewFor } from "@/data/dailyPreview";
import { niceDate, ratio, signedUsd } from "@/lib/grokBotSavings";
import type { TogiHeadline } from "@/lib/togi";
import { togiFigures, useTogiLive } from "./useTogiLive";

const readySubscribe = () => () => {};

/** Local calendar day, matching todayKey() in storage.ts without pulling the profile store into this bundle. */
function localDateKey(d = new Date()): string {
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

export function HeroLive({
  togi,
  grokReturn,
  grokRatio,
}: {
  togi: TogiHeadline;
  grokReturn: number;
  grokRatio: number;
}) {
  const count = usePresenceCount();
  const showOnline = count !== null && count >= ONLINE_BADGE_MIN;
  const ready = useSyncExternalStore(readySubscribe, () => true, () => false);
  const dateKey = ready ? localDateKey() : null;
  const preview = dateKey ? dailyPreviewFor(dateKey) : null;
  const live = useTogiLive(togi);
  const figures = togiFigures(live.headline);
  const grokValue = signedUsd(grokReturn).replace(/\.00$/, "");
  const grokNote = `${ratio(grokRatio)} value per dollar`;

  return (
    <aside className="hh-live" aria-label="Live practice and trackers">
      <div className="hh-live-top">
        <p className="hh-live-kicker">Live now</p>
        {showOnline ? (
          <span className="hh-online" aria-label={`${count} online now`}>
            <span className="hh-live-dot" aria-hidden="true" />
            {count} online
          </span>
        ) : null}
      </div>

      <Link prefetch={false} href="/daily/" className="hh-call">
        <div className="hh-call-meta">
          <span className="hh-call-k">Today’s call</span>
          <span className="hh-call-d">{preview && dateKey ? `Daily Decision · ${niceDate(dateKey)}` : "Daily Decision"}</span>
        </div>
        <p>{preview ? preview.teaser : "One shared scenario a day. The same call for every operator."}</p>
        <span className="hh-call-go">Make the call →</span>
      </Link>

      <div className="hh-live-stats">
        <Link prefetch={false} href="/grok-bot-savings-tracker/" className="hh-stat hh-stat-grok" aria-label={`Grok Bot Savings Tracker: ${grokValue}`}>
          <div className="hh-stat-k">Grok Bot</div>
          <div className="hh-stat-v hh-green tabular">{grokValue}</div>
          <div className="hh-stat-s">{grokNote}</div>
        </Link>
        <a href="/togi/" className="hh-stat hh-stat-togi" aria-label={`Togi Tracker: ${figures.value} of ${figures.goal}`}>
          <div className="hh-stat-k">Togi Tracker</div>
          <div className="hh-stat-v tabular">{figures.value} <span className="hh-stat-u">of {figures.goal}</span></div>
          <div className="hh-stat-bar" role="img" aria-label={`${figures.pctLabel} of the goal`}><i style={{ width: `${figures.pct}%` }} /></div>
          <div className="hh-stat-s tabular">{figures.pctLabel}{live.source === "live" ? " · live" : ` · ${niceDate(figures.date)}`}</div>
        </a>
      </div>

      <LeaderboardTeaser variant="compact" />
    </aside>
  );
}

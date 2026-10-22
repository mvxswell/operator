"use client";

import { useEffect, useState } from "react";
import { ShareResultCard } from "@/components/ShareResultCard";
import { Button, ButtonLink, Eyebrow } from "@/components/ui";
import { BADGES, evaluateBadges, type BadgeId } from "@/lib/badges";
import { badgeShareText } from "@/lib/shareResult";
import { useProfile } from "@/lib/useProfile";

export default function BadgesPage() {
  const { profile, hydrated } = useProfile();
  const [shareId, setShareId] = useState<BadgeId | null>(null);
  const rows = hydrated ? evaluateBadges(profile) : BADGES.map((badge) => ({ ...badge, earned: false }));
  const earnedCount = rows.filter((badge) => badge.earned).length;
  const shared = rows.find((badge) => badge.id === shareId && badge.earned);
  const sharedId = shared?.id ?? null;

  useEffect(() => {
    if (!hydrated) return;
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, [hydrated]);

  useEffect(() => {
    if (!sharedId) return;
    document.getElementById("badge-share")?.scrollIntoView({ block: "nearest" });
    document.getElementById("badge-share-title")?.focus();
  }, [sharedId]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Eyebrow>Earned in this browser</Eyebrow>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Badges</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        Badges come from quizzes you finish on this device. There is no account. A daily-streak badge
        stays after you miss a day, as long as that history is still saved here.
      </p>
      {!hydrated ? (
        <p className="mt-8 text-muted">Loading your badges…</p>
      ) : (
        <>
          <p className="mt-6 text-sm text-ink">
            <span className="tabular text-2xl font-semibold text-accent">{earnedCount}</span>
            <span className="text-muted"> of {rows.length} earned</span>
          </p>
          <ul className="mt-6 grid list-none gap-3 sm:grid-cols-2">
            {rows.map((badge) => (
              <li key={badge.id} id={badge.id} className="scroll-mt-32">
                <article
                  aria-labelledby={`badge-${badge.id}-name`}
                  className={`relative h-full overflow-hidden rounded-xl border p-4 sm:p-5 ${
                    badge.earned ? "border-accent/35 bg-surface" : "border-line bg-surface"
                  }`}
                >
                  {badge.earned ? (
                    <span aria-hidden="true" className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-accent/70 to-transparent" />
                  ) : null}
                  <div className="flex items-start gap-3">
                    <BadgeMark earned={badge.earned} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h2 id={`badge-${badge.id}-name`} className="text-base font-semibold text-ink">
                          {badge.name}
                        </h2>
                        <span
                          className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                            badge.earned
                              ? "border-accent/40 bg-accent-soft text-accent"
                              : "border-line bg-surface-2 text-muted"
                          }`}
                        >
                          {badge.earned ? "Earned" : "Locked"}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{badge.description}</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink">
                        <span className="text-muted">How to earn it: </span>
                        {badge.how}
                      </p>
                      {badge.earned ? (
                        <Button
                          variant={shareId === badge.id ? "primary" : "secondary"}
                          className="mt-3 w-full sm:w-auto"
                          aria-pressed={shareId === badge.id}
                          aria-label={`Share ${badge.name}`}
                          onClick={() => setShareId(badge.id)}
                        >
                          Share
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          {shared ? (
            <div id="badge-share" className="scroll-mt-28">
              <ShareResultCard
                title={shared.name}
                score="Earned"
                verdict={shared.description}
                shared={badgeShareText(shared.name, shared.id)}
                shareKind="badge"
                heading={`Share ${shared.name}`}
                headingId="badge-share-title"
                blurb="The link opens this page, with how to earn the badge."
                prompt="Can you earn it?"
                downloadName="thinkoperator-badge.png"
              />
            </div>
          ) : null}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/operator" size="lg">Operator Test</ButtonLink>
            <ButtonLink href="/quick" variant="secondary" size="lg">Quick Decisions</ButtonLink>
            <ButtonLink href="/daily" variant="ghost" size="lg">Daily Decision</ButtonLink>
          </div>
        </>
      )}
    </div>
  );
}

function BadgeMark({ earned }: { earned: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-9 w-9 shrink-0 ${earned ? "text-accent" : "text-faint"}`}>
      <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {earned ? (
        <path d="M8.2 12.2 10.8 14.8 15.8 9.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : null}
    </svg>
  );
}

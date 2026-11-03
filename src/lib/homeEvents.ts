import type { HomeVariant } from "./homeVariant";
import { track } from "./track";

/**
 * Homepage A/B counts, tagged with the variant:
 *   home_view:<v>, tracker_click:<grok|togi>:<v>, quiz_start:<operator|daily|quick>:<v>
 *
 * Off unless the build sets NEXT_PUBLIC_HOME_AB_EVENTS=1. The presence worker
 * only stores names in src/lib/funnelEvents.ts, so it must be redeployed with
 * these names before the flag is turned on (otherwise /e answers 400).
 */
export const HOME_EVENTS_ENABLED = process.env.NEXT_PUBLIC_HOME_AB_EVENTS === "1";

export type TrackerCard = "grok" | "togi";
export type QuizCard = "operator" | "daily" | "quick";

export function homeEventName(
  kind: "view" | "tracker" | "quiz",
  variant: HomeVariant,
  card?: TrackerCard | QuizCard,
): string {
  if (kind === "view") return `home_view:${variant}`;
  if (kind === "tracker") return `tracker_click:${card}:${variant}`;
  return `quiz_start:${card}:${variant}`;
}

export function trackHome(kind: "view" | "tracker" | "quiz", variant: HomeVariant, card?: TrackerCard | QuizCard): void {
  if (!HOME_EVENTS_ENABLED) return;
  track(homeEventName(kind, variant, card));
}

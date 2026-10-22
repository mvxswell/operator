import { CATEGORY_IDS } from "./categories";
import { longestDailyStreak } from "./dailyStreak";
import { DPM_ACCURACY_FLOOR, DPM_TIERS, OPERATOR_TIERS } from "./scoring";

/**
 * Badges earned in the browser from saved progress. No account and no score
 * leaves the device for this list — a funnel event, when sent, is only the id.
 */

export const OPERATOR_BADGE_SCORE = tierMin(OPERATOR_TIERS, "Operator");
export const ELITE_BADGE_SCORE = tierMin(OPERATOR_TIERS, "Elite Operator");
export const SHARP_BADGE_DPM = tierMin(DPM_TIERS, "Sharp");
export const INSTINCTIVE_BADGE_DPM = tierMin(DPM_TIERS, "Instinctive");
/** Average decision time, in seconds, that earns Snap call. */
export const SNAP_MAX_SECONDS = 2;
export const TOP_TEN_MAX_RANK = 10;

function tierMin(tiers: { min: number; label: string }[], label: string): number {
  const tier = tiers.find((item) => item.label === label);
  if (!tier) throw new Error(`Missing score tier: ${label}`);
  return tier.min;
}

export interface BadgeMarks {
  /** When this browser first shared a quiz result. */
  sharedAt: string | null;
  /** Best (lowest) leaderboard rank returned by a score post. */
  bestRank: number | null;
}

export interface BadgeSource {
  operator: { best?: number; runs: { score: number }[] };
  quick: {
    bestDpm?: number;
    runs: { dpm: number; accuracy: number; avgSeconds: number; made: number }[];
  };
  skills: Partial<Record<string, { best?: number; runs: { score: number }[] }>>;
  daily: Record<string, unknown>;
  marks: BadgeMarks;
}

export const BADGE_IDS = [
  "first-call",
  "four-modes",
  "full-bench",
  "operator",
  "elite",
  "specialist",
  "sharp",
  "instinctive",
  "snap",
  "streak-3",
  "streak-7",
  "streak-30",
  "top-ten",
  "challenger",
] as const;

export type BadgeId = (typeof BADGE_IDS)[number];

interface BadgeDefinition {
  id: BadgeId;
  name: string;
  description: string;
  how: string;
  earned: (source: BadgeSource) => boolean;
}

export interface BadgeStatus {
  id: BadgeId;
  name: string;
  description: string;
  how: string;
  earned: boolean;
}

function bestOf(best: number | undefined, values: number[]): number {
  return Math.max(best ?? 0, 0, ...values);
}

function operatorDone(source: BadgeSource): boolean {
  return source.operator.runs.length > 0;
}

function quickDone(source: BadgeSource): boolean {
  return source.quick.runs.length > 0;
}

function completedSkills(source: BadgeSource): number {
  return CATEGORY_IDS.filter((id) => (source.skills[id]?.runs.length ?? 0) > 0).length;
}

function dailyDone(source: BadgeSource): boolean {
  return Object.keys(source.daily).some((date) => /^\d{4}-\d{2}-\d{2}$/.test(date));
}

function operatorScore(source: BadgeSource): number {
  return bestOf(source.operator.best, source.operator.runs.map((run) => run.score));
}

function skillScore(source: BadgeSource): number {
  return bestOf(
    0,
    CATEGORY_IDS.map((id) => {
      const skill = source.skills[id];
      return bestOf(skill?.best, skill?.runs.map((run) => run.score) ?? []);
    }),
  );
}

function quickDpm(source: BadgeSource): number {
  return bestOf(source.quick.bestDpm, source.quick.runs.map((run) => run.dpm));
}

function snapCall(source: BadgeSource): boolean {
  return source.quick.runs.some(
    (run) =>
      run.made >= 1 &&
      run.avgSeconds > 0 &&
      run.avgSeconds < SNAP_MAX_SECONDS &&
      run.accuracy >= DPM_ACCURACY_FLOOR,
  );
}

const STREAK_HOW =
  "A missed day starts the count over. The badge stays after the streak breaks, as long as those days are still saved in this browser.";

export const BADGES: readonly BadgeDefinition[] = [
  {
    id: "first-call",
    name: "First call",
    description: "Finish any quiz.",
    how: "Finish the Operator Test, a skill test, Quick Decisions, or a Daily Decision.",
    earned: (source) => operatorDone(source) || quickDone(source) || completedSkills(source) > 0 || dailyDone(source),
  },
  {
    id: "four-modes",
    name: "All four modes",
    description: "Finish every way to train.",
    how: "Finish the Operator Test, Quick Decisions, at least one skill test, and a Daily Decision.",
    earned: (source) => operatorDone(source) && quickDone(source) && completedSkills(source) > 0 && dailyDone(source),
  },
  {
    id: "full-bench",
    name: "All eight skills",
    description: "Finish every skill test.",
    how: "Finish one run of each of the eight skill tests.",
    earned: (source) => completedSkills(source) === CATEGORY_IDS.length,
  },
  {
    id: "operator",
    name: "Operator",
    description: `Score ${OPERATOR_BADGE_SCORE}+ on the Operator Test.`,
    how: `Score ${OPERATOR_BADGE_SCORE} or higher on the Operator Test. That is the Operator tier.`,
    earned: (source) => operatorScore(source) >= OPERATOR_BADGE_SCORE,
  },
  {
    id: "elite",
    name: "Elite operator",
    description: `Score ${ELITE_BADGE_SCORE}+ on the Operator Test.`,
    how: `Score ${ELITE_BADGE_SCORE} or higher on the Operator Test. That is the Elite Operator tier.`,
    earned: (source) => operatorScore(source) >= ELITE_BADGE_SCORE,
  },
  {
    id: "specialist",
    name: "Specialist",
    description: `Score ${OPERATOR_BADGE_SCORE}+ on a skill test.`,
    how: `Score ${OPERATOR_BADGE_SCORE} or higher on any one of the eight skill tests.`,
    earned: (source) => skillScore(source) >= OPERATOR_BADGE_SCORE,
  },
  {
    id: "sharp",
    name: "Sharp",
    description: `Score ${SHARP_BADGE_DPM}+ DPM in Quick Decisions.`,
    how: `Score ${SHARP_BADGE_DPM} decisions per minute or higher on Quick Decisions. That is the Sharp tier.`,
    earned: (source) => quickDpm(source) >= SHARP_BADGE_DPM,
  },
  {
    id: "instinctive",
    name: "Instinctive",
    description: `Score ${INSTINCTIVE_BADGE_DPM}+ DPM in Quick Decisions.`,
    how: `Score ${INSTINCTIVE_BADGE_DPM} decisions per minute or higher on Quick Decisions. That is the Instinctive tier.`,
    earned: (source) => quickDpm(source) >= INSTINCTIVE_BADGE_DPM,
  },
  {
    id: "snap",
    name: "Snap call",
    description: `Average under ${SNAP_MAX_SECONDS} seconds in Quick Decisions.`,
    how: `Finish a Quick Decisions round averaging under ${SNAP_MAX_SECONDS} seconds per decision, with at least ${Math.round(DPM_ACCURACY_FLOOR * 100)}% accuracy.`,
    earned: snapCall,
  },
  {
    id: "streak-3",
    name: "Three-day streak",
    description: "Answer the Daily Decision 3 days running.",
    how: `Answer the Daily Decision 3 days in a row. ${STREAK_HOW}`,
    earned: (source) => longestDailyStreak(source.daily) >= 3,
  },
  {
    id: "streak-7",
    name: "Seven-day streak",
    description: "Answer the Daily Decision 7 days running.",
    how: `Answer the Daily Decision 7 days in a row. ${STREAK_HOW}`,
    earned: (source) => longestDailyStreak(source.daily) >= 7,
  },
  {
    id: "streak-30",
    name: "Thirty-day streak",
    description: "Answer the Daily Decision 30 days running.",
    how: `Answer the Daily Decision 30 days in a row. ${STREAK_HOW}`,
    earned: (source) => longestDailyStreak(source.daily) >= 30,
  },
  {
    id: "top-ten",
    name: "Top ten",
    description: "Place 10th or better on a leaderboard.",
    how: "Post a score to a leaderboard. If that response places you at 10 or better, this badge is saved in this browser.",
    earned: (source) =>
      source.marks.bestRank !== null && source.marks.bestRank >= 1 && source.marks.bestRank <= TOP_TEN_MAX_RANK,
  },
  {
    id: "challenger",
    name: "Challenger",
    description: "Share a result.",
    how: "Share a quiz result: copy the link, download the image, or send it.",
    earned: (source) => source.marks.sharedAt !== null,
  },
];

if (BADGES.length !== BADGE_IDS.length || BADGES.some((badge, index) => badge.id !== BADGE_IDS[index])) {
  throw new Error("Badge ids are out of order");
}

export function evaluateBadges(source: BadgeSource): BadgeStatus[] {
  return BADGES.map((badge) => ({
    id: badge.id,
    name: badge.name,
    description: badge.description,
    how: badge.how,
    earned: badge.earned(source),
  }));
}

export function earnedBadgeIds(source: BadgeSource): BadgeId[] {
  return evaluateBadges(source).flatMap((badge) => (badge.earned ? [badge.id] : []));
}

/** Badges present on `after` that were not present on `before`, in catalog order. */
export function newBadgeIds(before: BadgeSource, after: BadgeSource): BadgeId[] {
  const had = new Set(earnedBadgeIds(before));
  return earnedBadgeIds(after).filter((id) => !had.has(id));
}

export function emptyMarks(): BadgeMarks {
  return { sharedAt: null, bestRank: null };
}

/** Read marks from saved or imported JSON. Drops anything that is not a date or a rank. */
export function reviveMarks(raw: unknown): BadgeMarks {
  const record =
    raw !== null && typeof raw === "object" && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};
  const sharedAt = typeof record.sharedAt === "string" ? record.sharedAt : "";
  const rank = typeof record.bestRank === "number" ? record.bestRank : Number.NaN;
  return marksAfterRank(marksAfterShare(emptyMarks(), sharedAt), rank);
}

export function marksAfterShare(marks: BadgeMarks, at: string): BadgeMarks {
  if (marks.sharedAt) return marks;
  if (typeof at !== "string" || at.length === 0 || at.length > 40 || !Number.isFinite(Date.parse(at))) return marks;
  return { ...marks, sharedAt: at };
}

export function marksAfterRank(marks: BadgeMarks, rank: number): BadgeMarks {
  if (typeof rank !== "number" || !Number.isInteger(rank) || rank < 1 || rank > 100_000) return marks;
  if (marks.bestRank !== null && marks.bestRank <= rank) return marks;
  return { ...marks, bestRank: rank };
}

/** Allow-listed funnel name. Null when `id` is not one of ours, so a score cannot be appended. */
export function badgeEventName(id: string): string | null {
  return (BADGE_IDS as readonly string[]).includes(id) ? `badge_earned:${id}` : null;
}

export function badgeById(id: string): BadgeDefinition | undefined {
  return BADGES.find((badge) => badge.id === id);
}

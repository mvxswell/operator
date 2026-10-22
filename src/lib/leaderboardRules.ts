import { CATEGORIES, CATEGORY_IDS } from "./categories";

/**
 * Quizzes with a public board. Skill slugs match the quiz categories.
 * Daily Decision is not a board: it is one shared scenario and a private streak,
 * and the privacy page does not publish how other people answered.
 */
export const LEADERBOARD_MODES = ["operator", "quick", ...CATEGORY_IDS] as const;

export type LeaderboardMode = (typeof LEADERBOARD_MODES)[number];

export const NICKNAME_PATTERN = /^[A-Za-z0-9 _-]{2,20}$/;
export const CLIENT_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const QUICK_MAX = 300;
const STANDARD_MAX = 1000;

export function isLeaderboardMode(value: string): value is LeaderboardMode {
  return (LEADERBOARD_MODES as readonly string[]).includes(value);
}

/**
 * Board selected by the leaderboard page.
 * `quiz` is the public query param. `mode` still works so older links keep opening the same board.
 */
export function selectedQuiz(
  quiz: string | null | undefined,
  mode: string | null | undefined,
): LeaderboardMode {
  if (quiz && isLeaderboardMode(quiz)) return quiz;
  if (mode && isLeaderboardMode(mode)) return mode;
  return "operator";
}

export function quizLabel(quiz: string): string {
  if (quiz === "operator") return "Operator Test";
  if (quiz === "quick") return "Quick Decisions";
  return CATEGORIES.find((category) => category.id === quiz)?.name ?? "Operator Test";
}

/** Link to one quiz's board. Unknown slugs open the Operator Test board. */
export function quizBoardPath(quiz: string): string {
  const slug = isLeaderboardMode(quiz) ? quiz : "operator";
  return `/leaderboard?quiz=${slug}`;
}

/** Inclusive upper bound posted scores may use for a mode. */
export function maxScoreForMode(mode: string): number | null {
  if (!isLeaderboardMode(mode)) return null;
  return mode === "quick" ? QUICK_MAX : STANDARD_MAX;
}

/**
 * Shortest run the server will keep.
 * Operator Test: 20 questions. Skill test: 10. Quick Decisions: 60 seconds.
 */
export function minDurationForMode(mode: string): number | null {
  if (mode === "operator") return 45_000;
  if (mode === "quick") return 50_000;
  if (isLeaderboardMode(mode)) return 20_000;
  return null;
}

export function nicknameError(value: string): string | null {
  const nickname = value.trim();
  if (!NICKNAME_PATTERN.test(nickname) || !/[A-Za-z0-9]/.test(nickname)) {
    return "Use 2–20 characters: letters, numbers, spaces, _ and -.";
  }
  return null;
}

export function formatDuration(durationMs: number): string {
  const total = Math.max(0, Math.round(durationMs / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const clock = `${minutes}:${String(seconds).padStart(2, "0")}`;
  return hours > 0 ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}` : clock;
}

export function leaderboardErrorMessage(raw: string): string {
  if (raw.includes("nickname_not_allowed")) return "That nickname isn't allowed.";
  if (raw.includes("invalid_nickname")) {
    return "Use 2–20 characters: letters, numbers, spaces, _ and -.";
  }
  if (raw.includes("rate_limited")) return "Too many posts from this browser. Wait and try again.";
  if (raw.includes("implausible_duration")) return "This run was too short to post.";
  if (raw.includes("invalid_score")) return "That score is outside the range for this mode.";
  if (raw.includes("invalid_mode") || raw.includes("invalid_client")) {
    return "This score can't be posted.";
  }
  return "Could not reach the leaderboard. Try again.";
}

export interface RankInput {
  nickname: string;
  score: number;
  durationMs: number;
  createdAt: string;
}

/** Higher score, then faster time, then earlier post. Negative means `a` ranks first. */
export function compareRank(a: RankInput, b: RankInput): number {
  if (a.score !== b.score) return b.score - a.score;
  if (a.durationMs !== b.durationMs) return a.durationMs - b.durationMs;
  if (a.createdAt < b.createdAt) return -1;
  if (a.createdAt > b.createdAt) return 1;
  return 0;
}

/** One best run per nickname, then ranked. */
export function rankBestRuns<T extends RankInput>(rows: readonly T[]): (T & { rank: number })[] {
  const best = new Map<string, T>();
  for (const row of rows) {
    const key = row.nickname.trim().toLowerCase();
    const current = best.get(key);
    if (!current || compareRank(row, current) < 0) best.set(key, row);
  }
  return [...best.values()].sort(compareRank).map((row, index) => ({ ...row, rank: index + 1 }));
}

/** Best run per nickname on one quiz. Other quizzes are left out. */
export function rankQuizRuns<T extends RankInput & { quiz: string }>(
  rows: readonly T[],
  quiz: string,
): (T & { rank: number })[] {
  if (!isLeaderboardMode(quiz)) return [];
  return rankBestRuns(rows.filter((row) => row.quiz === quiz));
}

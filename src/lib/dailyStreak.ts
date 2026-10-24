import { todayKey } from "./storage";

/** Move a YYYY-MM-DD key by whole local days. Noon avoids DST edges. */
export function shiftDateKey(dateKey: string, days: number): string {
  const cursor = new Date(`${dateKey}T12:00:00`);
  if (Number.isNaN(cursor.getTime())) return dateKey;
  cursor.setDate(cursor.getDate() + days);
  return todayKey(cursor);
}

/**
 * Consecutive daily decisions ending on `from`, counting that day when it
 * has an answer. A miss before today does not erase a streak that is still
 * alive through yesterday — pass yesterday as `from` for that case.
 */
export function consecutiveDailyStreak(daily: Record<string, unknown>, from: string): number {
  let streak = 0;
  let cursor = from;
  const seen = new Set<string>();
  while (daily[cursor] && !seen.has(cursor)) {
    seen.add(cursor);
    streak += 1;
    cursor = shiftDateKey(cursor, -1);
  }
  return streak;
}

/** Longest run of consecutive answered days anywhere in saved history. */
export function longestDailyStreak(daily: Record<string, unknown>): number {
  let best = 0;
  for (const date of Object.keys(daily)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
    const length = consecutiveDailyStreak(daily, date);
    if (length > best) best = length;
  }
  return best;
}

/** The `days` calendar keys ending on `dateKey`, oldest first. */
export function recentDateKeys(dateKey: string, days = 7): string[] {
  const count = Math.max(1, Math.floor(days));
  const keys: string[] = [];
  for (let offset = count - 1; offset >= 0; offset -= 1) {
    keys.push(shiftDateKey(dateKey, -offset));
  }
  return keys;
}

/**
 * Streak the home page and nav can show without guessing.
 * Before today's answer, the live streak is the run that still includes yesterday.
 */
export function dailyHabitStatus(
  daily: Record<string, unknown>,
  dateKey: string,
): { answeredToday: boolean; streak: number } {
  const answeredToday = Boolean(daily[dateKey]);
  const from = answeredToday ? dateKey : shiftDateKey(dateKey, -1);
  return { answeredToday, streak: consecutiveDailyStreak(daily, from) };
}

/** All-time answered days and how often the best call was the one saved. */
export function summarizeDaily(daily: Record<string, unknown>): {
  answered: number;
  correct: number;
  accuracy: number;
} {
  let answered = 0;
  let correct = 0;
  for (const [date, value] of Object.entries(daily)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !value || typeof value !== "object") continue;
    answered += 1;
    if ((value as { correct?: unknown }).correct === true) correct += 1;
  }
  return { answered, correct, accuracy: answered ? correct / answered : 0 };
}

/** Local time until the next midnight, for the daily return line. */
export function nextScenarioLabel(now: Date = new Date()): string {
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  const minutes = Math.max(1, Math.ceil((next.getTime() - now.getTime()) / 60_000));
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `in ${hours}h ${mins}m` : `in ${mins}m`;
}

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

/** Local time until the next midnight, for the daily return line. */
export function nextScenarioLabel(now: Date = new Date()): string {
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  const minutes = Math.max(1, Math.ceil((next.getTime() - now.getTime()) / 60_000));
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `in ${hours}h ${mins}m` : `in ${mins}m`;
}

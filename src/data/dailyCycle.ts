import { mulberry32, shuffle } from "../lib/random";

/**
 * Calendar-day cycle for Daily Decision.
 *
 * The slot is the UTC epoch day modulo the pool length, then a fixed
 * permutation. Adjacent days cannot collide, and a window shorter than the
 * pool never repeats. Every visitor who passes the same YYYY-MM-DD gets the
 * same scenario and the same daily number.
 *
 * Changing the seed or the pool length moves which scenario lands on a date.
 */
export const DAILY_CYCLE_SEED = 0x0d4117;

const MS_PER_DAY = 86_400_000;

/** UTC epoch day for a real YYYY-MM-DD date, or null when the key is not one. */
export function utcDayIndex(dateKey: string): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const utc = Date.UTC(year, month - 1, day);
  if (!Number.isFinite(utc)) return null;
  const check = new Date(utc);
  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day
  ) {
    return null;
  }
  return Math.floor(utc / MS_PER_DAY);
}

/** Bijection of 0..length-1. Stable for a given length and seed. */
export function dailyPermutation(length: number, seed = DAILY_CYCLE_SEED): number[] {
  if (length <= 0) return [];
  return shuffle(
    Array.from({ length }, (_, index) => index),
    mulberry32(seed >>> 0),
  );
}

/** Position in the cycle for an epoch day. Negative days stay inside the pool. */
export function dailySlot(dayIndex: number, length: number): number {
  if (length <= 0) return 0;
  const mod = dayIndex % length;
  return mod < 0 ? mod + length : mod;
}

/** Public "Daily Decision #…" label. Grouping is fixed so server and client match. */
export function formatDailyDecisionNumber(value: number): string {
  const negative = value < 0;
  const digits = String(Math.abs(Math.trunc(value)));
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return negative ? `#-${grouped}` : `#${grouped}`;
}

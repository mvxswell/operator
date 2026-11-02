/**
 * Togi Tracker (/togi/): an unofficial fan tracker of Togi's (Shane Stoffer) public
 * stock-challenge posts. The data is maintained outside this repo and served by the
 * tracker's own Worker, so the page reads it live in the browser and falls back to a
 * bundled snapshot (src/data/togiSnapshot.json) when the live feed is unreachable.
 *
 * The live feed is third-party data, so it is validated here and every link it
 * carries is restricted to an X post URL before it reaches the page.
 */

export const TOGI_LIVE_URL = "https://togi-tracker.mrm1244.workers.dev/trades.json";
export const TOGI_LIVE_ORIGIN = new URL(TOGI_LIVE_URL).origin;
export const TOGI_PROFILE_URL = "https://x.com/ShaneStoffer";

export type TogiTrade = {
  date: string;
  ticker: string;
  type: string;
  direction?: string;
  details: string;
  pnl: number | null;
  pnl_derived?: boolean;
  outcome: string;
  account_value?: number | null;
  source_url: string;
  note?: string;
};

export type TogiHistoryPoint = { date: string; account: string; value: number; label: string; source_url: string };

export type TogiData = {
  meta: {
    goal: number;
    previous_goal: number;
    goal_changed_on: string;
    goal_change_source: string;
    original_announcement: { date: string; text?: string; source_url?: string };
    starting_value: number;
    starting_value_note: string;
    latest_value: number;
    latest_value_date: string;
    latest_value_label: string;
    latest_value_source: string;
    latest_value_caveat: string;
    last_updated: string;
  };
  account_history: TogiHistoryPoint[];
  trades: TogiTrade[];
  open_positions_snapshot: {
    date: string;
    source_url: string;
    positions: { ticker: string; value: number; shares: number; unrealized: number | null; pct: number | null }[];
  };
  side_quests: { date: string; text: string; source_url: string }[];
};

export type TogiSource = "live" | "snapshot";

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const X_POST = /^https:\/\/(?:x|twitter)\.com\/[A-Za-z0-9_]{1,15}\/status\/\d{1,25}$/;

/** Only links to X posts are rendered; anything else becomes the profile link. */
export function safeXUrl(url: unknown): string {
  return typeof url === "string" && X_POST.test(url) ? url : TOGI_PROFILE_URL;
}

const isNum = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
const isStr = (v: unknown): v is string => typeof v === "string";
const isDate = (v: unknown): v is string => isStr(v) && DATE.test(v) && !Number.isNaN(Date.parse(v));
const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);

/** Shape check for the feed. A payload that fails it is ignored in favour of the snapshot. */
export function isTogiData(value: unknown): value is TogiData {
  if (!isObj(value) || !isObj(value.meta)) return false;
  const m = value.meta;
  if (![m.goal, m.previous_goal, m.starting_value, m.latest_value].every(isNum)) return false;
  if ((m.goal as number) <= 0 || (m.latest_value as number) <= 0) return false;
  if (![m.goal_changed_on, m.latest_value_date, m.last_updated].every(isDate)) return false;
  if (!isObj(m.original_announcement) || !isDate(m.original_announcement.date)) return false;
  if (!Array.isArray(value.trades) || !value.trades.length) return false;
  for (const t of value.trades) {
    if (!isObj(t) || !isDate(t.date) || !isStr(t.ticker) || !isStr(t.type) || !isStr(t.details) || !isStr(t.outcome)) return false;
    if (t.pnl !== null && !isNum(t.pnl)) return false;
  }
  if (!Array.isArray(value.account_history) || value.account_history.length < 2) return false;
  for (const h of value.account_history) {
    if (!isObj(h) || !isDate(h.date) || !isNum(h.value) || !isStr(h.account)) return false;
  }
  const s = value.open_positions_snapshot;
  if (!isObj(s) || !isDate(s.date) || !Array.isArray(s.positions)) return false;
  for (const p of s.positions) if (!isObj(p) || !isStr(p.ticker) || !isNum(p.value) || !isNum(p.shares)) return false;
  if (!Array.isArray(value.side_quests)) return false;
  for (const q of value.side_quests) if (!isObj(q) || !isDate(q.date) || !isStr(q.text)) return false;
  return true;
}

/**
 * Reads the live feed with a timeout. Any failure (network, CORS, non-200, bad JSON,
 * wrong shape) returns the bundled snapshot so the page never renders empty.
 */
export async function loadTogiData(
  snapshot: TogiData,
  fetchImpl: typeof fetch = fetch,
  timeoutMs = 5000,
): Promise<{ data: TogiData; source: TogiSource }> {
  const controller = typeof AbortController === "function" ? new AbortController() : undefined;
  const timer = setTimeout(() => controller?.abort(), timeoutMs);
  try {
    const res = await fetchImpl(TOGI_LIVE_URL, { cache: "no-store", credentials: "omit", signal: controller?.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: unknown = await res.json();
    if (!isTogiData(data)) throw new Error("unexpected feed shape");
    return { data, source: "live" };
  } catch {
    return { data: snapshot, source: "snapshot" };
  } finally {
    clearTimeout(timer);
  }
}

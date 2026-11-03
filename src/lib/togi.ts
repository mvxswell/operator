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
  /** Optional, newer part of the feed. Validated separately by isTogiPortfolio. */
  portfolio?: unknown;
};

export type TogiAccount = {
  id: string;
  name: string;
  status: string;
  as_of: string;
  total_value: number;
  day_change?: number | null;
  day_change_pct?: number | null;
  unrealized_total?: number | null;
  unrealized_total_pct?: number | null;
  cash: number | null;
  cash_note?: string;
  pending_activity?: number | null;
  buying_power?: number | null;
  open_positions_note?: string;
  source_url?: string;
};

export type TogiPosition = {
  ticker: string;
  name: string;
  account: string;
  asset_type: string;
  option: null | { right?: string; strike?: number; expiry?: string; contracts?: number };
  shares: number;
  last_price: number | null;
  value: number;
  pct_of_account: number;
  day_change?: number | null;
  unrealized: number | null;
  unrealized_pct: number | null;
  cost_basis: number | null;
  cost_basis_derived?: boolean;
  as_of: string;
  source_url?: string;
  status?: string;
  note?: string | null;
  latest_update?: { as_of: string; value: number; pct_of_account: number; unrealized_pct?: number | null; source_url?: string; label?: string };
};

export type TogiClosed = {
  date: string;
  ticker: string;
  type: string;
  outcome?: string;
  pnl: number | null;
  pnl_derived?: boolean;
  source_url?: string;
};

export type TogiPortfolio = {
  as_of: string;
  last_updated?: string;
  stale_after_days?: number;
  method?: string;
  accounts: TogiAccount[];
  positions: TogiPosition[];
  open_options?: unknown[];
  open_options_note?: string;
  concentration?: { ticker: string; pct_of_account: number; value: number; account?: string; as_of: string; source_url?: string; text?: string } | null;
  closed?: { known_realized_total: number | null; count_known?: number; count_undisclosed?: number; note?: string; items: TogiClosed[] } | null;
  commentary?: { date: string; text: string; source_url?: string }[];
};

export type TogiSource = "live" | "snapshot";

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const X_POST = /^https:\/\/(?:x|twitter)\.com\/[A-Za-z0-9_]{1,15}\/status\/\d{1,25}$/;

/** Only links to X posts are rendered; anything else becomes the profile link. */
export function safeXUrl(url: unknown): string {
  return typeof url === "string" && X_POST.test(url) ? url : TOGI_PROFILE_URL;
}

/** Like safeXUrl, but returns null for anything that is not an X post, so no link is drawn. */
export function xPostUrl(url: unknown): string | null {
  return typeof url === "string" && X_POST.test(url) ? url : null;
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

const numOrNull = (v: unknown) => v === null || isNum(v);
const optNum = (v: unknown) => v === undefined || numOrNull(v);
const optStr = (v: unknown) => v === undefined || v === null || isStr(v);

/**
 * Shape check for the optional `portfolio` object. When it fails, /togi/ hides the
 * Portfolio section and renders everything else as before.
 */
export function isTogiPortfolio(value: unknown): value is TogiPortfolio {
  if (!isObj(value) || !isDate(value.as_of)) return false;
  if (!optNum(value.stale_after_days) || !optStr(value.method) || !optStr(value.open_options_note)) return false;
  if (!Array.isArray(value.accounts) || !value.accounts.length) return false;
  for (const a of value.accounts) {
    if (!isObj(a) || !isStr(a.id) || !isStr(a.name) || !isStr(a.status) || !isDate(a.as_of) || !isNum(a.total_value)) return false;
    if (!numOrNull(a.cash)) return false;
    if (![a.day_change, a.day_change_pct, a.unrealized_total, a.unrealized_total_pct, a.pending_activity, a.buying_power].every(optNum)) return false;
    if (![a.cash_note, a.open_positions_note, a.source_url].every(optStr)) return false;
  }
  if (!Array.isArray(value.positions) || !value.positions.length) return false;
  for (const p of value.positions) {
    if (!isObj(p) || !isStr(p.ticker) || !isStr(p.name) || !isStr(p.account) || !isStr(p.asset_type) || !isDate(p.as_of)) return false;
    if (!isNum(p.value) || !isNum(p.pct_of_account) || !isNum(p.shares)) return false;
    if (![p.last_price, p.unrealized, p.unrealized_pct, p.cost_basis].every(numOrNull) || !optNum(p.day_change)) return false;
    if (p.option !== null && p.option !== undefined && !isObj(p.option)) return false;
    if (![p.note, p.source_url, p.status].every(optStr)) return false;
    const u = p.latest_update;
    if (u !== undefined && u !== null && (!isObj(u) || !isDate(u.as_of) || !isNum(u.value) || !isNum(u.pct_of_account) || !optNum(u.unrealized_pct) || !optStr(u.label))) return false;
  }
  if (value.open_options !== undefined && !Array.isArray(value.open_options)) return false;
  const k = value.concentration;
  if (k !== undefined && k !== null && (!isObj(k) || !isStr(k.ticker) || !isNum(k.pct_of_account) || !isNum(k.value) || !isDate(k.as_of) || !optStr(k.text))) return false;
  const c = value.closed;
  if (c !== undefined && c !== null) {
    if (!isObj(c) || !numOrNull(c.known_realized_total) || !optNum(c.count_known) || !optNum(c.count_undisclosed) || !optStr(c.note) || !Array.isArray(c.items)) return false;
    for (const t of c.items) if (!isObj(t) || !isDate(t.date) || !isStr(t.ticker) || !isStr(t.type) || !numOrNull(t.pnl)) return false;
  }
  if (value.commentary !== undefined) {
    if (!Array.isArray(value.commentary)) return false;
    for (const q of value.commentary) if (!isObj(q) || !isDate(q.date) || !isStr(q.text)) return false;
  }
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

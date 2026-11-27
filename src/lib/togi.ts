/**
 * Togi Tracker (/togi/): an unofficial fan tracker of Togi's (Shane Stoffer) public
 * stock-challenge posts. The data is maintained outside this repo and served by the
 * tracker's own Worker. /togi/ and the homepage read it live in the browser and fall
 * back to a bundled snapshot (src/data/togiSnapshot.json) when the live feed is unreachable.
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
    /** Optional. Link to Togi's X profile, where Money tips go. Validated by safeTipUrl. */
    tip_url?: unknown;
    /** Optional. One line shown beside the tip button, rendered as plain text. */
    tip_note?: unknown;
    /** Optional https link for the "Donate to the kids" button. Invalid values fall back to RMHC. */
    donate_url?: unknown;
    /** Optional tracker version from the feed, such as "2.1". Shown as V2.1. */
    version?: unknown;
    /** Optional current-challenge block. Preferred over the flat headline fields when status is current. */
    challenge?: unknown;
  };
  account_history: TogiHistoryPoint[];
  trades: TogiTrade[];
  side_quests: { date: string; text: string; source_url: string }[];
  /** Optional, newer part of the feed. Validated separately by isTogiPortfolio. */
  portfolio?: unknown;
  /** Optional. Validated separately by isRobinhoodStats; a missing key hides the panel. */
  robinhood_stats?: unknown;
  /** Optional. Validated by isTogiDonations; a missing or bad key hides the section. */
  donations?: unknown;
  /** Optional earlier challenges. A missing key hides the previous-challenge card. */
  challenges?: unknown;
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
  /** Broker chart return over its displayed three-month window; not a trade subtotal. */
  period_change_3m?: number | null;
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
  latest_update?: { as_of: string; value: number | null; pct_of_account: number | null; unrealized_pct?: number | null; source_url?: string; label?: string };
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

/** Optional `robinhood_stats` object. Validated by isRobinhoodStats; missing or malformed hides the panel. */
export type RobinhoodPoint = { date: string; value: number; label: string; source_url: string };

export type RobinhoodLatest = RobinhoodPoint & { day_change: number | null; day_change_pct: number | null };

export type RobinhoodToday = { value: number; derived: boolean; method: string; source_url: string };

export type RobinhoodStats = {
  starting_deposit: string;
  first_posted: RobinhoodPoint;
  peak: RobinhoodPoint;
  low_after_fidelity_move: RobinhoodPoint;
  latest: RobinhoodLatest;
  today_start: RobinhoodToday | null;
  note: string;
  withdrawal_source_url: string;
};

/** One row of the optional top-level `donations` array. `amount_usd: null` means not disclosed. */
export type TogiDonation = {
  date: string;
  recipient: string;
  amount_usd: number | null;
  status: "completed" | "pledged";
  note?: string;
  source_url: string;
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

const TIP_HOSTS = new Set(["x.com", "twitter.com"]);
export const TIP_NOTE_MAX = 200;

/**
 * The tip button only links to an https X profile or post. Anything else, including
 * javascript:, http:, other hosts, credentials, or a custom port, returns null and the
 * button is not drawn.
 */
export function safeTipUrl(url: unknown): string | null {
  if (typeof url !== "string" || url.length > 300) return null;
  let parsed: URL;
  try { parsed = new URL(url); } catch { return null; }
  if (parsed.protocol !== "https:" || !TIP_HOSTS.has(parsed.hostname)) return null;
  if (parsed.username || parsed.password || parsed.port) return null;
  return parsed.href;
}

/** Plain-text note for the tip button: trimmed, whitespace collapsed, capped. Empty or non-string gives null. */
export function tipNoteText(note: unknown): string | null {
  if (typeof note !== "string") return null;
  const text = note.replace(/\s+/g, " ").trim();
  if (!text) return null;
  return text.length > TIP_NOTE_MAX ? text.slice(0, TIP_NOTE_MAX - 1).trimEnd() + "…" : text;
}

/** Tip button data from the feed meta, or null when the button should be hidden. */
export function togiTip(meta: { tip_url?: unknown; tip_note?: unknown } | null | undefined): { url: string; note: string | null } | null {
  const url = safeTipUrl(meta?.tip_url);
  return url ? { url, note: tipNoteText(meta?.tip_note) } : null;
}

/** Official RMHC donate page. Used when the feed has no safe donate_url. */
export const DONATE_FALLBACK_URL = "https://ronaldmcdonaldhouse.org/donate";

const DONATE_HOSTS = new Set(["ronaldmcdonaldhouse.org", "www.ronaldmcdonaldhouse.org"]);

/**
 * Donate button target. Only an https Ronald McDonald House Charities URL is
 * followed; anything else (including a missing key) uses the public donate page.
 */
export function safeDonateUrl(url: unknown): string {
  if (typeof url !== "string" || url.length > 500) return DONATE_FALLBACK_URL;
  let parsed: URL;
  try { parsed = new URL(url); } catch { return DONATE_FALLBACK_URL; }
  if (parsed.protocol !== "https:" || !DONATE_HOSTS.has(parsed.hostname)) return DONATE_FALLBACK_URL;
  if (parsed.username || parsed.password || parsed.port) return DONATE_FALLBACK_URL;
  return parsed.href;
}

const VERSION_LABEL = /^[0-9]{1,3}(?:\.[0-9]{1,3}){0,2}$/;

/** Badge text. Prefers meta.version ("2.1" → "V2.1") and falls back to V2.1. */
export function togiVersionLabel(meta: { version?: unknown } | null | undefined): string {
  const raw = typeof meta?.version === "string" ? meta.version.trim() : "";
  return VERSION_LABEL.test(raw) ? `V${raw}` : "V2.1";
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
    if (![a.day_change, a.day_change_pct, a.unrealized_total, a.unrealized_total_pct, a.pending_activity, a.buying_power, a.period_change_3m].every(optNum)) return false;
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
    if (u !== undefined && u !== null && (!isObj(u) || !isDate(u.as_of) || !numOrNull(u.value) || !numOrNull(u.pct_of_account) || !optNum(u.unrealized_pct) || !optStr(u.label))) return false;
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

const isPoint = (v: unknown): v is RobinhoodPoint =>
  isObj(v) && isDate(v.date) && isNum(v.value) && isStr(v.label) && isStr(v.source_url);

/**
 * Shape check for the optional `robinhood_stats` object. When it is missing or fails,
 * /togi/ hides the Robinhood panel and renders everything else as before.
 */
export function isRobinhoodStats(value: unknown): value is RobinhoodStats {
  if (!isObj(value) || !isStr(value.starting_deposit)) return false;
  if (!isPoint(value.first_posted) || !isPoint(value.peak) || !isPoint(value.low_after_fidelity_move)) return false;
  const latest = value.latest;
  if (!isObj(latest) || !numOrNull(latest.day_change) || !numOrNull(latest.day_change_pct) || !isPoint(latest)) return false;
  const today = value.today_start;
  if (today !== null && (!isObj(today) || !isNum(today.value) || typeof today.derived !== "boolean" || !isStr(today.method) || !isStr(today.source_url))) return false;
  if (!isStr(value.note) || !isStr(value.withdrawal_source_url)) return false;
  return true;
}

/**
 * Shape check for the optional top-level `donations` array. A missing key or a
 * malformed list hides the section; it does not reject the rest of the feed.
 */
export function isTogiDonations(value: unknown): value is TogiDonation[] {
  if (!Array.isArray(value) || !value.length) return false;
  for (const d of value) {
    if (!isObj(d) || !isDate(d.date) || !isStr(d.recipient) || !d.recipient.trim()) return false;
    if (!numOrNull(d.amount_usd)) return false;
    if (d.status !== "completed" && d.status !== "pledged") return false;
    if (!isStr(d.source_url)) return false;
    if (d.note !== undefined && !isStr(d.note)) return false;
  }
  return true;
}

/** Compact challenge amounts: $6K, $31K, $1M, $1.63M. */
export function compactChallengeUsd(n: number): string {
  const sign = n < 0 ? "-" : "";
  const a = Math.abs(n);
  if (a >= 1_000_000) return `${sign}$${+((a / 1_000_000).toFixed(2))}M`;
  if (a >= 1_000) return `${sign}$${Math.round(a / 1_000)}K`;
  return `${sign}$${Math.round(a).toLocaleString("en-US")}`;
}

/** Exact dollars. Cents only when the feed value is not a whole dollar. */
export function exactUsd(n: number): string {
  const digits = Number.isInteger(n) ? 0 : 2;
  return (n < 0 ? "-" : "") + "$" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function brokerName(account: unknown): string | null {
  const name = typeof account === "string" ? account.trim().toLowerCase() : "";
  if (name === "robinhood" || name === "options") return "Robinhood";
  if (name === "fidelity" || name === "challenge") return "Fidelity";
  return null;
}

type ChallengeFields = {
  status: string;
  account: string | null;
  goal: number;
  starting_value: number;
  latest_value: number;
  latest_value_date: string;
  latest_value_label: string;
  latest_value_source: string;
  announcement_text: string;
  source_url: string;
  milestones: number[] | null;
};

function readChallenge(value: unknown): ChallengeFields | null {
  if (!isObj(value) || !isNum(value.goal) || value.goal <= 0 || !isNum(value.starting_value) || !isNum(value.latest_value)) return null;
  const milestones = Array.isArray(value.milestones)
    ? value.milestones.filter((n): n is number => isNum(n) && n >= 0)
    : null;
  return {
    status: isStr(value.status) ? value.status : "",
    account: isStr(value.account) ? value.account : null,
    goal: value.goal,
    starting_value: value.starting_value,
    latest_value: value.latest_value,
    latest_value_date: isDate(value.latest_value_date) ? value.latest_value_date : "",
    latest_value_label: isStr(value.latest_value_label) ? value.latest_value_label : "",
    latest_value_source: isStr(value.latest_value_source) ? value.latest_value_source : "",
    announcement_text: isStr(value.announcement_text) ? value.announcement_text.trim() : "",
    source_url: isStr(value.source_url) ? value.source_url : "",
    milestones: milestones && milestones.length ? milestones : null,
  };
}

export type ChallengeView = {
  goal: number;
  starting_value: number;
  latest_value: number;
  latest_value_date: string;
  latest_value_label: string;
  latest_value_source: string;
  account: string | null;
  broker: string | null;
  announcement_text: string;
  announcement_source: string;
  milestones: number[];
  /** Which feed field supplied latest_value. */
  field: string;
};

const FALLBACK_QUOTE = "Now in operation 6k to $1m";
const FALLBACK_QUOTE_URL = "https://x.com/ShaneStoffer/status/2125652479945883664";

type DatedMark = { latest_value: number; latest_value_date: string; latest_value_label: string; latest_value_source: string; field: string };

/**
 * Numbers for the live challenge card. Goal and start come from the current
 * challenge. The posted value is whichever dated mark is newest, so a stale
 * meta.challenge.latest_value loses to a newer meta.latest_value.
 */
export function currentChallengeView(data: TogiData): ChallengeView {
  const meta = data.meta;
  const fromMeta = readChallenge(meta.challenge);
  const fromList = Array.isArray(data.challenges)
    ? data.challenges.map(readChallenge).find((item) => item?.status === "current") ?? null
    : null;
  const identity = fromMeta && (fromMeta.status === "current" || fromMeta.status === "")
    ? fromMeta
    : fromList ?? fromMeta;
  const marks: DatedMark[] = [{
    latest_value: meta.latest_value,
    latest_value_date: meta.latest_value_date,
    latest_value_label: meta.latest_value_label,
    latest_value_source: meta.latest_value_source,
    field: "meta.latest_value",
  }];
  if (fromMeta?.latest_value_date) marks.push({
    latest_value: fromMeta.latest_value,
    latest_value_date: fromMeta.latest_value_date,
    latest_value_label: fromMeta.latest_value_label,
    latest_value_source: fromMeta.latest_value_source,
    field: "meta.challenge.latest_value",
  });
  if (fromList?.latest_value_date) marks.push({
    latest_value: fromList.latest_value,
    latest_value_date: fromList.latest_value_date,
    latest_value_label: fromList.latest_value_label,
    latest_value_source: fromList.latest_value_source,
    field: "challenges[].latest_value",
  });
  marks.sort((a, b) => b.latest_value_date.localeCompare(a.latest_value_date) || (a.field === "meta.latest_value" ? -1 : b.field === "meta.latest_value" ? 1 : 0));
  const mark = marks[0];
  const goal = identity?.goal ?? meta.goal;
  const starting_value = identity?.starting_value ?? meta.starting_value;
  const ticks = new Set<number>();
  for (const n of identity?.milestones ?? []) if (n <= goal) ticks.add(n);
  if (!ticks.size) for (const n of [starting_value, 10_000, 100_000, 500_000, goal]) if (n >= 0 && n <= goal) ticks.add(n);
  if (starting_value >= 0 && starting_value <= goal) ticks.add(starting_value);
  ticks.add(goal);
  return {
    goal,
    starting_value,
    latest_value: mark.latest_value,
    latest_value_date: mark.latest_value_date,
    latest_value_label: mark.latest_value_label,
    latest_value_source: mark.latest_value_source,
    account: identity?.account ?? null,
    broker: brokerName(identity?.account) ?? (/robinhood/i.test(mark.latest_value_label) ? "Robinhood" : null),
    announcement_text: identity?.announcement_text || FALLBACK_QUOTE,
    announcement_source: identity?.source_url || meta.goal_change_source || FALLBACK_QUOTE_URL,
    milestones: [...ticks].sort((a, b) => a - b),
    field: mark.field,
  };
}

export type PriorChallenge = {
  account: string | null;
  broker: string | null;
  goal: number;
  starting_value: number;
  latest_value: number;
  latest_value_date: string;
  latest_value_source: string;
};

/** Earlier challenges. Empty when challenges[] is missing, so the history card stays hidden. */
export function priorChallengeList(data: { challenges?: unknown }): PriorChallenge[] {
  if (!Array.isArray(data.challenges)) return [];
  const out: PriorChallenge[] = [];
  for (const item of data.challenges) {
    const challenge = readChallenge(item);
    if (!challenge || challenge.status === "current") continue;
    if (challenge.status && challenge.status !== "historical") continue;
    if (!challenge.latest_value_date) continue;
    out.push({
      account: challenge.account,
      broker: brokerName(challenge.account),
      goal: challenge.goal,
      starting_value: challenge.starting_value,
      latest_value: challenge.latest_value,
      latest_value_date: challenge.latest_value_date,
      latest_value_source: challenge.latest_value_source,
    });
  }
  return out;
}

/** Last posted Fidelity total from a historical challenge, when the feed still carries one. */
export function historicalFidelityMark(data: { challenges?: unknown }): { latest_value: number; latest_value_date: string } | null {
  const prior = priorChallengeList(data).find((item) => item.broker === "Fidelity");
  return prior ? { latest_value: prior.latest_value, latest_value_date: prior.latest_value_date } : null;
}

/** The four numbers the homepage needs. The full feed stays on /togi/. */
export type TogiHeadline = {
  goal: number;
  starting_value: number;
  latest_value: number;
  latest_value_date: string;
};

export function togiHeadline(data: TogiData): TogiHeadline {
  const meta = data.meta;
  return {
    goal: meta.goal,
    starting_value: meta.starting_value,
    latest_value: meta.latest_value,
    latest_value_date: meta.latest_value_date,
  };
}

/**
 * Homepage fetch. Same feed and shape check as loadTogiData, but only the headline
 * comes back. A failure keeps the caller's snapshot headline.
 */
export async function loadTogiHeadline(
  fallback: TogiHeadline,
  fetchImpl: typeof fetch = fetch,
  timeoutMs = 5000,
): Promise<{ headline: TogiHeadline; source: TogiSource }> {
  const controller = typeof AbortController === "function" ? new AbortController() : undefined;
  const timer = setTimeout(() => controller?.abort(), timeoutMs);
  try {
    const res = await fetchImpl(TOGI_LIVE_URL, { cache: "no-store", credentials: "omit", signal: controller?.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: unknown = await res.json();
    if (!isTogiData(data)) throw new Error("unexpected feed shape");
    return { headline: togiHeadline(data), source: "live" };
  } catch {
    return { headline: fallback, source: "snapshot" };
  } finally {
    clearTimeout(timer);
  }
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

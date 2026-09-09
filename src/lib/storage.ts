import { CATEGORY_IDS } from "./categories";
import type { CategoryId, Difficulty } from "./types";

/**
 * Local persistence.
 *
 * Everything the app remembers lives behind `ProfileStore`. Swapping in a
 * database later means implementing the same interface against an API route —
 * no component reads `localStorage` directly.
 */

export const STORAGE_KEY = "operator.profile.v1";
export const SCHEMA_VERSION = 1;
export const MAX_RUNS_KEPT = 100;
export const MAX_BACKUP_BYTES = 2_000_000;

export interface OperatorRun {
  id: string;
  at: string;
  score: number;
  accuracy: number;
  avgSeconds: number;
  highestLevel: Difficulty;
  total: number;
  correct: number;
  skills: Partial<Record<CategoryId, number>>;
}

export interface QuickRun {
  id: string;
  at: string;
  dpm: number;
  made: number;
  correct: number;
  accuracy: number;
  avgSeconds: number;
  bestStreak: number;
}

export interface SkillRun {
  id: string;
  at: string;
  category: CategoryId;
  score: number;
  accuracy: number;
  highestLevel: Difficulty;
}

export interface DailyRecord {
  /** YYYY-MM-DD in the player's local timezone. */
  date: string;
  questionId: string;
  chosenChoiceId: string;
  correct: boolean;
  at: string;
}

export interface Profile {
  version: number;
  operator: { best: number; runs: OperatorRun[] };
  quick: { bestDpm: number; runs: QuickRun[]; recentQuestionIds: string[] };
  skills: Record<CategoryId, { best: number; runs: SkillRun[] }>;
  daily: Record<string, DailyRecord>;
}

/** Every category always has an entry, so new skills cannot produce holes. */
function buildSkills(
  source?: Partial<Profile["skills"]>,
): Profile["skills"] {
  const skills = {} as Profile["skills"];
  for (const id of CATEGORY_IDS) {
    skills[id] = source?.[id] ?? { best: 0, runs: [] };
  }
  return skills;
}

export function emptyProfile(): Profile {
  return {
    version: SCHEMA_VERSION,
    operator: { best: 0, runs: [] },
    quick: { bestDpm: 0, runs: [], recentQuestionIds: [] },
    skills: buildSkills(),
    daily: {},
  };
}

export interface ProfileStore {
  load(): Profile;
  save(profile: Profile): void;
  subscribe(listener: () => void): () => void;
  clear(): void;
}

type UnknownRecord = Record<string, unknown>;
const object = (value: unknown): UnknownRecord =>
  value !== null && typeof value === "object" && !Array.isArray(value) ? value as UnknownRecord : {};
const number = (value: unknown, max: number) =>
  typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.min(max, value)) : 0;
const validDate = (value: unknown): value is string =>
  typeof value === "string" && value.length <= 40 && Number.isFinite(Date.parse(value));
const text = (value: unknown, max = 100) => typeof value === "string" ? value.slice(0, max) : "";
const level = (value: unknown) => Math.max(1, Math.round(number(value, 6))) as Difficulty;

function runs<T>(value: unknown, convert: (row: UnknownRecord) => T): T[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value.slice(0, 1000).filter((item) => {
    const row = object(item);
    const id = text(row.id);
    if (!id || seen.has(id) || !validDate(row.at)) return false;
    seen.add(id);
    return true;
  }).sort((a, b) => Date.parse(b.at) - Date.parse(a.at)).slice(0, MAX_RUNS_KEPT).map((item) => convert(object(item)));
}

/** Treat browser storage and imported backups as untrusted input. */
export function reviveProfile(raw: unknown): Profile {
  const base = emptyProfile();
  if (!raw || typeof raw !== "object") return base;
  const parsed = object(raw);
  if (parsed.version !== SCHEMA_VERSION) return base;

  const operator = object(parsed.operator);
  const quick = object(parsed.quick);
  const skillSource = object(parsed.skills);
  const skills = buildSkills();
  for (const id of CATEGORY_IDS) {
    const source = object(skillSource[id]);
    skills[id] = {
      best: number(source.best, 1000),
      runs: runs(source.runs, (row) => ({
        id: text(row.id), at: row.at as string, category: id,
        score: number(row.score, 1000), accuracy: number(row.accuracy, 1), highestLevel: level(row.highestLevel),
      })),
    };
  }
  const daily: Record<string, DailyRecord> = {};
  for (const [date, value] of Object.entries(object(parsed.daily)).filter(([date]) => /^\d{4}-\d{2}-\d{2}$/.test(date) && validDate(date)).sort(([a], [b]) => b.localeCompare(a)).slice(0, 3660)) {
    const row = object(value);
    if (!validDate(row.at) || !text(row.questionId) || !text(row.chosenChoiceId)) continue;
    daily[date] = { date, questionId: text(row.questionId), chosenChoiceId: text(row.chosenChoiceId), correct: row.correct === true, at: row.at };
  }
  return {
    version: SCHEMA_VERSION,
    operator: {
      best: number(operator.best, 1000),
      runs: runs(operator.runs, (row) => {
        const total = Math.floor(number(row.total, 1000));
        const correct = Math.floor(number(row.correct, total));
        const scores = object(row.skills);
        return { id: text(row.id), at: row.at as string, score: number(row.score, 1000),
          total, correct, accuracy: total ? correct / total : 0, avgSeconds: number(row.avgSeconds, 86400),
          highestLevel: level(row.highestLevel),
          skills: Object.fromEntries(CATEGORY_IDS.filter((id) => typeof scores[id] === "number").map((id) => [id, number(scores[id], 100)])),
        };
      }),
    },
    quick: {
      bestDpm: number(quick.bestDpm, 300),
      recentQuestionIds: Array.isArray(quick.recentQuestionIds)
        ? [...new Set(quick.recentQuestionIds.slice(-1000).filter((id): id is string => typeof id === "string" && /^qk-[a-zA-Z0-9-]{1,64}$/.test(id)))] : [],
      runs: runs(quick.runs, (row) => {
        const made = Math.floor(number(row.made, 300));
        const correct = Math.floor(number(row.correct, made));
        return { id: text(row.id), at: row.at as string, dpm: number(row.dpm, 300), made, correct,
          accuracy: made ? correct / made : 0, avgSeconds: number(row.avgSeconds, 60), bestStreak: Math.floor(number(row.bestStreak, correct)) };
      }),
    },
    // Merge onto the full category map so a newly added skill does not crash.
    skills,
    daily,
  };
}

/** localStorage-backed store. Safe to construct during SSR; reads return empty. */
class LocalProfileStore implements ProfileStore {
  private listeners = new Set<() => void>();
  private cache: Profile | null = null;
  private watching = false;
  private onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return;
    this.cache = null;
    this.listeners.forEach((listener) => listener());
  };

  load(): Profile {
    if (typeof window === "undefined") return emptyProfile();
    if (this.cache) return this.cache;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      this.cache = reviveProfile(raw && raw.length <= MAX_BACKUP_BYTES ? JSON.parse(raw) : null);
    } catch {
      this.cache = emptyProfile();
      queueMicrotask(() => setStorageWarning("Saved progress could not be read. Browser storage may be blocked or the saved data damaged."));
    }
    return this.cache;
  }

  save(profile: Profile): void {
    this.cache = reviveProfile(profile);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cache));
        setStorageWarning("");
      } catch {
        setStorageWarning("Your browser could not save progress. Keep this tab open and export a backup from My progress.");
        // Private mode or quota: keep the in-memory copy so the session still works.
      }
    }
    this.listeners.forEach((l) => l());
  }

  subscribe(listener: () => void): () => void {
    if (!this.watching && typeof window !== "undefined") {
      window.addEventListener("storage", this.onStorage);
      this.watching = true;
    }
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
      if (!this.listeners.size && this.watching) {
        window.removeEventListener("storage", this.onStorage);
        this.watching = false;
      }
    };
  }

  clear(): void {
    this.cache = emptyProfile();
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
        setStorageWarning("");
      } catch {
        setStorageWarning("Browser storage could not be cleared. Remove this site's data in your browser settings.");
      }
    }
    this.listeners.forEach((l) => l());
  }
}

export const profileStore: ProfileStore = new LocalProfileStore();

let storageWarning = "";
const warningListeners = new Set<() => void>();
function setStorageWarning(message: string) {
  storageWarning = message;
  warningListeners.forEach((listener) => listener());
}
export const getStorageWarning = () => storageWarning;
export function subscribeStorageWarning(listener: () => void) {
  warningListeners.add(listener);
  return () => { warningListeners.delete(listener); };
}

export function importProfileBackup(input: string): void {
  if (input.length > MAX_BACKUP_BYTES) throw new Error("Backup is too large (maximum 2 MB).");
  const raw = object(JSON.parse(input));
  const sections = [raw.operator, raw.quick, raw.skills, raw.daily];
  if (raw.version !== SCHEMA_VERSION || sections.some((section) => !section || typeof section !== "object" || Array.isArray(section)) || !Array.isArray(object(raw.operator).runs) || !Array.isArray(object(raw.quick).runs)) {
    throw new Error("This is not a supported Think Operator backup.");
  }
  profileStore.save(reviveProfile(raw));
}

/* ------------------------- write helpers (pure-ish) ------------------------- */

function trim<T>(runs: T[]): T[] {
  return runs.slice(0, MAX_RUNS_KEPT);
}

export function recordOperatorRun(run: OperatorRun): Profile {
  const profile = profileStore.load();
  const next: Profile = {
    ...profile,
    operator: {
      best: Math.max(profile.operator.best, run.score),
      runs: trim([run, ...profile.operator.runs.filter((item) => item.id !== run.id)]),
    },
  };
  profileStore.save(next);
  return next;
}

export function recordQuickRun(run: QuickRun): Profile {
  const profile = profileStore.load();
  const next: Profile = {
    ...profile,
    quick: {
      ...profile.quick,
      bestDpm: Math.max(profile.quick.bestDpm, run.dpm),
      runs: trim([run, ...profile.quick.runs.filter((item) => item.id !== run.id)]),
    },
  };
  profileStore.save(next);
  return next;
}

export function rememberQuickQuestion(id: string): void {
  const profile = profileStore.load();
  profileStore.save({ ...profile, quick: { ...profile.quick,
    recentQuestionIds: [...profile.quick.recentQuestionIds.filter((item) => item !== id), id].slice(-1000),
  } });
}

export function recordSkillRun(run: SkillRun): Profile {
  const profile = profileStore.load();
  const prev = profile.skills[run.category] ?? { best: 0, runs: [] };
  const next: Profile = {
    ...profile,
    skills: {
      ...profile.skills,
      [run.category]: {
        best: Math.max(prev.best, run.score),
      runs: trim([run, ...prev.runs.filter((item) => item.id !== run.id)]),
      },
    },
  };
  profileStore.save(next);
  return next;
}

export function recordDaily(record: DailyRecord): Profile {
  const profile = profileStore.load();
  const next: Profile = {
    ...profile,
    daily: { ...profile.daily, [record.date]: record },
  };
  profileStore.save(next);
  return next;
}

export function resetProfile(): void {
  profileStore.clear();
}

/** Local calendar date key, e.g. "2026-08-31". */
export function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function newId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

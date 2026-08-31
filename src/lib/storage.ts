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
export const MAX_RUNS_KEPT = 25;

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
  quick: { bestDpm: number; runs: QuickRun[] };
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
    quick: { bestDpm: 0, runs: [] },
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

function reviveProfile(raw: unknown): Profile {
  const base = emptyProfile();
  if (!raw || typeof raw !== "object") return base;
  const parsed = raw as Partial<Profile>;
  if (parsed.version !== SCHEMA_VERSION) return base;

  return {
    version: SCHEMA_VERSION,
    operator: {
      best: parsed.operator?.best ?? 0,
      runs: parsed.operator?.runs ?? [],
    },
    quick: {
      bestDpm: parsed.quick?.bestDpm ?? 0,
      runs: parsed.quick?.runs ?? [],
    },
    // Merge onto the full category map so a newly added skill does not crash.
    skills: buildSkills(parsed.skills),
    daily: parsed.daily ?? {},
  };
}

/** localStorage-backed store. Safe to construct during SSR; reads return empty. */
class LocalProfileStore implements ProfileStore {
  private listeners = new Set<() => void>();
  private cache: Profile | null = null;

  load(): Profile {
    if (typeof window === "undefined") return emptyProfile();
    if (this.cache) return this.cache;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      this.cache = reviveProfile(raw ? JSON.parse(raw) : null);
    } catch {
      this.cache = emptyProfile();
    }
    return this.cache;
  }

  save(profile: Profile): void {
    this.cache = profile;
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      } catch {
        // Private mode or quota: keep the in-memory copy so the session still works.
      }
    }
    this.listeners.forEach((l) => l());
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  clear(): void {
    this.cache = null;
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
    this.listeners.forEach((l) => l());
  }
}

export const profileStore: ProfileStore = new LocalProfileStore();

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
      runs: trim([run, ...profile.operator.runs]),
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
      bestDpm: Math.max(profile.quick.bestDpm, run.dpm),
      runs: trim([run, ...profile.quick.runs]),
    },
  };
  profileStore.save(next);
  return next;
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
        runs: trim([run, ...prev.runs]),
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

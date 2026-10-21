"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { leaderboardConfigured, leaderboardStubbed } from "./leaderboardConfig";
import {
  CLIENT_ID_PATTERN,
  isLeaderboardMode,
  leaderboardErrorMessage,
  maxScoreForMode,
  minDurationForMode,
  nicknameError,
  rankQuizRuns,
  type RankInput,
} from "./leaderboardRules";

const NICKNAME_KEY = "operator.leaderboard.nickname";
const CLIENT_KEY = "operator.leaderboard.client";
const STUB_KEY = "operator.leaderboard.stub.v1";

export interface BoardRow {
  rank: number;
  nickname: string;
  score: number;
  durationMs: number;
  createdAt: string;
}

export interface PostResult {
  rank: number;
  nickname: string;
  score: number;
  durationMs: number;
  isBest: boolean;
}

let browserClient: SupabaseClient | null = null;

function supabase(): SupabaseClient | null {
  if (!leaderboardConfigured()) return null;
  if (browserClient) return browserClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  browserClient = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
  return browserClient;
}

const nicknameListeners = new Set<() => void>();

export function rememberedNickname(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(NICKNAME_KEY) ?? "";
}

export function rememberNickname(nickname: string): void {
  window.localStorage.setItem(NICKNAME_KEY, nickname);
  nicknameListeners.forEach((listener) => listener());
}

export function subscribeNickname(listener: () => void): () => void {
  nicknameListeners.add(listener);
  return () => {
    nicknameListeners.delete(listener);
  };
}

export function getClientId(): string {
  const existing = window.localStorage.getItem(CLIENT_KEY);
  if (existing && CLIENT_ID_PATTERN.test(existing)) return existing;
  const created = crypto.randomUUID();
  window.localStorage.setItem(CLIENT_KEY, created);
  return created;
}

function asNumber(value: unknown): number {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) ? number : 0;
}

function mapRow(row: {
  board_rank: unknown;
  nickname: unknown;
  score: unknown;
  duration_ms: unknown;
  created_at?: unknown;
}): BoardRow {
  return {
    rank: asNumber(row.board_rank),
    nickname: String(row.nickname ?? ""),
    score: asNumber(row.score),
    durationMs: asNumber(row.duration_ms),
    createdAt: typeof row.created_at === "string" ? row.created_at : "",
  };
}

export async function fetchLeaderboard(mode: string, limit = 50): Promise<BoardRow[]> {
  if (!isLeaderboardMode(mode)) return [];
  if (leaderboardStubbed()) return stubBoard(mode, limit);
  const client = supabase();
  if (!client) return [];
  const { data, error } = await client.rpc("leaderboard", { p_mode: mode, p_limit: limit });
  if (error) throw new Error(leaderboardErrorMessage(error.message));
  const rows = (data ?? []) as Parameters<typeof mapRow>[0][];
  return rows.map((row) => mapRow(row));
}

export async function postScore(input: {
  mode: string;
  score: number;
  durationMs: number;
  nickname: string;
}): Promise<PostResult> {
  const nickname = input.nickname.trim();
  const invalid = nicknameError(nickname);
  if (invalid) throw new Error(invalid);
  if (!isLeaderboardMode(input.mode)) throw new Error("This score can't be posted.");
  const max = maxScoreForMode(input.mode);
  const minDuration = minDurationForMode(input.mode);
  if (max === null || input.score < 0 || input.score > max || !Number.isInteger(input.score)) {
    throw new Error("That score is outside the range for this mode.");
  }
  if (minDuration === null || input.durationMs < minDuration) {
    throw new Error("This run was too short to post.");
  }

  rememberNickname(nickname);

  if (leaderboardStubbed()) return stubPost({ ...input, nickname });

  const client = supabase();
  if (!client) throw new Error("Could not reach the leaderboard. Try again.");
  const { data, error } = await client.rpc("submit_score", {
    p_nickname: nickname,
    p_mode: input.mode,
    p_score: input.score,
    p_duration_ms: Math.round(input.durationMs),
    p_client_id: getClientId(),
  });
  if (error) throw new Error(leaderboardErrorMessage(error.message));
  const row = data?.[0];
  if (!row) throw new Error("Could not reach the leaderboard. Try again.");
  const mapped = mapRow(row as Parameters<typeof mapRow>[0]);
  return {
    rank: mapped.rank,
    nickname: mapped.nickname,
    score: mapped.score,
    durationMs: mapped.durationMs,
    isBest: Boolean((row as { is_best?: boolean }).is_best),
  };
}

/* ---------------------------------- Stub ---------------------------------- */

interface StubStore {
  rows: RankInput[];
}

const STUB_SEED: RankInput[] = [
  { nickname: "Nia Okonkwo", score: 941, durationMs: 492000, createdAt: "2026-10-01T15:00:00.000Z" },
  { nickname: "Elias Park", score: 886, durationMs: 460000, createdAt: "2026-10-02T15:00:00.000Z" },
  { nickname: "Marisol Vega", score: 854, durationMs: 511000, createdAt: "2026-10-03T15:00:00.000Z" },
  { nickname: "Jonah Reid", score: 821, durationMs: 438000, createdAt: "2026-10-04T15:00:00.000Z" },
  { nickname: "Priya Shah", score: 790, durationMs: 605000, createdAt: "2026-10-05T15:00:00.000Z" },
  { nickname: "Chris Adeyemi", score: 764, durationMs: 552000, createdAt: "2026-10-06T15:00:00.000Z" },
  { nickname: "Helen Cho", score: 733, durationMs: 498000, createdAt: "2026-10-07T15:00:00.000Z" },
  { nickname: "Owen Blake", score: 701, durationMs: 470000, createdAt: "2026-10-08T15:00:00.000Z" },
];

const STUB_QUICK: RankInput[] = [
  { nickname: "Jonah Reid", score: 31, durationMs: 60100, createdAt: "2026-10-04T16:00:00.000Z" },
  { nickname: "Nia Okonkwo", score: 28, durationMs: 60400, createdAt: "2026-10-01T16:00:00.000Z" },
  { nickname: "Priya Shah", score: 24, durationMs: 59900, createdAt: "2026-10-05T16:00:00.000Z" },
  { nickname: "Elias Park", score: 22, durationMs: 61000, createdAt: "2026-10-02T16:00:00.000Z" },
  { nickname: "Helen Cho", score: 18, durationMs: 60250, createdAt: "2026-10-07T16:00:00.000Z" },
];

function stubSeed(mode: string): RankInput[] {
  if (mode === "operator") return STUB_SEED;
  if (mode === "quick") return STUB_QUICK;
  return STUB_SEED.slice(0, 5).map((row, index) => ({
    ...row,
    score: Math.max(40, row.score - 180 - index * 15),
    durationMs: Math.round(row.durationMs * 0.55),
    createdAt: row.createdAt.replace("T15:", "T18:"),
  }));
}

function readStub(): StubStore {
  try {
    const raw = window.localStorage.getItem(STUB_KEY);
    if (!raw) return { rows: [] };
    const parsed = JSON.parse(raw) as StubStore;
    return Array.isArray(parsed.rows) ? parsed : { rows: [] };
  } catch {
    return { rows: [] };
  }
}

function stubRows(mode: string): RankInput[] {
  const posted = readStub().rows.flatMap((row) => {
    const stored = row as RankInput & { mode?: string };
    return stored.mode === mode ? [stored] : [];
  });
  return [...stubSeed(mode), ...posted];
}

function stubBoard(mode: string, limit: number): BoardRow[] {
  const tagged = stubRows(mode).map((row) => ({ ...row, quiz: mode }));
  return rankQuizRuns(tagged, mode)
    .slice(0, limit)
    .map((row) => ({
      rank: row.rank,
      nickname: row.nickname,
      score: row.score,
      durationMs: row.durationMs,
      createdAt: row.createdAt,
    }));
}

function stubPost(input: {
  mode: string;
  score: number;
  durationMs: number;
  nickname: string;
}): PostResult {
  const store = readStub();
  const createdAt = new Date().toISOString();
  store.rows.push({
    nickname: input.nickname,
    score: input.score,
    durationMs: input.durationMs,
    createdAt,
    mode: input.mode,
  } as RankInput & { mode: string });
  window.localStorage.setItem(STUB_KEY, JSON.stringify(store));
  const ranked = rankQuizRuns(
    stubRows(input.mode).map((row) => ({ ...row, quiz: input.mode })),
    input.mode,
  );
  const mine = ranked.find((row) => row.nickname.trim().toLowerCase() === input.nickname.toLowerCase());
  const isBest = Boolean(
    mine && mine.score === input.score && mine.durationMs === input.durationMs && mine.createdAt === createdAt,
  );
  return {
    rank: mine?.rank ?? ranked.length,
    nickname: mine?.nickname ?? input.nickname,
    score: mine?.score ?? input.score,
    durationMs: mine?.durationMs ?? input.durationMs,
    isBest,
  };
}

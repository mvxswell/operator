import { createClient } from "@supabase/supabase-js";
import { CATEGORY_IDS } from "./categories";

export const leaderboardEnabled = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export const MODES = ["operator", "quick", ...CATEGORY_IDS] as const;
export type LeaderboardMode = (typeof MODES)[number];

export interface LeaderboardRow {
  rank: number;
  id: string;
  nickname: string;
  score: number;
  duration_ms: number;
  created_at: string;
  is_mine: boolean;
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const client = url && key
  ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
  : null;

const ID_KEY = "thinkoperator-leaderboard-id";
const NAME_KEY = "thinkoperator-leaderboard-name";

export function clientId(): string {
  try {
    let id = localStorage.getItem(ID_KEY);
    if (!id || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
      id = crypto.randomUUID();
      localStorage.setItem(ID_KEY, id);
    }
    return id;
  } catch {
    // Storage may be disabled; the current session can still submit.
    return crypto.randomUUID();
  }
}

export function rememberedNickname(): string {
  try { return localStorage.getItem(NAME_KEY) ?? ""; } catch { return ""; }
}

export function rememberNickname(name: string): void {
  try { localStorage.setItem(NAME_KEY, name); } catch { /* optional */ }
}

export async function getLeaderboard(mode: LeaderboardMode, limit = 50): Promise<LeaderboardRow[]> {
  if (!client) return [];
  const { data, error } = await client.rpc("leaderboard", {
    p_mode: mode, p_limit: limit, p_client_id: clientId(),
  });
  if (error) throw error;
  return (data ?? []) as LeaderboardRow[];
}

export async function postScore(input: {
  nickname: string;
  mode: LeaderboardMode;
  score: number;
  durationMs: number;
}): Promise<{ submitted_id: string; player_rank: number | null }> {
  if (!client) throw new Error("Leaderboard is not configured");
  const { data, error } = await client.rpc("submit_score", {
    p_nickname: input.nickname.trim(),
    p_mode: input.mode,
    p_score: input.score,
    p_duration_ms: Math.round(input.durationMs),
    p_client_id: clientId(),
  });
  if (error) throw error;
  rememberNickname(input.nickname.trim());
  return (data as { submitted_id: string; player_rank: number | null }[])[0];
}

export function formatDuration(ms: number): string {
  const seconds = Math.round(ms / 1000);
  return seconds >= 60 ? `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, "0")}s` : `${seconds}s`;
}

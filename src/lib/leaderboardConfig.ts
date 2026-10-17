/** True when a production leaderboard can reach Supabase. */
export function leaderboardConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

/**
 * Local sample board for UI checks. Never replaces a configured project.
 * Inlined away in builds that do not set the variable.
 */
export function leaderboardStubbed(): boolean {
  return process.env.NEXT_PUBLIC_LEADERBOARD_STUB === "1" && !leaderboardConfigured();
}

/** Nav, teaser, and post form render only when this is true. */
export function leaderboardVisible(): boolean {
  return leaderboardConfigured() || leaderboardStubbed();
}

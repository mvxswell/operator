import { DurableObject } from "cloudflare:workers";
import { funnelEventFromBody } from "../src/lib/funnelEvents.ts";

const ACTIVE_MS = 120_000;
const ALLOWED_ORIGINS = new Set([
  "https://thinkoperator.com",
  "https://www.thinkoperator.com",
  "http://localhost:3000",
  "http://localhost:3001",
]);

export class Presence extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    const sql = this.ctx.storage.sql;
    sql.exec("CREATE TABLE IF NOT EXISTS visitors (id TEXT PRIMARY KEY, expires_at INTEGER NOT NULL)");
    // Anonymous daily totals. No visitor id, score, or answer is stored here.
    sql.exec("CREATE TABLE IF NOT EXISTS counters (day TEXT NOT NULL, event TEXT NOT NULL, n INTEGER NOT NULL, PRIMARY KEY (day, event))");
  }

  async touch(id) {
    const now = Date.now();
    const sql = this.ctx.storage.sql;
    sql.exec("DELETE FROM visitors WHERE expires_at <= ?", now);
    sql.exec("INSERT INTO visitors (id, expires_at) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET expires_at = excluded.expires_at", id, now + ACTIVE_MS);
    return sql.exec("SELECT COUNT(*) AS count FROM visitors").one().count;
  }

  async countEvent(event) {
    const day = new Date().toISOString().slice(0, 10);
    this.ctx.storage.sql.exec(
      "INSERT INTO counters (day, event, n) VALUES (?, ?, 1) ON CONFLICT(day, event) DO UPDATE SET n = n + 1",
      day,
      event,
    );
  }
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    Vary: "Origin",
  };
}

const worker = {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    if (!origin || !ALLOWED_ORIGINS.has(origin)) return new Response(null, { status: 403 });
    const headers = corsHeaders(origin);
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers });
    }

    const path = new URL(request.url).pathname;
    if (path === "/online") return handleOnline(request, env, headers);
    if (path === "/e") return handleEvent(request, env, headers);
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers });
  },
};

async function handleOnline(request, env, headers) {
  if (request.headers.get("Content-Type") !== "text/plain" || Number(request.headers.get("Content-Length") || 0) > 64) {
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers });
  }
  const id = await request.text();
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return new Response(JSON.stringify({ error: "Invalid visitor" }), { status: 400, headers });
  }
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const { success } = await env.PRESENCE_RATE.limit({ key: ip });
  if (!success) return new Response(JSON.stringify({ error: "Slow down" }), { status: 429, headers });
  const count = await env.PRESENCE.getByName("thinkoperator").touch(id);
  return new Response(JSON.stringify({ count, windowSeconds: ACTIVE_MS / 1000 }), { status: 200, headers });
}

/**
 * POST /e
 * Body: text/plain event name from src/lib/funnelEvents.ts, at most 80 characters.
 * badge_earned:<id> counts a badge and sends no score or rank.
 * Stores one increment in counters(day, event, n) for the UTC day.
 * Does not read or store a visitor id, IP, score, or answer.
 * Rate limit: EVENTS_RATE, separate from the online-badge limiter.
 * Deploy with `npx wrangler deploy` before production counts will stick.
 */
async function handleEvent(request, env, headers) {
  const declared = Number(request.headers.get("Content-Length") || 0);
  if (declared > 80) {
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers });
  }
  const event = funnelEventFromBody(request.headers.get("Content-Type"), await request.text());
  if (!event) {
    return new Response(JSON.stringify({ error: "Invalid event" }), { status: 400, headers });
  }
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const { success } = await env.EVENTS_RATE.limit({ key: ip });
  if (!success) return new Response(JSON.stringify({ error: "Slow down" }), { status: 429, headers });
  await env.PRESENCE.getByName("thinkoperator").countEvent(event);
  return new Response(null, { status: 204, headers });
}

export default worker;

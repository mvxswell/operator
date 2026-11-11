import { DurableObject } from "cloudflare:workers";
import { funnelEventFromBody } from "../src/lib/funnelEvents.ts";
import { declaredLength, readBoundedText } from "../src/lib/boundedBody.ts";
import { SUBSCRIBE_MAX_BYTES, decideSubscribe, isSubscribeContentType } from "../src/lib/subscribe.ts";

const ONLINE_MAX_BYTES = 64;
const EVENT_MAX_BYTES = 80;

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
    // Weekly brief. Email and the UTC time it was first stored. Nothing else.
    sql.exec("CREATE TABLE IF NOT EXISTS subscribers (email TEXT PRIMARY KEY, subscribed_at TEXT NOT NULL)");
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

  async saveSubscriber(email, subscribedAt) {
    this.ctx.storage.sql.exec(
      "INSERT INTO subscribers (email, subscribed_at) VALUES (?, ?) ON CONFLICT(email) DO NOTHING",
      email,
      subscribedAt,
    );
  }
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
    Vary: "Origin",
  };
}

const worker = {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    if (!origin || !ALLOWED_ORIGINS.has(origin)) {
      return new Response(null, { status: 403, headers: { "Cache-Control": "no-store", Vary: "Origin" } });
    }
    const headers = corsHeaders(origin);
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers });
    }

    const path = new URL(request.url).pathname;
    if (path === "/online") return handleOnline(request, env, headers);
    if (path === "/e") return handleEvent(request, env, headers);
    if (path === "/subscribe") return handleSubscribe(request, env, headers);
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers });
  },
};

async function handleOnline(request, env, headers) {
  const declared = declaredLength(request.headers.get("Content-Length"));
  if (request.headers.get("Content-Type") !== "text/plain" || (declared !== null && declared > ONLINE_MAX_BYTES)) {
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers });
  }
  // Rate limit before reading the body, so rejected floods cost as little as possible.
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const { success } = await env.PRESENCE_RATE.limit({ key: ip });
  if (!success) return new Response(JSON.stringify({ error: "Slow down" }), { status: 429, headers });
  // Content-Length can be absent (chunked), so the body is also capped while reading.
  const id = await readBoundedText(request.body, ONLINE_MAX_BYTES);
  if (id === null) return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers });
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return new Response(JSON.stringify({ error: "Invalid visitor" }), { status: 400, headers });
  }
  const count = await env.PRESENCE.getByName("thinkoperator").touch(id);
  return new Response(JSON.stringify({ count, windowSeconds: ACTIVE_MS / 1000 }), { status: 200, headers });
}

/**
 * POST /e
 * Body: text/plain event name from src/lib/funnelEvents.ts, at most 80 characters.
 * badge_earned:<id> counts a badge and sends no score or rank.
 * Stores one increment in counters(day, event, n) for the UTC day.
 * Does not read or store a visitor id, IP, score, or answer.
 * Rate limit: EVENTS_RATE, separate from the online-badge limiter, checked before the body is read.
 * The body is capped at 80 bytes while streaming, even without a Content-Length header.
 * Deploy with `npx wrangler deploy` before production counts will stick.
 */
async function handleEvent(request, env, headers) {
  const declared = declaredLength(request.headers.get("Content-Length"));
  if (declared !== null && declared > EVENT_MAX_BYTES) {
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers });
  }
  // Rate limit before reading the body, so rejected floods cost as little as possible.
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const { success } = await env.EVENTS_RATE.limit({ key: ip });
  if (!success) return new Response(JSON.stringify({ error: "Slow down" }), { status: 429, headers });
  // Content-Length can be absent (chunked), so the body is also capped while reading.
  const body = await readBoundedText(request.body, EVENT_MAX_BYTES);
  if (body === null) return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers });
  const event = funnelEventFromBody(request.headers.get("Content-Type"), body);
  if (!event) {
    return new Response(JSON.stringify({ error: "Invalid event" }), { status: 400, headers });
  }
  await env.PRESENCE.getByName("thinkoperator").countEvent(event);
  return new Response(null, { status: 204, headers });
}

/**
 * POST /subscribe
 * Body: application/x-www-form-urlencoded, at most 512 bytes.
 * Fields: email, and company (honeypot; a filled value stores nothing).
 * Stores the lowercased email and a UTC timestamp in subscribers, unique on email.
 * An address that is already stored is left as it was. The response is 204 either way,
 * so the body never says whether the address was new. A bad address is 400.
 * Does not store an IP address, a user agent, or the honeypot.
 * The IP is only the SUBSCRIBE_RATE key, checked before the body is read.
 * Deploy with `npx wrangler deploy` before the homepage form can store an address.
 */
async function handleSubscribe(request, env, headers) {
  const declared = declaredLength(request.headers.get("Content-Length"));
  if (!isSubscribeContentType(request.headers.get("Content-Type")) || (declared !== null && declared > SUBSCRIBE_MAX_BYTES)) {
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers });
  }
  // Rate limit before reading the body, so rejected floods cost as little as possible.
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const { success } = await env.SUBSCRIBE_RATE.limit({ key: ip });
  if (!success) return new Response(JSON.stringify({ error: "Slow down" }), { status: 429, headers });
  const body = await readBoundedText(request.body, SUBSCRIBE_MAX_BYTES);
  if (body === null) return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers });
  const decision = decideSubscribe(request.headers.get("Content-Type"), body);
  if (!decision.ok) return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers });
  if (decision.email) {
    await env.PRESENCE.getByName("thinkoperator").saveSubscriber(decision.email, new Date().toISOString());
  }
  return new Response(null, { status: 204, headers });
}

export default worker;

import { DurableObject } from "cloudflare:workers";

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
    this.ctx.storage.sql.exec("CREATE TABLE IF NOT EXISTS visitors (id TEXT PRIMARY KEY, expires_at INTEGER NOT NULL)");
  }

  async touch(id) {
    const now = Date.now();
    const sql = this.ctx.storage.sql;
    sql.exec("DELETE FROM visitors WHERE expires_at <= ?", now);
    sql.exec("INSERT INTO visitors (id, expires_at) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET expires_at = excluded.expires_at", id, now + ACTIVE_MS);
    return sql.exec("SELECT COUNT(*) AS count FROM visitors").one().count;
  }
}

const worker = {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    if (!origin || !ALLOWED_ORIGINS.has(origin)) return new Response(null, { status: 403 });
    const headers = {
      "Access-Control-Allow-Origin": origin,
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
      Vary: "Origin",
    };
    if (request.method !== "POST" || new URL(request.url).pathname !== "/online") {
      return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers });
    }
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
  },
};

export default worker;

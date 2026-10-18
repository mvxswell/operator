import { eventsEndpoint, isFunnelEvent } from "./funnelEvents";

/**
 * Send one anonymous funnel count. No visitor id and no answers.
 * Local `next dev` does not send. Production sends only when the presence
 * URL was set at build time. See docs/ANALYTICS.md and /privacy.
 */
export function track(event: string): void {
  if (process.env.NODE_ENV !== "production") return;
  if (!isFunnelEvent(event)) return;
  const endpoint = eventsEndpoint(process.env.NEXT_PUBLIC_PRESENCE_URL);
  if (!endpoint || typeof navigator === "undefined") return;

  try {
    const body = new Blob([event], { type: "text/plain" });
    if (typeof navigator.sendBeacon === "function" && navigator.sendBeacon(endpoint, body)) return;
    void fetch(endpoint, { method: "POST", body, keepalive: true, mode: "cors" }).catch(() => undefined);
  } catch {
    // Counting must never interrupt a test.
  }
}

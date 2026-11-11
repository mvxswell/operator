/**
 * Weekly-brief signup shared by the homepage and worker/presence.js.
 * POST /subscribe stores an email and a UTC timestamp, and nothing else.
 */

export const SUBSCRIBE_MAX_BYTES = 512;
export const HONEYPOT_FIELD = "company";

const EMAIL =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,}$/;

export function isSubscribeContentType(contentType: string | null): boolean {
  return (contentType ?? "").toLowerCase().startsWith("application/x-www-form-urlencoded");
}

/** Lowercased address, or null when the format is not one we will store. */
export function normalizeSubscriberEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  if (email.length < 5 || email.length > 254) return null;
  if (!EMAIL.test(email)) return null;
  const [local, domain] = email.split("@");
  if (!local || !domain || local.length > 64 || local.startsWith(".") || local.endsWith(".")) return null;
  return email;
}

export type SubscribeDecision =
  | { ok: true; email: string | null }
  | { ok: false };

/**
 * A filled honeypot is ok with no email, so the response can stay 204.
 * A bad address is not ok. The caller stores `email` only when it is a string.
 */
export function decideSubscribe(contentType: string | null, body: string): SubscribeDecision {
  if (!isSubscribeContentType(contentType)) return { ok: false };
  const params = new URLSearchParams(body);
  if ((params.get(HONEYPOT_FIELD) ?? "").trim() !== "") return { ok: true, email: null };
  const email = normalizeSubscriberEmail(params.get("email") ?? "");
  if (!email) return { ok: false };
  return { ok: true, email };
}

/** Presence check-ins use /online. The weekly brief uses the same origin at /subscribe. */
export function subscribeEndpoint(presenceUrl: string | undefined): string | null {
  if (!presenceUrl) return null;
  try {
    const url = new URL(presenceUrl);
    url.pathname = "/subscribe";
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

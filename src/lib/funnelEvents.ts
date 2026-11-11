/**
 * Anonymous funnel event names shared by the browser and worker/presence.js.
 * The body of POST /e is one of these strings and nothing else.
 */

export const FUNNEL_SKILLS = [
  "bottleneck",
  "prioritization",
  "resource",
  "financial",
  "sales",
  "operations",
  "people",
  "strategy",
] as const;

export const FUNNEL_GUIDE_SLUGS = [
  "what-to-do-when-your-best-employee-quits",
  "how-to-delegate",
  "when-to-hire-your-first-employee",
  "how-to-price-a-service-business",
  "how-to-improve-cash-flow",
  "how-to-find-the-bottleneck",
  "why-is-my-business-not-growing",
  "how-to-prioritize",
  "why-are-sales-down",
  "how-to-get-more-customers",
  "how-to-create-sops",
  "how-to-scale-operations",
  "should-i-raise-prices",
  "should-you-expand",
  "where-to-invest-next-dollar",
] as const;

const SKILL = FUNNEL_SKILLS.join("|");
const GUIDE = FUNNEL_GUIDE_SLUGS.join("|");

// Badge ids must match BADGE_IDS in src/lib/badges.ts. Tests reject any other suffix,
// including a score. Redeploy the presence worker before publishing a build that sends these.
const BADGE =
  "first-call|four-modes|full-bench|operator|elite|specialist|sharp|instinctive|snap|streak-30|streak-7|streak-3|top-ten|challenger";

const FUNNEL_EVENT = new RegExp(
  `^(?:share_click:(?:copy|x|linkedin|native|download)|share_visit:(?:copy|x|linkedin|native)|operator:(?:intro|start|complete|q:(?:1|5|10|15|20)|abandon:(?:[1-9]|1\\d|20))|skill:(?:${SKILL}):(?:intro|start|complete)|result:(?:train|retake|share|post|progress|guide)|quick:(?:start|complete|again)|daily:(?:answer|share)|badge_earned:(?:${BADGE})|guide:(?:${GUIDE}):(?:scenario|cta))$`,
);

export function isFunnelEvent(value: string): boolean {
  return FUNNEL_EVENT.test(value);
}

/** Accept only a text/plain body that is exactly one allow-listed event name. */
export function funnelEventFromBody(contentType: string | null, body: string): string | null {
  if (!contentType?.toLowerCase().startsWith("text/plain")) return null;
  if (body.length === 0 || body.length > 80 || !isFunnelEvent(body)) return null;
  return body;
}

/** Presence check-ins use /online. Counts use the same origin at /e. */
export function eventsEndpoint(presenceUrl: string | undefined): string | null {
  if (!presenceUrl) return null;
  try {
    const url = new URL(presenceUrl);
    url.pathname = "/e";
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

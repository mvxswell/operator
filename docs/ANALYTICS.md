# Website analytics

Cloudflare Web Analytics is configured for `thinkoperator.com` (site token `ba98ed18a52745f48837a9db434d41d5`). Open [Web Analytics](https://dash.cloudflare.com/52147b1ce83936a0e65748107c63d9f2/web-analytics) in the owner's Cloudflare account and select the site to see visits, page views, referrers, and performance. Data begins when the production beacon is published; earlier visits cannot be reconstructed.

The beacon is included only in GitHub Pages builds, not `next dev`. It loads from `static.cloudflareinsights.com` and reports to `cloudflareinsights.com`; `scripts/secure-export.mjs` permits those exact origins in the exported CSP. Cloudflare's beacon tracks client-side route changes automatically. It does not receive local test scores or answers, and it cannot record custom events. The Operator Test, a skill test, and Quick Decisions each run on one URL, so page views alone cannot show starts or finishes. Update the privacy page before adding any custom product events or account data.

The live online badge is a separate service; its Worker request metrics are not visitor analytics.

## Funnel counts

Anonymous product counts use that same presence Worker. `src/lib/track.ts` sends `POST /e` with a `text/plain` body that is only an event name from `src/lib/funnelEvents.ts`. It uses `navigator.sendBeacon` and does nothing in `next dev`, or when `NEXT_PUBLIC_PRESENCE_URL` was not set at build time. It does not send a visitor ID, a score, an answer, or a nickname.

The Worker adds one to `counters(day, event, n)` for the UTC day. Names cover Operator Test intro, start, question checkpoints 1, 5, 10, 15, and 20, abandon-at-question, and complete; skill intro, start, and complete; result buttons (train, retake, share, post, progress, guide); Quick Decisions start, complete, and again; Daily answer and share; and guide scenario answers and test-button clicks. The public privacy page lists these names. Deploy the Worker (`npx wrangler deploy`) or the requests are rejected and nothing is stored. See `docs/PRESENCE.md`.

Result cards count `share_click:copy`, `share_click:x`, `share_click:linkedin`, `share_click:native`, and `share_click:download`. A valid landing link counts `share_visit:<channel>` for copy/x/linkedin/native. These are anonymous channel totals; no score is sent to `/e`. Deploy the Worker with the updated allow-list before publishing the site. Links carry `ref=share`, `q=<quiz>`, `score=<integer>`, and `utm_source=<channel>`. The score is public URL data and may appear in host/page analytics.

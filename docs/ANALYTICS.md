# Website analytics

Cloudflare Web Analytics is configured for `thinkoperator.com` (site token `ba98ed18a52745f48837a9db434d41d5`). Open [Web Analytics](https://dash.cloudflare.com/52147b1ce83936a0e65748107c63d9f2/web-analytics) in the owner's Cloudflare account and select the site to see visits, page views, referrers, and performance. Data begins when the production beacon is published; earlier visits cannot be reconstructed.

The beacon is included only in GitHub Pages builds, not `next dev`. It loads from `static.cloudflareinsights.com` and reports to `cloudflareinsights.com`; `scripts/secure-export.mjs` permits those exact origins in the exported CSP. Cloudflare's beacon tracks client-side route changes automatically. It does not receive local test scores or answers. Update the privacy page before adding any custom product events or account data.

The live online badge is a separate service; its Worker request metrics are not visitor analytics.

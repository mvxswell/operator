# Think Operator: launch and monetization

## Product position

Business-judgment practice with a measurable training habit. Keep the first decision fast to reach, explain answers clearly, and give players a reason to return. Avoid claims that the score is a validated measure of management ability.

The new My progress page makes existing saved sessions visible: best scores, recent test trends, activity, streaks, skill test history and data controls. These are browser-local stats, not accounts. The retention limits are explicit; saved-session totals are not lifetime totals. No old, discarded history can be reconstructed.

## Release sequence

1. Private preview: fix domain TLS, test mobile/keyboard use, harden persistence, disclose local-only saving, test scoring and export security, and collect direct feedback from a small group.
2. Account beta: migrate to commercial hosting; provision managed authentication and Postgres (Supabase is a candidate). Implement private per-user progress, email verification, recovery, deletion, and backups. Offer optional guest-to-account import and label imported results as unverified. Keep public rankings disabled.
3. Retention: add more reviewed questions and topic coverage, weak-skill practice, missed-question review history, and weekly summaries. Do not sell repeated access to a tiny unchanged bank.
4. Paid beta: validate a paid proposition with repeat users, then integrate a hosted checkout. Payment setup is deliberately deferred.

## Suggested plans — hypotheses, not published offers

| Plan | Suggested scope | Initial price test |
| --- | --- | --- |
| Free | Daily decision, introductory tests, calculator, all explanations for attempted questions, basic progress and data export | $0 |
| Pro | Larger regularly updated scenario library, custom practice, deeper trends, training plans and saved review history | Test $8/month or $59/year |
| Teams, later | Cohort training, manager-assigned practice, aggregate participation and learning trends | Price only after interviews and a pilot |

Keep accessibility, calculator, answer explanations, privacy controls, and account deletion available to everyone. Avoid ads at first: they interrupt focused practice and introduce tracking/security overhead. Annual pricing only makes sense once the content update cadence is credible. Do not market team results as a hiring filter without independent validation.

Measure activation (first completed test), week-one return rate, repeated training, demand for specific paid features, and willingness to pay. Add consent-appropriate analytics only after deciding what to collect and documenting it; no analytics were installed in this pass. Initial prices above are proposed experiments, not competitor-derived facts.

## Account and payment architecture

Choose a commercial host supporting security headers and server routes/functions. Cloudflare Pages/Workers or a paid Next-compatible host are candidates; confirm actual plan costs before provisioning. Supabase Auth/Postgres is a candidate for identity/data. Use per-user row-level access controls, keep privileged service keys server-only, and verify account A cannot read/write account B's rows. Server routes using cookies need Secure/HttpOnly/SameSite session handling plus CSRF protection on mutations.

Tables: profiles keyed by auth user ID; runs keyed by immutable run ID and owner; attempts keyed by run/question; question-bank version; server-owned entitlements; processed webhook events with unique provider event IDs. Cascade account deletion deliberately and test it. Build remote sync with conflict handling and idempotency rather than replacing the local store with a naive last-write-wins API.

Later, hosted checkout and customer portal should handle card details. Verify signed webhooks, deduplicate events, map customer IDs server-side, and grant access from server-verified subscription state. Never trust a return URL, localStorage flag, client price, or submitted score to grant Pro. Test cancellation, failed payment, refunds, webhook replay, and deletion. No payment code or provider account was created.

## Decisions needed before account beta

- Hosting/provider ownership and budget; no paid resources provisioned yet.
- Sign-in approach (recommend verified email first) and support/privacy contact.
- Whether stats remain private (recommended initially) or are shared; sharing changes consent and abuse requirements.

References: GitHub Pages usage restrictions: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits ; Supabase access controls: https://supabase.com/docs/guides/database/secure-data ; Cloudflare Pages limits: https://developers.cloudflare.com/pages/platform/limits/

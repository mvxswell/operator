# Security and launch-readiness review

Reviewed September 8, 2026. Scope: the repository source, dependency lockfile, static deployment pipeline, browser persistence, quiz inputs, and live domain/DNS/HTTP configuration. This is an application review, not an independent penetration-test certification. No intrusive load tests were performed. Account security settings, GitHub/GoDaddy MFA, provider internals, and future services have not been audited.

## Findings and disposition

| Priority | Finding | Disposition |
| --- | --- | --- |
| Launch blocker | Live TLS certificate name mismatch; HTTP remains available without HTTPS enforcement | Confirmed with certificate-validating HTTP client. GitHub API reports `dns_changed`, requesting a new certificate. Public apex A records match GitHub and www is a CNAME. Must finish certificate issuance and enforce HTTPS before inviting users. Do not bypass browser certificate warnings. |
| Before accounts/payments | Browser scores and all correct answers are public, editable client data | Expected for practice. Never use local scores for paid entitlements, competition, certification, hiring, or rewards. Move authoritative scoring and entitlement checks to a backend. |
| Before commercial launch | GitHub Pages is unsuitable for commercial SaaS and sensitive transactions | Migrate hosting before adding accounts or monetization. See launch plan. |
| Medium | Saved JSON was trusted structurally, allowing malformed data to crash views | Added schema normalization, finite numeric bounds, date/ID validation, category allowlisting, bounded history, duplicate filtering, input-size limits, and regression tests. Normalization does not prove score authenticity. |
| Medium | No application CSP in the static export | Added build-time inline-script hashes and restrictive same-origin CSP meta tags. Arbitrary inline scripts, eval, plugins, forms, and child frames are blocked. Inline CSS remains allowed for dynamic score bars. |
| Hosting limitation | No custom response headers for clickjacking protection, MIME sniffing, permissions, or HSTS | A meta CSP cannot enforce `frame-ancestors`. Configure `frame-ancestors 'none'`, `X-Content-Type-Options: nosniff`, restricted Permissions-Policy and HSTS on the future host; verify them over HTTPS. Do not pretend Next.js headers apply to a Pages export. |
| Medium / reliability | Browser writes failed silently | Added visible storage failure notice and manual backup export/restore. Clearing a blocked store now retains an empty in-memory state and reports inability to remove persisted data. |
| Low / reliability | Tabs could display stale cached stats | Added storage-event subscription. Concurrent writes are still last-write-wins; transactional multi-device sync requires a backend. |
| Low / integrity | Rapid repeated standard answers could be recorded twice; quick answers could slip past deadline before next timer tick | Added synchronous answer lock, choice validation, and deadline check. Not an anti-cheat boundary. |
| Trust | Daily simulated votes sounded like real community results | Relabeled as examples and removed misleading homepage copy. |
| Privacy / portability | No user-visible data controls or explanation | Added My progress with backups, restore confirmation, reset confirmation, retention disclosure, and Your data page. No authentication, payments, trackers, or data uploads added. |

## Checks

- `npm audit --json`: zero known vulnerabilities across the resolved dependency tree at review time (438 dependencies reported). This is time-specific, not a guarantee.
- Reviewed source for raw HTML injection, eval/Function, network calls, credentials, storage, and public environment variables. No raw-HTML sinks, application API secrets, session tokens, or password collection found in the reviewed source. Calculator uses a small arithmetic parser, not JavaScript evaluation.
- Reviewed tracked file names/history for environment/key artifacts; no matching credential-file paths found. This is not an exhaustive entropy scan of all historical blobs.
- Added tests for malformed storage, limits/deduplication, JSON backup normalization, blocked persistence, and CSP hashing/idempotence.
- Validate static export in an actual browser after every CSP change: homepage hydration, navigation, a scored answer, calculator, progress, and privacy. `next dev` does not use the export CSP.
- Before deploying, run `npm test`, `npm run lint`, `npm run build:pages`, and `git diff --check`.

## Launch gates still requiring infrastructure

1. Valid TLS on apex and www, then HTTP redirect to HTTPS. Existing HTTP-local progress does not automatically transfer to HTTPS; users must export/restore it.
2. Choose and provision commercial hosting plus managed authentication/database. Do not build a pretend sign-in backed by localStorage.
3. Test account isolation, unauthorized reads/writes, session expiry/logout, email verification, recovery, rate limits, backup restoration and deletion before enabling sync.
4. For shared scores, server selects questions, records attempts idempotently, validates answers/timing, and calculates scores. Local imported results must be marked unverified and excluded from rankings.
5. Add owner-approved support/privacy contact and a reviewed privacy/terms document covering the actual providers and business entity before account launch. The current data page describes only today's preview.

## References

- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html
- https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CSP
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors
- https://supabase.com/docs/guides/database/secure-data

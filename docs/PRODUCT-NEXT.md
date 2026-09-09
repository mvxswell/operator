# Think Operator: next product stage

## September 9 polish pass

- Quick Decisions now has 108 authored scenarios (48 new, six per skill).
- Preserve the 60-second game, instant correct-answer advancement, and existing difficulty ramp.
- Prefer unseen cards at the nearest available difficulty; recycle oldest first at that difficulty. Exclude cards already shown in the current round until the full bank is exhausted.
- Save recent card IDs with the existing profile, including when a round is abandoned. Older profiles migrate with an empty rotation history. Backups and resets include it.
- Progress adds a seven-day momentum summary, richer score cards, and a native keyboard-accessible skills disclosure. Shared panels gain subtle depth.

## Accounts before subscriptions

Current progress is browser-local, not an account or a trustworthy server record. It is origin-specific: moving from HTTP to HTTPS needs an export on the old origin and restore on the new one. Never silently replace guest progress during sign-in.

Suggested sequence:
1. Move the preview to hosting that permits commercial SaaS and resolve HTTPS before accepting credentials. GitHub Pages is not the paid product's hosting destination.
2. Add managed authentication and a database with per-user access rules, explicit guest-history import, deduplication, deletion, and backup support.
3. Offer free accounts for cross-device progress. Keep guest play available before signup.
4. Validate demand for Pro before adding checkout. Enforce paid entitlements on a backend, not in localStorage. Treat imported guest scores as self-reported, especially if leaderboards ever launch.

## Monetization hypothesis, not a settled pricing plan

- Guest: immediate Quick Decisions, daily decision, and local progress.
- Free account: synced history and basic trends; a worthwhile reason to register without paying.
- Pro: larger curated scenario packs, focused weakness practice, structured training plans, and deeper comparisons over time.
- Keep calculator access and answer explanations in the core experience. Sell training depth and ongoing content quality, not the ability to understand an answer.
- Test willingness to pay with users before settling monthly/annual pricing. Avoid ads or mid-round paywalls that damage the strongest interaction.
- Team reporting is a later product, requiring consent and clear boundaries; practice scores are not validated employment assessments.

No account provider, paid plan, tracking, or checkout was activated by this pass.

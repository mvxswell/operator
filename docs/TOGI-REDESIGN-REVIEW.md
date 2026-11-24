# TOGI redesign review

Branch: `togi-redesign`. Builds on the initial redesign commits `b69653a` and `efeeb84`.

The dashboard uses near-black surfaces, restrained gold accents, larger balances, a responsive account-history chart, an allocation-focused portfolio, and a chronological trade ledger. Full trade details remain visible. Account caveats and the complete portfolio-commentary archive expand with native, keyboard-accessible controls. The Degen Meter uses the reference's segmented gold bar, with its full gauge and breakdown available on expansion; the Magic 8-Ball, side quests, tip link, Operator Test links, and disclaimers remain available.

## Scope and data preservation

Only the four TOGI presentation files changed: the tracker component, its scoped stylesheet, its DOM renderer, and the portfolio renderer. Shared layouts, navigation, homepage components, feed loaders/validators, the bundled snapshot, financial formulas, and all Workers/backend data remain unchanged.

Browser QA compared the original branch's renderer and the redesigned renderer with the same unmodified live response:

- All 55 trades retained, with identical details, account-value annotations, notes, derived markers, and reported P&L.
- All 41 account-history points retained with their source links.
- All 105 unique external source URLs from the original rendered page retained.
- Challenge progress, remaining amount, starting-value progress, required multiple, doublings, Degen Meter, trade statistics, Robinhood statistics, and portfolio values matched.
- All 39 portfolio commentary posts retained in the expandable archive, along with all five side quests and 16 closed-position records.
- Fidelity and Robinhood values remain separate. Missing figures still read “not disclosed”; derived and stale figures retain their labels.

## Validation

- `npm run build`: passed; production static export, CSP processing, font optimization, and 117 canonical sitemap checks completed.
- `npm test`: 101 passed, no failures or skips.
- `npx tsc --noEmit`: passed.
- `npm run lint`: no errors; three existing warnings in the SteveWillDoIt page and existing TOGI tests.
- `node scripts/check-case-export.cjs`: passed.
- `node scripts/check-editorial-export.cjs`: passed.
- Production browser checks: 320, 390, 768, 834, 1024, 1440, and 1920 pixels wide. No page overflow; chart redraws on resize and retains every source point.
- Trade filters: 9 wins, 7 losses, 39 other records, 55 total.
- Magic 8-Ball responses, expandable sections, optional-section absence, offline fallback, malformed-feed fallback, reduced motion, and client navigation cleanup passed without browser exceptions.

The existing Worker does not permit localhost through CORS. Natural local requests exercised the saved-snapshot fallback. Live-data QA replayed the exact response read from the Worker on Nov 23, 2026, adding a localhost CORS header only inside the browser test harness. No application fetch behavior or Worker configuration changed. Screenshots marked “Live feed connected” show this exact live-response replay; the fallback screenshot shows the unchanged bundled snapshot.

The installed Next.js version reports an existing security advisory. Dependency upgrades were kept outside this presentation-only change.


## Reference alignment follow-up

The overview now follows the supplied reference: an integrated terminal header, balance and chart side by side, a compact challenge/Degen/8-Ball row, portfolio/recent-trade/side-quest summaries, and four metric cards. Full records and source details continue below the overview.

The chart displays one account at a time with 1W, 1M, and ALL ranges. Ranges are anchored to that account's latest posted date, rather than implying live intraday prices. The green line uses the actual posted values, with a restrained area fill, right-side labels, source readout, keyboard/hover crosshair, and markers revealed on inspection. Every historical point and its receipt remain available through the controls. Single-point ranges display a single point without fabricating a history.

The new summaries reuse the complete portfolio's latest-update rules and the original reported trade outcomes. They do not replace the ledger or calculate new trading returns. The main account card's day change is copied directly from the posted portfolio account and labelled with its posting date.

## Screenshots

- [Complete compact overview](screenshots/togi-overview.png)
- [Robinhood chart close-up](screenshots/togi-chart-options.png)

- [Desktop dashboard](screenshots/togi-desktop.png)
- [Tablet dashboard](screenshots/togi-tablet.png)
- [Mobile dashboard](screenshots/togi-mobile.png)
- [Portfolio](screenshots/togi-portfolio.png)
- [Trade ledger](screenshots/togi-trades.png)
- [Mobile trades](screenshots/togi-mobile-trades.png)
- [Degen Meter, 8-Ball and side quests](screenshots/togi-widgets.png)
- [Snapshot fallback](screenshots/togi-fallback.png)
- [Full desktop page](screenshots/togi-desktop-full.png)
- [Original branch, desktop](screenshots/togi-before-desktop.png)

Machine-readable browser results: [togi-redesign-qa.json](togi-redesign-qa.json).

No merge into main or production deployment was performed.

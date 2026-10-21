# SEO content and URL inventory

This branch adds 20 decision guides and 11 explanatory quiz landing pages, plus a test hub. The existing `/guides/` hub now groups all 35 guides into hiring, finance, ops cadence, strategy, and people.

All new content is emitted as static HTML with ordinary links. Guide pages use the existing article and scenario format, a matching skill-test action, and two or three related guides. Test landing pages describe the existing question sets and link to the existing client-side quizzes. Numerical examples are explicitly illustrative. No studies, statistics, or attributed quotations were added.

The original guide registry remains the 15 guides recognized by the deployed event allow-list. Public pages use `src/content/guides/collection/index.ts` for the complete collection. New guide-specific events are dropped by the existing allow-list; no Worker or Supabase changes are required.

## Build verification

Verified October 21, 2026 after merging `origin/main` at `119aafb` (merged PR #6). The normal `npm run build:pages` command passes, including TypeScript, static generation, payload flattening, and export security processing for 67 HTML files. The PR diff against main does not modify any PR #6 file, Worker file, or Supabase file.

The audit of the actual `out/` export passes for all 48 editorial pages, including 46 Article graphs, unique metadata, canonical URLs, generated PNG dimensions, sitemap/llms coverage, and crawl paths from home. Browser checks against the exported files verify the topic hub, article scenario interaction, one-click quiz launch, and desktop/390px mobile layouts. Screenshots were refreshed from the production export.

## Validation

- `npm run build:pages`: passes; all routes static or SSG, 67 HTML files secured.
- `npm test`: all 24 tests pass, including editorial format, 35-guide topic coverage, matching quiz targets, and llms.txt coverage alongside existing tests.
- `npm run lint`: passes.
- `node scripts/check-editorial-export.cjs`: inspect the actual `out/` HTML for metadata, Article JSON-LD, canonicals, OG image dimensions, sitemap entries, llms.txt entries, and reachability from home without JavaScript. Passed against the full production export.

## New URLs

- https://thinkoperator.com/tests/
- https://thinkoperator.com/guides/how-to-run-a-weekly-operating-review/
- https://thinkoperator.com/guides/how-to-choose-business-kpis/
- https://thinkoperator.com/guides/how-to-fix-missed-deadlines/
- https://thinkoperator.com/guides/how-to-plan-capacity-before-taking-on-more-work/
- https://thinkoperator.com/guides/when-to-hire-your-first-operations-manager/
- https://thinkoperator.com/guides/how-to-write-a-hiring-scorecard/
- https://thinkoperator.com/guides/how-to-decide-between-hiring-and-outsourcing/
- https://thinkoperator.com/guides/how-to-onboard-a-new-manager/
- https://thinkoperator.com/guides/what-to-do-when-cash-runway-drops-below-six-months/
- https://thinkoperator.com/guides/how-to-build-a-13-week-cash-flow-forecast/
- https://thinkoperator.com/guides/how-to-handle-a-customer-who-pays-late/
- https://thinkoperator.com/guides/how-to-decide-whether-to-drop-an-unprofitable-customer/
- https://thinkoperator.com/guides/how-to-decide-which-product-to-shut-down/
- https://thinkoperator.com/guides/how-to-test-a-new-market-before-expanding/
- https://thinkoperator.com/guides/how-to-set-quarterly-business-priorities/
- https://thinkoperator.com/guides/how-to-decide-whether-to-discount-a-deal/
- https://thinkoperator.com/guides/how-to-handle-an-underperforming-manager/
- https://thinkoperator.com/guides/how-to-stop-every-decision-coming-to-the-ceo/
- https://thinkoperator.com/guides/how-to-resolve-conflict-between-sales-and-operations/
- https://thinkoperator.com/guides/how-to-run-effective-one-on-one-meetings/
- https://thinkoperator.com/tests/operator/
- https://thinkoperator.com/tests/quick/
- https://thinkoperator.com/tests/daily/
- https://thinkoperator.com/tests/bottleneck/
- https://thinkoperator.com/tests/prioritization/
- https://thinkoperator.com/tests/resource/
- https://thinkoperator.com/tests/financial/
- https://thinkoperator.com/tests/sales/
- https://thinkoperator.com/tests/operations/
- https://thinkoperator.com/tests/people/
- https://thinkoperator.com/tests/strategy/

## SEO implementation references

- [Google: crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)

`llms.txt` is a supplemental human-readable content index; the XML sitemap and real HTML links provide the crawl paths. Existing robots.txt already permits public pages and points to the sitemap. No Search Console, hosting, or live publication changes are made by this PR.

## Additional new public URLs

- https://thinkoperator.com/llms.txt

Build-generated Open Graph PNGs for the new articles:

- https://thinkoperator.com/og/guides/how-to-run-a-weekly-operating-review.png
- https://thinkoperator.com/og/guides/how-to-choose-business-kpis.png
- https://thinkoperator.com/og/guides/how-to-fix-missed-deadlines.png
- https://thinkoperator.com/og/guides/how-to-plan-capacity-before-taking-on-more-work.png
- https://thinkoperator.com/og/guides/when-to-hire-your-first-operations-manager.png
- https://thinkoperator.com/og/guides/how-to-write-a-hiring-scorecard.png
- https://thinkoperator.com/og/guides/how-to-decide-between-hiring-and-outsourcing.png
- https://thinkoperator.com/og/guides/how-to-onboard-a-new-manager.png
- https://thinkoperator.com/og/guides/what-to-do-when-cash-runway-drops-below-six-months.png
- https://thinkoperator.com/og/guides/how-to-build-a-13-week-cash-flow-forecast.png
- https://thinkoperator.com/og/guides/how-to-handle-a-customer-who-pays-late.png
- https://thinkoperator.com/og/guides/how-to-decide-whether-to-drop-an-unprofitable-customer.png
- https://thinkoperator.com/og/guides/how-to-decide-which-product-to-shut-down.png
- https://thinkoperator.com/og/guides/how-to-test-a-new-market-before-expanding.png
- https://thinkoperator.com/og/guides/how-to-set-quarterly-business-priorities.png
- https://thinkoperator.com/og/guides/how-to-decide-whether-to-discount-a-deal.png
- https://thinkoperator.com/og/guides/how-to-handle-an-underperforming-manager.png
- https://thinkoperator.com/og/guides/how-to-stop-every-decision-coming-to-the-ceo.png
- https://thinkoperator.com/og/guides/how-to-resolve-conflict-between-sales-and-operations.png
- https://thinkoperator.com/og/guides/how-to-run-effective-one-on-one-meetings.png

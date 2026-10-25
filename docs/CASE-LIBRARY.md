# Business case library

The static `/cases/` hub links to 48 fictional practice cases, with six cases in each of Finance, Pricing, Operations, Growth, Strategy, People, Capital Allocation and Crisis. Every page exports its prompt, data and choices as crawlable HTML. Topic filters work in the browser.

## Answer boundary

`src/content/cases/server.ts` explicitly selects public question fields at build time. Grading fields, worked steps and takeaways are absent from initial HTML, RSC props and JSON-LD. The client imports the selected case's separate solution chunk only after **Lock in my choice**. A failed chunk download allows retrying the same locked choice. Practice does not write quiz scores, streaks or leaderboard entries.

This is a learning flow, not a secret-answer service: all static chunks are public assets. A visitor inspecting source assets can retrieve answers. No server route, Supabase schema change or worker change is involved.

## Editing and generation

- Edit case metadata, guide mappings, takeaways and extra worked steps in `src/content/cases/definitions.json`.
- Original scenario prompts, choices and grading remain in the existing question bank.
- `facts.json` presents facts already in prose as a table where the original question has no data block. It contains no worked calculations.
- Run `node scripts/build-case-content.cjs` after edits. It generates the safe catalog, individual solution modules, solution loader, landing-page counts and Daily teasers. The static build also runs it.
- `practiceFor` prefers an exact scenario match, then a subskill match, then a category match when choosing results-page practice links.

The question bank is used at build time for case pages; it is not imported by their client components. Landing pages use small count/teaser indexes. Supabase is dynamically imported only when a configured leaderboard request needs it. Navigation links do not speculatively fetch quiz routes.

Reading pages (home, guides and cases) use native sans-serif and monospace stacks so text paints without waiting for a font download. Quiz typography retains self-hosted Geist; the export preloads its Latin face on other pages. Optional font display avoids late text repaints on slow connections. The home sample score renders immediately.

## Mobile calculator

Below 640px, the calculator is a collapsible bottom drawer. Its measured height reserves viewport space, and the scenario scrolls in the remaining area above it. Quiz feedback reserves its own space below the drawer. Desktop retains the floating calculator. The input has a label, the toggle exposes its expanded state, Escape returns focus, and keypad buttons retain native keyboard activation.

## Verification

- `npm test`: 49 tests, including case coverage/grading consistency, all existing question-to-practice mappings, safe client import graphs, Daily teaser parity, font preload validation and mocked lazy leaderboard loading.
- `npm run lint`
- `npm run build`: production static export, including all existing routes and the 49 new pages.
- `node scripts/check-case-export.cjs`: verifies 48 cases plus hub, metadata/canonicals/schema/sitemap, no initial grading fields, valid learning destinations and all 114 HTML route exports.
- `node scripts/check-editorial-export.cjs`: existing editorial export checks.
- Browser QA: all 48 cases graded, all eight filters, a failed solution request/retry, a complete finance quiz through results, mobile calculator/table/options geometry, keyboard activation and axe WCAG checks.
- Mobile Lighthouse measurements and conditions are recorded in `case-library-mobile.json`. Scores are local lab measurements, not a guarantee for every network/device or the live deployment.

Screenshots are in `docs/screenshots/case-*.png`.

## New URLs

- https://thinkoperator.com/cases/
- https://thinkoperator.com/cases/meal-delivery-unit-economics/
- https://thinkoperator.com/cases/profit-vs-cash-working-capital/
- https://thinkoperator.com/cases/revenue-growth-vs-operating-expenses/
- https://thinkoperator.com/cases/saas-cac-payback-vs-runway/
- https://thinkoperator.com/cases/cash-conversion-cycle-inventory/
- https://thinkoperator.com/cases/membership-business-break-even/
- https://thinkoperator.com/cases/price-discount-gross-profit/
- https://thinkoperator.com/cases/gross-margin-volume-discount/
- https://thinkoperator.com/cases/idle-capacity-special-order-pricing/
- https://thinkoperator.com/cases/enterprise-pricing-cost-to-serve/
- https://thinkoperator.com/cases/price-objections-lost-deal-analysis/
- https://thinkoperator.com/cases/promotions-full-price-demand/
- https://thinkoperator.com/cases/warehouse-pick-pack-capacity/
- https://thinkoperator.com/cases/roastery-sequential-capacity/
- https://thinkoperator.com/cases/freight-carrier-coverage-bottleneck/
- https://thinkoperator.com/cases/machine-upgrade-line-throughput/
- https://thinkoperator.com/cases/job-mix-shifting-bottlenecks/
- https://thinkoperator.com/cases/manufacturing-scrap-rate-step-change/
- https://thinkoperator.com/cases/unanswered-sales-calls/
- https://thinkoperator.com/cases/sales-appointments-unused-capacity/
- https://thinkoperator.com/cases/ecommerce-conversion-vs-traffic/
- https://thinkoperator.com/cases/sales-funnel-delivery-capacity/
- https://thinkoperator.com/cases/customer-acquisition-vs-churn/
- https://thinkoperator.com/cases/rising-cac-channel-saturation/
- https://thinkoperator.com/cases/compete-with-national-chain/
- https://thinkoperator.com/cases/saas-segment-retention-focus/
- https://thinkoperator.com/cases/local-density-vs-new-city-expansion/
- https://thinkoperator.com/cases/warehouse-build-vs-outsource/
- https://thinkoperator.com/cases/sunk-cost-product-investment/
- https://thinkoperator.com/cases/new-market-bounded-experiment/
- https://thinkoperator.com/cases/hiring-payback-billable-time/
- https://thinkoperator.com/cases/new-hire-onboarding-owner/
- https://thinkoperator.com/cases/key-person-dependency/
- https://thinkoperator.com/cases/delegating-decisions-vs-checklists/
- https://thinkoperator.com/cases/hiring-lead-time-capacity/
- https://thinkoperator.com/cases/sales-incentives-customer-trust/
- https://thinkoperator.com/cases/scarce-asset-allocation/
- https://thinkoperator.com/cases/customer-acquisition-cost-allocation/
- https://thinkoperator.com/cases/marketing-diminishing-returns/
- https://thinkoperator.com/cases/contribution-per-machine-hour/
- https://thinkoperator.com/cases/senior-engineer-time-allocation/
- https://thinkoperator.com/cases/truck-purchase-vs-variable-carriers/
- https://thinkoperator.com/cases/checkout-outage-prioritization/
- https://thinkoperator.com/cases/declining-reviews-demand-risk/
- https://thinkoperator.com/cases/expansion-single-trainer-risk/
- https://thinkoperator.com/cases/irreversible-lease-commitment/
- https://thinkoperator.com/cases/supplier-concentration-outage-risk/
- https://thinkoperator.com/cases/customer-concentration-renewal-risk/

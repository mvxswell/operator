# Real online visitor count

The app shows an `N online` badge only when the separate presence Worker responds successfully. It counts distinct anonymous browser IDs that checked in during the last two minutes. A page checks in once a minute only while visible. This is an approximate visitor count, not an authenticated count of unique humans. A determined person can create multiple IDs, though requests are limited per IP.

## Cost boundary

Use a Cloudflare **Workers Free** account with the SQLite Durable Object declared in `wrangler.jsonc`. On that plan, Cloudflare fails requests or operations after its daily free limits rather than charging overages. The badge hides on failure. Do not switch the account to Workers Paid without reviewing its billing settings; on Paid, requests and storage over included amounts may be charged. At one check-in per minute, each continuously visible browser makes up to 1,440 requests per day. The Worker and Durable Object each currently have 100,000 free requests per day, and the Durable Object has a 100,000-row-write daily allowance. Limits and prices can change; verify the plan in Cloudflare before deployment.

## Activate

1. Confirm the Cloudflare account is still on Workers Free. Sign in locally with `npx wrangler login` in this repository if needed; the owner must complete any sign-in prompts.
2. Deploy with `npx wrangler deploy`. The configuration creates one SQLite Durable Object namespace and three rate limiters: 10 requests per IP per minute for the online badge, 30 per IP per minute for funnel counts, and 5 per IP per minute for the weekly-brief signup. The current Worker URL is `https://think-operator-presence.mrm1244.workers.dev/online`. Funnel counts use the same origin at `/e`. The weekly brief uses `/subscribe`. Redeploy after a route changes, or the site will send requests that the previous Worker answers with 404 and nothing is stored.
3. Run `npm run build:pages`. The build script sets the deployed Worker URL by default and adds its origin to the page's CSP. Set `NEXT_PUBLIC_PRESENCE_URL` only to override that URL.
4. Publish the `out` directory to the existing Pages branch as usual. Test from `https://thinkoperator.com`, with two browsers and a hidden tab, and confirm the count vanishes if the Worker is unavailable.

Do not put a Cloudflare API token in the web app, repository, `.env` committed to Git, or GitHub Pages output. The browser sends only a random ID to `/online`; the service does not collect test scores. The ID is cleared when the user resets progress. The public privacy page explains the counter.

## Funnel counts (`POST /e`)

`POST /e` accepts `Content-Type: text/plain` and a body that is exactly one event name from `src/lib/funnelEvents.ts` (80 characters or fewer). The Worker increments `counters(day, event, n)` in the same Durable Object, using the UTC date as `day`. The request does not include a visitor ID. The IP address is used only as the rate-limit key and is not written into storage. Adding a name, including `badge_earned:<id>`, requires redeploying this Worker before the site that sends it is published. Until then `/e` rejects the new name and stores nothing. The badge event is the id only, never a score or rank.

The browser helper is `src/lib/track.ts`. It does not run during `next dev`. Production builds send to the origin of `NEXT_PUBLIC_PRESENCE_URL` (the `/online` URL already set by `npm run build:pages`) with the path replaced by `/e`. Counts stay at zero until this Worker is deployed with the `EVENTS_RATE` binding in `wrangler.jsonc`.

There is no public read API. After deploy, open the Presence Durable Object in the Cloudflare dashboard and read the `counters` table, or query it from a one-off Worker script. Each row is a UTC day, an event name, and a total.

## Weekly brief (`POST /subscribe`)

`POST /subscribe` accepts `Content-Type: application/x-www-form-urlencoded` and a body of at most 512 bytes. The fields are `email` and `company`. `company` is a honeypot: when it is filled, the Worker stores nothing and still answers 204. A valid address is stored lowercased, with a UTC timestamp, in `subscribers(email, subscribed_at)`. `email` is the primary key. An address that is already stored is left unchanged, and the response is 204 either way, so it does not reveal whether the address was new. A bad address is 400. The Worker does not store an IP address, a user agent, or the honeypot. The IP is only the `SUBSCRIBE_RATE` key, and that check runs before the body is read. The homepage posts with `fetch` when JavaScript is available. Without JavaScript the page shows a note and no form. `scripts/secure-export.mjs` allows the POST by putting the presence worker origin in `connect-src`. Redeploy this Worker before a published form can store an address.

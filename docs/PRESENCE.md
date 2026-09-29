# Real online visitor count

The app shows an `N online` badge only when the separate presence Worker responds successfully. It counts distinct anonymous browser IDs that checked in during the last two minutes. A page checks in once a minute only while visible. This is an approximate visitor count, not an authenticated count of unique humans. A determined person can create multiple IDs, though requests are limited per IP.

## Cost boundary

Use a Cloudflare **Workers Free** account with the SQLite Durable Object declared in `wrangler.jsonc`. On that plan, Cloudflare fails requests or operations after its daily free limits rather than charging overages. The badge hides on failure. Do not switch the account to Workers Paid without reviewing its billing settings; on Paid, requests and storage over included amounts may be charged. At one check-in per minute, each continuously visible browser makes up to 1,440 requests per day. The Worker and Durable Object each currently have 100,000 free requests per day, and the Durable Object has a 100,000-row-write daily allowance. Limits and prices can change; verify the plan in Cloudflare before deployment.

## Activate

1. Create or use a Cloudflare account on the Workers Free plan. Sign in locally with `npx wrangler login` in this repository; the owner must complete any sign-in or terms prompts.
2. Deploy with `npx wrangler deploy`. The configuration creates one SQLite Durable Object namespace and a rate limiter set to 10 requests per IP per minute.
3. Copy the HTTPS `workers.dev` URL from the deployment result. Build the GitHub Pages export with `NEXT_PUBLIC_PRESENCE_URL=https://<worker-subdomain>.workers.dev/online` in the environment. The build adds that origin to the page's CSP.
4. Publish the `out` directory to the existing Pages branch as usual. Test from `https://thinkoperator.com`, with two browsers and a hidden tab, and confirm the count vanishes if the Worker is unavailable.

Do not put a Cloudflare API token in the web app, repository, `.env` committed to Git, or GitHub Pages output. The browser sends only a random ID; the service does not collect test scores. The ID is cleared when the user resets progress. The public privacy page explains the counter.

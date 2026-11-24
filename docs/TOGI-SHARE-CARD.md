# TOGI social card, creative v3

Artwork: `public/togi/share-v3.png` (1200 × 630 PNG, 968,390 bytes).

The same artwork is retained at the route's Open Graph and Twitter file-convention paths. Explicit metadata references the new immutable `share-v3.png` filename. The page's search title, canonical URL, dashboard, data, financial calculations, and other pages are unchanged.

Social title: **Togi's $10M Challenge — Genius or Full Degen?**

Social description: The trades. The losses. The lore. Follow the $10M challenge with public trade receipts, uncapped degen heat and a deeply unqualified Magic 8-Ball. Unofficial fan tracker.

The creative deliberately avoids a current balance, performance claim, or loss amount that could become stale. The trading trace is decorative artwork, not an account chart. No post was sent to X and no X-side preview rendering or cache invalidation is claimed. The implementation can be checked by requesting the page and image as Twitterbot; X controls when previously cached cards are refreshed.

## Generation

Created with the built-in image-generation tool, using the previous TOGI share image as an edit reference. Generated at 1731 × 909, then downscaled for production to 1200 × 630 with Sharp. The original generated output remains in the Codex image library. No API key or external generation CLI was used.

Final prompt:

> Redesign this existing website link-preview image into a premium, genuinely compelling X/Twitter large summary card for TOGI TRACKER V2.0. Replace the old design completely; retain only the near-black / warm gold brand identity and unofficial fan tracker context. Final composition landscape 1200 x 630 pixels, aspect ratio 1.905:1, with all important content safely inset 65 pixels. This is an editorial finance entertainment tracker, not an investment promotion. Make it readable when displayed at 600 x 315. Left 65%: precise bold modern sans typography, huge headline in two lines, exact text 'GENIUS OR' in off-white and 'FULL DEGEN?' in warm vivid gold. Above, a smaller strong brand line exact text 'TOGI TRACKER' with a small 'V2.0' badge, and below it a compact gold eyebrow '$10M CHALLENGE'. Beneath headline, exact text 'The trades. The losses. The lore.' in pale gray, comfortably legible. Bottom left a clean gold filled pill with black exact text 'FOLLOW THE CHAOS', with 'thinkoperator.com/togi' beside it in pale gray. Bottom right discreet but readable exact text 'UNOFFICIAL FAN TRACKER'. Right 35%: cinematic polished 3D illustration of a single gold coin flipping through the air above a black glossy Magic 8-Ball with a crisp white 8 circle. Black graphite background with a subtle green trading-line trace becoming red, treated as decorative abstract lines without values or axes, sparse gold rim light and just a few sparks. Keep the text very dominant; artwork supports the story. Premium trading terminal aesthetic, strong contrast, deliberate negative space, accurate typography, no busy dashboard, no photorealistic person, no claims of actual returns, no reported-loss amount, no fake prices, no other logos, no watermarks, no extra text. Visually exciting and click-worthy but professional, not garish casino advertising.

## Validation

Run `node scripts/check-togi-share.mjs` after `npm run build:pages`. It checks the actual exported metadata, unique absolute image URLs, dimensions, file size, alt text, fallback image bytes, and unchanged search title/canonical.
Validation completed: production build, all 106 tests, TypeScript, lint (three existing warnings), social-card export audit, case/editorial export audits, and Twitterbot-style local HTTP fetches. The page and image returned HTTP 200; the image had image/png content type and matched the reviewed asset byte for byte. Visual QA checked both 1200×630 and 600×315 sizes.

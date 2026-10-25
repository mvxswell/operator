/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const { test } = require("node:test");

test("the export preloads the Latin primary face once, with a bounded self-hosted path", async () => {
  const { primaryFontHref, withFontPreload } = await import("../scripts/preload-export-fonts.mjs");
  const css = '@font-face{font-family:Geist Mono;src:url(/_next/static/media/mono.woff2);unicode-range:u+00??}@font-face{font-family:Geist;src:url(/_next/static/media/other.woff2);unicode-range:u+0400-045f}@font-face{font-family:Geist;src:url(/_next/static/media/latin-s.p.woff2);unicode-range:u+00??,u+0131}';
  assert.equal(primaryFontHref(css), "/_next/static/media/latin-s.p.woff2");
  assert.equal(primaryFontHref(""), null);
  const html = withFontPreload("<html><head></head><body></body></html>", primaryFontHref(css));
  assert.match(html, /as="font" type="font\/woff2" crossorigin="anonymous"/);
  assert.equal(withFontPreload(html, primaryFontHref(css)), html);
  const reading = '<html><head></head><body><main data-reading-page=""></main></body></html>';
  assert.equal(withFontPreload(reading, primaryFontHref(css)), reading, "reading pages use native fonts without a download");
  assert.throws(() => withFontPreload(html, 'https://example.com/font.woff2'));
  assert.throws(() => withFontPreload(html, '/_next/static/media/a" onload="alert(1).woff2'));
});

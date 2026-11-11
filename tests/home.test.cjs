/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const ts = require("typescript");

require.extensions[".ts"] = (module, filename) => {
  module._compile(
    ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText,
    filename,
  );
};

const events = require("../src/lib/funnelEvents.ts");
const { getGuide } = require("../src/content/guides/collection/index.ts");
const { CASES } = require("../src/content/cases/catalog.ts");
const { GUIDES } = require("../src/content/guides/collection/index.ts");
const { BANK_STATS } = require("../src/data/counts.ts");
const { CATEGORIES } = require("../src/lib/categories.ts");
const site = require("../src/lib/site.ts");

const START = [
  "how-to-find-the-bottleneck",
  "how-to-improve-cash-flow",
  "how-to-run-a-weekly-operating-review",
  "how-to-decide-which-product-to-shut-down",
];

test("homepage is one static design, with the approved copy and section order", () => {
  const page = fs.readFileSync("src/app/page.tsx", "utf8");
  const css = fs.readFileSync("src/app/home.css", "utf8");
  assert.equal(fs.existsSync("src/lib/homeVariant.ts"), false);
  assert.equal(fs.existsSync("src/lib/homeEvents.ts"), false);
  assert.equal(fs.existsSync("src/components/home/HomeClient.tsx"), false);
  assert.doesNotMatch(page, /homeVariant|homeEvents|HOME_VARIANT|data-home-v|Next tracker coming soon/);
  assert.doesNotMatch(css, /data-home-v/);
  assert.equal((page.match(/<h1\b/g) || []).length, 1);
  assert.match(page, /Make the calls an owner has to make\./);
  assert.match(page, /Practice them here\./);
  assert.match(page, /href="\/guides\/" className="hh-btn hh-btn-primary"/);
  assert.match(page, /href="\/operator\/" className="hh-btn hh-btn-ghost"/);
  const headings = [
    "What this is",
    "Start here",
    "Practice the judgment",
    "Live trackers",
    "One decision, one live number, one playbook.",
    "Built by Maxwell",
    "Work in public",
  ];
  let at = page.indexOf("Make the calls an owner has to make.");
  for (const heading of headings) {
    const next = page.indexOf(heading, at);
    assert.ok(next > at, heading);
    at = next;
  }
  assert.equal(GUIDES.length, 35);
  assert.equal(CASES.length, 48);
  assert.equal(BANK_STATS.standard, 96);
  assert.equal(CATEGORIES.length, 8);
  assert.match(page, /\$\{GUIDES\.length\} guides · \$\{CASES\.length\} cases · \$\{BANK_STATS\.standard\} scenarios · \$\{CATEGORIES\.length\} skills/);
  assert.match(page, /Choose first, then read the reasoning\. No account needed\./);
  assert.match(page, /Bottleneck detection, prioritization, resource allocation, financial judgment, sales and marketing, operations, people and delegation, strategy\./);
  assert.match(page, /We’ll only email the brief\. You can unsubscribe at any time\./);
  assert.doesNotMatch(page, /maxwellrmartin/);
  assert.match(page, /https:\/\/x\.com\/mvxswell/);
  const titles = {
    "how-to-find-the-bottleneck": "How to Find the Bottleneck in Your Business",
    "how-to-improve-cash-flow": "How to Improve Cash Flow in a Small Business",
    "how-to-run-a-weekly-operating-review": "How to Run a Weekly Operating Review",
    "how-to-decide-which-product-to-shut-down": "How to Decide Which Product to Shut Down",
  };
  for (const slug of START) {
    assert.equal(getGuide(slug).title, titles[slug]);
    assert.ok(page.includes(`"${slug}"`), slug);
  }
  assert.match(page, /\{guide\.title\}/);
});

test("trackers: Togi comes before Grok Bot, from snapshot data, and Togi is a plain anchor", () => {
  const page = fs.readFileSync("src/app/page.tsx", "utf8");
  const ticker = page.slice(page.indexOf('aria-label="Live numbers"'), page.indexOf("</ul>"));
  assert.ok(ticker.indexOf('href="/togi/"') < ticker.indexOf('href="/grok-bot-savings-tracker/"'));
  assert.ok(ticker.indexOf("New call every day") > ticker.indexOf('href="/grok-bot-savings-tracker/"'));
  const trackers = page.slice(page.indexOf('id="trackers"'));
  const togi = trackers.indexOf('href="/togi/"');
  const grok = trackers.indexOf('href="/grok-bot-savings-tracker/"');
  assert.ok(togi > 0 && grok > togi, "Togi card before Grok Bot");
  assert.match(page, /compactUsd\(togi\.latest_value\)/);
  assert.match(page, /signedUsd\(savings\.return_full\)/);
  assert.doesNotMatch(page, /\$1\.95M|\$709\.50|19\.5%/);
  assert.match(page, /<a href="\/togi\/"/);
  assert.doesNotMatch(page, /<Link\b[^>]*\/togi/);
  const css = fs.readFileSync("src/app/home.css", "utf8");
  assert.match(css, /\.hh-tick\{[^}]*min-height:52px/);
});

test("signup is a JavaScript post, and the static HTML keeps a note instead of a form", () => {
  const page = fs.readFileSync("src/app/page.tsx", "utf8");
  const form = fs.readFileSync("src/components/home/WeeklySignup.tsx", "utf8");
  assert.match(page, /<noscript>/);
  assert.match(page, /The weekly brief signup needs JavaScript/);
  assert.doesNotMatch(page, /<form/);
  assert.match(form, /useSyncExternalStore/);
  assert.match(form, /\(\) => false/);
  assert.match(form, /method: "POST"/);
  assert.match(form, /subscribeEndpoint/);
  assert.match(form, /if \(!ready\) return null/);
});

test("home variant events are no longer funnel names", () => {
  for (const name of ["home_view:a", "home_view:b", "home_view:c", "tracker_click:togi:a", "tracker_click:grok:b", "quiz_start:daily:c", "quiz_start:operator:a"]) {
    assert.equal(events.isFunnelEvent(name), false, name);
  }
  for (const name of ["operator:start", "quick:start", "daily:answer", "skill:financial:start"]) {
    assert.equal(events.isFunnelEvent(name), true, name);
  }
});

test("nav: Practice replaces Tests, About is added, Leaderboard leaves the header", () => {
  const nav = fs.readFileSync("src/components/Nav.tsx", "utf8");
  const labels = [...nav.matchAll(/label: "([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(labels, ["Playbooks", "Practice", "Trackers", "Daily", "About"]);
  assert.match(nav, /href: "\/tests\/", label: "Practice"/);
  assert.match(nav, />\s*Togi Tracker\s*<\/a>/);
  assert.doesNotMatch(nav, /label: "Leaderboard"|href: "\/leaderboard\/"/);
  const footer = fs.readFileSync("src/components/SiteFooter.tsx", "utf8");
  assert.match(footer, /href="\/leaderboard\/"/);
  assert.match(footer, /href="\/about\/"/);
  const aboutAt = footer.indexOf('href="/about/"');
  const dataAt = footer.indexOf('href="/privacy/"');
  assert.ok(aboutAt > 0 && aboutAt < dataAt);
});

test("about page is in the sitemap with founder copy and no personal-site link", () => {
  const page = fs.readFileSync("src/app/about/page.tsx", "utf8");
  assert.match(page, /Built by Maxwell/);
  assert.match(page, /Maxwell grew a home-services company to \$5M\+ in revenue/);
  assert.match(page, /founder and builder, now building AI-native software products/);
  assert.match(page, /https:\/\/x\.com\/mvxswell/);
  assert.match(page, /canonical: absoluteUrl\("\/about"\)/);
  assert.doesNotMatch(page, /maxwellrmartin|Martin/);
  assert.ok(site.PUBLIC_PAGES.some((entry) => entry.path === "/about"));
  assert.equal(site.absoluteUrl("/about"), "https://thinkoperator.com/about/");
  assert.match(fs.readFileSync("src/app/sitemap.ts", "utf8"), /sitemapEntries\(\)/);
});

test("built homepage HTML contains the hero and sections", { skip: !fs.existsSync("out/index.html") }, () => {
  const html = fs.readFileSync("out/index.html", "utf8").replace(/<!-- -->/g, "");
  assert.match(html, /Make the calls an owner has to make\./);
  assert.match(html, /Practice them here\./);
  for (const heading of ["What this is", "Start here", "Practice the judgment", "Live trackers", "One decision, one live number, one playbook.", "Built by Maxwell", "Work in public", "How to Find the Bottleneck in Your Business", "How to Decide Which Product to Shut Down"]) {
    assert.ok(html.includes(heading), heading);
  }
  assert.match(html, /35 guides · 48 cases · 96 scenarios · 8 skills/);
  assert.match(html, /<link rel="canonical" href="https:\/\/thinkoperator.com\/"/);
  assert.doesNotMatch(html, /<form/);
  assert.match(html, /The weekly brief signup needs JavaScript/);
  const savings = require("../src/data/grokBotSavings.json").summary;
  assert.ok(html.includes(`+$${savings.return_full.toFixed(2)}`));
  assert.doesNotMatch(html, /home_view|data-home-v|maxwellrmartin/);
});

test("built about HTML contains the founder copy", { skip: !fs.existsSync("out/about/index.html") }, () => {
  const html = fs.readFileSync("out/about/index.html", "utf8");
  assert.match(html, /Built by Maxwell/);
  assert.match(html, /Maxwell grew a home-services company to \$5M\+ in revenue/);
  assert.match(html, /founder and builder, now building AI-native software products/);
  assert.match(html, /<link rel="canonical" href="https:\/\/thinkoperator.com\/about\/"/);
  assert.doesNotMatch(html, /maxwellrmartin|Martin/);
});

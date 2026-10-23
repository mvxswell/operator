/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const ts = require("typescript");
require.extensions[".ts"] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename);
};
const { GUIDES, NEW_GUIDES, getGuide } = require("../src/content/guides/collection/index.ts");
const { GUIDE_TOPICS } = require("../src/content/guides/collection/topics.ts");
const { guideWordCount } = require("../src/content/guides/words.ts");
const { TEST_LANDINGS } = require("../src/content/tests.ts");
const { CATEGORY_IDS } = require("../src/lib/categories.ts");

test("twenty new editorial guides preserve the guide contract and resolve their links", () => {
  assert.equal(NEW_GUIDES.length, 20);
  assert.equal(GUIDES.length, 35);
  for (const field of ["slug", "title", "description"]) assert.equal(new Set(GUIDES.map((g) => g[field])).size, 35, field);
  for (const guide of NEW_GUIDES) {
    assert.ok(guide.description.length >= 150 && guide.description.length <= 160, `${guide.slug}: ${guide.description.length}`);
    const words = guideWordCount(guide);
    assert.ok(words >= 900 && words <= 1400, `${guide.slug}: ${words} words`);
    assert.ok(CATEGORY_IDS.includes(guide.skill));
    assert.equal(guide.datePublished, "2026-10-20");
    assert.equal(guide.dateModified, "2026-10-20");
    assert.equal(guide.faqs.length, 3);
    assert.equal(guide.scenario.choices.length, 4);
    assert.equal(guide.scenario.choices.filter((choice) => choice.id === guide.scenario.correctChoiceId).length, 1);
    assert.equal(guide.blocks.filter((block) => block.type === "scenario").length, 1);
    assert.ok(guide.blocks.some((block) => block.type === "panel"));
    assert.ok(guide.related.length >= 2 && guide.related.length <= 3);
    for (const slug of guide.related) assert.ok(slug !== guide.slug && getGuide(slug), `${guide.slug}: ${slug}`);
  }
});

test("five topics cover every published guide exactly once", () => {
  assert.deepEqual(GUIDE_TOPICS.map((topic) => topic.id), ["hiring", "finance", "ops-cadence", "strategy", "people"]);
  const grouped = GUIDE_TOPICS.flatMap((topic) => topic.slugs);
  assert.equal(new Set(grouped).size, 35);
  assert.deepEqual([...grouped].sort(), GUIDES.map((guide) => guide.slug).sort());
});

test("every existing quiz set has a unique landing and a matching start target", () => {
  assert.deepEqual(TEST_LANDINGS.map((item) => item.id).sort(), ["operator", "quick", "daily", ...CATEGORY_IDS].sort());
  for (const field of ["id", "title", "description"]) assert.equal(new Set(TEST_LANDINGS.map((item) => item[field])).size, 11);
  for (const landing of TEST_LANDINGS) {
    assert.ok(landing.decisions.length >= 3 && landing.approach.length >= 3);
    assert.ok(GUIDES.some((guide) => landing.skills.includes(guide.skill)));
    const path = new URL(landing.startHref, "https://thinkoperator.com").pathname;
    assert.equal(path, ["operator", "quick", "daily"].includes(landing.id) ? `/${landing.id}/` : `/skills/${landing.id}/`);
  }
});

test("llms.txt includes every guide and landing at its canonical URL", () => {
  const text = fs.readFileSync("public/llms.txt", "utf8");
  for (const guide of GUIDES) assert.ok(text.includes(`https://thinkoperator.com/guides/${guide.slug}/`));
  for (const landing of TEST_LANDINGS) assert.ok(text.includes(`https://thinkoperator.com/tests/${landing.id}/`));
  assert.ok(text.includes("https://thinkoperator.com/tests/") && text.includes("https://thinkoperator.com/guides/"));
});

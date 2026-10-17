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

const { GUIDES } = require("../src/content/guides/index.ts");
const { guideWordCount } = require("../src/content/guides/words.ts");
const rules = require("../src/lib/leaderboardRules.ts");

test("fifteen guides stay in the promised shape", () => {
  assert.equal(GUIDES.length, 15);
  const slugs = new Set(GUIDES.map((guide) => guide.slug));
  assert.equal(slugs.size, 15);
  for (const guide of GUIDES) {
    assert.equal(guide.description.length >= 150 && guide.description.length <= 160, true, `${guide.slug} description is ${guide.description.length}`);
    const words = guideWordCount(guide);
    assert.equal(words >= 900 && words <= 1400, true, `${guide.slug} has ${words} words`);
    assert.equal(guide.faqs.length, 3, guide.slug);
    assert.ok(guide.related.length >= 2 && guide.related.length <= 3, guide.slug);
    for (const related of guide.related) assert.ok(slugs.has(related) && related !== guide.slug);
    assert.equal(guide.blocks.some((block) => block.type === "scenario"), true, guide.slug);
    assert.equal(guide.blocks.some((block) => block.type === "panel"), true, guide.slug);
    assert.equal(guide.scenario.choices.length, 4, guide.slug);
    assert.ok(guide.scenario.choices.some((choice) => choice.id === guide.scenario.correctChoiceId));
    assert.match(guide.answer, /\S/);
  }
});

test("leaderboard rules follow the scoring ranges in the app", () => {
  assert.equal(rules.maxScoreForMode("operator"), 1000);
  assert.equal(rules.maxScoreForMode("people"), 1000);
  assert.equal(rules.maxScoreForMode("quick"), 300);
  assert.equal(rules.maxScoreForMode("nope"), null);
  assert.equal(rules.minDurationForMode("operator"), 45000);
  assert.equal(rules.minDurationForMode("quick"), 50000);
  assert.equal(rules.minDurationForMode("financial"), 20000);
  assert.equal(rules.nicknameError("Al"), null);
  assert.ok(rules.nicknameError("A"));
  assert.ok(rules.nicknameError("has spaces and symbols!"));
  assert.equal(rules.formatDuration(65000), "1:05");
  const ranked = rules.rankBestRuns([
    { nickname: "Ada", score: 10, durationMs: 100, createdAt: "2026-01-02T00:00:00.000Z" },
    { nickname: "ada", score: 12, durationMs: 200, createdAt: "2026-01-03T00:00:00.000Z" },
    { nickname: "Bea", score: 12, durationMs: 50, createdAt: "2026-01-04T00:00:00.000Z" },
  ]);
  assert.deepEqual(ranked.map((row) => [row.nickname, row.rank]), [["Bea", 1], ["ada", 2]]);
});

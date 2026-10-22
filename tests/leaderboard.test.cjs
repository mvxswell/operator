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

const rules = require("../src/lib/leaderboardRules.ts");
const site = require("../src/lib/site.ts");
const { CATEGORY_IDS } = require("../src/lib/categories.ts");

test("each scored quiz has its own board and Daily stays off it", () => {
  assert.deepEqual([...rules.LEADERBOARD_MODES], ["operator", "quick", ...CATEGORY_IDS]);
  assert.equal(rules.LEADERBOARD_MODES.length, 10);
  assert.equal(rules.isLeaderboardMode("daily"), false);
  assert.equal(rules.isLeaderboardMode("people"), true);
  for (const quiz of rules.LEADERBOARD_MODES) assert.equal(rules.isLeaderboardMode(quiz), true);
});

test("quiz query selects the board and older mode links still resolve", () => {
  assert.equal(rules.selectedQuiz("people", "operator"), "people");
  assert.equal(rules.selectedQuiz("nope", "quick"), "quick");
  assert.equal(rules.selectedQuiz("daily", "financial"), "financial");
  assert.equal(rules.selectedQuiz(null, "strategy"), "strategy");
  assert.equal(rules.selectedQuiz("", "operations"), "operations");
  assert.equal(rules.selectedQuiz("daily", "daily"), "operator");
  assert.equal(rules.selectedQuiz(null, null), "operator");
  assert.equal(rules.selectedQuiz(" people", null), "operator");
  assert.equal(rules.quizBoardPath("people"), "/leaderboard?quiz=people");
  assert.equal(rules.quizBoardPath("daily"), "/leaderboard?quiz=operator");
  assert.equal(rules.quizLabel("operator"), "Operator Test");
  assert.equal(rules.quizLabel("quick"), "Quick Decisions");
  assert.equal(rules.quizLabel("people"), "People & Delegation");
});

test("a quiz board ranks by score, then faster time, then earlier post", () => {
  const runs = [
    { quiz: "people", nickname: "Ann", score: 500, durationMs: 40000, createdAt: "2026-03-01T00:00:00.000Z" },
    { quiz: "people", nickname: "Ben", score: 500, durationMs: 30000, createdAt: "2026-03-02T00:00:00.000Z" },
    { quiz: "people", nickname: "ann", score: 500, durationMs: 35000, createdAt: "2026-03-03T00:00:00.000Z" },
    { quiz: "operator", nickname: "Ben", score: 1000, durationMs: 1000, createdAt: "2026-03-04T00:00:00.000Z" },
    { quiz: "quick", nickname: "Cy", score: 20, durationMs: 60000, createdAt: "2026-04-02T00:00:00.000Z" },
    { quiz: "quick", nickname: "Dee", score: 20, durationMs: 60000, createdAt: "2026-04-01T00:00:00.000Z" },
    { quiz: "quick", nickname: "Cy", score: 19, durationMs: 1000, createdAt: "2026-04-01T00:00:00.000Z" },
  ];

  assert.deepEqual(
    rules.rankQuizRuns(runs, "people").map((row) => [row.nickname, row.rank, row.durationMs]),
    [
      ["Ben", 1, 30000],
      ["ann", 2, 35000],
    ],
  );
  assert.deepEqual(
    rules.rankQuizRuns(runs, "quick").map((row) => [row.nickname, row.rank]),
    [
      ["Dee", 1],
      ["Cy", 2],
    ],
  );
  assert.equal(rules.rankQuizRuns(runs, "daily").length, 0);
  assert.equal(rules.rankQuizRuns(runs, "operator")[0].nickname, "Ben");

  const higherScore = rules.rankBestRuns([
    { nickname: "Fast", score: 10, durationMs: 1000, createdAt: "2026-01-01T00:00:00.000Z" },
    { nickname: "High", score: 11, durationMs: 90000, createdAt: "2026-01-02T00:00:00.000Z" },
  ]);
  assert.equal(higherScore[0].nickname, "High");
});

test("privacy keeps the brand share image the metadata helper had dropped", () => {
  const alt = fs.readFileSync("src/app/opengraph-image.alt.txt", "utf8").trim();
  const privacy = site.pageMetadata("/privacy");
  assert.equal(privacy.openGraph.images[0].url, "/opengraph-image.png");
  assert.equal(privacy.openGraph.images[0].width, 1200);
  assert.equal(privacy.openGraph.images[0].height, 630);
  assert.equal(privacy.openGraph.images[0].alt, alt);
  assert.equal(privacy.twitter.images[0].url, "/twitter-image.png");
  assert.equal(privacy.twitter.images[0].alt, alt);

  assert.equal(site.pageMetadata("/progress").openGraph.images, undefined);
  assert.equal(site.pageMetadata("/leaderboard").openGraph.images, undefined);
  assert.equal(site.pageMetadata("/operator").openGraph.images[0].url, "/og/quizzes/operator.png");
  assert.equal(site.pageMetadata("/daily").openGraph.images[0].url, "/og/quizzes/daily.png");
  assert.equal(site.skillMetadata("People & Delegation", "Get leverage from others").openGraph.images[0].url, "/og/quizzes/people.png");
});

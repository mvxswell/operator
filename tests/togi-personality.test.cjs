/* eslint-disable @typescript-eslint/no-require-imports */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
require.extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);
const { degenHeat, pickEightBallAnswer, EIGHT_BALL_ANSWERS, reportedLoss } = require("../src/components/togi/personality.ts");
const snapshot = require("../src/data/togiSnapshot.json");

test("joke heat keeps increasing past 100 and opens a new target at each tier", () => {
  for (const score of [0, 99, 100, 249, 250, 499, 500, 570, 999, 1000, 2000, 4000, 8000, 100000]) {
    const heat = degenHeat(score);
    assert.equal(heat.points, score);
    assert.ok(heat.next > score);
    assert.ok(heat.progress >= 0 && heat.progress < 100);
    assert.equal(heat.remaining, heat.next - score);
  }
  assert.equal(degenHeat(570).name, "Nuclear");
  assert.equal(degenHeat(570).next, 1000);
  assert.equal(degenHeat(570).remaining, 430);
  assert.notEqual(degenHeat(100).name, degenHeat(570).name);
  assert.equal(degenHeat(-1).points, 0);
  assert.equal(degenHeat(Infinity).points, 0);
});

test("8-ball has a larger unique bank and cannot repeat its last three answers", () => {
  assert.ok(EIGHT_BALL_ANSWERS.length >= 30);
  assert.equal(new Set(EIGHT_BALL_ANSWERS).size, EIGHT_BALL_ANSWERS.length);
  const recent = [];
  for (let i = 0; i < 100; i++) {
    const pick = pickEightBallAnswer(recent, 0);
    assert.ok(!recent.slice(-3).includes(pick.index));
    assert.equal(pick.answer, EIGHT_BALL_ANSWERS[pick.index]);
    recent.push(pick.index);
  }
  assert.ok(pickEightBallAnswer([], 1).answer);
  assert.ok(pickEightBallAnswer([], NaN).answer);
});

test("the loss caption is attributed separately and never mutates trade or portfolio totals", () => {
  const data = structuredClone(snapshot);
  const url = "https://x.com/ShaneStoffer/status/2124901951133393202";
  data.portfolio.commentary = [{ date: "2026-11-23", source_url: url, text: "Video post: 'The losing the 700k is not the agony'. His wording; realized P&L not disclosed." }];
  const before = JSON.stringify(data);
  assert.deepEqual(reportedLoss(data), { date: "2026-11-23", amount: 700000, source: url, attribution: "Self-reported loss" });
  assert.equal(JSON.stringify(data), before);
  data.portfolio.commentary[0].source_url = "https://evil.example/claim";
  assert.equal(reportedLoss(data), null);
  data.portfolio.commentary[0].source_url = url;
  data.portfolio.commentary[0].text = "No loss amount disclosed.";
  assert.equal(reportedLoss(data), null);
  assert.equal(reportedLoss({ ...data, portfolio: undefined }), null);
  assert.equal(reportedLoss(snapshot), null);
});

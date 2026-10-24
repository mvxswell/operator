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

const { DAILY_QUESTIONS, dailyQuestionFor, dailyDecisionNumber } = require("../src/data/index.ts");
const { utcDayIndex, formatDailyDecisionNumber } = require("../src/data/dailyCycle.ts");
const { CATEGORY_IDS } = require("../src/lib/categories.ts");
const { DAILY_GUIDE_BY_SKILL } = require("../src/lib/dailyGuide.ts");
const { GUIDES } = require("../src/content/guides/collection/index.ts");
const streak = require("../src/lib/dailyStreak.ts");

const MS_PER_DAY = 86_400_000;

function addUtcDays(dateKey, days) {
  const index = utcDayIndex(dateKey);
  const dt = new Date((index + days) * MS_PER_DAY);
  const year = dt.getUTCFullYear();
  const month = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dt.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

test("daily pool has 60+ unique, answerable scenarios across every skill", () => {
  assert.ok(DAILY_QUESTIONS.length >= 60);
  const ids = DAILY_QUESTIONS.map((question) => question.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(new Set(DAILY_QUESTIONS.map((question) => question.scenario)).size, DAILY_QUESTIONS.length);
  for (let n = 1; n <= 60; n += 1) {
    assert.ok(ids.includes(`day-${String(n).padStart(2, "0")}`));
  }

  const counts = Object.fromEntries(CATEGORY_IDS.map((id) => [id, 0]));
  const difficulties = new Set();
  let withData = 0;
  for (const question of DAILY_QUESTIONS) {
    assert.equal(question.mode, "daily");
    assert.ok(CATEGORY_IDS.includes(question.category), question.id);
    assert.ok([3, 4, 5].includes(question.difficulty), question.id);
    difficulties.add(question.difficulty);
    counts[question.category] += 1;
    assert.equal(question.choices.length, 4, question.id);
    assert.ok(question.choices.some((choice) => choice.id === question.correctChoiceId), question.id);
    assert.equal(new Set(question.choices.map((choice) => choice.id)).size, question.choices.length, question.id);
    assert.match(question.subskill, /\S/, question.id);
    assert.match(question.industry, /\S/, question.id);
    assert.match(question.prompt, /\S/, question.id);
    assert.match(question.explanation, /\S/, question.id);
    assert.ok(question.teaser.length >= 40 && question.teaser.length <= 220, `${question.id} teaser ${question.teaser.length}`);
    for (const choice of question.choices) {
      assert.equal(question.teaser.includes(choice.text), false, question.id);
    }
    const sum = Object.values(question.distribution).reduce((total, share) => total + share, 0);
    assert.equal(sum, 100, question.id);
    assert.deepEqual(
      Object.keys(question.distribution).sort(),
      question.choices.map((choice) => choice.id).sort(),
      question.id,
    );
    for (const share of Object.values(question.distribution)) {
      assert.equal(Number.isInteger(share) && share >= 0, true, question.id);
    }
    if (/\d/.test(question.scenario) || question.data) {
      assert.ok(question.work && question.work.length >= 2, question.id);
    }
    if (question.data) {
      withData += 1;
      assert.ok(question.data.rows.length >= 2, question.id);
      for (const row of question.data.rows) {
        assert.match(row.label, /\S/);
        assert.ok(row.values.length >= 1);
      }
    }
  }
  const tallies = Object.values(counts);
  assert.ok(Math.max(...tallies) - Math.min(...tallies) <= 1);
  for (const id of CATEGORY_IDS) assert.ok(counts[id] >= 7, `${id} ${counts[id]}`);
  assert.deepEqual([...difficulties].sort(), [3, 4, 5]);
  assert.ok(withData >= 6);
});

test("dailyQuestionFor is a pure calendar cycle with no repeats inside 60 days", () => {
  assert.equal(utcDayIndex("1970-01-01"), 0);
  assert.equal(utcDayIndex("1970-01-02"), 1);
  assert.equal(utcDayIndex("2023-02-29"), null);
  assert.equal(utcDayIndex("2026-02-31"), null);
  assert.notEqual(utcDayIndex("2024-02-29"), null);
  assert.equal(formatDailyDecisionNumber(20750), "#20,750");
  assert.equal(dailyDecisionNumber("1970-01-01"), 0);
  assert.equal(dailyQuestionFor("not-a-date").id, dailyQuestionFor("2026-02-31").id);

  const length = DAILY_QUESTIONS.length;
  for (const start of ["2026-01-01", "2026-10-24", "2026-12-20", "2028-02-20"]) {
    const ids = [];
    for (let offset = 0; offset < 60; offset += 1) {
      const dateKey = addUtcDays(start, offset);
      assert.equal(dailyQuestionFor(dateKey).id, dailyQuestionFor(dateKey).id);
      assert.equal(dailyDecisionNumber(dateKey), utcDayIndex(dateKey));
      ids.push(dailyQuestionFor(dateKey).id);
    }
    assert.equal(new Set(ids).size, 60, start);
  }

  const cycle = [];
  for (let offset = 0; offset < length; offset += 1) cycle.push(dailyQuestionFor(addUtcDays("2024-02-27", offset)).id);
  assert.equal(new Set(cycle).size, length);
  assert.equal(
    dailyQuestionFor(addUtcDays("2024-02-27", length)).id,
    cycle[0],
  );
  assert.notEqual(dailyQuestionFor("2024-02-28").id, dailyQuestionFor("2024-02-29").id);
  assert.notEqual(dailyQuestionFor("2024-02-29").id, dailyQuestionFor("2024-03-01").id);
});

test("daily habit stats ignore non-dates and do not treat yesterday as today", () => {
  const summary = streak.summarizeDaily({
    "2026-01-01": { correct: true },
    "2026-01-02": { correct: false },
    nope: { correct: true },
  });
  assert.equal(summary.answered, 2);
  assert.equal(summary.correct, 1);
  assert.equal(summary.accuracy, 0.5);

  const daily = { "2026-01-01": { correct: true }, "2026-01-02": { correct: false } };
  assert.deepEqual(streak.dailyHabitStatus(daily, "2026-01-02"), { answeredToday: true, streak: 2 });
  assert.deepEqual(streak.dailyHabitStatus(daily, "2026-01-03"), { answeredToday: false, streak: 2 });
  assert.deepEqual(streak.dailyHabitStatus({}, "2026-01-03"), { answeredToday: false, streak: 0 });

  const keys = streak.recentDateKeys("2026-03-01", 7);
  assert.equal(keys.length, 7);
  assert.equal(keys[6], "2026-03-01");
  assert.equal(keys[5], streak.shiftDateKey("2026-03-01", -1));
  assert.deepEqual(streak.recentDateKeys("2026-03-01", 7), [...keys]);
});

test("each skill used by a daily scenario has a real guide", () => {
  for (const id of CATEGORY_IDS) {
    const link = DAILY_GUIDE_BY_SKILL[id];
    const guide = GUIDES.find((item) => item.slug === link.slug);
    assert.ok(guide, link.slug);
    assert.equal(guide.skill, id, link.slug);
    assert.equal(guide.title, link.title, link.slug);
  }
});

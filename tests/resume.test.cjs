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

const progress = require("../src/lib/quizProgress.ts");
const streak = require("../src/lib/dailyStreak.ts");

const question = {
  id: "q-8",
  mode: "standard",
  category: "financial",
  subskill: "margin",
  industry: "cafe",
  difficulty: 3,
  scenario: "A cafe.",
  prompt: "What do you do?",
  choices: [
    { id: "a", text: "A" },
    { id: "b", text: "B" },
    { id: "c", text: "C" },
    { id: "d", text: "D" },
  ],
  correctChoiceId: "b",
  explanation: "Because.",
};

function save(overrides = {}) {
  return {
    version: 1,
    variant: "operator",
    category: null,
    length: 20,
    savedAt: 1_700_000_000_000,
    runElapsedMs: 40_000,
    questionElapsedMs: 1_200,
    phase: "feedback",
    index: 1,
    questionId: "q-8",
    choiceIds: ["c", "a", "d", "b"],
    selectedChoiceId: "a",
    attempts: [
      { questionId: "q-1", category: "sales", difficulty: 2, correct: true, elapsedMs: 800, chosenChoiceId: "b" },
      { questionId: "q-8", category: "financial", difficulty: 3, correct: false, elapsedMs: 1_200, chosenChoiceId: "a" },
    ],
    askedIds: ["q-1", "q-8"],
    categoryCounts: { sales: 1, financial: 1 },
    adaptive: { level: 2.4, highestServed: 3, streak: 0, missStreak: 1 },
    ...overrides,
  };
}

const ctx = { variant: "operator", length: 20, pool: [question], now: 1_700_000_000_000 };

test("a matching snapshot resumes and a stale or foreign one does not", () => {
  const parsed = progress.parseQuizSave(save(), ctx);
  assert.equal(parsed.index, 1);
  assert.equal(parsed.choiceIds[0], "c");
  assert.equal(parsed.attempts.length, 2);
  assert.equal(parsed.adaptive.level, 2.4);

  assert.equal(progress.parseQuizSave(save(), { ...ctx, now: ctx.now + progress.QUIZ_SAVE_TTL_MS + 1 }), null);
  assert.equal(progress.parseQuizSave(save({ variant: "skill", category: "financial" }), ctx), null);
  assert.equal(progress.parseQuizSave(save({ length: 10 }), ctx), null);
  assert.equal(progress.parseQuizSave(save({ questionId: "missing" }), ctx), null);
  assert.equal(progress.parseQuizSave(save({ choiceIds: ["a", "b", "c", "a"] }), ctx), null);
  assert.equal(progress.parseQuizSave(save({ phase: "question", selectedChoiceId: "a" }), ctx), null);
  assert.equal(progress.parseQuizSave(save({ adaptive: { level: 9, highestServed: 3, streak: 0, missStreak: 0 } }), ctx), null);
});

test("question-phase snapshots stay unanswered and round-trip through storage", () => {
  const open = save({
    phase: "question",
    index: 2,
    selectedChoiceId: null,
    attempts: [save().attempts[0]],
    askedIds: ["q-1", "q-8"],
  });
  assert.equal(progress.parseQuizSave(open, { ...ctx, length: 20 }), null);

  const valid = save({
    phase: "question",
    index: 1,
    selectedChoiceId: null,
    attempts: [save().attempts[0]],
    askedIds: ["q-1", "q-8"],
  });
  const memory = new Map();
  const storage = {
    getItem: (key) => (memory.has(key) ? memory.get(key) : null),
    setItem: (key, value) => memory.set(key, value),
    removeItem: (key) => memory.delete(key),
    key: (index) => [...memory.keys()][index] ?? null,
    get length() {
      return memory.size;
    },
  };
  const parsed = progress.parseQuizSave(valid, ctx);
  progress.writeQuizSave(parsed, storage);
  assert.equal(progress.readQuizSave(ctx, storage).phase, "question");
  progress.removeQuizSave("operator", null, storage);
  assert.equal(progress.readQuizSave(ctx, storage), null);

  progress.writeQuizSave({ ...parsed, variant: "skill", category: "financial" }, storage);
  progress.clearQuizSaves(storage);
  assert.equal(storage.length, 0);
});

test("daily streak counts backward and ignores a gap before today", () => {
  const daily = {
    "2026-10-16": { ok: true },
    "2026-10-17": { ok: true },
    "2026-10-18": { ok: true },
  };
  assert.equal(streak.shiftDateKey("2026-10-01", -1), "2026-09-30");
  assert.equal(streak.consecutiveDailyStreak(daily, "2026-10-19"), 0);
  assert.equal(streak.consecutiveDailyStreak(daily, "2026-10-18"), 3);
  daily["2026-10-19"] = { ok: true };
  assert.equal(streak.consecutiveDailyStreak(daily, "2026-10-19"), 4);
  assert.match(streak.nextScenarioLabel(new Date(2026, 9, 19, 18, 30, 20)), /^in \d+h \d+m$/);
});

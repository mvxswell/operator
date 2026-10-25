/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const ts = require("typescript");
require.extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText, filename);
const { CASES } = require("../src/content/cases/catalog.ts");
const { CASE_TOPICS } = require("../src/content/cases/types.ts");
const { publicCaseFor } = require("../src/content/cases/server.ts");
const { QUESTION_BANK, BANK_STATS, dailyQuestionFor } = require("../src/data/index.ts");
const { GUIDES } = require("../src/content/guides/collection/index.ts");
const { practiceFor } = require("../src/lib/practiceLinks.ts");
const { BANK_STATS: lightStats, CATEGORY_COUNTS } = require("../src/data/counts.ts");
const { dailyPreviewFor } = require("../src/data/dailyPreview.ts");

test("48 unique cases cover all eight requested topics and real framework links", () => {
  assert.equal(CASES.length, 48);
  for (const key of ["slug", "title", "description", "questionId"]) assert.equal(new Set(CASES.map((item) => item[key])).size, 48, key);
  for (const topic of CASE_TOPICS) assert.equal(CASES.filter((item) => item.topic === topic).length, 6);
  for (const entry of CASES) {
    assert.ok(GUIDES.some((guide) => guide.slug === entry.guideSlug && guide.title === entry.guideTitle), entry.slug);
    assert.equal(practiceFor({ id: entry.questionId, category: entry.category, subskill: entry.subskill }).slug, entry.slug);
  }
});

test("page props expose the prompt, operating data and choices, never grading", () => {
  for (const entry of CASES) {
    const original = QUESTION_BANK.find((q) => q.id === entry.questionId);
    const question = publicCaseFor(entry.slug);
    assert.deepEqual(question.choices, original.choices);
    assert.equal(question.scenario, original.scenario);
    assert.ok(question.data?.rows.length >= 2, `${entry.slug}: operating facts table`);
    for (const row of question.data.rows) assert.ok(row.label && row.values.length && row.values.every((value) => typeof value === "string" && value.length), `${entry.slug}: readable table cells`);
    if (original.data) assert.deepEqual(question.data, original.data);
    for (const key of ["correctChoiceId", "explanation", "work", "takeaway"]) assert.equal(key in question, false, `${entry.slug}: ${key}`);
  }
  assert.equal(publicCaseFor("not-a-case"), null);
});

test("isolated worked solutions agree with the existing bank without changing quiz answers", () => {
  for (const entry of CASES) {
    const original = QUESTION_BANK.find((q) => q.id === entry.questionId);
    const solution = require(`../src/content/cases/solutions/${entry.slug}.ts`).default;
    assert.equal(solution.correctChoiceId, original.correctChoiceId);
    assert.equal(solution.explanation, original.explanation);
    assert.ok(solution.work.length >= 2 && solution.work.every((step) => typeof step === "string" && step.length > 15));
    assert.ok(solution.takeaway.length > 25);
  }
});

test("every quiz question has a valid practice destination, including uncatalogued subskills", () => {
  for (const question of QUESTION_BANK) {
    const match = practiceFor(question);
    assert.ok(match && CASES.includes(match), question.id);
  }
});

test("lightweight landing indexes match the live bank and daily calendar selection", () => {
  assert.deepEqual(lightStats, BANK_STATS);
  for (const [category, count] of Object.entries(CATEGORY_COUNTS)) assert.equal(count, QUESTION_BANK.filter((q) => q.category === category).length);
  for (let day = 0; day < 400; day++) {
    const date = new Date(Date.UTC(2026, 0, 1 + day)).toISOString().slice(0, 10);
    const q = dailyQuestionFor(date);
    assert.deepEqual(dailyPreviewFor(date), { id: q.id, category: q.category, industry: q.industry, teaser: q.teaser });
    assert.equal("correctChoiceId" in dailyPreviewFor(date), false);
  }
});

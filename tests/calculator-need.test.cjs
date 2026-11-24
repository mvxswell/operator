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

const { questionNeedsCalculator } = require("../src/lib/calculatorNeed.ts");
const { QUESTION_BANK } = require("../src/data/index.ts");

test("calculator stays off unless the question has worked steps or numeric data", () => {
  assert.equal(questionNeedsCalculator({ scenario: "You have 11 projects and $40,000." }), false);
  assert.equal(questionNeedsCalculator({ work: [] }), false);
  assert.equal(questionNeedsCalculator({ work: ["   "] }), false);
  assert.equal(questionNeedsCalculator({ work: ["Contribution = $50 − $58 = −$8."] }), true);
  assert.equal(
    questionNeedsCalculator({
      data: { columns: ["", "Last month"], rows: [{ label: "Loads booked", values: ["310"] }] },
    }),
    true,
  );
  assert.equal(
    questionNeedsCalculator({
      data: { rows: [{ label: "Owner", values: ["Alex"] }] },
    }),
    false,
  );
});

test("early Operator Test questions are mostly judgment, and figure questions keep the calculator", () => {
  const byId = Object.fromEntries(QUESTION_BANK.map((question) => [question.id, question]));
  assert.equal(questionNeedsCalculator(byId["btl-03"]), false);
  assert.equal(questionNeedsCalculator(byId["fin-03"]), true);
  assert.equal(questionNeedsCalculator(byId["btl-05"]), true);

  const levelTwo = QUESTION_BANK.filter((question) => question.difficulty === 2);
  const withCalculator = levelTwo.filter(questionNeedsCalculator);
  assert.equal(levelTwo.length, 16);
  assert.equal(withCalculator.length, 3);
});

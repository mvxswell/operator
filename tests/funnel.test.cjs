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
const share = require("../src/lib/shareResult.ts");
const { nextSkillToTrain } = require("../src/lib/nextSkill.ts");
const { GUIDES } = require("../src/content/guides/index.ts");
const { CATEGORY_IDS } = require("../src/lib/categories.ts");

test("funnel names match the published skills and guides and reject anything else", () => {
  assert.deepEqual([...events.FUNNEL_SKILLS], [...CATEGORY_IDS]);
  assert.deepEqual([...events.FUNNEL_GUIDE_SLUGS].sort(), GUIDES.map((guide) => guide.slug).sort());

  for (const skill of events.FUNNEL_SKILLS) {
    for (const action of ["intro", "start", "complete"]) {
      assert.equal(events.isFunnelEvent(`skill:${skill}:${action}`), true);
    }
  }
  for (const slug of events.FUNNEL_GUIDE_SLUGS) {
    assert.equal(events.isFunnelEvent(`guide:${slug}:scenario`), true);
    assert.equal(events.isFunnelEvent(`guide:${slug}:cta`), true);
  }
  for (const name of [
    "operator:intro",
    "operator:start",
    "operator:complete",
    "operator:q:1",
    "operator:q:5",
    "operator:q:10",
    "operator:q:15",
    "operator:q:20",
    "operator:abandon:1",
    "operator:abandon:20",
    "result:train",
    "result:retake",
    "result:share",
    "result:post",
    "result:progress",
    "result:guide",
    "quick:start",
    "quick:complete",
    "quick:again",
    "daily:answer",
    "daily:share",
  ]) {
    assert.equal(events.isFunnelEvent(name), true, name);
  }

  for (const name of [
    "",
    "operator:q:2",
    "operator:q:7",
    "operator:abandon:0",
    "operator:abandon:21",
    "operator:start ",
    " skill:financial:start",
    "skill:nope:start",
    "guide:missing:cta",
    "daily:answer:correct",
    "result:share:742",
    "00000000-0000-4000-8000-000000000000",
  ]) {
    assert.equal(events.isFunnelEvent(name), false, name);
  }
});

test("event bodies are plain text and the count endpoint drops the /online path", () => {
  assert.equal(events.funnelEventFromBody("text/plain", "operator:start"), "operator:start");
  assert.equal(events.funnelEventFromBody("text/plain;charset=UTF-8", "daily:share"), "daily:share");
  assert.equal(events.funnelEventFromBody("application/json", "operator:start"), null);
  assert.equal(events.funnelEventFromBody("text/plain", "operator:start\n742"), null);
  assert.equal(events.funnelEventFromBody("text/plain", ""), null);
  assert.equal(
    events.eventsEndpoint("https://think-operator-presence.mrm1244.workers.dev/online"),
    "https://think-operator-presence.mrm1244.workers.dev/e",
  );
  assert.equal(events.eventsEndpoint(undefined), null);
  assert.equal(events.eventsEndpoint("not a url"), null);
});

test("share text is a score or daily line plus the canonical url", () => {
  const operator = share.operatorShareText(742, "Operator");
  assert.equal(
    operator.text,
    "I scored 742 (Operator tier) on the Operator Test. Can you beat it?\nhttps://thinkoperator.com/operator/?ref=share",
  );
  const skill = share.skillShareText(680, "Manager", "Financial Judgment", "financial");
  assert.match(skill.line, /680 \(Manager tier\) on the Financial Judgment test/);
  assert.equal(skill.url, "https://thinkoperator.com/skills/financial/?ref=share");
  const quick = share.quickShareText(24, "Sharp");
  assert.match(quick.line, /24 DPM \(Sharp tier\)/);
  assert.equal(
    share.dailyShareText("2026-10-18", true, 3, 4).line,
    "Daily Decision Oct 18: ✅ L3, 4-day streak",
  );
  assert.equal(
    share.dailyShareText("2026-10-18", false, 3, 1).line,
    "Daily Decision Oct 18: ❌ L3, 1-day streak",
  );
  assert.equal(share.dailyShareText("2026-10-18", true, 3, 4).url, "https://thinkoperator.com/daily/?ref=share");
});

test("the next skill to train is an untried skill, then the lowest best", () => {
  const blank = Object.fromEntries(CATEGORY_IDS.map((id) => [id, { best: 0, runs: [] }]));
  assert.equal(nextSkillToTrain("people", blank), "bottleneck");
  const seen = Object.fromEntries(
    CATEGORY_IDS.map((id) => [id, { best: id === "financial" ? 20 : 80, runs: [{ id: "run" }] }]),
  );
  assert.equal(nextSkillToTrain("people", seen), "financial");
  assert.notEqual(nextSkillToTrain("financial", seen), "financial");
});

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

const badges = require("../src/lib/badges.ts");
const storage = require("../src/lib/storage.ts");
const events = require("../src/lib/funnelEvents.ts");
const share = require("../src/lib/shareResult.ts");
const celebration = require("../src/lib/badgeCelebration.ts");
const { CATEGORY_IDS } = require("../src/lib/categories.ts");
const { longestDailyStreak, shiftDateKey } = require("../src/lib/dailyStreak.ts");

function operatorRun(score, id = "op") {
  return {
    id,
    at: "2026-10-01T15:00:00.000Z",
    score,
    accuracy: 0.8,
    avgSeconds: 12,
    highestLevel: 4,
    total: 20,
    correct: 16,
    skills: {},
  };
}

function skillRun(score, id = "sk") {
  return { id, at: "2026-10-02T15:00:00.000Z", score, accuracy: 0.8, highestLevel: 3 };
}

function quickRun(overrides = {}) {
  return {
    id: "qk",
    at: "2026-10-03T15:00:00.000Z",
    dpm: 10,
    made: 20,
    correct: 16,
    accuracy: 0.8,
    avgSeconds: 3,
    bestStreak: 4,
    ...overrides,
  };
}

function dailyRecord(date) {
  return {
    date,
    questionId: "daily-q",
    chosenChoiceId: "a",
    correct: true,
    at: `${date}T15:00:00.000Z`,
  };
}

function fillDaily(start, days) {
  const daily = {};
  let cursor = start;
  for (let i = 0; i < days; i += 1) {
    daily[cursor] = dailyRecord(cursor);
    cursor = shiftDateKey(cursor, 1);
  }
  return daily;
}

function saved(mutate) {
  const profile = storage.emptyProfile();
  mutate(profile);
  return storage.reviveProfile(JSON.parse(JSON.stringify(profile)));
}

function earned(profile) {
  return badges.earnedBadgeIds(profile);
}

test("the badge catalog is a small set with stable ids and short descriptions", () => {
  assert.ok(badges.BADGES.length >= 10 && badges.BADGES.length <= 15);
  assert.deepEqual(badges.BADGES.map((badge) => badge.id), [...badges.BADGE_IDS]);
  assert.equal(new Set(badges.BADGES.map((badge) => badge.name)).size, badges.BADGES.length);
  for (const badge of badges.BADGES) {
    assert.ok(badge.description.length > 0 && badge.description.length <= 64, badge.id);
    assert.ok(badge.how.length > 12, badge.id);
    assert.equal(badge.description.includes("\n"), false);
    const name = badges.badgeEventName(badge.id);
    assert.equal(name, `badge_earned:${badge.id}`);
    assert.ok(name.length <= 80);
    assert.equal(events.isFunnelEvent(name), true, name);
    assert.equal(events.funnelEventFromBody("text/plain", name), name);
  }
  assert.equal(badges.badgeEventName("elite:900"), null);
  assert.equal(badges.badgeEventName("742"), null);
  assert.equal(events.isFunnelEvent("badge_earned:elite:900"), false);
  assert.equal(events.funnelEventFromBody("text/plain", "badge_earned:top-ten:1"), null);
});

test("a new profile has earned nothing, and old saves without marks still open", () => {
  assert.deepEqual(earned(storage.emptyProfile()), []);
  const old = storage.emptyProfile();
  delete old.marks;
  old.operator.best = 640;
  old.operator.runs = [operatorRun(640)];
  const revived = storage.reviveProfile(JSON.parse(JSON.stringify(old)));
  assert.deepEqual(revived.marks, { sharedAt: null, bestRank: null });
  assert.equal(revived.operator.runs.length, 1);
  assert.deepEqual(earned(revived), ["first-call"]);
});

test("score tiers, skill completion, and quick speed award only the badges they name", () => {
  assert.deepEqual(earned(saved((profile) => {
    profile.operator.best = 699;
    profile.operator.runs = [operatorRun(699)];
  })), ["first-call"]);

  assert.deepEqual(earned(saved((profile) => {
    profile.operator.best = 700;
    profile.operator.runs = [operatorRun(700)];
  })), ["first-call", "operator"]);

  assert.deepEqual(earned(saved((profile) => {
    profile.operator.best = 900;
    profile.operator.runs = [operatorRun(400, "older")];
  })), ["first-call", "operator", "elite"]);

  const specialist = saved((profile) => {
    profile.skills.financial.best = 950;
    profile.skills.financial.runs = [skillRun(950)];
  });
  assert.deepEqual(earned(specialist), ["first-call", "specialist"]);

  const seven = saved((profile) => {
    for (const id of CATEGORY_IDS.slice(0, 7)) profile.skills[id].runs = [skillRun(100, id)];
  });
  assert.equal(earned(seven).includes("full-bench"), false);
  assert.equal(earned(seven).includes("first-call"), true);

  const eight = saved((profile) => {
    for (const id of CATEGORY_IDS) profile.skills[id].runs = [skillRun(100, id)];
  });
  assert.deepEqual(earned(eight), ["first-call", "full-bench"]);

  assert.deepEqual(earned(saved((profile) => {
    profile.quick.bestDpm = 23;
    profile.quick.runs = [quickRun({ dpm: 23 })];
  })), ["first-call"]);
  assert.deepEqual(earned(saved((profile) => {
    profile.quick.bestDpm = 24;
    profile.quick.runs = [quickRun({ dpm: 24, avgSeconds: 2.4 })];
  })), ["first-call", "sharp"]);
  assert.ok(earned(saved((profile) => {
    profile.quick.bestDpm = 30;
    profile.quick.runs = [quickRun({ dpm: 30, avgSeconds: 2 })];
  })).includes("instinctive"));

  const snap = (overrides) => earned(saved((profile) => {
    profile.quick.runs = [quickRun({ dpm: 12, ...overrides })];
  }));
  assert.equal(snap({ avgSeconds: 1.99, accuracy: 0.75, made: 8 }).includes("snap"), true);
  assert.equal(snap({ avgSeconds: 2, accuracy: 1, made: 20 }).includes("snap"), false);
  assert.equal(snap({ avgSeconds: 0.4, accuracy: 0.5, made: 40, dpm: 30 }).includes("snap"), false);
  assert.equal(snap({ avgSeconds: 0.4, accuracy: 0.5, made: 40, dpm: 30 }).includes("instinctive"), true);
  assert.equal(snap({ avgSeconds: 0, accuracy: 1, made: 0 }).includes("snap"), false);

  const four = saved((profile) => {
    profile.operator.runs = [operatorRun(400)];
    profile.quick.runs = [quickRun()];
    profile.skills.people.runs = [skillRun(400)];
    profile.daily = { "2026-10-01": dailyRecord("2026-10-01") };
  });
  assert.equal(earned(four).includes("four-modes"), true);
  assert.equal(earned(four).includes("full-bench"), false);
  const missingDaily = saved((profile) => {
    profile.operator.runs = [operatorRun(400)];
    profile.quick.runs = [quickRun()];
    profile.skills.people.runs = [skillRun(400)];
  });
  assert.equal(earned(missingDaily).includes("four-modes"), false);
});

test("daily streak badges use the longest saved run, including across a month and a broken streak", () => {
  assert.equal(shiftDateKey("2026-03-07", 1), "2026-03-08");
  assert.equal(shiftDateKey("2026-10-31", 1), "2026-11-01");
  assert.equal(longestDailyStreak(fillDaily("2026-03-07", 3)), 3);
  assert.equal(longestDailyStreak(fillDaily("2026-10-31", 3)), 3);
  assert.equal(longestDailyStreak({ ...fillDaily("2026-01-01", 3), ...fillDaily("2026-03-01", 2) }), 3);
  assert.equal(longestDailyStreak(fillDaily("2026-04-01", 29)), 29);
  assert.equal(longestDailyStreak(fillDaily("2026-04-01", 30)), 30);

  const three = saved((profile) => { profile.daily = fillDaily("2026-01-01", 3); });
  assert.deepEqual(earned(three).filter((id) => id.startsWith("streak-")), ["streak-3"]);
  const week = saved((profile) => {
    profile.daily = { ...fillDaily("2026-01-01", 7), ...fillDaily("2026-06-01", 1) };
  });
  assert.deepEqual(earned(week).filter((id) => id.startsWith("streak-")), ["streak-3", "streak-7"]);
  const month = saved((profile) => { profile.daily = fillDaily("2026-04-01", 30); });
  assert.deepEqual(earned(month).filter((id) => id.startsWith("streak-")), ["streak-3", "streak-7", "streak-30"]);
});

test("share and leaderboard marks are validated and only a top-10 rank earns the badge", () => {
  const clean = { sharedAt: null, bestRank: null };
  assert.equal(badges.marksAfterShare(clean, "not a date"), clean);
  assert.equal(badges.marksAfterRank(clean, 10.5), clean);
  assert.equal(badges.marksAfterRank(clean, 0), clean);
  assert.equal(badges.marksAfterRank(clean, 100_001), clean);
  const shared = badges.marksAfterShare(clean, "2026-10-22T00:00:00.000Z");
  assert.equal(badges.marksAfterShare(shared, "2026-11-01T00:00:00.000Z"), shared);
  const tenth = badges.marksAfterRank(clean, 10);
  assert.equal(badges.marksAfterRank(tenth, 11), tenth);
  assert.equal(badges.marksAfterRank(tenth, 4).bestRank, 4);

  const junk = storage.reviveProfile({
    version: 1,
    marks: { sharedAt: "<script>", bestRank: "10" },
  });
  assert.deepEqual(junk.marks, clean);
  assert.equal({}.polluted, undefined);

  const placed = storage.reviveProfile({
    version: 1,
    marks: { sharedAt: "2026-10-22T00:00:00.000Z", bestRank: 10 },
  });
  assert.deepEqual(placed.marks, { sharedAt: "2026-10-22T00:00:00.000Z", bestRank: 10 });
  assert.deepEqual(earned(placed), ["top-ten", "challenger"]);
  assert.deepEqual(storage.reviveProfile(JSON.parse(JSON.stringify(placed))).marks, placed.marks);

  const outside = storage.reviveProfile({ version: 1, marks: { bestRank: 11 } });
  assert.equal(outside.marks.bestRank, 11);
  assert.equal(earned(outside).includes("top-ten"), false);

  const before = storage.emptyProfile();
  const after = saved((profile) => {
    profile.operator.best = 900;
    profile.operator.runs = [operatorRun(900)];
    profile.marks.sharedAt = "2026-10-22T00:00:00.000Z";
  });
  assert.deepEqual(badges.newBadgeIds(before, after), ["first-call", "operator", "elite", "challenger"]);
  assert.deepEqual(badges.newBadgeIds(after, after), []);
});

test("a badge share link names the badge and does not carry a score", () => {
  const payload = share.badgeShareText("Elite operator", "elite");
  assert.equal(payload.line, "I earned the Elite operator badge on Think Operator.");
  assert.equal(payload.url, "https://thinkoperator.com/badges/#elite");
  assert.equal(payload.text.includes("score="), false);
  const url = new URL(share.channelUrl(payload.url, "linkedin"));
  assert.equal(url.origin, "https://thinkoperator.com");
  assert.equal(url.pathname, "/badges/");
  assert.equal(url.hash, "#elite");
  assert.equal(url.searchParams.get("utm_source"), "linkedin");
  assert.equal(url.searchParams.get("score"), null);
  assert.equal(url.searchParams.get("q"), null);
});

test("saving progress celebrates only newly earned badges", () => {
  const map = new Map();
  global.window = {
    localStorage: {
      getItem: (key) => (map.has(key) ? map.get(key) : null),
      setItem: (key, value) => { map.set(key, String(value)); },
      removeItem: (key) => { map.delete(key); },
      key: (index) => [...map.keys()][index] ?? null,
      get length() { return map.size; },
    },
    addEventListener() {},
    removeEventListener() {},
  };

  try {
    storage.resetProfile();
    celebration.dismissCelebrations();

    storage.recordDaily(dailyRecord("2026-10-01"));
    assert.deepEqual([...celebration.celebrationSnapshot()], ["first-call"]);
    celebration.dismissCelebrations();
    storage.recordDaily(dailyRecord("2026-10-02"));
    assert.deepEqual([...celebration.celebrationSnapshot()], []);
    storage.recordDaily(dailyRecord("2026-10-03"));
    assert.deepEqual([...celebration.celebrationSnapshot()], ["streak-3"]);

    storage.resetProfile();
    celebration.dismissCelebrations();
    storage.recordOperatorRun(operatorRun(900, "a"));
    assert.deepEqual([...celebration.celebrationSnapshot()], ["first-call", "operator", "elite"]);
    celebration.dismissCelebrations();
    storage.recordOperatorRun(operatorRun(910, "b"));
    assert.deepEqual([...celebration.celebrationSnapshot()], []);

    storage.resetProfile();
    celebration.dismissCelebrations();
    storage.recordQuickRun(quickRun({ id: "fast", dpm: 30, made: 20, correct: 18, accuracy: 0.9, avgSeconds: 1.4 }));
    assert.deepEqual([...celebration.celebrationSnapshot()], ["first-call", "sharp", "instinctive", "snap"]);

    storage.resetProfile();
    celebration.dismissCelebrations();
    const history = storage.emptyProfile();
    history.daily = fillDaily("2026-01-01", 7);
    storage.importProfileBackup(JSON.stringify(history));
    assert.deepEqual([...celebration.celebrationSnapshot()], []);
    assert.equal(earned(storage.profileStore.load()).includes("streak-7"), true);
    storage.recordDaily(dailyRecord("2026-01-08"));
    assert.deepEqual([...celebration.celebrationSnapshot()], []);

    storage.resetProfile();
    celebration.dismissCelebrations();
    storage.recordResultShared("not-a-date");
    assert.equal(storage.profileStore.load().marks.sharedAt, null);
    storage.recordResultShared("2026-10-22T12:00:00.000Z");
    assert.deepEqual([...celebration.celebrationSnapshot()], ["challenger"]);
    storage.recordResultShared("2026-11-01T12:00:00.000Z");
    assert.equal(storage.profileStore.load().marks.sharedAt, "2026-10-22T12:00:00.000Z");
    celebration.dismissCelebrations();
    storage.recordBestRank(11);
    assert.equal(storage.profileStore.load().marks.bestRank, 11);
    assert.deepEqual([...celebration.celebrationSnapshot()], []);
    storage.recordBestRank(10);
    assert.deepEqual([...celebration.celebrationSnapshot()], ["top-ten"]);
    storage.recordBestRank(4);
    assert.equal(storage.profileStore.load().marks.bestRank, 4);
    assert.deepEqual([...celebration.celebrationSnapshot()], ["top-ten"]);
    storage.recordBestRank(1.5);
    assert.equal(storage.profileStore.load().marks.bestRank, 4);

    celebration.queueBadgeCelebrations(["first-call"]);
    storage.resetProfile();
    assert.deepEqual([...celebration.celebrationSnapshot()], []);
    assert.deepEqual(storage.profileStore.load().marks, { sharedAt: null, bestRank: null });
  } finally {
    celebration.dismissCelebrations();
    storage.resetProfile();
    delete global.window;
  }
});

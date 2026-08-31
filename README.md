# Operator

A web app that tests and trains business judgment. Four modes, an adaptive question
engine, and a 0–1000 Operator Score.

```bash
npm run dev
```

Then open http://localhost:3000.

## Modes

| Mode | Route | Shape |
| --- | --- | --- |
| Operator Test | `/operator` | 20 adaptive multiple-choice scenarios → Operator Score + 8 skill scores |
| Quick Decisions | `/quick` | 60 seconds, two choices per scenario → DPM |
| Skill Tests | `/skills`, `/skills/[category]` | 10 adaptive scenarios from a single skill |
| Daily Decision | `/daily` | One scenario a day, then a (simulated) community distribution |

## Architecture

Question logic is kept out of the UI. Components render what the engines hand them.

```
src/
  data/                     the question bank — plain data, no logic
    questions/<skill>.ts    12 multiple-choice scenarios per skill (96 total)
    quick.ts                60 two-choice scenarios
    daily.ts                14 daily scenarios with community distributions
    index.ts                the only entry point into the bank
  lib/
    types.ts                Question / QuickQuestion / DailyQuestion shapes
    categories.ts           the 8 skills: names, descriptions, icons, accents
    adaptive.ts             difficulty state machine + question selection
    scoring.ts              Operator Score, skill scores, DPM, tier labels
    storage.ts              ProfileStore — all persistence lives behind this
    useProfile.ts           React binding for the store
    useQuizEngine.ts        engine for Operator Test and Skill Tests
    useQuickGame.ts         60-second game loop for Quick Decisions
  components/               presentational; Assessment and QuestionCard are shared
  app/                      one route per mode
```

### Seams for what comes next

- **Database / accounts.** Every read and write goes through `ProfileStore` in
  `lib/storage.ts`. Implement that interface against an API route and nothing
  else changes.
- **AI-generated scenarios.** Nothing outside `data/index.ts` enumerates
  questions. Swap those exports for a fetch and the engines keep working.
- **New skills.** Add an entry to `CATEGORIES` and a question file. Stored
  profiles merge onto the full category list, so old data will not break.
- **New modes.** `useQuizEngine` is configuration-driven (`pool`, `length`,
  `restrictTo`), which is how the Operator Test and eight Skill Tests share one
  implementation.

## The question bank

96 multiple-choice scenarios, 12 per skill, spread across difficulty 1–6 and
drawn from roughly 60 industries — SaaS, restaurants, logistics, manufacturing,
healthcare, retail, agencies, trades, hospitality, professional services.

Authoring rules:

1. Everything needed to answer is in the scenario. No trivia, no outside knowledge.
2. Math stays simple — percentages, margins, capacity, basic ROI.
3. Difficulty comes from deciding what the numbers mean, not from arithmetic.
4. Wrong answers get more plausible as difficulty rises.
5. Level 5–6 tests second-order effects, opportunity cost, and diagnosis before action.
6. Every question carries a 1–3 sentence explanation of *why* the best answer is best.

## Adaptive difficulty

`lib/adaptive.ts` holds a float level in `[1, 6]`, starting at 2.2. A correct
answer well inside par moves it up fastest; a very fast wrong answer is treated
as a guess and drops it hardest. Question selection picks the nearest available
difficulty, breaking ties toward the least-covered skill so a 20-question run
still touches all eight. Nothing is gated behind progression — a strong first-time
player reaches level 5–6 within a few questions.

## Scoring

**Operator Score, 0–1000:**

| Component | Max | Basis |
| --- | --- | --- |
| Accuracy | 500 | share correct |
| Difficulty handled | 350 | average difficulty of what you solved (75%) + highest level served (25%) |
| Speed | 150 | time vs par for each question's difficulty, multiplied by **accuracy²** |

Squaring accuracy in the speed term is what stops fast guessing from scoring.

**Skill scores, 0–100:** difficulty-weighted credit with Bayesian shrinkage
toward 50, so a skill sampled by two questions does not read as a flat 0 or 100.

**DPM:** correct decisions in the 60 seconds. Below 75% accuracy it is scaled by
`(accuracy / 0.75)²`. Combined with a 220 ms input lockout and a 1.2 s freeze on
wrong answers, mashing scores well below real play.

## Storage

Everything is in `localStorage` under `operator.profile.v1`: Operator best and
recent runs, Quick Decisions best DPM and recent runs, per-skill bests, and daily
completions. The payload is versioned and revived defensively — an unknown
version resets rather than crashes.

## Not built yet

Authentication, a database, global leaderboards, AI-generated scenarios, and CEO
Mode are all deliberately out of scope for this version.

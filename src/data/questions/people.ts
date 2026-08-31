import type { Question } from "@/lib/types";

export const PEOPLE_QUESTIONS: Question[] = [
  {
    id: "peo-01",
    mode: "standard",
    category: "people",
    subskill: "owner time value",
    industry: "Law practice",
    difficulty: 1,
    scenario:
      "You bill $250 an hour and have a waiting list of clients. You currently spend six hours a week scanning and filing documents. An assistant would do it for $22 an hour.",
    prompt: "What should you do?",
    choices: [
      { id: "a", text: "Keep doing it yourself to control costs" },
      { id: "b", text: "Hire the assistant and use the freed hours on client work" },
      { id: "c", text: "Do the filing after hours instead" },
      { id: "d", text: "Stop filing documents altogether" },
    ],
    correctChoiceId: "b",
    explanation:
      "Six hours of your time is worth $1,500 against roughly $132 of assistant cost, and you have clients waiting to absorb those hours.",
  },
  {
    id: "peo-02",
    mode: "standard",
    category: "people",
    subskill: "onboarding ownership",
    industry: "Retail chain",
    difficulty: 1,
    scenario:
      "A new store associate started Monday. Nobody was assigned to train them, so they have spent three days shadowing whoever happens to be free.",
    prompt: "What should you do?",
    choices: [
      { id: "a", text: "Give it more time; people learn by observing" },
      { id: "b", text: "Assign a specific person and a defined first-week plan" },
      { id: "c", text: "Move them to a quieter store" },
      { id: "d", text: "Send them home until a manager is available" },
    ],
    correctChoiceId: "b",
    explanation:
      "Training that belongs to everyone belongs to no one. Naming an owner and a plan is the difference between a productive hire in two weeks and a resignation in two months.",
  },
  {
    id: "peo-03",
    mode: "standard",
    category: "people",
    subskill: "promotion misfit",
    industry: "Software company",
    difficulty: 2,
    scenario:
      "You promoted your best engineer to engineering manager six months ago. Her team's output has dropped, she works nights to keep coding, and she has said she misses building.",
    prompt: "What is the best response?",
    choices: [
      { id: "a", text: "Give her management training and more time to adjust" },
      { id: "b", text: "Create a senior technical track and move her back to building" },
      { id: "c", text: "Reduce her team size so management is easier" },
      { id: "d", text: "Replace her with an external manager and let her leave if she wants" },
    ],
    correctChoiceId: "b",
    explanation:
      "You converted an excellent individual contributor into a struggling manager and lost both. A senior technical path keeps the talent and lets you hire someone who actually wants to manage.",
  },
  {
    id: "peo-04",
    mode: "standard",
    category: "people",
    subskill: "single point of failure",
    industry: "Specialty bakery",
    difficulty: 2,
    scenario:
      "One baker knows every recipe and holds them in his head. He has not taken a vacation in two years, and production stops entirely on the rare days he is out.",
    prompt: "What should you do?",
    choices: [
      { id: "a", text: "Give him a raise to reduce the risk of losing him" },
      { id: "b", text: "Document the recipes and cross-train a second baker" },
      { id: "c", text: "Require him to give more notice before taking days off" },
      { id: "d", text: "Hire an assistant to help him work faster" },
    ],
    correctChoiceId: "b",
    explanation:
      "A raise makes him more likely to stay but does nothing about illness, burnout or a better offer. Documentation and a trained backup convert a single point of failure into a normal role.",
  },
  {
    id: "peo-05",
    mode: "standard",
    category: "people",
    subskill: "skill, will, or system",
    industry: "Call center",
    difficulty: 3,
    scenario: "Four agents on the same team, same shift, same script:",
    data: {
      columns: ["Agent", "Calls/day", "Conversion"],
      rows: [
        { label: "Agent A", values: ["48", "9%"] },
        { label: "Agent B", values: ["51", "10%"] },
        { label: "Agent C", values: ["47", "8%"] },
        { label: "Agent D", values: ["49", "26%"] },
      ],
      note: "All four were hired within the same two months and trained together.",
    },
    prompt: "What is the most valuable next step?",
    choices: [
      { id: "a", text: "Put A, B and C on performance improvement plans" },
      { id: "b", text: "Find out what Agent D does differently and teach it" },
      { id: "c", text: "Replace the script, since three of four underperform" },
      { id: "d", text: "Increase the commission rate to motivate the team" },
    ],
    correctChoiceId: "b",
    explanation:
      "One person hitting 26% on the same inputs proves the result is achievable. The cheapest source of improvement is already inside the building; copy it before you replace anything.",
  },
  {
    id: "peo-06",
    mode: "standard",
    category: "people",
    subskill: "delegating outcomes",
    industry: "Logistics",
    difficulty: 3,
    scenario:
      "You handed your dispatch supervisor a 14-step checklist for building the daily route plan. He follows it exactly, and every exception still comes back to you, which is about a dozen times a day.",
    prompt: "What should change?",
    choices: [
      { id: "a", text: "Expand the checklist to cover more exception cases" },
      { id: "b", text: "Give him the objective, the constraints, and authority to decide" },
      { id: "c", text: "Move exception handling to a different person" },
      { id: "d", text: "Hold a daily meeting to clear exceptions in one batch" },
    ],
    correctChoiceId: "b",
    explanation:
      "You delegated the steps but kept the judgment, so every case the checklist did not anticipate returns to you. Delegating the outcome and the boundaries is what actually removes you from the loop.",
  },
  {
    id: "peo-07",
    mode: "standard",
    category: "people",
    subskill: "hiring timing",
    industry: "Growing agency",
    difficulty: 4,
    scenario:
      "Your team is at 100% utilization and turning away work. A strong candidate takes about eight weeks to hire and three months to become fully productive. Your pipeline for the next two quarters is strong and contracted.",
    prompt: "When should you hire?",
    choices: [
      { id: "a", text: "Now, because productive capacity arrives about five months out" },
      { id: "b", text: "Once the team is visibly overloaded and quality slips" },
      { id: "c", text: "After the contracted work is delivered, to be safe" },
      { id: "d", text: "Never — use contractors so the cost stays variable" },
    ],
    correctChoiceId: "a",
    explanation:
      "The lag between deciding to hire and getting useful capacity is about five months. Waiting for visible pain means the relief arrives long after the damage, and here the demand is already contracted.",
  },
  {
    id: "peo-08",
    mode: "standard",
    category: "people",
    subskill: "high performer, negative externality",
    industry: "Sales organization",
    difficulty: 4,
    scenario:
      "Your top rep produces 30% of revenue. He also refuses to use the CRM, publicly dismisses the sales process, and two of your four other reps have privately said they are considering leaving because of him.",
    prompt: "What is the right action?",
    choices: [
      { id: "a", text: "Protect the revenue and tolerate the behavior" },
      { id: "b", text: "Set explicit behavioral expectations with real consequences, and prepare for either outcome" },
      { id: "c", text: "Terminate him immediately to protect the team" },
      { id: "d", text: "Move him to a solo territory so he affects no one" },
    ],
    correctChoiceId: "b",
    explanation:
      "Tolerating it tells the other 70% that the rules are optional, and losing two reps costs more than the one you kept. Naming the standard with consequences is the only path that can both keep him and keep the team.",
  },
  {
    id: "peo-09",
    mode: "standard",
    category: "people",
    subskill: "coach or replace",
    industry: "Manufacturing",
    difficulty: 5,
    scenario:
      "A supervisor hired 14 months ago runs the lowest-performing shift on every metric. He has never been given targets, has had no one-on-one in a year, and his two peers both received formal training he did not.",
    prompt: "What should you do?",
    choices: [
      { id: "a", text: "Replace him; 14 months is enough time to prove himself" },
      { id: "b", text: "Give him the targets, training and feedback his peers received, then judge" },
      { id: "c", text: "Move him to a non-supervisory role" },
      { id: "d", text: "Reassign his shift to a stronger supervisor" },
    ],
    correctChoiceId: "b",
    explanation:
      "You cannot conclude someone failed at a job they were never actually given the conditions to do. Supplying the missing inputs is fast, cheap, and makes the eventual decision defensible either way.",
  },
  {
    id: "peo-10",
    mode: "standard",
    category: "people",
    subskill: "span of control",
    industry: "Home care agency",
    difficulty: 5,
    scenario:
      "You have grown from 20 to 95 caregivers in 18 months. One scheduler still handles every assignment, callout and complaint. Missed shifts have tripled and client complaints are up sharply.",
    prompt: "What is the core problem?",
    choices: [
      { id: "a", text: "The scheduler is underperforming and needs replacing" },
      { id: "b", text: "The structure never changed as the organization grew nearly fivefold" },
      { id: "c", text: "Caregivers are less reliable than they used to be" },
      { id: "d", text: "Clients have become more demanding" },
    ],
    correctChoiceId: "b",
    explanation:
      "A structure that worked for 20 people rarely survives 95. This is an organizational design problem, and replacing the person just puts someone new into the same impossible job.",
  },
  {
    id: "peo-11",
    mode: "standard",
    category: "people",
    subskill: "incentive design",
    industry: "Auto dealership",
    difficulty: 6,
    scenario:
      "You paid service advisors a commission on parts and labor revenue. Revenue per repair order rose 22%. Repeat service visits fell 15%, the online rating dropped from 4.5 to 3.8, and warranty complaints about unnecessary work doubled.",
    prompt: "What is the right conclusion?",
    choices: [
      { id: "a", text: "The incentive works; the ratings issue is a separate service problem" },
      { id: "b", text: "The incentive is buying short-term revenue by spending customer trust" },
      { id: "c", text: "Advisors need training on how to explain recommended work" },
      { id: "d", text: "Ratings and repeat visits are seasonal and should be ignored" },
    ],
    correctChoiceId: "b",
    explanation:
      "People optimize what you pay them for, including in ways you did not intend. Three independent measures moved against you at once, which is the signature of an incentive borrowing from future revenue.",
  },
  {
    id: "peo-12",
    mode: "standard",
    category: "people",
    subskill: "owner as constraint",
    industry: "Multi-location services",
    difficulty: 6,
    scenario:
      "You own four locations. You personally approve every quote over $5,000, interview every hire, and resolve every escalation. Growth has flattened for three quarters, your managers routinely wait on you, and you are working 70 hours a week.",
    prompt: "What is the highest-leverage change?",
    choices: [
      { id: "a", text: "Work more efficiently so decisions clear faster" },
      { id: "b", text: "Hire an executive assistant to manage your queue" },
      { id: "c", text: "Move decision rights to managers with clear limits and a review cadence" },
      { id: "d", text: "Pause expansion until you can personally keep up" },
    ],
    correctChoiceId: "c",
    explanation:
      "Every decision routes through one person, so the company can only grow as fast as that person's calendar. Speeding yourself up raises the ceiling slightly; moving the decisions removes the ceiling.",
  },
];

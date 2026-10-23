import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-set-quarterly-business-priorities",
  skill: "prioritization",
  title: "How to Set Quarterly Business Priorities",
  description: "Set quarterly priorities around the business constraint. Choose outcomes, price the capacity tradeoff, stop competing projects, and review evidence each week.",
  answer: "Choose quarterly priorities by identifying the constraint on the business's next meaningful outcome. Select a small set of changes that fit actual capacity, name what will stop, and define observable finish conditions. Keep routine operating standards separate from the few improvement bets that need concentrated attention.",
  scenario: {
    industry: "Illustrative growing service firm",
    scenario: "Suppose the quarter's goal is reliable customer launches. The team has a full sales pipeline, but launches wait for a single onboarding specialist. Proposed priorities include a new lead campaign, a brand redesign, and a standardized onboarding handoff.",
    prompt: "Which priority most directly addresses the stated constraint?",
    choices: [
      {
        id: "a",
        text: "Add a larger lead campaign before fixing launch capacity"
      },
      {
        id: "b",
        text: "Fund all proposals without changing anyone's workload"
      },
      {
        id: "c",
        text: "Build and test the onboarding handoff with explicit capacity"
      },
      {
        id: "d",
        text: "Choose the brand redesign because it is easiest to present"
      }
    ],
    correctChoiceId: "c",
    explanation: "The constraint is onboarding, not demand. A tested handoff targets that limit, provided the plan allocates the relevant people and removes conflicting work."
  },
  faqs: [
    {
      question: "How many quarterly priorities should a business choose?",
      answer: "Choose only what fits real improvement capacity after routine operations. The right count depends on scope and dependencies, not a universal rule. A short list still fails when every item needs the same unavailable specialist. Price the tradeoff and name what will stop."
    },
    {
      question: "Should priorities change during the quarter?",
      answer: "Yes, when material evidence changes the decision. Make the revision explicit and preserve the original assumption for learning. Frequent changes driven by whoever asks most recently are different from a deliberate response to a changed customer, cash, or operating constraint."
    },
    {
      question: "What if a priority is unfinished at quarter end?",
      answer: "Reassess its value, remaining work, and capacity needs before carrying it forward. Determine why it missed: poor scope, blocked decisions, insufficient capacity, or a changed goal. Continuing may be right, but unfinished work should not receive automatic priority over the next quarter's real constraint."
    }
  ],
  related: [
    "how-to-prioritize",
    "how-to-run-a-weekly-operating-review",
    "how-to-test-a-new-market-before-expanding"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Start with the next outcome that matters"
    },
    {
      type: "p",
      text: "Write the business outcome the quarter must protect or improve: reliable delivery, a cash position, retention, a viable offer, or another concrete result. Explain why it matters now. A list assembled from departmental wishes can distribute attention fairly while leaving the real constraint untouched. Begin with the operating evidence and strategic choice, then ask which changes are necessary. Avoid using a planning workshop to create commitments before the business has agreed what problem those commitments are meant to solve."
    },
    {
      type: "h2",
      text: "Separate running the business from changing it"
    },
    {
      type: "p",
      text: "Payroll, customer support, routine selling, and delivery still require capacity even when they are not quarterly priorities. Reserve that operating work before allocating improvement projects. A team cannot treat its full calendar as available for strategic initiatives. Equally, do not call every recurring activity a priority merely because it is important. Use the priority list for changes that need focused ownership, tradeoffs, and a visible end condition beyond keeping normal standards intact."
    },
    {
      type: "h2",
      text: "Identify the constraint rather than the most attractive project"
    },
    {
      type: "p",
      text: "Inspect what limits the chosen outcome. More demand may be unhelpful when onboarding is already failing; better onboarding may not help when qualified demand is absent. Name the evidence for the constraint and what would disprove it. Some priorities should be diagnostic when uncertainty is material. A short test of the bottleneck can be a better first commitment than a large solution designed around an untested assumption about why performance is poor."
    },
    {
      type: "h2",
      text: "Write a finish condition someone can inspect"
    },
    {
      type: "p",
      text: "Turn broad themes into an outcome or a deliverable with a clear acceptance standard. Improve onboarding is ambiguous; a defined onboarding path tested with a specified customer cohort is easier to inspect. Do not confuse completing a document with improving the operating result. Where the result may lag, specify both the delivered change and the signal you will monitor afterward. State dependencies and constraints so the owner is not judged against a promise the plan never made feasible."
    },
    {
      type: "h2",
      text: "Price the capacity and remove conflicting work"
    },
    {
      type: "p",
      text: "Estimate the critical roles and time each initiative needs. Compare that demand with practical availability after existing operations and commitments. Resolve clashes before announcing the plan. A declaration that everything is urgent does not create capacity. Name projects that will stop, pause, or receive a lower service level, and communicate those choices to affected stakeholders. A priority becomes credible when the business accepts the opportunity cost rather than quietly expecting people to fit it around everything else."
    },
    {
      type: "h2",
      text: "Give each priority one accountable owner"
    },
    {
      type: "p",
      text: "The owner should coordinate dependencies, maintain the evidence, and bring unresolved decisions to the right forum. They need authority or a clear route to obtain it. Cross-functional work can involve many contributors without making the responsibility collective and therefore unowned. Agree how the owner will report progress: what changed, what is blocked, what decision is needed, and whether the finish condition is still realistic. A polished status color is not a substitute for that operating explanation."
    },
    {
      type: "h2",
      text: "Review evidence weekly and change deliberately"
    },
    {
      type: "p",
      text: "Use the weekly operating review to inspect progress and dependencies without reopening the whole strategy each time. If a major assumption changes, decide explicitly whether to continue, revise, or stop. Keep the original commitment visible so a revised target does not erase learning. Avoid abandoning an important priority merely because an easier project produces faster visible activity. Also avoid defending a quarter-old choice when current evidence shows the intended outcome no longer deserves the same resources."
    },
    {
      type: "h2",
      text: "Close the quarter with a decision review"
    },
    {
      type: "p",
      text: "Compare what was promised, what was delivered, and what changed in the business. Separate execution misses from a weak theory about what would help. A completed initiative with no useful effect may reveal a strategy error; an unfinished one may reveal capacity or decision-rights problems. Record the learning and choose what carries forward. Do not automatically copy every unfinished item into the next quarter, because that can preserve obsolete work and leave no room for the next real constraint."
    },
    {
      type: "panel",
      items: [
        "Outcome: what must improve or remain true this quarter?",
        "Constraint: what currently prevents that result?",
        "Commitment: owner, finish condition, capacity, and work that stops."
      ]
    },
    {
      type: "h2",
      text: "Try the decision"
    },
    {
      type: "p",
      text: "This fictional scenario makes the tradeoff concrete. Treat the details as a practice case and select the action that changes the relevant constraint."
    },
    {
      type: "scenario"
    }
  ]
};

export default guide;

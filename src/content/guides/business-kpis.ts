import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-choose-business-kpis",
  skill: "operations",
  title: "How to Choose Business KPIs That Lead to Decisions",
  description: "Choose business KPIs by starting with decisions, not dashboards. Define outcomes, leading signals, owners, and review rules that reveal the real constraint.",
  answer: "Choose a KPI only when a change in it would lead to a different action. Start with the outcome the business must protect, add a signal that gives you time to respond, and pair it with a guardrail that prevents the team from improving the number by damaging the business.",
  scenario: {
    industry: "Illustrative installation company",
    scenario: "Suppose installers are rewarded only for jobs completed. They finish more jobs, but return visits to fix mistakes increase and the schedule fills with unpaid rework. Management considers raising the completion target again.",
    prompt: "Which scorecard change best addresses the problem?",
    choices: [
      {
        id: "a",
        text: "Track completions alongside first-pass acceptance and rework"
      },
      {
        id: "b",
        text: "Hide rework from the weekly report"
      },
      {
        id: "c",
        text: "Reward the fastest installer regardless of quality"
      },
      {
        id: "d",
        text: "Replace all operating metrics with revenue"
      }
    ],
    correctChoiceId: "a",
    explanation: "Completions describe throughput but omit the cost of poor work. First-pass acceptance and rework provide a guardrail and help test whether faster output is improving useful delivery."
  },
  faqs: [
    {
      question: "How many KPIs should a small business track?",
      answer: "Keep the key scorecard small enough to review and act on consistently. There is no universal count. Include the outcomes, drivers, and guardrails needed for current decisions; keep diagnostic detail elsewhere. If nobody can explain what action a metric triggers, reconsider whether it belongs."
    },
    {
      question: "What makes a KPI different from a metric?",
      answer: "A metric measures something. A KPI is selected because it indicates whether an important outcome is on course and has an agreed response when it is not. The same measure can be a KPI in one team and background information in another."
    },
    {
      question: "Should every KPI have a target?",
      answer: "An actionable target or review threshold helps once the definition and baseline are credible. Early in measurement, the right task may be establishing that baseline. Label a provisional target honestly and revise it with evidence instead of treating an unsupported number as a promise."
    }
  ],
  related: [
    "how-to-run-a-weekly-operating-review",
    "how-to-find-the-bottleneck",
    "how-to-set-quarterly-business-priorities"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Write the decision before choosing the number"
    },
    {
      type: "p",
      text: "Ask what you will do if the measure gets worse. Move staffing? Change the offer? Reduce work in progress? If the answer is only discuss it, the measure may be interesting reporting rather than a key performance indicator. Different stages of the same business need different scorecards. A team trying to fill unused capacity needs a different signal from one already missing delivery promises. Choose around the present constraint instead of copying a dashboard from a larger company."
    },
    {
      type: "h2",
      text: "Connect the outcome to its operating driver"
    },
    {
      type: "p",
      text: "Revenue, cash, and customer retention tell you whether an outcome was achieved. They may arrive too late to diagnose the work that created it. Add a driver close enough to the process that someone can influence it: qualified proposals awaiting follow-up, work waiting for approval, or invoices missing purchase-order details. Explain the causal link in plain language. A leading indicator is a hypothesis about what moves the outcome, not a guarantee that two numbers will keep moving together."
    },
    {
      type: "h2",
      text: "Write a definition two people can reproduce"
    },
    {
      type: "p",
      text: "Document what counts, what does not, the time window, the source, and the owner of the calculation. Does an on-time delivery mean shipped or accepted by the customer? Does a qualified lead require a budget, a use case, or simply an email address? Without a definition, teams can improve a metric by changing how it is counted. Keep a short history of definition changes so a break in the series is not mistaken for an operational improvement."
    },
    {
      type: "h2",
      text: "Choose a comparison that fits the business"
    },
    {
      type: "p",
      text: "Compare actual performance with an explicit plan and a relevant prior period. A weekly total can mislead when working days, project mix, or a single large customer change. Show the count behind a percentage so a small sample does not look precise. If you lack a reliable baseline, gather one before promising a target. The goal is to notice an exception worth acting on, not to create a chart that is always green."
    },
    {
      type: "h2",
      text: "Pair every powerful target with a guardrail"
    },
    {
      type: "p",
      text: "A booking target can encourage discounts or promises delivery cannot keep. A speed target can encourage rework. A collections target can damage customer relationships if people chase invoices that were never correct. Pair the outcome with a measure of the likely side effect. For example, track delivery timeliness beside first-pass quality. Explain what the guardrail protects, and who can stop the process when it is breached. A balanced scorecard should make gaming harder, not more elaborate."
    },
    {
      type: "h2",
      text: "Give an owner control over the response"
    },
    {
      type: "p",
      text: "A metric owner does not have to personally do every task that affects the result. They do need authority to investigate a miss and bring a decision to the right forum. When sales owns a booking number but operations owns every promise behind it, a joint review rule is needed. Do not assign ownership to a whole department. Name the person responsible for explaining an exception, proposing a response, and checking whether that response worked."
    },
    {
      type: "h2",
      text: "Pilot the scorecard before automating it"
    },
    {
      type: "p",
      text: "Run the proposed scorecard manually for a few review cycles. Note which measures led to a useful decision and which consumed time without changing anything. Inspect disagreements about definitions while the cost of changing them is low. Automation should preserve a useful management routine; it should not give a weak metric the authority of a polished dashboard. If a measure never changes a decision, remove it from the key scorecard while retaining it in supporting analysis if needed."
    },
    {
      type: "h2",
      text: "Know when a KPI has outlived its purpose"
    },
    {
      type: "p",
      text: "A temporary recovery metric can become clutter after the problem is solved. Review the scorecard when the business model, constraint, or decision rights change. Retire a measure deliberately rather than quietly stopping collection. Record why the replacement is better and how you will compare performance across the change. Keeping every historical KPI creates a reporting job that can crowd out the operational work the numbers were supposed to improve."
    },
    {
      type: "panel",
      items: [
        "Outcome: what promise or result must hold?",
        "Driver: what observable work might move that outcome?",
        "Guardrail: what must not deteriorate while the team improves it?"
      ]
    },
    {
      type: "h2",
      text: "Try the decision"
    },
    {
      type: "p",
      text: "This fictional scenario is a practice decision, not a report of a real business. Choose the action that addresses the constraint before adding more activity."
    },
    {
      type: "scenario"
    }
  ]
};

export default guide;

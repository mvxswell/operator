import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-run-a-weekly-operating-review",
  skill: "operations",
  title: "How to Run a Weekly Operating Review",
  description: "Run a weekly operating review that turns missed targets into decisions. Choose a small scorecard, diagnose exceptions, and leave with owners and due dates.",
  answer: "Run the weekly operating review around exceptions, decisions, and commitments. Read routine updates beforehand. In the meeting, explain the gap between plan and actual, choose the next action, name its owner, and revisit last week's promises before adding new ones.",
  scenario: {
    industry: "Illustrative fulfillment business",
    scenario: "Suppose weekly orders are on target, but late deliveries have increased. Completed orders sit waiting for final inspection. Packing has spare capacity. Last week's action to map the inspection queue is still unfinished, and the team proposes buying another packing station.",
    prompt: "What should the operating review decide first?",
    choices: [
      {
        id: "a",
        text: "Approve another packing station"
      },
      {
        id: "b",
        text: "Ask each department for a longer update"
      },
      {
        id: "c",
        text: "Assign the overdue inspection analysis and a dated recommendation"
      },
      {
        id: "d",
        text: "Raise the delivery target"
      }
    ],
    correctChoiceId: "c",
    explanation: "The visible queue is at inspection, and the promised diagnostic work is not done. Name an owner and deadline for evidence about that constraint before funding capacity at a step with slack."
  },
  faqs: [
    {
      question: "Who should attend a weekly operating review?",
      answer: "Include people who own the operating outcomes or can make the cross-functional decisions on the agenda. Ask specialists to join only the relevant section. Share the written scorecard and decision log with others so attendance does not become the only way to learn what changed."
    },
    {
      question: "What is the difference between an operating review and a status meeting?",
      answer: "A status meeting tells people what happened. An operating review uses that information to decide what changes next. Updates can be read beforehand; the live discussion should resolve an exception, allocate capacity, or make a commitment with a clear owner."
    },
    {
      question: "What if a metric stays red every week?",
      answer: "Check its definition, then review whether the previous action could plausibly change it. Repeating the same reminder is not an intervention. Test the suspected constraint, change the process, or revise a target that no longer reflects the operating plan. Record which choice you made."
    }
  ],
  related: [
    "how-to-choose-business-kpis",
    "how-to-fix-missed-deadlines",
    "how-to-create-sops"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Start with the decisions the meeting must make"
    },
    {
      type: "p",
      text: "An operating review is useful when it changes next week's allocation of attention or resources. It is not useful merely because each department spoke. Ask which decisions have been delayed: whether to accept another job, move someone to a backlog, stop an experiment, or warn a customer. Those decisions determine who needs to attend and which numbers belong on the page. An owner who cannot make or carry out any of the decisions can usually receive the notes instead of attending."
    },
    {
      type: "h2",
      text: "Build one page people can read before the call"
    },
    {
      type: "p",
      text: "Use a small scorecard with the metric, its definition, the target, the actual result, the prior period, and the accountable owner. Add the data cutoff so a partial week does not look like a complete one. A delivery business might include orders accepted, orders delivered on time, oldest open order, rework hours, and cash collected. These are examples, not a universal dashboard. Choose measures that reveal the promises your business is currently struggling to keep."
    },
    {
      type: "h2",
      text: "Separate a signal from a measurement problem"
    },
    {
      type: "p",
      text: "Before debating a red number, check that the comparison is real. Did the team change the definition? Did a batch arrive after the reporting cutoff? Is one unusually large job driving the total? Correct the data without using uncertainty as a reason to ignore a real miss. When a number is provisional, label it and assign someone to confirm it. Do not spend the meeting arguing about a spreadsheet nobody owns."
    },
    {
      type: "h2",
      text: "Review the previous commitments first"
    },
    {
      type: "p",
      text: "Begin with actions promised at the last review. Mark each done, blocked, or deliberately stopped. For a blocked action, identify the dependency and who can remove it. For a stopped action, record why it no longer deserves capacity. Carrying the same task forward without discussion teaches everyone that due dates are decoration. A smaller list of completed decisions is more valuable than a growing backlog of promises that never changes how work happens."
    },
    {
      type: "h2",
      text: "Discuss the exception, not the department"
    },
    {
      type: "p",
      text: "Give the owner of a missed target a compact structure: the gap, the evidence, the suspected cause, the proposed action, and the decision needed. Distinguish a reversible containment step from a larger investment. If the cause is unclear, approve a short diagnostic action with a specific output. Do not reward a confident story more than an honest uncertainty. The useful question is what evidence would make the next decision different, not who can defend the longest presentation."
    },
    {
      type: "h2",
      text: "Use a decision log that survives the meeting"
    },
    {
      type: "p",
      text: "For every approved action, write the decision, one owner, the due date, the expected effect, and when the result will be checked. Keep the original record visible when circumstances change. Otherwise, a team can forget why it chose a path and mistake hindsight for foresight. A simple shared document is sufficient. The discipline is that an absent colleague can read the record and know what changed, who must act, and what remains unresolved."
    },
    {
      type: "h2",
      text: "Keep problem solving in the right room"
    },
    {
      type: "p",
      text: "Some issues need a working session with the people closest to the process. The operating review should decide that the session is needed, who leads it, and when a recommendation comes back. It should not pull every attendee through an unplanned systems redesign. Equally, do not use a separate meeting to dodge an obvious decision you already have authority to make. Escalate the missing decision or constraint, rather than scheduling another conversation with no required output."
    },
    {
      type: "h2",
      text: "Check whether the review is improving execution"
    },
    {
      type: "p",
      text: "After several cycles, inspect the action log. Are the same misses returning without a different intervention? Are actions closing while the operating result stays poor? Either pattern suggests that the review is managing activity rather than the constraint. Change the scorecard or the decision being requested. If results recover, remove obsolete measures and agenda items. The review should stay small enough that the team can see the few issues that actually require a cross-functional call."
    },
    {
      type: "panel",
      items: [
        "Before: publish the scorecard and proposed decisions.",
        "During: check commitments, diagnose exceptions, choose actions.",
        "After: send the decision log and update owners before the next review."
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

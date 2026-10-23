import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-fix-missed-deadlines",
  skill: "operations",
  title: "How to Fix Missed Deadlines Without Adding More Chasing",
  description: "Fix missed deadlines by separating bad estimates, overloaded queues, and blocked decisions. Reset promises with evidence, then change how work gets released.",
  answer: "Find where the promise breaks before asking people to work harder. Separate unreliable estimates, too much concurrent work, waiting for a dependency, and preventable rework. Then change the queue or decision rule that creates the delay, while giving affected customers a credible revised commitment.",
  scenario: {
    industry: "Illustrative design studio",
    scenario: "Suppose designers complete assigned work within their estimates. Projects still miss deadlines because every concept waits for the founder's approval. The founder checks requests irregularly, and clients receive dates that assume immediate approval.",
    prompt: "What is the best first process change?",
    choices: [
      {
        id: "a",
        text: "Ask designers to shorten all estimates"
      },
      {
        id: "b",
        text: "Hire a designer before measuring approval work"
      },
      {
        id: "c",
        text: "Stop recording original promised dates"
      },
      {
        id: "d",
        text: "Define approval ownership, turnaround, and delegated decisions"
      }
    ],
    correctChoiceId: "d",
    explanation: "Execution is within estimate; the queue is at approval. A predictable decision path and explicit delegated limits address that wait. Faster design estimates would conceal rather than remove it."
  },
  faqs: [
    {
      question: "Should you add a buffer to every deadline?",
      answer: "Use a realistic allowance for known variation, but first identify what makes dates unreliable. A buffer cannot repair uncontrolled work intake or an owner who never reviews approvals. Show the assumption behind the promise and update it when the operating evidence changes."
    },
    {
      question: "How do you hold people accountable for late work?",
      answer: "Agree on scope, dependencies, authority, and an observable finish standard first. Then ask for early escalation when the commitment is at risk. Hold people accountable for decisions and communication they control while addressing queues or contradictory priorities that management creates."
    },
    {
      question: "Which delivery metric should you review first?",
      answer: "Look at original promise reliability alongside the age of unfinished work. Either alone can mislead. Segment the results when different job types have different workflows, and examine the waiting stage that explains the miss before changing targets for the whole team."
    }
  ],
  related: [
    "how-to-run-a-weekly-operating-review",
    "how-to-plan-capacity-before-taking-on-more-work",
    "how-to-create-sops"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Stabilize the customer promise first"
    },
    {
      type: "p",
      text: "List the late or at-risk commitments with the customer impact, remaining work, blocker, and next honest update. Contact the people affected before the date silently passes. Do not replace one unsupported promise with another to reduce the discomfort of the conversation. If you cannot yet give a delivery date, commit to a specific update time and the evidence you will have by then. Recovery begins with reliable communication, even before the entire production problem is solved."
    },
    {
      type: "h2",
      text: "Reconstruct a few recent jobs end to end"
    },
    {
      type: "p",
      text: "Use actual timestamps for acceptance, preparation, execution, review, and handoff. Split active work from waiting. A job that takes three days of effort can still spend weeks in queues. Ask where it first departed from the plan, not merely who touched it last. Choose both late and on-time jobs so you can see what differs. People often blame the final department for delay inherited from an earlier decision that nobody measured."
    },
    {
      type: "h2",
      text: "Separate estimation error from overload"
    },
    {
      type: "p",
      text: "If similar tasks consistently take longer than estimated even when started promptly, investigate scope and estimation. If the estimates are reasonable but work starts late, the queue is the problem. Treating overload as an estimation issue only adds padding while the backlog keeps growing. Treating estimation error as a staffing issue can add people to poorly defined work. Choose an intervention that fits the evidence rather than adopting the remedy that happens to be easiest to approve."
    },
    {
      type: "h2",
      text: "Make the release rule visible"
    },
    {
      type: "p",
      text: "A team cannot finish everything first. Define which commitments receive capacity and who can authorize an exception. Limit how much work can enter execution before earlier items finish. Keep urgent requests visible instead of slipping them into private messages. When a leader inserts a rush job, show which existing promise moves. This turns prioritization into an explicit tradeoff rather than a contest between the loudest requesters, and gives sales a realistic basis for the next promised date."
    },
    {
      type: "h2",
      text: "Remove waiting that requires a decision"
    },
    {
      type: "p",
      text: "Some work is not difficult; it is waiting for an approval, missing information, or a choice between conflicting instructions. Put a named decision owner and response time on these handoffs. Give teams authority to make routine choices inside agreed limits. Escalate exceptions with the alternatives and consequence of delay. A reminder sent repeatedly to a general inbox is not a managed dependency. The workflow needs a person who can resolve the block or change the commitment."
    },
    {
      type: "h2",
      text: "Protect the finish from rework"
    },
    {
      type: "p",
      text: "Review the jobs that returned from quality checks or customers. Was the acceptance standard missing, the input incomplete, or a known defect passed downstream? Move a useful check earlier if it prevents expensive reopening later. Do not add approval layers indiscriminately; each check should catch a specific costly error. An apparent speed improvement that creates more rework will often consume the very capacity needed to recover the late queue."
    },
    {
      type: "h2",
      text: "Replan with remaining work, not sunk effort"
    },
    {
      type: "p",
      text: "For each active item, estimate the work still required and the dependencies still unresolved. The fact that a project is described as nearly done does not establish a finish date. Put a small, observable acceptance milestone in the plan. If a job no longer makes sense, decide whether to reduce scope, renegotiate, or stop it rather than keeping it active to avoid acknowledging the loss. Count capacity released, not just tasks that remain on a spreadsheet."
    },
    {
      type: "h2",
      text: "Check whether the new rule changed delivery"
    },
    {
      type: "p",
      text: "Track the age of open work, the reliability of promises, and rework after the intervention. A falling late-job count can hide a growing queue if the team simply stops setting dates. Keep the original commitments visible alongside revised ones. In the next operating review, ask whether fewer jobs are becoming late, not only whether yesterday's emergencies were closed. If the same failure recurs, change the release, scope, or decision rule instead of adding another reminder."
    },
    {
      type: "panel",
      items: [
        "Late start: inspect queues and release limits.",
        "Slow execution: inspect scope, estimates, and available skills.",
        "Late restart: inspect acceptance standards and rework."
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

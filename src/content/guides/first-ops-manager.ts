import type { Guide } from "./types";

const guide: Guide = {
  slug: "when-to-hire-your-first-operations-manager",
  skill: "people",
  title: "When to Hire Your First Operations Manager",
  description: "Decide when to hire your first operations manager. Separate a management gap from broken processes, define decision rights, and test whether the role can pay.",
  answer: "Hire an operations manager when recurring coordination and decisions have become a real constraint, the business can fund the role, and you are ready to transfer authority. Do not hire someone to absorb an undefined collection of tasks while every meaningful decision still returns to you.",
  scenario: {
    industry: "Illustrative multi-team service company",
    scenario: "Suppose the founder approves every staffing swap and customer recovery plan. Team leads have good information, but wait for permission. The founder wants an operations manager while also insisting that every routine decision still receive personal approval.",
    prompt: "What must change before the role can remove the bottleneck?",
    choices: [
      {
        id: "a",
        text: "Create explicit decision rights the manager can exercise"
      },
      {
        id: "b",
        text: "Add a second approval meeting for every request"
      },
      {
        id: "c",
        text: "Hire only for presentation skills"
      },
      {
        id: "d",
        text: "Rename the role chief of staff without changing authority"
      }
    ],
    correctChoiceId: "a",
    explanation: "The constraint is partly the approval design. A new manager can coordinate effectively only when routine decisions move with the role. Another title or meeting leaves the founder in the same queue."
  },
  faqs: [
    {
      question: "What should a first operations manager own?",
      answer: "Choose recurring operating outcomes and the decisions needed to deliver them. Scheduling, handoffs, quality follow-up, and operating reviews are possible responsibilities. The right scope depends on your constraint; ownership must include authority and access to data, not just responsibility for reporting."
    },
    {
      question: "Can a small business use a part-time operations manager?",
      answer: "It can when the required decisions and coordination fit a bounded schedule and the team has a clear route for urgent exceptions. Check availability, handoff quality, and authority. Part-time help will not solve a daily decision bottleneck if every exception must wait for their next visit."
    },
    {
      question: "How do you know the founder is ready to delegate operations?",
      answer: "You can name decisions that another person will make without advance permission, accept a different workable approach, and review outcomes against agreed standards. If you continue approving everything or issuing conflicting instructions directly to the team, repair that behavior before blaming the hire."
    }
  ],
  related: [
    "how-to-onboard-a-new-manager",
    "how-to-write-a-hiring-scorecard",
    "how-to-stop-every-decision-coming-to-the-ceo"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Prove that the constraint is management work"
    },
    {
      type: "p",
      text: "Keep a short log of the operating decisions and coordination tasks that interrupt the founder. Separate scheduling, staffing, handoffs, quality follow-up, and exception handling from specialist delivery and sales. A backlog of technical work may need a practitioner, not a manager. An unclear process may need definition before supervision. The useful evidence is repeated decisions across people and workflows that currently depend on you, with a visible cost when you cannot make them promptly."
    },
    {
      type: "h2",
      text: "Describe the outcomes the role will own"
    },
    {
      type: "p",
      text: "Write the few operating outcomes that must improve: promise reliability, backlog age, first-pass quality, or a predictable planning cadence. Connect each to work the manager can influence. Do not ask the new person to improve everything at once. A role defined as keeping the founder happy has no independent standard of success. Give the business and the candidate a clear way to judge whether the job is working without relying on the founder's changing mood."
    },
    {
      type: "h2",
      text: "Decide what authority leaves your desk"
    },
    {
      type: "p",
      text: "List decisions the manager can make alone, decisions that require consultation, and exceptional commitments that remain with you. Include hiring within an agreed plan, reallocating work, customer recovery, and spending limits where relevant. A title without decision rights creates another forwarding address. If you intend to reverse routine decisions whenever you dislike the style, you are not ready to delegate the role. Resolve that before paying someone to discover that their authority is only nominal."
    },
    {
      type: "h2",
      text: "Price the role and the capacity it could release"
    },
    {
      type: "p",
      text: "Estimate the fully loaded compensation, recruiting effort, tools, and your onboarding time using your own costs. Compare that with the operating loss the role could realistically reduce and the founder capacity it could release. Released time has value only if it is used on a defined activity or a deliberate personal priority. Do not count an imagined revenue increase as certain payback. Build a cautious case that still makes sense during the ramp period."
    },
    {
      type: "h2",
      text: "Compare a manager with narrower help"
    },
    {
      type: "p",
      text: "You may need a coordinator to run a schedule, a team lead to supervise a workflow, or an experienced part-time operator to install a management routine. Those roles have different authority and economics. Do not buy a senior generalist when the missing work is routine administration. Equally, do not expect a coordinator to resolve strategic tradeoffs between departments. Match the level of the role to the decisions you need made, then write that scope into the hiring brief."
    },
    {
      type: "h2",
      text: "Test the handoff before recruiting"
    },
    {
      type: "p",
      text: "Try transferring a bounded operating responsibility to a capable internal person for a defined period, with appropriate support and acknowledgement of the added work. Observe which decisions still return to you and why. Missing information, contradictory goals, or an unwilling founder can defeat an external hire too. The trial is not a substitute for paying for expanded responsibility. It is evidence about the design of the job and the operating system into which a new manager would arrive."
    },
    {
      type: "h2",
      text: "Hire against operating evidence, not confidence"
    },
    {
      type: "p",
      text: "Ask candidates to work through a realistic queue, staffing conflict, or missed-delivery problem using information you can safely share. Look for how they establish facts, prioritize constraints, and communicate tradeoffs. A polished answer about leadership is weaker evidence than a sensible decision process. Use the same role-relevant exercise and evaluation criteria for each candidate. Check references against the scope you actually need, including whether they have built routines rather than only inherited a mature organization."
    },
    {
      type: "h2",
      text: "Make the first handoff small enough to inspect"
    },
    {
      type: "p",
      text: "Give the manager a defined initial area, access to the relevant data, introductions to decision owners, and a regular review with you. Start with a baseline and a few observable milestones. Expect a learning period, but make unresolved decision rights visible quickly. When a team member bypasses the manager, route routine matters back through the agreed path. Otherwise, the founder can quietly undo the transfer and conclude that the hire failed to take ownership."
    },
    {
      type: "panel",
      items: [
        "Hire for recurring operating decisions, not a vague sense of busyness.",
        "Fund the loaded role and its ramp before assuming payback.",
        "Transfer decision rights and stop rebuilding the founder bottleneck."
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

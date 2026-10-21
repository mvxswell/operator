import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-plan-capacity-before-taking-on-more-work",
  skill: "resource",
  title: "How to Plan Capacity Before Taking On More Work",
  description: "Check capacity before accepting more work. Estimate the constrained step, account for rework and existing promises, and compare hiring, pricing, and timing.",
  answer: "Accept more work only after checking the step that limits delivery. Convert committed jobs into the capacity that step actually uses, reserve time for existing obligations and variability, and compare the contribution of the new work with the promises it might displace.",
  scenario: {
    industry: "Illustrative implementation team",
    scenario: "Suppose a team has 40 senior-review hours available this week. Existing launches need 34. A new client wants a launch requiring 12 review hours in the same window. Junior preparation time is plentiful, but nobody else can approve the work.",
    prompt: "What should happen before accepting the promised date?",
    choices: [
      {
        id: "a",
        text: "Count junior preparation hours as senior review capacity"
      },
      {
        id: "b",
        text: "Negotiate timing or scope, or confirm qualified review capacity"
      },
      {
        id: "c",
        text: "Accept because the contract is the largest in the pipeline"
      },
      {
        id: "d",
        text: "Ask all teams to improve utilization equally"
      }
    ],
    correctChoiceId: "b",
    explanation: "The new promise exceeds remaining senior-review capacity. More junior activity cannot clear that step. Change the commitment or obtain verified capacity before selling the date."
  },
  faqs: [
    {
      question: "Is a full calendar a sign you should hire?",
      answer: "It is a signal to inspect demand and the constraint. Confirm whether the workload is recurring, profitable, and limited by a role a new hire can fill. A temporary spike, avoidable rework, or approval queue may call for a different response."
    },
    {
      question: "How far ahead should a small team plan capacity?",
      answer: "Plan far enough to cover commitments that are costly to change and the lead time for adding capacity. Use more detail near delivery and ranges further out. Revisit the horizon when customer commitments or hiring lead times change rather than relying on a fixed universal window."
    },
    {
      question: "Should you accept an urgent job at a premium?",
      answer: "Only after calculating the scarce capacity it uses and the consequences for existing customers. A premium can be attractive when the job fits unused capacity. It can be poor economics when it triggers missed promises, rework, or long-term customer loss."
    }
  ],
  related: [
    "how-to-fix-missed-deadlines",
    "how-to-find-the-bottleneck",
    "how-to-decide-between-hiring-and-outsourcing"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Choose the unit that consumes the constraint"
    },
    {
      type: "p",
      text: "Revenue is not a capacity unit. Two projects with the same price may need very different amounts of a scarce specialist's time. Identify the limiting resource: machine hours, estimator appointments, senior review, installation crews, or onboarding slots. Express both demand and available capacity in that unit. Keep a separate view of other requirements so you do not move the constraint to an unprepared step. Start with the resource that currently determines how much useful work can finish."
    },
    {
      type: "h2",
      text: "Count practical availability rather than paid hours"
    },
    {
      type: "p",
      text: "A paid week includes meetings, maintenance, training, leave, and necessary coordination. Subtract those commitments before promising production time. Include recurring support work for existing customers even when it does not appear in the sales pipeline. Use observed availability when you have it. An optimistic calendar that assumes every paid hour becomes output can make a profitable order impossible to deliver. Record the exclusions so a future reviewer can challenge the assumptions rather than argue about the total."
    },
    {
      type: "h2",
      text: "Translate the backlog into remaining effort"
    },
    {
      type: "p",
      text: "Count the work still required, not the original project estimate or the percentage someone says is complete. Separate firm commitments from likely new demand and speculative opportunities. For each firm job, show the constrained hours, promised window, dependencies, and consequence of moving it. Where estimates are uncertain, use a range and identify what would narrow it. Uncertainty should be visible in the decision rather than buried in an average that looks more reliable than it is."
    },
    {
      type: "h2",
      text: "Leave room for variation you actually observe"
    },
    {
      type: "p",
      text: "Unexpected rework, absence, and urgent support can consume the last available slot. Use your own recent operating history to decide what capacity should remain uncommitted. There is no universal utilization target that fits every workflow. A process with variable arrivals or specialist dependencies needs different protection from a repetitive line with reliable inputs. If you use overtime as the plan, state how long it can last and what quality or retention signal would make you stop."
    },
    {
      type: "h2",
      text: "Compare new work on contribution and fit"
    },
    {
      type: "p",
      text: "A full calendar does not automatically mean the next order is valuable. Compare price less the costs created by accepting the work, along with the scarce hours it consumes. Include switching effort, rush purchasing, and likely rework where relevant. A smaller job may fit an otherwise unusable slot; a large order may monopolize the constraint. Avoid ranking only by total contract value. The decision is about the value of the limited capacity and the risks attached to the promise."
    },
    {
      type: "h2",
      text: "Choose among timing, scope, price, and supply"
    },
    {
      type: "p",
      text: "When demand exceeds practical capacity, hiring is only one option. Offer a later start, reduce scope, increase price for scarce delivery windows, use qualified external help, or decline the work. Compare each option with the cost of missing an existing commitment. External help still needs coordination and acceptance checks. A new hire still needs ramp time. Do not count either as immediate capacity unless you know what they can do without consuming more of the constrained person's attention."
    },
    {
      type: "h2",
      text: "Make the tradeoff concrete with a worked example"
    },
    {
      type: "p",
      text: "Consider an illustrative service team with 80 specialist hours available next week after recurring obligations. Existing customer promises need 65 hours. A proposed rush job needs 25. Accepting it as-is creates a 10-hour shortfall before any disruption. A better decision might be a later date or a smaller first phase. Those figures are hypothetical; the useful calculation is the same with your own hours. Identify the displaced work before agreeing to the rush premium."
    },
    {
      type: "h2",
      text: "Reconcile the plan with what happened"
    },
    {
      type: "p",
      text: "At the operating review, compare planned constrained hours with actual effort, waiting, and rework. Update the estimating assumptions that were wrong. If the constraint shifts, change the planning unit rather than continuing to optimize a resource that now has slack. Track both promise reliability and the economic result of accepted work. Capacity planning has succeeded when the business can choose commitments it can profitably keep, not when every cell in a calendar is occupied."
    },
    {
      type: "panel",
      items: [
        "Available capacity: practical hours at the constrained step.",
        "Committed demand: remaining work behind promises already made.",
        "Decision: accept, reschedule, re-scope, source capacity, or decline."
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


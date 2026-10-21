import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-resolve-conflict-between-sales-and-operations",
  skill: "operations",
  title: "How to Resolve Conflict Between Sales and Operations",
  description: "Resolve sales and operations conflict by tracing promises, capacity, and handoffs. Set an acceptance rule and make exceptions visible before a deal is sold.",
  answer: "Treat recurring sales-versus-operations conflict as a problem in promises, capacity, incentives, or handoffs before treating it as a personality issue. Trace a few disputed jobs, define what can be sold under normal conditions, and create one visible process for exceptions that affect delivery or economics.",
  scenario: {
    industry: "Illustrative installation business",
    scenario: "Suppose sales promises next-week installations to close deals. Operations has no spare specialist hours and learns about the dates only after contracts are signed. Both departments are meeting their own targets: bookings and planned utilization.",
    prompt: "Which change best addresses the recurring conflict?",
    choices: [
      {
        id: "a",
        text: "Ask operations to accept every sold date without review"
      },
      {
        id: "b",
        text: "Tell sales to stop pursuing new work altogether"
      },
      {
        id: "c",
        text: "Hold a morale meeting without changing the handoff"
      },
      {
        id: "d",
        text: "Require capacity confirmation or an approved exception before promising dates"
      }
    ],
    correctChoiceId: "d",
    explanation: "The mismatch occurs before the sale commits delivery. A shared capacity view and explicit exception authority move the decision to the point where the business can still choose the promise."
  },
  faqs: [
    {
      question: "Who should own delivery dates promised to customers?",
      answer: "Use an agreed rule that connects the commercial owner to the person who controls capacity. Standard dates can follow a published capacity policy; exceptions need a named approver. The customer should receive one coherent promise, even when several internal teams contribute to it."
    },
    {
      question: "Should sales and operations share KPIs?",
      answer: "Use shared outcomes or guardrails when separate targets encourage conflicting behavior. Choose measures tied to the actual problem, such as accepted work and promise reliability. Shared numbers help only when the team also has a decision process for the tradeoffs those numbers reveal."
    },
    {
      question: "What if sales says an exception is necessary to win?",
      answer: "Ask for the customer requirement, incremental value, delivery cost, and displaced work. A valuable exception may be worth making. Approve it deliberately with the relevant capacity owner, rather than assuming a signed contract makes an unsupported promise operationally possible."
    }
  ],
  related: [
    "how-to-plan-capacity-before-taking-on-more-work",
    "how-to-choose-business-kpis",
    "how-to-run-a-weekly-operating-review"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Start with specific broken promises"
    },
    {
      type: "p",
      text: "Choose a few recent jobs where sales and delivery disagreed. Record what the customer was promised, what operations believed was agreed, what information was available, and when the gap became visible. Avoid opening with broad claims that sales overpromises or operations resists growth. A concrete timeline makes it possible to distinguish missing information from a deliberate exception. Include successful handoffs too, so the team can identify conditions that make the relationship work rather than only collecting evidence against each other."
    },
    {
      type: "h2",
      text: "Identify whether the disagreement is about demand or capacity"
    },
    {
      type: "p",
      text: "Sales may be asked to fill a pipeline while operations is asked to protect service quality. Those goals can conflict when there is no shared capacity view. Show the constrained resource, current commitments, available delivery windows, and assumptions about new work. If demand is weak, delivery slack matters. If the queue is already full, another rush sale has a different consequence. A shared operating fact is a better starting point than deciding which department should be more cooperative."
    },
    {
      type: "h2",
      text: "Define the normal offer and handoff standard"
    },
    {
      type: "p",
      text: "Write the scope, lead time, required customer inputs, acceptance criteria, and conditions included in the standard offer. Agree what information sales must confirm before a job enters the delivery queue. Keep the requirement small enough to use consistently. An exhaustive handoff form that people avoid is not a reliable control. Operations should explain why each input matters, and sales should help identify where obtaining it would unnecessarily delay a normal purchase."
    },
    {
      type: "h2",
      text: "Make exceptions a commercial decision"
    },
    {
      type: "p",
      text: "A nonstandard promise should show the extra work, displaced commitment, cost, and proposed price or scope change. Name who can approve it and how quickly a decision is needed. Sales should not privately promise capacity it does not control; operations should not quietly veto a commercially attractive exception without explaining the tradeoff. A visible exception process lets the business choose a deliberate departure from the standard offer without turning every unusual request into a departmental dispute."
    },
    {
      type: "h2",
      text: "Align measures around useful delivered value"
    },
    {
      type: "p",
      text: "Booked revenue alone can reward promises the business cannot keep. Utilization alone can reward a schedule that leaves no room for necessary variation. Review a small shared view of accepted work, delivery reliability, quality, contribution, and cash timing where relevant. Do not add dozens of targets and expect balance to emerge automatically. Choose guardrails for the specific behavior causing conflict, and give owners a forum to discuss a tradeoff before a customer becomes its unwilling referee."
    },
    {
      type: "h2",
      text: "Close the loop after a difficult delivery"
    },
    {
      type: "p",
      text: "Review whether the miss came from an inaccurate promise, incomplete inputs, estimating error, capacity change, or rework. Decide which rule changes. Do not turn every review into a demand for both teams to communicate better. Name the information, owner, and point in the workflow where the next miss can be prevented. When the team intentionally accepted a risky exception, preserve that decision in the record rather than later treating the predictable cost as a surprise caused by another department."
    },
    {
      type: "h2",
      text: "Use the operating review to resolve recurring tradeoffs"
    },
    {
      type: "p",
      text: "Bring patterns and decision requests to the weekly review: repeated rush promises, incomplete handoffs, or a backlog concentrated at one step. Reserve separate working sessions for detailed process repair. The review should settle capacity allocation and exception authority, not require a fresh argument about every job. Include the people who can change the relevant commitments. A forum with no decision-maker can make both departments feel heard while leaving the customer promise unchanged."
    },
    {
      type: "h2",
      text: "Escalate conduct separately from process design"
    },
    {
      type: "p",
      text: "A clearer workflow will not excuse deliberate misrepresentation, disrespect, or repeated refusal to follow agreed rules. Address those behaviors with specific evidence through the appropriate management process. At the same time, do not use a conduct discussion to avoid repairing contradictory goals. Both can be necessary. Review the new process after several work cycles: fewer private exceptions, earlier escalation, and more reliable delivery are stronger evidence of progress than a temporary reduction in arguments."
    },
    {
      type: "panel",
      items: [
        "Trace: promise, information, capacity, and actual handoff.",
        "Standardize: the normal offer and required inputs.",
        "Decide: one owner and visible economics for each exception."
      ]
    },
    {
      type: "h2",
      text: "Try the decision"
    },
    {
      type: "p",
      text: "The following fictional case is a practice scenario. Use the facts provided to identify the action that addresses the decision problem rather than its symptoms."
    },
    {
      type: "scenario"
    }
  ]
};

export default guide;

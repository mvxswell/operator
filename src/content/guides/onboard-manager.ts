import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-onboard-a-new-manager",
  skill: "people",
  title: "How to Onboard a New Manager Without Keeping All the Decisions",
  description: "Onboard a manager with clear outcomes, decision rights, and staged ownership. Set a baseline, transfer context, and review the handoff without undermining it.",
  answer: "Onboard a manager by transferring context, then decisions, then accountability for a bounded operating outcome. Make the authority explicit to the team. Review evidence and exceptions with the manager rather than continuing to direct everyone around them.",
  scenario: {
    industry: "Illustrative field-service company",
    scenario: "Suppose a new service manager is told to own technician scheduling. The founder then privately changes assignments whenever technicians ask. Schedule reliability worsens, and the founder concludes that the manager is not taking charge.",
    prompt: "What should be corrected first?",
    choices: [
      {
        id: "a",
        text: "Add more scheduling targets while keeping both decision paths"
      },
      {
        id: "b",
        text: "Tell technicians to choose whichever instruction they prefer"
      },
      {
        id: "c",
        text: "Replace the manager before clarifying the role"
      },
      {
        id: "d",
        text: "Restore a single scheduling owner and a visible exception process"
      }
    ],
    correctChoiceId: "d",
    explanation: "Two conflicting authorities prevent the manager from owning the outcome. Clarify the decision path and route exceptions openly before judging performance against a responsibility the manager cannot control."
  },
  faqs: [
    {
      question: "Should a new manager change the team immediately?",
      answer: "Only when an urgent risk requires action or the diagnosis is already well supported. Begin with context and a bounded operating outcome. Requiring visible change for its own sake can reward disruption while overlooking a simpler process or decision-rights problem."
    },
    {
      question: "How much should the founder stay involved?",
      answer: "Stay involved in context, support, agreed exceptions, and outcome reviews. Reduce routine approvals as the handoff becomes credible. If you temporarily retain a decision, state why and when ownership can transfer; otherwise the new manager may remain a coordinator with no real authority."
    },
    {
      question: "How do you assess onboarding progress?",
      answer: "Look at decisions actually owned, the reliability of communication, the manager's understanding of constraints, and movement in the agreed operating outcome. Attendance at introductory meetings is not enough. Ask whether the team now knows where decisions belong and whether routine work still waits for the founder."
    }
  ],
  related: [
    "when-to-hire-your-first-operations-manager",
    "how-to-stop-every-decision-coming-to-the-ceo",
    "how-to-run-effective-one-on-one-meetings"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Give the manager the real operating picture"
    },
    {
      type: "p",
      text: "Share the current scorecard, customer promises, active risks, staffing constraints, and decisions already made. Explain where the written process differs from what people actually do. Include the uncomfortable facts that might otherwise take months to discover. A manager who inherits only the optimistic version of the business cannot make responsible tradeoffs. Give them access to the information required for the role while protecting data they do not need. Context is an operating input, not an orientation presentation."
    },
    {
      type: "h2",
      text: "Agree on a bounded first outcome"
    },
    {
      type: "p",
      text: "Choose an initial area the manager can observe and influence, such as schedule reliability or the handoff between sales and delivery. Record the baseline and what improvement would look like without promising an unsupported turnaround. A broad demand to fix the team encourages scattered activity. A bounded outcome gives the new manager a way to learn the system while delivering something useful. Keep urgent containment separate from the longer-term responsibility they will eventually own."
    },
    {
      type: "h2",
      text: "Publish the decision rights to everyone affected"
    },
    {
      type: "p",
      text: "Write which decisions move immediately, which require consultation during the transition, and which remain outside the role. Tell the team and adjacent leaders directly. If they learn authority only through trial and error, they will keep checking with the founder. Include escalation rules for customer risk, budget exceptions, and people issues where applicable. The document should explain how a decision is made when the manager and another leader disagree, rather than assuming goodwill will settle every conflict."
    },
    {
      type: "h2",
      text: "Let them observe the workflow before redesigning it"
    },
    {
      type: "p",
      text: "Arrange direct exposure to work, customers, and handoffs. Ask the manager to explain the current process back to the team and identify what they still do not understand. Avoid requiring a dramatic reorganization as proof of initiative. An early diagnosis may be right, but it needs operating evidence. Equally, observation should not become an indefinite excuse to avoid decisions. Agree which immediate risks require action and which proposed changes need a short period of investigation."
    },
    {
      type: "h2",
      text: "Transfer ownership through real decisions"
    },
    {
      type: "p",
      text: "Start with a defined category of routine decisions and review a sample afterward. Do not insist on advance approval for everything while claiming that authority has moved. When risk justifies a temporary check, state when it can be removed. A useful handoff shows the manager making a call, communicating it, handling the result, and learning from feedback. Watching the founder make decisions for another month does not establish whether the manager can actually own them."
    },
    {
      type: "h2",
      text: "Use regular reviews to support, not shadow-manage"
    },
    {
      type: "p",
      text: "Review the scorecard, recent decisions, blockers, and support needed. Ask for the manager's recommendation before offering your own solution. Keep the focus on the agreed outcome and the operating reasoning. Private instructions to individual team members can quietly undo the handoff even when the review sounds supportive. If an exception requires founder intervention, explain it to the manager and the team so it does not become a new informal path around the role."
    },
    {
      type: "h2",
      text: "Turn early mistakes into specific corrections"
    },
    {
      type: "p",
      text: "A new manager may misjudge a dependency or communicate poorly. Identify the decision, the information available, the impact, and the change required. Do not convert one error into a withdrawal of all authority without considering its cause. Some misses reveal missing context or contradictory instructions from existing leaders. Others reveal a capability gap. The response should distinguish training, process repair, and a genuine mismatch for the role, with evidence rather than a general label that the person lacks ownership."
    },
    {
      type: "h2",
      text: "Close the transition with an explicit review"
    },
    {
      type: "p",
      text: "At the agreed review point, compare the original outcome, the decisions actually transferred, and the support still required. Confirm permanent authority or identify a revised scope. Ask the team where they still bypass the manager and why. Preserve the baseline and the handoff notes so future hires can benefit from what you learned. Onboarding is complete when the operating responsibility functions without the founder as its routine approval queue, not merely when the calendar says the introduction period is over."
    },
    {
      type: "panel",
      items: [
        "Context first: promises, constraints, risks, and operating facts.",
        "Authority next: decisions, boundaries, and escalation paths.",
        "Accountability after: outcomes reviewed against a shared baseline."
      ]
    },
    {
      type: "h2",
      text: "Try the decision"
    },
    {
      type: "p",
      text: "Use this fictional example to test the decision framework. All amounts and business details are illustrative; choose the action supported by the information provided."
    },
    {
      type: "scenario"
    }
  ]
};

export default guide;


import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-stop-every-decision-coming-to-the-ceo",
  skill: "people",
  title: "How to Stop Every Decision Coming to the CEO",
  description: "Stop decisions returning to the CEO. Map the approval queue, assign decision rights, define escalation rules, and review outcomes without taking work back.",
  answer: "Remove the CEO approval queue by naming who decides, what limits apply, and when an exception must be escalated. Start with a repeated class of decisions, transfer the information and authority together, and stop rewarding people for bypassing the agreed owner.",
  scenario: {
    industry: "Illustrative project company",
    scenario: "Suppose team leads can approve routine supplier purchases within an agreed budget. The CEO still answers private requests from staff and reverses purchases without consulting the lead. More requests now go directly to the CEO.",
    prompt: "What is the best first correction?",
    choices: [
      {
        id: "a",
        text: "Route routine requests back to the owner and make exceptions visible"
      },
      {
        id: "b",
        text: "Add a new form but keep the private approval route"
      },
      {
        id: "c",
        text: "Remove all purchasing boundaries immediately"
      },
      {
        id: "d",
        text: "Tell leads to take ownership without changing CEO behavior"
      }
    ],
    correctChoiceId: "a",
    explanation: "The private route undermines the stated owner. Consistent routing and transparent exceptions make the delegated authority real while preserving a path for material risk."
  },
  faqs: [
    {
      question: "Which decisions should a CEO keep?",
      answer: "Keep choices that genuinely require the CEO's authority or cross-business judgment, based on the organization's governance and risk. Transfer routine decisions that can be bounded, informed, and reviewed. The exact boundary depends on the business; a title alone does not establish which choices require escalation."
    },
    {
      question: "What if people make mistakes after delegation?",
      answer: "Inspect the reasoning, available information, agreed boundary, and impact. Improve the rule or capability where needed. Taking back every decision after an ordinary mistake recreates the queue. Serious or repeated failures may require a different response, but base that response on evidence."
    },
    {
      question: "How do you prevent delegation from hiding bad news?",
      answer: "Define escalation triggers and require early notification of material exceptions. Review outcomes and a sample of decisions, not just a lower count of requests. People should know that raising a real risk is expected, while asking the CEO to approve every routine choice is not."
    }
  ],
  related: [
    "how-to-delegate",
    "when-to-hire-your-first-operations-manager",
    "how-to-run-a-weekly-operating-review"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Map the decisions that keep returning"
    },
    {
      type: "p",
      text: "For a short observation period, record the question, requester, urgency, time spent, and reason it reached the CEO. Group repeated decisions such as pricing exceptions, staffing swaps, customer recovery, and purchase approval. Separate genuinely strategic choices from routine work that lacks an owner or boundary. The list often reveals that the CEO is not making unique judgments so much as supplying missing context or resolving contradictions. That diagnosis suggests a different intervention from simply asking everyone to become more independent."
    },
    {
      type: "h2",
      text: "Ask why the team reasonably escalates"
    },
    {
      type: "p",
      text: "People may be seeking permission because past decisions were reversed, because two leaders disagree, or because nobody knows the financial limits. They may also lack the required capability. Do not treat escalation as a character flaw before inspecting the incentives. If taking a reasonable decision leads to criticism while waiting for approval is safe, the organization has taught the behavior it now dislikes. Fix the rule and response as well as the assignment of responsibility."
    },
    {
      type: "h2",
      text: "Choose one category to transfer first"
    },
    {
      type: "p",
      text: "Pick a recurring decision that can be bounded and reviewed without unacceptable risk. Define the outcome, decision owner, relevant inputs, and limits. Customer recovery within an agreed allowance may be a better first transfer than a major strategic commitment. Avoid delegating only trivial work while claiming the CEO bottleneck is solved. The category should remove a meaningful queue and give the new owner a legitimate opportunity to exercise judgment."
    },
    {
      type: "h2",
      text: "Specify decisions, consultation, and notification separately"
    },
    {
      type: "p",
      text: "A person who decides may still need to consult delivery or finance and notify affected colleagues. State those obligations without turning every consultation into a veto. Identify who resolves a genuine cross-functional disagreement and by when. A long approval chain can hide inside language about collaboration. The test is whether everyone knows who makes the final call when the inputs conflict. If the answer is still the CEO for every routine exception, authority has not really moved."
    },
    {
      type: "h2",
      text: "Transfer context and thresholds with the authority"
    },
    {
      type: "p",
      text: "Give the owner access to the facts required for the decision: costs, capacity, customer commitments, and relevant operating standards. Explain the reasoning behind the boundary rather than handing over only a number. Agree what triggers escalation, such as a commitment beyond available capacity or a material contractual exception. A threshold should reflect the business's actual risk and economics. Copying a spending limit from another company is less useful than understanding what consequence the boundary is intended to contain."
    },
    {
      type: "h2",
      text: "Review a sample after the decision"
    },
    {
      type: "p",
      text: "Ask the owner to explain a few real calls: the options, information, tradeoff, and result. Give feedback on reasoning and communication. Use this review to improve the rule or provide training, rather than requiring advance permission again by default. Some decisions will differ from the CEO's preference without being wrong. If you reverse a call, explain the missing fact or breached boundary. Otherwise, people learn that delegation means guessing the founder's unspoken answer."
    },
    {
      type: "h2",
      text: "Close the bypass path visibly"
    },
    {
      type: "p",
      text: "When a colleague asks the CEO to reconsider a routine decision privately, direct them to the accountable owner or the agreed escalation process. Do not resolve it informally and leave the owner to discover the change later. Exceptions will occur; make them visible and explain why the normal rule did not apply. The CEO's own behavior is part of the operating system. A decision-rights document cannot compensate for a leader who continues to provide a faster private route."
    },
    {
      type: "h2",
      text: "Measure whether the queue actually shrinks"
    },
    {
      type: "p",
      text: "Track the repeated decision categories, time waiting, and material reversals. Check quality as well as volume so reduced escalation does not hide unmanaged risk. Expand delegation when the first category works, and adjust where evidence shows a capability or boundary problem. The goal is not a CEO who never hears bad news. It is a business where routine judgment happens close to the information and meaningful exceptions arrive early enough for leadership to make the decisions only it should own."
    },
    {
      type: "panel",
      items: [
        "Name one decision owner, not a collective inbox.",
        "Define inputs, limits, consultation, and escalation.",
        "Review reasoning afterward and refuse routine bypasses."
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

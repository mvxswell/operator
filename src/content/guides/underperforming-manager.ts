import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-handle-an-underperforming-manager",
  skill: "people",
  title: "How to Handle an Underperforming Manager",
  description: "Handle an underperforming manager with clear evidence, decision rights, and a bounded improvement plan. Separate a capability gap from a broken role or process.",
  answer: "Define the specific management outcome that is missing, verify the authority and support the role actually has, and discuss the evidence directly. Agree on a bounded improvement plan with observable behaviors and review dates. If the gap persists, make a deliberate role decision using the applicable policies and advice.",
  scenario: {
    industry: "Illustrative service team",
    scenario: "Suppose a manager repeatedly misses staffing coverage. The written role says they own the roster, but another leader reallocates people without telling them. The manager also fails to escalate the gaps they do know about.",
    prompt: "Which response addresses both sources of the problem?",
    choices: [
      {
        id: "a",
        text: "Label the manager uncommitted and ignore the decision conflict"
      },
      {
        id: "b",
        text: "Excuse every miss because another leader is involved"
      },
      {
        id: "c",
        text: "Clarify staffing authority and set a specific escalation standard"
      },
      {
        id: "d",
        text: "Add unrelated targets without discussing the examples"
      }
    ],
    correctChoiceId: "c",
    explanation: "The role needs coherent authority, and the manager still needs to escalate known gaps. Repair the operating condition and define the behavior that can then be evaluated fairly."
  },
  faqs: [
    {
      question: "How do you tell a skill gap from a bad role design?",
      answer: "Check whether the manager has the authority, information, capacity, and support needed for the expected outcome. Then inspect decisions and behaviors within their control. Both problems can coexist. A useful improvement plan separates what the business must repair from what the manager must change."
    },
    {
      question: "Should you give an underperforming manager more time?",
      answer: "Only when there is a specific reason more time could resolve an uncertainty, with clear evidence to review. Account for support delivered and the normal work cycle. Repeated extensions without a changed intervention can prolong the same gap and shift the cost to the team."
    },
    {
      question: "What should you document in an improvement discussion?",
      answer: "Record the concrete examples, expected standard, the manager's relevant explanation, agreed support, observable changes, and review dates. Keep notes factual and follow your organization's handling of personnel information. Documentation should preserve the work agreement rather than replace a direct conversation."
    }
  ],
  related: [
    "how-to-onboard-a-new-manager",
    "how-to-run-effective-one-on-one-meetings",
    "how-to-delegate"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Describe the miss without a personality label"
    },
    {
      type: "p",
      text: "Replace statements such as not strategic or lacks ownership with examples of decisions, communication, and outcomes. Which promise was missed? What should the manager have done? What information and authority were available? A manager cannot reliably act on a broad judgment about their character. Concrete evidence also helps you notice when frustration comes from a mismatch in style rather than a meaningful failure. Use recent examples and distinguish what you observed from what someone else inferred."
    },
    {
      type: "h2",
      text: "Check the role before diagnosing the person"
    },
    {
      type: "p",
      text: "Compare the expected outcomes with actual decision rights, staffing, tools, and competing instructions. A manager held responsible for scheduling cannot own the result if the founder privately changes assignments. This check does not eliminate accountability; it makes the standard legitimate. Identify which obstacles management must remove and which actions remain within the person's control. A fair assessment should not treat a broken operating design as proof that the person lacks motivation or general leadership ability."
    },
    {
      type: "h2",
      text: "Hear the manager's account of the problem"
    },
    {
      type: "p",
      text: "Present the evidence and ask how they explain the gap. Look for facts you did not have, disagreements about the standard, and dependencies that were never escalated. Listening does not require accepting every explanation. It gives you a better basis for choosing the intervention. Keep the conversation focused on work and consequences rather than public blame. If the issue involves serious conduct or a sensitive complaint, use the appropriate internal process instead of improvising a routine coaching discussion."
    },
    {
      type: "h2",
      text: "Separate knowledge, skill, judgment, and capacity"
    },
    {
      type: "p",
      text: "A manager may not know the process, may struggle to perform it, may make weak tradeoffs, or may have too much work. Each calls for a different response. Training can address a knowledge gap; practice and feedback can develop a skill; decision review can expose a reasoning problem; scope changes may address overload. Do not prescribe coaching for every miss. The plan should target the cause supported by the evidence and acknowledge when more than one factor is involved."
    },
    {
      type: "h2",
      text: "Agree on a small set of observable changes"
    },
    {
      type: "p",
      text: "Write the expected behaviors, the operating result they should influence, support provided, evidence to review, and decision dates. For example, require a visible weekly staffing plan and early escalation of uncovered shifts, rather than simply asking for more leadership. Use standards the manager can understand and affect. Avoid a long list assembled to make success impossible. The purpose is to test whether the role can work with a clear standard, not to create the appearance of a process with a predetermined conclusion."
    },
    {
      type: "h2",
      text: "Review frequently enough to correct course"
    },
    {
      type: "p",
      text: "Choose review intervals that match the work cycle and the seriousness of the gap. Ask what changed, what remains blocked, and whether the agreed behavior occurred. Give feedback close enough to the event that the manager can use it. Do not wait until the final date to announce that the whole period was unsatisfactory. Keep brief factual notes and preserve the original expectations. If support you promised was not provided, account for that when evaluating the result."
    },
    {
      type: "h2",
      text: "Protect the team from an indefinite unresolved gap"
    },
    {
      type: "p",
      text: "An improvement process should not leave the rest of the team compensating silently without boundaries. Assign interim coverage for critical work and communicate only what people need to do their jobs. Do not disclose private performance discussions as an explanation for every operating miss. If customer or safety risks require immediate containment, act on those risks while the role assessment proceeds. A thoughtful review is compatible with decisive operational protection; it does not require the business to tolerate unmanaged consequences."
    },
    {
      type: "h2",
      text: "Make the role decision when the evidence is sufficient"
    },
    {
      type: "p",
      text: "At the review date, decide whether to confirm improvement, adjust the role with a credible rationale, extend a specific unresolved test, or consider another employment outcome. Follow the actual agreement, policies, and applicable requirements, using qualified advice when needed. Avoid indefinite extensions driven only by discomfort. Also avoid treating one improved week as proof that the underlying management pattern is fixed. Record the evidence and what you will monitor afterward so the decision has a clear operational basis."
    },
    {
      type: "panel",
      items: [
        "Evidence: the specific outcome and behavior that missed.",
        "Conditions: authority, capacity, information, and support.",
        "Plan: observable changes, review dates, and a real decision."
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


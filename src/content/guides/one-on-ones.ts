import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-run-effective-one-on-one-meetings",
  skill: "people",
  title: "How to Run Effective One-on-One Meetings",
  description: "Run one-on-one meetings that unblock decisions and build judgment. Use the employee's agenda, specific feedback, commitments, and a reliable follow-up loop.",
  answer: "Use a one-on-one to discuss work the person cannot resolve through routine reporting: blocked decisions, feedback, priorities, and development. Let them shape the agenda, make your own feedback specific, and leave with clear commitments. Keep status updates in a written channel when they do not need a conversation.",
  scenario: {
    industry: "Illustrative team-management meeting",
    scenario: "Suppose every one-on-one repeats a project dashboard already available to the manager. A team lead has raised the same unresolved approval issue for three meetings. The manager gives encouragement but never names the decision owner.",
    prompt: "What should change at the next meeting?",
    choices: [
      {
        id: "a",
        text: "Add more dashboard slides to improve preparation"
      },
      {
        id: "b",
        text: "Resolve the approval ownership and record a dated commitment"
      },
      {
        id: "c",
        text: "Cancel future meetings because the dashboard exists"
      },
      {
        id: "d",
        text: "Ask the lead to remain positive without changing the blocker"
      }
    ],
    correctChoiceId: "b",
    explanation: "The conversation is failing to change a repeated blocker. Use the dedicated time to clarify authority and commit to the next action, while moving routine dashboard updates out of the discussion."
  },
  faqs: [
    {
      question: "Should one-on-ones be weekly?",
      answer: "Choose a cadence that matches the role, current change, and support needs, then keep it reliably. Weekly can be useful for a new responsibility or frequent blockers, but the calendar alone does not make the meeting effective. Adjust based on whether issues are resolved early enough."
    },
    {
      question: "Who should own the one-on-one agenda?",
      answer: "The direct report should have meaningful space to bring what matters to their work, and the manager should bring context and specific feedback. A shared agenda works when it prioritizes consequential topics and does not become a required status presentation that crowds out real concerns."
    },
    {
      question: "What should you do when there is nothing to discuss?",
      answer: "Check whether priorities, feedback, support, or development need attention before filling the time with updates. A brief useful meeting can be enough. If there is consistently no valuable conversation, agree on a different cadence while preserving a clear route for issues between meetings."
    }
  ],
  related: [
    "how-to-handle-an-underperforming-manager",
    "how-to-onboard-a-new-manager",
    "how-to-stop-every-decision-coming-to-the-ceo"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Give the meeting a clear purpose"
    },
    {
      type: "p",
      text: "A one-on-one is dedicated time for a manager and direct report to address their working relationship and the decisions around the person's work. It is not automatically a private version of the team status meeting. Explain what belongs there: unclear priorities, blockers, feedback, development, and concerns that are difficult to raise elsewhere. A clear purpose helps both people prepare and makes it less likely that urgent updates will consume the entire conversation every time."
    },
    {
      type: "h2",
      text: "Invite the person's agenda before adding your own"
    },
    {
      type: "p",
      text: "Use a short shared note or an invitation to identify topics in advance. Ask what would make the conversation useful rather than requiring a formal presentation. The manager should still bring feedback and important context; employee-led does not mean the manager has no responsibility. Order the agenda by consequence and sensitivity, not by who wrote the first item. If something needs a timely decision, make sure it is discussed before a long sequence of routine updates."
    },
    {
      type: "h2",
      text: "Ask about decisions and friction, not just progress"
    },
    {
      type: "p",
      text: "Questions about what is blocked, which priority is unclear, or where a decision keeps returning can reveal more than a request for a general update. Ask for a recent example when an answer is broad. Avoid solving the problem before you understand the constraint. A colleague may need authority, information, or help coordinating with another team rather than a new list of tasks. Clarify whether they want a decision, coaching, a connection, or simply space to explain the issue."
    },
    {
      type: "h2",
      text: "Make feedback observable and two-way"
    },
    {
      type: "p",
      text: "Describe the situation, behavior, and effect, then ask how the person saw it. Praise should be specific enough to repeat; corrective feedback should be specific enough to act on. Do not save a serious issue for a distant scheduled meeting when it needs prompt attention. Invite feedback on your own instructions and availability. A manager who asks for candor but disputes every example teaches the person that the safe agenda is a set of harmless updates."
    },
    {
      type: "h2",
      text: "Use a real decision to develop judgment"
    },
    {
      type: "p",
      text: "When a colleague brings a problem, ask what options they see, which they recommend, and what evidence would change their mind. Offer the missing context and explain your reasoning if you make the final call. Do not turn every request into a test; sometimes the person needs a straightforward decision. The aim is to build the ability to make similar choices next time, rather than making the manager the permanent source of every answer."
    },
    {
      type: "h2",
      text: "Separate commitments from general discussion"
    },
    {
      type: "p",
      text: "For each action, record one owner, the next observable step, and the review point. Include the manager's promises, such as clarifying a priority or obtaining access. A conversation can feel supportive while changing nothing if every action remains implied. Keep the note brief and appropriate to the sensitivity of the subject. Follow your organization's handling of personnel information, and do not place private details in a shared project document simply because it is convenient."
    },
    {
      type: "h2",
      text: "Choose a cadence you can reliably maintain"
    },
    {
      type: "p",
      text: "Use a frequency that fits the role, amount of change, support needs, and other opportunities for meaningful contact. New responsibilities or recurring blockers may justify more frequent conversations. A stable experienced colleague may need a different rhythm. There is no universal meeting duration that makes the relationship work. Avoid repeatedly canceling when operations get busy; that is often when unresolved priorities matter most. When rescheduling is necessary, agree on another time instead of letting the conversation disappear."
    },
    {
      type: "h2",
      text: "Review whether the meetings improve the work"
    },
    {
      type: "p",
      text: "After several meetings, ask whether decisions are clearer, blockers move sooner, feedback is usable, and commitments are kept. If the conversation is repetitive, inspect whether the same unresolved action returns or whether the agenda is mostly information already available elsewhere. Adjust the format with the person rather than imposing a new template by default. A useful one-on-one does not need to feel dramatic. It should create a reliable route to support and judgment that the rest of the operating system does not provide."
    },
    {
      type: "panel",
      items: [
        "Before: choose the topics that need a conversation.",
        "During: clarify the decision, evidence, feedback, and support.",
        "After: keep the commitments, including the manager's own actions."
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


import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-decide-between-hiring-and-outsourcing",
  skill: "resource",
  title: "How to Decide Between Hiring and Outsourcing",
  description: "Compare hiring and outsourcing using workload, control, ramp time, and total cost. Choose a reversible pilot before committing to a role or supplier contract.",
  answer: "Hire when recurring work and decision ownership justify a durable internal role. Outsource when a defined outcome can be specified, accepted, and coordinated without building the capability inside. Compare total cost and operating risk, including the time your own team must spend managing either option.",
  scenario: {
    industry: "Illustrative maintenance business",
    scenario: "Suppose a company needs a one-time migration of its scheduling records. Its current staff can own daily scheduling afterward, but nobody has migration expertise. An agency offers a defined migration with acceptance checks, while a proposed permanent hire has no clear ongoing workload after the project.",
    prompt: "Which approach best fits the stated need?",
    choices: [
      {
        id: "a",
        text: "Create a permanent role solely to complete the migration"
      },
      {
        id: "b",
        text: "Use a bounded specialist engagement with an internal acceptance owner"
      },
      {
        id: "c",
        text: "Buy the cheapest hourly service without specifying the result"
      },
      {
        id: "d",
        text: "Transfer daily scheduling ownership without a handoff"
      }
    ],
    correctChoiceId: "b",
    explanation: "The immediate need is a defined specialist project. A scoped engagement with acceptance checks matches that shape, while the internal team retains a durable owner for the ongoing workflow."
  },
  faqs: [
    {
      question: "Is outsourcing always cheaper than hiring?",
      answer: "No. Compare the full cost of useful output, including internal coordination, review, changes, and recovery from errors. A low hourly fee can become expensive when the work is unclear or requires constant context. A hire can also be costly when the workload does not justify a lasting role."
    },
    {
      question: "When should an outsourced function come in-house?",
      answer: "Consider it when demand becomes durable, context and responsiveness become central, or supplier dependence creates unacceptable risk. Build a transition plan and compare actual economics. Bringing work inside without a capable owner or a knowledge transfer can make a functioning service less reliable."
    },
    {
      question: "What should an outsourcing pilot measure?",
      answer: "Measure the accepted result, turnaround, quality, and the internal hours needed to coordinate and review it. Include a realistic exception, because routine work may hide the coordination burden. Decide in advance what evidence would justify expanding, revising, or stopping the arrangement."
    }
  ],
  related: [
    "when-to-hire-your-first-employee",
    "how-to-plan-capacity-before-taking-on-more-work",
    "how-to-write-a-hiring-scorecard"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Define the work before comparing suppliers and salaries"
    },
    {
      type: "p",
      text: "Write the outcome, required quality, delivery window, necessary access, and who will accept the result. A vague request to help with operations cannot be priced reliably as either a hire or an outsourced service. Separate routine execution from decisions that require context or authority. You may be able to outsource bookkeeping preparation while retaining financial decisions, or buy a specialist project while keeping customer ownership. The unit of comparison should be the same useful result, not an hourly rate."
    },
    {
      type: "h2",
      text: "Check whether the workload is durable"
    },
    {
      type: "p",
      text: "Look at actual recurring demand and plausible variability. Distinguish a one-time backlog from an ongoing role, and a seasonal surge from a permanent capacity constraint. If you hire for a temporary pile of work, identify what the person will own once it is cleared. If you outsource a daily responsibility, check whether the supplier's availability matches your operating rhythm. Neither arrangement is automatically flexible when coordination or knowledge becomes difficult to replace."
    },
    {
      type: "h2",
      text: "Decide how much control the work requires"
    },
    {
      type: "p",
      text: "Some work must respond quickly to internal priorities, exercise judgment with incomplete context, or maintain relationships that are central to delivery. That can favor an internal role. Other work can be specified through deliverables and acceptance criteria, making an external specialist practical. Be precise about what control you need rather than assuming employment guarantees commitment. Legal classification and employment obligations depend on the arrangement and jurisdiction; have the actual terms reviewed rather than choosing a label solely to reduce cost."
    },
    {
      type: "h2",
      text: "Compare the full cost of a useful result"
    },
    {
      type: "p",
      text: "For a hire, include compensation, relevant employer costs, tools, recruiting, training, supervision, and the ramp before useful output. For outsourcing, include fees, setup, internal coordination, review, change requests, and the cost of correcting unacceptable work. Use the same demand and quality assumptions for both. A lower quote can conceal work your team must still do. An employee's apparent spare capacity can also disappear once you account for the management and training the role requires."
    },
    {
      type: "h2",
      text: "Inspect dependency and continuity risk"
    },
    {
      type: "p",
      text: "Ask what happens if the individual or supplier becomes unavailable. Identify where process knowledge, customer information, and access credentials will live. A supplier relationship can create a difficult dependency if all knowledge stays outside the business. A single employee can create the same risk internally. Require usable handoff documentation and an owner for access management. Compare the time to recover the service, not merely the ease of terminating the contract or changing a person's job description."
    },
    {
      type: "h2",
      text: "Run a bounded pilot when uncertainty is high"
    },
    {
      type: "p",
      text: "Choose a small representative outcome with clear acceptance criteria, a deadline, and a known internal owner. Measure the total coordination effort as well as the delivered result. Do not select an unusually easy task that conceals the real complexity. A pilot should answer the question that would change the longer-term decision: quality, responsiveness, need for context, or economics. State what success would justify and what failure would teach before you begin spending."
    },
    {
      type: "h2",
      text: "Recognize when a hybrid is the better design"
    },
    {
      type: "p",
      text: "An internal owner can coordinate a portfolio of specialist suppliers while retaining priorities and acceptance standards. A contractor can cover a defined transition while you recruit a durable role. These arrangements work only when ownership is clear. Do not divide the responsibility so finely that each party can claim someone else caused the miss. Name the person accountable for the end-to-end result and make the handoffs visible in the operating review."
    },
    {
      type: "h2",
      text: "Reassess after the original problem changes"
    },
    {
      type: "p",
      text: "The right choice can change as work becomes steadier, the business learns a capability, or the consequences of failure grow. Set a review point linked to volume, quality, cost, or strategic dependence. Compare actual delivered output with the assumptions in your original decision. Avoid defending a vendor or hire simply because switching is awkward. Equally, do not bring work inside for prestige when a reliable external arrangement still provides the result at an acceptable total cost."
    },
    {
      type: "panel",
      items: [
        "Recurring judgment and close coordination favor a clear internal owner.",
        "Specified specialist outcomes can fit an external provider.",
        "Pilot the uncertain part and compare total delivery cost."
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

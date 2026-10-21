import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-decide-which-product-to-shut-down",
  skill: "strategy",
  title: "How to Decide Which Product to Shut Down",
  description: "Decide which product to stop by comparing future contribution, strategic fit, and avoidable complexity. Test a focused repair and plan the customer transition.",
  answer: "Compare each product's future contribution and strategic role with the capacity and complexity it consumes. Ignore sunk development spending when choosing the next investment, while accounting for obligations and transition costs. Choose explicitly among focused repair, maintenance, sale or transfer where feasible, and shutdown.",
  scenario: {
    industry: "Illustrative software portfolio",
    scenario: "Suppose a legacy tool earns positive contribution but repeatedly pulls the only integration specialist away from a growing core product. Its claimed role as a feeder has not been measured. Leadership wants either immediate shutdown or another unlimited year of investment.",
    prompt: "What should happen before choosing between those extremes?",
    choices: [
      {
        id: "a",
        text: "Fund it because past development was expensive"
      },
      {
        id: "b",
        text: "Compare bounded maintenance, strategic evidence, and a priced transition"
      },
      {
        id: "c",
        text: "Assume all support obligations disappear on announcement"
      },
      {
        id: "d",
        text: "Count all allocated overhead as immediate savings"
      }
    ],
    correctChoiceId: "b",
    explanation: "The options need forward economics, capacity impact, evidence for the feeder role, and real transition obligations. Maintenance or a bounded test may be better than either unlimited funding or an unplanned shutdown."
  },
  faqs: [
    {
      question: "Should you shut down a product that still makes money?",
      answer: "Possibly, when its scarce capacity and complexity cost more than a credible alternative use. Compare avoidable costs and strategic benefits, not revenue alone. Include support obligations and transition work, and verify that the alternative opportunity is more than an optimistic forecast."
    },
    {
      question: "How do you avoid keeping a weak product forever?",
      answer: "Use a bounded repair or maintenance plan with an owner, budget, evidence threshold, and decision date. Decide in advance what result justifies more investment. Reopening the same debate without new evidence can consume attention as surely as the product itself."
    },
    {
      question: "What belongs in a product shutdown plan?",
      answer: "Include customer notice, remaining delivery and support commitments, data access, migration options, commercial obligations, staff ownership, and the timeline. Review the actual agreements. A shutdown decision is incomplete until the business knows how it will honor or resolve the promises that remain."
    }
  ],
  related: [
    "where-to-invest-next-dollar",
    "how-to-test-a-new-market-before-expanding",
    "how-to-set-quarterly-business-priorities"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Define the decision you are actually making"
    },
    {
      type: "p",
      text: "Stopping new investment, stopping new sales, and ending support are different decisions. A product may deserve maintenance without further expansion, or a narrower customer segment without a complete shutdown. Write the alternatives with their operating consequences. A vague debate about whether the product is good can continue indefinitely because participants are defending different things. Clarify which future commitment is in question and what would change for customers, staff, and the rest of the portfolio under each option."
    },
    {
      type: "h2",
      text: "Look forward rather than defending sunk spending"
    },
    {
      type: "p",
      text: "Past development effort explains how you arrived here, but it cannot be recovered by spending more. Compare the costs and benefits that change from today onward. Include the real cost of keeping promises already made; those obligations are not sunk merely because the original sale happened earlier. This distinction prevents two errors: funding a weak product to justify its history, and pretending shutdown is free because future development work can simply stop."
    },
    {
      type: "h2",
      text: "Calculate contribution and scarce attention"
    },
    {
      type: "p",
      text: "Estimate receipts, costs caused by delivery and support, and the capacity consumed in the roles that constrain the business. Include recurring incidents, special tooling, sales explanations, and exceptions when they materially differ across products. Be cautious with overhead allocations that do not disappear after shutdown. A product with modest revenue may be economical to maintain; another with larger revenue may monopolize the team needed for a stronger opportunity. The question is the future use of limited resources."
    },
    {
      type: "h2",
      text: "Specify the strategic role with a falsifiable claim"
    },
    {
      type: "p",
      text: "A product can introduce customers to a larger offer, complete a workflow, or support a chosen market position. Write the mechanism and the evidence you would expect if that role were real. Track whether customers actually progress to the broader offer or whether the product is merely described as strategic whenever its economics are questioned. Do not require every product to be a standalone growth business, but do require the claimed portfolio benefit to be observable enough to evaluate."
    },
    {
      type: "h2",
      text: "Separate a repairable problem from a weak market"
    },
    {
      type: "p",
      text: "Poor onboarding, a confusing offer, and a missing feature are different from a lack of valued demand. Examine use, customer feedback, willingness to pay, and the reasons deals are lost. A repair should target a specific obstacle with a bounded cost and a decision date. Avoid an open-ended promise that one more release will reveal the market. Define what result would justify further investment and what result would support maintenance or exit."
    },
    {
      type: "h2",
      text: "Compare the portfolio under each alternative"
    },
    {
      type: "p",
      text: "Model how capacity moves after a product is stopped or simplified. Name the receiving initiative and verify that the released skills fit its needs. Removing a product does not automatically convert support specialists into developers or create demand for another offer. Account for transition work that temporarily uses the same people. A portfolio decision becomes concrete when it shows what the business will stop doing, what it will start or improve, and the sequence required to get there."
    },
    {
      type: "h2",
      text: "Plan the customer and team transition"
    },
    {
      type: "p",
      text: "Review contractual commitments, notice, data access, migration, refunds where applicable, and remaining support obligations. Obtain advice on the actual agreements when the consequences are material. Choose a communication owner and a schedule you can deliver. Do not sell new long-term commitments while privately assuming a near-term shutdown. A responsible transition can consume meaningful time and money; include it in the decision instead of presenting it as a cleanup task to handle after the announcement."
    },
    {
      type: "h2",
      text: "Record the decision and its reversal conditions"
    },
    {
      type: "p",
      text: "Write the evidence, assumptions, chosen option, owner, and dates for the next review. If you choose a repair, identify the stop condition before the team becomes attached to it. If you choose shutdown, specify which new evidence could legitimately change the plan and which would merely reopen a settled debate. Review the outcome afterward. Learning whether the expected capacity and portfolio benefits materialized is more valuable than declaring the decision brave or inevitable."
    },
    {
      type: "panel",
      items: [
        "Future economics: what changes from today onward?",
        "Strategic role: what observable portfolio benefit exists?",
        "Transition: which promises, costs, and owners remain?"
      ]
    },
    {
      type: "h2",
      text: "Try the decision"
    },
    {
      type: "p",
      text: "This fictional scenario makes the tradeoff concrete. Treat the details as a practice case and select the action that changes the relevant constraint."
    },
    {
      type: "scenario"
    }
  ]
};

export default guide;


import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-decide-whether-to-discount-a-deal",
  skill: "sales",
  title: "How to Decide Whether to Discount a Deal",
  description: "Decide whether to discount a deal by checking the real buying obstacle, contribution, capacity, and concessions. Trade price for something instead of hoping.",
  answer: "Discount only when price is a verified obstacle and the revised deal still makes economic sense. Compare the contribution, capacity, precedent, and collection timing. If you lower the price, obtain a specific reciprocal change such as scope, term, payment timing, or volume you can actually deliver.",
  scenario: {
    industry: "Illustrative business service",
    scenario: "Suppose a customer requests a lower price but also wants extra implementation work. The seller proposes a discount to meet a monthly target. Delivery is fully booked, and the customer has not confirmed whether price would resolve its internal approval.",
    prompt: "What is the best next step?",
    choices: [
      {
        id: "a",
        text: "Discount immediately because the sales target is close"
      },
      {
        id: "b",
        text: "Clarify the buying obstacle and model a scoped concession with delivery"
      },
      {
        id: "c",
        text: "Promise extra work without consulting the capacity owner"
      },
      {
        id: "d",
        text: "Ignore contribution because the contract increases revenue"
      }
    ],
    correctChoiceId: "b",
    explanation: "The team has not established that price is the obstacle, and the requested scope uses constrained capacity. Diagnose the decision and evaluate a specific commercial trade before granting a concession."
  },
  faqs: [
    {
      question: "Should you discount to fill unused capacity?",
      answer: "It can make sense when the deal contributes positively, fits genuinely available capacity, and does not create unacceptable future expectations. Include support and collection requirements. Verify that the capacity is otherwise unused rather than assuming all empty calendar space can be sold without consequence."
    },
    {
      question: "What should you ask for in return for a discount?",
      answer: "Seek a specific change that improves the deal: reduced scope, standard delivery, earlier payment, or a credible commitment. Calculate its value. Vague promises of future business, publicity, or referrals should not be treated as equivalent to a documented reduction in work or cash risk."
    },
    {
      question: "What if every customer asks for a discount?",
      answer: "Investigate whether the package, segment, price presentation, or value proposition is wrong. Review which customers buy without exceptions and why others hesitate. A pattern of concessions may call for a redesigned offer rather than more individual approvals or an automatic refusal to negotiate."
    }
  ],
  related: [
    "how-to-price-a-service-business",
    "should-i-raise-prices",
    "why-are-sales-down"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Establish what is preventing the purchase"
    },
    {
      type: "p",
      text: "A customer asking for a better price does not prove price is the reason they have not bought. Clarify the use case, decision process, competing options, budget constraint, and remaining risk. Ask whether a particular commercial change would resolve the decision and what else remains. A discount cannot reliably repair an offer the customer does not value or an approval process nobody understands. Fix the actual obstacle before spending margin to create the appearance of progress."
    },
    {
      type: "h2",
      text: "Calculate contribution at the proposed price"
    },
    {
      type: "p",
      text: "Identify the costs caused by accepting and delivering the deal, including commissions, implementation, support, and unusual requirements where relevant. Distinguish those costs from overhead that remains either way. Calculate the contribution under the current offer and the proposed concession. Do not judge a discount only as a small percentage of revenue. A modest price reduction can remove a much larger portion of the contribution available to cover the business's fixed costs."
    },
    {
      type: "h2",
      text: "Make the arithmetic visible with an example"
    },
    {
      type: "p",
      text: "Suppose an illustrative service sells for $1,000 and costs $700 to deliver at the stated scope. Its contribution is $300. Reducing the price to $900 while leaving the cost unchanged reduces contribution to $200. The figures are hypothetical and do not imply a recommended margin. They show why a $100 price concession should be compared with what remains after delivery costs, rather than described only as a ten percent discount."
    },
    {
      type: "h2",
      text: "Check the capacity the deal consumes"
    },
    {
      type: "p",
      text: "A lower-contribution deal may still be useful if it fills capacity that would otherwise sit idle and does not create a harmful precedent. It may be unattractive if it blocks higher-value work at a constrained step. Compare realistic alternatives, not an imaginary perfect customer. Include start dates, specialist effort, and service promises. A sales target can encourage accepting work that makes the delivery business worse off, so involve the capacity owner before promising an exception."
    },
    {
      type: "h2",
      text: "Trade a concession for an observable change"
    },
    {
      type: "p",
      text: "Consider reduced scope, a standard implementation path, earlier payment, a longer commitment, or a purchase volume that the agreement genuinely supports. Price each exchange rather than assuming every concession has equal value. A promise of future referrals is not the same as collected cash or less work. If you change payment timing, include the actual collection mechanics and relevant terms. The trade should improve the economics or certainty of the deal, not merely give the negotiation a more elaborate story."
    },
    {
      type: "h2",
      text: "Protect the reference point for future deals"
    },
    {
      type: "p",
      text: "A discount can shape renewal expectations and what similar customers request later. Document why the exception exists, who approved it, and whether it applies to future purchases. Do not rely on secrecy to make poor economics safe. Review whether your standard price or package is misaligned if nearly every sale needs an exception. Repeated discounting can be a signal about positioning, segmentation, or scope rather than proof that the sales team needs more flexibility."
    },
    {
      type: "h2",
      text: "Give sales an approval rule that fits the risk"
    },
    {
      type: "p",
      text: "Define which concessions a seller can offer, which require review, and what information the approver needs. A useful request includes the buying obstacle, contribution, capacity impact, reciprocal change, and the alternative if the customer declines. Avoid an approval process so slow that people bypass it, but do not make a single revenue threshold the only safeguard. A small contract with a large support burden can deserve more attention than a larger standard deal."
    },
    {
      type: "h2",
      text: "Review the outcome after the signature"
    },
    {
      type: "p",
      text: "Check whether the concession actually changed the buying decision and whether the promised reciprocal benefit occurred. Compare delivery cost, collection timing, and subsequent renewal behavior with the assumptions used at approval. A signed deal is not the end of the economic test. Use the evidence to improve packaging and negotiation rules. If discounts repeatedly fail to close the right customers or create expensive exceptions, change the offer or qualification process rather than increasing the concession budget."
    },
    {
      type: "panel",
      items: [
        "Obstacle: is price actually preventing the purchase?",
        "Economics: contribution, scarce capacity, and cash timing.",
        "Exchange: what specific improvement does the business receive?"
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


import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-test-a-new-market-before-expanding",
  skill: "strategy",
  title: "How to Test a New Market Before Expanding",
  description: "Test a new market before committing fixed costs. Define the buyer and offer, seek paid demand, measure delivery economics, and set an explicit expansion gate.",
  answer: "Test the riskiest assumption with the smallest credible offer you can deliver. Define the buyer, buying trigger, acquisition path, and delivery economics, then seek evidence stronger than interest. Set a decision gate before committing to a location, permanent team, or other difficult-to-reverse costs.",
  scenario: {
    industry: "Illustrative commercial service expansion",
    scenario: "Suppose an operator receives enthusiastic feedback from businesses in a neighboring city. The proposed plan requires a lease and a permanent crew. No customer has yet accepted a priced offer, and travel costs have not been included in the forecast.",
    prompt: "What is the best next step?",
    choices: [
      {
        id: "a",
        text: "Sign the lease because feedback was positive"
      },
      {
        id: "b",
        text: "Count all interested businesses as contracted revenue"
      },
      {
        id: "c",
        text: "Hire a full crew to make the market seem established"
      },
      {
        id: "d",
        text: "Run a priced, bounded pilot that measures demand and delivery cost"
      }
    ],
    correctChoiceId: "d",
    explanation: "The main assumptions are paid demand and practical delivery economics. A credible pilot tests them before a lease and permanent staffing make the decision harder to reverse."
  },
  faqs: [
    {
      question: "How many customers prove a new market?",
      answer: "There is no universal count. Look at whether the evidence resolves your actual risks: repeatable access to the right buyers, willingness to pay, reliable delivery, and viable economics. A few unusual deals may justify learning more without supporting a large fixed investment."
    },
    {
      question: "Can you test a market without a local office?",
      answer: "Sometimes, when you can honestly deliver a bounded offer remotely or through a temporary arrangement. Include travel, coordination, and local requirements in the economics. Do not imply capabilities you lack, and do not assume that a founder-supported pilot represents a scalable local operation."
    },
    {
      question: "When should you stop an expansion pilot?",
      answer: "Stop or revise it when the agreed evidence gate is missed, the core assumption is contradicted, or the next learning step costs more than the option is worth. A pilot should have an owner, budget, and decision date so curiosity does not become indefinite operating overhead."
    }
  ],
  related: [
    "should-you-expand",
    "how-to-set-quarterly-business-priorities",
    "how-to-decide-which-product-to-shut-down"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Write the market hypothesis in operating terms"
    },
    {
      type: "p",
      text: "A new geography or customer segment is not a strategy by itself. Specify who will buy, what problem triggers the purchase, why your offer is preferable, and how the buyer will find you. Separate what you know from what you infer from the existing market. Similar-looking customers can have different buying cycles, service expectations, and costs. The test should expose those differences early rather than confirm only that people recognize the problem you describe."
    },
    {
      type: "h2",
      text: "Choose the assumption that could kill the plan"
    },
    {
      type: "p",
      text: "List the uncertainties that matter most: willingness to pay, access to decision-makers, a viable acquisition channel, reliable delivery, or acceptable unit economics. Rank them by consequence and lack of evidence. Do not spend the pilot polishing a website if the central risk is whether you can deliver the service locally. A useful test resolves a decision-changing uncertainty. It does not need to prove every part of the future business at once."
    },
    {
      type: "h2",
      text: "Use an offer someone could actually buy"
    },
    {
      type: "p",
      text: "Present a defined scope, price, delivery window, and acceptance standard to a real target buyer. Be honest about pilot limits and what is not yet available. Compliments and survey interest can inform learning, but they do not establish paid demand. A signed pilot or a real purchase provides different evidence from a meeting request. Avoid misrepresenting a mature local operation when you are testing whether the business should create one."
    },
    {
      type: "h2",
      text: "Keep the delivery model credible"
    },
    {
      type: "p",
      text: "A founder can sometimes rescue a pilot through exceptional effort that will not scale. Record that effort and any subsidized logistics, support, or customization. Determine what delivery would cost under the proposed operating model. You do not have to build the full future organization before testing, but you do need to distinguish learning costs from recurring economics. Otherwise, the pilot can appear profitable only because the team quietly supplied free labor or borrowed capacity from existing customers."
    },
    {
      type: "h2",
      text: "Set the gate before looking at the results"
    },
    {
      type: "p",
      text: "Define the evidence needed to proceed, revise, or stop, using your own economics and risk tolerance. Include demand quality, acquisition effort, delivery performance, customer payment, and repeatability. Do not choose a universal conversion threshold from someone else's business. A pilot with a few highly customized wins may prove that you can sell projects without proving that you can build the intended repeatable offer. Write which conclusion the test is actually capable of supporting."
    },
    {
      type: "h2",
      text: "Compare expansion with improvement at home"
    },
    {
      type: "p",
      text: "The alternative to expansion is not always doing nothing. The same capital and leadership time might improve retention, remove a bottleneck, or increase capacity in the existing market. Compare those choices on the same assumptions and time horizon. Expansion can be attractive while still being inferior to a less glamorous operating improvement. Include the effect of taking key people away from current commitments, particularly when the existing business depends heavily on the founder or a scarce specialist."
    },
    {
      type: "h2",
      text: "Use a staged commitment instead of a single leap"
    },
    {
      type: "p",
      text: "A test may justify a limited next step without justifying a permanent office or large team. Move from evidence to the next commitment deliberately: a defined pilot, a repeatable sales channel, reliable delivery, then fixed capacity where needed. State what must be true before each stage. Staging is not indecision when it preserves options and gathers relevant evidence. It becomes indecision when the business keeps paying for a pilot without a question, owner, or decision date."
    },
    {
      type: "h2",
      text: "Keep a record of surprises and rejected customers"
    },
    {
      type: "p",
      text: "Track who did not buy and why, not just the successful pilot customers. Note delivery exceptions, acquisition work, and changes to the original offer. Compare the results with the hypothesis you wrote before launch. If the attractive opportunity turns out to be a different segment, name that as a revised hypothesis rather than claiming the original plan was validated. A good market test can end with a decision to stop, provided it prevented a larger commitment based on weaker evidence."
    },
    {
      type: "panel",
      items: [
        "Hypothesis: buyer, trigger, offer, channel, and delivery model.",
        "Test: the smallest honest transaction that resolves a material uncertainty.",
        "Gate: evidence for the next commitment, with a budget and decision date."
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

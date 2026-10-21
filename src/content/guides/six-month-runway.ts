import type { Guide } from "./types";

const guide: Guide = {
  slug: "what-to-do-when-cash-runway-drops-below-six-months",
  skill: "financial",
  title: "What to Do When Cash Runway Drops Below Six Months",
  description: "When cash runway falls below six months, build a weekly cash view, test downside assumptions, and rank actions by cash timing before making broad spending cuts.",
  answer: "Treat six months as a prompt to investigate, not a universal shutdown rule. Reconcile available cash, forecast receipts and payments by week, and identify the earliest cash shortfall under plausible scenarios. Then choose actions by their timing, reliability, reversibility, and effect on the business's ability to earn.",
  scenario: {
    industry: "Illustrative subscription company",
    scenario: "Suppose a company reports five months of average runway, but a weekly forecast shows a cash gap in seven weeks because a large annual supplier payment comes before expected customer collections. A proposed office saving takes effect in four months.",
    prompt: "What is the most useful next decision?",
    choices: [
      {
        id: "a",
        text: "Rely on the five-month average and stop weekly forecasting"
      },
      {
        id: "b",
        text: "Count an unconfirmed funding conversation as cash"
      },
      {
        id: "c",
        text: "Build a dated plan addressing the seven-week gap and receipt risk"
      },
      {
        id: "d",
        text: "Assume the office saving solves the immediate gap"
      }
    ],
    correctChoiceId: "c",
    explanation: "The timing mismatch, not the average runway label, drives the immediate decision. Actions must change cash before the projected gap, with uncertain receipts and financing kept explicit."
  },
  faqs: [
    {
      question: "Is six months of cash runway always an emergency?",
      answer: "No single threshold fits every business. Collection timing, obligations, financing options, and the ability to change spending matter. A declining runway is a reason to verify the cash forecast and decision lead times, especially when cash receipts are concentrated or uncertain."
    },
    {
      question: "Should you cut every department by the same amount?",
      answer: "Compare cash timing and operating consequences instead. Equal cuts can remove capacity needed to deliver and collect while preserving spending that can be deferred. Model specific payments and second-order effects rather than assuming a percentage reduction produces the same useful saving everywhere."
    },
    {
      question: "How often should a short-runway business update its forecast?",
      answer: "Use a weekly routine and update sooner when a material receipt, payment, or funding assumption changes. Reconcile actual bank movements with the plan. The right cadence is frequent enough to act before commitments become unavoidable, rather than waiting for the next monthly accounting report."
    }
  ],
  related: [
    "how-to-build-a-13-week-cash-flow-forecast",
    "how-to-improve-cash-flow",
    "how-to-handle-a-customer-who-pays-late"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Verify what cash is actually available"
    },
    {
      type: "p",
      text: "Separate unrestricted operating cash from restricted funds, deposits you owe back, and balances already committed to near-term obligations. Reconcile the bank balance with the accounting records and identify payments not yet cleared. Do not assume an available credit facility is equivalent to cash you already hold; check its terms and availability. A simple runway calculation can look comfortable while a concentrated payment falls due much sooner. Start with money the business can actually use and obligations it must actually meet."
    },
    {
      type: "h2",
      text: "Replace a single average with a weekly view"
    },
    {
      type: "p",
      text: "Dividing cash by average monthly net outflow is a rough orientation, not a payment plan. Build a weekly cash forecast that includes collections, payroll, supplier payments, taxes, debt obligations, and other known commitments. Show actual due dates and confidence in receipt dates. A business with lumpy collections can face a shortfall before its average runway suggests. Use the forecast to find the lowest projected balance and the date when a decision must take effect."
    },
    {
      type: "h2",
      text: "Separate committed receipts from hopeful ones"
    },
    {
      type: "p",
      text: "Identify which inflows are contracted, invoiced, overdue, or still dependent on an unsigned sale. Avoid treating all pipeline value as collectible cash. Consider what happens if a large receipt is late or a planned sale does not close. This is scenario planning, not a prediction that the worst case will occur. Give uncertain assumptions an owner who can obtain better evidence. A forecast that makes uncertainty visible is more useful than a precise number built from unsupported optimism."
    },
    {
      type: "h2",
      text: "Rank actions by when cash changes"
    },
    {
      type: "p",
      text: "List each possible action with the cash amount, effective date, confidence, one-time cost, and operating consequence. Faster collection of a valid receivable may act sooner than a broad restructuring. Stopping a new purchase may preserve cash sooner than renegotiating a long contract. Include termination costs, notice periods, and transition obligations where relevant. Do not label an accounting expense reduction as a cash saving until you know which payment changes and when it stops leaving the bank."
    },
    {
      type: "h2",
      text: "Protect the capacity that produces reliable contribution"
    },
    {
      type: "p",
      text: "Across-the-board cuts can damage the work that generates near-term collections while leaving low-value commitments intact. Evaluate spending by its role in delivering contracted work, collecting cash, and preserving the ability to operate safely. Distinguish essential capacity from initiatives whose payoff arrives after the forecasted shortfall. This is not a rule to preserve every revenue-related expense. It is a requirement to compare the cash consequence of an action with the operating consequence it creates."
    },
    {
      type: "h2",
      text: "Use a hypothetical cash bridge to test the logic"
    },
    {
      type: "p",
      text: "Suppose an illustrative company has $120,000 of usable cash and forecasts a $30,000 weekly low point before a large customer payment. A proposal to save $5,000 monthly starting next quarter may not address that near-term risk. A realistic collections correction or a delayed discretionary purchase could change the low point sooner. These are fictional figures, not recommended thresholds. The purpose is to match the date of the intervention to the date of the cash need."
    },
    {
      type: "h2",
      text: "Set triggers while options still exist"
    },
    {
      type: "p",
      text: "Agree which forecast balance, missed receipt, or funding milestone will trigger the next decision. Assign owners and decision dates. If outside financing is part of the plan, model what happens if it arrives late or not at all; do not treat an introductory conversation as committed funding. When the business may be unable to meet obligations, involve qualified finance and legal advisers early. Obligations and available options depend on the actual company and jurisdiction, not a generic runway label."
    },
    {
      type: "h2",
      text: "Update the forecast and communicate consistently"
    },
    {
      type: "p",
      text: "Review actual receipts and payments against the forecast each week, explain the variance, and adjust the assumptions. Keep one shared version for the leadership decisions rather than separate optimistic and pessimistic spreadsheets nobody reconciles. Communicate with affected stakeholders using facts you can support, without promising outcomes you cannot control. The goal is to preserve choices and meet obligations through a dated plan. A lower burn estimate alone is not progress unless the relevant cash movements have actually changed."
    },
    {
      type: "panel",
      items: [
        "Verify usable cash and dated obligations.",
        "Forecast weekly lows under explicit receipt assumptions.",
        "Choose dated actions, owners, and escalation triggers."
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

import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-build-a-13-week-cash-flow-forecast",
  skill: "financial",
  title: "How to Build a 13-Week Cash Flow Forecast",
  description: "Build a 13-week cash flow forecast from bank balances, receipts, and committed payments. Track uncertainty, explain variances, and turn shortfalls into action.",
  answer: "Start with reconciled usable cash, then show receipts and payments in the week the money is expected to move. Roll each closing balance into the next opening balance. Label uncertain assumptions and compare the forecast with actual bank movements every week before extending the horizon.",
  scenario: {
    industry: "Illustrative project business",
    scenario: "Suppose a forecast includes a customer's $40,000 invoice in next week's receipts. The customer has not approved it because the purchase-order number is missing. The team also counts the same expected payment in a separate pipeline receipts line.",
    prompt: "What should be corrected before relying on the balance?",
    choices: [
      {
        id: "a",
        text: "Resolve the invoice requirement, revise timing, and remove the duplicate"
      },
      {
        id: "b",
        text: "Count the payment twice to show both sales and collections"
      },
      {
        id: "c",
        text: "Replace the forecast with the revenue target"
      },
      {
        id: "d",
        text: "Move every outgoing payment to the final week"
      }
    ],
    correctChoiceId: "a",
    explanation: "The receipt is both uncertain in timing and double counted. A useful forecast needs evidence for the collection date and one representation of each cash movement."
  },
  faqs: [
    {
      question: "Why use thirteen weeks instead of a monthly forecast?",
      answer: "A weekly horizon makes payment and collection timing visible over roughly a quarter. Thirteen weeks is a useful planning format, not a universal rule. Extend or supplement it when major commitments or financing decisions fall beyond that horizon, and keep a longer-term operating plan alongside it."
    },
    {
      question: "Can you build a cash forecast in a spreadsheet?",
      answer: "Yes. Use clear rows, consistent week cutoffs, transparent assumptions, and simple rolling balances. Protect formulas as appropriate, but make source data and ownership visible. The quality of receipt evidence and payment dates matters more than the software used to present them."
    },
    {
      question: "What is the most important forecast variance to investigate?",
      answer: "Investigate differences that change a decision or repeat across updates. A material receipt slipping, a missing obligation, or a recurring timing assumption can matter more than a small classification error. Explain whether the variance changes total cash, its timing, or both before choosing a response."
    }
  ],
  related: [
    "what-to-do-when-cash-runway-drops-below-six-months",
    "how-to-handle-a-customer-who-pays-late",
    "how-to-improve-cash-flow"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Use cash movements rather than accounting profit"
    },
    {
      type: "p",
      text: "A cash forecast answers whether the business can make dated payments. It does not replace the profit and loss statement. An invoice can create revenue before the customer pays, and a prepaid expense can consume cash before the accounting cost is recognized. Build the forecast around receipts and payments, not recognized revenue and expense totals. Keep the accounting view beside it for context, but do not substitute profit for the bank balance when deciding whether an obligation can be met."
    },
    {
      type: "h2",
      text: "Establish a trustworthy opening balance"
    },
    {
      type: "p",
      text: "Reconcile the bank accounts you intend to include and note any uncleared transactions. Separate restricted cash or customer funds the business cannot freely spend. Use one consistent cutoff for the forecast so a payment is not included in both the opening adjustment and the first week. State the date of the balance visibly. A forecast can be carefully calculated and still wrong from its first row if the opening cash figure is stale or includes money unavailable for operations."
    },
    {
      type: "h2",
      text: "Build the receipts schedule from actual collection evidence"
    },
    {
      type: "p",
      text: "List receivables by customer, amount, expected receipt date, and the basis for that date. Check purchase-order requirements, invoice disputes, and approval steps that could delay collection. Add expected receipts from future work separately, with explicit assumptions about winning the work, delivery, invoicing, and payment. An unsigned proposal is not the same as an approved invoice. Keep uncertain inflows distinguishable so a reviewer can test the forecast without rebuilding the whole model."
    },
    {
      type: "h2",
      text: "Map payments by obligation and timing"
    },
    {
      type: "p",
      text: "Include payroll and related payments, suppliers, rent, debt service, taxes, equipment commitments, refunds, and owner distributions where applicable. Use actual due dates and payment terms. Distinguish committed obligations from spending that can be changed, while avoiding the assumption that every discretionary label means a payment can immediately disappear. Review notice periods and dependencies before modeling a saving. Your bookkeeper or finance lead can help reconcile the schedule to records and identify obligations that a simple bank export might miss."
    },
    {
      type: "h2",
      text: "Make the arithmetic simple enough to inspect"
    },
    {
      type: "p",
      text: "For each week, calculate opening cash plus receipts minus payments to get closing cash. Carry that balance into the following week. Keep transfers between included accounts out of operating receipts and payments so cash is not counted twice. Show totals and a control that reconciles the first actual week to the bank. Avoid hiding assumptions inside complex formulas. A forecast the team can inspect and update consistently is more useful than a sophisticated model maintained by only one person."
    },
    {
      type: "h2",
      text: "Show uncertainty through a few explicit scenarios"
    },
    {
      type: "p",
      text: "Build a base case from the most supportable current assumptions, then test specific changes such as a delayed major receipt or a slower sales conversion. Do not randomly reduce every line and call it a downside case. Each scenario should answer a decision question and identify what would make it more or less plausible. Compare the lowest cash balance and its timing across cases. That gives the team a basis for action without pretending the forecast can eliminate uncertainty."
    },
    {
      type: "h2",
      text: "Turn the low point into an action plan"
    },
    {
      type: "p",
      text: "An illustrative forecast might show $60,000 opening cash, $20,000 in receipts, and $35,000 in payments in the first week, leaving $45,000. That arithmetic says nothing about whether week eight is safe; follow the rolling balances through the whole horizon. When a low point appears, identify actions that change a specific receipt or payment before that date. Assign an owner and check that solving one week does not simply create a larger obligation just beyond the visible forecast."
    },
    {
      type: "h2",
      text: "Roll forward and explain the miss"
    },
    {
      type: "p",
      text: "At the weekly review, replace the completed week's estimates with actual cash movements. Separate timing differences from permanent changes: a receipt one week late is different from an invoice that will not be collected. Update future assumptions and add a new week at the end. Keep prior versions or a variance log so repeated forecasting mistakes remain visible. The forecast becomes a management tool when it improves decisions and collection evidence, not when it is rebuilt from scratch only during a crisis."
    },
    {
      type: "panel",
      items: [
        "Rows: opening cash, dated receipts, dated payments, closing cash.",
        "Assumptions: owner, evidence, confidence, and expected date.",
        "Review: actual versus forecast, revised actions, one new week."
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

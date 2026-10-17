import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-improve-cash-flow",
  skill: "financial",
  title: "How to Improve Cash Flow in a Small Business",
    description:
      "Profit is not cash. Collect what you are owed, take deposits on lumpy jobs, and time bills. Build a 13-week view before you cut what creates the next sale.",
  answer:
    "Profit and cash are different clocks. Collect faster, take deposits on work that ties up materials, and time what you owe. Build a 13-week view of cash in and out before you cut anything that brings the next dollar in.",
  blocks: [
    { type: "h2", text: "Separate profit from cash" },
    {
      type: "p",
      text: "A profitable month can still miss payroll. You earned the revenue when you did the work. The cash arrives when the customer pays. If those dates are far apart, the profit sits in receivables, in half-finished jobs, or in a stockroom. Cutting costs does not pull that cash forward. Asking for it does.",
    },
    {
      type: "p",
      text: "Look at three balances before you invent a program: cash in the bank, what customers owe you and how old it is, and what you owe that will hit in the next month. If the bank is thin and receivables are old, the problem is collection. If the bank is thin and receivables are current, the problem is timing, pricing, or spending ahead of deposits.",
    },
    { type: "h2", text: "Change the terms you already have" },
    {
      type: "p",
      text: "Shorten what you offer new customers before you fight old ones. Net 15 instead of net 30, or due on receipt for small invoices, changes the next quarter without a speech. Invoice the day the work is done, not in a Friday batch two weeks later. Every week you wait is a week you financed them.",
    },
    {
      type: "p",
      text: "For money already late, call in age order and ask for a date and an amount, not a vibe. Stop new work for accounts that are past the point you wrote down in advance. A customer who buys more while they owe you more is not growth. Write the rule when you are calm so you are not inventing it on the phone.",
    },
    { type: "h2", text: "Take deposits where the job is lumpy" },
    {
      type: "p",
      text: "If you buy materials, book subcontractors, or hold a date on the calendar, a deposit is part of the price. A common shape is enough up front to cover the cash you will spend before the first milestone, then a payment at the milestone, then the rest before you hand over the finished thing. You are not a bank. Price and terms are the same conversation.",
    },
    {
      type: "p",
      text: "Deposits also filter. A buyer who will not fund the start of their own project is telling you how the last invoice will go. Put the schedule in the proposal so the deposit is normal, not an apology.",
    },
    { type: "h2", text: "Look at inventory and half-finished work" },
    {
      type: "p",
      text: "Stock and work-in-progress are cash wearing a costume. If shelves are full and sales are ordinary, you paid suppliers for goods that are not yet a customer's problem. Buy closer to the job. Finish the jobs that are 80% done before you start new ones that feel more interesting. A completed invoice collects. A clever half-built project does not.",
    },
    {
      type: "p",
      text: "The same idea applies to retainers you spend before you earn them, and to annual software you pay in January for a tool three people open. Match the cash out to the period that uses it when the vendor will let you.",
    },
    { type: "h2", text: "Time what you pay, without games" },
    {
      type: "p",
      text: "Pay suppliers on the terms you agreed, not early out of anxiety and not late as a strategy. Early pays away cash you may need for payroll. Late burns the relationship and the discount you could have taken. If a supplier offers 2% for paying in ten days, do that math against your bank balance. Take it when the cash is there. Skip it when paying early would make payroll tight.",
    },
    {
      type: "p",
      text: "Payroll, taxes, and rent are not flexible. Put those dates on the calendar first and treat everything else as what has to fit around them. A cash plan that \"forgets\" a tax payment is not a plan.",
    },
    { type: "h2", text: "Build a 13-week cash view" },
    {
      type: "p",
      text: "A thirteen-week sheet is long enough to see a tax date and a slow month, and short enough that you are guessing less. Each week, list cash at the start, the inflows you can name (not hope), and the outflows you have committed. The ending number is next week's start. Update it every week with what actually hit. The value is the week the balance goes thin, so you can act while there is still a week.",
    },
    {
      type: "panel",
      items: [
        "Opening cash, from the bank, not from memory.",
        "Inflows you have invoices or contracts for, dated when you expect the money.",
        "Payroll, rent, taxes, and loan payments on the week they leave.",
        "Materials and contractors tied to jobs you have already said yes to.",
        "A blank line for the week the balance would go below the buffer you chose.",
      ],
    },
    { type: "h2", text: "Know what not to cut" },
    {
      type: "p",
      text: "When the sheet looks tight, the tempting cuts are the ones that bring the next sale: the person who invoices, the ad that produces calls you can trace, the maintenance that keeps a crew billable. Cut unused subscriptions, paused projects, and inventory you do not have a buyer for. Do not cut the step that turns finished work into cash. Speeding that step is the improvement.",
    },
    {
      type: "p",
      text: "If the thirteen-week view stays negative after collections, deposits, and obvious cuts, you have a profit problem or a debt problem, not a timing problem. Pricing and cost belong in that conversation. Borrowing to cover a repeating gap only moves the week the gap shows up.",
    },
    { type: "h2", text: "Try the call" },
    { type: "scenario" },
  ],
  scenario: {
    industry: "Custom fabrication",
    scenario:
      "Last quarter's profit looked fine, and the bank account is thin the week before payroll. Customers are on net 45 and several large invoices are past 50 days. You buy steel when a job is signed. Two jobs are waiting on final approval before you can invoice the last half. A friend says to pause the salesperson who brings the signed jobs.",
    prompt: "What should you do first?",
    choices: [
      { id: "a", text: "Pause the salesperson so expenses drop this month" },
      { id: "b", text: "Collect the past-due invoices, bill the finished milestones, and require deposits on new steel" },
      { id: "c", text: "Take a line of credit and leave terms as they are" },
      { id: "d", text: "Cut prices to win faster cash from new customers" },
    ],
    correctChoiceId: "b",
    explanation:
      "The profit is stuck in old invoices and unbilled work, and new jobs consume cash before they collect. Cutting the person who signs work, or discounting, does not pull the existing cash forward.",
  },
  faqs: [
    {
      question: "Why can a profitable business run out of cash?",
      answer:
        "You recognize profit when you earn it. Cash arrives when customers pay, and it leaves when you buy materials, pay people, and cover rent. Slow collections, inventory, and half-finished jobs can empty the bank in a month that still looks profitable on paper.",
    },
    {
      question: "What is a 13-week cash flow forecast?",
      answer:
        "A weekly list, for the next thirteen weeks, of the cash you expect in and the bills you have already committed to pay. It shows the week the balance gets thin while you still have time to collect, delay a purchase, or change a term.",
    },
    {
      question: "What should a small business not cut to save cash?",
      answer:
        "Do not cut the step that creates the next invoice or collects the current one, if you can trace it to cash. Cut unused tools, stock without a buyer, and projects you have not started. Then fix terms and deposits so the gap does not repeat.",
    },
  ],
  related: ["how-to-price-a-service-business", "where-to-invest-next-dollar", "how-to-find-the-bottleneck"],
};

export default guide;

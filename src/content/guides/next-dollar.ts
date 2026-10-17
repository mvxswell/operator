import type { Guide } from "./types";

const guide: Guide = {
  slug: "where-to-invest-next-dollar",
  skill: "resource",
  title: "How to Allocate a Limited Budget",
    description:
      "Put the next dollar on the constraint. Compare return, how fast cash comes back, and the cost of being wrong. Ignore sunk spend. Keep a buffer for payroll.",
  answer:
    "Compare the real options on return, how fast cash comes back, and what happens if you are wrong. Fund the constraint first. Money already spent is not a reason to spend more. Keep a buffer so one bet cannot stop payroll.",
  blocks: [
    { type: "h2", text: "Name the dollars and the options" },
    {
      type: "p",
      text: "A limited budget is a list, not a mood. Write the cash you can spend without touching payroll, taxes, and the buffer you refuse to go below. Then write the options actually in front of you this month. \"Invest in growth\" is not an option. A second technician, a $6,000 ad test, a new oven, and paying down a line of credit are options. If an option is not specific enough to have a cost and a result, it is not ready for the list.",
    },
    {
      type: "p",
      text: "Include doing nothing as a line. Holding cash has a result: you can say yes later, and you survive a slow month. It loses to a clear, high-return use of the same dollar. It beats a vague project.",
    },
    { type: "h2", text: "Score return, payback, and risk" },
    {
      type: "p",
      text: "Return is the gross profit or the cost you stop paying, over a period you state, compared with the dollars you put in. Payback is how many weeks until the cash you spent is back in the account, not until the idea \"feels worth it.\" Risk is what you lose if the bet is wrong, and whether you can undo it. A tool you can resell is a different risk from a build-out you cannot.",
    },
    {
      type: "p",
      text: "Use ranges if you are unsure. \"This hire adds between four and eight jobs a month at this margin\" is a decision. A single heroic number is a wish. If two options are close, prefer the one with faster payback and a smaller undo cost. You can fund the slower one after the first has proved itself.",
    },
    { type: "h2", text: "Fund the constraint first" },
    {
      type: "p",
      text: "The next dollar belongs on the step that limits finished, paid work. If sold jobs are waiting on install, a marketing push adds promises. If the phone is quiet and the crew has slack, a new truck adds a payment. Find the queue that grows, then ask which option on your list makes that queue move. The [bottleneck guide](/guides/how-to-find-the-bottleneck) is the measurement. Allocation without it is how budgets follow whoever presented last.",
    },
    {
      type: "p",
      text: "Sometimes the constraint is cash itself: you are profitable and still late on bills because customers pay slowly. In that case the \"investment\" may be a deposit policy or a shorter term, which costs political effort rather than cash. Do not spend the buffer to avoid a collections conversation.",
    },
    { type: "h2", text: "Watch the sunk-cost trap" },
    {
      type: "p",
      text: "Money you already spent is gone. It does not make the next dollar smarter. A half-built feature, a lease you regret, or a campaign that has not produced a qualified conversation does not deserve a top-up just so the first spend \"was not wasted.\" Ask whether you would start this project today if the past checks had never been written. If you would not, stop. The embarrassment is cheaper than the next invoice.",
    },
    {
      type: "p",
      text: "The same trap shows up as loyalty to a tool or a hire that is not the constraint. Keeping a spend because people are used to it is a choice. Price it against the option you are not funding. Someone will be disappointed. The budget is disappointed either way.",
    },
    { type: "h2", text: "Keep a buffer on purpose" },
    {
      type: "p",
      text: "Before the list gets a dollar, set aside the cash that covers a shock: a payroll cycle, a tax payment, a repair that stops production. The size is your call. The rule is that this pile is not an investment account you raid for a good story. A project that only works if the buffer is empty does not work. It borrows from next month's survival.",
    },
    {
      type: "panel",
      items: [
        "Cash you can spend after payroll, taxes, and the buffer.",
        "The constraint this dollar is supposed to move.",
        "Return, payback in weeks, and what you lose if you are wrong.",
        "Whether you would fund it if past spending did not exist.",
        "The date you will stop if the result is not there.",
      ],
    },
    { type: "h2", text: "Put a stop date on every bet" },
    {
      type: "p",
      text: "Each funded option gets a review date and a result you can count. Jobs completed, qualified conversations, days of backlog, interest saved. On that date, continue, adjust once, or stop. Open-ended spends feel small each month and become the budget. A stop date is how a limited budget stays limited.",
    },
    {
      type: "p",
      text: "If the winner of the comparison is a hire, read [when to hire](/guides/when-to-hire-your-first-employee) so the seat matches the gap. If the winner is a price change, that spends no cash and often returns more than a tool. Do not skip a free move because the list in front of you is full of things to buy.",
    },
    { type: "h2", text: "Try the call" },
    { type: "scenario" },
  ],
  scenario: {
    industry: "HVAC services",
    scenario:
      "You have $50,000 you can deploy after keeping a payroll buffer. Signed work not yet installed is about $600,000. The install schedule is five weeks behind. Crews are fully booked. Leads are up, and the close rate is healthy. A salesperson wants a bigger ad budget. You already spent $12,000 on a website redesign that is half finished.",
    prompt: "Where should the next dollars go?",
    choices: [
      { id: "a", text: "Increase advertising to match the rise in leads" },
      { id: "b", text: "Hire another salesperson" },
      { id: "c", text: "Add install capacity so the signed work can get finished" },
      { id: "d", text: "Finish the website because you already spent $12,000" },
    ],
    correctChoiceId: "c",
    explanation:
      "The queue of paid work is stuck on install, and the crews are full. More leads or another seller adds to a backlog you cannot serve. The website spend is gone either way; it does not outrank the constraint.",
  },
  faqs: [
    {
      question: "How should a small business allocate a limited budget?",
      answer:
        "List the cash you can spend after payroll, taxes, and a buffer. Compare specific options on return, payback, and the cost of being wrong. Put the money on the step that limits finished work. Give every bet a date when you will stop if the result is missing.",
    },
    {
      question: "What is the sunk-cost trap?",
      answer:
        "Spending more because you already spent some. The past dollar is gone. Ask whether you would start the project today with a clean account. If you would not, stopping is the allocation.",
    },
    {
      question: "How much cash should you keep before investing?",
      answer:
        "Enough to cover a shock you can name, such as a payroll cycle, a tax date, or a repair that stops work. The exact amount is yours. A project that requires emptying that buffer is a bet against next month, not an investment.",
    },
  ],
  related: ["when-to-hire-your-first-employee", "how-to-find-the-bottleneck", "how-to-prioritize"],
};

export default guide;

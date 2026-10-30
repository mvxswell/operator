import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-price-a-service-business",
  skill: "financial",
  title: "How to Price a Service Business",
    description:
      "Price a service from hours you can sell and the pay you must cover, then check the market and the job's worth. A near-perfect close rate means the price is low.",
  answer:
    "Price from the hours you can actually sell and the pay the business has to cover, then check that number against what buyers pay and what the job is worth to them. If nearly everyone says yes, the price is a discount.",
  blocks: [
    { type: "h2", text: "Three ways to look at a price" },
    {
      type: "p",
      text: "Cost-plus starts from what the hour costs you and adds a margin. It keeps you from working at a loss and ignores what the buyer compares you with. Market pricing starts from what similar buyers already pay. It keeps you in the conversation and ignores whether your costs fit that number. Value pricing starts from what the result is worth to this buyer: the revenue you add, the hire they avoid, the fine they dodge. It can support a higher price and collapses when you cannot describe the result.",
    },
    {
      type: "p",
      text: "Use all three as checks. Cost-plus sets the floor. Market price tells you if the floor is even in the market. Value tells you whether a specific job can sit above the market because the stakes are higher. A price that fails the floor is a donation. A price that ignores the market is a lecture. A price that claims value you cannot point to is a wish.",
    },
    { type: "h2", text: "Find the true cost of an hour" },
    {
      type: "p",
      text: "A year has far more hours than you can bill. Subtract vacation, admin, sales, rework, and the time you spend managing. Many solo service businesses land near a thousand to fourteen hundred billable hours, not two thousand. Use your own calendar, not a slogan. If you do not know the number, track four ordinary weeks and multiply.",
    },
    {
      type: "p",
      text: "Add what the business must pay: your target owner's pay, payroll if others deliver, rent, software, insurance, and the tools the job consumes. Divide that annual nut by billable hours. That is the cost of an hour before profit. If you want a margin on top, divide the hourly cost by one minus the margin. A 40% margin means dividing by 0.6, not adding 40% of cost. Adding 40% of cost is a smaller margin than owners usually mean.",
    },
    { type: "h2", text: "A worked example" },
    {
      type: "p",
      text: "These figures are an illustration for a one-person advisory practice, not a benchmark. Change every line to your books before you quote anyone.",
    },
    {
      type: "table",
      columns: ["Line", "Amount"],
      rows: [
        ["Target owner pay", "$120,000"],
        ["Overhead for the year", "$30,000"],
        ["Annual nut", "$150,000"],
        ["Billable hours you can defend", "1,200"],
        ["Cost per billable hour", "$125"],
        ["Price at a 40% margin", "$208"],
      ],
    },
    {
      type: "p",
      text: "The $208 is a floor for ordinary work, not a quote for every job. If the market for this kind of help clusters near $150, you do not have a pricing problem only. You have a cost problem, a niche problem, or both. If a single project saves a client a hire that would cost them $90,000, a fixed fee well above $208 an hour can be the honest price, as long as you can say what they are buying.",
    },
    { type: "h2", text: "Sell packages when the work repeats" },
    {
      type: "p",
      text: "Hourly billing punishes you for getting faster and invites the client to negotiate minutes. For work you have done enough times to know the shape, sell a package or a retainer: a named result, a scope boundary, and a price. Put the out-of-scope rate in the proposal so extras do not become free.",
    },
    {
      type: "p",
      text: "A retainer works when the client needs you on a cadence and you can describe the month: the meetings, the deliverable, the response window. It fails when it is a discount coupon for unlimited access. Unlimited is how your best hours get filled with their smallest questions.",
    },
    { type: "h2", text: "Test a higher price on purpose" },
    {
      type: "p",
      text: "Change price on new proposals first. Pick a number you can explain, often a step of ten to twenty percent, and use it for the next five to ten serious quotes. Track how many you win. You are looking for a change in the close rate and in who shows up, not for a feeling about one lost email.",
    },
    {
      type: "p",
      text: "A close rate near 100% on work you want is a warning, not a trophy. It means almost nobody is pushing back, which usually means the price sits below what the buyers were prepared to pay. Raise it until a meaningful share of qualified buyers say no, and until the nos are about fit or budget rather than confusion. If everyone says no, you jumped past the market or you are talking to the wrong buyers. Step back once and look at the offer before you panic.",
    },
    {
      type: "panel",
      items: [
        "Cost per billable hour: annual pay and overhead divided by hours you can actually sell.",
        "Floor price: that cost divided by one minus the margin you need.",
        "Market check: what similar buyers already pay for a comparable result.",
        "Value check: what this job saves or earns for this buyer, if you can point at it.",
      ],
    },
    { type: "h2", text: "Keep the floor visible" },
    {
      type: "p",
      text: "Discounting a single deal is fine when the scope shrinks with the price or when the client is a deliberate test. Discounting the standard offer because you are nervous trains the market and your future self. Write the floor on a card you can see while you quote. If a deal only works below the floor, the deal does not work.",
    },
    {
      type: "p",
      text: "Review the hourly cost twice a year, or when rent, wages, or your target pay change. Prices that were careful in a cheap year become generous by accident. The [raise prices guide](/guides/should-i-raise-prices/) covers how to move a price you already published.",
    },
    { type: "h2", text: "Try the call" },
    { type: "scenario" },
  ],
  scenario: {
    industry: "Bookkeeping firm",
    scenario:
      "You bill $90 an hour and win almost every proposal you send to businesses like your current clients. Your calendar is full. A four-week time log shows about 22 billable hours a week after admin and sales. Owner pay plus overhead needs $140,000 this year. You have been telling yourself the close rate proves the service is loved.",
    prompt: "What is the best pricing move?",
    choices: [
      { id: "a", text: "Hold $90. A high close rate means the price is right." },
      { id: "b", text: "Cut the price to fill the few open hours with more clients." },
      { id: "c", text: "Recompute the hourly floor from billable hours and the $140,000 nut, then raise new proposals toward it." },
      { id: "d", text: "Switch every client to unlimited retainers at the current hourly equivalent." },
    ],
    correctChoiceId: "c",
    explanation:
      "A full calendar and a near-perfect close rate mean buyers are not resisting. The floor has to be rebuilt from hours you can sell and the pay the firm must cover before you invent a new package.",
  },
  faqs: [
    {
      question: "How do service businesses set prices?",
      answer:
        "Divide the pay and overhead the business must cover by the hours you can actually bill. That cost is the floor. Check it against what similar buyers pay, and raise a specific job when you can point to the result it is worth. Use the three numbers together.",
    },
    {
      question: "What does a 100% close rate mean?",
      answer:
        "On work you want, it usually means the price is below what qualified buyers would pay. Raise new proposals in a deliberate step and watch how many still say yes. A healthy book includes some nos from people who can afford to choose.",
    },
    {
      question: "Should you charge hourly or use packages?",
      answer:
        "Hourly fits uncertain scope and early work you cannot yet estimate. Packages and retainers fit work you have done enough times to name the result and the boundary. Put an out-of-scope rate in writing so extras stay visible.",
    },
  ],
  related: ["should-i-raise-prices", "how-to-improve-cash-flow", "where-to-invest-next-dollar"],
};

export default guide;

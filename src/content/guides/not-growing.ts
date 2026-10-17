import type { Guide } from "./types";

const guide: Guide = {
  slug: "why-is-my-business-not-growing",
  skill: "bottleneck",
  title: "Why Is My Business Not Growing",
    description:
      "Growth stalls in one place: demand, conversion, capacity, delivery, retention, or you. Put one number on each and fix the branch that is actually stuck.",
  answer:
    "A business stops growing at a specific step, not everywhere at once. Walk demand, conversion, capacity, delivery, retention, and your own calendar. Put one number on each branch, and work the branch that is actually stuck.",
  blocks: [
    { type: "h2", text: "Stop collecting explanations" },
    {
      type: "p",
      text: "\"Not growing\" is a pile of stories: the market, the team, the website, the season, the competitor. Some of them are true and most of them are not the limit this quarter. Growth is a chain. More people hear about you, more of them buy, you have room to serve them, you deliver well enough that they stay, and you are not the person blocking every step. The chain's slowest link sets the pace. Fixing a healthy link feels productive and does not move revenue.",
    },
    {
      type: "p",
      text: "Give yourself one sitting to place the business on the tree below. Use the last ordinary quarter, not a holiday week and not a crisis week. If two branches look bad, ask which one, if it moved, would make the other matter. Empty demand makes a capacity project pointless. Full demand with a broken delivery makes a marketing project a way to disappoint more people.",
    },
    { type: "h2", text: "Demand: are enough of the right people showing up?" },
    {
      type: "p",
      text: "The metric is qualified conversations, not likes. Count leads or inbound requests that match the customer you can serve. If that number is flat or falling, and your close rate on the leads you do get is steady, you do not have a sales script problem. You have a demand problem. Look at whether the channel that used to work still reaches anyone, and whether you stopped doing the one activity that created conversations.",
    },
    {
      type: "p",
      text: "A demand problem is not a reason to try five channels this month. The [customer guide](/guides/how-to-get-more-customers) is about picking one test and measuring it. Adding spend while conversion or delivery is the real limit just buys a more expensive stall.",
    },
    { type: "h2", text: "Conversion: do the right people buy?" },
    {
      type: "p",
      text: "The metric is the share of qualified conversations that become a paid yes. If leads are steady and that share dropped, read the [sales guide](/guides/why-are-sales-down) before you buy more traffic. Split the path: showed up, got a proposal, signed. The step that fell is the work. A new logo does not repair a proposal that goes out a week late.",
    },
    { type: "h2", text: "Capacity: can you take the work if they say yes?" },
    {
      type: "p",
      text: "The metric is work you decline, delay past a promise, or quote with a start date so far out that people walk. If you are saying no to good jobs, growth is capped by hours, seats, machines, or cash to fund the job. More marketing makes that worse. The next move is the constraint: a hire, a second shift, a deposit policy, or a narrower offer that uses the capacity you have. See [where the bottleneck sits](/guides/how-to-find-the-bottleneck) before you add cost in the wrong place.",
    },
    { type: "h2", text: "Delivery: does the work earn the next sale?" },
    {
      type: "p",
      text: "The metric is rework, refunds, late jobs, or complaints per finished order. You can be \"fully booked\" and shrinking if every job creates a mess that eats the next week's capacity. Growth math that ignores rework double-counts your hours. Fix the handoff that creates the redo before you celebrate a full calendar.",
    },
    { type: "h2", text: "Retention: do customers come back or send anyone?" },
    {
      type: "p",
      text: "The metric is repeat purchase, renewal, or referred conversations, whichever matches how you actually get the second sale. A leaky bucket with a strong first sale looks like a marketing problem and is a delivery or fit problem. If new logos are up and revenue is flat, count how many older customers went quiet. Winning them back is often cheaper than finding a stranger, and it tells you what the offer is missing.",
    },
    { type: "h2", text: "The owner as the bottleneck" },
    {
      type: "p",
      text: "The metric is decisions or approvals waiting on you, and how many days they wait. If estimates, hires, prices, and exceptions all sit in your inbox, the business is the size of your reply time. That stall hides inside every other branch. A full pipeline that waits on your proposal is a conversion problem with your name on it. Crews with slack who wait on your dispatch are a capacity problem with your name on it.",
    },
    {
      type: "p",
      text: "The move is a limit you write down: which decisions someone else can make, up to what dollar amount, and what you still must see. Then take those items off your plate for a month and watch the queue. If it drains, you were the constraint. If it does not, the tree was right and the limit is elsewhere.",
    },
    { type: "h2", text: "Work one branch" },
    {
      type: "panel",
      items: [
        "Demand — qualified conversations per week.",
        "Conversion — share of those conversations that pay.",
        "Capacity — good work you turn away or push out.",
        "Delivery — rework, lateness, or refunds per finished job.",
        "Retention — repeat, renewal, or referred conversations.",
        "Owner — items waiting on you, and the age of the oldest.",
      ],
    },
    {
      type: "p",
      text: "Pick the worst branch, name the number, and run one change that should move it. Review in two weeks. Adding a second project before the number moves is how a stall becomes a strategy deck.",
    },
    { type: "h2", text: "Try the call" },
    { type: "scenario" },
  ],
  scenario: {
    industry: "Specialty bakery",
    scenario:
      "Revenue has been flat for two quarters. Wholesale inquiries are up, and you decline most of them because the oven is booked by the retail counter every morning. Retail customers still come, refunds are rare, and a regular mentioned that the Saturday line made her stop coming weekly. Your manager wants a new logo and a delivery app.",
    prompt: "What is the growth constraint?",
    choices: [
      { id: "a", text: "Demand, because you need the logo and the app to be seen" },
      { id: "b", text: "Oven capacity in the morning, because paid wholesale is being turned away" },
      { id: "c", text: "Retention, because one regular comes less often" },
      { id: "d", text: "Conversion, because inquiries are up and revenue is not" },
    ],
    correctChoiceId: "b",
    explanation:
      "Inquiries you decline are demand you already have. The oven calendar is what caps finished goods. A logo does not add a bake cycle, and one quieter regular is a note, not the branch that explains the flat quarter.",
  },
  faqs: [
    {
      question: "Why is my small business not growing?",
      answer:
        "Usually one link is stuck: not enough qualified demand, a weak close, no room to take the work, delivery that creates rework, customers who do not come back, or every decision waiting on the owner. Measure one number per link and work the worst one.",
    },
    {
      question: "Should I market more if revenue is flat?",
      answer:
        "Market more when qualified conversations are the scarce thing and you can still deliver. If you are already turning away good work, or every job creates a redo, more marketing spends money to worsen the stall.",
    },
    {
      question: "Can the owner be the reason a company stalls?",
      answer:
        "Yes, when prices, schedules, and exceptions wait on one person. Count how many items sit with you and how old they are. Hand off a written limit for a month. If the queue drains, the constraint was the owner's desk.",
    },
  ],
  related: ["how-to-find-the-bottleneck", "why-are-sales-down", "how-to-get-more-customers"],
  extraLinks: [{ href: "/operator", label: "Take the Operator Test" }],
};

export default guide;

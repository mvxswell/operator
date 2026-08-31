import type { Question } from "@/lib/types";

export const PRIORITIZATION_QUESTIONS: Question[] = [
  {
    id: "pri-01",
    mode: "standard",
    category: "prioritization",
    subskill: "blocking vs non-blocking",
    industry: "Coffee shop",
    difficulty: 1,
    scenario:
      "It is 7:15am, your busiest hour. The espresso machine just stopped working, you are low on napkins, and this week's Instagram post is not written.",
    prompt: "What do you handle first?",
    choices: [
      { id: "a", text: "Write the Instagram post" },
      { id: "b", text: "Get the espresso machine working" },
      { id: "c", text: "Order more napkins" },
      { id: "d", text: "Update the menu board pricing" },
    ],
    correctChoiceId: "b",
    explanation:
      "The machine blocks nearly all revenue during your highest-volume hour. Everything else can wait a few hours at almost no cost.",
  },
  {
    id: "pri-02",
    mode: "standard",
    category: "prioritization",
    subskill: "idle resources first",
    industry: "Landscaping",
    difficulty: 1,
    scenario:
      "A four-person crew is parked in the yard waiting for you to tell them which site to go to. You are in the middle of reviewing logo concepts for a rebrand.",
    prompt: "What should you do?",
    choices: [
      { id: "a", text: "Finish the logo review, then dispatch the crew" },
      { id: "b", text: "Dispatch the crew immediately, then return to the logo" },
      { id: "c", text: "Ask the crew to pick a site themselves and keep reviewing" },
      { id: "d", text: "Send the crew home and restart tomorrow" },
    ],
    correctChoiceId: "b",
    explanation:
      "Four idle people cost real money every minute. The rebrand has no deadline attached to it today.",
  },
  {
    id: "pri-03",
    mode: "standard",
    category: "prioritization",
    subskill: "blast radius",
    industry: "B2B SaaS",
    difficulty: 2,
    scenario:
      "Three items landed this morning. A visual glitch affects about 3% of users. A checkout bug stops 100% of new signups from paying. Your largest customer asked for a reporting feature.",
    prompt: "What gets worked on first?",
    choices: [
      { id: "a", text: "The reporting feature, to protect the largest account" },
      { id: "b", text: "The visual glitch, since it is quick" },
      { id: "c", text: "The checkout bug" },
      { id: "d", text: "Split the team across all three" },
    ],
    correctChoiceId: "c",
    explanation:
      "The checkout bug stops every new dollar from entering the business. It is both the widest blast radius and the only one actively compounding.",
  },
  {
    id: "pri-04",
    mode: "standard",
    category: "prioritization",
    subskill: "time-boxed windows",
    industry: "Garden center",
    difficulty: 2,
    scenario:
      "You are three weeks from the spring rush, which produces 60% of your annual revenue. Your options are to hire and train seasonal staff, remodel the checkout counter, renegotiate a supplier contract that renews in November, or rebuild the website.",
    prompt: "What should you do now?",
    choices: [
      { id: "a", text: "Hire and train seasonal staff" },
      { id: "b", text: "Remodel the checkout counter" },
      { id: "c", text: "Renegotiate the November supplier contract" },
      { id: "d", text: "Rebuild the website" },
    ],
    correctChoiceId: "a",
    explanation:
      "Only one of these has a window that closes. Staffing must be done before the rush; the other three are equally available in June.",
  },
  {
    id: "pri-05",
    mode: "standard",
    category: "prioritization",
    subskill: "effort vs impact",
    industry: "Online retailer",
    difficulty: 3,
    scenario: "Four proposals are on the table, each estimated by the same team:",
    data: {
      columns: ["Initiative", "Effort", "Annual impact"],
      rows: [
        { label: "Rebuild the mobile checkout", values: ["3 weeks", "+$420,000"] },
        { label: "New loyalty program", values: ["10 weeks", "+$500,000"] },
        { label: "Warehouse layout redesign", values: ["6 weeks", "+$180,000"] },
        { label: "Brand refresh", values: ["8 weeks", "Not estimated"] },
      ],
    },
    prompt: "What should the team do first?",
    choices: [
      { id: "a", text: "The loyalty program, because it has the largest impact" },
      { id: "b", text: "The mobile checkout rebuild" },
      { id: "c", text: "The warehouse redesign, because operations underpins everything" },
      { id: "d", text: "The brand refresh, because it improves all other efforts" },
    ],
    correctChoiceId: "b",
    explanation:
      "Checkout returns about $140,000 per week of effort versus $50,000 for the loyalty program. Doing it first also frees the team sooner to attempt the second item.",
  },
  {
    id: "pri-06",
    mode: "standard",
    category: "prioritization",
    subskill: "compounding problems",
    industry: "Boutique hotel",
    difficulty: 3,
    scenario:
      "Four issues are open: the lobby carpet is dated, online reviews have slipped from 4.6 to 4.1 over two months, the breakfast vendor raised prices 8%, and your booking engine takes six clicks to reserve a room.",
    prompt: "Which deserves attention first?",
    choices: [
      { id: "a", text: "The dated lobby carpet" },
      { id: "b", text: "The 8% breakfast cost increase" },
      { id: "c", text: "The slide in review scores" },
      { id: "d", text: "The six-click booking flow" },
    ],
    correctChoiceId: "c",
    explanation:
      "Review scores drive future bookings, so the damage compounds every week it continues. The other three are real but static costs.",
  },
  {
    id: "pri-07",
    mode: "standard",
    category: "prioritization",
    subskill: "deciding what not to do",
    industry: "Consumer products",
    difficulty: 4,
    scenario:
      "You sell three product lines. Line A is 70% of revenue and growing. Line B is 25% and flat. Line C is 5%, shrinking, and consumes roughly 40% of your operations team's time because of its custom packaging.",
    prompt: "What is the strongest move?",
    choices: [
      { id: "a", text: "Increase marketing on Line C to revive it" },
      { id: "b", text: "Discontinue or spin off Line C and redeploy the freed time" },
      { id: "c", text: "Hire an operations person dedicated to Line C" },
      { id: "d", text: "Raise Line C prices to cover the extra effort" },
    ],
    correctChoiceId: "b",
    explanation:
      "Line C consumes 40% of your operating capacity to produce 5% of revenue, and it is declining. Killing it is the cheapest way to buy capacity for the line that is actually growing.",
  },
  {
    id: "pri-08",
    mode: "standard",
    category: "prioritization",
    subskill: "urgent vs important",
    industry: "Accounting firm",
    difficulty: 4,
    scenario:
      "Your team spends about 12 hours a week chasing clients for missing documents. There is also a backlog of 30 returns due in two weeks. You have one week of your own time to invest.",
    prompt: "What is the best use of that week?",
    choices: [
      { id: "a", text: "Personally prepare returns to clear the backlog" },
      { id: "b", text: "Build an intake checklist and automated document reminders" },
      { id: "c", text: "Hire a temporary preparer for the season" },
      { id: "d", text: "Extend office hours through the deadline" },
    ],
    correctChoiceId: "b",
    explanation:
      "The 12 hours a week lost to chasing documents is the recurring cause of the backlog. Fixing intake pays back within the same season and every season after; preparing returns yourself buys one week only.",
  },
  {
    id: "pri-09",
    mode: "standard",
    category: "prioritization",
    subskill: "sequencing dependencies",
    industry: "Franchise restaurant",
    difficulty: 5,
    scenario:
      "You plan to open four new locations this year. Your existing three locations run on undocumented processes that vary store to store, and your best general manager is the only person who can train new staff.",
    prompt: "What should happen first?",
    choices: [
      { id: "a", text: "Sign the four leases while good sites are available" },
      { id: "b", text: "Document and standardize operations, and build a second trainer" },
      { id: "c", text: "Open one location and learn from it before the other three" },
      { id: "d", text: "Raise capital so all four can open simultaneously" },
    ],
    correctChoiceId: "b",
    explanation:
      "Expansion copies whatever system you have. With undocumented processes and a single trainer, opening first guarantees four inconsistent stores and one exhausted manager.",
  },
  {
    id: "pri-10",
    mode: "standard",
    category: "prioritization",
    subskill: "owner opportunity cost",
    industry: "Professional services",
    difficulty: 5,
    scenario:
      "You bill at $300 an hour and the firm is at capacity. You currently spend eight hours a week on bookkeeping. A bookkeeper costs $45 an hour and would need about ten hours a week. You are also the only person who can close new engagements, and demand exceeds what you can close.",
    prompt: "What should you do?",
    choices: [
      { id: "a", text: "Keep bookkeeping in-house to protect margin" },
      { id: "b", text: "Hire the bookkeeper and move that time to closing engagements" },
      { id: "c", text: "Hire the bookkeeper and use the time to reduce your hours" },
      { id: "d", text: "Buy accounting software and keep doing it yourself faster" },
    ],
    correctChoiceId: "b",
    explanation:
      "Eight hours of your time is worth $2,400 against $450 of bookkeeper cost. The reason it is clearly correct here is that demand exceeds your closing capacity, so the freed hours convert directly into revenue.",
  },
  {
    id: "pri-11",
    mode: "standard",
    category: "prioritization",
    subskill: "reversible vs irreversible",
    industry: "Software startup",
    difficulty: 6,
    scenario:
      "Your team must decide four things this quarter: which analytics vendor to use, whether to sign a five-year office lease, what to name the second product, and which pricing page layout to ship.",
    prompt: "Which decision deserves the most deliberation time?",
    choices: [
      { id: "a", text: "The analytics vendor" },
      { id: "b", text: "The five-year office lease" },
      { id: "c", text: "The second product's name" },
      { id: "d", text: "The pricing page layout" },
    ],
    correctChoiceId: "b",
    explanation:
      "Deliberation should scale with how hard a decision is to undo. Vendors can be switched, names changed, and layouts tested cheaply; a five-year lease locks in cost and location through several plausible futures.",
  },
  {
    id: "pri-12",
    mode: "standard",
    category: "prioritization",
    subskill: "signal vs noise",
    industry: "Subscription box",
    difficulty: 6,
    scenario:
      "One prominent customer posted a detailed public complaint about your packaging and it is getting attention internally. Separately, your month-two retention has drifted from 71% to 64% over five months without anyone raising it.",
    prompt: "Where should leadership put its attention?",
    choices: [
      { id: "a", text: "The public complaint, since visible reputation issues spread fastest" },
      { id: "b", text: "The retention decline" },
      { id: "c", text: "Neither — both are within normal variation" },
      { id: "d", text: "Redesign packaging, which addresses both at once" },
    ],
    correctChoiceId: "b",
    explanation:
      "One loud data point is an anecdote; a seven-point retention slide across five months is a trend that silently resets the value of every customer you acquire. Answer the complaint, but do not let it set the agenda.",
  },
];

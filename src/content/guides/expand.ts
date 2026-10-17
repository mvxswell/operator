import type { Guide } from "./types";

const guide: Guide = {
  slug: "should-you-expand",
  skill: "strategy",
  title: "How to Decide Whether to Expand to a New Location or Market",
    description:
      "Expand when the offer runs without you, someone else can run a normal day, and cash covers a slow start. Test small, and write the numbers that make you stop.",
  answer:
    "Expand when the current business is repeatable without you on site, someone else can run a day, and you can fund a slow start. Test a slice of the new place before you sign a long lease. Write the results that would make you stop.",
  blocks: [
    { type: "h2", text: "A second site copies the first, including the holes" },
    {
      type: "p",
      text: "A new location or a new market feels like growth because it is visible. It is a copy of your operating system in a place that does not know you, with cash going out before the habit of buying is proven. If the first site still depends on you to price, schedule, and rescue quality, the second site will depend on you too, in a different zip code. Fix the system you would be copying before you pay rent on it.",
    },
    {
      type: "p",
      text: "Demand in the new place is a separate question from whether you are bored with the old one. Boredom is a reason to change the owner's job. It is a weak reason to sign a lease.",
    },
    { type: "h2", text: "A readiness check" },
    {
      type: "p",
      text: "You want three things true at the same time. Miss one, and the honest move is to wait or to run a smaller test.",
    },
    {
      type: "panel",
      items: [
        "The core offer is repeatable: a written way to deliver, a check at the handoff, and quality that holds when you are not in the room.",
        "Management depth: at least one person who can run a normal day at the current site without calling you for ordinary decisions.",
        "Cash runway: enough to cover the new site's costs through a slow ramp, without starving payroll at the site that already works.",
      ],
    },
    {
      type: "p",
      text: "Runway is not optimism. List rent, people, inventory, and marketing for the months until a cautious revenue guess covers them. Add a buffer for the month you were wrong. If that number empties the account that protects the first site, you are betting the company, not opening a branch.",
    },
    { type: "h2", text: "Test before you commit the big fixed cost" },
    {
      type: "p",
      text: "A lease, a build-out, and a full crew are the expensive way to learn that the neighborhood does not buy what you sell. Cheaper tests exist for most businesses. Pop up inside a complementary shop. Serve the new area from the current kitchen or shop on set days. Sell to a handful of design-partner customers in the new market before you hire there. The test should resemble the real offer closely enough that a yes means something.",
    },
    {
      type: "p",
      text: "Define the test in advance: how many paying customers, at what margin, over what period, would justify the fixed cost. Also define the number that means stop. A test without a stop rule becomes a hobby you keep funding because you already announced it.",
    },
    { type: "h2", text: "Write kill criteria" },
    {
      type: "p",
      text: "Kill criteria are the results that end the experiment while you can still exit. Examples you fill with your own figures: fewer than a set number of repeat buyers after the trial period, gross margin below the floor you need once local wages are in, or a management load that pulls you off the original site more than a set number of days a week. Write them down where a partner can see them. The point is to decide while you are calm.",
    },
    {
      type: "p",
      text: "A kill is not a confession that expansion was foolish. It is the information the test was for. Closing a pop-up is cheap. Carrying a quiet second lease for a year because stopping would be embarrassing is the expensive version of the same fact.",
    },
    { type: "h2", text: "Protect the core while you learn" },
    {
      type: "p",
      text: "The original site funds the lesson. Name who runs it on the weeks you are in the new market. Give them the limits they need so ordinary problems do not follow you down the highway. If quality or cash at home slips, pause the expansion. A second site that damages the first is not a portfolio. It is a distraction with rent.",
    },
    {
      type: "p",
      text: "Hire in the new place for the bottleneck you can already describe, not for a miniature of your whole staff. If the test is \"will people buy,\" you need a way to sell and a way to deliver the promise, not a full back office. Shared admin from the first site is usually the right shape until the new revenue can carry its own.",
    },
    { type: "h2", text: "Market versus location" },
    {
      type: "p",
      text: "A new customer type can be as heavy as a new address. Selling to enterprises when you have only sold to local owners, or to consumers when you have only sold to contractors, changes the sales cycle, the terms, and the delivery proof they expect. Treat that as an expansion: test with a few buyers, keep the old offer healthy, and set a date to continue or stop. Do not quietly become a different company in the footnotes of a proposal.",
    },
    { type: "h2", text: "Try the call" },
    { type: "scenario" },
  ],
  scenario: {
    industry: "Specialty coffee",
    scenario:
      "Your shop is profitable and the Saturday line is long. You are still the person who adjusts the roast and approves every schedule. A landlord offers a second corner two neighborhoods away, with a build-out allowance and a five-year lease. You have not run a month of service there. Cash would cover about four months of the new shop's costs if sales start slowly. Your shift lead can open the current shop but calls you for anything unusual.",
    prompt: "What is the best decision?",
    choices: [
      { id: "a", text: "Sign the five-year lease. The Saturday line proves the brand is ready." },
      { id: "b", text: "Decline the lease and run a short test in that neighborhood with a stop rule, while the lead learns ordinary decisions." },
      { id: "c", text: "Sign, and split your week evenly so both shops get you." },
      { id: "d", text: "Take a larger space than offered so the second shop can be the flagship." },
    ],
    correctChoiceId: "b",
    explanation:
      "The offer is not yet repeatable without you, the lead cannot run an unusual day, and four months of cash is a thin runway for a five-year commitment. A bounded test buys the lesson without betting the first shop.",
  },
  faqs: [
    {
      question: "When should a business open a second location?",
      answer:
        "When the current offer runs to a written standard without you on site, someone else can handle an ordinary day, and cash covers a slow ramp without draining the first location. A long line or a full Saturday is demand. It is not, by itself, a second lease.",
    },
    {
      question: "How do you test a new market without a big lease?",
      answer:
        "Sell the real offer in a cheaper form: a pop-up, set days of delivery into the area, or a few design-partner customers. Decide in advance how many paying, repeating buyers would justify the fixed cost, and what result means you stop.",
    },
    {
      question: "What are kill criteria for an expansion?",
      answer:
        "Numbers you choose before you start that end the test: too few repeat buyers, margin below your floor after local costs, or a management load that damages the original business. Writing them early is what makes stopping possible.",
    },
  ],
  related: ["should-i-raise-prices", "when-to-hire-your-first-employee", "where-to-invest-next-dollar"],
};

export default guide;

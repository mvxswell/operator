import type { Question } from "@/lib/types";

export const STRATEGY_QUESTIONS: Question[] = [
  {
    id: "str-01",
    mode: "standard",
    category: "strategy",
    subskill: "where to compete",
    industry: "Independent bookstore",
    difficulty: 1,
    scenario:
      "A national chain opened nearby and prices every title 25% below you. You cannot match their buying power.",
    prompt: "What is the sound strategic response?",
    choices: [
      { id: "a", text: "Match their prices to keep customers" },
      { id: "b", text: "Compete on something they cannot copy, such as curation, events and community" },
      { id: "c", text: "Cut staff to fund lower prices" },
      { id: "d", text: "Reduce hours to save money until they leave" },
    ],
    correctChoiceId: "b",
    explanation:
      "Fighting on the one dimension where your opponent is structurally stronger is a losing plan. Strategy is choosing a field where your advantages count.",
  },
  {
    id: "str-02",
    mode: "standard",
    category: "strategy",
    subskill: "concentration risk",
    industry: "Contract manufacturing",
    difficulty: 1,
    scenario:
      "One customer is 70% of your revenue. They are happy, growing, and pay on time. Their contract renews annually.",
    prompt: "How should you think about this?",
    choices: [
      { id: "a", text: "It is fine as long as the relationship is healthy" },
      { id: "b", text: "It is a serious risk, and diversifying should start now while you are strong" },
      { id: "c", text: "You should raise their prices to capture more of the relationship" },
      { id: "d", text: "You should ask them to sign a longer contract and stop worrying" },
    ],
    correctChoiceId: "b",
    explanation:
      "A single decision by someone outside your company could remove 70% of your revenue. The time to diversify is while you are healthy and have the leverage to be selective.",
  },
  {
    id: "str-03",
    mode: "standard",
    category: "strategy",
    subskill: "focus over breadth",
    industry: "SaaS startup",
    difficulty: 2,
    scenario:
      "Your product serves dentists, law firms and gyms. Dentists are 15% of customers, renew at 91%, and refer others. The other two segments renew at about 55% and demand constant custom work.",
    prompt: "What should you do?",
    choices: [
      { id: "a", text: "Build features for all three to broaden the market" },
      { id: "b", text: "Concentrate the product and go-to-market on dentists" },
      { id: "c", text: "Raise prices on the low-retention segments" },
      { id: "d", text: "Keep the mix; concentration is risky" },
    ],
    correctChoiceId: "b",
    explanation:
      "One segment retains, refers and asks for less. Spreading a small team across three markets means being mediocre in all of them instead of dominant in the one that already works.",
  },
  {
    id: "str-04",
    mode: "standard",
    category: "strategy",
    subskill: "deepen versus expand",
    industry: "Regional coffee chain",
    difficulty: 2,
    scenario:
      "You have six stores in one metro. Same-store sales are growing 9% a year and all six are profitable. You could open three stores in a new city 200 miles away, or three more in your existing metro.",
    prompt: "Which is the lower-risk path to the same growth?",
    choices: [
      { id: "a", text: "The new city, to avoid competing with your own stores" },
      { id: "b", text: "The existing metro, where brand, supply and management already work" },
      { id: "c", text: "Split them, opening in both" },
      { id: "d", text: "Neither; grow only through existing stores" },
    ],
    correctChoiceId: "b",
    explanation:
      "In your own metro you reuse brand awareness, supply routes and a management team that can physically visit. A distant city asks you to rebuild all three at once, which is a different and much larger bet.",
  },
  {
    id: "str-05",
    mode: "standard",
    category: "strategy",
    subskill: "segment economics",
    industry: "Equipment rental",
    difficulty: 3,
    scenario: "Trailing twelve months by customer segment:",
    data: {
      columns: ["Segment", "Revenue", "Gross margin", "Growth"],
      rows: [
        { label: "Large contractors", values: ["$5.2M", "22%", "+3%"] },
        { label: "Small contractors", values: ["$2.1M", "41%", "+28%"] },
        { label: "Homeowners", values: ["$0.9M", "38%", "+2%"] },
      ],
      note: "All three segments use the same fleet and branches.",
    },
    prompt: "Where should the next investment go?",
    choices: [
      { id: "a", text: "Large contractors, the biggest revenue base" },
      { id: "b", text: "Small contractors" },
      { id: "c", text: "Homeowners, for brand visibility" },
      { id: "d", text: "Spread investment proportionally to current revenue" },
    ],
    correctChoiceId: "b",
    explanation:
      "Small contractors combine the highest margin with by far the fastest growth on shared assets. The largest segment is the least profitable and barely moving.",
  },
  {
    id: "str-06",
    mode: "standard",
    category: "strategy",
    subskill: "durable advantage",
    industry: "Consumer app",
    difficulty: 3,
    scenario:
      "Your best-performing feature was copied by a larger competitor within seven weeks of launch. Your team wants to build the next feature faster to stay ahead.",
    prompt: "What is the better strategic question?",
    choices: [
      { id: "a", text: "How do we ship features faster than they can copy them?" },
      { id: "b", text: "What advantage do we have that copying a feature does not transfer?" },
      { id: "c", text: "Should we patent our features?" },
      { id: "d", text: "How do we price below them to hold users?" },
    ],
    correctChoiceId: "b",
    explanation:
      "A feature race against a bigger company is a race you lose on resources. Advantages that survive copying — data, network effects, distribution, switching costs, brand — are what a strategy has to be built on.",
  },
  {
    id: "str-07",
    mode: "standard",
    category: "strategy",
    subskill: "build versus buy",
    industry: "E-commerce",
    difficulty: 4,
    scenario:
      "Third-party fulfillment costs you $6.40 per order at 40,000 orders a month. Your own warehouse would cost $1.9M up front and about $4.10 per order, and would take a year to reach full efficiency. Your order volume has swung between 22,000 and 55,000 a month over the past year.",
    prompt: "What matters most in this decision?",
    choices: [
      { id: "a", text: "The $2.30 per order saving, worth about $1.1M a year at current volume" },
      { id: "b", text: "Whether your volume floor is high enough to carry the fixed cost in a bad year" },
      { id: "c", text: "Whether owning fulfillment improves delivery speed" },
      { id: "d", text: "Whether you can raise the $1.9M" },
    ],
    correctChoiceId: "b",
    explanation:
      "Converting variable cost into fixed cost is a bet on your worst month, not your average one. At 22,000 orders the same fixed base has to be absorbed by far fewer units, which is where this decision is actually decided.",
  },
  {
    id: "str-08",
    mode: "standard",
    category: "strategy",
    subskill: "sequencing expansion",
    industry: "Restaurant",
    difficulty: 4,
    scenario:
      "Your single location does $2.4M a year with 9% net margin, and you personally solve problems most days. An investor offers to fund three more locations immediately on attractive terms.",
    prompt: "What should you weigh most heavily?",
    choices: [
      { id: "a", text: "Whether the terms are the best you will be offered" },
      { id: "b", text: "Whether the business runs well without you in the building" },
      { id: "c", text: "Whether the new sites have enough foot traffic" },
      { id: "d", text: "Whether 9% margin is strong enough for the category" },
    ],
    correctChoiceId: "b",
    explanation:
      "Multi-unit operations replicate a system, not a person. If the current location depends on you being there daily, three more locations produce four struggling restaurants rather than four times the profit.",
  },
  {
    id: "str-09",
    mode: "standard",
    category: "strategy",
    subskill: "commoditization",
    industry: "IT hardware reseller",
    difficulty: 5,
    scenario:
      "Hardware margins have fallen from 18% to 6% over four years as buyers compare prices online. Your customers still call you for configuration advice, migration planning and support, which you provide free to win the hardware sale.",
    prompt: "What is the strategic move?",
    choices: [
      { id: "a", text: "Cut costs to stay profitable at 6% margin" },
      { id: "b", text: "Charge for the services and treat hardware as the low-margin attachment" },
      { id: "c", text: "Add more product lines to increase volume" },
      { id: "d", text: "Exit hardware entirely and become a pure consultancy" },
    ],
    correctChoiceId: "b",
    explanation:
      "The commoditized part is the box; the scarce part is the judgment you give away. Repricing around what customers actually cannot get elsewhere is what stops the margin slide.",
  },
  {
    id: "str-10",
    mode: "standard",
    category: "strategy",
    subskill: "sunk cost",
    industry: "Software company",
    difficulty: 5,
    scenario:
      "You have spent $1.8M and two years on a product. It has 40 customers, growth is flat, and finishing the roadmap would cost another $900,000. The same $900,000 spent on your profitable core product is expected to return roughly $2.5M.",
    prompt: "What should you do?",
    choices: [
      { id: "a", text: "Finish the product; abandoning it wastes the $1.8M already invested" },
      { id: "b", text: "Put the $900,000 into the core product" },
      { id: "c", text: "Split the money between both" },
      { id: "d", text: "Sell the new product line at any price to recover the investment" },
    ],
    correctChoiceId: "b",
    explanation:
      "The $1.8M is gone regardless of what you choose next. The only live question is where the next $900,000 earns most, and the core product is expected to return nearly three times the money.",
  },
  {
    id: "str-11",
    mode: "standard",
    category: "strategy",
    subskill: "second-order effects",
    industry: "Marketplace platform",
    difficulty: 6,
    scenario:
      "Raising your take rate from 12% to 18% would add roughly $9M of revenue next year with no immediate change in volume. Your largest sellers, who account for 55% of transactions, have publicly complained about fees and two competing marketplaces charge 10%.",
    prompt: "What is the central risk?",
    choices: [
      { id: "a", text: "Buyers will notice higher prices and shop elsewhere" },
      { id: "b", text: "The sellers who make the marketplace worth visiting have somewhere else to go" },
      { id: "c", text: "The revenue increase will attract regulatory attention" },
      { id: "d", text: "Support costs will rise with seller complaints" },
    ],
    correctChoiceId: "b",
    explanation:
      "A marketplace is only valuable because of its supply. The $9M is immediate and visible; the loss of concentrated sellers to a cheaper rival is delayed, gradual, and much harder to reverse once buyers follow them.",
  },
  {
    id: "str-12",
    mode: "standard",
    category: "strategy",
    subskill: "bounded bets under uncertainty",
    industry: "Consumer goods",
    difficulty: 6,
    scenario:
      "Your team is split on entering a new category. Optimists project $12M in three years; skeptics expect losses. Entry requires $4M and a dedicated team, no one has spoken with target buyers, and the projections rest on a single analyst report.",
    prompt: "What is the best decision?",
    choices: [
      { id: "a", text: "Commit the $4M; hesitation cedes the category to competitors" },
      { id: "b", text: "Decline; the disagreement shows the team lacks conviction" },
      { id: "c", text: "Fund a small bounded test that produces real evidence before the full commitment" },
      { id: "d", text: "Commission a second analyst report to settle the disagreement" },
    ],
    correctChoiceId: "c",
    explanation:
      "The disagreement is about facts nobody has gathered, and no report substitutes for contact with actual buyers. Spending a small fraction to convert the biggest unknown into evidence is what makes the $4M decision knowable.",
  },
];

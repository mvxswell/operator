import type { Question } from "@/lib/types";

export const FINANCIAL_QUESTIONS: Question[] = [
  {
    id: "fin-01",
    mode: "standard",
    category: "financial",
    subskill: "unit economics",
    industry: "Meal delivery",
    difficulty: 1,
    scenario:
      "Each meal box sells for $50. Food, packaging and delivery cost you $58 per box. Orders are growing quickly.",
    prompt: "What should you do?",
    choices: [
      { id: "a", text: "Push for more volume to spread costs" },
      { id: "b", text: "Fix the price or the cost before growing further" },
      { id: "c", text: "Raise the marketing budget to accelerate growth" },
      { id: "d", text: "Add more menu options to increase order size" },
    ],
    correctChoiceId: "b",
    work: [
      "Contribution per box = $50 selling price − $58 variable cost = −$8.",
      "At 100 more orders, that loss grows by another $800 before fixed costs.",
      "Make one order profitable first; only then does added volume help.",
    ],
    explanation:
      "You lose $8 on every box. Volume multiplies a loss rather than curing it, so the economics have to work on one unit first.",
  },
  {
    id: "fin-02",
    mode: "standard",
    category: "financial",
    subskill: "profit versus cash",
    industry: "Wholesale distribution",
    difficulty: 1,
    scenario:
      "Your P&L shows $80,000 of profit last quarter, but your bank balance fell. All of your customers pay on 60-day terms and sales grew 40%.",
    prompt: "What is the most likely explanation?",
    choices: [
      { id: "a", text: "The P&L is wrong" },
      { id: "b", text: "Growth tied up cash in unpaid invoices" },
      { id: "c", text: "Your margins are negative" },
      { id: "d", text: "Someone is stealing from the business" },
    ],
    correctChoiceId: "b",
    work: [
      "The P&L records revenue when customers are invoiced, not when they pay.",
      "With 60-day terms, the newest sales can sit in receivables for two months.",
      "Forty-percent growth therefore creates a larger cash gap even while reported profit rises.",
    ],
    explanation:
      "Profit is recorded when you invoice; cash arrives 60 days later. Fast growth means you fund more inventory and receivables before collecting, so a profitable quarter can still drain the bank.",
  },
  {
    id: "fin-03",
    mode: "standard",
    category: "financial",
    subskill: "gross margin",
    industry: "Furniture retail",
    difficulty: 2,
    scenario:
      "A chair sells for $400. It costs $260 landed. Your salesperson wants to discount it to $340 to close a hesitant customer.",
    prompt: "What does that discount do?",
    choices: [
      { id: "a", text: "Cuts gross profit from $140 to $80, a 43% reduction" },
      { id: "b", text: "Cuts gross profit by 15%, matching the discount" },
      { id: "c", text: "Leaves gross profit roughly unchanged" },
      { id: "d", text: "Turns the sale into a loss" },
    ],
    correctChoiceId: "a",
    work: [
      "Original gross profit = $400 − $260 = $140.",
      "Discounted gross profit = $340 − $260 = $80.",
      "Profit lost = $60 ÷ $140 = 42.9%, even though price fell only 15%.",
    ],
    explanation:
      "The discount comes entirely out of profit, not cost. A 15% price cut removed 43% of the gross profit on that chair.",
  },
  {
    id: "fin-04",
    mode: "standard",
    category: "financial",
    subskill: "discount and volume",
    industry: "Industrial supply",
    difficulty: 2,
    scenario:
      "Your gross margin is 30%. A customer asks for a 10% discount and promises more volume.",
    prompt: "Roughly how much more volume do you need just to break even on the deal?",
    choices: [
      { id: "a", text: "About 10% more" },
      { id: "b", text: "About 33% more" },
      { id: "c", text: "About 50% more" },
      { id: "d", text: "About 15% more" },
    ],
    correctChoiceId: "c",
    work: [
      "Start with $100 of sales: a 30% margin produces $30 of gross profit.",
      "After a 10% discount, revenue is $90 while the $70 cost is unchanged, leaving $20.",
      "Required volume = $30 ÷ $20 = 1.5, so volume must rise 50% just to stand still.",
    ],
    explanation:
      "The discount takes margin from 30 points to 20. To earn the same total gross profit you need 30/20, or 50% more volume — which is why blanket discounts are so expensive.",
  },
  {
    id: "fin-05",
    mode: "standard",
    category: "financial",
    subskill: "reading a P&L",
    industry: "Building products",
    difficulty: 3,
    scenario: "Year-over-year results:",
    data: {
      columns: ["", "Last year", "This year"],
      rows: [
        { label: "Revenue", values: ["$4.0M", "$5.0M"] },
        { label: "Gross margin", values: ["38%", "38%"] },
        { label: "Operating expenses", values: ["$1.24M", "$1.72M"] },
        { label: "Net profit", values: ["$280,000", "$180,000"] },
      ],
    },
    prompt: "What should you investigate?",
    choices: [
      { id: "a", text: "Pricing, since margin should have improved with scale" },
      { id: "b", text: "Sales, since revenue growth was too slow" },
      { id: "c", text: "Operating expenses, which grew faster than revenue" },
      { id: "d", text: "Cost of goods, which must have crept up" },
    ],
    correctChoiceId: "c",
    work: [
      "Revenue growth = ($5.0M − $4.0M) ÷ $4.0M = 25%.",
      "Operating-expense growth = ($1.72M − $1.24M) ÷ $1.24M ≈ 38.7%.",
      "Gross margin held at 38%, so overhead growing 14 points faster than revenue is the outlier.",
    ],
    explanation:
      "Revenue rose 25% and gross margin held, so the product economics are intact. Overhead rose 39%, which is the entire reason profit fell.",
  },
  {
    id: "fin-06",
    mode: "standard",
    category: "financial",
    subskill: "payback period",
    industry: "Subscription software",
    difficulty: 3,
    scenario:
      "It costs $900 to acquire a customer. Each customer pays $100 a month at 80% gross margin and stays about 30 months. Your cash reserves cover roughly four months of operating expenses.",
    prompt: "What is the most important number here?",
    choices: [
      { id: "a", text: "Lifetime value of $2,400, which comfortably exceeds $900" },
      { id: "b", text: "The 11-month payback period against four months of runway" },
      { id: "c", text: "The 80% gross margin" },
      { id: "d", text: "The 30-month average customer life" },
    ],
    correctChoiceId: "b",
    work: [
      "Monthly gross profit per customer = $100 × 80% = $80.",
      "CAC payback = $900 ÷ $80 = 11.25 months.",
      "The company has only four months of runway, so it cannot wait eleven months to recycle each acquisition dollar.",
    ],
    explanation:
      "The lifetime value is healthy, but you spend $900 today and recover it at $80 a month — 11 months. With four months of reserves, growth speed is limited by cash, not by whether the customer is profitable.",
  },
  {
    id: "fin-07",
    mode: "standard",
    category: "financial",
    subskill: "cash conversion cycle",
    industry: "Apparel brand",
    difficulty: 4,
    scenario:
      "You pay factories 100% up front. Goods take 60 days to arrive, sit in the warehouse about 45 days, and wholesale customers pay 60 days after delivery. The business is profitable and orders are doubling.",
    prompt: "What is the first thing to change?",
    choices: [
      { id: "a", text: "Raise prices to improve margin" },
      { id: "b", text: "Attack the 165-day gap between paying and getting paid" },
      { id: "c", text: "Cut marketing to preserve cash" },
      { id: "d", text: "Slow growth until margins improve" },
    ],
    correctChoiceId: "b",
    work: [
      "Cash leaves when the factory is paid, then goods spend 60 days in transit.",
      "Add 45 warehouse days and 60 customer-payment days.",
      "Total cash gap = 60 + 45 + 60 = 165 days.",
    ],
    explanation:
      "You fund every order for about 165 days, so doubling orders doubles the cash you must front. Supplier terms, faster turns, or customer deposits fix the actual problem; better margin on a 165-day cycle still starves you.",
  },
  {
    id: "fin-08",
    mode: "standard",
    category: "financial",
    subskill: "breakeven and fixed cost",
    industry: "Fitness franchise",
    difficulty: 4,
    scenario:
      "Fixed costs are $42,000 a month. Each membership brings $120 a month with $20 of variable cost. You currently have 380 members and are considering a second studio with the same cost structure.",
    prompt: "What does the math say?",
    choices: [
      { id: "a", text: "You clear breakeven at 380 members, so the model is proven" },
      { id: "b", text: "You are about $4,000 a month short of breakeven" },
      { id: "c", text: "You are exactly at breakeven" },
      { id: "d", text: "Breakeven cannot be determined from this information" },
    ],
    correctChoiceId: "b",
    work: [
      "Contribution per membership = $120 price − $20 variable cost = $100.",
      "Current contribution = 380 × $100 = $38,000 per month.",
      "$42,000 fixed cost − $38,000 contribution = a $4,000 monthly shortfall; breakeven is 420 members.",
    ],
    explanation:
      "Contribution is $100 per member, so 380 members produce $38,000 against $42,000 of fixed cost and breakeven is 420. Opening a second studio on the same cost structure would duplicate a unit that does not yet cover itself.",
  },
  {
    id: "fin-09",
    mode: "standard",
    category: "financial",
    subskill: "contribution margin on idle capacity",
    industry: "Commercial bakery",
    difficulty: 5,
    scenario:
      "Your ovens sit idle overnight. A grocery chain offers a standing order at $2.10 per loaf. Your fully loaded cost is $2.40, of which $1.55 is ingredients and direct labor and $0.85 is allocated overhead. Your daytime retail business is unaffected and stays full.",
    prompt: "Should you take the order?",
    choices: [
      { id: "a", text: "No — $2.10 is below the $2.40 cost" },
      { id: "b", text: "Yes — it adds $0.55 per loaf against otherwise idle capacity" },
      { id: "c", text: "Only if they raise the price above $2.40" },
      { id: "d", text: "Yes, but only if you cut ingredient quality to reach the price" },
    ],
    correctChoiceId: "b",
    work: [
      "The $0.85 allocated overhead is already being paid while the ovens sit idle.",
      "Incremental contribution = $2.10 price − $1.55 ingredients and direct labor = $0.55 per loaf.",
      "Because existing retail sales are unaffected, every accepted loaf adds $0.55 toward profit.",
    ],
    explanation:
      "The $0.85 of overhead is paid whether the ovens run or not. Against genuinely idle capacity the relevant comparison is the $1.55 of incremental cost, so each loaf contributes $0.55 you would not otherwise have.",
  },
  {
    id: "fin-10",
    mode: "standard",
    category: "financial",
    subskill: "cost of capital in plain terms",
    industry: "Auto parts distributor",
    difficulty: 5,
    scenario:
      "A supplier offers 2% off if you pay in 10 days instead of the standard 30. You have a line of credit costing 12% a year and are not otherwise short on cash.",
    prompt: "What should you do?",
    choices: [
      { id: "a", text: "Skip it — 2% is too small to matter" },
      { id: "b", text: "Take the discount, even if you have to draw on the credit line" },
      { id: "c", text: "Take it only when you have surplus cash on hand" },
      { id: "d", text: "Negotiate for 45-day terms instead" },
    ],
    correctChoiceId: "b",
    work: [
      "Paying 20 days early earns 2%, or roughly 2% × (365 ÷ 20) = 36.5% annualized.",
      "Financing those 20 days at 12% costs about 12% × (20 ÷ 365) = 0.66%.",
      "The 2% discount comfortably exceeds the 0.66% borrowing cost.",
    ],
    explanation:
      "You earn 2% for paying 20 days early, which annualizes to roughly 36%. Borrowing at 12% to capture a 36% return is worth doing on every invoice.",
  },
  {
    id: "fin-11",
    mode: "standard",
    category: "financial",
    subskill: "cost to serve",
    industry: "Managed IT services",
    difficulty: 6,
    scenario:
      "Your enterprise segment produces the highest revenue per client and the highest gross margin on paper. It also absorbs about 70% of engineering escalations and your two most senior engineers, whose time is booked to a shared overhead pool rather than to clients.",
    prompt: "What is the right conclusion?",
    choices: [
      { id: "a", text: "Enterprise is your best segment; sell more of it" },
      { id: "b", text: "The reported margin may be wrong because cost to serve is hidden in overhead" },
      { id: "c", text: "Escalations are a support problem, not a financial one" },
      { id: "d", text: "Raise small-business prices to subsidize enterprise" },
    ],
    correctChoiceId: "b",
    work: [
      "Reported segment margin excludes senior-engineering time because that time sits in shared overhead.",
      "Enterprise consumes 70% of escalations plus the two most expensive engineers.",
      "Reassign those service costs to the clients causing them, then compare true contribution by segment.",
    ],
    explanation:
      "When the largest cost of serving a segment sits in a shared pool, that segment always looks best. Assign senior engineering time to the accounts consuming it before deciding where to grow.",
  },
  {
    id: "fin-12",
    mode: "standard",
    category: "financial",
    subskill: "cutting cost that produces revenue",
    industry: "Regional retailer",
    difficulty: 6,
    scenario:
      "Profit is under pressure. Finance proposes cutting the in-store visual merchandising team, saving $600,000 a year. Stores with a dedicated merchandiser average 11% higher sales per square foot than those without, on otherwise similar traffic.",
    prompt: "What is the strongest response?",
    choices: [
      { id: "a", text: "Approve the cut; $600,000 is certain and the sales link is not" },
      { id: "b", text: "Reject the cut outright and find savings elsewhere" },
      { id: "c", text: "Estimate the gross profit inside that 11% before deciding" },
      { id: "d", text: "Cut half the team to balance both concerns" },
    ],
    correctChoiceId: "c",
    work: [
      "The certain benefit is $600,000 of annual payroll savings.",
      "The possible cost is the gross profit generated by an 11% sales-per-square-foot lift.",
      "Multiply the affected stores' sales by 11% and their gross margin; compare that result with $600,000 before cutting.",
    ],
    explanation:
      "Cost cuts are only wins if the cost was not producing more than it consumed. The 11% gap is the number that decides this, and it is available before you act rather than after.",
  },
];

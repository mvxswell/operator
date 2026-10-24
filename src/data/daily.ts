import type { DailyQuestion } from "@/lib/types";
import { EXTRA_DAILY_QUESTIONS } from "./daily-expansion";

/**
 * Daily Decision pool.
 *
 * `dailyQuestionFor` cycles this list by UTC calendar day, so a window shorter
 * than the pool never repeats and every visitor on the same date sees the same
 * scenario. Distributions are simulated shares for a future labeled view. The
 * daily page does not render them.
 */
export const CORE_DAILY_QUESTIONS: DailyQuestion[] = [
  {
    id: "day-01",
    mode: "daily",
    category: "bottleneck",
    subskill: "capacity versus demand",
    industry: "Craft brewery",
    difficulty: 3,
    teaser: "The taproom is full and a distributor wants twice the accounts, but the tanks are already maxed.",
    scenario:
      "Your taproom is full every weekend and distribution accounts are asking for more kegs than you can supply. Fermentation tanks run at 100% and a new tank takes four months to install. A distributor offers to double your account count starting next month.",
    prompt: "What should you do?",
    choices: [
      { id: "a", text: "Accept the expansion and stretch supply across more accounts" },
      { id: "b", text: "Decline for now and order tank capacity" },
      { id: "c", text: "Accept, and reduce taproom hours to free up kegs" },
      { id: "d", text: "Raise keg prices to ration demand across both channels" },
    ],
    correctChoiceId: "b",
    work: [
      "Tanks are already at 100%, so new accounts do not have kegs behind them.",
      "A tank takes four months, which is the real lead time on any expansion.",
      "Accepting now splits one shortage across two channels and teaches accounts to expect misses.",
      "Ordering capacity is what makes a later yes possible.",
    ],
    explanation:
      "Doubling accounts you cannot supply turns one happy channel into two disappointed ones. Capacity has a four-month lead time, so ordering it is the move that makes the expansion possible later.",
    distribution: { a: 21, b: 54, c: 9, d: 16 },
  },
  {
    id: "day-02",
    mode: "daily",
    category: "financial",
    subskill: "margin versus volume",
    industry: "Catering",
    difficulty: 3,
    teaser: "A corporate contract would add about 30% of revenue at a fraction of your usual margin.",
    scenario:
      "A corporate client offers a recurring contract worth $180,000 a year — roughly 30% of your revenue — at a price that produces 9% gross margin. Your current book averages 34% gross margin and your kitchen is at 70% capacity.",
    data: {
      columns: ["", "Gross margin", "Scale"],
      rows: [
        { label: "Current book", values: ["34%", "About $600,000"] },
        { label: "Offered contract", values: ["9%", "$180,000 a year"] },
      ],
      note: "The kitchen is at 70% capacity, so the hours exist. The price is the open question.",
    },
    prompt: "What is the strongest response?",
    choices: [
      { id: "a", text: "Take it; 30% more revenue and you have idle capacity" },
      { id: "b", text: "Decline; 9% margin is below what the business needs" },
      { id: "c", text: "Counter at a price closer to your normal margin, and be willing to walk" },
      { id: "d", text: "Take it and raise prices on your existing clients to compensate" },
    ],
    correctChoiceId: "c",
    work: [
      "$180,000 is about 30% of current revenue, so the book today is about $600,000.",
      "Gross profit today is about 34% of $600,000, or $204,000. The contract adds 9% of $180,000, or $16,200.",
      "Combined margin is about $220,200 / $780,000, near 28%, and this client becomes a reference price.",
      "Idle capacity makes a lower price discussable. It does not require accepting 9%.",
    ],
    explanation:
      "Idle capacity makes a lower-margin job worth considering, but 30% of revenue at 9% margin reshapes the whole business and anchors your price with a reference customer. Negotiating first costs nothing and keeps both outcomes available.",
    distribution: { a: 24, b: 18, c: 49, d: 9 },
  },
  {
    id: "day-03",
    mode: "daily",
    category: "sales",
    subskill: "funnel diagnosis",
    industry: "Gym franchise",
    difficulty: 4,
    teaser: "Trial signups jumped and conversion fell, so new members stayed roughly flat.",
    scenario:
      "Trial signups are up 45% after a new ad campaign. Trial-to-paid conversion fell from 38% to 19%. Total new members are roughly flat, and the sales team says the new leads are 'tire kickers'.",
    prompt: "What should you do first?",
    choices: [
      { id: "a", text: "Cut the campaign and return to the previous ad mix" },
      { id: "b", text: "Retrain the sales team on converting trials" },
      { id: "c", text: "Compare the two lead groups before changing anything" },
      { id: "d", text: "Add a paid trial to filter out low-intent signups" },
    ],
    correctChoiceId: "c",
    work: [
      "Signups up 45% and conversion from 38% to 19% can leave new members almost unchanged.",
      "That pattern fits worse leads, or the same leads hitting a team that is now overloaded.",
      "Cutting spend, retraining, and adding a paywall each assume a different cause.",
      "The two lead groups are already in the CRM. Split them before you pick a fix.",
    ],
    explanation:
      "Two explanations fit equally well: worse leads, or a team overwhelmed by 45% more of them. The data to tell them apart already exists, and each explanation has a completely different fix.",
    distribution: { a: 17, b: 14, c: 46, d: 23 },
  },
  {
    id: "day-04",
    mode: "daily",
    category: "people",
    subskill: "delegation",
    industry: "Architecture firm",
    difficulty: 3,
    teaser: "You review every drawing, the queue is 11 days, and a real error shows up about 1 time in 20.",
    scenario:
      "You review every drawing before it leaves the office. Reviews now take 11 days on average, clients are complaining, and you catch a meaningful error in roughly 1 of 20 sets.",
    prompt: "What is the best change?",
    choices: [
      { id: "a", text: "Keep reviewing everything but work through them faster" },
      { id: "b", text: "Have senior staff review, with you sampling and coaching on what they miss" },
      { id: "c", text: "Stop reviewing and rely on the team" },
      { id: "d", text: "Hire a second principal to split the review load" },
    ],
    correctChoiceId: "b",
    work: [
      "An 11-day review is the delay clients are complaining about.",
      "The catch rate is about 5%, so most of the queue is waiting on a clean set.",
      "Reviewing faster still leaves you as the only gate. Dropping review drops the signal.",
      "Senior review plus a sample keeps the catch without making every set wait on you.",
    ],
    explanation:
      "The 11-day delay costs more than the 1-in-20 catch rate justifies, but dropping review entirely throws away the quality signal. Distributing the review and sampling it keeps the catch rate while removing you as the queue.",
    distribution: { a: 8, b: 61, c: 7, d: 24 },
  },
  {
    id: "day-05",
    mode: "daily",
    category: "strategy",
    subskill: "customer concentration",
    industry: "Packaging supplier",
    difficulty: 4,
    teaser: "Your largest customer wants a price cut that would crush margin, and you have no other pipeline.",
    scenario:
      "Your largest customer, 45% of revenue, asks for a 12% price reduction and hints they are getting competing quotes. Matching it would take your net margin from 11% to about 4%. You have capacity to serve others but no active pipeline.",
    prompt: "What is the best move?",
    choices: [
      { id: "a", text: "Match the price to protect the relationship" },
      { id: "b", text: "Refuse and let them go if necessary" },
      { id: "c", text: "Offer a smaller reduction tied to volume or longer terms, and start building pipeline immediately" },
      { id: "d", text: "Match the price and cut costs to restore margin" },
    ],
    correctChoiceId: "c",
    work: [
      "A 12% price cut takes net margin from 11% to about 4% on 45% of revenue.",
      "You are negotiating without an alternative, which is why the ask landed.",
      "A smaller cut tied to term buys margin and time. It does not fix concentration.",
      "Pipeline is the move that changes the next negotiation whether this one holds or not.",
    ],
    explanation:
      "You are negotiating from a weak position because you have no alternatives, and that is the thing you can actually change. Trading price for commitment buys margin and time; building pipeline fixes the underlying vulnerability either way.",
    distribution: { a: 26, b: 11, c: 51, d: 12 },
  },
  {
    id: "day-06",
    mode: "daily",
    category: "operations",
    subskill: "quality economics",
    industry: "Cosmetics manufacturing",
    difficulty: 4,
    teaser: "One filling machine drives returns whose yearly cost is easy to compare with a replacement.",
    scenario:
      "Customer returns run at 4% and cost about $340,000 a year. Nearly all of them trace to one filling machine that runs slightly out of tolerance. Replacing it costs $500,000 and takes the line down for two weeks, worth about $220,000 of lost output.",
    data: {
      columns: ["", "Amount"],
      rows: [
        { label: "Annual return cost", values: ["$340,000"] },
        { label: "Replacement", values: ["$500,000"] },
        { label: "Lost output during install", values: ["$220,000"] },
      ],
      note: "Lost output happens once. The return cost repeats every year the machine stays.",
    },
    prompt: "How should you evaluate this?",
    choices: [
      { id: "a", text: "Reject it; $720,000 of cost to save $340,000 a year" },
      { id: "b", text: "Approve it; it pays back in roughly two years and removes a recurring problem" },
      { id: "c", text: "Approve only if returns exceed 6%" },
      { id: "d", text: "Keep the machine and add inspection to catch defects before shipping" },
    ],
    correctChoiceId: "b",
    work: [
      "Cash out is $500,000 plus $220,000 of one-time lost output, about $720,000.",
      "The $340,000 return cost is annual, so payback is $720,000 / $340,000, a bit over two years.",
      "Every year after that, the $340,000 stays in the business.",
      "Inspection adds a permanent cost and still leaves the defect in the machine.",
    ],
    explanation:
      "The $220,000 of downtime is one-time while the $340,000 is annual, so total outlay is recovered in a bit over two years and every year after is profit. Inspection would add permanent cost without removing the defect.",
    distribution: { a: 19, b: 47, c: 10, d: 24 },
  },
  {
    id: "day-07",
    mode: "daily",
    category: "prioritization",
    subskill: "opportunity cost",
    industry: "Boutique fitness",
    difficulty: 3,
    teaser: "You can open a second studio, launch a digital product, or fix the leak in the studio you have.",
    scenario:
      "You can do exactly one thing this quarter: open a second studio, launch an at-home digital product, or fix the scheduling and retention problems that cost you an estimated 15% of members a year.",
    prompt: "What should you choose?",
    choices: [
      { id: "a", text: "Open the second studio while the market is good" },
      { id: "b", text: "Launch the digital product for a new revenue stream" },
      { id: "c", text: "Fix scheduling and retention" },
      { id: "d", text: "Attempt the studio and the digital product together" },
    ],
    correctChoiceId: "c",
    work: [
      "A 15% annual member leak hits every member you already paid to acquire.",
      "A second studio copies the same scheduling and retention system into a new lease.",
      "A digital product adds a stream without repairing the studio that has to fund it.",
      "One quarter, one constraint: stop the leak before you multiply it.",
    ],
    explanation:
      "A 15% annual leak devalues every member you will ever acquire, in this studio and any future one. Expanding first copies the leak into a second location.",
    distribution: { a: 22, b: 12, c: 58, d: 8 },
  },
  {
    id: "day-08",
    mode: "daily",
    category: "resource",
    subskill: "capital allocation",
    industry: "Dental group",
    difficulty: 4,
    teaser: "A crown mill and two new operatories both look profitable, and they use the same dentists.",
    scenario:
      "You have $250,000. Option A buys a same-day crown mill that eliminates a lab fee worth $190,000 a year but requires training your two busiest dentists. Option B adds two operatories, and your schedule is currently booked 4 weeks out with 12% of callers going unserved.",
    data: {
      columns: ["", "What it claims", "What it consumes"],
      rows: [
        { label: "Crown mill", values: ["$190,000 a year of lab fees", "Chair time from the two busiest dentists"] },
        { label: "Two operatories", values: ["12% of callers currently unserved", "The same dentists' hours"] },
      ],
      note: "The budget covers one project well. Both projects draw on the dentists who are already the limit.",
    },
    prompt: "Which is stronger, and why?",
    choices: [
      { id: "a", text: "The crown mill, because $190,000 a year is a certain, immediate saving" },
      { id: "b", text: "The operatories, because unserved demand is revenue you are losing today" },
      { id: "c", text: "Neither until you know how much of the 12% is recoverable and what the mill does to chair time" },
      { id: "d", text: "Split the budget across both" },
    ],
    correctChoiceId: "c",
    work: [
      "The mill's $190,000 saving is only real if the dentists' chair time still produces the same visits.",
      "The operatories only earn if the 12% of unserved callers can be seen by those same dentists.",
      "Training on the mill uses the hours option B is trying to free.",
      "Two questions — recoverable demand, and chair time per crown — decide a $250,000 commitment.",
    ],
    explanation:
      "Both look strong and they interact: the mill consumes chair time from the same dentists whose capacity option B is trying to expand. Two cheap questions decide a $250,000 commitment.",
    distribution: { a: 27, b: 31, c: 34, d: 8 },
  },
  {
    id: "day-09",
    mode: "daily",
    category: "financial",
    subskill: "cash versus profit",
    industry: "Landscaping",
    difficulty: 3,
    teaser: "The largest contract you have won needs more cash to start than the operating account holds.",
    scenario:
      "You won a $400,000 municipal contract, your largest ever. It requires $120,000 of materials and equipment up front, pays 60 days after completion, and the work takes four months. Your operating account holds $85,000 and your credit line is maxed.",
    data: {
      columns: ["", "Cash"],
      rows: [
        { label: "Needed up front", values: ["$120,000"] },
        { label: "Operating account", values: ["$85,000"] },
        { label: "Credit line", values: ["Already maxed"] },
        { label: "Customer payment", values: ["60 days after a 4-month job"] },
      ],
    },
    prompt: "What should you do?",
    choices: [
      { id: "a", text: "Take it; a contract this size will fix the cash position" },
      { id: "b", text: "Take it only after securing financing or a mobilization payment" },
      { id: "c", text: "Decline it; the business is too small for this contract" },
      { id: "d", text: "Take it and delay supplier payments to bridge the gap" },
    ],
    correctChoiceId: "b",
    work: [
      "Startup cash is $120,000 against $85,000 on hand and no remaining line.",
      "The job runs four months, then the invoice waits another 60 days.",
      "Profit on a $400,000 contract does not arrive in time to buy the materials.",
      "A mobilization payment or financing is the gap. Stretching suppliers relocates the default.",
    ],
    explanation:
      "The contract is profitable but you cannot fund it — $120,000 out against $85,000 available, with cash six months away. Winning work you cannot finance is one of the most common ways profitable companies fail.",
    distribution: { a: 15, b: 63, c: 9, d: 13 },
  },
  {
    id: "day-10",
    mode: "daily",
    category: "operations",
    subskill: "process versus people",
    industry: "Urgent care",
    difficulty: 4,
    teaser: "Patients wait 52 minutes, and a third of the visit is paperwork that starts after they arrive.",
    scenario:
      "Patient wait times average 52 minutes against a 30-minute target. Staffing matches patient volume hour by hour. About 35% of visit time is spent on registration and insurance verification, which happens after the patient arrives.",
    prompt: "What is the highest-leverage change?",
    choices: [
      { id: "a", text: "Add a provider during peak hours" },
      { id: "b", text: "Move registration and verification before arrival" },
      { id: "c", text: "Set a wait-time target for staff and track it" },
      { id: "d", text: "Extend hours to spread demand" },
    ],
    correctChoiceId: "b",
    work: [
      "Staffing already matches volume, so another provider adds cost on a balanced schedule.",
      "About 35% of the visit is registration and verification after arrival.",
      "Moving that work before arrival takes it off the patient's clock without a new hire.",
      "A target and longer hours do not remove a step that is sitting in the visit.",
    ],
    explanation:
      "Staffing already matches volume, so more people will not compress a process that spends a third of its time on paperwork. Moving that work before arrival removes it from the patient's clock entirely.",
    distribution: { a: 29, b: 52, c: 6, d: 13 },
  },
  {
    id: "day-11",
    mode: "daily",
    category: "strategy",
    subskill: "second-order effects",
    industry: "Software",
    difficulty: 5,
    teaser: "The free tier costs real money each month and also produces a large share of paid customers.",
    scenario:
      "Your free tier accounts for 88% of users and 0% of revenue, and costs about $40,000 a month to serve. Roughly 40% of paid customers say they first tried the free tier, and a third of new paid accounts arrive through free-user referrals.",
    prompt: "What should you do?",
    choices: [
      { id: "a", text: "Eliminate the free tier and save $480,000 a year" },
      { id: "b", text: "Keep it, but measure and manage it as an acquisition channel" },
      { id: "c", text: "Keep it exactly as it is; it clearly works" },
      { id: "d", text: "Convert it to a 14-day trial to force decisions" },
    ],
    correctChoiceId: "b",
    work: [
      "Serving the free tier costs about $40,000 a month, or $480,000 a year.",
      "40% of paid customers started there, and a third of new paid accounts come from free-user referrals.",
      "Killing it saves the cost and also cuts the channel those paid accounts came through.",
      "The useful number is cost per paid customer acquired, which you can manage. Faith and a hard cutoff both skip it.",
    ],
    explanation:
      "The free tier is not a cost centre, it is your largest acquisition channel wearing a cost centre's clothes. Once you judge it on cost per paid customer you can optimize it honestly rather than kill it or protect it on faith.",
    distribution: { a: 14, b: 55, c: 12, d: 19 },
  },
  {
    id: "day-12",
    mode: "daily",
    category: "people",
    subskill: "incentives and behavior",
    industry: "Staffing agency",
    difficulty: 4,
    teaser: "Placements are up and 90-day retention is down, under a pay plan that rewards placements.",
    scenario:
      "Recruiters are paid on placements made. Placement volume is up 30% this year. Your 90-day retention of placed candidates fell from 84% to 62%, and three clients have stopped sending requisitions.",
    prompt: "What is the correct read?",
    choices: [
      { id: "a", text: "Recruiters are placing candidates who should not be placed" },
      { id: "b", text: "Client expectations have become unrealistic" },
      { id: "c", text: "The labour market has become less stable" },
      { id: "d", text: "Recruiters need better interview training" },
    ],
    correctChoiceId: "a",
    work: [
      "Pay is on placements, and placements rose 30%.",
      "90-day retention fell from 84% to 62% over the same period.",
      "Three clients stopped sending requisitions, which is the buyer's verdict on those placements.",
      "Training and 'the market' can be true at the margin. They do not explain a pay plan aimed at the transaction.",
    ],
    explanation:
      "You pay for placements, so you get placements. Volume up and retention down together is the classic signature of an incentive rewarding the transaction rather than the outcome the client is buying.",
    distribution: { a: 57, b: 13, c: 18, d: 12 },
  },
  {
    id: "day-13",
    mode: "daily",
    category: "prioritization",
    subskill: "signal versus noise",
    industry: "Grocery chain",
    difficulty: 4,
    teaser: "Sales are flat, a manager blames a new competitor, and the loyalty numbers say something narrower.",
    scenario:
      "Same-store sales are flat. Your loudest store manager insists the issue is a competitor's new location. Basket size is up 4%, transaction count is down 6%, and loyalty members are visiting 1.8 times a month instead of 2.1.",
    data: {
      columns: ["", "Change"],
      rows: [
        { label: "Basket size", values: ["+4%"] },
        { label: "Transaction count", values: ["-6%"] },
        { label: "Loyalty visits", values: ["2.1 to 1.8 per month"] },
      ],
      note: "Same-store sales are flat. Known customers are still in the basket data.",
    },
    prompt: "What does the data point to?",
    choices: [
      { id: "a", text: "The competitor is taking customers, as the manager says" },
      { id: "b", text: "A visit-frequency problem among customers you still have" },
      { id: "c", text: "A pricing problem, since basket size rose" },
      { id: "d", text: "Nothing conclusive; flat sales are within normal variation" },
    ],
    correctChoiceId: "b",
    work: [
      "Transactions are down 6% and basket size is up 4%, which is how sales can sit flat.",
      "Loyalty members still shop here. They come 1.8 times a month instead of 2.1.",
      "That is a frequency drop among customers you still have, not a file of lost shoppers.",
      "A competitor story and a price story are both possible. Neither is what these three figures say first.",
    ],
    explanation:
      "Your known customers are still shopping with you, just less often, and they spend more when they come. That is a frequency problem, which has different remedies than losing customers outright.",
    distribution: { a: 33, b: 44, c: 11, d: 12 },
  },
  {
    id: "day-14",
    mode: "daily",
    category: "bottleneck",
    subskill: "constraint identification",
    industry: "Boutique winery",
    difficulty: 3,
    teaser: "Tasting-room traffic is up and wine-club signups are flat because nobody has time to offer the club.",
    scenario:
      "Tasting room visits are up 30%. Wine club signups, your most profitable channel, are flat. Staff say they rarely have time to explain the club because they are pouring for a full bar, and the room is at capacity most afternoons.",
    prompt: "What should you change?",
    choices: [
      { id: "a", text: "Increase marketing to drive more tasting room visits" },
      { id: "b", text: "Create dedicated staff or space for club conversations" },
      { id: "c", text: "Raise tasting fees to reduce crowding" },
      { id: "d", text: "Offer a club discount to improve the conversion rate" },
    ],
    correctChoiceId: "b",
    work: [
      "Visits are already up 30%. The club, the profitable step, is flat.",
      "Staff are pouring for a full room and do not have the minute the offer takes.",
      "More traffic adds pours. A discount cannot be offered by someone with no time to offer it.",
      "The missing capacity is the club conversation, not awareness.",
    ],
    explanation:
      "The visits are already there; the conversion step has no capacity. More traffic makes the crowding worse, and a discount cannot be offered by someone who has no time to make the offer.",
    distribution: { a: 12, b: 59, c: 8, d: 21 },
  },
];

export const DAILY_QUESTIONS: DailyQuestion[] = [
  ...CORE_DAILY_QUESTIONS,
  ...EXTRA_DAILY_QUESTIONS,
];

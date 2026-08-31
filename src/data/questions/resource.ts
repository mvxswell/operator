import type { Question } from "@/lib/types";

export const RESOURCE_QUESTIONS: Question[] = [
  {
    id: "res-01",
    mode: "standard",
    category: "resource",
    subskill: "highest-value use of a scarce asset",
    industry: "Mobile detailing",
    difficulty: 1,
    scenario:
      "You have one van available today and two jobs booked. Job A is $900 and the customer needs it today. Job B is $200 and the customer is flexible about the date.",
    prompt: "What should you do?",
    choices: [
      { id: "a", text: "Run Job B first because it is quicker" },
      { id: "b", text: "Run Job A today and reschedule Job B" },
      { id: "c", text: "Split the van's day and do half of each" },
      { id: "d", text: "Cancel both and rebook a fuller day" },
    ],
    correctChoiceId: "b",
    explanation:
      "One scarce asset should go to the highest-value use. Job A is worth 4.5 times as much and is the only one with a real deadline.",
  },
  {
    id: "res-02",
    mode: "standard",
    category: "resource",
    subskill: "spend where the loss is",
    industry: "Independent pharmacy",
    difficulty: 1,
    scenario:
      "You have $10,000 to spend. Your refrigeration unit fails about twice a month, and each failure spoils roughly $3,000 of inventory. You have also been considering new exterior signage.",
    prompt: "Where should the money go?",
    choices: [
      { id: "a", text: "New exterior signage" },
      { id: "b", text: "Replacing the refrigeration unit" },
      { id: "c", text: "Split it evenly between the two" },
      { id: "d", text: "Hold the cash until the next quarter" },
    ],
    correctChoiceId: "b",
    explanation:
      "The refrigeration failures destroy about $6,000 a month. That is a certain, recurring loss you can stop, which beats a speculative gain from signage.",
  },
  {
    id: "res-03",
    mode: "standard",
    category: "resource",
    subskill: "cost per acquisition",
    industry: "Online education",
    difficulty: 2,
    scenario:
      "Two channels ran last month at the same spend. Channel A brought 400 signups at $25 each. Channel B brought 120 signups at $83 each. Both channels convert to paid at the same rate and neither is near saturation.",
    prompt: "How should you allocate next month's budget?",
    choices: [
      { id: "a", text: "Shift budget toward Channel A" },
      { id: "b", text: "Shift budget toward Channel B for the higher-intent audience" },
      { id: "c", text: "Keep the split even to stay diversified" },
      { id: "d", text: "Pause both and rebuild the landing page" },
    ],
    correctChoiceId: "a",
    explanation:
      "Same conversion rate, same headroom, and a third of the cost per signup. With those facts stated, Channel A is simply better use of the same dollar.",
  },
  {
    id: "res-04",
    mode: "standard",
    category: "resource",
    subskill: "hire against the gap",
    industry: "Commercial cleaning",
    difficulty: 2,
    scenario:
      "You can afford one hire. Your two sales reps are closing 40% of a full pipeline and are turning away walkthrough requests. Your crews finish their routes with about two hours of slack per day.",
    prompt: "Who should you hire?",
    choices: [
      { id: "a", text: "Another cleaning crew" },
      { id: "b", text: "Another salesperson" },
      { id: "c", text: "An office administrator" },
      { id: "d", text: "A marketing coordinator" },
    ],
    correctChoiceId: "b",
    explanation:
      "Crews have slack, so delivery is not the limit. Sales is turning away qualified walkthroughs, which is demand you have already paid to create and are throwing away.",
  },
  {
    id: "res-05",
    mode: "standard",
    category: "resource",
    subskill: "capital against the constraint",
    industry: "HVAC services",
    difficulty: 3,
    scenario: "You have $50,000 to deploy. Current state of the business:",
    data: {
      rows: [
        { label: "Signed work not yet installed", values: ["$600,000"] },
        { label: "Install schedule", values: ["5 weeks behind"] },
        { label: "Crew utilization", values: ["100%"] },
        { label: "Leads", values: ["Up 18% month over month"] },
        { label: "Close rate", values: ["Healthy and stable"] },
      ],
    },
    prompt: "What is the best use of the capital?",
    choices: [
      { id: "a", text: "Increase advertising" },
      { id: "b", text: "Hire another salesperson" },
      { id: "c", text: "Expand install capacity" },
      { id: "d", text: "Redesign the website" },
    ],
    correctChoiceId: "c",
    explanation:
      "You are already sitting on $600,000 of sold work you cannot install. Capital spent on more demand lengthens the backlog; capital spent on install capacity converts backlog into cash.",
  },
  {
    id: "res-06",
    mode: "standard",
    category: "resource",
    subskill: "diminishing returns",
    industry: "Direct-to-consumer brand",
    difficulty: 3,
    scenario: "Results as you scaled one channel over three months:",
    data: {
      columns: ["", "Month 1", "Month 2", "Month 3"],
      rows: [
        { label: "Spend", values: ["$20,000", "$40,000", "$80,000"] },
        { label: "Customers acquired", values: ["500", "870", "1,020"] },
        { label: "Cost per customer", values: ["$40", "$46", "$78"] },
      ],
      note: "Average gross profit per customer is $60.",
    },
    prompt: "What should you do with next month's budget?",
    choices: [
      { id: "a", text: "Double spend again to keep growth compounding" },
      { id: "b", text: "Pull spend back toward the range that stayed under $60 per customer" },
      { id: "c", text: "Hold spend at $80,000 and wait for the channel to recover" },
      { id: "d", text: "Cut the channel entirely" },
    ],
    correctChoiceId: "b",
    explanation:
      "The last doubling bought customers above their $60 gross profit, so those dollars lose money. The channel is still profitable at lower volume, so pull back rather than abandon it.",
  },
  {
    id: "res-07",
    mode: "standard",
    category: "resource",
    subskill: "margin per constrained hour",
    industry: "Print shop",
    difficulty: 4,
    scenario:
      "Your large-format printer is booked solid and is the limit on output. Banner jobs earn $180 of margin and occupy the printer for 3 hours. Decal jobs earn $90 of margin and occupy it for 45 minutes. Both have unlimited demand.",
    prompt: "How should you fill the printer's schedule?",
    choices: [
      { id: "a", text: "Prioritize banners, which earn twice the margin per job" },
      { id: "b", text: "Prioritize decals" },
      { id: "c", text: "Alternate evenly to keep both customer types" },
      { id: "d", text: "Raise decal prices and keep the current mix" },
    ],
    correctChoiceId: "b",
    explanation:
      "On a constrained machine the right unit is margin per machine hour: banners earn $60 an hour, decals earn $120. Total margin per job is the wrong comparison when time is what is scarce.",
  },
  {
    id: "res-08",
    mode: "standard",
    category: "resource",
    subskill: "scarce specialist time",
    industry: "Enterprise software",
    difficulty: 4,
    scenario:
      "Your one senior engineer has four weeks of capacity. Customer X ($40,000/year, renews in two months) wants a custom integration that will take all four weeks and help only them. A platform fix would take three weeks and remove a recurring problem hitting 30% of your 200 customers.",
    prompt: "How should you allocate the four weeks?",
    choices: [
      { id: "a", text: "Build the custom integration to secure the renewal" },
      { id: "b", text: "Do the platform fix, then use the spare week on Customer X's renewal risk" },
      { id: "c", text: "Attempt both at half speed" },
      { id: "d", text: "Do neither until you hire a second engineer" },
    ],
    correctChoiceId: "b",
    explanation:
      "The platform fix helps roughly 60 customers instead of one and costs less time. The remaining week is enough to address the renewal directly rather than by building bespoke software.",
  },
  {
    id: "res-09",
    mode: "standard",
    category: "resource",
    subskill: "fixed vs variable commitment",
    industry: "Logistics",
    difficulty: 5,
    scenario:
      "Volume has grown 30% and your own trucks are full. Buying two trucks costs $260,000 and lowers cost per load by 20% versus using outside carriers. About 60% of your growth came from one retail client whose contract is up for rebid in seven months.",
    prompt: "What is the most defensible move?",
    choices: [
      { id: "a", text: "Buy the two trucks to capture the lower cost per load" },
      { id: "b", text: "Cover the growth with outside carriers until the rebid is settled" },
      { id: "c", text: "Buy one truck and use carriers for the rest" },
      { id: "d", text: "Decline the extra volume to protect service levels" },
    ],
    correctChoiceId: "b",
    explanation:
      "The savings are real but the volume is not yet durable — most of it rides on a contract that could disappear in seven months. Paying more per load to keep the cost variable is what you are buying, and it is worth it here.",
  },
  {
    id: "res-10",
    mode: "standard",
    category: "resource",
    subskill: "starving the funding engine",
    industry: "Media company",
    difficulty: 5,
    scenario:
      "Your events business produces $4M of revenue at 35% margin and funds everything. A new subscription product has 900 subscribers, grows 15% a month, and loses money today. Leadership proposes moving the events team onto subscriptions for two quarters to accelerate it.",
    prompt: "What is the main risk to weigh?",
    choices: [
      { id: "a", text: "Subscriptions may never reach the margin events produces" },
      { id: "b", text: "Redirecting the events team could damage the cash flow paying for the bet" },
      { id: "c", text: "Subscribers may resent being sold events" },
      { id: "d", text: "The events brand could be diluted by the new product" },
    ],
    correctChoiceId: "b",
    explanation:
      "Growth bets are funded by something. Consuming the operating engine to feed the new product can end the runway before the product matures, which is how promising bets die.",
  },
  {
    id: "res-11",
    mode: "standard",
    category: "resource",
    subskill: "allocating under uncertainty",
    industry: "Consumer app",
    difficulty: 6,
    scenario:
      "You have $200,000 and three proposals, each championed confidently: a brand campaign, a referral program, and a retention overhaul. Nobody can say where users are actually dropping off, and the analytics have never been instrumented.",
    prompt: "What is the best use of the first dollars?",
    choices: [
      { id: "a", text: "Split the budget evenly across all three" },
      { id: "b", text: "Fund the retention overhaul, since retention usually matters most" },
      { id: "c", text: "Instrument the funnel first, then allocate the remainder" },
      { id: "d", text: "Fund the referral program, which is cheapest to reverse" },
    ],
    correctChoiceId: "c",
    explanation:
      "Allocating $200,000 across three guesses buys three underfunded experiments and no knowledge. Measurement is cheap relative to the budget and turns the next decision from a guess into a choice.",
  },
  {
    id: "res-12",
    mode: "standard",
    category: "resource",
    subskill: "opportunity cost across horizons",
    industry: "Manufacturing",
    difficulty: 6,
    scenario:
      "You can fund exactly one project. Project A returns $300,000 within 12 months and requires your plant manager full-time for six months. Project B returns $250,000 a year starting in year two and requires the same person for the same six months. Your plant is currently running at 97% on-time delivery and has no slack.",
    prompt: "What matters most in choosing?",
    choices: [
      { id: "a", text: "The larger first-year return of Project A" },
      { id: "b", text: "The recurring nature of Project B's return" },
      { id: "c", text: "What happens to plant performance while the manager is unavailable" },
      { id: "d", text: "Which project the team is more excited about" },
    ],
    correctChoiceId: "c",
    explanation:
      "Both projects consume the identical scarce resource, so their real cost is whatever a 97%-utilized plant does without its manager for six months. That cost is common to both and is likely larger than the gap between them.",
  },
];

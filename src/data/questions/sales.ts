import type { Question } from "@/lib/types";

export const SALES_QUESTIONS: Question[] = [
  {
    id: "sal-01",
    mode: "standard",
    category: "sales",
    subskill: "leak before spend",
    industry: "Home services",
    difficulty: 1,
    scenario:
      "Your ads generate about 900 phone calls a month. Roughly 40% of those calls go unanswered because nobody is at the desk.",
    prompt: "What should you fix first?",
    choices: [
      { id: "a", text: "Increase the ad budget to generate more calls" },
      { id: "b", text: "Make sure incoming calls get answered" },
      { id: "c", text: "Change the ad creative" },
      { id: "d", text: "Add a chat widget to the website" },
    ],
    correctChoiceId: "b",
    explanation:
      "You are already paying for 360 calls a month that nobody picks up. Answering them costs far less than buying the same volume again.",
  },
  {
    id: "sal-02",
    mode: "standard",
    category: "sales",
    subskill: "measurement",
    industry: "Local retail",
    difficulty: 1,
    scenario:
      "You spend $10,000 a month across radio, social ads, direct mail and sponsorships. You have never asked or recorded where customers heard about you.",
    prompt: "What is the highest-value next step?",
    choices: [
      { id: "a", text: "Cut the budget in half to reduce risk" },
      { id: "b", text: "Move the whole budget to social, which is easiest to measure" },
      { id: "c", text: "Start capturing lead source before changing the mix" },
      { id: "d", text: "Double the budget to see if revenue moves" },
    ],
    correctChoiceId: "c",
    explanation:
      "Any change you make now is unmeasurable, so you will learn nothing from it. Attribution is cheap and turns the next $10,000 into an informed decision.",
  },
  {
    id: "sal-03",
    mode: "standard",
    category: "sales",
    subskill: "sales capacity vs demand",
    industry: "Insurance agency",
    difficulty: 2,
    scenario:
      "Each of your salespeople can comfortably handle 20 appointments a week. They are currently averaging 7 appointments a week and closing 35% of them.",
    prompt: "What is the best next move?",
    choices: [
      { id: "a", text: "Hire another salesperson" },
      { id: "b", text: "Generate more qualified appointments" },
      { id: "c", text: "Lower prices to raise the close rate" },
      { id: "d", text: "Increase commission to motivate the team" },
    ],
    correctChoiceId: "b",
    explanation:
      "Your team is using about a third of its capacity and closing at a healthy rate. Adding people or incentives does nothing when the shortage is appointments.",
  },
  {
    id: "sal-04",
    mode: "standard",
    category: "sales",
    subskill: "conversion vs traffic",
    industry: "E-commerce",
    difficulty: 2,
    scenario:
      "Your store gets 60,000 visitors a month and converts 0.4% of them. Comparable stores in your category convert 2%. Traffic costs $0.90 per visitor.",
    prompt: "Where is the leverage?",
    choices: [
      { id: "a", text: "Buying more traffic" },
      { id: "b", text: "Improving conversion on the traffic you already pay for" },
      { id: "c", text: "Expanding into a new sales channel" },
      { id: "d", text: "Reducing product prices" },
    ],
    correctChoiceId: "b",
    explanation:
      "You already pay $54,000 a month for visitors and convert a fifth as well as your category. Moving conversion from 0.4% to 0.8% doubles revenue without spending another dollar on traffic.",
  },
  {
    id: "sal-05",
    mode: "standard",
    category: "sales",
    subskill: "funnel diagnosis",
    industry: "Solar installer",
    difficulty: 3,
    scenario: "Two months of funnel data:",
    data: {
      columns: ["", "Last month", "This month"],
      rows: [
        { label: "Leads", values: ["500", "700"] },
        { label: "Appointments set", values: ["180", "240"] },
        { label: "Appointments held", values: ["150", "196"] },
        { label: "Sales", values: ["72", "94"] },
        { label: "Jobs completed", values: ["70", "61"] },
      ],
      note: "Customer wait times are increasing.",
    },
    prompt: "Where should management focus?",
    choices: [
      { id: "a", text: "Marketing" },
      { id: "b", text: "Sales" },
      { id: "c", text: "Production" },
      { id: "d", text: "Pricing" },
    ],
    correctChoiceId: "c",
    explanation:
      "Every stage improved except completions, which fell from 70 to 61 while sales rose to 94. The business is selling faster than it can deliver, and the wait times confirm it.",
  },
  {
    id: "sal-06",
    mode: "standard",
    category: "sales",
    subskill: "lead quality",
    industry: "B2B services",
    difficulty: 3,
    scenario: "You switched lead sources at the start of this month:",
    data: {
      columns: ["", "Old source", "New source"],
      rows: [
        { label: "Leads per month", values: ["220", "640"] },
        { label: "Cost per lead", values: ["$95", "$28"] },
        { label: "Reached by phone", values: ["61%", "22%"] },
        { label: "Closed deals", values: ["31", "26"] },
      ],
    },
    prompt: "What should you conclude?",
    choices: [
      { id: "a", text: "The new source is better — three times the leads at a third of the cost" },
      { id: "b", text: "The new source costs more per deal and consumes far more rep time" },
      { id: "c", text: "The sales team needs better phone scripts" },
      { id: "d", text: "Nothing yet; one month is never enough to judge" },
    ],
    correctChoiceId: "b",
    explanation:
      "Old source: $20,900 for 31 deals, about $674 each. New source: $17,920 for 26 deals, about $689 each, while burning reps through three times the volume. Cost per lead flattered a worse outcome.",
  },
  {
    id: "sal-07",
    mode: "standard",
    category: "sales",
    subskill: "correlation and attribution",
    industry: "Restaurant group",
    difficulty: 4,
    scenario:
      "You launched a billboard campaign in June. June sales rose 22%. June is also the first month of your peak season, and last June sales rose 19% with no billboards.",
    prompt: "What can you conclude about the billboards?",
    choices: [
      { id: "a", text: "They produced a 22% lift and should be expanded" },
      { id: "b", text: "They produced roughly a 3-point lift at most, which may not cover their cost" },
      { id: "c", text: "They had no effect at all" },
      { id: "d", text: "Billboards cannot be evaluated, so judge them on brand value" },
    ],
    correctChoiceId: "b",
    explanation:
      "Seasonality already explains 19 of the 22 points. The honest estimate of the campaign's contribution is the difference, and that is what has to justify the spend.",
  },
  {
    id: "sal-08",
    mode: "standard",
    category: "sales",
    subskill: "price objection diagnosis",
    industry: "Commercial equipment",
    difficulty: 4,
    scenario:
      "Your reps say you lose deals on price. Your win rate is 22%. When you reviewed 40 lost deals, 31 of the buyers chose a competitor priced within 5% of your quote, and most cited slower response and unclear scope.",
    prompt: "What should you act on?",
    choices: [
      { id: "a", text: "Cut prices by 10% to become competitive" },
      { id: "b", text: "Improve quote turnaround and scope clarity" },
      { id: "c", text: "Add a discount approval process for reps" },
      { id: "d", text: "Retrain reps on objection handling scripts" },
    ],
    correctChoiceId: "b",
    explanation:
      "Buyers paid essentially the same price elsewhere, so price was the story rather than the reason. Cutting price would give away margin to fix a problem that is actually about responsiveness and clarity.",
  },
  {
    id: "sal-09",
    mode: "standard",
    category: "sales",
    subskill: "growth masking churn",
    industry: "Subscription service",
    difficulty: 5,
    scenario:
      "You added 1,200 customers this quarter, a record. Total customers grew by 150. Acquisition cost per customer rose 12%, and your team wants to raise the acquisition budget to hit the annual growth target.",
    prompt: "What should you do?",
    choices: [
      { id: "a", text: "Approve the budget increase; acquisition is clearly working" },
      { id: "b", text: "Find out why roughly 1,050 customers left before spending more" },
      { id: "c", text: "Cut acquisition spend and focus purely on profitability" },
      { id: "d", text: "Raise prices to offset the higher acquisition cost" },
    ],
    correctChoiceId: "b",
    explanation:
      "You are buying customers who leave almost as fast as they arrive, at rising cost. More budget scales the leak; every point of retention recovered makes all future acquisition cheaper.",
  },
  {
    id: "sal-10",
    mode: "standard",
    category: "sales",
    subskill: "diagnosis before prescription",
    industry: "Industrial distribution",
    difficulty: 5,
    scenario: "Sales declined 20% this month with no obvious cause.",
    prompt: "What should you do first?",
    choices: [
      { id: "a", text: "Replace the sales manager" },
      { id: "b", text: "Increase advertising to rebuild volume" },
      { id: "c", text: "Lower prices to win back share" },
      { id: "d", text: "Determine where in the funnel the decline occurred" },
    ],
    correctChoiceId: "d",
    explanation:
      "A 20% drop could come from traffic, lead quality, appointments, close rate, or a lost account, and each has a different fix. Every other option is an expensive guess made before the diagnosis.",
  },
  {
    id: "sal-11",
    mode: "standard",
    category: "sales",
    subskill: "second-order effects of promotion",
    industry: "Consumer electronics retail",
    difficulty: 6,
    scenario:
      "You have run a deep sitewide discount at the end of each of the last five months. Discount-month revenue is strong. Revenue in the first three weeks of each month has fallen steadily, and full-price sell-through is down 30% year over year.",
    prompt: "What is happening?",
    choices: [
      { id: "a", text: "Demand is genuinely growing and promotions are capturing it" },
      { id: "b", text: "Customers have learned to wait, shifting sales from full price to discount" },
      { id: "c", text: "Competitors are undercutting you in the first three weeks" },
      { id: "d", text: "The discount is too shallow to drive enough volume" },
    ],
    correctChoiceId: "b",
    explanation:
      "Predictable promotions teach customers the real price. You are not creating demand so much as moving existing demand into your lowest-margin window, which is why full-price sell-through keeps eroding.",
  },
  {
    id: "sal-12",
    mode: "standard",
    category: "sales",
    subskill: "channel saturation",
    industry: "Direct-to-consumer brand",
    difficulty: 6,
    scenario:
      "One channel drove 80% of your growth for two years. Cost per acquisition there has risen 60% in six months while conversion, creative and landing pages are unchanged. Your team proposes a large creative refresh to bring costs back down.",
    prompt: "What is the most likely situation, and the right response?",
    choices: [
      { id: "a", text: "Creative fatigue; the refresh should restore prior efficiency" },
      { id: "b", text: "The reachable audience in that channel is saturating; test new channels while the current one still works" },
      { id: "c", text: "A tracking problem is inflating reported cost; audit the analytics" },
      { id: "d", text: "Competitors are outbidding you; increase bids to hold position" },
    ],
    correctChoiceId: "b",
    explanation:
      "With conversion and creative performance unchanged, rising cost points to a thinning pool of remaining buyers rather than fatigue. A refresh may buy a few months; the durable move is to diversify before the channel stops funding it.",
  },
];

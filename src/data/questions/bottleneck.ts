import type { Question } from "@/lib/types";

export const BOTTLENECK_QUESTIONS: Question[] = [
  {
    id: "btl-01",
    mode: "standard",
    category: "bottleneck",
    subskill: "throughput constraint",
    industry: "Dental practice",
    difficulty: 1,
    scenario:
      "Your practice gets 60 new-patient calls a month. With your current hygienists, you can only schedule 22 of them. The rest go elsewhere.",
    prompt: "Where should you focus first?",
    choices: [
      { id: "a", text: "Increase the advertising budget" },
      { id: "b", text: "Add hygienist chair capacity" },
      { id: "c", text: "Redesign the practice website" },
      { id: "d", text: "Launch a patient referral program" },
    ],
    correctChoiceId: "b",
    explanation:
      "You already generate more demand than you can serve. Until chair capacity rises, every additional call is wasted money.",
  },
  {
    id: "btl-02",
    mode: "standard",
    category: "bottleneck",
    subskill: "throughput constraint",
    industry: "E-commerce",
    difficulty: 1,
    scenario:
      "Your warehouse ships 200 orders a day. You are currently receiving 340 orders a day, and the unshipped backlog grows every day.",
    prompt: "What is the constraint?",
    choices: [
      { id: "a", text: "Website conversion rate" },
      { id: "b", text: "Advertising spend" },
      { id: "c", text: "Pick-and-pack capacity" },
      { id: "d", text: "Product selection" },
    ],
    correctChoiceId: "c",
    explanation:
      "Demand exceeds fulfillment by 140 orders a day. Fulfillment is the ceiling on the entire business right now.",
  },
  {
    id: "btl-03",
    mode: "standard",
    category: "bottleneck",
    subskill: "idle capacity",
    industry: "Design agency",
    difficulty: 2,
    scenario:
      "You have four designers. Each comfortably handles five projects a month. You currently have 11 active projects and next month's pipeline is thin.",
    prompt: "What is the best next move?",
    choices: [
      { id: "a", text: "Hire a fifth designer" },
      { id: "b", text: "Invest in generating more qualified demand" },
      { id: "c", text: "Buy faster design software" },
      { id: "d", text: "Extend project timelines so the team looks fully booked" },
    ],
    correctChoiceId: "b",
    explanation:
      "Capacity is 20 projects and you are using 11. The constraint is demand, not delivery, so adding a designer only adds cost and idle time.",
  },
  {
    id: "btl-04",
    mode: "standard",
    category: "bottleneck",
    subskill: "sequential capacity",
    industry: "Coffee roastery",
    difficulty: 2,
    scenario:
      "Your roaster runs eight hours a day and produces 400 lb. Your packaging line can handle 700 lb a day. Orders average 520 lb a day.",
    prompt: "What limits how much you can ship?",
    choices: [
      { id: "a", text: "Roasting hours" },
      { id: "b", text: "Packaging speed" },
      { id: "c", text: "Order volume" },
      { id: "d", text: "Green bean inventory" },
    ],
    correctChoiceId: "a",
    explanation:
      "In a sequence, output is set by the slowest step. Roasting caps you at 400 lb, well below both packaging capacity and demand.",
  },
  {
    id: "btl-05",
    mode: "standard",
    category: "bottleneck",
    subskill: "reading operating data",
    industry: "Freight brokerage",
    difficulty: 3,
    scenario: "Two months of operating data:",
    data: {
      columns: ["", "Last month", "This month"],
      rows: [
        { label: "Loads quoted", values: ["1,200", "1,650"] },
        { label: "Loads booked", values: ["310", "425"] },
        { label: "Loads covered with a carrier", values: ["305", "342"] },
        { label: "Loads delivered on time", values: ["291", "300"] },
      ],
      note: "Customer complaints about late pickups are rising.",
    },
    prompt: "Where should management focus?",
    choices: [
      { id: "a", text: "Quoting volume" },
      { id: "b", text: "Sales conversion" },
      { id: "c", text: "Carrier capacity and coverage" },
      { id: "d", text: "Pricing" },
    ],
    correctChoiceId: "c",
    explanation:
      "Bookings grew 37% but coverage grew only 12%, and the gap between booked and covered widened from 5 loads to 83. The break is in sourcing carriers.",
  },
  {
    id: "btl-06",
    mode: "standard",
    category: "bottleneck",
    subskill: "reading operating data",
    industry: "B2B SaaS support",
    difficulty: 3,
    scenario: "Your support desk over the last four weeks:",
    data: {
      columns: ["", "Wk 1", "Wk 2", "Wk 3", "Wk 4"],
      rows: [
        { label: "Tickets opened", values: ["420", "445", "460", "470"] },
        { label: "Tickets closed", values: ["415", "430", "405", "390"] },
        { label: "Support headcount", values: ["6", "6", "6", "6"] },
        { label: "Avg handle time (min)", values: ["14", "15", "19", "23"] },
      ],
    },
    prompt: "What is the most useful thing to investigate?",
    choices: [
      { id: "a", text: "Why handle time per ticket is climbing" },
      { id: "b", text: "Why customers are opening more tickets" },
      { id: "c", text: "Whether to hire two more support reps" },
      { id: "d", text: "Whether to raise prices to reduce demand" },
    ],
    correctChoiceId: "a",
    explanation:
      "Volume rose 12% but closures fell 6% while handle time rose 64%. Something changed inside the work itself, and hiring against a broken process just buys the same problem twice.",
  },
  {
    id: "btl-07",
    mode: "standard",
    category: "bottleneck",
    subskill: "investing off the constraint",
    industry: "Furniture manufacturing",
    difficulty: 4,
    scenario:
      "Your line has three stations. Cutting takes 40 seconds per unit, assembly takes 95 seconds, and finishing takes 55 seconds. A vendor offers a machine that would cut the cutting station to 20 seconds.",
    prompt: "What would that purchase do to daily output?",
    choices: [
      { id: "a", text: "Roughly double it, since cutting becomes twice as fast" },
      { id: "b", text: "Increase it by about 40%" },
      { id: "c", text: "Leave it essentially unchanged" },
      { id: "d", text: "Decrease it, because of retraining time" },
    ],
    correctChoiceId: "c",
    explanation:
      "Assembly at 95 seconds sets the pace of the line. Speeding up a non-bottleneck only piles up inventory in front of assembly; it does not add a single finished unit.",
  },
  {
    id: "btl-08",
    mode: "standard",
    category: "bottleneck",
    subskill: "constraint behind a symptom",
    industry: "Fitness studio",
    difficulty: 4,
    scenario:
      "Membership sales are strong at 90 joins last month, but you also lost 84 members. Your 6pm classes have been fully booked with waitlists for three months. Off-peak classes run at 30% capacity.",
    prompt: "What is the highest-leverage move?",
    choices: [
      { id: "a", text: "Increase the marketing budget to outrun churn" },
      { id: "b", text: "Add capacity or attractive alternatives at peak hours" },
      { id: "c", text: "Discount memberships to improve retention" },
      { id: "d", text: "Cut the underused off-peak classes to save money" },
    ],
    correctChoiceId: "b",
    explanation:
      "You are selling memberships to people who cannot get into the class they actually want. Peak capacity is producing the churn, so more marketing only fills a leaking bucket faster.",
  },
  {
    id: "btl-09",
    mode: "standard",
    category: "bottleneck",
    subskill: "the constraint moves",
    industry: "Imaging clinic",
    difficulty: 5,
    scenario:
      "Referrals are up 25%. You added a second MRI machine last quarter and scanner utilization fell from 96% to 61%. Radiologist read turnaround has gone from 1 day to 4 days, and referring physicians are starting to send patients elsewhere.",
    prompt: "What should you do?",
    choices: [
      { id: "a", text: "Market harder to referring physicians to replace lost volume" },
      { id: "b", text: "Add radiologist reading capacity" },
      { id: "c", text: "Add a third scanner to shorten appointment lead times" },
      { id: "d", text: "Reduce referral intake until turnaround normalizes" },
    ],
    correctChoiceId: "b",
    explanation:
      "The second scanner worked, and in working it pushed the constraint downstream. Reads are now the ceiling, and turnaround is the part referring physicians actually experience.",
  },
  {
    id: "btl-10",
    mode: "standard",
    category: "bottleneck",
    subskill: "constraint is not capacity",
    industry: "Specialty contractor",
    difficulty: 5,
    scenario:
      "Crews are only 60% utilized and you have $900,000 of signed work. Jobs stall because materials arrive late: your main supplier requires payment before shipping, and your customers pay 45 days after completion.",
    prompt: "What is actually constraining the business?",
    choices: [
      { id: "a", text: "Crew productivity" },
      { id: "b", text: "Sales volume" },
      { id: "c", text: "Working capital and payment timing" },
      { id: "d", text: "Supplier reliability" },
    ],
    correctChoiceId: "c",
    explanation:
      "You pay for materials up front and collect 45 days after finishing. Cash, not labor or demand, is what caps how many jobs you can run at once.",
  },
  {
    id: "btl-11",
    mode: "standard",
    category: "bottleneck",
    subskill: "diagnosis before investment",
    industry: "Restaurant group",
    difficulty: 6,
    scenario:
      "Across six locations, average ticket times went from 12 to 19 minutes over four months. Two locations are unchanged. Sales are flat, food cost is stable, and kitchen headcount has not changed. A consultant recommends a $240,000 equipment upgrade across all six.",
    prompt: "What should you do first?",
    choices: [
      { id: "a", text: "Approve the upgrade, since ticket times are clearly a capacity problem" },
      { id: "b", text: "Upgrade only the four affected locations to save money" },
      { id: "c", text: "Find out what is different about the two unaffected locations" },
      { id: "d", text: "Add a cook to every affected location" },
    ],
    correctChoiceId: "c",
    explanation:
      "Same equipment and same staffing produced different results, so equipment is unlikely to be the cause. The two healthy locations are a free control group, and the real answer is probably far cheaper than $240,000.",
  },
  {
    id: "btl-12",
    mode: "standard",
    category: "bottleneck",
    subskill: "shifting constraints",
    industry: "Metal fabrication",
    difficulty: 6,
    scenario:
      "Your shop's bottleneck changes by job type. Bracket work backs up at welding; enclosure work backs up at powder coating. Each accounts for roughly half your revenue. You have budget to expand exactly one of the two.",
    prompt: "What is the strongest basis for the decision?",
    choices: [
      { id: "a", text: "Expand welding, since welders are harder to hire" },
      { id: "b", text: "Expand whichever station has more idle hours overall" },
      { id: "c", text: "Expand whichever constraint blocks more contribution margin per hour" },
      { id: "d", text: "Split the budget evenly to keep both moving" },
    ],
    correctChoiceId: "c",
    explanation:
      "With alternating constraints, the tiebreaker is money released per constrained hour, not hiring difficulty or fairness. Splitting the budget buys too little relief at either station to change throughput.",
  },
];

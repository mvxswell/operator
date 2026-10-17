import type { Guide } from "./index";

export const strategyGuides: Guide[] = [
  {
    slug: "should-i-raise-prices", title: "Should I raise prices?",
    description: "Decide whether to raise prices using margin, capacity, demand response, and customer value. Plan a measured test and watch the right financial outcomes.",
    skill: "strategy", minutes: 8,
    intro: "Raise prices when current prices no longer support the cost, capacity, or value of your offer—and when the expected contribution survives a realistic loss of some demand. Test the change on a defined segment before changing every customer at once.",
    steps: [
      { title: "Check the signal behind the question", paragraphs: [
        "Rising input costs, thin margins, full capacity, unusually high close rates, and a better customer outcome can all justify a price review. None is enough alone. A full schedule of low-margin work may need a higher price, a narrower scope, or a cheaper delivery method. The aim is healthier contribution, not a bigger number on a brochure.",
        "Calculate contribution by product and customer segment, including discounts, rework, and service time. Some customers may already pay enough while one customized offer consumes the scarce capacity. Separate those cases before announcing a universal increase."
      ] },
      { title: "Set the economic floor", paragraphs: [
        "Compute the true delivery cost and the margin required to cover overhead and risk. If cost has increased, determine whether the gap is temporary or structural. Compare the new floor with current prices and with alternatives customers see. A price below the floor cannot be rescued by more volume unless delivery cost changes.",
        "When capacity is constrained, estimate contribution per scarce hour, not just per sale. A large contract that occupies the limiting team for weeks may be less attractive than several standard jobs. Price or scope that work accordingly."
      ] },
      { title: "Estimate demand response", paragraphs: [
        "Ask how many sales you could lose before total contribution falls. If a job costs $60 and sells for $100, it contributes $40. Raising price to $110 makes contribution $50, so you could lose up to 20% of volume and keep roughly the same gross contribution, before changes in fixed costs and customer mix.",
        "This is a decision boundary, not a prediction. Review competitors, customer conversations, previous price changes, and how differentiated the offer is. Some customers are highly price-sensitive; others value speed and reliability more. Segment the test rather than assuming one elasticity for everyone."
      ] },
      { title: "Choose who changes and when", paragraphs: [
        "New customers are often the cleanest test group. Existing customers need a clear effective date and notice appropriate to your agreements. Grandfathering can protect a relationship temporarily, but make the duration and rationale explicit so old prices do not become permanent hidden exceptions.",
        "Consider packages or scope changes if a simple increase is hard to explain. A basic tier and a premium tier can clarify value, but only if both can be delivered profitably. Avoid inventing tiers that add operational complexity without a useful customer distinction."
      ] },
      { title: "Communicate the offer, not an apology", paragraphs: [
        "Explain what is changing, when, and what stays included. If the service improved, name the improvement. If costs rose, be direct without forcing customers through your entire expense ledger. Give customers a route to ask questions and enough time to plan where possible.",
        "Train the team on boundaries before launch. Inconsistent one-off discounts can erase the intended margin and make pricing feel arbitrary. Define who may approve an exception and what evidence warrants one."
      ] },
      { title: "Monitor contribution and retention", paragraphs: [
        "Track quote acceptance, average realized price, gross margin, churn, complaint themes, and capacity use. Compare a similar customer segment or prior period. A modest decline in conversion may be acceptable if total contribution rises; a wave of high-value customer departures may not be.",
        "Set a review date and decision rule. Keep, refine, or reverse the change based on evidence rather than one angry email. If demand stays strong and the delivery queue remains full, a second constraint may now be service capacity."
      ] },
    ],
    framework: { title: "Price-change decision card", items: ["Current contribution and true delivery cost by segment.", "Proposed price and maximum tolerable volume loss.", "Test group, notice plan, exception authority, and effective date.", "Review date with conversion, contribution, churn, and capacity metrics."] },
    workedExample: { title: "Worked example: a ten-percent increase", paragraphs: [
      "A company sells a standard service for $100 with $60 direct cost. One hundred sales contribute $4,000. At $110, each sale contributes $50. Eighty sales would also contribute $4,000, so the simplified break-even volume loss is 20%. This does not mean the company should accept losing its best twenty customers, nor does it include changes in fixed costs.",
      "The owner tests $110 on new customers for a month while preserving existing contracts. Ninety-five comparable sales close and quality stays steady. Contribution improves to $4,750, so the test supports broader rollout. The company communicates a future effective date to existing customers and watches renewal behavior separately."
    ] },
    mistakes: ["Using a 100% close rate as proof by itself that any increase will work.", "Ignoring contribution per constrained hour or hidden rework.", "Surprising existing customers with a new price despite agreed terms.", "Reversing a sound test because of one complaint while the overall economics improved."],
    scenario: { text: "A service costs $60 to deliver and sells for $100. Capacity is full. The owner considers $110 and expects no more than a 10% reduction in volume.", prompt: "What is the strongest next move?", choices: ["Keep price fixed because any lost sale is bad", "Test $110 on a defined new-customer segment and track contribution and conversion", "Double every price tomorrow without notice", "Cut service quality to keep the old price"], correct: 1, explanation: "The proposed increase improves contribution unless volume falls substantially. A measured test reveals the actual response while protecting existing agreements." },
    faq: [
      { question: "How much can I raise prices without losing customers?", answer: "There is no universal percentage. Calculate the volume-loss boundary from contribution, then test with a defined segment and watch retention." },
      { question: "Should I grandfather existing customers?", answer: "Sometimes, especially under agreements or relationship commitments. Set a clear duration and transition rather than maintaining indefinite unexplained exceptions." },
      { question: "What should I monitor after raising prices?", answer: "Realized price, conversion, contribution, churn, complaints, and delivery capacity—not revenue alone." }
    ], related: ["how-to-price-a-service-business", "how-to-improve-cash-flow", "why-are-sales-down"],
  },
  {
    slug: "expand-to-a-new-location-or-market", title: "Should you expand to a new location or market?",
    description: "Use a readiness checklist, a small market test, cash runway, and clear kill criteria before committing to a costly second location or an unfamiliar new market.",
    skill: "strategy", minutes: 9,
    intro: "Expand only when the core business runs repeatably without constant founder rescue, a capable manager can own the new operation, and the cash runway can absorb a slower-than-planned launch. Test demand cheaply before signing a large commitment.",
    steps: [
      { title: "Prove the original business is repeatable", paragraphs: [
        "The first location's revenue is not enough proof. Check stable contribution, customer retention, quality, and performance when the founder is away. If results depend on one exceptional person or undocumented local relationships, copying the sign and floor plan will not copy the economics.",
        "Write down the core offer, staffing model, customer acquisition path, operating routines, and quality standards. Identify what must be true in any market and what is local. A repeatable model is an asset; a heroic founder schedule is not."
      ] },
      { title: "Check management depth", paragraphs: [
        "A second operation requires day-to-day decisions without the owner traveling between fires. Name the proposed local leader, their authority, and their backup. Test whether the original location can keep quality when that person leaves to launch the new one.",
        "Do not count a future hire as an existing management system. Hiring may be the right move, but the ramp time and training cost belong in the launch plan. Protect the first operation from being stripped of its strongest people."
      ] },
      { title: "Model cash runway, not only projected profit", paragraphs: [
        "List deposits, buildout, equipment, pre-opening payroll, marketing, inventory, and the working capital needed until collections stabilize. Build base, slow, and adverse cases. The relevant question is the lowest combined cash balance across both operations, not merely when the new site becomes profitable on paper.",
        "Set a reserve that protects the core business. If a slow launch would force late payroll or starve the original location of essential investment, the expansion is not ready even if the upside looks attractive."
      ] },
      { title: "Test demand before buying permanence", paragraphs: [
        "Look for actual buying behavior in the target market. A temporary service area, pilot partnership, pop-up, or limited sales campaign can test qualified demand and delivery cost. Talk to customers and local partners, but give more weight to paid orders than enthusiastic opinions.",
        "Track acquisition cost, conversion, repeat behavior, local staffing constraints, and service quality. A new market can have different travel, wages, regulations, or competition. Put those differences into the unit economics rather than assuming the original city's ratios will transfer."
      ] },
      { title: "Set launch and kill criteria before enthusiasm rises", paragraphs: [
        "Define the minimum demand signal, maximum cash spend, time to a target contribution, and acceptable quality level. Name a decision date. If the pilot misses the threshold, decide whether to revise once or stop; do not let a sunk deposit become a reason to commit more money indefinitely.",
        "Also define what would make you accelerate. A small test can reveal strong demand but weak delivery capacity. In that case, expansion may require an operations fix before a lease, not a bigger marketing budget."
      ] },
      { title: "Sequence the rollout to protect the core", paragraphs: [
        "Use a staged opening, with limited capacity and a narrow offer first. Review leading signals weekly: hiring progress, wait times, callbacks, cash burn, and customer repeat rate. Scale only after the local team can meet the same quality standard without daily founder intervention.",
        "Treat the original business as a live system, not a funding account. Watch its management load and service metrics during launch. If the core weakens, the apparent growth may simply be moving resources from a proven operation to an unproven one."
      ] },
    ],
    framework: { title: "Expansion readiness gate", items: ["Stable core margin, service quality, and routines that work without daily founder rescue.", "Named managers for both operations, with tested decision authority.", "Cash runway through a slow case plus a protected reserve for the core.", "A small paid demand test and prewritten continue/stop thresholds."] },
    workedExample: { title: "Worked example: a second service area", paragraphs: [
      "A local service firm has strong demand in a neighboring city. A full branch would require a lease, two vehicles, and four hires. Instead, the owner runs a six-week pilot with one mobile crew on selected days. The test measures qualified bookings, travel time, actual contribution, callbacks, and repeat requests.",
      "Bookings are healthy, but travel consumes more crew hours than planned and response time is poor. The owner does not sign the lease yet. The next test clusters appointments geographically and trains a local lead. If contribution and service quality reach the prewritten thresholds, a branch becomes more defensible. If they do not, the company can withdraw without a long fixed obligation."
    ] },
    mistakes: ["Using total revenue at the first location as proof the operating model is transferable.", "Assuming the founder can personally manage two locations indefinitely.", "Counting projected profit while ignoring startup cash timing and reserve.", "Changing the kill criteria after committing money because stopping feels like failure."],
    scenario: { text: "A first location is profitable, but the founder approves daily exceptions and handles key customer complaints. A second market looks promising, but the launch needs a long lease and most of the cash reserve.", prompt: "What is the soundest decision?", choices: ["Sign the lease before competitors do", "Fix management dependence and run a limited paid market test first", "Copy the first location's forecast without adjustment", "Move the best manager away and ignore the first location"], correct: 1, explanation: "The core is not yet repeatable without founder rescue, and the cash downside is large. A small test and management depth reduce the irreversible risk." },
    faq: [
      { question: "How do I know I am ready for a second location?", answer: "The core operation should be repeatable, management depth real, cash runway resilient, and demand in the new market tested with paid behavior." },
      { question: "Should I expand when my first location is full?", answer: "Not automatically. Check whether local capacity, pricing, or process improvements offer a better return than a new fixed-cost operation." },
      { question: "What is a kill criterion?", answer: "A prewritten limit—such as cash spent, time elapsed, or quality below target—that triggers a stop or redesign before sunk costs dominate judgment." }
    ], related: ["where-to-invest-your-next-dollar", "why-is-my-business-not-growing", "scaling-operations-without-losing-quality"],
  },
];

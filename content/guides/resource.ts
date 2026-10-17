import type { Guide } from "./index";

export const resourceGuides: Guide[] = [
  {
    slug: "when-to-hire-your-first-employee", title: "When to hire your first employee",
    description: "Decide whether your first hire will remove a real bottleneck. Compare fully loaded cost, freed owner time, revenue capacity, and flexible contractor options.",
    skill: "resource", minutes: 9,
    intro: "Hire your first employee when repeatable work or missed revenue exceeds the capacity you can cover, and the role's expected contribution supports its fully loaded cost. Hire for the bottleneck—not simply to make a crowded calendar feel better.",
    steps: [
      { title: "Look for repeated capacity signals", paragraphs: [
        "Write down work turned away, response delays, owner hours, and recurring tasks over several weeks. One frantic week is not a permanent role. A durable queue of valuable work suggests capacity is truly constrained. If demand is uncertain, a flexible contractor may be a better first test.",
        "Separate tasks only you can do from tasks you keep because you have not documented them. An employee cannot help if every meaningful decision still waits for your approval. Improve the handoff before estimating how many hours the role will free."
      ] },
      { title: "Name the actual bottleneck", paragraphs: [
        "If customers wait for delivery, a sales hire may create more promises the business cannot fulfill. If crews are idle but quotes go out late, a sales or estimating role may be right. Trace the path from inquiry to collected cash and find where the queue grows.",
        "The first hire often wears several hats, but the role still needs one primary outcome. A job description that says 'help with everything' makes both evaluation and training difficult. State what number should move if the hire works."
      ] },
      { title: "Calculate fully loaded cost", paragraphs: [
        "Include wages, payroll taxes, benefits, equipment, software, recruiting, training, supervision, and the cost of slower productivity during ramp-up. Then compare that total with the gross contribution from additional work or the value of owner time released for higher-return work.",
        "Do not assume every freed owner hour becomes revenue. Name the specific work you will do with that time and its plausible payoff. If the hire saves ten hours but the owner fills them with low-value tasks, the business case may not hold."
      ] },
      { title: "Compare contractor, part-time, and full-time", paragraphs: [
        "A contractor can test demand or supply a specialized capability with less fixed commitment. Part-time can suit predictable peaks or a defined administrative load. Full-time can build continuity and deeper process ownership when the volume is steady. Compare total cost and reliability, not hourly rate alone.",
        "Consider classification and employment obligations with qualified professional advice. A low-cost arrangement that does not fit the actual working relationship can create legal and operational problems. This guide is a business decision framework, not legal advice."
      ] },
      { title: "Design the handoff and first 30 days", paragraphs: [
        "List the first tasks, access, examples of acceptable output, decision boundaries, and who will train the person. Set a small number of milestones: perform a task with help, perform it independently, then handle normal exceptions. Plan your own training time as a real cost.",
        "A hire cannot solve an undefined process by arrival alone. If the role exists to absorb routine work, document the routine, reduce unnecessary approvals, and protect time for feedback. The first month should establish reliable output, not demand instant leverage."
      ] },
      { title: "Set a review rule before offering", paragraphs: [
        "Choose the metrics that will decide whether the role works: backlog, response time, completed jobs, margin, quality, and owner hours. Set a review date and an expected ramp. If demand drops or the bottleneck shifts, adjust the role rather than keeping a mismatch because the hiring decision was emotionally costly.",
        "Leave a cash buffer for a slower ramp. The goal is not to wait for certainty—it rarely comes—but to make a decision that the business can absorb if the first forecast is too optimistic."
      ] },
    ],
    framework: { title: "First-hire decision check", items: ["Recurring valuable work waits or is declined; the bottleneck is named.", "Fully loaded cost and training time fit a conservative contribution case.", "Contractor, part-time, and full-time alternatives were compared.", "Primary outcome, authority, onboarding, and 30-day review metrics are written."] },
    workedExample: { title: "Worked example: sales or crew capacity", paragraphs: [
      "A small installation company receives more qualified inquiries than last year. The owner wants a salesperson because quotes feel urgent. But the data show quotes go out within a day and close rate is stable; signed jobs wait four weeks for installation. Another salesperson would increase backlog and risk late delivery.",
      "The company tests a part-time experienced installer and improves job preparation. It estimates contribution from jobs completed sooner, the hire's fully loaded cost, and the training time required. If a second crew consistently raises finished profitable output, a full-time role may follow. If the queue disappears after scheduling fixes, the company avoids a permanent hire it did not need."
    ] },
    mistakes: ["Hiring because the owner feels busy without measuring recurring valuable work.", "Adding sales capacity when delivery is the binding constraint.", "Comparing salary to revenue while ignoring burden, supervision, and gross margin.", "Expecting immediate relief without a handoff or training plan."],
    scenario: { text: "A company has steady leads and a stable close rate. Signed work waits four weeks for a small field crew. The owner can afford one first hire.", prompt: "Which role deserves the first test?", choices: ["Another salesperson to create more demand", "A delivery hire or flexible crew capacity at the queue", "A social media manager because every firm has one", "No hire ever, regardless of lost orders"], correct: 1, explanation: "Delivery caps completed work. Test capacity at the constraint and compare added contribution with fully loaded cost." },
    faq: [
      { question: "How much revenue should I have before my first hire?", answer: "There is no universal number. Compare the role's fully loaded cost with conservative additional contribution or owner capacity it can create, while keeping a cash buffer." },
      { question: "Should I hire a contractor first?", answer: "A contractor can test uncertain demand or specialized work, but compare reliability, true cost, and appropriate worker classification." },
      { question: "What role should a founder hire first?", answer: "The role that removes the current profitable-work bottleneck with a clear, teachable outcome—not a title chosen from a generic startup checklist." }
    ], related: ["where-to-invest-your-next-dollar", "how-to-delegate", "how-to-find-the-bottleneck"],
  },
  {
    slug: "where-to-invest-your-next-dollar", title: "Where to invest your next dollar",
    description: "Compare competing investments by the constraint they remove, expected return, payback time, risk, and the cash buffer they leave behind for the business.",
    skill: "resource", minutes: 8,
    intro: "Invest the next dollar where it removes the current constraint and creates the best risk-adjusted return without exhausting your cash buffer. Compare options on incremental contribution, payback, and downside—not on which proposal is most exciting.",
    steps: [
      { title: "Protect the operating buffer first", paragraphs: [
        "Set aside cash for payroll, committed payments, and a plausible slow period. The exact buffer depends on your volatility and access to financing, but it should be explicit. Money that keeps the business able to deliver is not idle simply because it is not attached to a new project.",
        "Use a short cash forecast to see when an investment's spending occurs and when returns might arrive. An attractive return in a year does not pay a bill next month."
      ] },
      { title: "Name the constraint the money would move", paragraphs: [
        "Map the path from demand to delivered, paid work. If demand is plentiful but production is capped, marketing spend may be wasted. If production has idle capacity and qualified inquiries are scarce, equipment may sit unused. The right investment depends on the binding step today.",
        "Write a causal sentence for each proposal: spending on X should move metric Y because it changes step Z. If you cannot name the mechanism, the proposal is a hope rather than a testable allocation."
      ] },
      { title: "Estimate incremental contribution", paragraphs: [
        "For each option, estimate added revenue minus the direct costs required to earn it, plus any verified savings. Include setup, training, maintenance, and the manager time needed to make it work. Compare with the current baseline, not with an optimistic total company forecast.",
        "Use a low, base, and high case. The low case should be plausible rather than theatrical. Ask what happens if volume is slower, a key employee leaves, or implementation takes twice as long. An investment with a modest headline return may be preferable if its downside is limited and reversible."
      ] },
      { title: "Compare payback and reversibility", paragraphs: [
        "Payback is the time until cumulative incremental cash recovers the investment. It is not the only metric, but it reveals how long capital is tied up. A pilot that can be stopped after one month is different from a five-year lease even when projected returns look similar.",
        "Consider whether the decision creates options for later. Training one employee in a constrained skill may be a small, flexible move that tests whether a larger hire or machine is justified. Stage spending when learning can reduce the next commitment."
      ] },
      { title: "Ignore sunk cost in the next decision", paragraphs: [
        "Money already spent cannot be recovered by spending more unless the new spending has its own positive case. Evaluate the next dollar against alternatives available now. A half-built project can deserve completion, but 'we have already spent so much' is not sufficient evidence.",
        "Use the same decision card for favored and unfavored ideas. Otherwise a charismatic proposal gets optimistic assumptions while a boring process fix is asked to prove every dollar. Consistency makes tradeoffs visible."
      ] },
      { title: "Commit with a measurement and stop rule", paragraphs: [
        "Choose the option, owner, budget cap, time frame, and metric that should move. Name what will not be funded. Review at the point where you have enough evidence to continue, change, or stop. A decision without a review rule often becomes a permanent cost by inertia.",
        "After an investment succeeds, reassess the constraint. The next dollar may belong somewhere different. Capital allocation is a sequence of bottleneck decisions, not a permanent ranking of departments."
      ] },
    ],
    framework: { title: "Investment comparison card", items: ["Current constraint and metric the proposal should improve.", "Cash required, incremental contribution, and realistic payback.", "Low-case downside, reversibility, and effect on operating reserve.", "Pilot cap, decision date, and what other spend this displaces."] },
    workedExample: { title: "Worked example: ads, equipment, or training", paragraphs: [
      "A shop has $20,000 available beyond its protected reserve. Marketing proposes $15,000 in ads, production proposes a $20,000 machine, and a supervisor proposes $3,000 in training for setup and changeover. Orders are already waiting at the existing machine, while sales has a healthy pipeline.",
      "The owner tests the training first. If it reduces setup time enough to add five finished orders a week, it may produce a fast return and clarify whether a second machine is still needed. Ads would increase the queue without raising output. The machine might ultimately be right, but its case should use capacity remaining after the low-cost improvement. The $17,000 not spent stays available for the next constraint and the cash forecast."
    ] },
    mistakes: ["Spending the entire reserve on a projected return that arrives after payroll is due.", "Funding more demand when delivery cannot accept it.", "Comparing gross revenue gains with one option and net contribution with another.", "Doubling down solely because prior spending would otherwise feel wasted."],
    scenario: { text: "Orders are waiting at a machine. Marketing wants more ads, a manager wants a new machine, and a supervisor can test a low-cost setup-time improvement first.", prompt: "What should receive the first dollar?", choices: ["Ads, because more demand always solves growth", "The setup-time test, then remeasure the capacity gap", "The machine without checking existing downtime", "Whatever project already consumed the most money"], correct: 1, explanation: "Exploit the current constraint cheaply before committing to more capacity. The result sharpens the larger investment decision." },
    faq: [
      { question: "Should I always choose the fastest payback?", answer: "No. Compare risk, strategic value, total return, and cash timing too. Payback is one useful constraint, not the entire decision." },
      { question: "How large should my cash buffer be?", answer: "Base it on payroll, committed costs, demand volatility, and financing access. Set it before ranking discretionary investments." },
      { question: "What if I already spent money on a project?", answer: "Judge the next dollar by the future return and alternatives now available. Past spending is not itself a reason to continue." }
    ], related: ["how-to-find-the-bottleneck", "when-to-hire-your-first-employee", "expand-to-a-new-location-or-market"],
  },
];

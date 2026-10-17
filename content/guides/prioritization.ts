import type { Guide } from "./index";

export const prioritizationGuides: Guide[] = [
  {
    slug: "how-to-prioritize-as-a-ceo", title: "How to prioritize as a CEO",
    description: "A practical weekly prioritization method that separates urgent noise from impact on revenue, margin, cash, and risk, with a clear ICE scoring example.",
    skill: "prioritization", minutes: 8,
    intro: "Prioritize by the decision's likely impact on revenue, margin, cash, and risk, then weigh confidence and effort. Protect the work that changes a binding constraint, and whenever a new priority enters, name what will stop.",
    steps: [
      { title: "Separate urgent from important", paragraphs: [
        "Urgent work demands a response soon; important work changes the future of the business. A customer outage can be both. A loud internal request may be urgent to its sponsor but have little company impact. A pricing review may be important even without a deadline. Put work in those categories before comparing it.",
        "Do not use the categories to ignore immediate risk. Payroll, safety, legal obligations, and a major service failure may require action now. The point is to keep every incoming request from becoming a crisis simply because it arrived today."
      ] },
      { title: "Choose the outcome this week must move", paragraphs: [
        "Start with the operating dashboard: revenue, gross margin, cash, delivery, retention, and major risks. Identify the one or two numbers that most limit the next stage. If the delivery queue is growing, a new marketing campaign is unlikely to be the top company priority, even if it is exciting.",
        "Translate the outcome into a concrete decision. 'Improve growth' is too vague; 'reduce quote turnaround from three days to one' can have an owner, a time frame, and a measurable effect."
      ] },
      { title: "Score options with impact, confidence, and effort", paragraphs: [
        "ICE is a simple aid: rate impact, confidence, and ease, then multiply or compare them consistently. The exact scale matters less than exposing assumptions. Impact should include revenue, margin, cash, or risk—not just how visible a project is. Confidence asks what evidence supports the forecast. Ease includes people, time, and disruption.",
        "Do not let a neat score replace judgment. A low-probability catastrophic risk may deserve action despite a weak average score. Write a sentence explaining the recommendation so a team can challenge the assumption, not just the number."
      ] },
      { title: "Read the data before the loudest voice", paragraphs: [
        "When a store manager asks for more labor and marketing asks for promotion, look at traffic, conversion, stockouts, wait time, and labor productivity. The right move depends on the broken term. A promotion during frequent stockouts drives customers toward an experience the operation cannot provide.",
        "Ask what would have to be true for each proposal to work. If the problem is lack of qualified demand, marketing may be right. If customers arrive but leave because shelves are empty, replenishment and scheduling have the stronger case."
      ] },
      { title: "Make the tradeoff explicit", paragraphs: [
        "A priority list with twelve top items is not a decision. Limit work in progress. For every new initiative, identify what is paused, delayed, or delegated. Tell the affected owner and customer when necessary. Hidden tradeoffs turn into missed deadlines and blame later.",
        "Preserve a small slot for urgent unplanned work. If every hour is booked, the first surprise destroys the plan. But keep the buffer visible so it does not become an excuse for avoiding difficult important work."
      ] },
      { title: "Run a weekly decision cadence", paragraphs: [
        "At the start of the week, review outcome metrics and choose the top few commitments. Give each one an owner, next action, due date, and evidence of completion. Midweek, only re-rank when new information materially changes impact or risk. At week's end, compare the expected and actual movement.",
        "Record what was displaced and why. Over time, this decision log shows whether the leadership team systematically underestimates effort or chases particular kinds of noise. Better prioritization comes from learning, not a perfect scoring formula."
      ] },
    ],
    framework: { title: "Weekly priority card", items: ["Company outcome and binding constraint this week.", "Top three candidate actions: impact, confidence, ease, and main risk.", "Chosen owner, next action, measure, and review date.", "The work explicitly paused or removed to make room."] },
    workedExample: { title: "Worked example: a grocery chain decision", paragraphs: [
      "A regional grocery chain sees flat sales. One leader wants a promotion; another wants more cashiers. Store data show customer visits are stable, checkout waits are short, but in-stock rates on popular items fell after a replenishment change. Advertising or adding cashiers would not address the missing product customers came to buy.",
      "The CEO prioritizes fixing replenishment in the affected stores, with in-stock rate and lost-sales estimates as leading measures. The promotion is postponed until shelves can support it. The decision is not that marketing or labor never matter; it is that the current evidence points to a different constraint. If the in-stock rate recovers and sales remain flat, the team can revisit traffic and conversion with better information."
    ] },
    mistakes: ["Confusing the newest request with the highest company impact.", "Using a scoring formula as a substitute for understanding the constraint.", "Adding a priority without naming the work that loses capacity.", "Keeping too many initiatives active to finish or learn from any of them."],
    scenario: { text: "A grocery chain's sales are flat. Traffic is steady and checkout lines are short, but popular products are increasingly out of stock. Marketing proposes a promotion; operations proposes fixing replenishment.", prompt: "What should the CEO prioritize?", choices: ["The promotion, because it is visible", "More cashiers despite short lines", "Replenishment and in-stock rate at affected stores", "All proposals at once with no owner"], correct: 2, explanation: "The data point to availability as the binding issue. More demand before shelves recover may worsen the customer experience." },
    faq: [
      { question: "How many priorities should a CEO have at once?", answer: "Few enough that each has a real owner and enough capacity to finish. For many teams, a small set of top commitments is more useful than a long ranked backlog." },
      { question: "Is the Eisenhower urgent-important matrix enough?", answer: "It is a useful first filter, but business priorities also need expected impact, confidence, effort, risk, and the current constraint." },
      { question: "What should happen when a new urgent project arrives?", answer: "Reassess the evidence and explicitly pause, delay, or delegate other work. Do not pretend capacity is unlimited." }
    ], related: ["where-to-invest-your-next-dollar", "how-to-find-the-bottleneck", "why-is-my-business-not-growing"],
  },
];

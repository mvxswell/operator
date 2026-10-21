import { CATEGORIES } from "../lib/categories";
import type { CategoryId } from "../lib/types";

export interface TestLanding {
  id: string;
  title: string;
  description: string;
  summary: string;
  format: string;
  startHref: string;
  skills: CategoryId[];
  decisions: string[];
  approach: string[];
}

const details: Record<CategoryId, { summary: string; decisions: string[]; approach: string[] }> = {
  bottleneck: {
    summary: "Practice spotting the step that limits a whole system. These scenarios ask you to distinguish demand problems from capacity problems and to resist improving a department that already has slack.",
    decisions: ["Locate the binding constraint in a multi-step workflow.", "Compare staffing, capacity, and demand before buying more activity.", "Choose an intervention that increases useful throughput."],
    approach: ["Map the sequence of work and compare each step's practical capacity.", "Ask where work is waiting and whether more input can become finished output.", "Check whether your proposed fix moves the system constraint or only a local metric."],
  },
  prioritization: {
    summary: "Practice choosing what happens first when several requests compete for the same time. The scenarios reward attention to deadlines, dependencies, and consequences instead of the loudest request or the easiest task.",
    decisions: ["Distinguish an urgent consequence from an urgent-sounding request.", "Sequence work around dependencies and scarce attention.", "Name which work should wait when capacity is limited."],
    approach: ["Identify the consequence of delaying each option.", "Check for tasks that unlock or block the rest of the work.", "Choose a sequence, not a wish that everything can happen at once."],
  },
  resource: {
    summary: "Practice allocating money, people, and scarce working hours. These cases ask where an additional resource changes the outcome and whether the gain justifies what you give up elsewhere.",
    decisions: ["Compare the incremental benefit of competing uses of capital.", "Choose a hire or capacity change that addresses a real limit.", "Include opportunity cost and the timing of a payoff."],
    approach: ["List the resource each option consumes and the result it could change.", "Separate costs already incurred from costs that change with the decision.", "Check whether the business has the demand and ability to use the new capacity."],
  },
  financial: {
    summary: "Practice business arithmetic as a decision tool. Scenarios combine margin, cash timing, unit economics, and payback so you can distinguish attractive-looking growth from a choice that improves the business.",
    decisions: ["Separate revenue, contribution, profit, and available cash.", "Compare payback and the timing of receipts and payments.", "Identify which costs actually change under an alternative."],
    approach: ["Write the relevant quantities and units before calculating.", "Compare the incremental economics rather than revenue alone.", "Check the cash timing and assumptions behind an apparently profitable option."],
  },
  sales: {
    summary: "Practice diagnosing where a sales and marketing funnel is breaking. The cases ask whether the problem is traffic, qualification, appointments, conversion, or the offer before you spend more to generate activity.",
    decisions: ["Find the funnel stage that limits acquired customers.", "Compare acquisition spending with conversion and contribution.", "Choose a response to a pricing or sales-process obstacle."],
    approach: ["Follow the counts through the funnel using consistent definitions.", "Separate a shortage of opportunities from poor conversion of existing demand.", "Choose the intervention nearest the evidence, then consider its cost."],
  },
  operations: {
    summary: "Practice improving the reliability of work as it moves between people and stages. Scenarios cover cycle time, quality, rework, scheduling, and standardization, with an emphasis on useful delivery rather than busyness.",
    decisions: ["Diagnose a queue, handoff, or rework problem.", "Compare a process change with adding staff or equipment.", "Protect quality while improving throughput and promise reliability."],
    approach: ["Separate time doing work from time waiting for a decision or input.", "Look for repeated defects and unclear acceptance standards.", "Choose a change you can inspect at the next operating review."],
  },
  people: {
    summary: "Practice decisions about delegation, hiring, training, and accountability. The cases ask you to match responsibility with authority and to distinguish a person's capability gap from a problem in how the work is designed.",
    decisions: ["Choose what to delegate and which decisions need boundaries.", "Match a role or hire to the actual operating need.", "Respond to performance problems with specific evidence and support."],
    approach: ["Identify who owns the outcome and what they can actually control.", "Check whether information, authority, and capacity match the assignment.", "Choose a clear next decision rather than a broad personality judgment."],
  },
  strategy: {
    summary: "Practice choosing where to compete and what to stop doing. Scenarios ask you to weigh market fit, focus, opportunity cost, and second-order effects before committing resources to an appealing growth story.",
    decisions: ["Compare an expansion with improving the existing business.", "Separate strategic evidence from a sunk-cost argument.", "Choose a focused experiment before a difficult-to-reverse commitment."],
    approach: ["State the objective and the alternatives, including doing less.", "Separate known facts from assumptions about demand and execution.", "Consider the resources and promises that remain after the first move."],
  },
};

export const TEST_LANDINGS: TestLanding[] = [
  {
    id: "operator", title: "Operator Test: Business Judgment Assessment",
    description: "Test business judgment across twenty adaptive scenarios. Practice finance, people, operations, and strategy, then see your Operator Score and skill breakdown.",
    summary: "The Operator Test combines decisions from all eight skill areas into one adaptive run. You read a business situation, compare four possible actions, and choose the best supported call using the information in the scenario.",
    format: "20 questions · adaptive difficulty · Operator Score", startHref: "/operator/?start=1", skills: CATEGORIES.map((category) => category.id),
    decisions: ["Find a bottleneck before spending money or adding people.", "Compare cash, margin, and the opportunity cost of growth.", "Make tradeoffs in hiring, delegation, sales, and strategy."],
    approach: ["Read the objective and identify the constraint before comparing actions.", "Use the numbers and facts supplied; do not invent missing customer demand.", "Review the explanation after each answer and use the final breakdown to pick a skill to train."],
  },
  {
    id: "quick", title: "Quick Decisions: 60-Second Business Judgment Quiz",
    description: "Practice business decisions under a sixty-second clock. Choose between two actions, build a streak, and compare accuracy-adjusted decisions per minute.",
    summary: "Quick Decisions is a short practice round for making clear business calls under time pressure. Each card offers two choices. Correct answers move you forward; mistakes cost time, so fast guessing is a poor substitute for accurate judgment.",
    format: "60 seconds · two choices · decisions per minute", startHref: "/quick/", skills: CATEGORIES.map((category) => category.id),
    decisions: ["Recognize a basic constraint without a long analysis.", "Choose between two plausible operating actions.", "Balance decision speed with accuracy rather than maximizing clicks."],
    approach: ["Read both choices before answering with a tap, A/D, or the arrow keys.", "Look for the action supported by the stated business facts.", "Review missed calls afterward and compare accuracy as well as DPM on another round."],
  },
  {
    id: "daily", title: "Daily Decision: A Business Scenario to Practice Each Day",
    description: "Make one business decision each day, read the reasoning, and build a daily practice streak. Return tomorrow for the next scenario, with no account required.",
    summary: "Daily Decision gives you one dated scenario to work through without a full test session. Choose from four actions, read why one is best supported, and keep a practice streak in this browser. The daily prompt changes with the calendar date.",
    format: "One daily scenario · explanation · browser-local streak", startHref: "/daily/", skills: CATEGORIES.map((category) => category.id),
    decisions: ["Apply a decision framework to a concrete operating situation.", "Notice which facts separate the strongest option from a tempting alternative.", "Build a repeat practice habit without committing to a long assessment."],
    approach: ["Read the whole scenario and choose before opening the explanation.", "Compare your reasoning with the feedback rather than only checking correctness.", "Return on the next local calendar day, or use a skill test for more practice now."],
  },
  ...CATEGORIES.map((category): TestLanding => ({
    id: category.id, title: `${category.name} Skill Test`,
    description: `Practice ${category.name.toLowerCase()} with ten adaptive business scenarios. Make the call, read the explanation, and finish with a scored result and a personal best.`,
    summary: details[category.id].summary,
    format: "10 questions · adaptive difficulty · skill score", startHref: `/skills/${category.id}/?start=1`, skills: [category.id],
    decisions: details[category.id].decisions, approach: details[category.id].approach,
  })),
];

export function getTestLanding(id: string): TestLanding | undefined {
  return TEST_LANDINGS.find((test) => test.id === id);
}

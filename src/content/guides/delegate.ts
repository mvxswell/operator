import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-delegate",
  skill: "people",
  title: "How to Delegate as a Business Owner",
    description:
      "Delegate frequent work you already understand. Hand off the outcome, the limit, and a review date. Inspect the finished result instead of every keystroke.",
  answer:
    "Owners hoard tasks because the work feels faster in their own hands and because a bad handoff is public. Start with frequent, low-risk work you already understand, and give away the outcome with a clear limit instead of a running commentary.",
  blocks: [
    { type: "h2", text: "Why the work stays with you" },
    {
      type: "p",
      text: "Most owners are not bad at delegation because they lack a framework. They keep the task because they can see the finish and the other person cannot yet. Doing it yourself is a rational hour. Doing it yourself every week is how the company caps at your calendar. The second trap is identity. If you are the person who \"just handles it,\" handing it off feels like becoming less necessary. The business needs you less on that task. That is the point.",
    },
    {
      type: "p",
      text: "A third reason is a messy first attempt. You delegated once, the result came back wrong, and you took it back forever. That usually means the handoff skipped the limit and the example, not that the person cannot learn. Treat the first cycle as training with a due date, then decide.",
    },
    { type: "h2", text: "Use a ladder, not a dump" },
    {
      type: "p",
      text: "People do not jump from \"watch me\" to \"you own this.\" Name the rung out loud so they know which decisions are theirs. Climb one rung when the last one has gone right more than once. Drop a rung when the stakes are new, not when you feel anxious.",
    },
    {
      type: "ol",
      items: [
        "Do as told. They follow your steps on a task you still check.",
        "Recommend, then wait. They bring a proposal. You decide.",
        "Decide and report. They choose inside a limit you set, then tell you what they did.",
        "Decide and inform. They choose, and you hear about it on a cadence, not in advance.",
        "Own it. The outcome is theirs, including the explanation if it slips.",
      ],
    },
    {
      type: "p",
      text: "Skipping to the top on a client's money is how owners get burned and then refuse to delegate again. Staying on the first rung for a year is how you hire an assistant and keep the job.",
    },
    { type: "h2", text: "Pick the first tasks on purpose" },
    {
      type: "p",
      text: "The first things to give away are frequent, low-risk, and already understood. Weekly invoicing you have done fifty times. Scheduling that follows a written rule. A report nobody argues with. Leave the rare, high-stakes, half-defined work with you until the ladder has a few rungs in use. \"Low-risk\" means a miss is fixable inside a week and does not injure a customer, a license, or a payroll.",
    },
    {
      type: "p",
      text: "If you cannot explain the task in a few minutes, you do not understand it well enough to hand it off. That is a signal to document it once while you do it, not a signal to keep it forever. The [SOP guide](/guides/how-to-create-sops) is the loop for that.",
    },
    { type: "h2", text: "Hand off with a checklist" },
    {
      type: "p",
      text: "A handoff fails in the gaps: who decides, what good looks like, and when you will look. Cover these before you walk away. If you cannot fill a line, the task is not ready.",
    },
    {
      type: "panel",
      items: [
        "The outcome in one sentence, including the date it has to be true.",
        "The limit: money, time, brand rules, and what they must not change.",
        "An example of a finished version, even a rough one.",
        "The tools and access they need on day one, not \"I'll add you later.\"",
        "The rung they are on, and the date you will inspect the result.",
      ],
    },
    { type: "h2", text: "Inspect outcomes, not motion" },
    {
      type: "p",
      text: "Micromanaging is asking to see the draft, the keystrokes, and the order of steps. Inspection is looking at the finished thing against the outcome you named. If the invoice batch is correct and on time, do not redo the order they clicked in. If it is wrong, point at the miss and ask them to fix the cause, then look again on the date you set.",
    },
    {
      type: "p",
      text: "Put the check on the calendar when you delegate, not when you get nervous. Early checks are closer together. Later checks get quieter. A standing \"just cc me on everything\" is the first rung pretending to be trust. It also trains them to wait for your reply, which means you still own the task.",
    },
    { type: "h2", text: "Take it back only for a reason" },
    {
      type: "p",
      text: "Take a task back when the miss is repeated, the limit was clear, and the cost of another try is higher than teaching. Say that out loud. Quietly redoing their work teaches them that your standards are secret and that effort does not stick. One clean correction plus one more cycle is usually enough to know.",
    },
    {
      type: "p",
      text: "Keep a short list of what you still do that someone else could own next month. Review it when you hire, when someone quits, and when your week is full of work you have done for years. Delegation is a habit of giving away the next familiar task, not a personality transplant.",
    },
    { type: "h2", text: "Try the call" },
    {
      type: "p",
      text: "The scenario is a normal owner week. Choose the handoff that removes you from repeat work without gambling a relationship.",
    },
    { type: "scenario" },
  ],
  scenario: {
    industry: "Home services",
    scenario:
      "You own a plumbing company with six technicians. You still approve every estimate over $400, rewrite the customer text messages, and order parts yourself because a tech once ordered the wrong cartridge. Estimates now wait a day for you. The office coordinator has been with you for fourteen months and already books the jobs.",
    prompt: "What is the best delegation move this month?",
    choices: [
      { id: "a", text: "Keep approvals. The wrong-part story proves the team is not ready." },
      { id: "b", text: "Let technicians send any estimate and any text with no review." },
      { id: "c", text: "Give the coordinator estimates up to a written dollar limit, with a sample and a Friday review of exceptions." },
      { id: "d", text: "Hire a general manager and hand over the whole company at once." },
    ],
    correctChoiceId: "c",
    explanation:
      "The delay is the constraint, and the coordinator already touches the work. A dollar limit, an example, and a review date move one rung without betting the customer relationship on a blank check.",
  },
  faqs: [
    {
      question: "What should a business owner delegate first?",
      answer:
        "Frequent work you understand, where a mistake is fixable quickly and does not put a customer, a license, or payroll at risk. Rare, fuzzy, high-stakes work stays with you until the person has climbed a few rungs on easier tasks.",
    },
    {
      question: "How do you delegate without micromanaging?",
      answer:
        "Name the outcome, the limit, and the date you will look. Review the finished result against that outcome. Skip the play-by-play unless they are still on the \"do as told\" rung and you said so.",
    },
    {
      question: "Why do owners take delegated work back?",
      answer:
        "The first result is often imperfect, and redoing it feels faster. If the limit was clear, correct the miss once and run another cycle. Take it back only when the same miss repeats and another try costs more than teaching.",
    },
  ],
  related: ["what-to-do-when-your-best-employee-quits", "how-to-create-sops", "how-to-prioritize"],
};

export default guide;

import type { Guide } from "./types";

const guide: Guide = {
  slug: "when-to-hire-your-first-employee",
  skill: "resource",
  title: "When to Hire Your First Employee",
    description:
      "Hire when you turn away paid work or repeat tasks fill the week. Price the full cost against the hours or revenue freed. Hire the bottleneck, not comfort.",
  answer:
    "Hire when the business is refusing revenue or your week is full of repeat work someone else could own. Price the fully loaded cost against what those hours are worth, and hire the constraint, not the comfort task.",
  blocks: [
    { type: "h2", text: "Read the signals before the mood" },
    {
      type: "p",
      text: "Feeling busy is a weak signal. Owners are busy at every size. The useful signals are narrower. You are turning away work a customer is ready to pay for. The same tasks show up every week and do not need your judgment. A deadline is slipping because you are the only pair of hands, and the slip costs more than a wage. If none of those are true, a hire will add a payroll and a management job on top of the same business.",
    },
    {
      type: "p",
      text: "Write a two-week log before you decide. Note what you did in rough blocks, and mark which blocks a careful new person could do after a month of teaching. The log is humbling. A lot of \"only I can\" work is habit. A lot of the rest is the actual product, and hiring will not remove it.",
    },
    { type: "h2", text: "Price the seat, not the hourly ad" },
    {
      type: "p",
      text: "The wage in the job post is not the cost. Add payroll taxes, insurance if you will carry it, equipment, software seats, and the hours you will spend recruiting and training. A rough fully loaded cost for a first W-2 hire is often the wage plus a meaningful slice more. Use your accountant's numbers for your state. The point is to stop comparing a salary to your revenue as if the rest were free.",
    },
    {
      type: "p",
      text: "Then price the other side. If the hire frees twenty hours of your week, what do those hours earn when you spend them on sales, delivery, or the work only you can sign? If they only free you to answer the same email faster, the hire does not pay. If they let you take work you currently decline, compare that gross profit with the loaded cost. A hire that costs more than the profit it unlocks is a lifestyle choice. Name it as one.",
    },
    { type: "h2", text: "Hire the bottleneck" },
    {
      type: "p",
      text: "Comfort hires feel good and do not move the business. A bookkeeper when you are turning away jobs is comfort if invoicing is not what is stuck. An extra technician when the phone is quiet is comfort. Look at the step that is full. If sales is turning away qualified conversations and delivery still has slack, the hire belongs in sales. If delivery is late and the pipeline is thin, the hire belongs on the tools. The [bottleneck guide](/guides/how-to-find-the-bottleneck) is the longer version of that look.",
    },
    {
      type: "p",
      text: "Write the job around the constraint, in verbs. \"Answer estimate requests the same day and book the visit\" is a job. \"Help me grow\" is a wish. If you cannot list ten repeating tasks, you are not ready to employ someone. You are ready to buy a few hours of a contractor.",
    },
    { type: "h2", text: "Choose the shape of the help" },
    {
      type: "p",
      text: "First help does not have to be a full-time employee. Match the shape to how steady the work is and how much control you need.",
    },
    {
      type: "panel",
      items: [
        "Contractor, when the work is a defined outcome, intermittent, or a skill you need a few times a month.",
        "Part-time employee, when the work repeats every week, you need a set schedule, and there is not yet forty hours of it.",
        "Full-time employee, when the constraint is daily, the tasks fill a week, and training time will pay back across months.",
      ],
    },
    {
      type: "p",
      text: "Employment rules, overtime, and who counts as a contractor are legal questions. Get them right before you pick the cheaper-looking option. A misclassified contractor is not a bargain.",
    },
    { type: "h2", text: "A simple payback check" },
    {
      type: "p",
      text: "Suppose you decline about ten small jobs a month because you are on the tools, and each one would clear $180 after materials. That is $1,800 a month of gross profit sitting on the table. A part-time hire loaded at $1,600 a month, who takes the prep and lets you finish those jobs, can pay for the seat. The same hire, brought on so you can \"get organized\" while you still decline nothing, is a cost with no offset. Run the arithmetic with your numbers before you post.",
    },
    {
      type: "p",
      text: "Include your training hours in the first two months. A first hire who is useful in week one is rare. If the payback only works when they are fully ramped on day three, it does not work.",
    },
    { type: "h2", text: "Make the first month a test with a standard" },
    {
      type: "p",
      text: "Give them the ten tasks, a definition of done, and a weekly review. Do not add a second job because they seem capable. The constraint you hired for should move: more estimates out, shorter backlog, fewer nights of admin. If it does not move after a fair ramp, the miss is the hiring choice or the design of the work. Fix that before you add a second person.",
    },
    { type: "h2", text: "Try the call" },
    {
      type: "p",
      text: "This is the sales-versus-crew choice in a different trade. One hire. Two parts of the business. Only one of them is full.",
    },
    { type: "scenario" },
  ],
  scenario: {
    industry: "Commercial cleaning",
    scenario:
      "You can afford one hire. Your two sales reps close about 40% of a full pipeline and are turning away walkthrough requests. Your crews finish routes with about two hours of slack a day. An office manager would make your inbox calmer. A marketing coordinator sounds like growth.",
    prompt: "Who should you hire?",
    choices: [
      { id: "a", text: "Another cleaning crew" },
      { id: "b", text: "Another salesperson" },
      { id: "c", text: "An office administrator" },
      { id: "d", text: "A marketing coordinator" },
    ],
    correctChoiceId: "b",
    explanation:
      "Crews have slack, so delivery is not the limit. Sales is refusing walkthroughs you already paid to create. An admin or a marketer does not unlock that queue.",
  },
  faqs: [
    {
      question: "What are the signs you should hire your first employee?",
      answer:
        "You are turning away paid work, the same tasks fill your week, or deadlines slip because there is only one pair of hands. Busy on its own is not a sign. A two-week log of tasks a new person could own is a better test than a feeling.",
    },
    {
      question: "How do you know if you can afford a first hire?",
      answer:
        "Add taxes, insurance, tools, and your training time to the wage. Compare that loaded cost with the gross profit of work you can now accept, or with the value of your hours once the repeat tasks move. If the offset is smaller than the cost, wait or buy contractor hours.",
    },
    {
      question: "Should your first hire be full-time?",
      answer:
        "Full-time fits daily work that already fills a week. Part-time fits a steady schedule that is not forty hours. A contractor fits a defined, intermittent outcome. Pick from the shape of the bottleneck, then check the employment rules before you choose the cheaper label.",
    },
  ],
  related: ["where-to-invest-next-dollar", "how-to-delegate", "how-to-find-the-bottleneck"],
};

export default guide;

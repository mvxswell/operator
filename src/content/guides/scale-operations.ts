import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-scale-operations",
  skill: "operations",
  title: "How to Scale Operations Without Losing Quality",
    description:
      "Keep quality as you grow by standardizing the work, checking each handoff, and watching rework. Automate a step only after it is stable. Volume multiplies mess.",
  answer:
    "Growth keeps its quality when the work is the same on purpose, someone checks it at each handoff, and you watch rework and lateness before customers complain. Automate only after the steps stop changing. More volume through a messy step makes a bigger mess.",
  blocks: [
    { type: "h2", text: "Volume is a multiplier" },
    {
      type: "p",
      text: "A sloppy step that handles ten jobs a week is a nuisance. The same step at fifty jobs is a reputation. Scaling is not doing more of whatever you did when you could still see every job. It is deciding what must be identical, what may vary, and where a person checks the work before it moves on. If you cannot describe \"good\" for the core job, you cannot inspect it, and you will discover the misses in refunds.",
    },
    {
      type: "p",
      text: "Write the non-negotiables for the offer you want to grow. Materials, sequence, time window, what the customer is promised, what they are not. Leave taste and unusual risk outside that list, with a named person who can bend the rule. Everything inside the list should survive a new hire's third week.",
    },
    { type: "h2", text: "Standardize the path, not the personality" },
    {
      type: "p",
      text: "Standard work is the current best way, written where the job happens. It covers the sequence a new person should follow and the picture of done. It is allowed to change when a better way survives a week of real jobs. It is not allowed to change because someone felt like improvising on a Tuesday. The [SOP loop](/guides/how-to-create-sops/) is how you capture that way without boiling the ocean.",
    },
    {
      type: "p",
      text: "Train to the page, then watch three real jobs, not a quiz. People copy what gets praised. If you praise heroics that skip the standard, the standard is a poster. Praise the job that matches the page and still lands well with the customer.",
    },
    { type: "h2", text: "Put a check at the handoff" },
    {
      type: "p",
      text: "Quality fails in the gaps between people. The salesperson promises a date the shop cannot hit. The shop finishes a unit nobody inspects. The installer discovers the miss in the customer's driveway. Put a short check where the work changes hands. The check is a few items that predict a complaint: the spec matches the order, the parts are the parts, the date is a date you can keep.",
    },
    {
      type: "p",
      text: "The person who receives the work is the right checker when they can refuse it. A handoff that cannot be refused is a suggestion. Give them the authority to send it back, and a place to note why, so the upstream step sees the pattern. A week of notes will show whether you have a training gap or a promise the operation cannot make.",
    },
    { type: "h2", text: "Watch leading signals" },
    {
      type: "p",
      text: "Customer complaints are late. By the time a review shows up, the bad jobs are already in the wild. Watch signals that move earlier: rework per finished job, jobs that miss the promised window, handoffs sent back, and time a job sits between steps. Pick two. Put them where the team can see them weekly. If rework rises as volume rises, you are scaling the defect. Slow the intake or fix the step before you add another crew.",
    },
    {
      type: "panel",
      items: [
        "Rework or refunds per finished job.",
        "Share of jobs that miss the date you promised.",
        "Handoffs rejected, and the reason in a few words.",
        "Age of the oldest job sitting between two steps.",
      ],
    },
    { type: "h2", text: "Automate a stable process only" },
    {
      type: "p",
      text: "Software and machines copy whatever you encode. If the steps still change every week, automation freezes the confusion and makes it harder to see. Automate when the same inputs produce the same correct output, the exceptions are listed, and a person has run the manual version without you. Start with the boring middle: status messages, invoice creation from a completed job, reorder points you already trust.",
    },
    {
      type: "p",
      text: "Keep a human on the exception path. The point of automation is to free judgment for the jobs that do not fit, not to remove the ability to notice a job that does not fit. If the tool cannot flag the exception, you are not ready to trust it with the standard path either.",
    },
    { type: "h2", text: "Add capacity at the constraint" },
    {
      type: "p",
      text: "A second crew, a second shift, or a second location copies your system, including its limit. Find the step where the queue grows before you add people everywhere. Extra people upstream of a full step create a bigger pile and more waiting, which is where quality stories begin. The bottleneck walk belongs here: throughput, queue, and lead time, then exploit that step before you hire around it.",
    },
    {
      type: "p",
      text: "When you do add people, pair them with the standard and the handoff check in the first week. A new hire without a page will invent a personal version of the job. That version might be fine. It will not be the same, and \"the same\" is what customers experience as reliability.",
    },
    { type: "h2", text: "Try the call" },
    { type: "scenario" },
  ],
  scenario: {
    industry: "Commercial landscaping",
    scenario:
      "You are adding three crews for a busy season. Quality complaints rose last summer as you grew: missed mow heights and properties skipped. There is no written route standard. Crew leads text you photos when they remember. A software vendor wants to sell routing automation that \"removes human error.\" Your best lead says the new hires just need to care more.",
    prompt: "What should you do before the season hits?",
    choices: [
      { id: "a", text: "Buy the routing software so the new crews cannot skip steps" },
      { id: "b", text: "Write the property standard, check it at the end of each route, and track misses weekly" },
      { id: "c", text: "Hire only people who already care, and skip the paperwork" },
      { id: "d", text: "Add a fourth crew so each property gets more attention" },
    ],
    correctChoiceId: "b",
    explanation:
      "The misses are undefined work and no check at the end of the route. Automation would copy that gap. Another crew multiplies it. A written standard and a route check give the new people something to match.",
  },
  faqs: [
    {
      question: "How do you scale without quality dropping?",
      answer:
        "Define the work that must stay identical, teach that version, and check it where the job changes hands. Watch rework and missed promises every week. Add people at the step that is actually full, not everywhere, and only automate steps that already run the same way twice.",
    },
    {
      question: "When should you automate an operation?",
      answer:
        "After the process is stable: same inputs, same correct output, exceptions listed, and someone other than you has run it from the page. Automating a process that still changes freezes the wrong version and hides the misses inside the tool.",
    },
    {
      question: "What metrics show quality is slipping as you grow?",
      answer:
        "Rework or refunds per finished job, the share of jobs that miss the promised date, and handoffs that get sent back. Complaints and reviews move later. If those early counts rise with volume, slow intake or fix the step before you add capacity.",
    },
  ],
  related: ["how-to-create-sops", "how-to-find-the-bottleneck", "when-to-hire-your-first-employee"],
};

export default guide;

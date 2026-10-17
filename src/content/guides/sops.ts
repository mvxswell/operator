import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-create-sops",
  skill: "operations",
  title: "How to Create SOPs and Systemize Your Business",
    description:
      "Write procedures for tasks that pull you back in. Record the work, turn it into a short page, and have someone else run it. Name an owner and a review date.",
  answer:
    "Systemize the work that pulls you back in most often. Record yourself doing it, turn that into a short page, and have someone else run the page while you watch. Assign an owner and a review date, or the document becomes folklore.",
  blocks: [
    { type: "h2", text: "Start where you get dragged back in" },
    {
      type: "p",
      text: "A company does not need a binder of procedures before it needs one page for the task that interrupts you three times a week. List the moments you get called: the exception at the register, the way a job is opened, the steps to send a quote, the close of day. Rank them by how often they pull a specific person, usually you, off something only that person can do. The top of that list is the first SOP. The rest can wait.",
    },
    {
      type: "p",
      text: "Skip rare work and skip work that is still changing every week. A procedure for a process you are redesigning will be wrong before anyone uses it. Stabilize the steps, then write them. If you cannot do the task the same way twice, you are not ready to hand it to a page.",
    },
    { type: "h2", text: "Record, document, test with someone else" },
    {
      type: "p",
      text: "Do the task once while you record the screen or narrate the physical steps. Do not write from memory. Memory skips the click that actually matters and adds advice nobody can follow. Watch the recording and write only the actions: where to click, what to say, what \"done\" looks like, and the two or three exceptions that really happen.",
    },
    {
      type: "p",
      text: "Then hand the page to someone who was not in the recording. They run it. You stay quiet unless they are stuck or about to cause harm. Every question they ask is a hole in the page. Fix the page, not their character. A second person should be able to finish the task without you. That is the test. If they cannot, the SOP is a draft.",
    },
    { type: "h2", text: "Use a short template" },
    {
      type: "p",
      text: "One page is the goal. Two pages is a warning. A template keeps you from writing an essay. Fill these lines and stop.",
    },
    {
      type: "panel",
      items: [
        "Name of the task, and the result in one sentence.",
        "Who runs it, and who to ask if a step breaks.",
        "When it happens: the trigger, not \"as needed.\"",
        "Steps in order, with the screen, tool, or place named.",
        "What done looks like, so they can check their own work.",
        "The exceptions worth writing, and what to do for each.",
      ],
    },
    {
      type: "p",
      text: "Store it where the work happens. A quote SOP belongs next to the quoting tool, not in a drive nobody opens. Link it from the task, pin it at the bench, or put the first step in the job template. If people have to hunt, they will ping you instead.",
    },
    { type: "h2", text: "Name an owner and a review" },
    {
      type: "p",
      text: "Every page needs a person who is allowed to change it, and a date. Quarterly is enough for stable work. Sooner if the tool or the offer changed. The owner is not a committee. When the software moves a button, that person updates the screenshot or the sentence within a week. An outdated SOP is worse than none, because people follow it into the old process and then stop trusting the folder.",
    },
    {
      type: "p",
      text: "Review means someone who does the work runs the page and marks what drifted. It does not mean a meeting about documentation culture. If the page and the work disagree, the work you want is what gets written. If you are not sure which version you want, decide that first.",
    },
    { type: "h2", text: "Systemize in a loop, not a project" },
    {
      type: "p",
      text: "After the first page works, take the next task from the interruption list. One a week will change a small company in a season. A \"we will document everything in March\" project produces a pile of unread pages and a tired owner. Tie each page to a delegation rung: once someone else can run it, you stop being the backup for that task. The [delegation guide](/guides/how-to-delegate) is how the page becomes someone else's job rather than your script.",
    },
    {
      type: "p",
      text: "Measure the loop with a simple count: how many times you were pulled into that task this week, compared with the week before the page existed. If the count does not fall, the page is not in the path of the work, or the task was never the real interruption.",
    },
    { type: "h2", text: "Leave judgment out of the steps" },
    {
      type: "p",
      text: "Procedures are for repeatable action. They are not for taste, pricing strategy, or a customer's unusual risk. Write the boundary: \"If the job is over this amount, stop and ask.\" That single line keeps the SOP from pretending to replace judgment and keeps the exceptions from living only in your head. The rest of the page should be boring. Boring is what makes it usable on a busy Tuesday.",
    },
    { type: "h2", text: "Try the call" },
    { type: "scenario" },
  ],
  scenario: {
    industry: "Property management",
    scenario:
      "You are the only person who can onboard a new owner: the bank form, the portal invite, the maintenance vendors, and the first statement. It happens a few times a month and each one pulls you for half a day. You also have a rare insurance claim that went badly last year. Your assistant suggests a company-wide documentation week.",
    prompt: "What should you systemize first?",
    choices: [
      { id: "a", text: "A full manual of every property task, written from memory over the documentation week" },
      { id: "b", text: "The owner-onboarding steps, recorded once, tested by the assistant, with you named as reviewer" },
      { id: "c", text: "The rare insurance claim, because it was painful" },
      { id: "d", text: "Nothing, until you hire an operations manager to write it all" },
    ],
    correctChoiceId: "b",
    explanation:
      "Onboarding is frequent, repeatable, and it steals your half-days. Record it, let someone else run the page, and review it. A rare claim and a documentation week do not remove the interruption.",
  },
  faqs: [
    {
      question: "How do you start creating SOPs?",
      answer:
        "List the tasks that pull a specific person back in, and write the most frequent one first. Record the work, turn it into a short page, and have someone else perform it while you note every question. That test is the SOP. Memory is not.",
    },
    {
      question: "What should an SOP include?",
      answer:
        "The result, who runs it, what triggers it, the steps in order, what done looks like, and the few exceptions that matter. Name an owner and a review date. Keep it to a page and store it where the work happens.",
    },
    {
      question: "How often should procedures be updated?",
      answer:
        "When the tool or the offer changes, and on a set review for stable work, often quarterly. The owner of the page updates it. A procedure that disagrees with the work teaches people to ignore the folder.",
    },
  ],
  related: ["how-to-scale-operations", "how-to-delegate", "how-to-find-the-bottleneck"],
};

export default guide;

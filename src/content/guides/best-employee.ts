import type { Guide } from "./types";

const guide: Guide = {
  slug: "what-to-do-when-your-best-employee-quits",
  skill: "people",
  title: "What to Do When Your Best Employee Quits",
    description:
      "When your best employee quits, do not counter in the doorway. Protect the work within 48 hours, transfer what they know, then decide whether the role returns.",
  answer:
    "Do not negotiate in the doorway. In the first 48 hours, protect the work: write down what only they hold, name a temporary owner for each piece, and book a real conversation for the next day.",
  blocks: [
    { type: "h2", text: "Stop the reaction" },
    {
      type: "p",
      text: "A resignation from a strong person lands like a verdict on the company. It usually is not. It is one person choosing a different next year. If you answer with a number, a guilt trip, or a promise you have not priced, you will either buy a short stay or damage the exit. Say you are sorry to lose them, thank them for telling you directly, and ask for a meeting tomorrow. Then stop talking.",
    },
    { type: "h2", text: "Hold the follow-up the next day" },
    {
      type: "p",
      text: "Use a quiet room and a fixed length, thirty to forty-five minutes. Ask what they want the next role to do for them, what would have had to be true for them to stay, and what they are walking toward. Listen longer than you explain. You are gathering a decision, not winning an argument.",
    },
    {
      type: "p",
      text: "Ask them to name the work that will break if they leave on the date they gave you. People who are proud of their job will tell you. People who have already checked out will be vague. Both answers are useful. End by repeating the last day, the handover plan, and the date you will come back with a clear response if a counteroffer is even on the table.",
    },
    { type: "h2", text: "Decide whether a counteroffer is real" },
    {
      type: "p",
      text: "A counteroffer is a business decision, not a reflex. Match it to the reason they gave. Money can answer money. Money does not answer a broken manager, a spouse moving cities, or a job they have wanted for years. If you pay to cover a problem you will not fix, you rent a few months and teach everyone else that quitting is how raises happen.",
    },
    {
      type: "p",
      text: "If you do counter, put the offer in writing the same day: the new pay, the start date of that pay, and the one or two conditions that make the job different. A vague \"we'll take care of you\" is how trust dies. If you will not counter, say that plainly and put your energy into the handover.",
    },
    { type: "h2", text: "Build a critical-work register" },
    {
      type: "p",
      text: "Before you post the job, list the work that actually depends on this person. Do it with them and with whoever will feel the gap. Four columns are enough. If a line has no name except theirs, that line is the risk, not the org chart title.",
    },
    {
      type: "panel",
      items: [
        "Clients and accounts they personally hold, including who the client calls when something breaks.",
        "Deadlines in the next 30 days, and which ones move if nobody picks them up.",
        "Systems, logins, files, and recipes that live in their head or their laptop.",
        "Approvals they alone can give, and what happens to the queue when they stop.",
      ],
    },
    {
      type: "p",
      text: "Rank the list by what hurts this week, not by what sounds important in a job description. A renewal conversation on Thursday outranks a process document you have meant to write since spring.",
    },
    { type: "h2", text: "Name temporary owners within one business day" },
    {
      type: "p",
      text: "Every line on the register needs a name before the end of the next business day. Temporary is allowed. \"The team\" is not a name. Tell the client, the vendor, or the crew who to call, in a short note from you, not a forwarded resignation email.",
    },
    {
      type: "p",
      text: "Give the temporary owner the authority that matches the task. If they can be blamed for a late order but cannot approve the substitution, you have added a bottleneck. Write the limit in one sentence: what they can decide, what they must bring back to you, and the date the temporary arrangement ends.",
    },
    { type: "h2", text: "Transfer knowledge before access comes off" },
    {
      type: "p",
      text: "Schedule the handover while they still have access and still feel like a colleague. Sit with them on the live work: the inbox rules, the exception the big client always asks for, the spreadsheet that is not where the folder says it is. Record a short screen walk for anything you will not remember. A written SOP can come later. The point this week is that the next person can finish Friday.",
    },
    {
      type: "p",
      text: "Remove access on the last day, not in anger on day one. Early lockouts punish the handover and create a shadow IT problem when they text passwords to a friend. Make a list of accounts now, and turn them off in one pass when the day is done. Collect the laptop, keys, and any customer files that should never have lived only on that machine.",
    },
    { type: "h2", text: "Close the exit without improvising the law" },
    {
      type: "p",
      text: "Run a short exit interview after the handover, not instead of it. Ask what they would fix first if they stayed a year, and what you should stop doing. You will hear some of this in the resignation talk. The second conversation is calmer and often more specific.",
    },
    {
      type: "p",
      text: "Final pay, unused time off, and required notices follow the rules where you employ them. Those rules differ by state and country. This is not legal advice. Ask payroll or counsel what you must pay, and by when, then do that on time.",
    },
    { type: "h2", text: "Choose what happens to the work" },
    {
      type: "p",
      text: "Replacing them is one option. It is not the default. Look at the register and pick one path for the role as a whole, then a path for any leftover tasks.",
    },
    {
      type: "ul",
      items: [
        "Replace, if the work is real, repeating, and already larger than one careful person.",
        "Promote from inside, if someone has been doing the core of it and wants the seat.",
        "Redesign, if the job was three jobs and that is why they left.",
        "Outsource the narrow piece that is skilled but not constant.",
        "Stop the work that nobody will miss, including reports that existed for them.",
      ],
    },
    {
      type: "p",
      text: "Tell the team the path within a week. People fill a silence with rumors, and the best remaining people update their own plans while you \"think about it.\" You can still be sad they left. The business needs an owner for the work anyway.",
    },
    { type: "h2", text: "Try the call" },
    {
      type: "p",
      text: "Use the same kind of situation the skill test uses. The facts are in the paragraph. Pick the move that protects the business this week.",
    },
    { type: "scenario" },
  ],
  scenario: {
    industry: "Regional logistics",
    scenario:
      "Your operations manager gives two weeks' notice on a Monday. She runs the morning dispatch, holds the relationship with your largest shipper, and is the only person who can release a held invoice. Two drivers are already asking who to call about Thursday's route change. She says a competitor offered her a shorter commute. You can afford a modest raise. The shipper's quarterly review is Friday.",
    prompt: "What should you do first?",
    choices: [
      { id: "a", text: "Match the offer on the spot so she stays through the review" },
      { id: "b", text: "Book tomorrow's conversation, then assign a named owner for dispatch, the shipper, and invoice release today" },
      { id: "c", text: "Post the job publicly this afternoon and let the team cover things informally" },
      { id: "d", text: "Cut her system access now so customer files cannot leave with her" },
    ],
    correctChoiceId: "b",
    explanation:
      "The review and the routes fail if nobody owns them, whether she stays or not. A doorway raise does not tell you if commute is the real reason, and locking her out today throws away the only person who can hand the work over.",
    work: [
      "Separate the emotional reply from the work that is due this week.",
      "Name an owner for each live commitment before you redesign the job.",
      "Keep access in place until the handover date, then remove it in one pass.",
    ],
  },
  faqs: [
    {
      question: "Should you counteroffer when your best employee quits?",
      answer:
        "Only when the reason is something you can actually change, and you can write the new terms the same day. A raise does not fix a manager, a move, or a job they already want. If you counter, make the job different in a way they named, not just more expensive.",
    },
    {
      question: "How fast should you replace a key employee?",
      answer:
        "Name temporary owners within one business day. Decide whether to replace, promote, redesign, outsource, or stop the work after you can see the register. Hiring into the old job description copies the overload that may have caused the exit.",
    },
    {
      question: "What belongs in a handover before someone leaves?",
      answer:
        "Live clients, deadlines inside 30 days, the systems and files only they can open, and the approvals that stop if they stop. Walk through the real work together while they still have access. A polished manual can wait.",
    },
  ],
  related: ["how-to-delegate", "how-to-create-sops", "when-to-hire-your-first-employee"],
};

export default guide;

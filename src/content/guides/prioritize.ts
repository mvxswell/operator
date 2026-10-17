import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-prioritize",
  skill: "prioritization",
  title: "How to Prioritize as a Business Owner",
    description:
      "Rank work by revenue, margin, cash, or risk, then by effort. Loud tasks can wait. When you add a commitment, name what drops. Review the short list weekly.",
  answer:
    "Separate what is loud from what moves revenue, margin, cash, or risk. Rank the real items by impact, then by how much effort they take. When you add something, name what you will stop. Do that review once a week.",
  blocks: [
    { type: "h2", text: "Urgent is not the same as important" },
    {
      type: "p",
      text: "Urgent is a clock: someone is waiting, a date is close, a message is unread. Important is a consequence: revenue, margin, cash, or a risk that can hurt the business if you ignore it. A lot of owner weeks fill with urgent work that does not touch those four. The unread message feels like the job. The price you have not raised, the hire you have not made, and the customer who is quietly leaving do not ping you.",
    },
    {
      type: "p",
      text: "Each morning, write the items that are both urgent and important and do those first. Park the urgent-only list for a set hour so it does not eat the day. Important work with no clock needs a date you choose, or it will lose to whoever shouted last.",
    },
    { type: "h2", text: "Score impact before effort" },
    {
      type: "p",
      text: "For each candidate, ask what moves if it goes well: revenue, margin, cash, or risk. One of those, in a sentence, with a direction. \"Sends invoices the day the job ends\" is cash. \"Redesigns the van wrap\" is none of the four unless you can point at lost work the wrap causes. If you cannot name the effect, it is not a priority yet. It is an idea.",
    },
    {
      type: "p",
      text: "Then ask about effort: hours, cash, and whether it needs you or someone else. A high-impact item you can finish this week outranks a high-impact item that needs a quarter and a budget you do not have. That is sequencing, not a value judgment. The big item stays on the list with a start condition. It does not jump the queue because it sounds strategic.",
    },
    { type: "h2", text: "A light ICE pass" },
    {
      type: "p",
      text: "When the list is longer than a page, score each item 1 to 5 on impact, confidence, and ease. Impact is how much the four outcomes move. Confidence is how sure you are that this action causes that move. Ease is how little effort it takes. Multiply the three. The product is a sort order, not a truth. Use it to drop the bottom of the list and to stop a pet project with high ease and no impact from staying on top.",
    },
    {
      type: "p",
      text: "Do not fake precision. A 4 and a 5 are \"this matters\" and \"this matters more.\" If two items tie, pick the one that unblocks other people. A decision that lets a crew work is worth more than a solo task with the same score.",
    },
    { type: "h2", text: "Adding means dropping" },
    {
      type: "p",
      text: "Your week already has a size. A new commitment that does not name its victim is how priorities become a pile. When you say yes, point at the item that moves down or off. Say it to the person who wanted the new thing, including when that person is you. \"We can start the second location checklist after the invoicing backlog is under seven days\" is a priority. \"We'll try to get to it\" is a stall.",
    },
    {
      type: "panel",
      items: [
        "What is the outcome, in revenue, margin, cash, or risk?",
        "What is the effort in hours and money, and whose hours?",
        "What comes off the list if this goes on?",
        "What is the date you will look and decide whether it worked?",
      ],
    },
    { type: "h2", text: "Run a weekly cadence" },
    {
      type: "p",
      text: "Once a week, thirty minutes, same time. Look at the open list, the numbers that matter, and what slipped. Choose three outcomes for the coming week, not fifteen tasks. Tasks hang off the outcomes. During the week, new requests go on a capture list. They do not reorder the three unless something is actually on fire: payroll, a safety issue, a customer you are about to lose.",
    },
    {
      type: "p",
      text: "End the week by noting which of the three moved. If none moved, the list was fantasy or the week was stolen by urgent noise. Either way, next week's list should be shorter. A priority system that never changes the calendar is a diary.",
    },
    { type: "h2", text: "Read the data, not the loudest voice" },
    {
      type: "p",
      text: "Someone in the business will always have a vivid explanation. Vivid is not the same as large. Before you reorder the week around a story, ask which number would have to be true for that story to be the constraint. If the number says something else, the number wins and the story becomes a question, not a plan.",
    },
    {
      type: "p",
      text: "This is the same habit as the grocery-chain daily decision on the site: a loud manager, a competitor story, and a set of figures that point somewhere more specific. Practice it on the scenario below.",
    },
    { type: "h2", text: "Try the call" },
    { type: "scenario" },
  ],
  scenario: {
    industry: "Grocery chain",
    scenario:
      "Same-store sales are flat. Your loudest store manager says a competitor's new location is taking customers. Basket size is up 3%, transaction count is down 5%, and loyalty members visit 2.0 times a month instead of 2.4. He wants a price-match campaign this week and a new grand-opening style ad.",
    prompt: "What should you prioritize?",
    choices: [
      { id: "a", text: "The price-match campaign, because the manager is closest to the floor" },
      { id: "b", text: "A visit-frequency problem among customers you still have" },
      { id: "c", text: "A pricing overhaul, because basket size rose" },
      { id: "d", text: "Nothing. Flat sales are just noise for a week of meetings." },
    ],
    correctChoiceId: "b",
    explanation:
      "Known customers are still shopping and spending a bit more when they come. They come less often. That is a frequency problem, which is a different project from matching a competitor the data has not shown you are losing people to.",
  },
  faqs: [
    {
      question: "How should a CEO prioritize?",
      answer:
        "Sort work by whether it moves revenue, margin, cash, or risk, then by effort and how sure you are it will work. Do the urgent-and-important items first. Put a date on important work that nobody is shouting about. Review the short list once a week.",
    },
    {
      question: "What is ICE scoring?",
      answer:
        "A quick sort: rate impact, confidence, and ease from 1 to 5 and multiply. It is a way to order a long list and to demote easy work that does not matter. It is not a precise forecast, and a tie should go to whatever unblocks other people.",
    },
    {
      question: "How do you say no to a new priority?",
      answer:
        "Name the item that will drop if the new one starts, and the date you will revisit. A yes without a drop pretends the week got bigger. Most weeks do not.",
    },
  ],
  related: ["how-to-find-the-bottleneck", "where-to-invest-next-dollar", "how-to-delegate"],
};

export default guide;

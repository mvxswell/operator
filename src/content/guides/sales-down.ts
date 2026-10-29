import type { Guide } from "./types";

const guide: Guide = {
  slug: "why-are-sales-down",
  skill: "sales",
  title: "Why Are Sales Down",
    description:
      "Sales equal traffic times conversion times order value times repeat buys. Find which term moved before changing the offer. A floor story is a clue, not a plan.",
  answer:
    "Break sales into traffic, conversion, order value, and purchase frequency. Compare each term with the period before the drop. Fix the term that moved. A story from one customer is a clue, not a diagnosis.",
  blocks: [
    { type: "h2", text: "Write the sentence before the story" },
    {
      type: "p",
      text: "Sales dollars are a product of a few counts. How many potential buyers showed up. What share of them bought. How much each order was worth. How often a buyer comes back in the period you care about. If revenue fell, one or more of those terms fell. Until you know which, every fix is a guess wearing a uniform: a discount, a new ad, a speech to the team.",
    },
    {
      type: "p",
      text: "Pull the same four numbers for the weak period and for the period you are comparing with, same length, similar season if your year has one. You need a before, or \"down\" is a mood. Use whatever source you already trust: the register, the CRM, the invoicing tool. Do not wait for a new dashboard.",
    },
    { type: "h2", text: "Find the term that moved" },
    {
      type: "p",
      text: "Walk them in order. If traffic is down and conversion, order value, and frequency are steady, you have a demand problem. More closing skill will not invent visitors. If traffic is steady and conversion fell, the offer, the follow-up, the price, or the fit of the lead changed. If traffic and conversion held and order value fell, people are buying cheaper mixes or you discounted. If the first three held and frequency fell, old customers are coming less often. That is a retention problem, and a new-customer campaign will mask it for a month.",
    },
    {
      type: "p",
      text: "Two terms can move at once. Work the one that explains most of the dollar gap. A 5% dip in order value and a third fewer visitors are not the same project. Do the arithmetic in dollars, roughly, so a loud percentage on a small base does not steal the week.",
    },
    { type: "h2", text: "A worked drop" },
    {
      type: "p",
      text: "Suppose a shop's monthly sales fell from about $80,000 to about $62,000. These are round figures for the method, not a report on a real chain. Last month: 2,000 transactions, $40 average. This month: 2,050 transactions, $30 average. Traffic, if you count transactions as a stand-in, did not fall. The average order did. A story about \"nobody walking in\" does not match the count. The work is the basket: what people stopped adding, what you stopped suggesting, or a discount that became the new normal.",
    },
    {
      type: "p",
      text: "Change one assumption and the plan changes. If transactions had fallen from 2,000 to 1,400 and the average stayed $40, the basket is innocent and you would look at foot traffic, hours, and the channel that used to fill the store. Same symptom, opposite first move. That is why the split comes before the meeting.",
    },
    {
      type: "panel",
      items: [
        "Traffic down, other terms steady: restore the channel that used to bring qualified buyers.",
        "Conversion down: fix the offer, the follow-up, or the fit of the lead.",
        "Order value down: look at the mix and any discount that became normal.",
        "Frequency down: old buyers are quieter. That is retention, not a new-ad problem.",
      ],
    },
    { type: "h2", text: "Use anecdotes as questions" },
    {
      type: "p",
      text: "The team will volunteer causes. The leads are worse. The competitor opened. The weather. The website. Write each cause next to the term it would move. Worse leads move conversion, not traffic, if you are still counting the same top-of-funnel number. A competitor who takes your regulars moves frequency or traffic. Weather that keeps people home moves traffic. If the cause and the term disagree, believe the term and ask a better question.",
    },
    {
      type: "p",
      text: "Talk to a handful of recent buyers and a handful of people who went quiet. You are listening for a repeated concrete change, not for a consensus. Five people who mention a slower reply time, in a month when conversion fell, is a lead. One person who wanted a loyalty app is a request.",
    },
    { type: "h2", text: "Change the broken term, then watch it" },
    {
      type: "p",
      text: "Pick one change aimed at the term that moved. If conversion fell after a price change, revisit the price or the way it is presented before you buy more traffic. If frequency fell, talk to lapsed customers and fix the reason they state before you fund an acquisition push. If traffic fell, restore the channel that used to produce qualified visits before you redesign the close.",
    },
    {
      type: "p",
      text: "Set a short window, often two to four weeks, and watch that term, not just total sales. Total sales can bounce for reasons you did not touch. If the term does not move, stop and look again. Stacking a second fix on top of an unread first fix is how you lose the lesson.",
    },
    { type: "h2", text: "What this is not" },
    {
      type: "p",
      text: "A single slow week inside a normal range is not a slump. Compare periods long enough to include a typical cycle of your sales. A slump that lines up with a constraint you can see — a full calendar, a broken delivery step — may not be a sales problem at all. If you are turning buyers away, read [why growth stalls](/guides/why-is-my-business-not-growing/) before you rebuild the funnel.",
    },
    { type: "h2", text: "Try the call" },
    { type: "scenario" },
  ],
  scenario: {
    industry: "Dental clinic",
    scenario:
      "New-patient revenue is down from last quarter. Ad spend is unchanged. The front desk says the new ads \"attract the wrong people.\" Show-ups to the first visit are flat. The share of show-ups who book treatment fell from about two thirds to under half. Average treatment value on the cases you do book is unchanged. The owner wants to switch agencies.",
    prompt: "What does the drop point to?",
    choices: [
      { id: "a", text: "Traffic, so change the agency and the ads first" },
      { id: "b", text: "Conversion from show-up to booked treatment" },
      { id: "c", text: "Order value, so raise treatment prices" },
      { id: "d", text: "Frequency, so start a recall campaign" },
    ],
    correctChoiceId: "b",
    explanation:
      "People are still arriving. The step that fell is the share who book treatment after they show up. A new agency spends against a term that did not move, and a price change aims at an average that held.",
  },
  faqs: [
    {
      question: "How do you diagnose a sales slump?",
      answer:
        "Split revenue into traffic, conversion, order value, and how often buyers return. Compare each one with the previous period. The term that moved is the project. Total sales alone does not tell you whether to fix ads, the offer, the basket, or the people who stopped coming back.",
    },
    {
      question: "Should you discount when sales are down?",
      answer:
        "Discount when order value or conversion fell for a reason a lower price would fix, and you can afford the margin. If traffic collapsed or old customers went quiet, a discount spends margin on the wrong term. Find the term first.",
    },
    {
      question: "Are staff anecdotes useful when sales fall?",
      answer:
        "They are useful as questions. Map each story to the term it would move. If the counts disagree with the story, follow the counts and use the conversations to learn why that term moved.",
    },
  ],
  related: ["how-to-get-more-customers", "why-is-my-business-not-growing", "how-to-price-a-service-business"],
};

export default guide;

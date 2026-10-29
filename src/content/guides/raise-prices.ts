import type { Guide } from "./types";

const guide: Guide = {
  slug: "should-i-raise-prices",
  skill: "strategy",
  title: "Should I Raise Prices",
    description:
      "Raise prices when costs moved, you are full, or almost every quote is a yes. Set the date, say who keeps the old price, and watch close rate and margin after.",
  answer:
    "Raise prices when your costs moved, you are turning work away, or almost every qualified buyer says yes. Announce the change with a date, decide who keeps the old price and for how long, and watch close rate and margin rather than the loudest complaint.",
  blocks: [
    { type: "h2", text: "Signals that the price is stale" },
    {
      type: "p",
      text: "Three signals are enough. Your costs for labor, materials, or overhead have moved and the price has not. The calendar is full of work you are not proud to discount. New proposals close so often that buyers are not pushing back. Any one of them can justify a look. All three together mean you are overdue. A feeling that you \"should charge more\" without one of those signals is a hunch. Check the floor in the [pricing guide](/guides/how-to-price-a-service-business/) before you pick a number.",
    },
    {
      type: "p",
      text: "A price can also be stale because the offer got bigger. You added reporting, faster response, or a better material and left the old number in the proposal. That is a raise you already delivered. The invoice should catch up, or you should take the extra back out of the scope.",
    },
    { type: "h2", text: "Check how demand might move" },
    {
      type: "p",
      text: "Some buyers will say no. That is the test, not a disaster. You are asking whether the buyers you want still say yes often enough, at a higher margin, to beat the old book. If you are at capacity, losing a few price-sensitive jobs is how you make room. If you have empty weeks, a raise still can be right, and you should expect to replace some volume with better-fit work or a tighter offer.",
    },
    {
      type: "p",
      text: "You will not get a perfect forecast. Use the close rate you have. If you win nearly all of the quotes you want, a modest step up is unlikely to empty the pipeline. If you already lose most quotes on price, a raise without a change in who you talk to or what you include will hurt. Fix the fit of the lead or the shape of the offer in the same move, or do not raise yet.",
    },
    { type: "h2", text: "Choose the step and who it covers" },
    {
      type: "p",
      text: "New work takes the new price on a date you pick. Existing customers need a rule you can say in one sentence. Common rules: the new price at the next renewal, the new price after a notice period, or a grandfathered rate for a defined time because they bought a package that included it. Open-ended grandfathering means you run two companies forever. Put an end date on it.",
    },
    {
      type: "p",
      text: "A single step you can explain, often in the range of a noticeable but not theatrical change, beats a series of tiny rises nobody writes down. Match the size to the gap. If costs jumped and you are far below the floor, one small step will not repair the year. Say so, and consider a larger correction with a clearer scope so the buyer can see what they are paying for.",
    },
    { type: "h2", text: "Say it plainly" },
    {
      type: "p",
      text: "Tell the people who will see the new number before they see it on an invoice. A short note is enough: what is changing, the date, and the reason in plain language, usually costs or the level of service. Skip the apology essay. Offer a conversation for accounts that are large or mid-contract. Do not offer a secret discount to anyone who complains unless you are willing to make that the new policy.",
    },
    {
      type: "panel",
      items: [
        "The new price, or the rule that produces it.",
        "The date it applies, including what happens to work already booked.",
        "Who keeps the old price, and until when.",
        "What you will count afterward: close rate, margin, and who left.",
      ],
    },
    { type: "h2", text: "Watch the right numbers after" },
    {
      type: "p",
      text: "For the next several proposals, track win rate on qualified quotes and the margin on the work you win. A lower win rate can still be a better business if the jobs you keep pay more and your week is no longer full of thin work. A win rate that collapses, with the same kind of buyer, means the step was too large or the offer is unclear. Adjust once, with the evidence, rather than reverting because one email was unhappy.",
    },
    {
      type: "p",
      text: "Also watch who leaves. If your worst-fit, highest-maintenance accounts leave and the core stays, the raise did a sorting job. If the core leaves, call them and ask what they compared you with. The answer is either a real market problem or a notice that felt like a surprise. Both are fixable. Guessing between them is not.",
    },
    { type: "h2", text: "Cash and the raise" },
    {
      type: "p",
      text: "A higher price does not help a cash crunch this week unless the new invoices are the ones that get paid soon. If the bank account is the emergency, collections and deposits come first. Use the raise so the next quarter is not the same emergency. See [cash flow](/guides/how-to-improve-cash-flow/) if the pain is timing rather than margin.",
    },
    { type: "h2", text: "Try the call" },
    { type: "scenario" },
  ],
  scenario: {
    industry: "IT support",
    scenario:
      "Your monthly plans have been $99 a seat for three years. Labor and software costs are up. You are booked out and win nearly every new proposal. A long-time client with forty seats will renew in sixty days. Another owner tells you to add a fee quietly on the next invoice so nobody has time to argue.",
    prompt: "What is the better move?",
    choices: [
      { id: "a", text: "Leave the price. A full book means you should not risk anyone leaving." },
      { id: "b", text: "Add the higher price on the next invoice with no notice." },
      { id: "c", text: "Announce a new price with a date, tell the renewing client now, and grandfather only through the current term." },
      { id: "d", text: "Discount the forty-seat client permanently so the rest of the list can rise." },
    ],
    correctChoiceId: "c",
    explanation:
      "Costs moved, the book is full, and new buyers are not resisting. A dated announcement respects the renewal. A silent invoice and a permanent exception both make the price a fight instead of a policy.",
  },
  faqs: [
    {
      question: "When should a small business raise prices?",
      answer:
        "When costs have risen, you are turning away work, or qualified buyers almost always accept the quote. Also when the offer grew and the number did not. Check the price against your hourly floor and against what those buyers compare you with.",
    },
    {
      question: "Should existing customers keep the old price?",
      answer:
        "Give them a clear end, such as the next renewal or a notice period you state. Grandfathering forever means the old book subsidizes the new one and you never finish the change. Tell them before the invoice does.",
    },
    {
      question: "How do you know if a price increase worked?",
      answer:
        "Watch the close rate on new qualified quotes and the margin on work you win. Some lost deals are the point if you were overfull. If the buyers you want leave in a group, the step was too big or the notice was a surprise. Adjust once, using that evidence.",
    },
  ],
  related: ["how-to-price-a-service-business", "how-to-improve-cash-flow", "should-you-expand"],
  extraLinks: [{ href: "/skills/financial/", label: "Take the Financial Judgment test" }],
};

export default guide;

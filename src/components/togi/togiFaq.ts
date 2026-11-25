/**
 * Visible FAQ copy and the FAQPage JSON-LD share this list.
 * Answers stay general or describe the feed. They do not state counts or P&L.
 */
export const TOGI_FAQS: readonly { question: string; answer: string }[] = [
  {
    question: "Does Togi trade SPY calls?",
    answer:
      "He posts option trades on X, and this tracker lists a trade on the SPY calls page when the feed tags the ticker as SPY. The type is whatever that post disclosed, such as calls. Some posts mention SPY without saying whether the contracts were calls or puts, and those rows keep the type he posted. Posts recorded under another ticker, including SPXW, stay on the main tracker.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "From Togi's public posts on X (@ShaneStoffer). The page loads the JSON feed at https://togi-tracker.mrm1244.workers.dev/trades.json. If that request fails, it shows a snapshot saved with this site. A source link is shown only when the feed includes an X post URL.",
  },
  {
    question: "Is this affiliated with Togi?",
    answer:
      "No. This is an unofficial fan tracker. It is not affiliated with, endorsed by, or run by Togi (Shane Stoffer).",
  },
  {
    question: "Is this financial advice?",
    answer:
      "No. This is not financial advice. It records public posts. It is not a recommendation to trade SPY calls or any other contract.",
  },
  {
    question: "How current is the last-updated date?",
    answer:
      "The date is the feed's last updated field. It is the day that feed was updated, not a claim that every post has been added. Numbers he did not post are left as not disclosed.",
  },
];

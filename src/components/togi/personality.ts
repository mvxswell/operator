import { isTogiPortfolio, xPostUrl, type TogiData } from "../../lib/togi";

/** A joke scale with no ceiling. It never changes the tracker's financial figures. */
export function degenHeat(raw: number) {
  const points = Number.isFinite(raw) ? Math.max(0, raw) : 0;
  const tiers = [
    { min: 0, next: 100, name: "Suspiciously responsible", icon: "🧊" },
    { min: 100, next: 250, name: "Spicy", icon: "🌶️" },
    { min: 250, next: 500, name: "Fully cooked", icon: "🔥" },
    { min: 500, next: 1000, name: "Nuclear", icon: "☢️" },
    { min: 1000, next: 2000, name: "Financial final boss", icon: "👑" },
    { min: 2000, next: 4000, name: "Call the fire department", icon: "🚒" },
  ];
  const tier = tiers.find((t) => points < t.next) ?? {
    min: 4000,
    next: 4000 * 2 ** (Math.floor(Math.log2(points / 4000)) + 1),
    name: "Beyond science",
    icon: "🛸",
  };
  return { points, ...tier, progress: points / tier.next * 100, remaining: tier.next - points };
}

export const EIGHT_BALL_ANSWERS = [
  "Ask again after his next dream.",
  "Signs point to GPRO.",
  "Outlook: 0DTE.",
  "Reply hazy. Check his X.",
  "Only if MRNA cooperates.",
  "Concentrate and full port again.",
  "Don't count on it. He might, though.",
  "Cannot predict now. Market's closed.",
  "It is decidedly… not financial advice.",
  "The coin has retained legal counsel.",
  "Ask the flower lady. She runs risk now.",
  "The Greeks are speaking. Nobody is listening.",
  "The thesis came to him in a nap.",
  "Robinhood has left the group chat.",
  "Sources say: vibes.",
  "The 8-ball has diversified into cash.",
  "Market research: one coin, two outcomes.",
  "Please hold. The dream is buffering.",
  "Strong conviction. Weak Wi-Fi.",
  "This answer expires at market close.",
  "Bullish on the lore.",
  "Your margin call is trying to reach you.",
  "The stop loss is on a lunch break.",
  "GoPro makes cameras. Apparently it also makes plot twists.",
  "The coin flip needs a performance review.",
  "An analyst has been consulted. It was another coin.",
  "Risk management is currently a screenshot folder.",
  "The flower lady has declined to comment.",
  "All signs point to another all-caps tweet.",
  "The market would like a word with your thesis.",
  "The crystal ball switched to index funds.",
  "Technical analysis says: have you tried sleeping?",
  "The answer is priced in. The consequences aren't.",
  "Your fortune cookie just requested collateral.",
  "The coin says heads. The account says character development.",
  "Due diligence complete: he likes the cameras.",
] as const;

/** Exclude the last three answers without an unbounded retry loop. */
export function pickEightBallAnswer(recent: readonly number[], random = Math.random()) {
  const available = EIGHT_BALL_ANSWERS.map((_, i) => i).filter((i) => !recent.slice(-3).includes(i));
  const pick = Number.isFinite(random) ? Math.max(0, Math.min(.999999999, random)) : 0;
  const index = available[Math.floor(pick * available.length)];
  return { index, answer: EIGHT_BALL_ANSWERS[index] };
}

/** Surface the already-audited caption as a claim, never as a booked trade or balance. */
export function reportedLoss(data: TogiData) {
  if (!isTogiPortfolio(data.portfolio)) return null;
  const source = "https://x.com/ShaneStoffer/status/2124901951133393202";
  const post = data.portfolio.commentary?.find((c) => xPostUrl(c.source_url) === source && /losing the 700k/i.test(c.text));
  return post ? { date: post.date, amount: 700000, source, attribution: "Self-reported loss" } : null;
}

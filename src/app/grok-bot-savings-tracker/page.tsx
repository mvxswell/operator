import type { Metadata } from "next";
import { GrokBotSavings } from "@/components/savings/GrokBotSavings";
import { absoluteUrl } from "@/lib/site";
import "./savings.css";

// PRE-LAUNCH: noindex, and the route is left out of the sitemap and the nav.
// At launch (after Maxwell approves): set LAUNCHED = true, add { path: "/grok-bot-savings-tracker" }
// to src/app/sitemap.ts, and flip the launch assertions in tests/savings.test.cjs.
const LAUNCHED = false;

const title = "Grok Bot Savings Tracker: $300/mo, how much it saves";
const description =
  "I spend $300/mo on Grok Bot. Every real task my bots finish, priced at what a freelancer would charge, with rate sources, misses and redos. Estimates.";
const url = absoluteUrl("/grok-bot-savings-tracker");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  robots: LAUNCHED ? undefined : { index: false, follow: false },
  openGraph: { title, description, url, siteName: "Think Operator", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function GrokBotSavingsPage() {
  return <GrokBotSavings />;
}

import type { Metadata } from "next";
import { GrokBotSavings } from "@/components/savings/GrokBotSavings";
import { absoluteUrl } from "@/lib/site";
import "./savings.css";

// LAUNCHED (Maxwell approved, Nov 2, 2026): indexable and listed in src/app/sitemap.ts. Not in the nav.
// To pull it back to a private preview: set LAUNCHED = false and remove the sitemap entry.
const LAUNCHED = true;

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

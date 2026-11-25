import type { Metadata } from "next";
import { TogiTracker } from "@/components/togi/TogiTracker";
import { TOGI_FAQS } from "@/components/togi/togiFaq";
import { absoluteUrl } from "@/lib/site";
import "./togi.css";

const title = "Togi Tracker: Togi's SPY Calls and $10M Challenge (Unofficial)";
const description =
  "Unofficial fan tracker of Togi's public trades, including his SPY calls, and his road from $950K to $10M. Every number links his post. Not financial advice.";
const url = absoluteUrl("/togi");
const shareTitle = "Togi's $10M Challenge — Genius or Full Degen?";
const shareDescription = "The trades. The losses. The lore. Follow the $10M challenge with public trade receipts, uncapped degen heat and a deeply unqualified Magic 8-Ball. Unofficial fan tracker.";
// Each creative gets a fresh filename. Retain the file-convention PNGs as fallbacks.
const image = [{ url: absoluteUrl("/togi/share-v3.png"), width: 1200, height: 630,
  alt: "TOGI Tracker V2.0: Genius or full degen? A gold coin and Magic 8-Ball frame the $10M challenge. The trades. The losses. The lore." }];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title: shareTitle, description: shareDescription, url, siteName: "Togi Tracker", type: "website", images: image },
  twitter: { card: "summary_large_image", title: shareTitle, description: shareDescription, images: image },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: TOGI_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function TogiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      <TogiTracker />
    </>
  );
}

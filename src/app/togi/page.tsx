import type { Metadata } from "next";
import { TogiTracker } from "@/components/togi/TogiTracker";
import snapshotJson from "@/data/togiSnapshot.json";
import { absoluteUrl } from "@/lib/site";
import { compactChallengeUsd, currentChallengeView, isTogiData } from "@/lib/togi";
import "./togi.css";

if (!isTogiData(snapshotJson)) throw new Error("Togi snapshot is invalid");
const challenge = currentChallengeView(snapshotJson);
const startLabel = compactChallengeUsd(challenge.starting_value);
const goalLabel = compactChallengeUsd(challenge.goal);
const title = `Togi Tracker: Togi's ${startLabel} to ${goalLabel} Stock Challenge (Unofficial)`;
const description =
  `Togi Tracker is an unofficial fan tracker of Togi's public stock trades and his road from ${startLabel} to ${goalLabel}. Every number links his post. Not financial advice.`;
const url = absoluteUrl("/togi");
const shareTitle = `Togi's ${startLabel} to ${goalLabel} Challenge — Genius or Full Degen?`;
const shareDescription = `The trades. The losses. The lore. Follow the ${startLabel} to ${goalLabel} challenge with public trade receipts, uncapped degen heat and a deeply unqualified Magic 8-Ball. Unofficial fan tracker.`;
// Each creative gets a fresh filename. Retain the file-convention PNGs as fallbacks.
// Share artwork is unchanged. It still names the previous challenge amount.
const image = [{ url: absoluteUrl("/togi/share-v3.png"), width: 1200, height: 630,
  alt: "TOGI Tracker V2.0: Genius or full degen? A gold coin and Magic 8-Ball. The trades. The losses. The lore." }];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title: shareTitle, description: shareDescription, url, siteName: "Togi Tracker", type: "website", images: image },
  twitter: { card: "summary_large_image", title: shareTitle, description: shareDescription, images: image },
};

export default function TogiPage() {
  return <TogiTracker />;
}

import type { Metadata } from "next";
import { TogiTracker } from "@/components/togi/TogiTracker";
import { absoluteUrl } from "@/lib/site";
import "./togi.css";

const title = "Togi Tracker: Togi's $10M Stock Challenge (Unofficial)";
const description =
  "Togi Tracker is an unofficial fan tracker of Togi's public stock trades and his road from $950K to $10M. Every number links his post. Not financial advice.";
const url = absoluteUrl("/togi");
// X caches the preview by image URL. The PNGs stay at the file-convention paths;
// ?v= is only a cache bust, and this segment's explicit images replace those files' tags.
const shareVersion = "2";
const image = [{ url: `/togi/opengraph-image.png?v=${shareVersion}`, width: 1200, height: 630, alt: "Togi Tracker" }];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Togi Tracker", type: "website", images: image },
  twitter: { card: "summary_large_image", title, description, images: [{ ...image[0], url: `/togi/twitter-image.png?v=${shareVersion}` }] },
};

export default function TogiPage() {
  return <TogiTracker />;
}

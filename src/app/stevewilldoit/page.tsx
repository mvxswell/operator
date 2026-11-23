import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import "./page.css";

const title = "SteveWillDoIt Tracker · Coming soon";
const description = "An unofficial SteveWillDoIt tracker from ThinkOperator is coming soon.";
const url = absoluteUrl("/stevewilldoit");
const image = [
  {
    url: "/stevewilldoit/og-stevewilldoit.jpg",
    width: 1200,
    height: 630,
    alt: "SteveWillDoIt Tracker, unofficial, coming soon",
  },
];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Think Operator", type: "website", images: image },
  twitter: { card: "summary_large_image", title, description, images: image },
};

export default function SteveWillDoItPage() {
  return (
    <div className="swd">
      <div className="wrap">
        <header className="top">
          <svg className="mark" viewBox="0 0 64 64" aria-hidden="true">
            <path fill="#f2b441" d="M22 4H38V14H26L14 26V38L26 50H38L50 38V26H60V42L42 60H22L4 42V22Z" />
            <path fill="#f2b441" d="M42 4H60V22H50V21L33 38L26 31L43 14H42Z" />
          </svg>
          <h1>SteveWillDoIt Tracker</h1>
          <span className="chip">Unofficial</span>
        </header>
        <img
          className="hero"
          src="/stevewilldoit/coming-soon.webp"
          alt="SteveWillDoIt Tracker, unofficial, coming soon"
          width={1600}
          height={900}
        />
        <p className="meanwhile">
          In the meantime, check out the <a href="/togi/">Togi Tracker</a>
        </p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import snapshotJson from "@/data/togiSnapshot.json";
import { SpyCallsTable } from "@/components/togi/SpyCallsTable";
import { isTogiData, TOGI_PROFILE_URL } from "@/lib/togi";
import { spyTrades } from "@/lib/togiSpy";
import { absoluteUrl } from "@/lib/site";
import "../togi.css";

if (!isTogiData(snapshotJson)) throw new Error("Togi Tracker snapshot does not match the expected shape");
if (spyTrades(snapshotJson.trades).length === 0) {
  throw new Error("Togi snapshot has no SPY trades; refusing to build an empty /togi/spy-calls/ page");
}

const title = "Togi SPY Calls Tracker: Every SPY Options Trade";
const description =
  "Unofficial fan tracker of Togi's (Shane Stoffer) publicly posted SPY options trades, with date, type, result, and source post. Not financial advice.";
const url = absoluteUrl("/togi/spy-calls");
const image = [{
  url: absoluteUrl("/togi/share-v3.png"),
  width: 1200,
  height: 630,
  alt: "TOGI Tracker V2.0: Genius or full degen? A gold coin and Magic 8-Ball frame the $10M challenge. The trades. The losses. The lore.",
}];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Togi Tracker", type: "website", images: image },
  twitter: { card: "summary_large_image", title, description, images: image },
};

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function TogiSpyCallsPage() {
  return (
    <div className="togi-tracker">
      <article className="wrap spy-page">
        <p className="eyebrow spy-kicker">Unofficial · Not financial advice</p>
        <h1>Togi SPY Calls Tracker: Every SPY Options Trade</h1>
        <div className="spy-intro">
          <p>
            This page is an unofficial fan tracker of the SPY options trades Togi (Shane Stoffer) has posted publicly on X.
            It is not affiliated with, endorsed by, or run by him. It is not financial advice.
          </p>
          <p>
            A row is included only when the trade feed at https://togi-tracker.mrm1244.workers.dev/trades.json tags the ticker as SPY.
            The feed stores a date, a type (the call, put, or other label on the post), a direction, an outcome, a P&amp;L figure when one was posted, the written details, and a source link when that link is an X post.
            Strike, expiry, and entry price are not separate fields. They appear in the details only when the original post included them.
          </p>
          <p>
            The table loads from the live feed in the browser. The rows in this page&apos;s HTML are the saved snapshot, so the table still has the posted trades if the live feed cannot be loaded.
            Posts that say spy but are tagged with another ticker, such as SPXW, are not listed here. Those rows stay on the <a href="/togi/">main Togi Tracker</a>.
          </p>
        </div>
        <p>
          <a className="spy-back" href="/togi/">Back to the Togi Tracker</a>
        </p>
        <SpyCallsTable />
        <footer className="foot">
          <p><b>Unofficial fan tracker.</b> Not affiliated with, endorsed by, or run by Togi / Shane Stoffer. Every number comes from his public posts on X (<a href={TOGI_PROFILE_URL} {...ext}>@ShaneStoffer</a>), and every trade links its source. If he didn&apos;t post a number, it says &quot;not disclosed&quot;. Some figures may be partial or out of date.</p>
          <p><b>Not financial advice.</b> Please don&apos;t copy anyone&apos;s options trades because of a dream. 0DTE contracts can go to zero by lunch.</p>
          <div className="footrow">
            <a className="powered" href="/">Powered by ThinkOperator</a>
          </div>
        </footer>
      </article>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/content/guides";
import { CATEGORY_MAP } from "@/lib/categories";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Business decision guides — Think Operator",
  description: "Practical, step-by-step guides to hiring, pricing, cash flow, bottlenecks, sales, operations, and strategy, each with a decision scenario.",
  alternates: { canonical: absoluteUrl("/guides") },
  openGraph: { images: ["https://thinkoperator.com/guides/share.png"] },
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent">Field guides</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Make the better call</h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">Practical frameworks for the decisions that shape a business. Read a guide, work the scenario, then test your judgment.</p>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`}
            className="brand-card rounded-xl border border-line bg-surface p-5">
            <p className="text-[11px] uppercase tracking-[0.13em] text-accent">{CATEGORY_MAP[guide.skill].name} · {guide.minutes} min</p>
            <h2 className="mt-3 text-lg font-semibold leading-snug text-ink">{guide.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{guide.intro}</p>
            <p className="mt-4 text-sm font-medium text-accent">Read guide →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

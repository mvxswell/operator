import { CASES } from "@/content/cases/catalog";
import { CaseLibrary } from "@/components/CaseLibrary";
import { SiteFooter } from "@/components/SiteFooter";
import { editorialMetadata } from "@/lib/editorialSeo";
import { absoluteUrl } from "@/lib/site";

export const metadata = editorialMetadata("Business Cases and Quantitative Decision Scenarios — Think Operator", "Practice unit economics, pricing, cash flow, hiring, growth and capacity decisions. Choose from 48 business cases and lock your answer before the worked breakdown.", "/cases");

export default function CasesPage() {
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Business case library", url: absoluteUrl("/cases"), mainEntity: { "@type": "ItemList", itemListElement: CASES.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, url: absoluteUrl(`/cases/${item.slug}`) })) } };
  return <div data-reading-page className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">The case library</p>
    <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-5xl">Real tradeoffs. Your call first.</h1>
    <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">Work through 48 short business cases across eight areas of judgment. Read the numbers, choose an action, then unlock the graded reasoning and operator takeaway.</p>
    <CaseLibrary cases={CASES} />
    <div className="mt-12"><SiteFooter /></div>
  </div>;
}

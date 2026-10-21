import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { GUIDES, getGuide } from "@/content/guides/collection";
import { GUIDE_TOPICS } from "@/content/guides/collection/topics";
import { readMinutes } from "@/content/guides/words";
import { CATEGORY_MAP } from "@/lib/categories";
import { editorialMetadata } from "@/lib/editorialSeo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = editorialMetadata(
  "Operator Guides: Hiring, Finance, Operations and Strategy — Think Operator",
  "Practical decision frameworks for owners and CEOs. Explore hiring, finance, operating cadence, strategy, and people, then practice with a scored skill test.",
  "/guides", "/og/guides/index.png",
);

export default function GuidesIndexPage() {
  const data = {
    "@context": "https://schema.org", "@type": "CollectionPage", name: "Think Operator guides", url: absoluteUrl("/guides"),
    mainEntity: { "@type": "ItemList", itemListElement: GUIDES.map((guide, index) => ({ "@type": "ListItem", position: index + 1, name: guide.title, url: absoluteUrl(`/guides/${guide.slug}`) })) },
  };
  return <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{GUIDES.length} practical guides</p>
    <h1 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">Decisions owners actually have to make</h1>
    <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted">Start with the decision in front of you. Each guide gives you a framework, a worked scenario, and a skill test that practices the same judgment.</p>
    <nav aria-label="Guide topics" className="mt-6 flex flex-wrap gap-2">
      {GUIDE_TOPICS.map((topic) => <a key={topic.id} href={`#${topic.id}`} className="rounded-lg border border-line bg-surface px-4 py-2 text-sm text-ink hover:border-accent">{topic.name}</a>)}
    </nav>
    <div className="mt-8 rounded-xl border border-accent/25 bg-accent-soft p-5">
      <h2 className="text-lg font-semibold text-ink">Put the framework to work</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">Take the full Operator Test, practice one of eight skills, or build a habit with Daily Decision. Progress stays in this browser; the daily challenge gives you a reason to return.</p>
      <Link href="/tests/" className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-4">Explore every quiz and scenario set</Link>
    </div>
    {GUIDE_TOPICS.map((topic) => <section key={topic.id} id={topic.id} aria-labelledby={`${topic.id}-title`} className="mt-12 scroll-mt-24">
      <h2 id={`${topic.id}-title`} className="text-2xl font-semibold text-ink">{topic.name}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{topic.description}</p>
      <ul className="mt-4 divide-y divide-line-soft border-y border-line-soft">
        {topic.slugs.map((slug) => {
          const guide = getGuide(slug);
          if (!guide) throw new Error(`Unknown guide in topic ${topic.id}: ${slug}`);
          return <li key={slug} className="py-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{CATEGORY_MAP[guide.skill].name} · {readMinutes(guide)} min</p>
            <h3 className="mt-2 text-xl font-semibold text-ink"><Link href={`/guides/${slug}/`} className="hover:text-accent">{guide.title}</Link></h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{guide.answer}</p>
          </li>;
        })}
      </ul>
    </section>)}
    <div className="mt-12"><SiteFooter /></div>
  </div>;
}

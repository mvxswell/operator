import Link from "next/link";
import { TEST_LANDINGS } from "@/content/tests";
import { SiteFooter } from "@/components/SiteFooter";
import { editorialMetadata } from "@/lib/editorialSeo";
import { searchMetadata } from "@/lib/serpCopy";
import { absoluteUrl } from "@/lib/site";

const testsSeo = searchMetadata(
  "/tests",
  "Business Judgment Quizzes and Skill Tests — Think Operator",
  "Explore the Operator Test, eight focused business skill tests, Quick Decisions, and Daily Decision. Choose what to practice and see how each assessment works.",
);
export const metadata = editorialMetadata(testsSeo.title, testsSeo.description, "/tests");

export default function TestsPage() {
  const data = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Think Operator tests", url: absoluteUrl("/tests"), mainEntity: { "@type": "ItemList", itemListElement: TEST_LANDINGS.map((test, index) => ({ "@type": "ListItem", position: index + 1, name: test.title, url: absoluteUrl(`/tests/${test.id}`) })) } };
  return <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
    <p className="text-xs uppercase tracking-[0.16em] text-accent">Choose your practice</p>
    <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">Business judgment tests</h1>
    <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">Build a broad baseline with the Operator Test, work on one skill, or make a short daily practice habit. Each page explains what the question set tests before you start.</p>
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {TEST_LANDINGS.map((test) => <article key={test.id} className="rounded-xl border border-line bg-surface p-5">
        <p className="text-xs leading-relaxed text-accent">{test.format}</p>
        <h2 className="mt-3 text-xl font-semibold text-ink"><Link prefetch={false} href={`/tests/${test.id}/`} className="hover:text-accent">{test.title}</Link></h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">{test.summary}</p>
        <Link prefetch={false} href={`/tests/${test.id}/`} className="mt-4 inline-block text-sm text-accent underline underline-offset-4">See what this test measures</Link>
      </article>)}
    </div>
    <p className="my-10 text-sm text-muted">Want a framework first? <Link prefetch={false} href="/guides/" className="text-accent underline">Browse guides by topic</Link>.</p>
    <SiteFooter />
  </div>;
}

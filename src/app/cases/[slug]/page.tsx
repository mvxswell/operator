import Link from "next/link";
import { notFound } from "next/navigation";
import { CASES } from "@/content/cases/catalog";
import { publicCaseFor } from "@/content/cases/server";
import { CaseExercise } from "@/components/CaseExercise";
import { SiteFooter } from "@/components/SiteFooter";
import { CATEGORY_MAP } from "@/lib/categories";
import { editorialMetadata } from "@/lib/editorialSeo";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() { return CASES.map((item) => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = CASES.find((entry) => entry.slug === slug);
  if (!item) notFound();
  return editorialMetadata(`${item.title} — Business Case — Think Operator`, item.description, `/cases/${slug}`);
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = CASES.find((entry) => entry.slug === slug);
  const question = publicCaseFor(slug);
  if (!item || !question) notFound();
  const related = CASES.filter((entry) => entry.topic === item.topic && entry.slug !== slug).slice(0, 3);
  // Deliberately omit acceptedAnswer, solution steps and the takeaway from JSON-LD.
  const schema = { "@context": "https://schema.org", "@type": ["Quiz", "LearningResource"], "@id": absoluteUrl(`/cases/${slug}`), name: item.title, description: item.description, url: absoluteUrl(`/cases/${slug}`), inLanguage: "en", isAccessibleForFree: true, learningResourceType: "Business case", educationalUse: "Self-assessment", assesses: item.subskill, about: item.topic, hasPart: { "@type": "Question", name: question.prompt, text: question.scenario } };
  return <div data-reading-page className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <nav aria-label="Breadcrumb" className="text-sm text-muted"><Link prefetch={false} href="/cases/" className="text-accent hover:underline">Business cases</Link> <span aria-hidden="true">/</span> {item.topic}</nav>
    <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{item.title}</h1>
    <p className="mt-4 text-sm leading-relaxed text-muted">A short {item.industry.toLowerCase()} decision problem. Use the supplied facts, commit to one action, then check your reasoning. Fictional practice; no leaderboard score is recorded.</p>
    <CaseExercise key={slug} slug={slug} question={question} skillName={CATEGORY_MAP[item.category].name} />
    <section className="mt-10 rounded-xl border border-line bg-surface p-5" aria-label="Continue learning">
      <h2 className="font-semibold text-ink">Read the framework</h2>
      <Link prefetch={false} href={`/guides/${item.guideSlug}/`} className="mt-3 inline-block text-sm text-accent hover:underline">{item.guideTitle}</Link>
      <h2 className="mt-6 font-semibold text-ink">Try another case</h2>
      <ul className="mt-3 space-y-3">{related.map((entry) => <li key={entry.slug}><Link prefetch={false} href={`/cases/${entry.slug}/`} className="text-sm text-accent hover:underline">{entry.title}</Link></li>)}</ul>
    </section>
    <div className="mt-10"><SiteFooter /></div>
  </div>;
}

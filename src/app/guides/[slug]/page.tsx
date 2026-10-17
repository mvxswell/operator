import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideScenario } from "@/components/GuideScenario";
import { GUIDES, guideForSlug } from "@/content/guides";
import { CATEGORY_MAP } from "@/lib/categories";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() { return GUIDES.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideForSlug(slug);
  if (!guide) return {};
  const url = absoluteUrl(`/guides/${slug}`);
  return {
    title: `${guide.title} — Think Operator`, description: guide.description,
    alternates: { canonical: url },
    openGraph: { title: guide.title, description: guide.description, type: "article", url, images: ["https://thinkoperator.com/guides/share.png"] },
    twitter: { card: "summary_large_image" },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guideForSlug(slug);
  if (!guide) notFound();
  const related = guide.related.map(guideForSlug).filter((item) => item !== undefined);
  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article", headline: guide.title,
    description: guide.description, mainEntityOfPage: absoluteUrl(`/guides/${slug}`),
    image: "https://thinkoperator.com/guides/share.png", author: { "@type": "Organization", name: "Think Operator" },
    publisher: { "@type": "Organization", name: "Think Operator" },
  };
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: guide.faq.map((item) => ({ "@type": "Question", name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      <article className="prose-guide py-14 sm:py-16">
        <p className="!mt-0 text-[11px] font-medium uppercase tracking-[0.15em] text-accent">{CATEGORY_MAP[guide.skill].name} · {guide.minutes} min read</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-ink">{guide.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{guide.intro}</p>
        {guide.steps.map((step, index) => (
          <section key={step.title}>
            <h2>{index + 1}. {step.title}</h2>
            {step.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
        <section className="my-10 rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="!mt-0">{guide.framework.title}</h2>
          <ul>{guide.framework.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section><h2>{guide.workedExample.title}</h2>{guide.workedExample.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
        <GuideScenario guide={guide} />
        <section><h2>Mistakes to avoid</h2><ul>{guide.mistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}</ul></section>
        <section><h2>Frequently asked questions</h2>{guide.faq.map((item) => <div key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}</section>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link href={`/skills/${guide.skill}`} className="rounded-lg bg-accent px-5 py-3 text-center text-sm font-semibold !text-bg">Take the {CATEGORY_MAP[guide.skill].name} test</Link>
          <Link href="/quick" className="rounded-lg border border-line px-5 py-3 text-center text-sm font-semibold !text-ink">Quick Decisions — 60 sec</Link>
        </div>
        <section className="mt-12 border-t border-line-soft pt-6"><h2 className="!mt-0">Related guides</h2><ul>{related.map((item) => <li key={item.slug}><Link href={`/guides/${item.slug}`}>{item.title}</Link></li>)}</ul></section>
      </article>
    </>
  );
}

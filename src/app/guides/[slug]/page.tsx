import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/GuideArticle";
import { GUIDES, getGuide } from "@/content/guides/collection";
import { searchMetadata } from "@/lib/serpCopy";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  if (!guide) {
    return { title: "Guide not found — Think Operator" };
  }
  const seo = searchMetadata(`/guides/${guide.slug}`, `${guide.title} — Think Operator`, guide.description);
  const title = seo.title;
  const canonical = absoluteUrl(`/guides/${guide.slug}`);
  const image = `/og/guides/${guide.slug}.png`;
  return {
    title,
    description: seo.description,
    alternates: { canonical },
    openGraph: {
      title,
      description: seo.description,
      url: canonical,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: guide.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: seo.description,
      images: [image],
    },
  };
}

export default async function GuidePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const canonical = absoluteUrl(`/guides/${guide.slug}`);
  const seo = searchMetadata(`/guides/${guide.slug}`, `${guide.title} — Think Operator`, guide.description);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: seo.description,
        datePublished: `${guide.datePublished ?? "2026-10-17"}T12:00:00-04:00`,
        dateModified: `${guide.dateModified ?? "2026-10-17"}T12:00:00-04:00`,
        mainEntityOfPage: canonical,
        image: `https://thinkoperator.com/og/guides/${guide.slug}.png`,
        author: {
          "@type": "Organization",
          name: "Think Operator",
          url: "https://thinkoperator.com/",
        },
        publisher: {
          "@type": "Organization",
          name: "Think Operator",
          url: "https://thinkoperator.com/",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
      />
      <GuideArticle guide={guide} />
    </>
  );
}

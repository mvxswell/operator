import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/GuideArticle";
import { GUIDES, getGuide } from "@/content/guides";
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
  const title = `${guide.title} — Think Operator`;
  const canonical = absoluteUrl(`/guides/${guide.slug}`);
  const image = `/og/guides/${guide.slug}.png`;
  return {
    title,
    description: guide.description,
    alternates: { canonical },
    openGraph: {
      title,
      description: guide.description,
      url: canonical,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: guide.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: guide.description,
      images: [image],
    },
  };
}

export default async function GuidePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const canonical = absoluteUrl(`/guides/${guide.slug}`);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        datePublished: "2026-10-17",
        dateModified: "2026-10-17",
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

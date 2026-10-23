import type { Metadata } from "next";
import { absoluteUrl, SITE_ORIGIN } from "./site";

export function editorialMetadata(title: string, description: string, path: string, image = "/opengraph-image.png"): Metadata {
  return {
    title, description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: { title, description, url: absoluteUrl(path), type: "website", siteName: "Think Operator", images: [{ url: image, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function articleData(title: string, description: string, path: string, image = "/opengraph-image.png", published = "2026-10-20", modified = published) {
  const organization = { "@type": "Organization", name: "Think Operator", url: `${SITE_ORIGIN}/` };
  return {
    "@type": "Article", headline: title, description,
    datePublished: `${published}T12:00:00-04:00`, dateModified: `${modified}T12:00:00-04:00`,
    mainEntityOfPage: absoluteUrl(path), image: `${SITE_ORIGIN}${image}`,
    author: organization, publisher: organization,
  };
}

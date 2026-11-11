import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { absoluteUrl, pageMetadata } from "@/lib/site";

const about = pageMetadata("/about");

export const metadata: Metadata = {
  ...about,
  alternates: { canonical: absoluteUrl("/about") },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <header className="brand-hero">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">Think Operator</p>
        <h1 className="text-3xl font-semibold tracking-tight text-ink">Built by Maxwell</h1>
      </header>
      <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-muted">
        <p>Maxwell grew a home-services company to $5M+ in revenue. He is a sales leader and AI builder in Greater Philadelphia, and he builds in public. Think Operator is the business brand. The other companies he is building show up here as case studies, not as a product grid.</p>
        <p>He is a founder and builder, now building AI-native software products.</p>
        <p>
          <a href="https://x.com/mvxswell" className="text-accent underline" target="_blank" rel="noopener noreferrer">Follow the build @mvxswell</a>
        </p>
        <p>
          <Link href="/guides/" className="text-accent underline">Browse the playbooks</Link>
        </p>
      </div>
      <div className="mt-12"><SiteFooter /></div>
    </div>
  );
}

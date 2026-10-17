import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { GUIDES } from "@/content/guides";
import { readMinutes } from "@/content/guides/words";
import { CATEGORY_MAP } from "@/lib/categories";
import { absoluteUrl, pageMetadata } from "@/lib/site";

const page = pageMetadata("/guides");

export const metadata: Metadata = {
  ...page,
  alternates: { canonical: absoluteUrl("/guides") },
  openGraph: {
    title: page.title ?? "Guides — Think Operator",
    description: page.description ?? "",
    url: absoluteUrl("/guides"),
    images: [{ url: "/og/guides/index.png", width: 1200, height: 630, alt: "Think Operator guides" }],
  },
};

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">Guides</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
        Decisions owners actually have to make
      </h1>
      <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-[#b4bac2]">
        Short, practical guides on people, money, constraints, and where the next hour or dollar should go. Each one ends in the skill test that practices the same call.
      </p>
      <ul className="mt-10 divide-y divide-line-soft border-y border-line-soft">
        {GUIDES.map((guide) => {
          const skill = CATEGORY_MAP[guide.skill];
          return (
            <li key={guide.slug} className="py-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                {skill.name} · {readMinutes(guide)} min
              </p>
              <h2 className="mt-2 text-xl font-semibold text-ink">
                <Link href={`/guides/${guide.slug}`} className="hover:text-accent">
                  {guide.title}
                </Link>
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{guide.answer}</p>
            </li>
          );
        })}
      </ul>
      <SiteFooter />
    </div>
  );
}

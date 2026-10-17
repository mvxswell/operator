import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const SLUG = "_example";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: SLUG }];
}

export const metadata: Metadata = {
  title: "Article prose example — Think Operator",
  description:
    "Sample guide page for Think Operator article typography. It is not listed in the sitemap.",
  robots: { index: false, follow: false },
};

export default async function GuideExamplePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== SLUG) notFound();

  return (
    <article className="prose-guide py-14 sm:py-16">
      <h2>How to read a business situation</h2>
      <p>
        Every scenario contains the facts you need. The work is to find the constraint, ignore
        the noise, and choose the move that changes the outcome.
      </p>
      <p>
        Strong operators do not collect more information by default. They ask which number, if it
        moved, would change the decision.
      </p>
      <h3>What to look for</h3>
      <ul>
        <li>The step that is already at capacity</li>
        <li>The cost of waiting versus the cost of a wrong hire</li>
        <li>Whether the next dollar belongs in sales or in delivery</li>
      </ul>
      <p>
        When two options both sound reasonable, prefer the one that <strong>removes the bottleneck</strong>{" "}
        rather than the one that adds activity around it.
      </p>
      <p>
        Practice the full mix on the <Link href="/operator">Operator Test</Link>, or stay with one
        skill on the <Link href="/skills">skill tests</Link>.
      </p>
      <h3>A short sequence</h3>
      <ol>
        <li>Name the constraint in one sentence.</li>
        <li>Reject options that do not move it.</li>
        <li>Commit, then read why that call was best.</li>
      </ol>
    </article>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { DataTable } from "@/components/ui";
import { SiteFooter } from "@/components/SiteFooter";
import { TEST_LANDINGS, getTestLanding } from "@/content/tests";
import { GUIDES } from "@/content/guides/collection";
import { QUESTION_BANK, QUICK_QUESTIONS } from "@/data";
import { DAILY_QUESTIONS } from "@/data/daily";
import { articleData, editorialMetadata } from "@/lib/editorialSeo";
import { searchMetadata } from "@/lib/serpCopy";
import { absoluteUrl } from "@/lib/site";

function StartLink({ href, children }: { href: string; children: React.ReactNode }) {
  // Keep the launch URL as ordinary navigation on the static site.
  return <a href={href} className="guide-cta-button inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-6 py-3 text-center text-[15px] font-medium text-[#16120a] hover:brightness-110">{children}</a>;
}

export const dynamicParams = false;
export function generateStaticParams() { return TEST_LANDINGS.map((test) => ({ quiz: test.id })); }

export async function generateMetadata({ params }: { params: Promise<{ quiz: string }> }) {
  const { quiz } = await params;
  const test = getTestLanding(quiz);
  if (!test) notFound();
  const seo = searchMetadata(`/tests/${test.id}`, `${test.title} — Think Operator`, test.description);
  return editorialMetadata(seo.title, seo.description, `/tests/${test.id}`);
}

export default async function TestLandingPage({ params }: { params: Promise<{ quiz: string }> }) {
  const { quiz } = await params;
  const test = getTestLanding(quiz);
  if (!test) notFound();
  const sample = quiz === "quick" ? QUICK_QUESTIONS[0] : quiz === "daily" ? DAILY_QUESTIONS[0] : QUESTION_BANK.find((question) => test.skills.includes(question.category));
  const matching = GUIDES.filter((guide) => test.skills.includes(guide.skill)).reverse();
  const adjacent = matching.flatMap((guide) => guide.related).flatMap((slug) => GUIDES.filter((guide) => guide.slug === slug));
  const related = [...new Map([...matching, ...adjacent].map((guide) => [guide.slug, guide])).values()].slice(0, 3);
  const seo = searchMetadata(`/tests/${test.id}`, `${test.title} — Think Operator`, test.description);
  const graph = { "@context": "https://schema.org", "@graph": [
    articleData(test.title, seo.description, `/tests/${test.id}`),
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tests", item: absoluteUrl("/tests") },
      { "@type": "ListItem", position: 2, name: test.title, item: absoluteUrl(`/tests/${test.id}`) },
    ] },
  ] };
  return <div className="py-12 sm:py-16">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />
    <article className="prose-guide">
      <nav aria-label="Breadcrumb"><Link prefetch={false} href="/tests/">All business judgment tests</Link></nav>
      <p className="guide-kicker">{test.format}</p>
      <h1>{test.title}</h1>
      <p>{test.summary}</p>
      <div className="guide-cta"><StartLink href={test.startHref}>{quiz === "daily" ? "Try today's decision" : "Start this test"}</StartLink></div>
      <h2>What this set tests</h2>
      <ul>{test.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul>
      <h2>How to approach the scenarios</h2>
      <ol>{test.approach.map((step) => <li key={step}>{step}</li>)}</ol>
      {sample ? <>
        <h2>A sample from the question bank</h2>
        <div className="rounded-xl border border-line bg-surface px-5 py-4">
          <p>{sample.scenario}</p>
          {"data" in sample && sample.data ? <DataTable data={sample.data} /> : null}
          {"prompt" in sample ? <p className="font-semibold text-ink">{sample.prompt}</p> : null}
        </div>
        <p>The test draws from this scenario set. The first question in your run may differ from this sample.</p>
      </> : null}
      <h2>Feedback and progress</h2>
      {quiz === "daily" ? <p>After you answer, the explanation shows which action is best supported by the scenario. Your completed day and streak are stored in this browser. Return on the next local calendar day for the next dated prompt, or take a focused skill test when you want a longer practice session.</p>
        : quiz === "quick" ? <p>Your result shows decisions per minute, accuracy, response time, and streak information. Accuracy affects the score, so guessing quickly can reduce the result. Review missed scenarios and try another round to practice the distinction you missed. A short round is a practice session, not a substitute for a full assessment.</p>
          : <p>Difficulty adapts as you answer. The final score combines accuracy, difficulty handled, and decision speed; accuracy carries the most weight. Read the explanation after each call, then use the result to choose what to train next. A personal best is stored locally, so compare runs in the same browser to follow your practice.</p>}
      <p>These are practice scenarios, not a professional certification or a validated hiring assessment. Use the feedback to examine your reasoning. The information needed to answer is in the case; real operating decisions may require facts and advice beyond a short exercise.</p>
      <h2>Make the next practice useful</h2>
      <p>Choose one distinction you want to improve, such as cash versus profit, a queue versus slow execution, or responsibility versus decision authority. Read a related framework, apply it to the next case, and review the explanation. Your <Link prefetch={false} href="/progress/">progress page</Link> keeps the local history; <Link prefetch={false} href="/daily/">Daily Decision</Link> offers a short reason to come back tomorrow.</p>
      <h2>Read the framework first</h2>
      <ul>{related.map((guide) => <li key={guide.slug}><Link prefetch={false} href={`/guides/${guide.slug}/`}>{guide.title}</Link></li>)}</ul>
      <div className="guide-cta"><StartLink href={test.startHref}>{quiz === "daily" ? "Make today's call" : "Start practicing"}</StartLink></div>
      <p><Link prefetch={false} href="/tests/">Choose another test</Link> · <Link prefetch={false} href="/guides/">Browse all guides by topic</Link></p>
    </article>
    <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6"><SiteFooter /></div>
  </div>;
}

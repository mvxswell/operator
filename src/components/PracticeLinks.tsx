import Link from "next/link";
import { practiceFor } from "@/lib/practiceLinks";
import type { CategoryId } from "@/lib/types";

export function PracticeLinks({ category, subskill, questionId }: { category: CategoryId; subskill?: string; questionId?: string }) {
  const match = practiceFor({ id: questionId, category, subskill });
  if (!match) return null;
  return <div className="mt-5 border-t border-line-soft pt-4" data-practice-links>
    <p className="text-xs font-semibold uppercase tracking-wider text-muted">Keep practicing{subskill ? ` · ${subskill}` : ""}</p>
    <div className="mt-3 flex flex-col gap-3 text-sm">
      <Link prefetch={false} href={`/guides/${match.guideSlug}/`} className="text-accent underline-offset-4 hover:underline">Read: {match.guideTitle}</Link>
      <Link prefetch={false} href={`/cases/${match.slug}/`} className="text-accent underline-offset-4 hover:underline">Practice: {match.title}</Link>
    </div>
  </div>;
}

"use client";

import { ButtonLink } from "@/components/ui";
import { track } from "@/lib/track";
import type { CategoryId } from "@/lib/types";

export function GuideTestCta({
  skill,
  skillName,
  slug,
  size = "lg",
  className = "",
}: {
  skill: CategoryId;
  skillName: string;
  slug: string;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <ButtonLink
      href={`/skills/${skill}?start=1&from=guide-${slug}`}
      size={size}
      className={`guide-cta-button shrink-0 ${className}`}
      onClick={() => track(`guide:${slug}:cta`)}
    >
      Take the 10-question {skillName} test
    </ButtonLink>
  );
}

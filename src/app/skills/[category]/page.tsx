import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, CATEGORY_MAP, categoryFromSlug } from "@/lib/categories";
import { SkillTest } from "./SkillTest";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata(
  props: PageProps<"/skills/[category]">,
): Promise<Metadata> {
  const { category } = await props.params;
  const id = categoryFromSlug(category);
  if (!id) return { title: "Skill not found — Think Operator" };
  return {
    title: `${CATEGORY_MAP[id].name} — Think Operator`,
    description: CATEGORY_MAP[id].description,
  };
}

export default async function SkillTestPage(props: PageProps<"/skills/[category]">) {
  const { category } = await props.params;
  const id = categoryFromSlug(category);
  if (!id) notFound();

  return <SkillTest category={id} />;
}

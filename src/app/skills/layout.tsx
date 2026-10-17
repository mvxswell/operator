import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/skills");

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

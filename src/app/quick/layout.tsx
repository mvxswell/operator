import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/quick");

export default function QuickLayout({ children }: { children: React.ReactNode }) {
  return children;
}

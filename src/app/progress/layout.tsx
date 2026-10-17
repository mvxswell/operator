import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/progress");

export default function ProgressLayout({ children }: { children: React.ReactNode }) {
  return children;
}

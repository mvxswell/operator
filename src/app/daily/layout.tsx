import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/daily");

export default function DailyLayout({ children }: { children: React.ReactNode }) {
  return children;
}

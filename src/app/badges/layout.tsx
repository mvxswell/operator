import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/badges");

export default function BadgesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

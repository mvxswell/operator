import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/operator");

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}

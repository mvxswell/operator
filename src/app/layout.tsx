import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { StorageNotice } from "@/components/StorageNotice";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thinkoperator.com"),
  title: "Think Operator — Test your business judgment",
  description:
    "Test your judgment across real-world business scenarios. Train your weaknesses. Make better decisions faster.",
  openGraph: {
    title: "Think Operator",
    description: "Test your judgment across real-world business scenarios.",
    url: "https://thinkoperator.com",
    siteName: "Think Operator",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:p-3 focus:text-accent">Skip to content</a>
        <Nav />
        <StorageNotice />
        <main id="main-content" className="flex-1">{children}</main>
      </body>
    </html>
  );
}

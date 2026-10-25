import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { BadgeEarned } from "@/components/BadgeEarned";
import { Nav } from "@/components/Nav";
import { StorageNotice } from "@/components/StorageNotice";
import { HOME } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thinkoperator.com"),
  title: HOME.title,
  description: HOME.description,
  alternates: { canonical: "./" },
  openGraph: {
    siteName: "Think Operator",
    type: "website",
    url: "./",
  },
  twitter: {
    card: "summary_large_image",
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
        <BadgeEarned />
        {process.env.GITHUB_PAGES === "true" && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            strategy="afterInteractive"
            type="module"
            data-cf-beacon={JSON.stringify({ token: "ba98ed18a52745f48837a9db434d41d5" })}
          />
        )}
      </body>
    </html>
  );
}

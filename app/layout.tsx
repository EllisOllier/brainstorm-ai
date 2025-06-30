import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brainstorm AI | Waitlist",
  description:
    "Brainstorm with AI and instantly generate Notion-style project pages. Join the waitlist now!",
  keywords: [
    "Brainstorm AI",
    "AI brainstorming",
    "waitlist",
    "Notion style pages",
  ],
  authors: [{ name: "Ellis Ollier", url: "https://ellisollier.com" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-black min-h-screen transition-colors duration-300">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

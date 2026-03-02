import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import PostHogProvider from "@/components/PostHogProvider";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura Wellness — Reclaim Your Calm",
  description:
    "A premium digital membership bridging studio-grade mindful movement with daily organic living. Start your 7-day free trial.",
  openGraph: {
    title: "Aura Wellness — Reclaim Your Calm",
    description:
      "Studio-grade movement, mindfulness practices, and organic living — all in one place.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}

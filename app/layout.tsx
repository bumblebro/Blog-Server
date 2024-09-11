import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Word of Many",
    template: "%s | Word of Many",
  },
  description:
    "Discover the world's leading lifestyle platform, Word of Many, featuring the latest trends in products, culture, and style from all categories around the globe.",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader showSpinner={false} color="#0050f0" crawlSpeed={50} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

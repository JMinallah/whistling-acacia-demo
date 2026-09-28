import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

// Fraunces: a soft, slightly wonky serif (the SOFT/WONK axes are what give
// it the hand-made feel). Variable, so no fixed weights are listed.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Whistling Acacia Guesthouse — Boutique Stay in Naguru, Kampala",
  description:
    "An 8-room guesthouse on Naguru hill, Kampala — self-contained rooms, a courtyard garden, and breakfast included. Enquire directly by WhatsApp or phone.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">{children}</body>
    </html>
  );
}

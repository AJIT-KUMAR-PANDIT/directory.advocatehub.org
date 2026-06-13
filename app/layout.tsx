import type { Metadata } from "next";
import { Crimson_Pro, Inter } from "next/font/google";
import "./globals.css";

const crimson = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AdvocateHub — Your Gateway to Legal Support",
  description:
    "Find trusted legal advocates near you. Search our directory, filter by practice area, and book consultations in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${crimson.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-warm-50 text-natural-700 font-sans">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const uiSans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ui-sans",
  display: "swap",
});

const displaySerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Danny Wang Portfolio",
  description: "Industrial design and design engineering portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${uiSans.variable} ${displaySerif.variable}`}>{children}</body>
    </html>
  );
}

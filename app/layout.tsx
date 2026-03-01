import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}

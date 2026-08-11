import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Proslave na otvorenom | Prostor i oprema za iznajmljivanje",
  description:
    "Iznajmljivanje dvorišta, pagoda, paviljona i kompletne opreme za proslave na otvorenom, kod nas ili na lokaciji po vašem izboru.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr-Latn" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}

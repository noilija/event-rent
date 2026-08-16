import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

const fontVariables = `${cormorant.variable} ${manrope.variable}`;

export const metadata: Metadata = {
  title: "Proslave na otvorenom | Prostor i oprema za iznajmljivanje",
  description:
    "Iznajmljivanje dvorišta, pagoda, paviljona i kompletne opreme za proslave na otvorenom, kod nas ili na lokaciji po vašem izboru.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontDevTools =
    process.env.NODE_ENV === "development"
      ? await import("@/components/dev/FontDevTools")
      : null;
  const FontDevTools = fontDevTools?.FontDevTools;

  return (
    <html lang="sr-Latn" className={fontVariables}>
      <body>
        {children}
        {FontDevTools && <FontDevTools />}
      </body>
    </html>
  );
}

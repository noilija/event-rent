import type { Metadata } from "next";
import { Allura, Cormorant_Garamond, Manrope } from "next/font/google";
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

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: "400",
});

const fontVariables = `${cormorant.variable} ${manrope.variable} ${allura.variable}`;

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://event-rent-vranje.pages.dev/#website",
  url: "https://event-rent-vranje.pages.dev/",
  name: "Event Rent",
  alternateName: "Event Rent Vranje",
  inLanguage: "sr-Latn-RS",
};

const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://event-rent-vranje.pages.dev/#localbusiness",
  url: "https://event-rent-vranje.pages.dev/",
  name: "Event Rent",
  alternateName: "Event Rent Vranje",
  description:
    "Iznajmljivanje opreme za proslave u Vranju i okolini.",
  logo: "https://event-rent-vranje.pages.dev/brand/logo.png",
  image: "https://event-rent-vranje.pages.dev/slideshow/2S5A6172_result.webp",
  telephone: "+38162575584",
  areaServed: {
    "@type": "Place",
    name: "Vranje i okolina",
  },
  sameAs: ["https://www.instagram.com/event_rent.vranje/"],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://event-rent-vranje.pages.dev/"),
  title: "Event Rent Vranje | Iznajmljivanje opreme za proslave",
  description:
    "Event Rent Vranje – iznajmljivanje pagoda, paviljona, stolova, stolica, barskih stolova i opreme za proslave. Dostava u Vranju i okolini.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: "/",
    siteName: "Event Rent",
    title: "Event Rent Vranje | Iznajmljivanje opreme za proslave",
    description:
      "Event Rent Vranje – iznajmljivanje pagoda, paviljona, stolova, stolica, barskih stolova i opreme za proslave. Dostava u Vranju i okolini.",
    images: [
      {
        url: "/slideshow/2S5A6172_result.webp",
        width: 1200,
        height: 800,
        alt: "Event Rent Vranje – oprema za proslave",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Rent Vranje | Iznajmljivanje opreme za proslave",
    description:
      "Iznajmljivanje opreme za proslave u Vranju i okolini, uz dostavu i postavku po dogovoru.",
    images: ["/slideshow/2S5A6172_result.webp"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /*
  const fontDevTools =
    process.env.NODE_ENV === "development"
      ? await import("@/components/dev/FontDevTools")
      : null;
  const FontDevTools = fontDevTools?.FontDevTools;
  */

  return (
    <html lang="sr-Latn" className={fontVariables}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessStructuredData),
          }}
        />
        {children}
        {/* Privremeno isključen birač fontova za razvoj. */}
        {/* {FontDevTools && <FontDevTools />} */}
      </body>
    </html>
  );
}

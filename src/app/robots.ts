import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://event-rent-vranje.pages.dev",
    sitemap: "https://event-rent-vranje.pages.dev/sitemap.xml",
  };
}

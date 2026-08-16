type SiteConfig = {
  name: string;
  description: string;
  contact: {
    instagramUrl: string;
    phoneDisplay: string;
    phoneE164: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Event Rent",
  description:
    "Iznajmljivanje dvorišta, pagoda, paviljona i kompletne opreme za proslave na otvorenom.",
  contact: {
    instagramUrl: "https://www.instagram.com/event_rent.vranje/",
    phoneDisplay: "+381 62 575 584",
    phoneE164: "+38162575584",
  },
};

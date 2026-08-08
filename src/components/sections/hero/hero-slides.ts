export type HeroSlide = {
  src: string;
  alt: string;
  objectPosition?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    src: "/images/hero/close-up-1.jpeg",
    alt: "Elegantno postavljen sto sa staklenim dekanterima, čašama i svećama",
    objectPosition: "center 48%",
  },
  {
    src: "/images/hero/escajg-close-up.jpeg",
    alt: "Zlatni escajg i dekorativni tanjir na svečano postavljenom stolu",
    objectPosition: "center 52%",
  },
  {
    src: "/images/hero/escajg-vreca.jpeg",
    alt: "Svečani pribor složen u platnenoj vreći na tanjiru sa zlatnim detaljima",
    objectPosition: "center 48%",
  },
  {
    src: "/images/hero/goge.jpeg",
    alt: "Postavljanje svečanog stola u dvorištu sa Event Rent opremom",
    objectPosition: "center 46%",
  },
];

export const heroSlideshowConfig = {
  displayDurationMs: 5000,
  transitionDurationMs: 1200,
};

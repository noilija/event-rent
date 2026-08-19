export type EquipmentImage = {
  alt: string;
  objectPosition?: string;
  src: string;
};

export type EquipmentItem = {
  availableQuantity: string;
  description: string;
  images: EquipmentImage[];
  name: string;
  price: string;
  slug: string;
};

export const equipmentItems: EquipmentItem[] = [
  {
    name: "Pagode 5 × 5 m",
    slug: "pagode",
    description:
      "Elegantna bela pagoda dimenzija 5 × 5 metara pruža pouzdanu zaštitu i prijatan ambijent za proslave na otvorenom. Pogodna je za različite postavke sedenja, posluženja i dekoracije.",
    price: "Na upit",
    availableQuantity: "Po dogovoru",
    images: [
      {
        src: "/ponuda_kartice/pagode.webp",
        alt: "Bela pagoda za proslave postavljena u dvorištu",
        objectPosition: "center 45%",
      },
    ],
  },
  {
    name: "Paviljoni",
    slug: "paviljoni",
    description:
      "Prostrani beli paviljoni stvaraju natkriven i elegantan prostor za veće proslave. Njihov neutralan izgled lako se uklapa uz različite stilove dekoracije i rasporede gostiju.",
    price: "Na upit",
    availableQuantity: "Po dogovoru",
    images: [
      {
        src: "/ponuda_kartice/paviljoni.webp",
        alt: "Beli paviljon za proslave na otvorenom",
        objectPosition: "center 48%",
      },
    ],
  },
  {
    name: "Postavke stola",
    slug: "postavke-stola",
    description:
      "Pažljivo usklađena postavka stola doprinosi celokupnom utisku događaja i udobnosti gostiju. Raspored i izgled prilagođavamo prostoru i karakteru vaše proslave.",
    price: "Na upit",
    availableQuantity: "Po dogovoru",
    images: [
      {
        src: "/ponuda_kartice/postavke_stola.webp",
        alt: "Elegantno postavljen svečani sto",
        objectPosition: "center 52%",
      },
    ],
  },
  {
    name: "Barski stolovi",
    slug: "barski-stolovi",
    description:
      "Visoki barski stolovi idealni su za koktel-zonu, doček gostiju ili opušteni deo proslave. Bele navlake daju im uredan i svečan izgled koji se lako kombinuje sa dekoracijom.",
    price: "Na upit",
    availableQuantity: "Po dogovoru",
    images: [
      {
        src: "/ponuda_kartice/barski_stolovi.webp",
        alt: "Visoki barski sto sa belom navlakom",
        objectPosition: "center 54%",
      },
    ],
  },
  {
    name: "Ventilatori",
    slug: "ventilatori",
    description:
      "Profesionalni ventilatori sa raspršivačem pomažu da prostor ostane prijatan i tokom toplih letnjih dana. Namenjeni su upotrebi na događajima na otvorenom.",
    price: "Na upit",
    availableQuantity: "Po dogovoru",
    images: [
      {
        src: "/ponuda_kartice/ventilator.webp",
        alt: "Profesionalni ventilator sa raspršivačem za događaje",
        objectPosition: "center 42%",
      },
    ],
  },
];

export type EquipmentItem = {
  alt: string;
  image: string;
  name: string;
  objectPosition?: string;
  slug: string;
};

export const equipmentItems: EquipmentItem[] = [
  {
    name: "Pagode 5 × 5 m",
    slug: "pagode",
    image: "/ponuda_kartice/pagode.webp",
    alt: "Bela pagoda za proslave postavljena u dvorištu",
    objectPosition: "center 45%",
  },
  {
    name: "Paviljoni",
    slug: "paviljoni",
    image: "/ponuda_kartice/paviljoni.webp",
    alt: "Beli paviljon za proslave na otvorenom",
    objectPosition: "center 48%",
  },
  {
    name: "Postavke stola",
    slug: "postavke-stola",
    image: "/ponuda_kartice/postavke_stola.webp",
    alt: "Elegantno postavljen svečani sto",
    objectPosition: "center 52%",
  },
  {
    name: "Barski stolovi",
    slug: "barski-stolovi",
    image: "/ponuda_kartice/barski_stolovi.webp",
    alt: "Visoki barski sto sa belom navlakom",
    objectPosition: "center 54%",
  },
  {
    name: "Ventilatori",
    slug: "ventilatori",
    image: "/ponuda_kartice/ventilator.webp",
    alt: "Profesionalni ventilator sa raspršivačem za događaje",
    objectPosition: "center 42%",
  },
];

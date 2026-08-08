import type { SetAsset } from "../types";

export const setAssets = [
  {
    id: "elegant-set-01-complete",
    category: "completeSet",
    name: "Elegant Set 01 kompletna postavka",
    status: "ready",
    src: "/set_assets/sets/elegant-set-01.png",
    naturalWidth: 1536,
    naturalHeight: 1024,
  },
  {
    id: "elegant-set-02-complete",
    category: "completeSet",
    name: "Elegant Set 02 kompletna postavka",
    status: "ready",
    src: "/set_assets/sets/elegant-set-02-light-circles.png",
    naturalWidth: 1536,
    naturalHeight: 1024,
  },
  {
    id: "spoon-large-gold",
    category: "spoon",
    name: "Velika zlatna kašika",
    status: "ready",
    src: "/set_assets/cutlery/spoon-large-gold.png",
    naturalWidth: 320,
    naturalHeight: 1480,
  },
  {
    id: "spoon-small-gold",
    category: "spoon",
    name: "Mala zlatna kašika",
    status: "ready",
    src: "/set_assets/cutlery/spoon-small-gold.png",
    naturalWidth: 240,
    naturalHeight: 1148,
  },
  {
    id: "plate-dark-small",
    category: "plate",
    name: "Mali tamni tanjir",
    status: "ready",
    src: "/set_assets/plates/plate-dark-small.png",
    naturalWidth: 1173,
    naturalHeight: 1173,
  },
  {
    id: "glass-gold-rim",
    category: "glass",
    name: "Čaša sa zlatnim obodom",
    status: "ready",
    src: "/set_assets/glasses/glass-gold-rim.png",
    naturalWidth: 626,
    naturalHeight: 795,
  },
  {
    id: "napkin-champagne",
    category: "napkin",
    name: "Šampanjac salveta",
    status: "ready",
    src: "/set_assets/napkins/napkin-champagne.png",
    naturalWidth: 576,
    naturalHeight: 1860,
  },
  {
    id: "napkin-ring-gold-triple",
    category: "napkinRing",
    name: "Trostruki zlatni prsten za salvetu",
    status: "ready",
    src: "/set_assets/rings/napkin-ring-gold-triple.png",
    naturalWidth: 672,
    naturalHeight: 360,
  },
  {
    id: "charger-clear-gold-beaded",
    category: "charger",
    name: "Providni podmetač sa zlatnim kuglicama",
    status: "missing",
  },
  {
    id: "plate-dark-dinner",
    category: "plate",
    name: "Glavni tamni tanjir",
    status: "missing",
  },
  {
    id: "fork-gold",
    category: "fork",
    name: "Zlatna viljuška",
    status: "missing",
  },
  {
    id: "knife-gold",
    category: "knife",
    name: "Zlatni nož",
    status: "missing",
  },
  {
    id: "tablecloth-black",
    category: "tablecloth",
    name: "Crni stolnjak",
    status: "missing",
  },
] as const satisfies readonly SetAsset[];

export type SetAssetId = (typeof setAssets)[number]["id"];

export const setAssetsById = new Map<string, SetAsset>(
  setAssets.map((asset) => [asset.id, asset])
);

export function getSetAsset(assetId: string) {
  return setAssetsById.get(assetId);
}

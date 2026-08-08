import type { ConfigurableTableSetup } from "../types";
import { getSetAsset } from "./set-assets";

export const pilotTableSetup: ConfigurableTableSetup = {
  id: "elegant-set-01",
  name: "Elegant Set 01",
  subtitle: "Classic Gold",
  description:
    "Tamna postavka sa zlatnim escajgom, šampanjac salvetom i čašom sa zlatnim obodom.",
  compositionAssetId: "elegant-set-01-complete",
  sceneBackground:
    "radial-gradient(circle at 15% 20%, rgba(199, 163, 90, 0.20), transparent 24%), radial-gradient(circle at 82% 12%, rgba(255, 235, 190, 0.12), transparent 22%), linear-gradient(135deg, #272119 0%, #0d0c0a 58%, #1c1711 100%)",
  assetIds: {
    charger: "charger-clear-gold-beaded",
    dinnerPlate: "plate-dark-dinner",
    smallPlate: "plate-dark-small",
    fork: "fork-gold",
    knife: "knife-gold",
    largeSpoon: "spoon-large-gold",
    smallSpoon: "spoon-small-gold",
    glass: "glass-gold-rim",
    napkin: "napkin-champagne",
    napkinRing: "napkin-ring-gold-triple",
  },
  tableclothAssetId: "tablecloth-black",
};

const fallbackPilotAssetIds = [
  ...Object.values(pilotTableSetup.assetIds),
  pilotTableSetup.tableclothAssetId,
].filter((assetId): assetId is string => Boolean(assetId));

const compositionAsset = pilotTableSetup.compositionAssetId
  ? getSetAsset(pilotTableSetup.compositionAssetId)
  : undefined;

export const missingPilotAssetIds =
  compositionAsset?.status === "ready"
    ? []
    : fallbackPilotAssetIds.filter(
        (assetId) => getSetAsset(assetId)?.status !== "ready"
      );

export const isPilotTableSetupReady = missingPilotAssetIds.length === 0;

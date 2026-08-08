export type TableElementType =
  | "plate"
  | "cutlery"
  | "glass"
  | "napkin"
  | "napkinRing"
  | "tablecloth";

export type TableElement = {
  id: string;
  type: TableElementType;
  name: string;
  description: string;
  color: string;
};

export type TableSetup = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  plateId: string;
  cutleryId: string;
  glassId: string;
  napkinId: string;
  napkinRingId: string;
  tableclothId: string;
  previewTone: string;
};

export type SetAssetCategory =
  | "completeSet"
  | "charger"
  | "plate"
  | "fork"
  | "knife"
  | "spoon"
  | "glass"
  | "napkin"
  | "napkinRing"
  | "tablecloth";

type SetAssetBase = {
  id: string;
  category: SetAssetCategory;
  name: string;
};

export type ReadySetAsset = SetAssetBase & {
  status: "ready";
  src: string;
  naturalWidth: number;
  naturalHeight: number;
};

export type MissingSetAsset = SetAssetBase & {
  status: "missing";
};

export type SetAsset = ReadySetAsset | MissingSetAsset;

export type PlaceSettingSlot =
  | "charger"
  | "dinnerPlate"
  | "smallPlate"
  | "fork"
  | "knife"
  | "largeSpoon"
  | "smallSpoon"
  | "glass"
  | "napkin"
  | "napkinRing";

export type AssetPlacement = {
  xPercent: number;
  yPercent: number;
  widthPercent: number;
  rotationDeg: number;
  zIndex: number;
};

export type PlaceSettingLayout = Record<PlaceSettingSlot, AssetPlacement>;

export type ConfigurableTableSetup = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  compositionAssetId?: string;
  sceneBackground?: string;
  assetIds: Partial<Record<PlaceSettingSlot, string>>;
  tableclothAssetId?: string;
};

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

import type { PlaceSettingLayout, PlaceSettingSlot } from "../types";

export const placeSettingSlots: PlaceSettingSlot[] = [
  "charger",
  "dinnerPlate",
  "smallPlate",
  "fork",
  "knife",
  "largeSpoon",
  "smallSpoon",
  "glass",
  "napkin",
  "napkinRing",
];

export const defaultPlaceSettingLayout: PlaceSettingLayout = {
  charger: {
    xPercent: 50,
    yPercent: 58,
    widthPercent: 56,
    rotationDeg: 0,
    zIndex: 10,
  },
  dinnerPlate: {
    xPercent: 50,
    yPercent: 58,
    widthPercent: 49,
    rotationDeg: 0,
    zIndex: 20,
  },
  smallPlate: {
    xPercent: 50,
    yPercent: 58,
    widthPercent: 41,
    rotationDeg: 0,
    zIndex: 30,
  },
  fork: {
    xPercent: 30,
    yPercent: 61,
    widthPercent: 7,
    rotationDeg: 0,
    zIndex: 25,
  },
  knife: {
    xPercent: 70,
    yPercent: 61,
    widthPercent: 6,
    rotationDeg: 0,
    zIndex: 25,
  },
  largeSpoon: {
    xPercent: 79,
    yPercent: 61,
    widthPercent: 7,
    rotationDeg: 0,
    zIndex: 25,
  },
  smallSpoon: {
    xPercent: 21,
    yPercent: 61,
    widthPercent: 6,
    rotationDeg: 0,
    zIndex: 25,
  },
  glass: {
    xPercent: 32,
    yPercent: 24,
    widthPercent: 16,
    rotationDeg: 0,
    zIndex: 35,
  },
  napkin: {
    xPercent: 50,
    yPercent: 54.5,
    widthPercent: 18.5,
    rotationDeg: 0,
    zIndex: 40,
  },
  napkinRing: {
    xPercent: 50,
    yPercent: 61,
    widthPercent: 16,
    rotationDeg: 0,
    zIndex: 50,
  },
};

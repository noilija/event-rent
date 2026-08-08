export type TurntablePosition = {
  left: number;
  top: number;
  width: number;
  rotation: number;
  scale: number;
  opacity: number;
  zIndex: number;
};

// The visual pivot corresponds to the upper centre of the real round table.
// Keeping it as data makes it easy to calibrate against a future photo or 3D scene.
export const turntablePivot = { x: 50, y: 11 };

export const turntablePositions = {
  incoming: {
    left: -4,
    top: 52,
    width: 54,
    rotation: -10,
    scale: 0.68,
    opacity: 0.58,
    zIndex: 20,
  },
  active: {
    left: 50,
    top: 51,
    width: 86,
    rotation: 0,
    scale: 1,
    opacity: 1,
    zIndex: 40,
  },
  outgoing: {
    left: 104,
    top: 52,
    width: 54,
    rotation: 10,
    scale: 0.68,
    opacity: 0.58,
    zIndex: 30,
  },
  rear: {
    left: 50,
    top: 19,
    width: 42,
    rotation: 0,
    scale: 0.52,
    opacity: 0,
    zIndex: 10,
  },
} as const satisfies Record<string, TurntablePosition>;

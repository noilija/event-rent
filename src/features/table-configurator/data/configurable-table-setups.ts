import type { ConfigurableTableSetup } from "../types";
import { lightCirclesTableSetup } from "./light-circles-set";
import { pilotTableSetup } from "./pilot-set";

export const configurableTableSetups: ConfigurableTableSetup[] = [
  pilotTableSetup,
  lightCirclesTableSetup,
];

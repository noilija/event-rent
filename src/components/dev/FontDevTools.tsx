import {
  Bodoni_Moda,
  DM_Sans,
  Fraunces,
  Libre_Baskerville,
  Montserrat,
  Outfit,
  Playfair_Display,
  Source_Sans_3,
  Syne,
  Work_Sans,
} from "next/font/google";
import { FontDevSwitcher } from "./FontDevSwitcher";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin", "latin-ext"],
  preload: false,
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  preload: false,
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  preload: false,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  preload: false,
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin", "latin-ext"],
  preload: false,
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin", "latin-ext"],
  preload: false,
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin", "latin-ext"],
  preload: false,
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "latin-ext"],
  preload: false,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  preload: false,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  preload: false,
});

const alternativeFontVariables = [
  bodoni.variable,
  outfit.variable,
  fraunces.variable,
  dmSans.variable,
  syne.variable,
  workSans.variable,
  libreBaskerville.variable,
  sourceSans.variable,
  playfair.variable,
  montserrat.variable,
].join(" ");

export function FontDevTools() {
  return <FontDevSwitcher fontVariableClasses={alternativeFontVariables} />;
}

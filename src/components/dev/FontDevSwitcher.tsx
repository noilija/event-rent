"use client";

import { Check, ChevronDown, Type } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "event-rent-font-preset";
const CHANGE_EVENT = "event-rent-font-preset-change";

const fontPresets = [
  {
    id: "elegant",
    name: "Elegantno",
    display: "Cormorant Garamond",
    body: "Manrope",
    displayVariable: "--font-cormorant",
    bodyVariable: "--font-manrope",
  },
  {
    id: "editorial",
    name: "Editorial",
    display: "Bodoni Moda",
    body: "Outfit",
    displayVariable: "--font-bodoni",
    bodyVariable: "--font-outfit",
  },
  {
    id: "organic",
    name: "Toplo moderno",
    display: "Fraunces",
    body: "DM Sans",
    displayVariable: "--font-fraunces",
    bodyVariable: "--font-dm-sans",
  },
  {
    id: "contemporary",
    name: "Savremeno",
    display: "Syne",
    body: "Work Sans",
    displayVariable: "--font-syne",
    bodyVariable: "--font-work-sans",
  },
  {
    id: "timeless",
    name: "Bezvremensko",
    display: "Libre Baskerville",
    body: "Source Sans 3",
    displayVariable: "--font-libre-baskerville",
    bodyVariable: "--font-source-sans",
  },
  {
    id: "fashion",
    name: "Fashion luxe",
    display: "Playfair Display",
    body: "Montserrat",
    displayVariable: "--font-playfair",
    bodyVariable: "--font-montserrat",
  },
] as const;

type FontPresetId = (typeof fontPresets)[number]["id"];

function isFontPresetId(value: string | null): value is FontPresetId {
  return fontPresets.some((preset) => preset.id === value);
}

function getStoredPreset(): FontPresetId {
  const savedPreset = window.localStorage.getItem(STORAGE_KEY);
  return isFontPresetId(savedPreset) ? savedPreset : "elegant";
}

function getServerPreset(): FontPresetId {
  return "elegant";
}

function subscribeToPreset(onStoreChange: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY) onStoreChange();
  }

  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", handleStorage);
  };
}

function applyFontPreset(id: FontPresetId) {
  const preset = fontPresets.find((item) => item.id === id);

  if (!preset) return;

  document.documentElement.style.setProperty(
    "--font-display",
    `var(${preset.displayVariable})`,
  );
  document.documentElement.style.setProperty(
    "--font-sans",
    `var(${preset.bodyVariable})`,
  );
}

type FontDevSwitcherProps = {
  fontVariableClasses: string;
};

export function FontDevSwitcher({
  fontVariableClasses,
}: FontDevSwitcherProps) {
  const activePreset = useSyncExternalStore(
    subscribeToPreset,
    getStoredPreset,
    getServerPreset,
  );
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const classNames = fontVariableClasses.split(" ");

    document.documentElement.classList.add(...classNames);
    applyFontPreset(activePreset);

    return () => {
      document.documentElement.classList.remove(...classNames);
    };
  }, [activePreset, fontVariableClasses]);

  function selectPreset(id: FontPresetId) {
    window.localStorage.setItem(STORAGE_KEY, id);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  return (
    <aside
      className={`${fontVariableClasses} fixed inset-x-3 bottom-3 z-[100] sm:right-4 sm:left-auto sm:w-[24rem]`}
    >
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#211e1a]/95 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="flex w-full items-center gap-3 px-4 py-3 text-left"
          aria-expanded={isOpen}
          aria-controls="font-dev-options"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-white/10 text-[#d9ad59]">
            <Type size={16} aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[0.62rem] font-bold tracking-[0.2em] text-white/45">
              DEV · TIPOGRAFIJA
            </span>
            <span className="block truncate text-sm font-semibold">
              {fontPresets.find((preset) => preset.id === activePreset)?.name}
            </span>
          </span>
          <ChevronDown
            size={17}
            aria-hidden="true"
            className={`text-white/55 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div
            id="font-dev-options"
            className="grid grid-cols-2 gap-2 border-t border-white/10 p-2"
          >
            {fontPresets.map((preset) => {
              const isActive = preset.id === activePreset;

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => selectPreset(preset.id)}
                  aria-pressed={isActive}
                  className={`relative rounded-xl border px-3 py-2.5 text-left transition ${
                    isActive
                      ? "border-[#d9ad59]/70 bg-[#d9ad59]/15"
                      : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]"
                  }`}
                >
                  <span
                    className="block pr-5 text-base font-semibold leading-tight"
                    style={{ fontFamily: `var(${preset.displayVariable})` }}
                  >
                    {preset.name}
                  </span>
                  <span
                    className="mt-1 block truncate text-[0.64rem] text-white/48"
                    style={{ fontFamily: `var(${preset.bodyVariable})` }}
                  >
                    {preset.display} + {preset.body}
                  </span>
                  {isActive && (
                    <Check
                      size={14}
                      aria-hidden="true"
                      className="absolute top-2.5 right-2.5 text-[#d9ad59]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}

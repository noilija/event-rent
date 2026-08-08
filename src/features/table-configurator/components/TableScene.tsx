import Image from "next/image";
import { getSetAsset } from "../data/set-assets";
import type { ConfigurableTableSetup } from "../types";
import { PlaceSetting } from "./PlaceSetting";

type TableSceneProps = {
  setup: ConfigurableTableSetup;
  displayIndex?: number;
};

export function TableScene({ setup, displayIndex = 0 }: TableSceneProps) {
  const compositionAsset = setup.compositionAssetId
    ? getSetAsset(setup.compositionAssetId)
    : undefined;
  const hasCompleteComposition = compositionAsset?.status === "ready";

  return (
    <div
      className="relative isolate aspect-[3/2] w-full overflow-hidden bg-[#17140f]"
      style={{
        backgroundImage: setup.sceneBackground,
      }}
    >
      {hasCompleteComposition ? (
        <Image
          src={compositionAsset.src}
          alt={`${setup.name}, ${setup.subtitle}`}
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-contain object-center drop-shadow-[0_28px_40px_rgba(0,0,0,0.34)]"
        />
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
          <div
            className="absolute left-1/2 top-[54%] aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0c0c0c] shadow-[0_24px_64px_rgba(0,0,0,0.62)] ring-1 ring-white/10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 46% 32%, rgba(255,255,255,0.055), transparent 38%), repeating-linear-gradient(112deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 4px)",
            }}
          >
            <div className="pointer-events-none absolute inset-[2%] rounded-full ring-1 ring-white/[0.04]" />
            <PlaceSetting setup={setup} />
          </div>
        </>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/45 to-transparent" />

      <div className="absolute left-5 top-5 z-[60] sm:left-7 sm:top-6">
        <p className="text-xs uppercase tracking-[0.3em] text-white/55">
          Kompletna postavka
        </p>
      </div>

      <div className="absolute bottom-5 left-5 right-5 z-[60] flex items-end justify-between text-white sm:bottom-6 sm:left-7 sm:right-7">
        <div>
          <p className="font-display text-2xl font-semibold">{setup.name}</p>
          <p className="mt-1 text-sm text-white/65">{setup.subtitle}</p>
        </div>
        <span className="text-xs uppercase tracking-[0.28em] text-gold">
          {String(displayIndex + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

import Image from "next/image";
import { defaultPlaceSettingLayout, placeSettingSlots } from "../data/place-setting-layout";
import { getSetAsset } from "../data/set-assets";
import type { ConfigurableTableSetup } from "../types";

type PlaceSettingProps = {
  setup: ConfigurableTableSetup;
  className?: string;
};

export function PlaceSetting({ setup, className = "" }: PlaceSettingProps) {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      role="img"
      aria-label={`${setup.name}, ${setup.subtitle}`}
    >
      {placeSettingSlots.map((slot) => {
        const assetId = setup.assetIds[slot];
        const asset = assetId ? getSetAsset(assetId) : undefined;

        if (!asset || asset.status !== "ready") {
          return null;
        }

        const placement = defaultPlaceSettingLayout[slot];

        return (
          <Image
            key={slot}
            src={asset.src}
            alt=""
            width={asset.naturalWidth}
            height={asset.naturalHeight}
            draggable={false}
            sizes="(max-width: 1023px) 40vw, 24vw"
            className="pointer-events-none absolute h-auto max-w-none select-none drop-shadow-[0_10px_12px_rgba(0,0,0,0.28)]"
            style={{
              left: `${placement.xPercent}%`,
              top: `${placement.yPercent}%`,
              width: `${placement.widthPercent}%`,
              zIndex: placement.zIndex,
              transform: `translate(-50%, -50%) rotate(${placement.rotationDeg}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}

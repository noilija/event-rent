"use client";

import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { getSetAsset } from "../data/set-assets";
import {
  turntablePivot,
  turntablePositions,
  type TurntablePosition,
} from "../data/turntable-layout";
import type { ConfigurableTableSetup } from "../types";

type TableSetCarouselProps = {
  setups: ConfigurableTableSetup[];
};

type SetLayerProps = {
  setup: ConfigurableTableSetup;
  position: TurntablePosition;
  layerRef?: React.RefObject<HTMLDivElement | null>;
  isActive?: boolean;
};

function SetLayer({ setup, position, layerRef, isActive = false }: SetLayerProps) {
  const asset = setup.compositionAssetId
    ? getSetAsset(setup.compositionAssetId)
    : undefined;

  if (asset?.status !== "ready") {
    return null;
  }

  return (
    <div
      ref={layerRef}
      className="pointer-events-none absolute will-change-transform"
      style={{
        left: `${position.left}%`,
        top: `${position.top}%`,
        width: `${position.width}%`,
        opacity: position.opacity,
        zIndex: position.zIndex,
        transform: `translate(-50%, -50%) rotate(${position.rotation}deg) scale(${position.scale})`,
      }}
      aria-hidden={!isActive}
    >
      <Image
        src={asset.src}
        alt={isActive ? `${setup.name}, ${setup.subtitle}` : ""}
        width={asset.naturalWidth}
        height={asset.naturalHeight}
        sizes="(max-width: 1280px) 100vw, 1280px"
        className="h-auto w-full select-none drop-shadow-[0_16px_22px_rgba(0,0,0,0.26)]"
        priority={isActive}
      />
    </div>
  );
}

export function TableSetCarousel({ setups }: TableSetCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const activeLayerRef = useRef<HTMLDivElement>(null);
  const incomingLayerRef = useRef<HTMLDivElement>(null);
  const outgoingLayerRef = useRef<HTMLDivElement>(null);
  const activeSetup = setups[activeIndex];
  const canRotate = setups.length > 1;

  const getSetup = (index: number) =>
    setups[(index + setups.length) % setups.length];

  const incomingSetup = getSetup(activeIndex + 1);
  const outgoingSetup = getSetup(activeIndex - 1);

  function animateLayer(
    element: HTMLDivElement | null,
    position: TurntablePosition,
    duration: number,
  ) {
    if (!element) return;

    gsap.to(element, {
      left: `${position.left}%`,
      top: `${position.top}%`,
      width: `${position.width}%`,
      opacity: position.opacity,
      zIndex: position.zIndex,
      rotation: position.rotation,
      scale: position.scale,
      duration,
      ease: "power3.inOut",
      overwrite: "auto",
    });
  }

  function showAdjacentSetup(direction: -1 | 1) {
    if (!canRotate || isAnimating || !activeLayerRef.current) return;

    const nextIndex = (activeIndex + direction + setups.length) % setups.length;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveIndex(nextIndex);
      return;
    }

    setIsAnimating(true);

    const activeTarget =
      direction === 1 ? turntablePositions.outgoing : turntablePositions.incoming;
    const incomingTarget = turntablePositions.active;
    const outgoingTarget = turntablePositions.rear;
    const enteringLayer =
      direction === 1 ? incomingLayerRef.current : outgoingLayerRef.current;
    const leavingLayer = activeLayerRef.current;
    const rearLayer =
      direction === 1 ? outgoingLayerRef.current : incomingLayerRef.current;

    // All three layers travel around the same upper pivot. The background table
    // remains one physical object; only the place settings change their depth/position.
    gsap.set(
      [activeLayerRef.current, incomingLayerRef.current, outgoingLayerRef.current],
      {
        transformOrigin: `${turntablePivot.x}% ${turntablePivot.y}%`,
      }
    );

    const timeline = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => {
        flushSync(() => setActiveIndex(nextIndex));
        setIsAnimating(false);
      },
    });

    timeline.add(() => animateLayer(leavingLayer, activeTarget, 0.92), 0);
    timeline.add(() => animateLayer(enteringLayer, incomingTarget, 0.92), 0);
    timeline.add(() => animateLayer(rearLayer, outgoingTarget, 0.66), 0);
  }

  if (!activeSetup) return null;

  return (
    <>
      <div className="mb-7 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div aria-live="polite">
          <p className="mb-3 text-xs uppercase tracking-[0.24em] text-gold sm:mb-4 sm:text-sm sm:tracking-[0.32em]">
            Postavka stola
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-5xl sm:leading-none">
            {activeSetup.name}
          </h2>
          <p className="mt-3 text-base text-muted sm:mt-4 sm:text-lg">
            {activeSetup.subtitle}
          </p>
        </div>

        <p className="max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7 lg:justify-self-end">
          {activeSetup.description}
        </p>
      </div>

      <div className="relative isolate overflow-hidden bg-[#17140f] shadow-[0_28px_70px_rgba(55,42,20,0.18)]">
        <div className="relative aspect-[4/5] min-h-[360px] w-full sm:aspect-[3/2] sm:min-h-[530px]">
          <Image
            src="/set_assets/scenes/round-table-empty-topdown-v2.png"
            alt="Prazan okrugli sto za prikaz različitih postavki"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,transparent_35%,rgba(0,0,0,0.18)_100%)]" />

          <SetLayer
            setup={incomingSetup}
            position={turntablePositions.incoming}
            layerRef={incomingLayerRef}
          />
          <SetLayer
            setup={outgoingSetup}
            position={turntablePositions.outgoing}
            layerRef={outgoingLayerRef}
          />
          <SetLayer
            setup={activeSetup}
            position={turntablePositions.active}
            layerRef={activeLayerRef}
            isActive
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-40 bg-gradient-to-t from-black/65 to-transparent sm:h-44 sm:from-black/55" />

          <div className="absolute left-4 top-4 z-60 sm:left-7 sm:top-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Rotirajući sto
            </p>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-60 flex items-end justify-between gap-4 text-white sm:bottom-6 sm:left-7 sm:right-7">
            <div className="min-w-0">
              <p className="font-display text-xl font-semibold leading-tight sm:text-2xl">
                {activeSetup.name}
              </p>
              <p className="mt-1 text-xs leading-5 text-white/70 sm:text-sm">
                {activeSetup.subtitle}
              </p>
            </div>
            <span className="shrink-0 text-xs uppercase tracking-[0.22em] text-gold sm:tracking-[0.28em]">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => showAdjacentSetup(-1)}
          disabled={!canRotate || isAnimating}
          className="absolute left-3 top-1/2 z-70 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold/70 bg-black/45 text-xl text-white backdrop-blur transition hover:border-gold hover:bg-black/65 disabled:cursor-not-allowed disabled:opacity-30 sm:left-6 sm:h-12 sm:w-12 sm:text-2xl"
          aria-label="Rotiraj sto ulevo"
        >
          ←
        </button>

        <button
          type="button"
          onClick={() => showAdjacentSetup(1)}
          disabled={!canRotate || isAnimating}
          className="absolute right-3 top-1/2 z-70 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold/70 bg-black/45 text-xl text-white backdrop-blur transition hover:border-gold hover:bg-black/65 disabled:cursor-not-allowed disabled:opacity-30 sm:right-6 sm:h-12 sm:w-12 sm:text-2xl"
          aria-label="Rotiraj sto udesno"
        >
          →
        </button>
      </div>
    </>
  );
}

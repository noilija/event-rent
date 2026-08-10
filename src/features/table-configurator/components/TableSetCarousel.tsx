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

    const activeTarget = direction === 1 ? turntablePositions.outgoing : turntablePositions.incoming;
    const incomingTarget = turntablePositions.active;
    const outgoingTarget = turntablePositions.rear;
    const enteringLayer = direction === 1 ? incomingLayerRef.current : outgoingLayerRef.current;
    const leavingLayer = activeLayerRef.current;
    const rearLayer = direction === 1 ? outgoingLayerRef.current : incomingLayerRef.current;

    // All three layers travel around the same upper pivot. The background table
    // remains one physical object; only the place settings change their depth/position.
    gsap.set([activeLayerRef.current, incomingLayerRef.current, outgoingLayerRef.current], {
      transformOrigin: `${turntablePivot.x}% ${turntablePivot.y}%`,
    });

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
      <div className="mb-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div aria-live="polite">
          <p className="mb-4 text-sm uppercase tracking-[0.32em] text-gold">Postavka stola</p>
          <h2 className="font-display text-4xl font-semibold leading-none text-foreground sm:text-5xl">
            {activeSetup.name}
          </h2>
          <p className="mt-4 text-lg text-muted">{activeSetup.subtitle}</p>
        </div>

        <p className="max-w-2xl leading-7 text-muted lg:justify-self-end">
          {activeSetup.description}
        </p>
      </div>

      <div className="relative isolate overflow-hidden bg-[#17140f] shadow-[0_28px_70px_rgba(55,42,20,0.18)]">
        <div className="relative aspect-[3/2] min-h-[430px] w-full sm:min-h-[530px]">
          <Image
            src="/set_assets/scenes/round-table-empty-topdown-v2.png"
            alt="Prazan okrugli sto za prikaz različitih postavki"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,transparent_35%,rgba(0,0,0,0.18)_100%)]" />

          <SetLayer setup={incomingSetup} position={turntablePositions.incoming} layerRef={incomingLayerRef} />
          <SetLayer setup={outgoingSetup} position={turntablePositions.outgoing} layerRef={outgoingLayerRef} />
          <SetLayer setup={activeSetup} position={turntablePositions.active} layerRef={activeLayerRef} isActive />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-44 bg-gradient-to-t from-black/55 to-transparent" />

          <div className="absolute left-5 top-5 z-60 sm:left-7 sm:top-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Rotirajući sto</p>
          </div>

          <div className="absolute bottom-5 left-5 right-5 z-60 flex items-end justify-between text-white sm:bottom-6 sm:left-7 sm:right-7">
            <div>
              <p className="font-display text-2xl font-semibold">{activeSetup.name}</p>
              <p className="mt-1 text-sm text-white/70">{activeSetup.subtitle}</p>
            </div>
            <span className="text-xs uppercase tracking-[0.28em] text-gold">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => showAdjacentSetup(-1)}
          disabled={!canRotate || isAnimating}
          className="absolute left-3 top-1/2 z-70 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/70 bg-black/45 text-2xl text-white backdrop-blur transition hover:border-gold hover:bg-black/65 disabled:cursor-not-allowed disabled:opacity-30 sm:left-6"
          aria-label="Rotiraj sto ulevo"
        >
          ←
        </button>

        <button
          type="button"
          onClick={() => showAdjacentSetup(1)}
          disabled={!canRotate || isAnimating}
          className="absolute right-3 top-1/2 z-70 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/70 bg-black/45 text-2xl text-white backdrop-blur transition hover:border-gold hover:bg-black/65 disabled:cursor-not-allowed disabled:opacity-30 sm:right-6"
          aria-label="Rotiraj sto udesno"
        >
          →
        </button>
      </div>
    </>
  );
}

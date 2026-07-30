"use client";

import { useMemo, useState } from "react";
import { tableElements } from "../data/table-elements";
import { tableSetups } from "../data/table-setups";

export function TableShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSetup = tableSetups[activeIndex];

  const elementsById = useMemo(
    () => new Map(tableElements.map((element) => [element.id, element])),
    []
  );

  const activeElements = [
    elementsById.get(activeSetup.plateId),
    elementsById.get(activeSetup.cutleryId),
    elementsById.get(activeSetup.glassId),
    elementsById.get(activeSetup.napkinId),
    elementsById.get(activeSetup.napkinRingId),
    elementsById.get(activeSetup.tableclothId),
  ].filter((element): element is NonNullable<typeof element> =>
    Boolean(element)
  );

  function showPreviousSetup() {
    setActiveIndex((current) =>
      current === 0 ? tableSetups.length - 1 : current - 1
    );
  }

  function showNextSetup() {
    setActiveIndex((current) =>
      current === tableSetups.length - 1 ? 0 : current + 1
    );
  }

  return (
    <section id="setovi" className="bg-background px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="relative min-h-[420px] overflow-hidden border border-line bg-surface">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${activeSetup.previewTone} opacity-80 transition-all duration-700`}
          />
          <div className="absolute inset-8 rounded-full border border-white/20" />
          <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/50 bg-black/20 shadow-2xl shadow-black/50 transition-transform duration-700" />
          <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 shadow-xl transition-transform duration-700" />
          <div className="absolute left-[54%] top-[42%] h-32 w-3 rotate-12 rounded-full bg-gold" />
          <div className="absolute left-[59%] top-[42%] h-32 w-3 rotate-12 rounded-full bg-gold" />
          <div className="absolute left-[34%] top-[38%] h-24 w-14 rounded-full border border-white/60 bg-white/20 backdrop-blur" />
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-black/70">
            <span>{activeSetup.name}</span>
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.32em] text-gold">
            Postavka stola
          </p>
          <h2 className="font-display text-5xl font-semibold leading-none text-foreground sm:text-6xl">
            {activeSetup.name}
          </h2>
          <p className="mt-5 text-xl text-muted">{activeSetup.tagline}</p>
          <p className="mt-6 max-w-xl leading-8 text-muted">
            {activeSetup.description}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {activeElements.map((element) => (
              <div
                key={element.id}
                className="border border-line bg-white/[0.03] p-4"
              >
                <div
                  className="mb-4 h-2 w-14"
                  style={{ backgroundColor: element.color }}
                />
                <h3 className="text-sm font-semibold text-foreground">
                  {element.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {element.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={showPreviousSetup}
              className="flex h-12 w-12 items-center justify-center border border-line text-xl text-foreground transition hover:border-gold hover:text-gold"
              aria-label="Prethodni komplet"
            >
              ←
            </button>
            <button
              type="button"
              onClick={showNextSetup}
              className="flex h-12 w-12 items-center justify-center border border-line text-xl text-foreground transition hover:border-gold hover:text-gold"
              aria-label="Sledeci komplet"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { heroSlides, heroSlideshowConfig } from "./hero-slides";

export function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);
  const elapsedMsRef = useRef(0);
  const lastFrameMsRef = useRef<number | null>(null);
  const slideDurationMs =
    heroSlideshowConfig.displayDurationMs + heroSlideshowConfig.transitionDurationMs;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || heroSlides.length < 2) {
      lastFrameMsRef.current = null;
      return;
    }

    let frameId = 0;

    function updateProgress(timestamp: number) {
      if (lastFrameMsRef.current === null) {
        lastFrameMsRef.current = timestamp;
      }

      elapsedMsRef.current += timestamp - lastFrameMsRef.current;
      lastFrameMsRef.current = timestamp;

      if (elapsedMsRef.current >= slideDurationMs) {
        elapsedMsRef.current = 0;
        lastFrameMsRef.current = null;
        setSlideProgress(0);
        setActiveIndex((currentIndex) => (currentIndex + 1) % heroSlides.length);
        frameId = window.requestAnimationFrame(updateProgress);
        return;
      }

      setSlideProgress((elapsedMsRef.current / slideDurationMs) * 100);
      frameId = window.requestAnimationFrame(updateProgress);
    }

    frameId = window.requestAnimationFrame(updateProgress);

    return () => window.cancelAnimationFrame(frameId);
  }, [isPaused, prefersReducedMotion, slideDurationMs]);

  function showSlide(index: number) {
    elapsedMsRef.current = 0;
    lastFrameMsRef.current = null;
    setSlideProgress(0);
    setActiveIndex(index);
  }

  return (
    <div
      className="relative isolate min-h-[100svh] sm:h-[82vh] sm:min-h-[560px] lg:h-[min(86vh,900px)]"
      aria-label="Fotografije Event Rent ponude"
    >
      <div className="hero-slideshow-media">
        {heroSlides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover motion-reduce:transition-none"
            style={{
              opacity: index === activeIndex ? 1 : 0,
              objectPosition: slide.objectPosition,
              transitionDuration: `${heroSlideshowConfig.transitionDurationMs}ms`,
              transitionProperty: "opacity",
            }}
            aria-hidden={index !== activeIndex}
          />
        ))}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.58),rgba(0,0,0,0.36)_38%,rgba(0,0,0,0.58)),radial-gradient(ellipse_at_center,rgba(0,0,0,0.08),rgba(0,0,0,0.5))] sm:bg-[linear-gradient(180deg,rgba(0,0,0,0.34),rgba(0,0,0,0.48)),radial-gradient(ellipse_at_center,rgba(0,0,0,0.12),rgba(0,0,0,0.46))]" />
      </div>

      <div className="absolute bottom-4 left-5 right-5 z-10 flex items-center justify-between gap-5 sm:bottom-7 sm:left-7 sm:right-7">
        <span className="text-[0.64rem] uppercase tracking-[0.2em] text-white/85 sm:text-xs sm:tracking-[0.28em]">
          Event Rent
        </span>
      </div>

      <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-end text-white sm:flex">
        <div className="flex flex-col items-end" aria-label="Izbor fotografije">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => showSlide(index)}
              className="group flex h-8 w-14 items-center justify-end sm:h-7 sm:w-16"
              aria-label={`Prikaži fotografiju ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              <span
                className={`relative h-px overflow-hidden transition-all duration-300 group-focus-visible:h-0.5 ${
                  index === activeIndex
                    ? "w-10 bg-white/35 shadow-[0_0_14px_rgba(244,199,102,0.26)] sm:w-12"
                    : "w-4 bg-white/50 group-hover:w-8 group-hover:bg-white/80 sm:w-5 sm:group-hover:w-9"
                }`}
                aria-hidden="true"
              >
                {index === activeIndex ? (
                  <span
                    className="absolute inset-y-0 right-0 bg-[#f4c766]"
                    style={{ width: `${slideProgress}%` }}
                  />
                ) : null}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

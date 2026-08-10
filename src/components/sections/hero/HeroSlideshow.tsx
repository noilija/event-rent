"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroSlides, heroSlideshowConfig } from "./hero-slides";

export function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % heroSlides.length);
    }, heroSlideshowConfig.displayDurationMs + heroSlideshowConfig.transitionDurationMs);

    return () => window.clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  function showSlide(index: number) {
    setActiveIndex(index);
  }

  return (
    <div
      className="relative isolate min-h-[100svh] sm:h-[82vh] sm:min-h-[560px] lg:h-[min(86vh,900px)]"
      aria-label="Fotografije Event Rent ponude"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
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

        <div className="flex items-center gap-2" aria-label="Izbor fotografije">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => showSlide(index)}
              className={`h-2 transition-all duration-300 ${
                index === activeIndex ? "w-8 bg-white" : "w-2 bg-white/55"
              }`}
              aria-label={`Prikaži fotografiju ${index + 1}`}
              aria-pressed={index === activeIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

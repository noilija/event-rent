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
      className="relative isolate h-[58vh] min-h-[390px] sm:h-[66vh] lg:h-[min(72vh,760px)]"
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
            sizes="(max-width: 1023px) 100vw, 68vw"
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

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>

      <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between sm:bottom-7 sm:left-7 sm:right-7">
        <span className="text-xs uppercase tracking-[0.28em] text-white/85">
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

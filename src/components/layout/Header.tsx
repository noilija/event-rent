"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { navigationItems } from "@/config/navigation";

const drawerItems = navigationItems;
const drawerAnimationMs = 300;

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerClosing, setIsDrawerClosing] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const closeTimeoutRef = useRef<number | null>(null);

  function clearCloseTimeout() {
    if (!closeTimeoutRef.current) return;

    window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  }

  function openDrawer() {
    clearCloseTimeout();
    setIsDrawerClosing(false);
    setIsDrawerOpen(true);
  }

  function closeDrawer() {
    if (!isDrawerOpen && !isDrawerClosing) return;

    clearCloseTimeout();
    setIsDrawerOpen(false);
    setIsDrawerClosing(true);
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsDrawerClosing(false);
      closeTimeoutRef.current = null;
    }, drawerAnimationMs);
  }

  function toggleDrawer() {
    if (isDrawerOpen) {
      closeDrawer();
      return;
    }

    openDrawer();
  }

  function handleNavigation(
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    const targetId = href.slice(1);
    const target = document.getElementById(targetId);

    if (!target) return;

    event.preventDefault();
    closeDrawer();

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "auto"
      : "smooth";

    if (targetId === "pocetna") {
      // The hero is sticky, so scrollIntoView can consider it visible even when
      // the page content is covering it.
      window.scrollTo({ top: 0, behavior });
    } else {
      target.scrollIntoView({ behavior, block: "start" });
    }

    if (window.location.hash !== href) {
      window.history.pushState(null, "", href);
    }
  }

  useEffect(() => {
    function updateHeaderVisibility() {
      const hero = document.getElementById("pocetna");
      const nextSection = hero?.nextElementSibling;

      if (!nextSection) {
        setIsHeroVisible(window.scrollY < window.innerHeight * 0.85);
        return;
      }

      const nextSectionTop = nextSection.getBoundingClientRect().top;
      const nextHeroVisible = nextSectionTop > 64;

      setIsHeroVisible(nextHeroVisible);
      if (nextHeroVisible) {
        setIsDrawerOpen(false);
      }
    }

    updateHeaderVisibility();
    window.addEventListener("scroll", updateHeaderVisibility, { passive: true });
    window.addEventListener("resize", updateHeaderVisibility);

    return () => {
      window.removeEventListener("scroll", updateHeaderVisibility);
      window.removeEventListener("resize", updateHeaderVisibility);
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const isDrawerCoveringButton = isDrawerOpen || isDrawerClosing;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 px-3 transition-colors duration-300 sm:px-4 lg:px-6 ${
        isHeroVisible && !isDrawerCoveringButton
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line bg-background/80 backdrop-blur"
      }`}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0"
        focusable="false"
      >
        <defs>
          <filter
            id="logo-r-white-outline"
            x="-8%"
            y="-8%"
            width="116%"
            height="116%"
            colorInterpolationFilters="sRGB"
          >
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                -2 -2 -2 1 0
              "
              result="black-r-mask"
            />
            <feMorphology
              in="black-r-mask"
              operator="dilate"
              radius="0.9"
              result="expanded-r"
            />
            <feComposite
              in="expanded-r"
              in2="black-r-mask"
              operator="out"
              result="r-outline-mask"
            />
            <feFlood floodColor="#ffffff" result="outline-color" />
            <feComposite
              in="outline-color"
              in2="r-outline-mask"
              operator="in"
              result="white-r-outline"
            />
            <feMerge>
              <feMergeNode in="white-r-outline" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <nav className="relative z-20 flex h-14 w-full items-center justify-between sm:h-16">
        <button
          type="button"
          onClick={toggleDrawer}
          className={`flex h-9 w-9 items-center justify-center border transition sm:h-10 sm:w-10 ${
            isDrawerCoveringButton
              ? "border-transparent bg-transparent text-foreground shadow-none"
              : isHeroVisible
              ? "border-white/55 bg-transparent text-white shadow-[0_2px_18px_rgba(0,0,0,0.28)] hover:border-white hover:bg-white/10"
              : "border-line bg-surface/80 text-foreground hover:border-gold hover:text-gold"
          }`}
          aria-label={isDrawerOpen ? "Zatvori meni" : "Otvori meni"}
          aria-expanded={isDrawerOpen}
          aria-controls="site-navigation-drawer"
        >
          <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
            <span className="h-px w-full bg-current" />
            <span className="h-px w-full bg-current" />
            <span className="h-px w-full bg-current" />
          </span>
        </button>

        <a
          href="#pocetna"
          className={`absolute left-1/2 block -translate-x-1/2 -translate-y-1/2 transition-[top,width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isHeroVisible && !isDrawerCoveringButton
              ? "top-[72%] h-[4.125rem] w-[4.125rem] sm:h-[4.75rem] sm:w-[4.75rem]"
              : "top-1/2 h-9 w-9 sm:h-11 sm:w-11"
          }`}
          aria-label="Početna"
          onClick={(event) => handleNavigation(event, "#pocetna")}
        >
          <Image
            src="/brand/logo.png"
            alt="Event Rent logo"
            fill
            priority
            sizes="76px"
            className="object-contain"
            style={{ filter: "url(#logo-r-white-outline)" }}
          />
        </a>

        <div className="flex items-center">
          <a
            href="#kontakt"
            className={`border px-3 py-1.5 text-[0.7rem] font-medium transition duration-200 sm:px-3.5 sm:py-2 sm:text-xs ${
              isHeroVisible || isDrawerCoveringButton
                ? "pointer-events-none translate-y-1 opacity-0"
                : "translate-y-0 opacity-100"
            } ${
              isHeroVisible
                ? "border-white/35 bg-white/[0.04] text-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.14)] backdrop-blur-[2px] [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] hover:border-white/70 hover:bg-white/[0.09] hover:text-white"
                : "border-foreground/20 bg-transparent text-foreground/80 hover:border-foreground/45 hover:bg-foreground/[0.04] hover:text-foreground"
            }`}
          >
            Kontakt
          </a>
        </div>
      </nav>

      <div
        className={`fixed left-0 top-0 z-10 h-screen w-[min(84vw,320px)] border-r border-line bg-surface pt-14 shadow-[18px_0_48px_rgba(55,42,20,0.16)] transition-transform duration-300 ease-out sm:pt-16 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        id="site-navigation-drawer"
      >
        <div className="flex h-full flex-col py-6">
          {drawerItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleNavigation(event, item.href)}
              className="border-b border-line px-5 py-4 font-sans text-2xl text-foreground transition hover:bg-surface-alt hover:text-gold sm:px-6 sm:py-5 sm:text-3xl"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

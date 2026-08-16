"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Camera,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/config/site";

export function ContactSection() {
  const [isPhoneMenuOpen, setIsPhoneMenuOpen] = useState(false);
  const firstPhoneActionRef = useRef<HTMLAnchorElement>(null);

  const { instagramUrl, phoneDisplay, phoneE164 } = siteConfig.contact;
  const hasInstagram = instagramUrl.trim().length > 0;
  const hasPhone = phoneE164.trim().length > 0;

  useEffect(() => {
    if (!isPhoneMenuOpen) return;

    const previouslyFocusedElement = document.activeElement as HTMLElement | null;
    const previousBodyOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    firstPhoneActionRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsPhoneMenuOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousBodyOverflow;
      previouslyFocusedElement?.focus();
    };
  }, [isPhoneMenuOpen]);

  return (
    <section className="min-h-[100svh] px-4 py-16 sm:px-4 sm:py-24 lg:px-6">
      <Container className="mx-auto max-w-[96rem]">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-[0_16px_44px_rgba(55,42,20,0.08)] sm:rounded-[2.25rem]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
          />

          <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
            <div className="px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
              <div id="kontakt" className="section-scroll-target">
                <SectionEyebrow>Kontakt</SectionEyebrow>
                <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
                  Planirate proslavu?
                </h2>
                <p className="mt-5 max-w-2xl leading-7 text-muted sm:mt-6 sm:leading-8">
                  Javite nam da li proslavu planirate kod nas ili na vašoj
                  lokaciji, datum događaja i okviran broj gostiju.
                </p>

                <button
                  type="button"
                  disabled
                  title="Stranica za kreiranje ponude biće uskoro dostupna."
                  className="mt-8 inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-white opacity-65 shadow-[0_10px_24px_rgba(181,138,59,0.2)] sm:text-base"
                >
                  Kreiraj ponudu
                  <ArrowRight aria-hidden="true" className="size-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-3 border-t border-line bg-surface-alt/45 px-6 py-9 sm:px-10 sm:py-12 lg:border-l lg:border-t-0 lg:px-12 lg:py-16">
              {hasInstagram ? (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-16 items-center justify-between gap-5 rounded-2xl border border-line bg-surface px-5 py-4 text-left font-semibold shadow-[0_8px_24px_rgba(55,42,20,0.06)] transition-[border-color,color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold hover:shadow-[0_14px_30px_rgba(55,42,20,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <span className="flex items-center gap-3">
                    <Camera aria-hidden="true" className="size-5" />
                    Instagram
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  title="Instagram link još nije unet."
                  className="flex min-h-16 items-center justify-between gap-5 rounded-2xl border border-line bg-surface px-5 py-4 text-left font-semibold opacity-55 shadow-[0_8px_24px_rgba(55,42,20,0.06)]"
                >
                  <span className="flex items-center gap-3">
                    <Camera aria-hidden="true" className="size-5" />
                    Instagram
                  </span>
                  <ArrowRight aria-hidden="true" className="size-4" />
                </button>
              )}

              <button
                type="button"
                disabled={!hasPhone}
                onClick={() => setIsPhoneMenuOpen(true)}
                title={hasPhone ? undefined : "Broj telefona još nije unet."}
                className="group flex min-h-16 items-center justify-between gap-5 rounded-2xl border border-line bg-surface px-5 py-4 text-left font-semibold shadow-[0_8px_24px_rgba(55,42,20,0.06)] transition-[border-color,color,transform,box-shadow] duration-300 enabled:hover:-translate-y-0.5 enabled:hover:border-gold enabled:hover:text-gold enabled:hover:shadow-[0_14px_30px_rgba(55,42,20,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:opacity-55 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <span className="flex items-center gap-3">
                  <Phone aria-hidden="true" className="size-5" />
                  {phoneDisplay || "Broj telefona"}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-enabled:group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                />
              </button>
            </div>
          </div>
        </div>
      </Container>

      {isPhoneMenuOpen && hasPhone ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsPhoneMenuOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="phone-menu-title"
            aria-describedby="phone-menu-description"
            className="relative w-full max-w-md rounded-[1.75rem] border border-white/20 bg-surface p-6 shadow-[0_30px_90px_rgba(0,0,0,0.3)] sm:p-8"
          >
            <button
              type="button"
              aria-label="Zatvori izbor kontakta"
              onClick={() => setIsPhoneMenuOpen(false)}
              className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-line text-muted transition hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <X aria-hidden="true" className="size-5" />
            </button>

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Kontakt
            </p>
            <h3
              id="phone-menu-title"
              className="mt-3 pr-10 font-display text-3xl font-semibold leading-tight"
            >
              Kako želite da nas kontaktirate?
            </h3>
            <p
              id="phone-menu-description"
              className="mt-3 text-sm leading-6 text-muted"
            >
              Izaberite poziv ili SMS poruku za broj {phoneDisplay || phoneE164}.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <a
                ref={firstPhoneActionRef}
                href={`tel:${phoneE164}`}
                onClick={() => setIsPhoneMenuOpen(false)}
                className="flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-gold px-5 py-3 font-semibold text-white shadow-[0_10px_24px_rgba(181,138,59,0.22)] transition hover:bg-[#9f782f] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
              >
                <Phone aria-hidden="true" className="size-4" />
                Pozovi
              </a>
              <a
                href={`sms:${phoneE164}`}
                onClick={() => setIsPhoneMenuOpen(false)}
                className="flex min-h-14 items-center justify-center gap-2.5 rounded-full border border-line bg-surface px-5 py-3 font-semibold transition hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                Pošalji SMS
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

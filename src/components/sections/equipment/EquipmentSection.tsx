"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { equipmentItems } from "./equipment.data";

export function EquipmentSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const selectedItem =
    selectedIndex === null ? null : equipmentItems[selectedIndex];
  const activeImage = selectedItem?.images[activeImageIndex];
  const hasMultipleImages = (selectedItem?.images.length ?? 0) > 1;

  function openModal(index: number) {
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    setActiveImageIndex(0);
    setSelectedIndex(index);
  }

  function closeModal() {
    setSelectedIndex(null);
    setActiveImageIndex(0);
  }

  function showPreviousImage() {
    if (!selectedItem || selectedItem.images.length < 2) return;

    setActiveImageIndex((currentIndex) =>
      (currentIndex - 1 + selectedItem.images.length) % selectedItem.images.length
    );
  }

  function showNextImage() {
    if (!selectedItem || selectedItem.images.length < 2) return;

    setActiveImageIndex(
      (currentIndex) => (currentIndex + 1) % selectedItem.images.length
    );
  }

  useEffect(() => {
    if (!selectedItem) return;

    const imageCount = selectedItem.images.length;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
        return;
      }

      if (event.key === "ArrowLeft") {
        if (imageCount > 1) {
          setActiveImageIndex(
            (currentIndex) =>
              (currentIndex - 1 + imageCount) % imageCount
          );
        }
        return;
      }

      if (event.key === "ArrowRight") {
        if (imageCount > 1) {
          setActiveImageIndex(
            (currentIndex) => (currentIndex + 1) % imageCount
          );
        }
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        )
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [selectedItem]);

  return (
    <section className="px-4 py-16 sm:px-4 sm:py-24 lg:px-6">
      <Container className="mx-auto max-w-[96rem]">
        <div id="oprema" className="section-scroll-target max-w-3xl">
          <SectionEyebrow>Oprema</SectionEyebrow>
          <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Oprema koju nudimo
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
            Pažljivo odabrana oprema za elegantne, udobne i besprekorno
            organizovane proslave na otvorenom.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-10 sm:gap-4 lg:grid-cols-3 lg:gap-6">
          {equipmentItems.map((item, index) => {
            const coverImage = item.images[0];

            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => openModal(index)}
                className="group relative isolate aspect-[4/5] min-w-0 cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-surface-alt text-left shadow-[0_12px_30px_rgba(55,42,20,0.10)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_24px_55px_rgba(55,42,20,0.20)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:rounded-3xl motion-reduce:transform-none motion-reduce:transition-none"
                aria-haspopup="dialog"
                aria-label={`Pogledaj detalje za ${item.name}`}
              >
                <Image
                  src={coverImage.src}
                  alt={coverImage.alt}
                  fill
                  sizes="(max-width: 1023px) 50vw, 33vw"
                  className="scale-[1.01] object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.055] motion-reduce:transform-none motion-reduce:transition-none"
                  style={{ objectPosition: coverImage.objectPosition }}
                />

                <span
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/10 transition-colors duration-500 group-hover:from-black/90 group-hover:via-black/5 motion-reduce:transition-none"
                  aria-hidden="true"
                />

                <span className="absolute inset-x-0 top-0 flex items-center justify-between p-3 sm:p-5">
                  <span className="rounded-full border border-white/25 bg-black/20 px-2.5 py-1 text-[0.58rem] font-semibold tracking-[0.18em] text-white/85 backdrop-blur-md sm:px-3 sm:text-[0.65rem]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="h-px w-5 origin-right bg-gold/90 transition-transform duration-500 group-hover:scale-x-150 sm:w-7 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </span>

                <span className="absolute inset-x-0 bottom-0 p-3.5 text-white sm:p-6 lg:p-7">
                  <span
                    className="mb-2 block h-px w-6 origin-left bg-gold transition-transform duration-500 group-hover:scale-x-150 sm:mb-3 sm:w-8 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                  <span className="block font-display text-[1.25rem] font-semibold leading-[1.05] text-balance [text-shadow:0_2px_16px_rgba(0,0,0,0.45)] sm:text-3xl lg:text-4xl">
                    {item.name}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Container>

      {selectedItem &&
        activeImage &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1c1712]/75 p-3 backdrop-blur-md sm:p-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeModal();
            }}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              className="relative grid max-h-[94svh] w-full max-w-6xl overflow-y-auto rounded-[1.5rem] border border-white/70 bg-surface shadow-[0_30px_100px_rgba(22,16,10,0.38)] sm:rounded-[2rem] md:h-[min(82svh,47rem)] md:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.85fr)] md:overflow-hidden"
            >
              <div className="relative min-h-[19rem] overflow-hidden bg-[#e9e1d5] sm:min-h-[25rem] md:min-h-0">
                <Image
                  key={activeImage.src}
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  priority
                  sizes="(max-width: 767px) 100vw, 62vw"
                  className="object-cover"
                  style={{ objectPosition: activeImage.objectPosition }}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10"
                  aria-hidden="true"
                />

                <button
                  type="button"
                  onClick={showPreviousImage}
                  disabled={!hasMultipleImages}
                  className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/45 bg-black/30 text-white shadow-lg backdrop-blur-md transition hover:border-gold hover:bg-gold hover:text-[#211a12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-default disabled:opacity-40 sm:left-5 sm:size-12 motion-reduce:transition-none"
                  aria-label="Prethodna fotografija proizvoda"
                >
                  <ChevronLeft className="size-5 sm:size-6" strokeWidth={1.7} />
                </button>
                <button
                  type="button"
                  onClick={showNextImage}
                  disabled={!hasMultipleImages}
                  className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/45 bg-black/30 text-white shadow-lg backdrop-blur-md transition hover:border-gold hover:bg-gold hover:text-[#211a12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-default disabled:opacity-40 sm:right-5 sm:size-12 motion-reduce:transition-none"
                  aria-label="Sledeća fotografija proizvoda"
                >
                  <ChevronRight className="size-5 sm:size-6" strokeWidth={1.7} />
                </button>

                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/30 bg-black/35 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.16em] text-white backdrop-blur-md sm:bottom-5">
                  {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
                  {String(selectedItem.images.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex min-h-0 flex-col px-6 pb-7 pt-16 sm:px-9 sm:pb-9 sm:pt-20 md:px-10 md:pb-10 md:pt-20 lg:px-12">
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeModal}
                  className="absolute right-4 top-4 z-20 grid size-11 place-items-center rounded-full border border-line bg-surface/90 text-foreground shadow-sm backdrop-blur-md transition hover:border-gold hover:bg-gold hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:right-6 sm:top-6 motion-reduce:transition-none"
                  aria-label="Zatvori detalje proizvoda"
                >
                  <X className="size-5" strokeWidth={1.7} />
                </button>

                <span className="mb-4 flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold">
                  Detalji proizvoda
                  <span className="h-px w-9 bg-gold/55" aria-hidden="true" />
                </span>
                <h3
                  id={titleId}
                  className="max-w-md font-display text-4xl font-semibold leading-[0.98] text-balance sm:text-5xl lg:text-[3.5rem]"
                >
                  {selectedItem.name}
                </h3>
                <p
                  id={descriptionId}
                  className="mt-6 max-w-md text-sm leading-7 text-muted sm:text-[0.95rem]"
                >
                  {selectedItem.description}
                </p>

                <div className="mt-9 grid grid-cols-2 gap-4 border-t border-line pt-6 md:mt-auto">
                  <div>
                    <span className="block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-muted">
                      Dostupna količina
                    </span>
                    <span className="mt-2 block text-sm font-semibold sm:text-base">
                      {selectedItem.availableQuantity}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-muted">
                      Cena
                    </span>
                    <span className="mt-2 block font-display text-2xl font-semibold text-gold sm:text-3xl">
                      {selectedItem.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}

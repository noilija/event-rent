"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { CSSProperties, TouchEvent as ReactTouchEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import type { GalleryManifestItem } from "@/data/gallery.generated";

type GalleryItem = GalleryManifestItem;

type CollagePlacement = {
  height: number;
  itemIndex: number;
  width: number;
  x: number;
  y: number;
};

type CollageRow = {
  height: number;
  itemCount: number;
  startInset: number;
};

type RowSolution = {
  rows: CollageRow[];
  score: number;
};

type CollageLayout = {
  durationSeconds: number;
  height: number;
  placements: CollagePlacement[];
  width: number;
};

const COLLAGE_GAP = 0.72;
const BASE_COLLAGE_WIDTH = 108;
const TARGET_ROW_HEIGHTS = [11.7, 10.2, 11.1, 9.8, 10.8];
const ROW_START_INSETS = [0, 1.1, 0.4, 1.6, 0.25];
const ROW_END_INSETS = [1.3, 0.3, 1.8, 0.55, 1.1];
const MIN_IMAGES_PER_ROW = 2;
const MAX_IMAGES_PER_ROW = 10;

function getCollageWidth(items: GalleryItem[], rowCount: number) {
  const averageRatio =
    items.reduce((total, item) => total + item.width / item.height, 0) /
    items.length;
  const averageTargetHeight =
    TARGET_ROW_HEIGHTS.reduce((total, height) => total + height, 0) /
    TARGET_ROW_HEIGHTS.length;
  const averageImagesPerRow = items.length / rowCount;

  return Math.max(
    BASE_COLLAGE_WIDTH,
    averageRatio * averageTargetHeight * averageImagesPerRow +
      COLLAGE_GAP * Math.max(0, averageImagesPerRow - 1) +
      4
  );
}

function createRow(
  items: GalleryItem[],
  startIndex: number,
  itemCount: number,
  rowIndex: number,
  collageWidth: number
): CollageRow {
  const startInset = ROW_START_INSETS[rowIndex % ROW_START_INSETS.length];
  const endInset = ROW_END_INSETS[rowIndex % ROW_END_INSETS.length];
  const ratioSum = items
    .slice(startIndex, startIndex + itemCount)
    .reduce((total, item) => total + item.width / item.height, 0);
  const availableWidth =
    collageWidth - startInset - endInset - COLLAGE_GAP * (itemCount - 1);

  return {
    height: availableWidth / ratioSum,
    itemCount,
    startInset,
  };
}

function getRowCost(row: CollageRow, rowIndex: number) {
  const targetHeight = TARGET_ROW_HEIGHTS[rowIndex % TARGET_ROW_HEIGHTS.length];
  const scaleDifference = Math.log(row.height / targetHeight);
  const minimumHeightPenalty = Math.max(0, 8 - row.height) * 0.35;
  const maximumHeightPenalty = Math.max(0, row.height - 14.5) * 0.35;

  return scaleDifference ** 2 + minimumHeightPenalty + maximumHeightPenalty;
}

function createBalancedRows(
  items: GalleryItem[],
  collageWidth: number,
  targetRowCount: number
) {
  const memo = new Map<string, RowSolution>();

  function solve(startIndex: number, rowIndex: number): RowSolution {
    const cacheKey = `${startIndex}:${rowIndex}`;
    const cached = memo.get(cacheKey);

    if (cached) return cached;

    const remainingItems = items.length - startIndex;
    const remainingRows = targetRowCount - rowIndex;

    if (remainingRows === 1) {
      const row = createRow(
        items,
        startIndex,
        remainingItems,
        rowIndex,
        collageWidth
      );
      const result = { rows: [row], score: getRowCost(row, rowIndex) };
      memo.set(cacheKey, result);
      return result;
    }

    const remainingMinimum = MIN_IMAGES_PER_ROW * (remainingRows - 1);
    const maximumItemCount = Math.min(
      MAX_IMAGES_PER_ROW,
      remainingItems - remainingMinimum
    );
    let bestResult: RowSolution | null = null;

    for (
      let itemCount = MIN_IMAGES_PER_ROW;
      itemCount <= maximumItemCount;
      itemCount += 1
    ) {
      const row = createRow(
        items,
        startIndex,
        itemCount,
        rowIndex,
        collageWidth
      );
      const followingRows = solve(startIndex + itemCount, rowIndex + 1);
      const score = getRowCost(row, rowIndex) + followingRows.score;

      if (!bestResult || score < bestResult.score) {
        bestResult = { rows: [row, ...followingRows.rows], score };
      }
    }

    const result = bestResult ?? { rows: [], score: Number.POSITIVE_INFINITY };
    memo.set(cacheKey, result);
    return result;
  }

  return solve(0, 0).rows;
}

function createCollageLayout(items: GalleryItem[]): CollageLayout {
  if (items.length === 0) {
    return { durationSeconds: 0, height: 0, placements: [], width: 0 };
  }

  const desiredRowCount =
    items.length < 4
      ? 1
      : Math.max(2, Math.round(Math.sqrt(items.length / 2.5)));
  const targetRowCount = Math.min(
    Math.max(1, Math.floor(items.length / MIN_IMAGES_PER_ROW)),
    desiredRowCount
  );
  const collageWidth = getCollageWidth(items, targetRowCount);
  const rows = createBalancedRows(items, collageWidth, targetRowCount);
  const placements: CollagePlacement[] = [];
  let itemIndex = 0;
  let y = 0;

  rows.forEach((row) => {
    let x = row.startInset;

    for (let index = 0; index < row.itemCount; index += 1) {
      const item = items[itemIndex];
      const width = row.height * (item.width / item.height);

      placements.push({
        height: row.height,
        itemIndex,
        width,
        x,
        y,
      });

      x += width + COLLAGE_GAP;
      itemIndex += 1;
    }

    y += row.height + COLLAGE_GAP;
  });

  return {
    durationSeconds: Math.max(58, collageWidth / 1.65),
    height: y - COLLAGE_GAP,
    placements,
    width: collageWidth,
  };
}

type GalleryThumbnailProps = {
  isClone?: boolean;
  item: GalleryItem;
  itemIndex: number;
  itemsCount: number;
  onOpen: (index: number) => void;
  placement: CSSProperties;
};

function GalleryThumbnail({
  isClone = false,
  item,
  itemIndex,
  itemsCount,
  onOpen,
  placement,
}: GalleryThumbnailProps) {
  const thumbnail = (
    <>
      <Image
        src={item.smallSrc}
        alt={isClone ? "" : item.alt}
        fill
        sizes="(max-width: 639px) 48vw, (max-width: 1199px) 31vw, 24vw"
        unoptimized
        className="object-contain"
      />
      <span
        className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15 motion-reduce:transition-none"
        aria-hidden="true"
      />
      <span
        className="absolute right-3 top-3 grid size-9 translate-y-1 place-items-center rounded-full border border-white/25 bg-black/30 text-white opacity-0 shadow-lg backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:right-4 sm:top-4 sm:size-10 motion-reduce:transition-none"
        aria-hidden="true"
      >
        <Maximize2 className="size-4" strokeWidth={1.8} />
      </span>
    </>
  );

  if (isClone) {
    return (
      <div
        className="gallery-collage-item group"
        style={placement}
        onClick={() => onOpen(itemIndex)}
        aria-hidden="true"
      >
        {thumbnail}
      </div>
    );
  }

  return (
    <button
      type="button"
      className="gallery-collage-item group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={placement}
      onClick={() => onOpen(itemIndex)}
      aria-label={`Otvori fotografiju ${itemIndex + 1} od ${itemsCount}`}
    >
      {thumbnail}
    </button>
  );
}

type CollageGroupProps = {
  isClone?: boolean;
  items: GalleryItem[];
  layout: CollageLayout;
  onOpen: (index: number) => void;
};

function CollageGroup({
  isClone = false,
  items,
  layout,
  onOpen,
}: CollageGroupProps) {
  const groupStyle: CSSProperties = {
    height: `${layout.height}em`,
    width: `${layout.width}em`,
  };

  return (
    <div
      className={`gallery-collage-group ${
        isClone ? "gallery-collage-clone" : ""
      }`}
      style={groupStyle}
      aria-hidden={isClone ? "true" : undefined}
    >
      {layout.placements.map((itemPlacement) => {
        const placement: CSSProperties = {
          height: `${itemPlacement.height}em`,
          left: `${itemPlacement.x}em`,
          top: `${itemPlacement.y}em`,
          width: `${itemPlacement.width}em`,
        };
        const item = items[itemPlacement.itemIndex];

        return (
          <GalleryThumbnail
            key={`${isClone ? "clone-" : ""}${item.smallSrc}`}
            item={item}
            itemIndex={itemPlacement.itemIndex}
            itemsCount={items.length}
            onOpen={onOpen}
            placement={placement}
            isClone={isClone}
          />
        );
      })}
    </div>
  );
}

type GallerySectionProps = {
  items: GalleryItem[];
};

export function GallerySection({ items }: GallerySectionProps) {
  const collageLayout = createCollageLayout(items);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const isLightboxOpen = selectedIndex !== null;
  const activeIndex = selectedIndex ?? 0;
  const selectedItem =
    selectedIndex === null ? null : items[selectedIndex];

  function openLightbox(index: number) {
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    setSelectedIndex(index);
  }

  function closeLightbox() {
    setSelectedIndex(null);
  }

  function showPrevious() {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) return null;
      return (currentIndex - 1 + items.length) % items.length;
    });
  }

  function showNext() {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) return null;
      return (currentIndex + 1) % items.length;
    });
  }

  function handleTouchStart(event: ReactTouchEvent<HTMLDivElement>) {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: ReactTouchEvent<HTMLDivElement>) {
    const touchStartX = touchStartXRef.current;
    const touchEndX = event.changedTouches[0]?.clientX;
    touchStartXRef.current = null;

    if (touchStartX === null || touchEndX === undefined) return;

    const distance = touchEndX - touchStartX;
    if (Math.abs(distance) < 48) return;

    if (distance > 0) {
      showPrevious();
    } else {
      showNext();
    }
  }

  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
        return;
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        showNext();
        return;
      }

      if (event.key !== "Tab" || !lightboxRef.current) return;

      const focusableElements = Array.from(
        lightboxRef.current.querySelectorAll<HTMLElement>(
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
  }, [isLightboxOpen]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const adjacentIndexes = [
      (selectedIndex - 1 + items.length) % items.length,
      (selectedIndex + 1) % items.length,
    ];

    adjacentIndexes.forEach((index) => {
      const image = new window.Image();
      image.src = items[index].highSrc;
    });
  }, [items, selectedIndex]);

  return (
    <section className="overflow-hidden py-16 sm:py-24">
      <Container className="mx-auto max-w-[96rem] px-4 sm:px-4 lg:px-6">
        <div id="galerija" className="section-scroll-target">
          <SectionEyebrow>Galerija</SectionEyebrow>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Detalji koji stvaraju utisak
            </h2>
            <p className="max-w-md text-sm leading-6 text-muted sm:text-right">
              Izaberite fotografiju za prikaz preko celog ekrana.
            </p>
          </div>
        </div>
      </Container>

      <div
        className="gallery-collage mt-8 sm:mt-10"
        aria-label="Pokretni kolaž Event Rent fotografija"
      >
        <div
          className="gallery-collage-track"
          style={{ animationDuration: `${collageLayout.durationSeconds}s` }}
        >
          <CollageGroup
            items={items}
            layout={collageLayout}
            onOpen={openLightbox}
          />
          <CollageGroup
            items={items}
            layout={collageLayout}
            onOpen={openLightbox}
            isClone
          />
        </div>
      </div>

      {selectedItem &&
        createPortal(
          <div
            ref={lightboxRef}
            className="fixed inset-0 z-[100] flex flex-col bg-[#17130f]/96 text-white backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={`Fotografija ${activeIndex + 1} od ${items.length}`}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeLightbox();
            }}
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4 sm:h-16 sm:px-6">
              <span className="text-xs font-semibold tracking-[0.18em] text-white/65">
                {String(activeIndex + 1).padStart(2, "0")} / {items.length}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeLightbox}
                className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-gold/70 hover:bg-gold hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold motion-reduce:transition-none"
                aria-label="Zatvori galeriju"
              >
                <X className="size-5" strokeWidth={1.7} />
              </button>
            </div>

            <div
              className="relative min-h-0 flex-1 px-12 py-3 sm:px-20 sm:py-5"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                key={selectedItem.highSrc}
                src={selectedItem.highSrc}
                alt={selectedItem.alt}
                fill
                sizes="100vw"
                quality={90}
                className="object-contain px-12 py-3 sm:px-20 sm:py-5"
                priority
              />

              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/25 text-white backdrop-blur-md transition hover:border-gold/70 hover:bg-gold hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:left-5 sm:size-12 motion-reduce:transition-none"
                aria-label="Prethodna fotografija"
              >
                <ChevronLeft className="size-5 sm:size-6" strokeWidth={1.7} />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute right-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/25 text-white backdrop-blur-md transition hover:border-gold/70 hover:bg-gold hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:right-5 sm:size-12 motion-reduce:transition-none"
                aria-label="Sledeća fotografija"
              >
                <ChevronRight className="size-5 sm:size-6" strokeWidth={1.7} />
              </button>
            </div>

            <div className="shrink-0 border-t border-white/10 bg-black/15 px-3 py-3 sm:px-5">
              <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {items.map((item, index) => (
                  <button
                    key={`lightbox-${item.smallSrc}`}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className={`relative h-12 w-16 shrink-0 overflow-hidden border transition sm:h-14 sm:w-[4.5rem] motion-reduce:transition-none ${
                      index === selectedIndex
                        ? "border-gold opacity-100"
                        : "border-white/10 opacity-50 hover:opacity-90"
                    }`}
                    aria-label={`Prikaži fotografiju ${index + 1}`}
                    aria-pressed={index === selectedIndex}
                  >
                    <Image
                      src={item.smallSrc}
                      alt=""
                      fill
                      sizes="72px"
                      quality={62}
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}

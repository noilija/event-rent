"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

type GalleryImageSize = {
  width: number;
  height: number;
};

type GalleryItem = GalleryImageSize & {
  alt: string;
  objectPosition?: string;
  src: string;
};

const galleryItems: GalleryItem[] = ([
  ["2S5A6170_result_result.webp", 1200, 800],
  ["2S5A6173_result.webp", 1200, 800],
  ["2S5A6177_result.webp", 1200, 800],
  ["2S5A6180_result.webp", 1200, 800],
  ["2S5A6187_result.webp", 1200, 800],
  ["2S5A6215_result.webp", 1200, 800],
  ["2S5A6223_result.webp", 1200, 800],
  ["2S5A6249_result.webp", 1200, 800],
  ["2S5A6273_result.webp", 1200, 708],
  ["2S5A6283_result.webp", 1200, 800],
  ["2S5A6305_result.webp", 800, 1200],
  ["2S5A6307_result.webp", 1200, 800],
  ["2S5A6314_result.webp", 1200, 800],
  ["2S5A6375_result.webp", 1200, 800],
  ["2S5A6419_result.webp", 800, 1200],
  ["2S5A6437 (1)_result.webp", 800, 1200],
  ["2S5A6439_result.webp", 1200, 800],
  ["2S5A6471_result.webp", 1200, 800],
  ["2S5A6485_result.webp", 1200, 800],
  ["3 stola za convert_result.webp", 700, 525],
  ["beli barski za convert_result.webp", 700, 525],
  ["crni barski za convert_result.webp", 700, 525],
] satisfies [string, number, number][]).map(([fileName, width, height]) => ({
  src: `/gallery/${fileName}`,
  alt: "Event Rent oprema i postavka za proslavu na otvorenom",
  width,
  height,
}));

function getColumnCount(width: number) {
  if (width < 420) return 1;
  if (width < 760) return 2;
  if (width < 1180) return 3;
  return 4;
}

function distributeItems(columnCount: number) {
  const columns = Array.from({ length: columnCount }, () => ({
    heightScore: 0,
    items: [] as GalleryItem[],
  }));

  galleryItems.forEach((item) => {
    const targetColumn = columns.reduce((shortestColumn, column) =>
      column.heightScore < shortestColumn.heightScore ? column : shortestColumn
    );

    targetColumn.items.push(item);
    targetColumn.heightScore += item.height / item.width;
  });

  return columns;
}

export function GallerySection() {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [columnCount, setColumnCount] = useState(1);
  const columns = useMemo(() => distributeItems(columnCount), [columnCount]);
  const imageSizes =
    columnCount === 1
      ? "100vw"
      : columnCount === 2
      ? "50vw"
      : columnCount === 3
      ? "33vw"
      : "25vw";

  useEffect(() => {
    const gallery = galleryRef.current;

    if (!gallery) return;

    const updateColumnCount = (width: number) => {
      setColumnCount(getColumnCount(width));
    };

    updateColumnCount(gallery.clientWidth);

    const observer = new ResizeObserver(([entry]) => {
      updateColumnCount(entry.contentRect.width);
    });

    observer.observe(gallery);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="galerija" className="px-4 py-16 sm:px-4 sm:py-24 lg:px-6">
      <Container>
        <SectionEyebrow>Galerija</SectionEyebrow>
        <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
          Detalji koji stvaraju utisak
        </h2>

        <div
          ref={galleryRef}
          className="mt-10 flex items-start gap-3 sm:gap-4 lg:gap-5"
        >
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4 lg:gap-5"
              style={{
                marginTop:
                  columnCount > 1 && columnIndex % 2 === 1
                    ? "clamp(1.25rem, 4vw, 4rem)"
                    : undefined,
              }}
            >
              {column.items.map((item) => (
                <figure
                  key={item.src}
                  className="relative overflow-hidden bg-surface shadow-[0_18px_46px_rgba(55,42,20,0.12)]"
                  style={{ aspectRatio: `${item.width} / ${item.height}` }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={imageSizes}
                    className="object-cover transition duration-500 hover:scale-[1.025]"
                    style={{ objectPosition: item.objectPosition }}
                  />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

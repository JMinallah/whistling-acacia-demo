"use client";

import { type CSSProperties, useCallback, useRef, useState } from "react";
import Image from "next/image";
import { gallery } from "@/data/property";
import { GalleryLightbox } from "./GalleryLightbox";
import { IconExpand } from "./icons";
import { TornEdge } from "./TornEdge";

const RADII = ["patch-a", "patch-b", "patch-c", "patch-b", "patch-a", "patch-c"] as const;

// One large feature patch, two stacked beside it, then a row of three.
// On phones the feature and the last patch run full width.
const LAYOUT = [
  "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto",
  "aspect-square",
  "aspect-square",
  "aspect-square",
  "aspect-square",
  "col-span-2 aspect-[2/1] md:col-span-1 md:aspect-square",
] as const;

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const tiles = useRef<(HTMLElement | null)[]>([]);
  const tileFor = useCallback((i: number) => tiles.current[i] ?? null, []);
  const onClosed = useCallback(() => setOpen(null), []);

  return (
    <section id="gallery" className="bg-paper-deep">
      <TornEdge fill="var(--paper-deep)" />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-2 sm:px-8 sm:pb-20">
        <div data-reveal className="max-w-xl">
          <h2 className="font-display text-3xl italic text-ink sm:text-4xl">
            Gallery
          </h2>
          <p className="mt-3 text-ink-soft">
            The courtyard, the veranda, the rooms and the hillside. Placeholder
            stock photography for this demo — the property&rsquo;s own photos
            go here.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {gallery.map((item, index) => (
            <figure
              key={item.id}
              data-reveal
              style={{ "--d": `${(index % 3) * 110}ms` } as CSSProperties}
              className={`${RADII[index]} ${LAYOUT[index]} shadow-patch group relative overflow-hidden`}
            >
              <button
                type="button"
                ref={(el) => {
                  tiles.current[index] = el;
                }}
                onClick={() => setOpen(index)}
                aria-haspopup="dialog"
                aria-label={`View larger: ${item.label}`}
                className={`${RADII[index]} absolute inset-0 block cursor-zoom-in overflow-hidden focus-visible:outline-offset-[-6px] focus-visible:outline-ink-on-bark`}
              >
                <Image
                  src={item.photo.src}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes={index === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
                  className="photo-warm zoom-photo object-cover"
                />
              </button>
              <span
                aria-hidden="true"
                className={`${RADII[index]} pointer-events-none absolute inset-2.5 border-[1.5px] border-dashed border-ink-on-bark/70`}
              />
              {/* Tap affordance: always visible on touch, brightens on hover. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-6 top-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink/45 text-ink-on-bark backdrop-blur-sm transition-colors group-hover:bg-ink/70"
              >
                <IconExpand className="h-4 w-4" />
              </span>
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/35 to-transparent px-5 pb-4 pt-10 text-sm font-medium text-ink-on-bark">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {open !== null && (
        <GalleryLightbox
          items={gallery}
          startIndex={open}
          tileFor={tileFor}
          onClosed={onClosed}
        />
      )}
    </section>
  );
}

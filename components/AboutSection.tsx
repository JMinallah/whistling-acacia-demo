import type { CSSProperties } from "react";
import Image from "next/image";
import { photos, property, reasons } from "@/data/property";
import { reasonIcons } from "./icons";

// Two photos sewn on like patches: a tall garden view with the breakfast
// tray stitched over its lower corner. Positioned in percentages so the same
// cluster works as a small teaser on phones and a collage on desktop.
function PhotoCluster() {
  return (
    <div className="relative aspect-[4/5] w-full">
      <div
        data-reveal
        className="patch-b shadow-patch group absolute right-0 top-0 h-[82%] w-[80%] overflow-hidden"
      >
        <Image
          src={photos.garden.src}
          alt={photos.garden.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 768px) 290px, 30vw"
          className="photo-warm zoom-photo object-cover"
        />
      </div>
      <div
        data-reveal
        style={{ "--d": "160ms" } as CSSProperties}
        className="patch-a shadow-patch absolute bottom-0 left-0 w-[54%] bg-paper p-1 sm:p-2"
      >
        <div className="patch-a relative aspect-square overflow-hidden">
          <Image
            src={photos.breakfast.src}
            alt={photos.breakfast.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 190px, 20vw"
            className="photo-warm object-cover"
          />
          <span
            aria-hidden="true"
            className="patch-a pointer-events-none absolute inset-1.5 border border-dashed border-ink-on-bark/80 sm:inset-2 sm:border-[1.5px]"
          />
        </div>
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 md:py-20">
        {/* Phones: heading beside a small photo pair, reasons full width below.
            Desktop: heading and reasons on the left, collage on the right. */}
        <div className="grid grid-cols-[1fr_7.5rem] gap-x-5 gap-y-8 [grid-template-areas:'head_photos'_'reasons_reasons'] sm:grid-cols-[1fr_10rem] md:grid-cols-[1fr_22rem] md:gap-x-16 md:gap-y-10 md:[grid-template-areas:'head_photos'_'reasons_photos'] lg:grid-cols-[1fr_24rem]">
          <div data-reveal className="self-center [grid-area:head] md:self-end">
            <h2 className="font-display text-3xl font-medium text-ink sm:text-4xl">
              Why stay here
            </h2>
            <p className="mt-3 max-w-md text-balance text-lg leading-snug text-ink-soft sm:text-xl">
              {property.aboutLead}
            </p>
          </div>

          <div className="self-center [grid-area:photos]">
            <PhotoCluster />
          </div>

          <ul className="grid gap-5 [grid-area:reasons] sm:grid-cols-3 sm:gap-6 md:grid-cols-1 md:self-start">
            {reasons.map((reason, index) => {
              const Icon = reasonIcons[reason.icon];
              return (
                <li
                  key={reason.title}
                  data-reveal
                  style={{ "--d": `${index * 100}ms` } as CSSProperties}
                  className="flex gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bark-tint text-bark-deep">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-medium text-ink">
                      {reason.title}
                    </span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-ink-soft">
                      {reason.text}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

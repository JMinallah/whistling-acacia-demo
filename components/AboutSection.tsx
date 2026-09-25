import type { CSSProperties } from "react";
import Image from "next/image";
import { photos, property } from "@/data/property";

export function AboutSection() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
          <div data-reveal>
            <h2 className="font-display text-3xl italic text-ink sm:text-4xl">
              Why stay here
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              {property.about}
            </p>
          </div>

          {/* Two photos sewn on like patches: a tall garden view, with the
              breakfast tray stitched over its lower corner. */}
          <div className="relative mx-auto w-full max-w-md pb-14 pl-10 sm:pl-16 md:max-w-none">
            <div
              data-reveal
              className="patch-b shadow-patch group relative aspect-[4/5] overflow-hidden"
            >
              <Image
                src={photos.garden.src}
                alt={photos.garden.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 440px, 85vw"
                className="photo-warm zoom-photo object-cover"
              />
            </div>

            <div
              data-reveal
              style={{ "--d": "180ms" } as CSSProperties}
              className="patch-a shadow-patch absolute bottom-0 left-0 w-[46%] bg-paper p-2"
            >
              <div className="patch-a relative aspect-square overflow-hidden">
                <Image
                  src={photos.breakfast.src}
                  alt={photos.breakfast.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 220px, 40vw"
                  className="photo-warm object-cover"
                />
                <span
                  aria-hidden="true"
                  className="patch-a pointer-events-none absolute inset-2 border-[1.5px] border-dashed border-ink-on-bark/80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

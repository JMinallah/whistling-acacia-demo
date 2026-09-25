import type { CSSProperties } from "react";
import Image from "next/image";
import { photos, property } from "@/data/property";
import { IconPin } from "./icons";
import { TornEdge } from "./TornEdge";

const stitchColor = { "--stitch-color": "var(--bark-deep)" } as CSSProperties;

export function Location() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${property.name}, ${property.addressLine}`,
  )}`;

  return (
    <section id="location" className="bg-bark-tint">
      <TornEdge fill="var(--bark-tint)" />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-2 sm:px-8 sm:pb-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div data-reveal>
            <h2 className="font-display text-3xl italic text-ink sm:text-4xl">
              Location
            </h2>
            <p className="mt-3 flex items-start gap-2 text-ink">
              <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-bark-deep" />
              <span>{property.addressLine}</span>
            </p>

            <div data-reveal="sew" className="stitch my-6" style={stitchColor} />

            <ul className="space-y-3">
              {property.nearby.map((item) => (
                <li key={item} className="text-ink-soft">
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-bark-deep px-5 py-2.5 text-sm font-semibold text-ink-on-bark transition-transform hover:scale-[1.03]"
            >
              Get directions
            </a>
          </div>

          <figure
            data-reveal
            style={{ "--d": "140ms" } as CSSProperties}
            className="patch-c shadow-patch group relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src={photos.kampalaView.src}
              alt={photos.kampalaView.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="photo-warm zoom-photo object-cover"
            />
            <span
              aria-hidden="true"
              className="patch-c pointer-events-none absolute inset-2.5 border-[1.5px] border-dashed border-ink-on-bark/70"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/35 to-transparent px-5 pb-4 pt-10 text-sm font-medium text-ink-on-bark">
              Close to the city, above its traffic
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

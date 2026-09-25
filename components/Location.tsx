import type { CSSProperties } from "react";
import { property } from "@/data/property";
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
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="font-display text-3xl italic text-ink sm:text-4xl">
              Location
            </h2>
            <p className="mt-3 flex items-start gap-2 text-ink">
              <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-bark-deep" />
              <span>{property.addressLine}</span>
            </p>

            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-bark-deep px-5 py-2.5 text-sm font-semibold text-ink-on-bark transition-transform hover:scale-[1.03]"
            >
              Get directions
            </a>
          </div>

          <div className="md:flex md:items-stretch md:gap-8">
            <div className="stitch mb-6 md:hidden" style={stitchColor} />
            <div className="stitch-v hidden md:block" style={stitchColor} />
            <ul className="space-y-3">
              {property.nearby.map((item) => (
                <li key={item} className="text-ink-soft">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

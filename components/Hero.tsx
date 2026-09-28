import type { CSSProperties } from "react";
import { property, whatsappHref } from "@/data/property";
import { IconPhone, IconWhatsapp } from "./icons";
import { HeroPatchwork } from "./HeroPatchwork";

export function Hero() {
  return (
    <section id="top" className="relative bg-bark-deep">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 pb-14 pt-24 sm:gap-10 sm:px-8 sm:pb-20 sm:pt-32 md:grid-cols-[1.1fr_1fr] md:gap-12 md:pb-24 lg:min-h-[calc(100svh-1rem)]">
        <div>
          <p className="rise text-sm font-medium tracking-wide text-ink-on-bark-soft">
            {property.area}, {property.city}
          </p>
          <h1 style={{ "--d": "80ms" } as CSSProperties} className="rise-solid mt-3 max-w-lg text-balance font-display text-4xl italic leading-[1.1] text-ink-on-bark sm:mt-4 sm:text-5xl lg:text-6xl">
            {property.tagline}
          </h1>
          <p style={{ "--d": "180ms" } as CSSProperties} className="rise-solid mt-4 max-w-md text-base leading-relaxed text-ink-on-bark-soft sm:mt-6 sm:text-lg">
            {property.intro}
          </p>

          <div style={{ "--d": "280ms" } as CSSProperties} className="rise mt-6 flex flex-wrap gap-3 sm:mt-8" data-hero-cta>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 py-3.5 text-base font-semibold text-accent-ink shadow-patch transition-transform hover:scale-[1.02] sm:flex-none sm:px-6"
            >
              <IconWhatsapp className="h-5 w-5" />
              Check availability
            </a>
            {/* Short "Call" wherever the row is tight (phones, tablet columns);
                the full number wherever it fits. Screen readers always get it. */}
            <a
              href={property.phoneHref}
              aria-label={`Call ${property.phoneDisplay}`}
              className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-line-on-bark px-5 py-3.5 text-base font-semibold text-ink-on-bark transition-colors hover:bg-bark sm:flex-none sm:px-6"
            >
              <IconPhone className="h-4 w-4" />
              <span className="sm:hidden md:inline lg:hidden">Call</span>
              <span className="hidden sm:inline md:hidden lg:inline">
                Call {property.phoneDisplay}
              </span>
            </a>
          </div>
        </div>

        <HeroPatchwork className="patch-a shadow-patch w-full" />
      </div>
    </section>
  );
}

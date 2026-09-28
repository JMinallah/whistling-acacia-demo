import type { CSSProperties } from "react";
import { property, whatsappHref } from "@/data/property";
import { IconPhone, IconWhatsapp } from "./icons";
import { HeroPatchwork } from "./HeroPatchwork";

// The tagline with its emphasis word set in Fraunces italic.
function Tagline() {
  const [before, after] = property.tagline.split(property.taglineEmphasis);
  return (
    <>
      {before}
      <em className="font-normal">{property.taglineEmphasis}</em>
      {after}
    </>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative bg-bark-deep">
      {/* Desktop: exactly one screen tall, with the copy centred against the
          patchwork. The patchwork's width is derived from the screen height so
          it can never run past the fold. Phones: a short, wide patchwork band
          under the copy, so headline, CTAs and photos share the first screen. */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-7 px-5 pb-14 pt-24 sm:px-8 sm:pb-16 sm:pt-28 md:grid-cols-[1.05fr_1fr] md:gap-12 lg:h-svh lg:min-h-[38rem] lg:max-h-[62rem] lg:pb-20 lg:pt-32">
        <div>
          <h1 className="rise-solid max-w-xl text-balance font-display text-[2.5rem] font-medium leading-[1.04] tracking-tight text-ink-on-bark sm:text-5xl lg:text-[3.75rem]">
            <Tagline />
          </h1>
          <p
            style={{ "--d": "120ms" } as CSSProperties}
            className="rise-solid mt-4 max-w-md text-base leading-relaxed text-ink-on-bark-soft sm:mt-6 sm:text-lg"
          >
            {property.intro}
          </p>

          <div
            style={{ "--d": "240ms" } as CSSProperties}
            className="rise mt-7 flex flex-wrap gap-3 sm:mt-9 sm:gap-4"
            data-hero-cta
          >
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-patch flex-1 text-base sm:flex-none"
            >
              <IconWhatsapp className="h-5 w-5" />
              Check availability
            </a>
            {/* Short "Call" wherever the row is tight (phones, tablet columns);
                the full number wherever it fits. Screen readers always get it. */}
            <a
              href={property.phoneHref}
              aria-label={`Call ${property.phoneDisplay}`}
              className="btn-patch btn-patch--paper flex-1 text-base sm:flex-none"
            >
              <IconPhone className="h-4 w-4" />
              <span className="sm:hidden md:inline lg:hidden">Call</span>
              <span className="hidden sm:inline md:hidden lg:inline">
                Call {property.phoneDisplay}
              </span>
            </a>
          </div>
        </div>

        <HeroPatchwork className="patch-a shadow-patch w-full md:justify-self-center lg:w-[min(100%,calc((100svh-14rem)*0.875))]" />
      </div>
    </section>
  );
}

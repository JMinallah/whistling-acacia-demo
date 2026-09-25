import { property } from "@/data/property";
import { IconPhone, IconWhatsapp } from "./icons";
import { HeroPlate } from "./Plates";

export function Hero() {
  const waHref = `https://wa.me/${property.whatsappNumber}?text=${encodeURIComponent(
    `Hi ${property.shortName}, I'd like to enquire about a stay.`,
  )}`;

  return (
    <section id="top" className="relative bg-bark-deep">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 md:grid-cols-[1.1fr_1fr] md:gap-12 md:pb-24">
        <div>
          <p className="text-sm font-medium tracking-wide text-ink-on-bark-soft">
            {property.area}, {property.city}
          </p>
          <h1 className="mt-4 max-w-lg font-display text-4xl italic leading-[1.1] text-ink-on-bark sm:text-5xl md:text-6xl">
            {property.tagline}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-on-bark-soft sm:text-lg">
            {property.intro}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-accent-ink shadow-patch transition-transform hover:scale-[1.02]"
            >
              <IconWhatsapp className="h-5 w-5" />
              Check availability
            </a>
            <a
              href={property.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line-on-bark px-6 py-3.5 text-base font-semibold text-ink-on-bark transition-colors hover:bg-bark"
            >
              <IconPhone className="h-4 w-4" />
              Call {property.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="patch-a shadow-patch overflow-hidden">
          <HeroPlate className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

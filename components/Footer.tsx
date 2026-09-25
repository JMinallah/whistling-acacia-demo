import type { CSSProperties } from "react";
import { property } from "@/data/property";
import { IconMail, IconPhone, IconWhatsapp } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-xl italic text-ink-on-bark">
              {property.name}
            </p>
            <p className="mt-1 max-w-xs text-sm text-ink-on-bark-soft">
              {property.addressLine}
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-ink-on-bark-soft">
            <a
              href={`https://wa.me/${property.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-ink-on-bark"
            >
              <IconWhatsapp className="h-4 w-4" />
              {property.phoneDisplay}
            </a>
            <a href={property.phoneHref} className="inline-flex items-center gap-2 hover:text-ink-on-bark">
              <IconPhone className="h-4 w-4" />
              {property.phoneDisplay}
            </a>
            <a
              href={`mailto:${property.email}`}
              className="inline-flex items-center gap-2 hover:text-ink-on-bark"
            >
              <IconMail className="h-4 w-4" />
              {property.email}
            </a>
          </div>
        </div>

        <div
          className="stitch mt-10"
          style={{ "--stitch-color": "var(--bark-tint)" } as CSSProperties}
        />

        <p className="mt-6 text-xs text-ink-on-bark-soft/70">
          © {year} {property.name}. Fictional demo property for portfolio purposes.
        </p>
      </div>
    </footer>
  );
}

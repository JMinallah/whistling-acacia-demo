"use client";

import { useEffect, useState } from "react";
import { nav, property } from "@/data/property";
import { IconClose, IconMenu, IconWhatsapp } from "./icons";

export function Header() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const waHref = `https://wa.me/${property.whatsappNumber}?text=${encodeURIComponent(
    `Hi ${property.shortName}, I'd like to enquire about a stay.`,
  )}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        condensed ? "bg-bark-deep/95 shadow-patch backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 transition-[padding] duration-300 sm:px-8 ${
          condensed ? "py-2.5" : "py-4 sm:py-5"
        }`}
      >
        <a
          href="#top"
          className="font-display text-lg italic text-ink-on-bark sm:text-xl"
        >
          {property.shortName}
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-on-bark-soft transition-colors hover:text-ink-on-bark"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.03]"
          >
            <IconWhatsapp className="h-4 w-4" />
            Enquire
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex items-center justify-center rounded-full p-2 text-ink-on-bark md:hidden"
        >
          <IconMenu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-bark-deep px-6 py-5 md:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-lg italic text-ink-on-bark">
              {property.shortName}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-full p-2 text-ink-on-bark"
            >
              <IconClose className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav className="mt-12 flex flex-col gap-6" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl italic text-ink-on-bark"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-base font-semibold text-accent-ink"
          >
            <IconWhatsapp className="h-5 w-5" />
            Enquire on WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

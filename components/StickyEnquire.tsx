"use client";

import { useEffect, useState } from "react";
import { whatsappHref } from "@/data/property";
import { IconWhatsapp } from "./icons";

// Phone-only floating WhatsApp pill. It takes over once the hero's own CTAs
// have scrolled off the top, and steps aside again when the booking section
// arrives, so there is never more than one enquiry button competing on screen.
// Desktop doesn't need it: the fixed header always carries "Enquire".
export function StickyEnquire() {
  const [pastHero, setPastHero] = useState(false);
  const [atEnquire, setAtEnquire] = useState(false);

  useEffect(() => {
    const heroCta = document.querySelector("[data-hero-cta]");
    const enquire = document.getElementById("enquire");
    if (!heroCta || !enquire) return;

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const above = entry.boundingClientRect.top < 0;
        if (entry.target === heroCta) {
          setPastHero(!entry.isIntersecting && above);
        } else {
          setAtEnquire(entry.isIntersecting || above);
        }
      }
    });
    io.observe(heroCta);
    io.observe(enquire);
    return () => io.disconnect();
  }, []);

  const shown = pastHero && !atEnquire;

  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      inert={!shown}
      data-shown={shown || undefined}
      className="sticky-enquire fixed right-4 z-40 inline-flex items-center gap-2 rounded-full bg-accent py-3 pl-4 pr-5 text-base font-semibold text-accent-ink shadow-[0_2px_4px_rgba(42,31,24,0.12),0_14px_28px_-10px_rgba(42,31,24,0.55)] md:hidden"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <IconWhatsapp className="h-5 w-5" />
      Enquire
    </a>
  );
}

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
  // Other on-screen CTAs the pill should step aside for (e.g. a room's own
  // "Enquire about this room"), marked with data-sticky-yield.
  const [yielding, setYielding] = useState(0);

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

    const inView = new Set<Element>();
    const yieldIo = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) inView.add(entry.target);
        else inView.delete(entry.target);
      }
      setYielding(inView.size);
    });
    document.querySelectorAll("[data-sticky-yield]").forEach((el) => yieldIo.observe(el));

    return () => {
      io.disconnect();
      yieldIo.disconnect();
    };
  }, []);

  const shown = pastHero && !atEnquire && yielding === 0;

  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      inert={!shown}
      data-shown={shown || undefined}
      className="sticky-enquire btn-patch fixed right-4 z-40 text-base md:hidden"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <IconWhatsapp className="h-5 w-5" />
      Enquire
    </a>
  );
}

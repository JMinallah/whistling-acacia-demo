"use client";

import { useEffect } from "react";

// One observer for the whole page: any element marked `data-reveal` gets
// `data-revealed` the first time it scrolls into view. The hidden starting
// state lives in globals.css and only applies when scripting is enabled, so
// content is never stranded invisible without JS.
export function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}

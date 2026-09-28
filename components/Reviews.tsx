"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { reviews } from "@/data/property";
import { TornEdge } from "./TornEdge";

const RADII = ["patch-b", "patch-a", "patch-c"] as const;

export function Reviews() {
  const track = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const [current, setCurrent] = useState(0);

  // Phones swipe through one review at a time; track which one is centred.
  useEffect(() => {
    const root = track.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(cards.current.indexOf(entry.target as HTMLElement));
        }
      },
      { root, threshold: 0.6 },
    );
    cards.current.forEach((card) => card && io.observe(card));
    return () => io.disconnect();
  }, []);

  const show = (i: number) =>
    cards.current[i]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });

  return (
    <section className="bg-paper">
      <TornEdge fill="var(--paper)" />
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-2 sm:px-8 sm:pb-16">
        <div data-reveal>
          <h2 className="font-display text-3xl font-medium text-ink sm:text-4xl">
            What guests say
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Sample guest impressions for demonstration. Replace with verified reviews before
            real use.
          </p>
        </div>

        {/* Phones: a swipe row with the next review peeking in.
            Tablet and up: three across. */}
        <div
          ref={track}
          className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((review, index) => (
            <figure
              key={review.quote}
              ref={(el) => {
                cards.current[index] = el;
              }}
              data-reveal
              style={{ "--d": `${index * 110}ms` } as CSSProperties}
              className={`${RADII[index % RADII.length]} shadow-patch relative flex w-[84%] shrink-0 snap-center flex-col bg-paper-deep p-5 sm:w-auto sm:p-6`}
            >
              <span
                aria-hidden="true"
                className="font-display text-5xl leading-none text-bark/40"
              >
                &ldquo;
              </span>
              <blockquote className="-mt-3 flex-1 text-ink">
                <p className="leading-relaxed">{review.quote}</p>
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-ink-soft">
                {review.name}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-2 sm:hidden">
          {reviews.map((review, i) => (
            <button
              key={review.quote}
              type="button"
              onClick={() => show(i)}
              aria-label={`Show review ${i + 1} of ${reviews.length}`}
              aria-current={i === current}
              className="flex h-6 w-6 items-center justify-center"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-5 bg-bark" : "w-2 bg-ink/20"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

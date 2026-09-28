"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { property, rooms, whatsappHref } from "@/data/property";
import { IconChevronLeft, IconChevronRight, IconWhatsapp } from "./icons";
import { TornEdge } from "./TornEdge";

const RADII = ["patch-a", "patch-b", "patch-c", "patch-b"] as const;

// Start on the most-requested room so the deck fans out on both sides.
const START = 1;

export function RoomsSection() {
  const [active, setActive] = useState(START);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pointer = useRef<number | null>(null);
  const count = rooms.length;
  const room = rooms[active];

  const go = (i: number) => setActive((i + count) % count);

  // Tabs: arrow keys move between rooms and follow focus.
  const onTabKey = (e: KeyboardEvent) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + count) % count;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  // Swipe the deck left/right.
  const onPointerDown = (e: PointerEvent) => {
    pointer.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (pointer.current === null) return;
    const dx = e.clientX - pointer.current;
    pointer.current = null;
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
  };

  return (
    <section id="rooms" className="overflow-x-clip bg-bark">
      <TornEdge fill="var(--bark)" />
      <div className="mx-auto max-w-6xl px-5 pb-14 pt-2 sm:px-8 sm:pb-16">
        <div data-reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <h2 className="font-display text-3xl font-medium text-ink-on-bark sm:text-4xl">
              Rooms
            </h2>
            <p className="mt-2 text-ink-on-bark-soft">
              Four room types, each self-contained. Rates include breakfast.
            </p>
          </div>

          {/* Price tags double as tabs: compare at a glance, jump to any room. */}
          <div
            role="tablist"
            aria-label="Room types"
            className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
          >
            {rooms.map((r, i) => (
              <button
                key={r.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`room-tab-${r.id}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="room-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={onTabKey}
                className={`room-tab tabular-nums ${i === active ? "is-active" : ""}`}
              >
                {r.short}
                <span className="opacity-70">
                  {property.currency}
                  {r.price}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* The deck: the active room faces you, neighbours fan away in 3D. */}
        <div className="relative mt-8 sm:mt-10">
          <div
            className="room-deck relative mx-auto h-[15.5rem] w-full touch-pan-y [--step:6.4rem] sm:h-[19rem] sm:[--step:9rem] md:h-[22rem] md:[--step:11.5rem]"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            {rooms.map((r, i) => {
              const offset = i - active;
              const distance = Math.abs(offset);
              return (
                <button
                  key={r.id}
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={() => setActive(i)}
                  className={`room-card ${RADII[i]} shadow-patch ${offset === 0 ? "is-active" : ""}`}
                  style={
                    {
                      "--offset": offset,
                      "--distance": distance,
                      zIndex: 10 - distance,
                    } as CSSProperties
                  }
                >
                  <Image
                    src={r.photo.src}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes="(min-width: 768px) 17rem, (min-width: 640px) 14rem, 11.5rem"
                    className="photo-warm object-cover"
                    draggable={false}
                  />
                  <span
                    aria-hidden="true"
                    className={`${RADII[i]} pointer-events-none absolute inset-2 border-[1.5px] border-dashed border-ink-on-bark/70`}
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-3 pt-8 text-left font-display text-base font-medium text-ink-on-bark">
                    {r.name}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => go(active - 1)}
            className="absolute left-0 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/40 text-ink-on-bark backdrop-blur-sm transition-colors hover:bg-ink/60 sm:left-2"
          >
            <IconChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous room</span>
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            className="absolute right-0 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/40 text-ink-on-bark backdrop-blur-sm transition-colors hover:bg-ink/60 sm:right-2"
          >
            <IconChevronRight className="h-5 w-5" />
            <span className="sr-only">Next room</span>
          </button>
        </div>

        {/* Details of the room in front. Re-keyed so each switch fades in. */}
        <div
          id="room-panel"
          role="tabpanel"
          aria-labelledby={`room-tab-${room.id}`}
          data-sticky-yield
          className="patch-b shadow-patch mx-auto mt-8 max-w-2xl bg-paper p-5 sm:p-7"
        >
          <div key={room.id} className="swap-in">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl font-medium text-ink">{room.name}</h3>
              <p className="tabular-nums whitespace-nowrap font-display text-2xl font-medium text-ink">
                {property.currency}
                {room.price}
                <span className="font-sans text-sm font-normal text-ink-soft">/night</span>
              </p>
            </div>
            <p className="mt-1 text-sm text-ink-soft">
              {room.bed} · {room.occupancy}
            </p>
            <p className="mt-3 leading-relaxed text-ink-soft">{room.description}</p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <ul className="flex flex-wrap gap-2">
                {room.features.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink-soft"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappHref(
                  `Hi ${property.shortName}, I'd like to enquire about the ${room.name}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-patch btn-patch--sm"
              >
                <IconWhatsapp className="h-4 w-4" />
                Enquire about this room
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

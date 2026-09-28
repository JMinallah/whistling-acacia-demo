"use client";

import {
  type CSSProperties,
  type PointerEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import type { Photo } from "@/data/property";
import { IconChevronLeft, IconChevronRight, IconClose } from "./icons";

export type LightboxItem = { id: string; label: string; photo: Photo };

type Props = {
  items: readonly LightboxItem[];
  startIndex: number;
  // The tile each photo lives in, so opening and closing can grow out of /
  // settle back into its patch.
  tileFor: (index: number) => HTMLElement | null;
  onClosed: () => void;
};

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const TILE_RADIUS = 22;
const FRAME_RADIUS = 14;

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Keyframes that make the full-size frame look exactly like the tile: scale
// it uniformly until it covers the tile, move it onto the tile, and clip it
// to the tile's crop. Clipping (not stretching) keeps the photo undistorted
// while its aspect ratio changes from the square-ish tile to the full image.
function tileKeyframes(frame: HTMLElement, tile: HTMLElement): Keyframe[] {
  const f = frame.getBoundingClientRect();
  const t = tile.getBoundingClientRect();
  const s = Math.max(t.width / f.width, t.height / f.height);
  const dx = t.left + t.width / 2 - (f.left + f.width / 2);
  const dy = t.top + t.height / 2 - (f.top + f.height / 2);
  const ix = (f.width - t.width / s) / 2;
  const iy = (f.height - t.height / s) / 2;
  return [
    {
      transform: `translate(${dx}px, ${dy}px) scale(${s})`,
      clipPath: `inset(${iy}px ${ix}px round ${TILE_RADIUS / s}px)`,
    },
    {
      transform: "translate(0px, 0px) scale(1)",
      clipPath: `inset(0px 0px round ${FRAME_RADIUS}px)`,
    },
  ];
}

function onScreen(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight;
}

export function GalleryLightbox({ items, startIndex, tileFor, onClosed }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  const pointer = useRef<{ x: number; y: number } | null>(null);

  const [index, setIndex] = useState(startIndex);
  // Which way the photo slides in when paging; 0 on first open.
  const [direction, setDirection] = useState(0);

  const count = items.length;
  const item = items[index];

  // Open: into the top layer, lock page scroll, grow out of the tile.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const frame = frameRef.current;
    if (!dialog || !frame) return;

    dialog.showModal();
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const tile = tileFor(startIndex);
    const quiet = reducedMotion();
    const fade = [{ opacity: 0 }, { opacity: 1 }];
    backdropRef.current?.animate(fade, { duration: 320, easing: "ease-out" });
    chromeRef.current?.animate(fade, {
      duration: 260,
      delay: quiet ? 0 : 220,
      easing: "ease-out",
      fill: "backwards",
    });
    if (tile && !quiet) {
      frame.animate(tileKeyframes(frame, tile), { duration: 560, easing: EASE });
    } else {
      frame.animate(fade, { duration: 220 });
    }

    return () => {
      html.style.overflow = prevOverflow;
    };
    // Runs once per opening; paging is handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close: settle back into whichever tile is showing now, then leave.
  const close = useCallback(async () => {
    if (closing.current) return;
    closing.current = true;
    const frame = frameRef.current;
    const tile = tileFor(index);
    const quiet = reducedMotion();
    const out = { duration: quiet ? 1 : 420, easing: EASE, fill: "forwards" as const };

    const fadeOut = [{ opacity: 1 }, { opacity: 0 }];
    backdropRef.current?.animate(fadeOut, out);
    chromeRef.current?.animate(fadeOut, { ...out, duration: quiet ? 1 : 160 });
    const move =
      frame && tile && !quiet && onScreen(tile)
        ? frame.animate(tileKeyframes(frame, tile).reverse(), out)
        : frame?.animate(fadeOut, out);
    await move?.finished.catch(() => {});

    dialogRef.current?.close();
    onClosed();
  }, [index, tileFor, onClosed]);

  const go = useCallback(
    (step: number) => {
      setDirection(step);
      setIndex((i) => (i + step + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const dialog = dialogRef.current;
    dialog?.addEventListener("keydown", onKey);
    return () => dialog?.removeEventListener("keydown", onKey);
  }, [go]);

  // Swipe left/right to page, swipe down to dismiss.
  const onPointerDown = (e: PointerEvent) => {
    pointer.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: PointerEvent) => {
    const start = pointer.current;
    pointer.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    else if (dy > 90 && dy > Math.abs(dx)) close();
  };

  const { width, height } = item.photo.src;
  const neighbours = [items[(index + 1) % count], items[(index - 1 + count) % count]];

  return (
    <dialog
      ref={dialogRef}
      aria-label="Photo gallery"
      className="lightbox"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-ink/95"
        onClick={close}
        aria-hidden="true"
      />

      <div className="pointer-events-none relative flex h-full flex-col">
        <div
          ref={chromeRef}
          className="pointer-events-auto flex items-center justify-between px-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6"
        >
          <p className="tabular-nums text-sm font-medium text-ink-on-bark-soft" aria-live="polite">
            {index + 1} / {count}
          </p>
          <button
            type="button"
            onClick={close}
            autoFocus
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-on-bark transition-colors hover:bg-ink-on-bark/10"
          >
            <IconClose className="h-6 w-6" />
            <span className="sr-only">Close gallery</span>
          </button>
        </div>

        <div
          className="flex min-h-0 flex-1 items-center justify-center px-3 sm:px-6"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <div
            ref={frameRef}
            className="pointer-events-auto relative touch-none overflow-hidden rounded-[14px] bg-bark-deep"
            style={{
              aspectRatio: `${width} / ${height}`,
              width: `min(100%, calc((100dvh - 10.5rem) * ${width / height}))`,
            }}
          >
            <Image
              key={item.id}
              src={item.photo.src}
              alt={item.photo.alt}
              fill
              placeholder="blur"
              loading="eager"
              sizes="94vw"
              draggable={false}
              className={`${direction ? "lightbox-photo" : ""} photo-warm select-none object-cover`}
              style={{ "--from": `${direction * 32}px` } as CSSProperties}
            />
          </div>
        </div>

        <div
          className="pointer-events-auto flex items-center gap-3 px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-6"
        >
          <button
            type="button"
            onClick={() => go(-1)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-on-bark/25 text-ink-on-bark transition-colors hover:bg-ink-on-bark/10"
          >
            <IconChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous photo</span>
          </button>
          <div className="min-w-0 flex-1 text-center">
            <p className="truncate font-display text-lg italic text-ink-on-bark">{item.label}</p>
            <p className="truncate text-xs text-ink-on-bark-soft/80">
              Placeholder photo · {item.photo.credit}
            </p>
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-on-bark/25 text-ink-on-bark transition-colors hover:bg-ink-on-bark/10"
          >
            <IconChevronRight className="h-5 w-5" />
            <span className="sr-only">Next photo</span>
          </button>
        </div>
      </div>

      {/* Warm the neighbours so paging never waits on the network. */}
      <div hidden>
        {neighbours.map((n) => (
          <Image key={n.id} src={n.photo.src} alt="" loading="eager" sizes="94vw" />
        ))}
      </div>
    </dialog>
  );
}

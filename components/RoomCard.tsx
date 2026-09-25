import type { CSSProperties } from "react";
import Image from "next/image";
import { property, type Room } from "@/data/property";
import { IconWhatsapp } from "./icons";

const RADII = ["patch-a", "patch-b", "patch-c"] as const;

// Hand-cut lower edges for the room photos, so no two cards share a seam.
const CUTS = [
  "polygon(0 0, 100% 0, 100% 91%, 76% 97%, 49% 92%, 22% 100%, 0 94%)",
  "polygon(0 0, 100% 0, 100% 96%, 71% 91%, 44% 99%, 18% 93%, 0 98%)",
  "polygon(0 0, 100% 0, 100% 93%, 81% 100%, 57% 94%, 29% 98%, 0 92%)",
] as const;

export function RoomCard({ room, index }: { room: Room; index: number }) {
  const waHref = `https://wa.me/${property.whatsappNumber}?text=${encodeURIComponent(
    `Hi ${property.shortName}, I'd like to enquire about the ${room.name}.`,
  )}`;
  const radius = RADII[index % RADII.length];

  return (
    <article
      data-reveal
      style={{ "--d": `${(index % 2) * 120}ms` } as CSSProperties}
      className={`${radius} shadow-patch group flex flex-col overflow-hidden bg-paper hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(42,31,24,0.08),0_22px_36px_-16px_rgba(42,31,24,0.4)]`}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{ clipPath: CUTS[index % CUTS.length] }}
      >
        <Image
          src={room.photo.src}
          alt={room.photo.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 1152px) 540px, (min-width: 640px) 50vw, 100vw"
          className="photo-warm zoom-photo object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl italic text-ink">{room.name}</h3>
          <p className="tabular-nums whitespace-nowrap font-display text-xl text-ink">
            {property.currency}
            {room.price}
            <span className="text-sm font-sans not-italic text-ink-soft">/night</span>
          </p>
        </div>

        <p className="mt-1 text-sm text-ink-soft">
          {room.bed} · {room.occupancy}
        </p>

        <div
          className="stitch my-4"
          style={{ "--stitch-color": "var(--line)" } as CSSProperties}
        />

        <p className="text-sm leading-relaxed text-ink-soft">{room.description}</p>

        <ul className="mb-6 mt-4 flex flex-wrap gap-2">
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
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 self-start rounded-full bg-bark px-5 py-2.5 text-sm font-semibold text-ink-on-bark transition-transform hover:scale-[1.03]"
        >
          <IconWhatsapp className="h-4 w-4" />
          Enquire about this room
        </a>
      </div>
    </article>
  );
}

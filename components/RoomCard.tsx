import type { CSSProperties } from "react";
import { property, type Room } from "@/data/property";
import { IconWhatsapp } from "./icons";

const RADII = ["patch-a", "patch-b", "patch-c"] as const;

export function RoomCard({ room, index }: { room: Room; index: number }) {
  const waHref = `https://wa.me/${property.whatsappNumber}?text=${encodeURIComponent(
    `Hi ${property.shortName}, I'd like to enquire about the ${room.name}.`,
  )}`;
  const radius = RADII[index % RADII.length];

  return (
    <article className={`${radius} shadow-patch flex flex-col bg-paper p-6`}>
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

      <ul className="mt-4 flex flex-wrap gap-2">
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
        className="mt-6 inline-flex items-center justify-center gap-2 self-start rounded-full bg-bark px-5 py-2.5 text-sm font-semibold text-ink-on-bark transition-transform hover:scale-[1.03]"
      >
        <IconWhatsapp className="h-4 w-4" />
        Enquire about this room
      </a>
    </article>
  );
}

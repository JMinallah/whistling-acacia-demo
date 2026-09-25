import { amenities } from "@/data/property";
import { amenityIcons } from "./icons";
import { TornEdge } from "./TornEdge";

export function Amenities() {
  return (
    <section id="amenities" className="bg-paper">
      <TornEdge fill="var(--paper)" />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-2 sm:px-8 sm:pb-20">
        <h2 className="font-display text-3xl italic text-ink sm:text-4xl">
          Amenities
        </h2>

        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
          {amenities.map((amenity) => {
            const Icon = amenityIcons[amenity.icon];
            return (
              <li key={amenity.id} className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bark-tint text-bark-deep">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-ink">{amenity.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

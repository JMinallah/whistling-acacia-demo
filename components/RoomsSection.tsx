import { rooms } from "@/data/property";
import { RoomCard } from "./RoomCard";
import { TornEdge } from "./TornEdge";

export function RoomsSection() {
  return (
    <section id="rooms" className="bg-bark">
      <TornEdge fill="var(--bark)" />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-2 sm:px-8 sm:pb-20">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl italic text-ink-on-bark sm:text-4xl">
            Rooms
          </h2>
          <p className="mt-3 text-ink-on-bark-soft">
            Four room types, each self-contained. Rates include breakfast — enquire
            directly for current availability.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {rooms.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

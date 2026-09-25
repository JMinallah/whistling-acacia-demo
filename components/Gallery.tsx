import { galleryPlates } from "@/data/property";
import { GalleryPlate } from "./Plates";
import { TornEdge } from "./TornEdge";

const MOTIFS = ["garden", "veranda", "bed", "hills"] as const;
const RADII = ["patch-a", "patch-b", "patch-c", "patch-b"] as const;

export function Gallery() {
  return (
    <section id="gallery" className="bg-paper-deep">
      <TornEdge fill="var(--paper-deep)" />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-2 sm:px-8 sm:pb-20">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl italic text-ink sm:text-4xl">
            Gallery
          </h2>
          <p className="mt-3 text-ink-soft">
            Property photography is in progress — shown here as an illustrated
            preview of the courtyard, veranda, rooms and hillside setting.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {galleryPlates.map((plate, index) => (
            <figure key={plate.id} className={`${RADII[index]} shadow-patch overflow-hidden`}>
              <GalleryPlate motif={MOTIFS[index]} className="aspect-square w-full" />
              <figcaption className="bg-bark-deep px-3 py-2 text-xs font-medium text-ink-on-bark-soft">
                {plate.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

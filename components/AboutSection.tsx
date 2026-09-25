import { property } from "@/data/property";

export function AboutSection() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr] md:gap-16">
          <h2 className="font-display text-3xl italic text-ink sm:text-4xl md:max-w-xs">
            Why stay here
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
            {property.about}
          </p>
        </div>
      </div>
    </section>
  );
}

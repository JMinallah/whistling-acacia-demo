import { reviews } from "@/data/property";
import { TornEdge } from "./TornEdge";

const RADII = ["patch-b", "patch-a", "patch-c"] as const;

export function Reviews() {
  return (
    <section className="bg-paper">
      <TornEdge fill="var(--paper)" />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-2 sm:px-8 sm:pb-20">
        <h2 className="font-display text-3xl italic text-ink sm:text-4xl">
          What guests say
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          Sample guest impressions for demonstration — replace with verified reviews
          before real use.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {reviews.map((review, index) => (
            <figure
              key={review.quote}
              className={`${RADII[index % RADII.length]} shadow-patch bg-paper-deep p-6`}
            >
              <blockquote className="text-ink">
                <p className="leading-relaxed">&ldquo;{review.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-ink-soft">
                {review.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

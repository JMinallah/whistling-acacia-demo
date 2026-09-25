import { quickFacts } from "@/data/property";
import { TornEdge } from "./TornEdge";

export function QuickFacts() {
  return (
    <section className="bg-paper">
      <TornEdge fill="var(--paper)" />
      <div className="mx-auto max-w-6xl px-5 pb-14 pt-2 sm:px-8">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {quickFacts.map((fact) => (
            <div key={fact.label} className="border-t-2 border-bark pt-3">
              <dt className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                {fact.label}
              </dt>
              <dd className="mt-1 font-display text-xl text-ink sm:text-2xl">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

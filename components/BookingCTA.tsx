"use client";

import { useMemo, useState } from "react";
import { property } from "@/data/property";
import { IconMail, IconPhone, IconWhatsapp } from "./icons";
import { TornEdge } from "./TornEdge";

export function BookingCTA() {
  const [name, setName] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");
  const [message, setMessage] = useState("");

  const waHref = useMemo(() => {
    const lines = [
      `Hi ${property.shortName}, I'd like to enquire about a stay.`,
      name && `Name: ${name}`,
      dates && `Dates: ${dates}`,
      guests && `Guests: ${guests}`,
      message && `Message: ${message}`,
    ].filter(Boolean);
    return `https://wa.me/${property.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [name, dates, guests, message]);

  return (
    <section className="bg-bark-deep">
      <TornEdge fill="var(--bark-deep)" />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-2 sm:px-8 sm:pb-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <div>
            <h2 className="font-display text-3xl italic text-ink-on-bark sm:text-4xl">
              Ready when you are
            </h2>
            <p className="mt-3 max-w-sm text-ink-on-bark-soft">
              No booking system to fight with — enquiries go straight to a person, by
              WhatsApp, call, or email.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={`https://wa.me/${property.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-ink-on-bark"
              >
                <IconWhatsapp className="h-4 w-4 shrink-0" />
                {property.phoneDisplay}
              </a>
              <a href={property.phoneHref} className="inline-flex items-center gap-2 text-ink-on-bark">
                <IconPhone className="h-4 w-4 shrink-0" />
                {property.phoneDisplay}
              </a>
              <a href={`mailto:${property.email}`} className="inline-flex items-center gap-2 text-ink-on-bark">
                <IconMail className="h-4 w-4 shrink-0" />
                {property.email}
              </a>
            </div>
          </div>

          <form
            className="patch-a shadow-patch bg-paper p-6 sm:p-8"
            onSubmit={(event) => {
              event.preventDefault();
              window.open(waHref, "_blank", "noopener,noreferrer");
            }}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
                Name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl border border-line bg-paper px-3.5 py-2.5 text-base text-ink outline-none focus:border-accent"
                  placeholder="Your name"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
                Guests
                <input
                  type="text"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="rounded-xl border border-line bg-paper px-3.5 py-2.5 text-base text-ink outline-none focus:border-accent"
                  placeholder="e.g. 2 adults"
                />
              </label>
            </div>

            <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium text-ink">
              Dates
              <input
                type="text"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="rounded-xl border border-line bg-paper px-3.5 py-2.5 text-base text-ink outline-none focus:border-accent"
                placeholder="e.g. 12–15 Nov"
              />
            </label>

            <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium text-ink">
              Message
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="resize-none rounded-xl border border-line bg-paper px-3.5 py-2.5 text-base text-ink outline-none focus:border-accent"
                placeholder="Anything else we should know?"
              />
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-accent-ink transition-transform hover:scale-[1.01] sm:w-auto"
            >
              <IconWhatsapp className="h-5 w-5" />
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

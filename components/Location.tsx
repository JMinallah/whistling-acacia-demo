"use client";

import { useState } from "react";
import { property } from "@/data/property";
import { IconPin } from "./icons";
import { TornEdge } from "./TornEdge";

type PlaceId = (typeof property.nearby)[number]["id"];

// Illustrative map, drawn in the site's stitched-cloth language rather than
// an embedded map: the address is fictional, so a real map would pin a real
// stranger's plot. Routes are running stitches from the guesthouse.
const HOME = { x: 300, y: 150 };

const ROUTES: Record<PlaceId, { d: string; end: { x: number; y: number }; tag: { x: number; y: number } }> = {
  city: {
    d: "M300 150 C262 192 200 204 146 232",
    end: { x: 146, y: 232 },
    tag: { x: 206, y: 224 },
  },
  viewpoint: {
    d: "M300 150 C318 132 336 114 362 96",
    end: { x: 362, y: 96 },
    tag: { x: 420, y: 122 },
  },
  entebbe: {
    d: "M300 150 C262 192 200 204 146 232 C112 256 88 292 62 336",
    end: { x: 62, y: 336 },
    tag: { x: 150, y: 300 },
  },
};

function MapArt({ active }: { active: PlaceId | null }) {
  const state = (id: PlaceId) => (active === null ? "" : active === id ? "is-on" : "is-off");

  return (
    <svg viewBox="0 0 480 360" className="block h-full w-full" role="img" aria-labelledby="map-title">
      <title id="map-title">
        Illustrative map: the guesthouse on Naguru hill, with routes to central Kampala,
        the hill viewpoint and Entebbe Road
      </title>

      {/* Naguru hill: contour lines around the guesthouse. */}
      <g fill="none" stroke="var(--line)" strokeWidth={1.4}>
        <ellipse cx="318" cy="132" rx="118" ry="78" strokeDasharray="1 6" strokeLinecap="round" />
        <ellipse cx="322" cy="128" rx="84" ry="54" />
        <ellipse cx="328" cy="122" rx="52" ry="32" />
        <ellipse cx="334" cy="116" rx="24" ry="14" />
      </g>
      <text x="466" y="228" textAnchor="end" className="map-label" fill="var(--ink-soft)">Naguru hill</text>

      {/* Central Kampala: a cluster of blocks. */}
      <g fill="var(--bark-tint)" stroke="var(--bark)" strokeWidth={1}>
        <rect x="112" y="214" width="18" height="18" rx="2" />
        <rect x="134" y="206" width="14" height="26" rx="2" />
        <rect x="152" y="220" width="20" height="14" rx="2" />
        <rect x="120" y="236" width="24" height="12" rx="2" />
        <rect x="148" y="238" width="14" height="14" rx="2" />
      </g>

      {/* Entebbe Road, heading south-west off the map. */}
      <path d="M146 232 C112 256 88 292 62 336 L48 360" fill="none" stroke="var(--line)" strokeWidth={9} strokeLinecap="round" />

      {/* Viewpoint marker. */}
      <path d="M362 84 l9 14 h-18Z" fill="var(--bark-deep)" />

      {/* Routes: running stitches, lit when their place is chosen. */}
      {(Object.keys(ROUTES) as PlaceId[]).map((id) => (
        <path key={id} d={ROUTES[id].d} className={`map-route ${state(id)}`} />
      ))}

      {/* Place labels and journey tags. */}
      {property.nearby.map((place) => {
        const r = ROUTES[place.id];
        return (
          <g key={place.id} className={`map-place ${state(place.id)}`}>
            <circle cx={r.end.x} cy={r.end.y} r={4} fill="var(--bark-deep)" />
            <g transform={`translate(${r.tag.x} ${r.tag.y})`}>
              <rect x={-44} y={-15} width={88} height={29} rx={14.5} className="map-tag" />
              <text y={5} textAnchor="middle" className="map-tag-text">
                {place.time}
              </text>
            </g>
          </g>
        );
      })}
      <text x="20" y="196" className="map-label" fill="var(--ink-soft)">Central Kampala</text>
      <text x="346" y="80" textAnchor="end" className="map-label" fill="var(--ink-soft)">Viewpoint</text>
      <text x="84" y="348" className="map-label" fill="var(--ink-soft)">Entebbe Rd</text>

      {/* The guesthouse. */}
      <g transform={`translate(${HOME.x} ${HOME.y})`}>
        <circle r="16" fill="var(--accent)" opacity="0.25" className="map-pulse" />
        <path d="M0 6 C-8 -2 -10 -6 -10 -11 a10 10 0 0 1 20 0 c0 5 -2 9 -10 17Z" fill="var(--bark-deep)" transform="translate(0 -6)" />
        <circle cy="-17" r="3.6" fill="var(--accent)" />
      </g>
      <text x={HOME.x + 13} y={HOME.y + 6} className="map-label map-label--home" fill="var(--ink)">
        Whistling Acacia
      </text>

      <text x="466" y="22" textAnchor="end" className="map-note" fill="var(--ink-soft)">
        Illustrative · not to scale
      </text>
    </svg>
  );
}

export function Location() {
  const [active, setActive] = useState<PlaceId | null>(null);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${property.name}, ${property.addressLine}`,
  )}`;

  return (
    <section id="location" className="bg-bark-tint">
      <TornEdge fill="var(--bark-tint)" />
      <div className="mx-auto max-w-6xl px-5 pb-14 pt-2 sm:px-8 sm:pb-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-14">
          <div data-reveal>
            <h2 className="font-display text-3xl font-medium text-ink sm:text-4xl">Location</h2>
            <p className="mt-3 flex items-start gap-2 text-ink">
              <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-bark-deep" />
              <span>{property.addressLine}</span>
            </p>

            {/* Each place lights its route on the map. */}
            <ul className="mt-6 divide-y divide-dashed divide-bark/35 border-y border-dashed border-bark/35">
              {property.nearby.map((place) => (
                <li key={place.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(place.id)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(place.id)}
                    onBlur={() => setActive(null)}
                    onClick={() => setActive(place.id)}
                    aria-pressed={active === place.id}
                    className="flex w-full items-baseline justify-between gap-4 py-3 text-left transition-colors hover:text-bark-deep"
                  >
                    <span className="font-medium text-ink">{place.place}</span>
                    <span className="tabular-nums whitespace-nowrap text-sm text-ink-soft">
                      {place.time} {place.mode}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-patch btn-patch--paper btn-patch--sm mt-7"
            >
              Get directions
            </a>
          </div>

          <div
            data-reveal
            className="patch-c shadow-patch relative aspect-[4/3] overflow-hidden bg-paper"
          >
            <MapArt active={active} />
            <span
              aria-hidden="true"
              className="patch-c pointer-events-none absolute inset-2.5 border-[1.5px] border-dashed border-bark/40"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

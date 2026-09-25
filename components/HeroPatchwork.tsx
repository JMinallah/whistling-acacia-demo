import type { CSSProperties } from "react";
import Image from "next/image";
import { photos, type Photo } from "@/data/property";

// The hero's stitched barkcloth patchwork. Each patch is a polygon on a
// 420×480 grid; each holds a photo clipped to its hand-cut outline, while
// the thin tinted seams between them stay bare cloth.

const W = 420;
const H = 480;

type Patch = {
  points: [number, number][];
  fill: string;
  photo?: Photo;
  // The largest patches — the page's LCP candidates — fetch first.
  priority?: boolean;
  // Direction the patch drifts in from while being "laid down".
  from: [number, number];
};

const PATCHES: Patch[] = [
  { points: [[0, 0], [230, 0], [190, 150], [0, 190]], fill: "#a6462b", photo: photos.courtyard, priority: true, from: [-18, -14] },
  { points: [[230, 0], [420, 0], [420, 110], [260, 150]], fill: "#a6462b", photo: photos.acaciaDusk, from: [18, -16] },
  { points: [[0, 190], [190, 150], [230, 330], [0, 360]], fill: "#c69a3b", photo: photos.roomDouble, priority: true, from: [-20, 4] },
  { points: [[260, 150], [420, 110], [420, 300], [240, 330]], fill: "#a6462b", photo: photos.veranda, priority: true, from: [20, 0] },
  { points: [[0, 360], [230, 330], [210, 480], [0, 480]], fill: "#732e1c", photo: photos.kampalaView, from: [-16, 16] },
  { points: [[230, 330], [240, 330], [260, 480], [210, 480]], fill: "#e4b79b", from: [0, 18] },
  { points: [[260, 330], [420, 300], [420, 480], [260, 480]], fill: "#c69a3b", photo: photos.breakfast, from: [18, 16] },
];

const STITCHES: { d: string; color: string }[] = [
  { d: "M0,190 190,150 230,330", color: "#f7ecdc" },
  { d: "M230,0 190,150 260,150 240,330", color: "#f7ecdc" },
  { d: "M260,150 420,110", color: "#f7ecdc" },
  { d: "M0,360 230,330 260,480", color: "#f7ecdc" },
  { d: "M260,330 420,300", color: "#f7ecdc" },
];

const PATCH_STAGGER = 110;
const SEW_START = PATCH_STAGGER * PATCHES.length + 250;

function box(points: [number, number][]) {
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  return { x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y };
}

const pct = (n: number) => `${+(n * 100).toFixed(3)}%`;

export function HeroPatchwork({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative aspect-[420/480] overflow-hidden bg-bark-tint ${className}`}
      role="img"
      aria-label="A stitched patchwork of the guesthouse: the courtyard, an acacia at dusk, a garden room, the breakfast veranda, breakfast itself and the view toward the city"
    >
      {PATCHES.map((patch, i) => {
        const b = box(patch.points);
        const clip = `polygon(${patch.points
          .map(([x, y]) => `${pct((x - b.x) / b.w)} ${pct((y - b.y) / b.h)}`)
          .join(", ")})`;
        return (
          <div
            key={i}
            className="patch-in absolute overflow-hidden"
            style={
              {
                left: pct(b.x / W),
                top: pct(b.y / H),
                width: pct(b.w / W),
                height: pct(b.h / H),
                clipPath: clip,
                background: patch.fill,
                "--d": `${i * PATCH_STAGGER}ms`,
                "--dx": `${patch.from[0]}px`,
                "--dy": `${patch.from[1]}px`,
              } as CSSProperties
            }
          >
            {patch.photo && (
              <Image
                src={patch.photo.src}
                alt=""
                fill
                placeholder="blur"
                loading="eager"
                fetchPriority={patch.priority ? "high" : "auto"}
                sizes="(min-width: 768px) 30vw, 70vw"
                className="photo-warm settle object-cover"
                style={{ "--d": `${i * PATCH_STAGGER}ms` } as CSSProperties}
              />
            )}
          </div>
        );
      })}

      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          {STITCHES.map((s, i) => (
            <mask key={i} id={`hero-sew-${i}`} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
              <path
                d={s.d}
                pathLength={1}
                stroke="#fff"
                strokeWidth={8}
                fill="none"
                className="sew"
                style={{ "--d": `${SEW_START + i * 160}ms` } as CSSProperties}
              />
            </mask>
          ))}
        </defs>
        {STITCHES.map((s, i) => (
          <path
            key={i}
            d={s.d}
            mask={`url(#hero-sew-${i})`}
            stroke={s.color}
            strokeWidth={1.6}
            strokeDasharray="2 5"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}

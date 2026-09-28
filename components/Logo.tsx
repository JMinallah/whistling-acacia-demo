import { property } from "@/data/property";

// The Acacia seal: a flat-topped acacia inside a running-stitch ring.
export function AcaciaSeal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 54" className={className} aria-hidden="true">
      <circle
        cx="27"
        cy="27"
        r="25"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeDasharray="3 4"
      />
      <g transform="translate(9 11) scale(0.5625 0.5769)" className="text-accent">
        <path
          d="M5 19.5c3-6 13-8.5 27-8.5s24 2.5 27 8.5c-4 2.6-10 1.6-14 .6-4 2.4-9 2.2-13 .2-4 2-9 2.2-13-.2-4 1-10 2-14-.6Z"
          fill="currentColor"
        />
        <path
          d="M32 21v10.5l-3.5 13M31.6 27.5 37 21.5M31.4 25 25.5 21"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M17 45.5h30"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeDasharray="2.5 3.5"
          fill="none"
        />
      </g>
    </svg>
  );
}

type LogoProps = {
  // "row": seal beside the name (phone header, footer).
  // "crest": seal above the name, centred (desktop nav).
  layout?: "row" | "crest";
  // Crest only: smaller seal and no tagline, for the slimmed scrolled bar.
  compact?: boolean;
  className?: string;
};

export function Logo({ layout = "row", compact = false, className = "" }: LogoProps) {
  if (layout === "crest") {
    return (
      <span className={`flex flex-col items-center gap-1 ${className}`}>
        <AcaciaSeal
          className={`transition-[width,height] duration-500 ${compact ? "h-7 w-7" : "h-9 w-9"}`}
        />
        <span className="font-display text-xl font-semibold leading-none tracking-tight">
          {property.shortName}
        </span>
        {!compact && (
          <span className="text-[9px] font-semibold uppercase leading-none tracking-[0.28em] opacity-70">
            Guesthouse · {property.city}
          </span>
        )}
      </span>
    );
  }

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <AcaciaSeal className="h-10 w-10 shrink-0" />
      <span className="flex flex-col gap-1">
        <span className="font-display text-lg font-semibold leading-none tracking-tight">
          {property.shortName}
        </span>
        <span className="text-[9px] font-semibold uppercase leading-none tracking-[0.26em] opacity-70">
          Guesthouse · {property.city}
        </span>
      </span>
    </span>
  );
}

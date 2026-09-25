const PATH =
  "M0,20 L36,6 L74,26 L110,4 L150,22 L192,2 L236,18 L282,4 L330,24 L380,8 L432,20 L486,2 L540,16 L596,6 L654,24 L714,4 L776,18 L840,2 L906,16 L974,4 L1044,20 L1116,6 L1160,16 L1200,8 L1200,48 L0,48 Z";

// A hand-torn seam between two color bands — stands in for the straight
// section boundaries a generic template would use.
export function TornEdge({ fill, className = "" }: { fill: string; className?: string }) {
  return (
    <div
      className={`relative -mt-9 h-9 w-full overflow-hidden sm:-mt-12 sm:h-12 ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="block h-full w-full">
        <path d={PATH} fill={fill} />
      </svg>
    </div>
  );
}

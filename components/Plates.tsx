// Authored patchwork illustrations standing in for photography, since no
// property photos exist yet. Each "plate" reads as a stitched barkcloth
// composition rather than a stock photo or gradient placeholder.

type PlateProps = {
  className?: string;
};

const stitch = (
  d: string,
  color: string,
) => <path d={d} stroke={color} strokeWidth={1.4} strokeDasharray="2 5" strokeLinecap="round" fill="none" />;

export function HeroPlate({ className }: PlateProps) {
  return (
    <svg
      viewBox="0 0 420 480"
      className={className}
      role="img"
      aria-label="A patchwork illustration in warm terracotta and gold tones, evoking hand-stitched barkcloth"
    >
      <rect x="0" y="0" width="420" height="480" fill="#e4b79b" />
      <polygon points="0,0 230,0 190,150 0,190" fill="#a6462b" />
      <polygon points="230,0 420,0 420,110 260,150" fill="#732e1c" />
      <polygon points="0,190 190,150 230,330 0,360" fill="#c69a3b" />
      <polygon points="260,150 420,110 420,300 240,330" fill="#a6462b" />
      <polygon points="0,360 230,330 210,480 0,480" fill="#732e1c" />
      <polygon points="230,330 240,330 260,480 210,480" fill="#e4b79b" />
      <polygon points="260,330 420,300 420,480 260,480" fill="#c69a3b" />
      {stitch("M0,190 190,150 230,330", "#f7ecdc")}
      {stitch("M230,0 190,150 260,150 230,330", "#f7ecdc")}
      {stitch("M260,150 420,110", "#2a1f18")}
      {stitch("M0,360 230,330 260,480", "#2a1f18")}
      <g transform="translate(150,235)" stroke="#f7ecdc" strokeWidth={2} strokeLinecap="round" fill="none">
        <path d="M40 90V30" />
        <path d="M40 30C20 30 6 44 6 4c22 0 34 16 34 26Z" />
        <path d="M40 46c22 0 36-14 36-46-24 0-36 16-36 26Z" />
      </g>
    </svg>
  );
}

const MOTIFS = {
  garden: (
    <g stroke="#f7ecdc" strokeWidth={2} strokeLinecap="round" fill="none">
      <path d="M60 96V50" />
      <path d="M60 50C40 50 26 62 26 26c24 0 34 14 34 24Z" />
      <path d="M60 64c22 0 34-12 34-40-22 0-34 14-34 24Z" />
    </g>
  ),
  veranda: (
    <g stroke="#f7ecdc" strokeWidth={2} strokeLinecap="round" fill="none">
      <path d="M20 40h80" />
      <path d="M28 40v56M44 40v56M60 40v56M76 40v56M92 40v56" />
    </g>
  ),
  bed: (
    <g stroke="#f7ecdc" strokeWidth={2} strokeLinecap="round" fill="none">
      <path d="M18 92V58a8 8 0 0 1 8-8h68a8 8 0 0 1 8 8v34" />
      <path d="M18 78h84" />
      <path d="M30 70v-8a6 6 0 0 1 6-6h14a6 6 0 0 1 6 6v8" />
    </g>
  ),
  hills: (
    <g stroke="#f7ecdc" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M14 92 42 52l16 20 14-16 34 36" />
    </g>
  ),
};

export function GalleryPlate({
  motif,
  className,
}: PlateProps & { motif: keyof typeof MOTIFS }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Authored barkcloth-patchwork illustration standing in for a photograph"
    >
      <rect width="120" height="120" fill="#e4b79b" />
      <polygon points="0,0 78,0 60,58 0,70" fill="#a6462b" />
      <polygon points="78,0 120,0 120,86 66,58" fill="#732e1c" />
      <polygon points="0,70 60,58 50,120 0,120" fill="#c69a3b" />
      <polygon points="66,58 120,86 120,120 50,120" fill="#a6462b" />
      {stitch("M0,70 60,58 66,58 50,120", "#f7ecdc")}
      {stitch("M78,0 60,58", "#2a1f18")}
      {MOTIFS[motif]}
    </svg>
  );
}

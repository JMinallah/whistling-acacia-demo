# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: prospective guests researching short-stay accommodation in Kampala, Uganda (leisure and business travelers), deciding whether to contact or book a guesthouse. They're evaluating from a phone browser, comparing a handful of properties, and want to quickly judge location, room options/price, trust signals, and how to make contact.

Secondary (real-world context, not a site visitor): accommodation business owners this demo gets pitched to as sales evidence of a better online presence they could commission.

## Product Purpose

A single-page, mobile-first marketing site for a fictional guesthouse (Whistling Acacia Guesthouse, Kampala) that turns discovery into a direct enquiry — WhatsApp, phone, or a lightweight contact form. It exists as a portfolio/client-acquisition demo: proof that a small accommodation business's online presence can be faster, clearer, and more conversion-focused than a generic listing page or no website at all.

## Positioning

Most small Kampala guesthouses either have no site or a slow, generic template. This demo's mechanism is a fast, data-driven, conversion-first single page that puts location, rooms, and a WhatsApp/call CTA in front of the guest within one scroll — nothing a listing aggregator (Tripadvisor/Facebook) is built to do.

## Operating Context

Built and reviewed primarily on mobile viewports (~320–768px) since most guest research happens on phones; desktop is the secondary breakpoint. Shown directly to prospects as a demo — not deployed to a public/indexable domain at this stage.

## Capabilities and Constraints

- No guest accounts, payment processing, room-inventory engine, admin dashboard, automated availability, or booking backend — front-end experience and conversion path only.
- All content is placeholder/fictional (property name, address, contact details, room prices, amenities, reviews). See `docs/blueprint.md` → "Fictional demo business" for the full invented data set.
- Room/amenity/contact data lives in a single data/config file so the template is reusable for a real property later.
- Stack: Next.js App Router + TypeScript + Tailwind CSS, already scaffolded at the repo root (no `src/` directory).

## Brand Commitments

Property name: Whistling Acacia Guesthouse (fictional, chosen 2026-09-25 to avoid using any real business's identity). No existing logo, palette, or voice yet — visual identity is undecided and belongs to the design phase, not here.

## Evidence on Hand

No real content, testimonials, or photography exists — everything is invented placeholder data, clearly labelled as such in code/comments. None of it should be treated as verified fact if this project is ever pointed at a real client.

## Product Principles

- Mobile-first, conversion-first: every section should shorten the path to a WhatsApp/call enquiry.
- Never imply this is a real, operating business — no invented claim (rating, testimonial, award) presented as verified.
- Keep property data separate from layout/components so the same build can be re-skinned for a real client later.
- Ship one complete, polished homepage rather than a partial multi-page site — this is sales evidence, not the final product.

## Accessibility & Inclusion

Semantic HTML, keyboard-accessible navigation and buttons, visible focus states, sufficient colour contrast, meaningful alt text.

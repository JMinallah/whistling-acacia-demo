// All content in this file is fictional demo data for Whistling Acacia
// Guesthouse, a portfolio/client-acquisition demo — not a real business.
// Swap every field for verified client facts before any real deployment.

import type { StaticImageData } from "next/image";
import acaciaDusk from "@/public/images/acacia-dusk.jpg";
import breakfast from "@/public/images/breakfast.jpg";
import courtyard from "@/public/images/courtyard.jpg";
import garden from "@/public/images/garden.jpg";
import kampalaView from "@/public/images/kampala-view.jpg";
import roomDouble from "@/public/images/room-double.jpg";
import roomFamily from "@/public/images/room-family.jpg";
import roomSingle from "@/public/images/room-single.jpg";
import roomTwin from "@/public/images/room-twin.jpg";
import veranda from "@/public/images/veranda.jpg";

export const property = {
  name: "Whistling Acacia Guesthouse",
  shortName: "Whistling Acacia",
  tagline: "A quiet hillside stay above Kampala",
  intro:
    "Eight rooms around a courtyard garden on Naguru hill — a short drive from the city, far enough from it to hear the acacia trees at night.",
  about:
    "Whistling Acacia sits back from the road on a quiet stretch of Naguru hill, where the noise of downtown Kampala gives way to birdsong and the trees the guesthouse is named for. Rooms open onto a shared garden courtyard; breakfast is served under the veranda most mornings. It's built for guests who want to be close to the city without living inside its traffic.",
  area: "Naguru",
  city: "Kampala",
  country: "Uganda",
  addressLine: "Plot 24, Naguru Hill Close, Naguru, Kampala",
  nearby: [
    "12 minutes to central Kampala",
    "Short walk to Naguru hill viewpoint",
    "20 minutes to Entebbe Road",
  ],
  phoneDisplay: "+256 700 123 456",
  phoneHref: "tel:+256700123456",
  whatsappNumber: "256700123456",
  email: "hello@whistlingacacia.example",
  currency: "$",
} as const;

export const quickFacts = [
  { label: "Rooms", value: "8" },
  { label: "Neighbourhood", value: "Naguru, Kampala" },
  { label: "Breakfast", value: "Included daily" },
  { label: "Reachable by", value: "WhatsApp or phone" },
] as const;

export type Photo = {
  src: StaticImageData;
  alt: string;
  // Placeholder stock photography (Unsplash License) — not the property.
  // Replace with the client's own photos before any real use.
  credit: string;
};

export const photos = {
  courtyard: {
    src: courtyard,
    alt: "Garden chairs and a table on a shaded patio surrounded by palms",
    credit: "Brunxs / Unsplash",
  },
  veranda: {
    src: veranda,
    alt: "Breakfast laid out under a thatched veranda roof",
    credit: "Lonely Planet / Unsplash",
  },
  breakfast: {
    src: breakfast,
    alt: "A breakfast tray with pastries, fruit and orange juice on a wooden deck",
    credit: "Llio Angharad / Unsplash",
  },
  garden: {
    src: garden,
    alt: "A brick path winding through a lush tropical garden",
    credit: "Elliott Blair / Unsplash",
  },
  kampalaView: {
    src: kampalaView,
    alt: "City towers rising above tree-covered hills",
    credit: "Michael Starkie / Unsplash",
  },
  acaciaDusk: {
    src: acaciaDusk,
    alt: "A lone acacia tree against a golden evening sky",
    credit: "Damian Patkowski / Unsplash",
  },
  roomSingle: {
    src: roomSingle,
    alt: "A bedroom with a wall of glass opening onto tropical plants",
    credit: "Marc Wieland / Unsplash",
  },
  roomDouble: {
    src: roomDouble,
    alt: "A bed with red cushions beside open doors to a garden",
    credit: "Doan Anh / Unsplash",
  },
  roomTwin: {
    src: roomTwin,
    alt: "Two single beds under mosquito nets in a bright room",
    credit: "Doan Anh / Unsplash",
  },
  roomFamily: {
    src: roomFamily,
    alt: "A spacious suite with a four-poster bed and a timber ceiling",
    credit: "Didi Paul / Unsplash",
  },
} satisfies Record<string, Photo>;

export type Room = {
  id: string;
  name: string;
  price: number;
  bed: string;
  occupancy: string;
  features: string[];
  description: string;
  photo: Photo;
};

export const rooms: Room[] = [
  {
    id: "garden-single",
    name: "Garden Single",
    price: 55,
    bed: "Single bed",
    occupancy: "1 guest",
    features: ["Self-contained", "Garden view", "Work desk"],
    description:
      "A compact room facing the courtyard garden — quiet, self-contained, built for one.",
    photo: photos.roomSingle,
  },
  {
    id: "garden-double",
    name: "Garden Double",
    price: 75,
    bed: "Queen bed",
    occupancy: "2 guests",
    features: ["Self-contained", "Private balcony", "Garden view"],
    description:
      "The most requested room: a queen bed, a small balcony over the garden, morning light.",
    photo: photos.roomDouble,
  },
  {
    id: "twin",
    name: "Twin Room",
    price: 75,
    bed: "Two single beds",
    occupancy: "2 guests",
    features: ["Self-contained", "Courtyard-facing", "Work desk"],
    description:
      "Two single beds in a self-contained room, well suited to friends or colleagues travelling together.",
    photo: photos.roomTwin,
  },
  {
    id: "family-suite",
    name: "Family Suite",
    price: 95,
    bed: "Queen bed + sofa bed",
    occupancy: "2 adults, up to 3 children",
    features: ["Self-contained", "Lounge nook", "Garden view"],
    description:
      "A queen bed and a separate lounge nook with a sofa bed — room to spread out as a family.",
    photo: photos.roomFamily,
  },
];

export type Amenity = {
  id: string;
  label: string;
  icon: "garden" | "wifi" | "breakfast" | "parking" | "frontdesk" | "transfer";
};

export const amenities: Amenity[] = [
  { id: "garden", label: "Courtyard garden", icon: "garden" },
  { id: "wifi", label: "Free WiFi throughout", icon: "wifi" },
  { id: "breakfast", label: "Breakfast included daily", icon: "breakfast" },
  { id: "parking", label: "Free private parking", icon: "parking" },
  { id: "frontdesk", label: "24-hour front desk", icon: "frontdesk" },
  { id: "transfer", label: "Airport transfer on request", icon: "transfer" },
];

export const gallery = [
  { id: "courtyard", label: "The courtyard garden", photo: photos.courtyard },
  { id: "veranda", label: "Breakfast veranda", photo: photos.veranda },
  { id: "room", label: "A Garden Double room", photo: photos.roomDouble },
  { id: "garden", label: "Paths through the garden", photo: photos.garden },
  { id: "breakfast", label: "Breakfast, included daily", photo: photos.breakfast },
  { id: "evening", label: "Evenings under the acacias", photo: photos.acaciaDusk },
] as const;

export const reviews = [
  {
    quote:
      "The kind of quiet you don't expect ten minutes from the city centre. Breakfast on the veranda was the best part of the trip.",
    name: "Demo guest",
  },
  {
    quote:
      "Booked entirely over WhatsApp, which made the whole thing painless. Room was exactly as described.",
    name: "Demo guest",
  },
  {
    quote: "Small, well kept, and the garden is genuinely lovely in the morning.",
    name: "Demo guest",
  },
] as const;

export const nav = [
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
] as const;

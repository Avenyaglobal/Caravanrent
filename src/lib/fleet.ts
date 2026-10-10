export type Hold = { from: string; to: string };

export type Vehicle = {
  slug: string;
  name: string;
  chassis: string;
  year: number;
  berths: number;
  seats: number;
  price: number;
  base: string;
  gearbox: string;
  image: string;
  blurb: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  holds: Hold[];
};

export const pickups = [
  { id: "torrevieja", label: "Torrevieja — Calle La Sagra 92" },
  { id: "alicante", label: "Alicante city" },
  { id: "airport", label: "Alicante Airport (ALC)" },
] as const;

export type PickupId = (typeof pickups)[number]["id"];

export const included = [
  "Kitchenette, bathroom and basic cookware",
  "Free Starlink Wi-Fi",
  "Coffee machine and Smart TV",
  "Unlimited mileage inside Spain",
  "Pets welcome",
  "Handover in Torrevieja or Alicante",
];

export const vehicles: Vehicle[] = [
  {
    slug: "weinsberg",
    name: "Weinsberg CaraSuite 650 MEG",
    chassis: "Ford",
    year: 2024,
    berths: 4,
    seats: 4,
    price: 125,
    base: "Torrevieja",
    gearbox: "Manual",
    image: "/photos/real/2ford.webp",
    blurb:
      "A roomy 2024 Ford-based CaraSuite for four. Starlink, a proper kitchen and a quiet base in Torrevieja.",
    highlights: ["4 berths", "Starlink Wi-Fi", "Pets welcome", "From Torrevieja"],
    specs: [
      { label: "Year", value: "2024" },
      { label: "Chassis", value: "Ford" },
      { label: "Sleeps / belts", value: "4 / 4" },
      { label: "Gearbox", value: "Manual" },
      { label: "Base", value: "Torrevieja" },
      { label: "Mileage", value: "Unlimited in Spain" },
    ],
    holds: [{ from: "2026-11-01", to: "2026-11-08" }],
  },
  {
    slug: "mclouis",
    name: "McLouis MC4 379",
    chassis: "Fiat",
    year: 2025,
    berths: 5,
    seats: 5,
    price: 131,
    base: "Alicante",
    gearbox: "Automatic",
    image: "/photos/real/3caravan-1024x1024.webp",
    blurb:
      "Brand-new 2025 automatic Fiat for five. Separate shower and toilet, solar panel, Starlink and a full kitchen.",
    highlights: ["5 berths", "Automatic", "Separate shower", "Starlink Wi-Fi"],
    specs: [
      { label: "Year", value: "2025" },
      { label: "Chassis", value: "Fiat" },
      { label: "Sleeps / belts", value: "5 / 5" },
      { label: "Gearbox", value: "Automatic" },
      { label: "Rear bed", value: "190 × 150 cm" },
      { label: "Electric bed", value: "190 × 123 cm" },
      { label: "Single bed", value: "216 × 92 cm" },
      { label: "Fresh water", value: "150 L" },
      { label: "Base", value: "Alicante · Torrevieja handover" },
    ],
    holds: [{ from: "2026-10-18", to: "2026-10-25" }],
  },
  {
    slug: "chausson",
    name: "Chausson 724 Etape Line",
    chassis: "Peugeot",
    year: 2024,
    berths: 6,
    seats: 6,
    price: 125,
    base: "Torrevieja",
    gearbox: "Manual",
    image: "/photos/real/1-1024x1024.webp",
    blurb:
      "The family layout: a long 2024 Peugeot Chausson that sleeps six, with Starlink and the full kitchen kit.",
    highlights: ["6 berths", "Family layout", "Starlink Wi-Fi", "From Torrevieja"],
    specs: [
      { label: "Year", value: "2024" },
      { label: "Chassis", value: "Peugeot" },
      { label: "Sleeps / belts", value: "6 / 6" },
      { label: "Gearbox", value: "Manual" },
      { label: "Trim", value: "Etape Line" },
      { label: "Base", value: "Torrevieja" },
      { label: "Mileage", value: "Unlimited in Spain" },
    ],
    holds: [{ from: "2026-12-20", to: "2027-01-03" }],
  },
];

export function vehicleBySlug(slug: string) {
  return vehicles.find((v) => v.slug === slug);
}

export function overlaps(from: string, to: string, hold: Hold) {
  if (!from || !to) return false;
  return from <= hold.to && hold.from <= to;
}

export function heldOn(vehicle: Vehicle, from: string, to: string) {
  return vehicle.holds.some((hold) => overlaps(from, to, hold));
}

export function pickupLabel(id: string) {
  return pickups.find((p) => p.id === id)?.label ?? "Torrevieja";
}

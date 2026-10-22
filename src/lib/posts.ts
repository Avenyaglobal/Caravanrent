export type PostSection = {
  heading?: string;
  paragraphs?: string[];
  items?: string[];
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  sections: PostSection[];
};

export const posts: Post[] = [
  {
    slug: "advantages-of-motorhomes-in-spain",
    title: "The Advantages of Traveling in Motorhomes in Spain",
    date: "2024-08-05",
    author: "Caravan Rent Alicante",
    excerpt:
      "Sun, villages and cities — and the freedom to stay longer wherever Spain gets under your skin.",
    sections: [
      {
        paragraphs: [
          "Spain, with its sun-drenched beaches, charming villages and vibrant cities, is a paradise for travelers. Few ways of seeing it offer the freedom of a motorhome. Whether you have done this for years or it is your first trip, these are the reasons people keep coming back.",
        ],
      },
      {
        heading: "1. Freedom to explore at your own pace",
        paragraphs: [
          "You design the itinerary as you go. Stay longer on a Costa Blanca cove, or stop for a hidden square in Andalusia, without a hotel checkout hanging over the morning.",
        ],
      },
      {
        heading: "2. Cost savings",
        paragraphs: [
          "Bed and transport are the same vehicle. The kitchenette means markets instead of a restaurant for every meal — olive oil, tomatoes, bread, and dinner wherever you parked.",
        ],
      },
      {
        heading: "3. Connection with nature",
        paragraphs: [
          "Campsites sit under pines, beside vineyards and along the Mediterranean. Waking up to that view, coffee in hand, is the whole point of the trip.",
        ],
      },
      {
        heading: "4. Comfort on the road",
        paragraphs: [
          "A modern motorhome is a small house: beds, a bathroom with a shower, heating and cooling, and a kitchen that actually works. Long days of driving still end somewhere comfortable.",
        ],
      },
      {
        heading: "5. Culture, without a fixed booking",
        paragraphs: [
          "Festivals, markets and a spontaneous tapas evening do not wait for a hotel reservation. In a motorhome you can turn off the road and stay.",
        ],
      },
      {
        heading: "6. Pet-friendly travel",
        paragraphs: [
          "Spain is kind to dogs, and so are our vans. No hotel that suddenly says no at the desk.",
        ],
      },
      {
        heading: "7. A lighter way to travel",
        paragraphs: [
          "One vehicle instead of flights plus a hire car plus a new room every night. Cook, refill, and use the campsite recycling. It is not perfect, but it is simpler.",
        ],
      },
      {
        heading: "8. Made for families",
        paragraphs: [
          "Everyone sleeps on board. The dinette is where the day gets retold. Campsites are also where you meet other people doing the same thing.",
        ],
      },
      {
        heading: "Start from Alicante",
        paragraphs: [
          "The Costa Blanca is an easy place to begin: the airport, the sea, and the road north to Valencia or south toward Andalusia. Pick up in Torrevieja or Alicante and leave in the morning.",
        ],
      },
    ],
  },
  {
    slug: "packing-guide-spain",
    title: "What to Take on a Motorhome Trip to Spain",
    date: "2024-04-01",
    author: "Caravan Rent Alicante",
    excerpt:
      "Documents, layers, a few kitchen staples — and what you can leave at home because the van already has it.",
    sections: [
      {
        paragraphs: [
          "A motorhome through Spain is freedom plus a small kitchen. Pack for the climate and the paperwork, not for a full house. Cookware, a coffee machine and Starlink are already on board.",
        ],
      },
      {
        heading: "Documents",
        items: [
          "Driving licence, and an International Driving Permit if your licence requires one",
          "Passport or national ID",
          "Rental confirmation, insurance notes and our phone number",
          "A card and some cash — small villages still prefer cash",
        ],
      },
      {
        heading: "Clothes",
        items: [
          "Light layers for the coast",
          "A sweater for evenings and the interior",
          "A light rain jacket if you head north",
          "Walking shoes, swimwear, a hat",
        ],
      },
      {
        heading: "Kitchen extras",
        items: [
          "Olive oil, salt, coffee",
          "A sharp knife if you are particular",
          "Reusable bottles and a couple of food boxes",
          "A cloth shopper for the market",
        ],
      },
      {
        heading: "Personal kit",
        items: [
          "Sunscreen and a small first-aid kit",
          "Any medication you already take",
          "Insect repellent for still evenings",
          "Quick-dry towels if you want your own",
        ],
      },
      {
        heading: "Outside",
        paragraphs: [
          "Camping chairs and a table can be added. Tell us when you book if you want them. A torch is worth packing if you like late walks off the pitch.",
        ],
      },
    ],
  },
  {
    slug: "how-to-choose-a-motorhome",
    title: "How to Choose a Motorhome for Rent",
    date: "2024-01-30",
    author: "Caravan Rent Alicante",
    excerpt:
      "Berths, bathroom, mileage and who is actually driving. The short version of a long decision.",
    sections: [
      {
        paragraphs: [
          "The right van is the one that fits the people in it, not the biggest photo on the page. Start with how many of you sleep and how many of you drive.",
        ],
      },
      {
        heading: "Who is coming",
        paragraphs: [
          "Two people are happy in the Weinsberg. A family of five fits the automatic McLouis, with a separate shower. Six is the Chausson. If someone is nervous about a large vehicle, say so — we would rather put you in the van you will enjoy driving.",
        ],
      },
      {
        heading: "What has to be on board",
        items: [
          "Real beds, not just a dinette converted at midnight",
          "A bathroom you will actually use",
          "A fridge, stove and sink",
          "Heating and cooling — Alicante summers are serious",
        ],
      },
      {
        heading: "The paperwork that matters",
        paragraphs: [
          "We do not cap kilometres inside Spain. If the route leaves the country, tell us before you book so we can arrange it. Insurance, the deposit and the handover time are in the confirmation — ask before you pay, not on the morning you fly in.",
        ],
      },
      {
        heading: "Handover",
        paragraphs: [
          "Pickup is in Torrevieja, Calle La Sagra 92, or in Alicante, including the airport when we agree it in advance. We walk through water, gas, the toilet cassette and Starlink before you leave. First-timers get the long version. That is normal.",
        ],
      },
    ],
  },
];

export function postBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export type Review = {
  name: string;
  text: string;
  reply?: string;
};

export const reviews: Review[] = [
  {
    name: "jose viva",
    text: "A fantastic experience, our first time in a motorhome. Sergio was very kind, explained everything to us, and was always available for any questions. Very well-equipped and brand new. We'll be back!",
  },
  {
    name: "Without Name",
    text: "A service that deserves the highest ratings. Very polite and friendly, help building a travel itinerary, and the van is fully equipped. New, beautiful, comfortable, clean. Separate thanks for Starlink — during the big European blackout we still had internet, electricity and water. We will be back.",
  },
  {
    name: "victor jose vera martinez",
    text: "Everything in perfect condition and very pleasant treatment. The motorhome is very new and has everything you need for a few days as a couple or a family. Sergei explains everything and is very attentive.",
  },
  {
    name: "Andrea Pronestì",
    text: "Best of, top host.",
    reply:
      "Thank you very much. We are glad the van and the service worked for you, and we will be happy to see you again.",
  },
  {
    name: "Андрей Сокоренко",
    text: "I want to note the friendliness and attention of the owner. Thank you for the recommendations and for a wonderful holiday. Six days of joy — and it was my first time in a caravan.",
    reply:
      "Thank you. We are glad the trip was comfortable, and we wish you new adventures. You are welcome back.",
  },
  {
    name: "Mitja Gaiduk",
    text: "We used the service for a week and were very satisfied. The camper is modern, high quality and comfortable. Special thanks to Sergey.",
    reply: "Thank you — we are glad you were happy with the van and the week.",
  },
  {
    name: "Capt. Pavel Lobov",
    text: "Outstanding service. Support is there when you need it, they help with the route, and the caravans are spotless and comfortable. Prices are fair for the region. Highly recommended.",
    reply: "Thank you for the kind words. We will be glad to see you again.",
  },
  {
    name: "Ina Carabadjac",
    text: "An unforgettable trip. Four cities in four days, without rushing. Comfortable, clean, well furnished. Air conditioning, TV, coffee maker — a tiny house on wheels. I will be back.",
    reply: "Muchas gracias. We are happy the trip was comfortable, and we would love to see you again.",
  },
  {
    name: "Ирина Чванкова",
    text: "Recommended. We rented for a week. Excellent service, very clean and tidy inside. The whole family was happy. We will use you again.",
    reply: "Thank you. We are glad the family week went well.",
  },
  {
    name: "Mihail Shishkov",
    text: "I was among Sergey's first clients. He loves this and he travels in campers himself. Delighted with the cars and the service. I recommend him to everyone.",
    reply: "Thank you. It means a lot, and you are welcome back any time.",
  },
];

export const faqs = [
  {
    q: "How do I book a mobile home?",
    a: "Booking is simple! You can check available dates on our website, choose the caravan that suits your needs, and complete the booking online. Once confirmed, you’ll receive an email with all rental details and pickup instructions.",
  },
  {
    q: "What is included in the rental?",
    a: "Each caravan comes fully equipped with essential amenities, including a kitchenette, sleeping areas, a bathroom, and basic cookware. Some models also include extra items, like outdoor furniture and additional storage space—check each caravan’s details for specifics!",
  },
  {
    q: "Where do I pick up and drop off the mobile home?",
    a: "The pickup and drop-off location will be provided in your confirmation email. Our team will meet you at the designated spot in the Alicante region, ensuring a smooth start and end to your trip.",
  },
  {
    q: "Is there a mileage limit for rentals?",
    a: "No, we offer unlimited mileage within Spain, so you’re free to explore the country without extra fees. However, please let us know if you plan to travel outside of Spain, as additional arrangements may be necessary.",
  },
];

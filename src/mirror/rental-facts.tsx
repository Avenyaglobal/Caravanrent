import type { Lang } from "@/mirror/locales";

const copy: Record<Lang, { title: string; lines: string[] }[]> = {
  es: [
    { title: "Condiciones", lines: ["Mínimo 3 días", "Desde 25 años", "Carnet desde hace 2 años"] },
    { title: "Precio", lines: ["Desde 100 € al día + 50 € de limpieza final", "Depósito 800 € manual / 1.200 € automático"] },
    { title: "Autocaravanas", lines: ["Años 2024 y 2025, manual y automático", "Kilometraje ilimitado", "Con mascotas: +50 € de limpieza"] },
    {
      title: "Incluido",
      lines: ["Vajilla, Starlink Wi-Fi (gratis), cafetera y Smart TV", "Mantenimiento: cables eléctricos, mangueras de agua, química para el váter, herramientas y otros"],
    },
    { title: "Con suplemento", lines: ["Ropa de cama, toallas, EcoFlow y mobiliario de camping"] },
  ],
  en: [
    { title: "Conditions", lines: ["Minimum 3 days", "From 25 years old", "Licence held for 2 years"] },
    { title: "Price", lines: ["From €100 a day + €50 final cleaning", "Deposit €800 manual / €1,200 automatic"] },
    { title: "Motorhomes", lines: ["2024 and 2025, manual and automatic", "Unlimited mileage", "Pets: +€50 cleaning"] },
    {
      title: "Included",
      lines: ["Crockery, Starlink Wi-Fi (free), coffee machine and Smart TV", "Service kit: electrical cables, water hoses, toilet chemicals, tools and other items"],
    },
    { title: "Extra", lines: ["Bedding, towels, EcoFlow and camping furniture"] },
  ],
  fr: [
    { title: "Conditions", lines: ["Minimum 3 jours", "Dès 25 ans", "Permis depuis 2 ans"] },
    { title: "Prix", lines: ["Dès 100 € par jour + 50 € de nettoyage final", "Caution 800 € manuelle / 1 200 € automatique"] },
    { title: "Camping-cars", lines: ["2024 et 2025, manuelle et automatique", "Kilométrage illimité", "Avec animaux : +50 € de nettoyage"] },
    {
      title: "Inclus",
      lines: ["Vaisselle, Starlink Wi-Fi (gratuit), machine à café et Smart TV", "Entretien : câbles électriques, tuyaux d'eau, produits pour les toilettes, outils et autres"],
    },
    { title: "En supplément", lines: ["Linge de lit, serviettes, EcoFlow et mobilier de camping"] },
  ],
  de: [
    { title: "Bedingungen", lines: ["Mindestens 3 Tage", "Ab 25 Jahren", "Führerschein seit 2 Jahren"] },
    { title: "Preis", lines: ["Ab 100 € pro Tag + 50 € Endreinigung", "Kaution 800 € Schaltwagen / 1.200 € Automatik"] },
    { title: "Wohnmobile", lines: ["2024 und 2025, Schaltung und Automatik", "Kilometer unbegrenzt", "Mit Tieren: +50 € Reinigung"] },
    {
      title: "Inklusive",
      lines: ["Geschirr, Starlink-WLAN (gratis), Kaffeemaschine und Smart-TV", "Wartung: Stromkabel, Wasserschläuche, WC-Chemie, Werkzeug und Weiteres"],
    },
    { title: "Gegen Aufpreis", lines: ["Bettwäsche, Handtücher, EcoFlow und Campingmöbel"] },
  ],
  ru: [
    { title: "Условия", lines: ["Минимум 3 дня", "От 25 лет", "Стаж 2 года"] },
    { title: "Цена", lines: ["От 100 € в день + 50 € финальная уборка", "Депозит 800 € механика / 1 200 € автомат"] },
    { title: "Автодома", lines: ["2024–2025 год, механика и автомат", "Пробег не ограничен", "С животными: +50 € за уборку"] },
    {
      title: "В комплекте",
      lines: ["Посуда, Starlink Wi-Fi (бесплатно), кофемашина и Smart TV", "Обслуживание: электрические кабели, шланги для воды, химия для туалета, инструменты и другое"],
    },
    { title: "За доплату", lines: ["Постельное бельё, полотенца, EcoFlow и кемпинговая мебель"] },
  ],
  ua: [
    { title: "Умови", lines: ["Мінімум 3 дні", "Від 25 років", "Стаж 2 роки"] },
    { title: "Ціна", lines: ["Від 100 € на день + 50 € фінальне прибирання", "Депозит 800 € механіка / 1 200 € автомат"] },
    { title: "Автодоми", lines: ["2024–2025 рік, механіка й автомат", "Пробіг не обмежений", "З тваринами: +50 € за прибирання"] },
    {
      title: "У комплекті",
      lines: ["Посуд, Starlink Wi-Fi (безкоштовно), кавомашина і Smart TV", "Обслуговування: електричні кабелі, шланги для води, хімія для туалета, інструменти та інше"],
    },
    { title: "За доплату", lines: ["Постільна білизна, рушники, EcoFlow і кемпінгові меблі"] },
  ],
};

export function RentalFacts({ lang }: { lang: Lang }) {
  return (
    <div className="cr-facts">
      {copy[lang].map((group) => (
        <section key={group.title}>
          <h3>{group.title}</h3>
          {group.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </section>
      ))}
    </div>
  );
}

import { extraPhrases } from "@/mirror/extra-phrases";

export const languages = ["es", "en", "fr", "de", "ru", "ua"] as const;
export type Lang = (typeof languages)[number];

export const languagePath: Record<Lang, string> = {
  es: "/",
  en: "/en",
  fr: "/fr",
  de: "/de",
  ru: "/ru",
  ua: "/ua",
};

export const languageName: Record<Lang, string> = {
  es: "Español",
  en: "English",
  fr: "Français",
  de: "Deutsch",
  ru: "Русский",
  ua: "Українська",
};

export const languageCode: Record<Lang, string> = {
  es: "ES",
  en: "EN",
  fr: "FR",
  de: "DE",
  ru: "RU",
  ua: "UA",
};

export function pagePath(lang: Lang, slug = "") {
  const prefix = lang === "es" ? "" : `/${lang}`;
  const clean = slug.replace(/^\/+|\/+$/g, "");
  if (!clean) return prefix || "/";
  return `${prefix}/${clean}`;
}

export const siteOrigin = "https://www.caravanrent-alicante.com";

export const pageMeta: Record<Lang, { title: string; description: string }> = {
  es: {
    title: "Alquiler de autocaravanas en Alicante, Torrevieja y Elche | Caravan Rent",
    description:
      "Alquiler de autocaravanas en Alicante, Torrevieja y Elche. Vehículos nuevos, kilometraje ilimitado en España y Starlink incluido.",
  },
  en: {
    title: "Motorhome rental in Alicante and Torrevieja | Caravan Rent",
    description:
      "Motorhome rental in Torrevieja and Alicante. New caravans, unlimited mileage in Spain, Starlink included.",
  },
  fr: {
    title: "Location de camping-car à Alicante et Torrevieja | Caravan Rent",
    description:
      "Location de camping-cars à Torrevieja et Alicante. Véhicules neufs, kilométrage illimité en Espagne et Starlink inclus.",
  },
  de: {
    title: "Wohnmobil mieten in Alicante und Torrevieja | Caravan Rent",
    description:
      "Wohnmobilvermietung in Torrevieja und Alicante. Neue Fahrzeuge, unbegrenzte Kilometer in Spanien und Starlink inklusive.",
  },
  ru: {
    title: "Аренда автодомов в Аликанте и Торревьехе | Caravan Rent",
    description:
      "Аренда автодомов в Торревьехе и Аликанте. Новые автодома, безлимитный пробег по Испании и Starlink в комплекте.",
  },
  ua: {
    title: "Оренда автодомів в Аліканте та Торрев'єсі | Caravan Rent",
    description:
      "Оренда автодомів у Торрев'єсі та Аліканте. Нові автодоми, безлімітний пробіг Іспанією та Starlink у комплекті.",
  },
};

/** Source text as it appears in the HTML. Reviews stay untouched. */
const phrases: Record<string, Partial<Record<Lang, string>>> = {
  Home: { es: "Inicio", fr: "Accueil", de: "Start", ru: "Главная", ua: "Головна" },
  "How It Works": { es: "Cómo funciona", fr: "Comment ça marche", de: "So funktioniert's", ru: "Как это работает", ua: "Як це працює" },
  "About us": { es: "Sobre nosotros", fr: "À propos", de: "Über uns", ru: "О нас", ua: "Про нас" },
  FAQ: { es: "Preguntas", fr: "FAQ", de: "FAQ", ru: "Вопросы", ua: "Питання" },
  Reviews: { es: "Opiniones", fr: "Avis", de: "Bewertungen", ru: "Отзывы", ua: "Відгуки" },
  Blog: { es: "Blog", fr: "Blog", de: "Blog", ru: "Блог", ua: "Блог" },
  "\u0421ontacts": { es: "Contacto", en: "Contacts", fr: "Contact", de: "Kontakt", ru: "Контакты", ua: "Контакти" },
  "100% Trusted caravan rental platform": {
    es: "Alquiler de autocaravanas en Alicante, Torrevieja y Elche",
    fr: "Location de camping-car à Alicante, Torrevieja et Elche",
    de: "Wohnmobil mieten in Alicante, Torrevieja und Elche",
    ru: "Аренда автодомов в Аликанте, Торревьехе и Эльче",
    ua: "Оренда автодомів в Аліканте, Торрев'єсі та Ельче",
  },
  "Your travel story": { es: "Tu historia de viaje", fr: "Votre histoire de voyage", de: "Ihre Reisegeschichte", ru: "Ваша история путешествия", ua: "Ваша історія подорожі" },
  "begins here": { es: "empieza aquí", fr: "commence ici", de: "beginnt hier", ru: "начинается здесь", ua: "починається тут" },
  "Imagine: early morning, the sun is just beginning to warm the golden sands of the Costa Blanca, and you, with a cup of hot coffee in your hands, watch the sea reflect the first rays of the day. No fuss of hotels, no schedule restrictions - just you, the road and endless freedom.": {
    es: "Imagina: es temprano, el sol empieza a calentar la arena dorada de la Costa Blanca y tú, con un café caliente en las manos, miras cómo el mar refleja los primeros rayos del día. Sin el ajetreo de los hoteles ni horarios: solo tú, la carretera y una libertad sin fin.",
    fr: "Imaginez : tôt le matin, le soleil commence à réchauffer le sable doré de la Costa Blanca et vous, une tasse de café chaud à la main, regardez la mer refléter les premiers rayons du jour. Pas de contraintes d'hôtel ni d'horaires : juste vous, la route et une liberté sans fin.",
    de: "Stellen Sie sich vor: früher Morgen, die Sonne wärmt den goldenen Sand der Costa Blanca, und Sie schauen mit einer Tasse Kaffee in der Hand zu, wie das Meer die ersten Strahlen des Tages spiegelt. Kein Hotelstress, keine Zeitpläne – nur Sie, die Straße und endlose Freiheit.",
    ru: "Представьте: раннее утро, солнце только начинает согревать золотой песок Коста-Бланки, а вы с чашкой горячего кофе смотрите, как море отражает первые лучи дня. Никакой суеты отелей и расписаний — только вы, дорога и полная свобода.",
    ua: "Уявіть: ранній ранок, сонце лише починає гріти золотий пісок Коста-Бланки, а ви з чашкою гарячої кави дивитеся, як море відбиває перші промені дня. Жодної метушні готелів і розкладів — лише ви, дорога і повна свобода.",
  },
  "With a caravan, dreams become reality. This is your home on wheels, your personal corner of comfort that accompanies you on every adventure. Leave home in the morning and find yourself on a mountain top or a secluded beach? It's up to you to decide": {
    es: "Con una autocaravana, los sueños se hacen realidad. Es tu casa sobre ruedas, tu rincón de confort en cada aventura. ¿Salir por la mañana y estar en la cima de una montaña o en una playa escondida? Tú decides.",
    fr: "Avec un camping-car, les rêves deviennent réalité. C'est votre maison sur roues, votre coin de confort à chaque aventure. Partir le matin et vous retrouver au sommet d'une montagne ou sur une plage isolée ? C'est vous qui décidez.",
    de: "Mit einem Wohnmobil werden Träume wahr. Es ist Ihr Zuhause auf Rädern, Ihre persönliche Ecke Komfort auf jedem Abenteuer. Morgens losfahren und auf einem Berggipfel oder an einem einsamen Strand stehen? Sie entscheiden.",
    ru: "С автодомом мечты становятся реальностью. Это ваш дом на колёсах и личный уголок уюта в каждом путешествии. Уехать утром и оказаться на вершине горы или на уединённом пляже? Решать вам.",
    ua: "З автодомом мрії стають реальністю. Це ваш дім на колесах і особистий куточок затишку в кожній пригоді. Виїхати вранці й опинитися на вершині гори чи на відокремленому пляжі? Вирішувати вам.",
  },
  "How book": { es: "Cómo reservar", en: "How to book", fr: "Réserver", de: "Buchen", ru: "Как забронировать", ua: "Як забронювати" },
  "Pickup Location": { es: "Lugar de recogida", fr: "Lieu de prise en charge", de: "Abholort", ru: "Место выдачи", ua: "Місце видачі" },
  "All Location": { es: "Todos los lugares", fr: "Tous les lieux", de: "Alle Orte", ru: "Все места", ua: "Усі місця" },
  "Alicante Airport, free": {
    es: "Aeropuerto de Alicante, gratis",
    fr: "Aéroport d'Alicante, gratuit",
    de: "Flughafen Alicante, kostenlos",
    ru: "Аэропорт Аликанте, бесплатно",
    ua: "Аеропорт Аліканте, безкоштовно",
  },
  "Pickup Date": { es: "Fecha de recogida", fr: "Date de départ", de: "Abholdatum", ru: "Дата получения", ua: "Дата отримання" },
  "Return Date": { es: "Fecha de devolución", fr: "Date de retour", de: "Rückgabedatum", ru: "Дата возврата", ua: "Дата повернення" },
  Search: { es: "Buscar", fr: "Rechercher", de: "Suchen", ru: "Найти", ua: "Знайти" },
  "Booking a motorhome rental is a straightforward process that typically involves the following steps": {
    es: "Reservar una autocaravana es un proceso sencillo que suele seguir estos pasos",
    fr: "Réserver un camping-car est simple et se fait généralement en quelques étapes",
    de: "Ein Wohnmobil zu buchen ist einfach und läuft meist in diesen Schritten ab",
    ru: "Бронирование автодома — простой процесс из нескольких шагов",
    ua: "Бронювання автодома — простий процес із кількох кроків",
  },
  "1. Choose Your Motorhome": { es: "1. Elige tu autocaravana", fr: "1. Choisissez votre camping-car", de: "1. Wählen Sie Ihr Wohnmobil", ru: "1. Выберите автодом", ua: "1. Оберіть автодім" },
  "Browse our selection of available motorhomes and choose the motorhome that best fits your travel plans, group size, and comfort needs.": {
    es: "Mira las autocaravanas disponibles y elige la que mejor encaje con tu viaje, el tamaño del grupo y el confort que buscas.",
    fr: "Parcourez nos camping-cars disponibles et choisissez celui qui correspond à votre voyage, à la taille du groupe et à votre confort.",
    de: "Sehen Sie sich unsere verfügbaren Wohnmobile an und wählen Sie das Modell, das zu Ihrer Reise, Gruppengröße und Ihrem Komfort passt.",
    ru: "Посмотрите доступные автодома и выберите тот, что подходит под маршрут, размер компании и нужный комфорт.",
    ua: "Перегляньте доступні автодоми й оберіть той, що пасує до маршруту, розміру компанії та потрібного комфорту.",
  },
  "2. Contact Us for Booking Date": { es: "2. Elige las fechas y el lugar", fr: "2. Choisissez les dates et le lieu", de: "2. Wählen Sie Daten und Ort", ru: "2. Выберите даты и место", ua: "2. Оберіть дати і місце" },
  "Get in touch with us to receive full booking conditions, availability confirmation, pricing, and all necessary rental details before finalizing your reservation.": {
    es: "Elige los días de recogida y devolución y el lugar donde quieres recoger y devolver la autocaravana.",
    fr: "Choisissez les jours de départ et de retour, ainsi que le lieu de prise en charge et de restitution.",
    de: "Wählen Sie Abhol- und Rückgabetag sowie den Ort für Abholung und Rückgabe.",
    ru: "Выберите дни выдачи и возврата и место, где хотите получить и вернуть автодом.",
    ua: "Оберіть дні видачі й повернення та місце, де хочете отримати й повернути автодім.",
  },
  "3. Pick-Up Locations": { es: "3. Envía la solicitud para confirmar la reserva", fr: "3. Envoyez la demande pour confirmer la réservation", de: "3. Senden Sie die Anfrage zur Bestätigung der Buchung", ru: "3. Отправьте заявку на подтверждение бронирования", ua: "3. Надішліть заявку на підтвердження бронювання" },
  "On the day of your booking, simply arrive at the designated pickup location, where our team will be ready to hand over your motorhome and provide any additional instructions or support.": {
    es: "Envía la solicitud. En breve nos pondremos en contacto para confirmar tu reserva.",
    fr: "Envoyez la demande. Nous vous contactons rapidement pour confirmer votre réservation.",
    de: "Senden Sie die Anfrage. Wir melden uns in Kürze, um Ihre Buchung zu bestätigen.",
    ru: "Отправьте заявку. В ближайшее время мы свяжемся с вами для подтверждения вашего бронирования.",
    ua: "Надішліть заявку. Найближчим часом ми зв'яжемося з вами для підтвердження вашого бронювання.",
  },
  "ABOUT OUR COMPANY": { es: "SOBRE NOSOTROS", fr: "À PROPOS", de: "ÜBER UNS", ru: "О КОМПАНИИ", ua: "ПРО КОМПАНІЮ" },
  "We are your trusted partner for mobile home or autocaravan rentals in the stunning Alicante region of Spain! We’re dedicated to helping travelers experience Costa Blanca with the freedom and flexibility only a caravan can offer.": {
    es: "Somos tu equipo de confianza para alquilar autocaravanas en Alicante. Queremos que vivas la Costa Blanca con la libertad que solo da una casa sobre ruedas.",
    fr: "Nous sommes votre partenaire de confiance pour la location de camping-cars dans la région d'Alicante. Nous aidons les voyageurs à découvrir la Costa Blanca en toute liberté.",
    de: "Wir sind Ihr Partner für Wohnmobilvermietung in der Region Alicante. Wir helfen Reisenden, die Costa Blanca mit der Freiheit eines Wohnmobils zu erleben.",
    ru: "Мы сдаём автодома в Аликанте и помогаем путешествовать по Коста-Бланке с той свободой, которую даёт только дом на колёсах.",
    ua: "Ми здаємо автодоми в Аліканте й допомагаємо подорожувати Коста-Бланкою з тією свободою, яку дає лише дім на колесах.",
  },
  "We put our customers first with flexible rental options and tailored solutions to fit your unique schedule and travel plans. Our caravans are regularly maintained to ensure they're in top condition, combining comfort, safety, and style. Our booking process is transparent and straightforward, so you can check availability, confirm dates, and secure your rental in just a few clicks. And as a local business in Alicante, we're here to provide insider tips, must-see destinations, and 24/7 support, making your trip seamless and unforgettable.": {
    es: "Ponemos al cliente primero: alquiler flexible y soluciones a medida de tus fechas y tu ruta. Las autocaravanas se revisan con regularidad para que salgan cómodas, seguras y cuidadas. La reserva es clara: consultas disponibilidad, confirmas fechas y dejas el alquiler cerrado en pocos pasos. Somos un equipo local en Alicante: consejos de verdad, sitios que merece la pena ver y soporte las 24 horas.",
    fr: "Nous privilégions des locations souples, adaptées à vos dates et à votre itinéraire. Les camping-cars sont entretenus régulièrement : confort, sécurité et style. La réservation est simple : disponibilité, dates, confirmation en quelques étapes. Équipe locale à Alicante, nous partageons de vrais conseils, les lieux à voir et une assistance 24 h/24.",
    de: "Flexible Mieten, abgestimmt auf Ihre Daten und Route. Die Wohnmobile werden regelmäßig gewartet: Komfort, Sicherheit und Pflege. Die Buchung ist klar: Verfügbarkeit prüfen, Termine bestätigen, fertig. Als lokales Team in Alicante geben wir echte Tipps, sehenswerte Orte und Support rund um die Uhr.",
    ru: "Гибкая аренда под ваши даты и маршрут. Автодома регулярно обслуживаются: комфорт, безопасность и порядок. Бронирование прозрачное: свободные даты, подтверждение и оформление за несколько шагов. Мы местная команда в Аликанте: подскажем маршруты, места и будем на связи круглосуточно.",
    ua: "Гнучка оренда під ваші дати й маршрут. Автодоми регулярно обслуговуються: комфорт, безпека й порядок. Бронювання прозоре: вільні дати, підтвердження й оформлення за кілька кроків. Ми місцева команда в Аліканте: підкажемо маршрути, місця й будемо на зв'язку цілодобово.",
  },
  "Let us bring the best of Alicante to your doorstep—enjoy the open road with the confidence and peace of mind that comes from working with a trusted, local team.": {
    es: "Lleva lo mejor de Alicante contigo y sal a la carretera con la tranquilidad de un equipo local de confianza.",
    fr: "Emportez le meilleur d'Alicante et prenez la route l'esprit tranquille, avec une équipe locale de confiance.",
    de: "Nehmen Sie das Beste von Alicante mit und fahren Sie los – mit dem ruhigen Gefühl, ein lokales Team an Ihrer Seite zu haben.",
    ru: "Возьмите лучшее из Аликанте с собой и выезжайте на дорогу спокойно: рядом местная команда, которой можно доверять.",
    ua: "Візьміть найкраще з Аліканте із собою й виїжджайте спокійно: поруч місцева команда, якій можна довіряти.",
  },
  "Flexible, Customer-Centric Service": { es: "Servicio flexible y cercano", fr: "Un service souple et attentif", de: "Flexibler, persönlicher Service", ru: "Гибкий сервис под вас", ua: "Гнучкий сервіс під вас" },
  "Top-Quality Caravans": { es: "Autocaravanas cuidadas", fr: "Camping-cars soignés", de: "Gepflegte Wohnmobile", ru: "Ухоженные автодома", ua: "Доглянуті автодоми" },
  "Simple Booking Process": { es: "Reserva sencilla", fr: "Réservation simple", de: "Einfache Buchung", ru: "Простое бронирование", ua: "Просте бронювання" },
  "Local Knowledge and Support": { es: "Conocemos la zona y te ayudamos", fr: "Connaissance locale et assistance", de: "Lokales Wissen und Support", ru: "Знаем регион и помогаем", ua: "Знаємо регіон і допомагаємо" },
  "Our caravans": { es: "Nuestras autocaravanas", fr: "Nos camping-cars", de: "Unsere Wohnmobile", ru: "Наши автодома", ua: "Наші автодоми" },
  "Choose what you like.": { es: "Elige la que más te guste.", fr: "Choisissez celui qui vous plaît.", de: "Wählen Sie, was Ihnen gefällt.", ru: "Выберите, что вам по душе.", ua: "Оберіть те, що вам до душі." },
  "Frequently Asked Questions": { es: "Preguntas frecuentes", fr: "Questions fréquentes", de: "Häufige Fragen", ru: "Частые вопросы", ua: "Часті питання" },
  "Find answers to your questions from our previous answers": {
    es: "Respuestas a lo que más nos preguntan",
    fr: "Les réponses aux questions les plus fréquentes",
    de: "Antworten auf die häufigsten Fragen",
    ru: "Ответы на то, о чём нас спрашивают чаще всего",
    ua: "Відповіді на те, про що нас питають найчастіше",
  },
  "How do I book a mobile home?": { es: "¿Cómo reservo una autocaravana?", fr: "Comment réserver un camping-car ?", de: "Wie buche ich ein Wohnmobil?", ru: "Как забронировать автодом?", ua: "Як забронювати автодім?" },
  "Booking is simple! You can check available dates on our website, choose the caravan that suits your needs, and complete the booking online. Once confirmed, you’ll receive an email with all rental details and pickup instructions.": {
    es: "Reservar es fácil. Consulta las fechas libres, elige la autocaravana y confirma la reserva. Cuando esté confirmada, te enviamos un correo con los detalles y las instrucciones de recogida.",
    fr: "Réserver est simple. Consultez les dates, choisissez le camping-car et confirmez. Une fois la réservation validée, vous recevez un e-mail avec les détails et les instructions de prise en charge.",
    de: "Buchen ist einfach. Prüfen Sie die freien Tage, wählen Sie das Wohnmobil und bestätigen Sie. Danach erhalten Sie eine E-Mail mit allen Details und der Abholung.",
    ru: "Забронировать просто. Посмотрите свободные даты, выберите автодом и подтвердите бронь. После подтверждения пришлём письмо с деталями и инструкцией по выдаче.",
    ua: "Забронювати просто. Подивіться вільні дати, оберіть автодім і підтвердьте бронь. Після підтвердження надішлемо лист із деталями та інструкцією з видачі.",
  },
  "What is included in the rental?": { es: "¿Qué incluye el alquiler?", fr: "Que comprend la location ?", de: "Was ist in der Miete enthalten?", ru: "Что входит в аренду?", ua: "Що входить в оренду?" },
  "Each caravan comes fully equipped with essential amenities, including a kitchenette, sleeping areas, a bathroom, and basic cookware. Some models also include extra items, like outdoor furniture and additional storage space—check each caravan’s details for specifics!": {
    es: "Cada autocaravana va equipada: cocina, camas, baño y menaje básico. Algunos modelos añaden muebles de exterior y más almacenaje. Mira la ficha de cada vehículo para el detalle.",
    fr: "Chaque camping-car est équipé : kitchenette, couchages, salle de bain et batterie de cuisine. Certains ajoutent du mobilier d'extérieur et plus de rangement. Le détail est sur la fiche de chaque véhicule.",
    de: "Jedes Wohnmobil ist ausgestattet: Küche, Schlafplätze, Bad und Geschirr. Manche haben zusätzlich Campingmöbel und mehr Stauraum. Die Details stehen bei jedem Fahrzeug.",
    ru: "В каждом автодоме есть кухня, спальные места, санузел и базовая посуда. В некоторых моделях есть уличная мебель и дополнительное место для вещей. Подробности — в карточке каждого автодома.",
    ua: "У кожному автодомі є кухня, спальні місця, санвузол і базовий посуд. У деяких моделях є вуличні меблі та додаткове місце для речей. Подробиці — у картці кожного автодома.",
  },
  "Where do I pick up and drop off the mobile home?": { es: "¿Dónde recojo y devuelvo la autocaravana?", fr: "Où prendre et rendre le camping-car ?", de: "Wo hole ich das Wohnmobil ab und bringe es zurück?", ru: "Где забирать и возвращать автодом?", ua: "Де забирати й повертати автодім?" },
  "The pickup and drop-off location will be provided in your confirmation email. Our team will meet you at the designated spot in the Alicante region, ensuring a smooth start and end to your trip.": {
    es: "Recogida y devolución en Alicante, Torrevieja, Elche y en el aeropuerto de Alicante, gratis. El punto concreto va en el correo de confirmación.",
    fr: "Prise en charge et retour à Alicante, Torrevieja, Elche et à l'aéroport d'Alicante, gratuit. Le point exact est dans l'e-mail de confirmation.",
    de: "Abholung und Rückgabe in Alicante, Torrevieja, Elche und am Flughafen Alicante, kostenlos. Der genaue Punkt steht in der Bestätigungsmail.",
    ru: "Выдача и возврат в Аликанте, Торревьехе, Эльче и в аэропорту Аликанте, бесплатно. Точная точка приходит в письме с подтверждением.",
    ua: "Видача і повернення в Аліканте, Торрев'єсі, Ельче та в аеропорту Аліканте, безкоштовно. Точна точка приходить у листі з підтвердженням.",
  },
  "Is there a mileage limit for rentals?": { es: "¿Hay límite de kilómetros?", fr: "Y a-t-il une limite de kilométrage ?", de: "Gibt es ein Kilometerlimit?", ru: "Есть лимит пробега?", ua: "Чи є ліміт пробігу?" },
  "No, we offer unlimited mileage within Spain, so you’re free to explore the country without extra fees. However, please let us know if you plan to travel outside of Spain, as additional arrangements may be necessary.": {
    es: "No. El kilometraje es ilimitado dentro de España, sin recargo. Si quieres salir del país, avísanos: hace falta prepararlo aparte.",
    fr: "Non. Le kilométrage est illimité en Espagne, sans supplément. Si vous sortez du pays, prévenez-nous : il faut l'organiser à part.",
    de: "Nein. Innerhalb Spaniens sind die Kilometer unbegrenzt und ohne Aufpreis. Wenn Sie das Land verlassen möchten, sagen Sie uns Bescheid: das muss extra abgestimmt werden.",
    ru: "Нет. По Испании пробег безлимитный, без доплаты. Если планируете выезд за пределы страны, предупредите нас: это нужно согласовать отдельно.",
    ua: "Ні. Іспанією пробіг безлімітний, без доплати. Якщо плануєте виїзд за межі країни, попередьте нас: це треба узгодити окремо.",
  },
  "What People say about us?": { es: "Qué dicen de nosotros", fr: "Ce que disent nos clients", de: "Was Gäste über uns sagen", ru: "Что о нас говорят", ua: "Що про нас кажуть" },
  "Discover what our customers have think about us": {
    es: "Opiniones de quienes ya han viajado con nosotros",
    en: "What our customers say",
    fr: "L'avis de ceux qui ont déjà voyagé avec nous",
    de: "Was Gäste nach ihrer Reise geschrieben haben",
    ru: "Отзывы тех, кто уже ездил с нами",
    ua: "Відгуки тих, хто вже їздив із нами",
  },
  "Based on 12 reviews": { es: "Basado en 12 opiniones", fr: "Sur 12 avis", de: "Basierend auf 12 Bewertungen", ru: "На основе 12 отзывов", ua: "На основі 12 відгуків" },
  "powered by": { es: "con tecnología de", fr: "propulsé par", de: "betrieben von", ru: "на базе", ua: "на базі" },
  "review us on": { es: "danos tu opinión en", fr: "laissez un avis sur", de: "bewerten Sie uns auf", ru: "оставьте отзыв в", ua: "залиште відгук у" },
  "a year ago": { es: "hace un año", fr: "il y a un an", de: "vor einem Jahr", ru: "год назад", ua: "рік тому" },
  "Without Name": { es: "Sin nombre", fr: "Sans nom", de: "Ohne Namen", ru: "Без имени", ua: "Без імені" },
  "Response from the owner": { es: "Respuesta del propietario", fr: "Réponse du propriétaire", de: "Antwort des Inhabers", ru: "Ответ владельца", ua: "Відповідь власника" },
  "News & Insights For You": { es: "Noticias e ideas para tu viaje", fr: "Idées et conseils pour votre voyage", de: "Tipps und Ideen für Ihre Reise", ru: "Новости и идеи для поездки", ua: "Новини та ідеї для поїздки" },
  "This blog post provides valuable insights into the benefits": {
    es: "Artículos útiles sobre cómo viajar en autocaravana",
    fr: "Des articles utiles pour voyager en camping-car",
    de: "Nützliche Artikel übers Reisen im Wohnmobil",
    ru: "Полезные статьи о путешествиях на автодоме",
    ua: "Корисні статті про подорожі автодомом",
  },
  "The Advantages of Traveling in Motorhomes in Spain": {
    es: "Ventajas de viajar en autocaravana por España",
    fr: "Les avantages de voyager en camping-car en Espagne",
    de: "Vorteile einer Wohnmobilreise durch Spanien",
    ru: "Плюсы путешествия по Испании на автодоме",
    ua: "Плюси подорожі Іспанією автодомом",
  },
  "Spain, with its sun-drenched beaches, charming villages, and vibrant cities, is a paradise for travelers....": {
    es: "España, con sus playas soleadas, pueblos con encanto y ciudades vivas, es un paraíso para viajar....",
    fr: "L'Espagne, ses plages ensoleillées, ses villages et ses villes animées, est un paradis pour voyager....",
    de: "Spanien mit seinen Stränden, Dörfern und lebendigen Städten ist ein Paradies für Reisende....",
    ru: "Испания с её пляжами, деревнями и живыми городами — рай для путешествий....",
    ua: "Іспанія з її пляжами, селами й живими містами — рай для подорожей....",
  },
  "\u0410\u0434\u043c\u0456\u043d\u0456\u0441\u0442\u0440\u0430\u0442\u043e\u0440": {
    es: "Caravan Rent Alicante",
    en: "Caravan Rent Alicante",
    fr: "Caravan Rent Alicante",
    de: "Caravan Rent Alicante",
    ru: "Caravan Rent Alicante",
    ua: "Caravan Rent Alicante",
  },
  "August 5, 2024": { es: "15 de octubre de 2026", en: "October 15, 2026", fr: "15 octobre 2026", de: "15. Oktober 2026", ru: "15 октября 2026", ua: "15 жовтня 2026" },
  "What to Take on a Motorhome Trip to Spain: Essential Packing Guide": {
    es: "Qué llevar en un viaje en autocaravana por España",
    fr: "Que emporter pour un voyage en camping-car en Espagne",
    de: "Was Sie für eine Wohnmobilreise nach Spanien einpacken",
    ru: "Что взять в поездку по Испании на автодоме",
    ua: "Що взяти в поїздку Іспанією автодомом",
  },
  "Everyone has the right to freedom of thought, conscience and religion; this right includes freedom...": {
    es: "Una guía práctica de lo que conviene llevar para viajar con tranquilidad...",
    en: "Traveling by motorhome in Spain is free and comfortable if you pack the right things. Here is what to bring.",
    fr: "Un guide pratique de ce qu'il faut emporter pour voyager sereinement...",
    de: "Ein praktischer Packtipp, damit die Reise ruhig bleibt...",
    ru: "Практичный список вещей, чтобы поездка прошла спокойно...",
    ua: "Практичний список речей, щоб поїздка минула спокійно...",
  },
  "April 1, 2024": { es: "18 de septiembre de 2026", en: "September 18, 2026", fr: "18 septembre 2026", de: "18. September 2026", ru: "18 сентября 2026", ua: "18 вересня 2026" },
  "How to Choose a Motorhome for Rent and Key Things to Consider": {
    es: "Cómo elegir una autocaravana de alquiler",
    fr: "Comment choisir un camping-car à louer",
    de: "Wie Sie das richtige Mietwohnmobil wählen",
    ru: "Как выбрать автодом в аренду",
    ua: "Як обрати автодім в оренду",
  },
  "Renting a motorhome for a trip is an exciting way to experience the freedom of...": {
    es: "Alquilar una autocaravana es una forma libre de recorrer la ruta a tu ritmo...",
    fr: "Louer un camping-car, c'est voyager librement à votre rythme...",
    de: "Ein Wohnmobil zu mieten heißt, die Strecke im eigenen Tempo zu fahren...",
    ru: "Аренда автодома — это свобода ехать по маршруту в своём темпе...",
    ua: "Оренда автодома — це свобода їхати маршрутом у своєму темпі...",
  },
  "January 30, 2024": { es: "20 de agosto de 2026", en: "August 20, 2026", fr: "20 août 2026", de: "20. August 2026", ru: "20 августа 2026", ua: "20 серпня 2026" },
  "View All Blogs": { es: "Ver todos los artículos", fr: "Voir tous les articles", de: "Alle Beiträge", ru: "Все статьи", ua: "Усі статті" },
  "Our contacts": { es: "Contacto", fr: "Nous contacter", de: "Kontakt", ru: "Контакты", ua: "Контакти" },
  "Have a question? Contact us in a convenient way": {
    es: "¿Tienes una pregunta? Escríbenos como te resulte más fácil",
    fr: "Une question ? Contactez-nous comme vous préférez",
    de: "Eine Frage? Melden Sie sich so, wie es für Sie am einfachsten ist",
    ru: "Есть вопрос? Напишите так, как вам удобнее",
    ua: "Є питання? Напишіть так, як вам зручніше",
  },
  "Phone Number": { es: "Teléfono", fr: "Téléphone", de: "Telefon", ru: "Телефон", ua: "Телефон" },
  "Email Address": { es: "Correo", fr: "E-mail", de: "E-Mail", ru: "Почта", ua: "Пошта" },
  Location: { es: "Dirección", fr: "Adresse", de: "Adresse", ru: "Адрес", ua: "Адреса" },
  Filters: { es: "Filtros", fr: "Filtres", de: "Filter", ru: "Фильтры", ua: "Фільтри" },
  "Contact Info": { es: "Datos de contacto", fr: "Coordonnées", de: "Kontaktdaten", ru: "Контактные данные", ua: "Контактні дані" },
  "Connect with us": { es: "Síguenos", fr: "Nous suivre", de: "Folgen Sie uns", ru: "Мы в сетях", ua: "Ми в мережах" },
  "Terms & Conditions": { es: "Términos y condiciones", fr: "Conditions générales", de: "AGB", ru: "Условия использования", ua: "Умови використання" },
  "Privacy Policy": { es: "Política de privacidad", fr: "Politique de confidentialité", de: "Datenschutz", ru: "Политика конфиденциальности", ua: "Політика конфіденційності" },
  "Copyright 2024-2025 © Caravanrent-Alicante S.L., All Rights Reserved.": {
    es: "Copyright 2024–2026 © Caravanrent-Alicante S.L. Todos los derechos reservados.",
    en: "Copyright 2024–2026 © Caravanrent-Alicante S.L., All Rights Reserved.",
    fr: "Copyright 2024–2026 © Caravanrent-Alicante S.L. Tous droits réservés.",
    de: "Copyright 2024–2026 © Caravanrent-Alicante S.L. Alle Rechte vorbehalten.",
    ru: "Copyright 2024–2026 © Caravanrent-Alicante S.L. Все права защищены.",
    ua: "Copyright 2024–2026 © Caravanrent-Alicante S.L. Усі права захищені.",
  },
  By: { es: "Al", fr: "En", de: "Durch", ru: "Пользуясь", ua: "Користуючись" },
  "using this website,": { es: "usar este sitio,", fr: "utilisant ce site,", de: "die Nutzung dieser Website", ru: "этим сайтом,", ua: "цим сайтом," },
  "you agree to our": { es: "aceptas nuestra", fr: "vous acceptez notre", de: "stimmen Sie unserer", ru: "вы соглашаетесь с нашей", ua: "ви погоджуєтеся з нашою" },
  "GDPR-compliant": { es: "conforme al RGPD", fr: "conforme au RGPD", de: "DSGVO-konformen", ru: "соответствующей GDPR", ua: "відповідною GDPR" },
  "privacy policy, which details how we collect, use, and protect your personal data.": {
    es: "política de privacidad, donde explicamos cómo recogemos, usamos y protegemos tus datos.",
    fr: "politique de confidentialité, qui explique comment nous collectons, utilisons et protégeons vos données.",
    de: "Datenschutzerklärung zu, in der steht, wie wir Ihre Daten erheben, nutzen und schützen.",
    ru: "политикой конфиденциальности: как мы собираем, используем и защищаем ваши данные.",
    ua: "політикою конфіденційності: як ми збираємо, використовуємо й захищаємо ваші дані.",
  },
  Accept: { es: "Aceptar", fr: "Accepter", de: "Akzeptieren", ru: "Принять", ua: "Прийняти" },
  Cancel: { es: "Cancelar", fr: "Annuler", de: "Abbrechen", ru: "Отмена", ua: "Скасувати" },
  "Please enter your phone number": { es: "Deja tu teléfono", fr: "Laissez votre numéro", de: "Bitte Ihre Telefonnummer", ru: "Оставьте номер телефона", ua: "Залиште номер телефону" },
  "and we call you back soon": { es: "y te llamamos enseguida", fr: "et nous vous rappelons vite", de: "und wir rufen bald zurück", ru: "и мы скоро перезвоним", ua: "і ми скоро передзвонимо" },
  "Waiting for call": { es: "Esperando la llamada", fr: "En attente d'appel", de: "Warten auf den Anruf", ru: "Жду звонка", ua: "Чекаю дзвінка" },
  "We are calling you to phone": { es: "Te estamos llamando", en: "We're calling you now", fr: "Nous vous appelons", de: "Wir rufen Sie an", ru: "Мы вам звоним", ua: "Ми вам телефонуємо" },
  "Thank you.": { es: "Gracias.", fr: "Merci.", de: "Danke.", ru: "Спасибо.", ua: "Дякуємо." },
  "We are call you back soon.": { es: "Te llamaremos muy pronto.", en: "We'll call you back soon.", fr: "Nous vous rappelons très vite.", de: "Wir rufen Sie bald zurück.", ru: "Скоро перезвоним.", ua: "Скоро передзвонимо." },
  "Email us": { es: "Escríbenos", fr: "Écrivez-nous", de: "Schreiben Sie uns", ru: "Написать нам", ua: "Написати нам" },
  "Contact us": { es: "Contacto", fr: "Contact", de: "Kontakt", ru: "Связаться", ua: "Зв'язатися" },
  "Caravan rental in Alicante": { es: "Alquiler de autocaravanas en Alicante", fr: "Location de camping-car à Alicante", de: "Wohnmobil mieten in Alicante", ru: "Аренда автодомов в Аликанте", ua: "Оренда автодомів в Аліканте" },
};

export function translate(text: string, lang: Lang): string {
  const row = phrases[text] ?? extraPhrases[text];
  if (!row) return text;
  return row[lang] ?? text;
}

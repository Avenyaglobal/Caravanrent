import { pagePath, type Lang } from "@/mirror/locales";

export const placeSlugs = [
  "alquiler-autocaravana-alicante",
  "alquiler-autocaravana-torrevieja",
  "alquiler-autocaravana-elche",
  "alquiler-autocaravana-aeropuerto-alicante",
] as const;

export type PlaceSlug = (typeof placeSlugs)[number];

type Copy = {
  title: string;
  description: string;
  kicker: string;
  h1: string;
  lead: string;
  facts: [string, string][];
  paragraphs: string[];
  fleetTitle: string;
  pricesTitle: string;
  priceNote: string;
  moreTitle: string;
  cta: string;
  addressTitle: string;
  address: string;
};

const shared = {
  es: {
    fleetTitle: "Autocaravanas disponibles",
    pricesTitle: "Precio por día",
    priceNote: "El primer precio es cambio manual (Ford y Peugeot). El segundo es automático (Fiat). Mínimo 3 días. Limpieza final 50 €. Depósito 800 € en manual y 1.200 € en automático. Kilómetros ilimitados en España y Starlink incluidos.",
    moreTitle: "Otras recogidas",
    cta: "Ver fechas",
    manual: "Manual",
    auto: "Automático",
    rows: [
      ["Abril – mayo", "135 €", "145 €"],
      ["Junio – julio", "145 €", "155 €"],
      ["Agosto", "175 €", "185 €"],
      ["Septiembre", "145 €", "155 €"],
      ["Octubre – marzo", "120 €", "130 €"],
    ],
  },
  en: {
    fleetTitle: "Motorhomes available",
    pricesTitle: "Price per day",
    priceNote: "The first price is manual (Ford and Peugeot). The second is automatic (Fiat). Minimum 3 days. Final clean 50 €. Deposit 800 € for manual and 1,200 € for automatic. Unlimited mileage in Spain and Starlink are included.",
    moreTitle: "Other pickup points",
    cta: "See dates",
    manual: "Manual",
    auto: "Automatic",
    rows: [
      ["April – May", "135 €", "145 €"],
      ["June – July", "145 €", "155 €"],
      ["August", "175 €", "185 €"],
      ["September", "145 €", "155 €"],
      ["October – March", "120 €", "130 €"],
    ],
  },
  fr: {
    fleetTitle: "Camping-cars disponibles",
    pricesTitle: "Prix par jour",
    priceNote: "Le premier prix est la boîte manuelle (Ford et Peugeot). Le second est l'automatique (Fiat). Minimum 3 jours. Nettoyage final 50 €. Caution 800 € en manuel et 1 200 € en automatique. Kilométrage illimité en Espagne et Starlink inclus.",
    moreTitle: "Autres prises en charge",
    cta: "Voir les dates",
    manual: "Manuelle",
    auto: "Automatique",
    rows: [
      ["Avril – mai", "135 €", "145 €"],
      ["Juin – juillet", "145 €", "155 €"],
      ["Août", "175 €", "185 €"],
      ["Septembre", "145 €", "155 €"],
      ["Octobre – mars", "120 €", "130 €"],
    ],
  },
  de: {
    fleetTitle: "Verfügbare Wohnmobile",
    pricesTitle: "Preis pro Tag",
    priceNote: "Der erste Preis ist Schaltung (Ford und Peugeot). Der zweite ist Automatik (Fiat). Mindestens 3 Tage. Endreinigung 50 €. Kaution 800 € bei Schaltung und 1.200 € bei Automatik. Unbegrenzte Kilometer in Spanien und Starlink sind inklusive.",
    moreTitle: "Andere Abholorte",
    cta: "Termine ansehen",
    manual: "Schaltung",
    auto: "Automatik",
    rows: [
      ["April – Mai", "135 €", "145 €"],
      ["Juni – Juli", "145 €", "155 €"],
      ["August", "175 €", "185 €"],
      ["September", "145 €", "155 €"],
      ["Oktober – März", "120 €", "130 €"],
    ],
  },
  ru: {
    fleetTitle: "Доступные автодома",
    pricesTitle: "Цена за день",
    priceNote: "Первая цена — механика (Ford и Peugeot). Вторая — автомат (Fiat). Минимум 3 дня. Финальная уборка 50 €. Депозит 800 € на механике и 1 200 € на автомате. Безлимитный пробег по Испании и Starlink входят в стоимость.",
    moreTitle: "Другие места выдачи",
    cta: "Смотреть даты",
    manual: "Механика",
    auto: "Автомат",
    rows: [
      ["Апрель – май", "135 €", "145 €"],
      ["Июнь – июль", "145 €", "155 €"],
      ["Август", "175 €", "185 €"],
      ["Сентябрь", "145 €", "155 €"],
      ["Октябрь – март", "120 €", "130 €"],
    ],
  },
  ua: {
    fleetTitle: "Доступні автодоми",
    pricesTitle: "Ціна за день",
    priceNote: "Перша ціна — механіка (Ford і Peugeot). Друга — автомат (Fiat). Мінімум 3 дні. Фінальне прибирання 50 €. Депозит 800 € на механіці та 1 200 € на автоматі. Безлімітний пробіг Іспанією і Starlink входять у вартість.",
    moreTitle: "Інші місця видачі",
    cta: "Дивитися дати",
    manual: "Механіка",
    auto: "Автомат",
    rows: [
      ["Квітень – травень", "135 €", "145 €"],
      ["Червень – липень", "145 €", "155 €"],
      ["Серпень", "175 €", "185 €"],
      ["Вересень", "145 €", "155 €"],
      ["Жовтень – березень", "120 €", "130 €"],
    ],
  },
} as const;

const names: Record<PlaceSlug, Record<Lang, string>> = {
  "alquiler-autocaravana-alicante": {
    es: "Alicante",
    en: "Alicante",
    fr: "Alicante",
    de: "Alicante",
    ru: "Аликанте",
    ua: "Аліканте",
  },
  "alquiler-autocaravana-torrevieja": {
    es: "Torrevieja",
    en: "Torrevieja",
    fr: "Torrevieja",
    de: "Torrevieja",
    ru: "Торревьеха",
    ua: "Торрев'єха",
  },
  "alquiler-autocaravana-elche": {
    es: "Elche",
    en: "Elche",
    fr: "Elche",
    de: "Elche",
    ru: "Эльче",
    ua: "Ельче",
  },
  "alquiler-autocaravana-aeropuerto-alicante": {
    es: "Aeropuerto de Alicante",
    en: "Alicante Airport",
    fr: "Aéroport d'Alicante",
    de: "Flughafen Alicante",
    ru: "Аэропорт Аликанте",
    ua: "Аеропорт Аліканте",
  },
};

const pages: Record<PlaceSlug, Record<Lang, Copy>> = {
  "alquiler-autocaravana-alicante": {
    es: {
      title: "Alquiler de autocaravana en Alicante | Caravan Rent",
      description: "Recogida y devolución en la ciudad de Alicante, sin suplemento. Castillo, Explanada y Postiguet. El aeropuerto es otra entrega, también gratis.",
      kicker: "Recogida en la ciudad",
      h1: "Alquiler de autocaravana en Alicante",
      lead: "Entregamos y recogemos la autocaravana en la ciudad de Alicante, sin coste extra. No es el aeropuerto: si llegas en avión, esa entrega también es gratis y tiene su propia página.",
      addressTitle: "Dónde quedamos",
      address: "En Alicante ciudad el punto se acuerda al confirmar. La base está en calle La Sagra 92, Torrevieja.",
      facts: [
        ["En la ciudad", "Centro, puerto o la zona que te venga mejor. Lo cerramos contigo."],
        ["Sin suplemento", "La entrega y la devolución en Alicante no se cobran aparte."],
        ["Al lado del mar", "Santa Bárbara, la Explanada, el Postiguet y el puerto quedan a un paso."],
      ],
      paragraphs: [
        "Alicante es la capital. Desde aquí sales hacia la sierra de Aitana, Santa Pola, la Vila Joiosa o bajas por la costa hasta Guardamar y Torrevieja. Tabarca queda a un corto trayecto en barco si el día acompaña.",
        "No hay oficina abierta en el centro. Al confirmar la solicitud te decimos el punto y la hora. El mínimo es de 3 días, con los mismos tres vehículos. El aeropuerto de Alicante-Elche es otra entrega, también gratis: si el vuelo te deja allí, mejor quedar en el aeropuerto que cruzar hasta la ciudad.",
      ],
      fleetTitle: shared.es.fleetTitle,
      pricesTitle: shared.es.pricesTitle,
      priceNote: `${shared.es.priceNote} Peugeot, del 19 de octubre al 28 de diciembre de 2026: 100 € al día.`,
      moreTitle: shared.es.moreTitle,
      cta: shared.es.cta,
    },
    en: {
      title: "Motorhome rental in Alicante | Caravan Rent",
      description: "Pickup and return in Alicante city, at no extra cost. Castle, Explanada and Postiguet beach. The airport is a separate handover, also free.",
      kicker: "Pickup in the city",
      h1: "Motorhome rental in Alicante",
      lead: "We hand over and collect the motorhome in Alicante city, at no extra cost. This is not the airport: if you land there, that handover is also free and has its own page.",
      addressTitle: "Where we meet",
      address: "In Alicante city the spot is agreed when we confirm. The base is Calle La Sagra 92, Torrevieja.",
      facts: [
        ["In the city", "Centre, port or whichever area suits you. We agree it with you."],
        ["No surcharge", "Pickup and return in Alicante are not charged on top."],
        ["By the sea", "Santa Barbara castle, the Explanada, Postiguet beach and the port are close."],
      ],
      paragraphs: [
        "Alicante is the provincial capital. From here you head to the Aitana mountains, Santa Pola, La Vila Joiosa, or down the coast to Guardamar and Torrevieja. Tabarca is a short boat ride when the day is right.",
        "There is no walk-in office in the centre. When we confirm the request we send the spot and the time. The minimum is 3 days, with the same three vehicles. Alicante-Elche Airport is a separate handover, also free: if your flight lands there, meet at the airport rather than crossing into the city.",
      ],
      fleetTitle: shared.en.fleetTitle,
      pricesTitle: shared.en.pricesTitle,
      priceNote: `${shared.en.priceNote} Peugeot, from 19 October to 28 December 2026: €100 a day.`,
      moreTitle: shared.en.moreTitle,
      cta: shared.en.cta,
    },
    fr: {
      title: "Location de camping-car à Alicante | Caravan Rent",
      description: "Prise en charge et retour dans la ville d'Alicante, sans supplément. Château, Explanada et plage du Postiguet. L'aéroport est une autre remise, elle aussi gratuite.",
      kicker: "Prise en charge en ville",
      h1: "Location de camping-car à Alicante",
      lead: "Nous remettons et récupérons le camping-car dans la ville d'Alicante, sans frais. Ce n'est pas l'aéroport : si vous arrivez en avion, cette remise est aussi gratuite et a sa propre page.",
      addressTitle: "Où l'on se retrouve",
      address: "À Alicante ville, le point est fixé à la confirmation. La base est calle La Sagra 92, Torrevieja.",
      facts: [
        ["En ville", "Centre, port ou le quartier qui vous arrange. On le décide ensemble."],
        ["Sans supplément", "La remise et le retour à Alicante ne sont pas facturés en plus."],
        ["Face à la mer", "Santa Barbara, l'Explanada, le Postiguet et le port sont tout près."],
      ],
      paragraphs: [
        "Alicante est la capitale de la province. De là, on part vers la sierra d'Aitana, Santa Pola, la Vila Joiosa, ou l'on descend la côte jusqu'à Guardamar et Torrevieja. Tabarca est une courte traversée en bateau quand le temps s'y prête.",
        "Il n'y a pas de bureau ouvert dans le centre. À la confirmation, nous indiquons le point et l'heure. Le minimum est de 3 jours, avec les trois mêmes véhicules. L'aéroport d'Alicante-Elche est une autre remise, elle aussi gratuite : si le vol vous y laisse, mieux vaut s'y retrouver que de traverser jusqu'en ville.",
      ],
      fleetTitle: shared.fr.fleetTitle,
      pricesTitle: shared.fr.pricesTitle,
      priceNote: `${shared.fr.priceNote} Peugeot, du 19 octobre au 28 décembre 2026 : 100 € par jour.`,
      moreTitle: shared.fr.moreTitle,
      cta: shared.fr.cta,
    },
    de: {
      title: "Wohnmobil in Alicante mieten | Caravan Rent",
      description: "Abholung und Rückgabe in der Stadt Alicante, ohne Aufpreis. Burg, Explanada und Strand Postiguet. Der Flughafen ist eine eigene Übergabe, ebenfalls kostenlos.",
      kicker: "Abholung in der Stadt",
      h1: "Wohnmobil in Alicante mieten",
      lead: "Wir übergeben und holen das Wohnmobil in der Stadt Alicante ab, ohne Aufpreis. Das ist nicht der Flughafen: wenn Sie dort landen, ist auch diese Übergabe kostenlos und hat eine eigene Seite.",
      addressTitle: "Wo wir uns treffen",
      address: "In der Stadt Alicante wird der Punkt mit der Bestätigung vereinbart. Die Basis ist Calle La Sagra 92, Torrevieja.",
      facts: [
        ["In der Stadt", "Zentrum, Hafen oder die Gegend, die Ihnen passt. Das sprechen wir ab."],
        ["Ohne Aufpreis", "Übergabe und Rückgabe in Alicante werden nicht extra berechnet."],
        ["Am Meer", "Burg Santa Barbara, die Explanada, der Strand Postiguet und der Hafen liegen nah."],
      ],
      paragraphs: [
        "Alicante ist die Provinzhauptstadt. Von hier geht es in die Sierra de Aitana, nach Santa Pola, La Vila Joiosa oder die Küste hinunter nach Guardamar und Torrevieja. Tabarca ist bei gutem Wetter eine kurze Bootsfahrt.",
        "Ein offenes Büro in der Innenstadt gibt es nicht. Mit der Bestätigung nennen wir Punkt und Uhrzeit. Mindestens 3 Tage, dieselben drei Fahrzeuge. Der Flughafen Alicante-Elche ist eine eigene Übergabe, ebenfalls kostenlos: wenn der Flug Sie dort lässt, treffen wir uns besser am Flughafen als quer durch die Stadt.",
      ],
      fleetTitle: shared.de.fleetTitle,
      pricesTitle: shared.de.pricesTitle,
      priceNote: `${shared.de.priceNote} Peugeot, vom 19. Oktober bis 28. Dezember 2026: 100 € pro Tag.`,
      moreTitle: shared.de.moreTitle,
      cta: shared.de.cta,
    },
    ru: {
      title: "Аренда автодома в Аликанте | Caravan Rent",
      description: "Выдача и возврат в городе Аликанте, без доплаты. Замок, Эспланада и пляж Постигет. Аэропорт — отдельная выдача, тоже бесплатно.",
      kicker: "Выдача в городе",
      h1: "Аренда автодома в Аликанте",
      lead: "Выдаём и забираем автодом в городе Аликанте, без доплаты. Это не аэропорт: если вы прилетаете, выдача там тоже бесплатная и у неё своя страница.",
      addressTitle: "Где встречаемся",
      address: "В городе Аликанте точку называем при подтверждении. База: Calle La Sagra 92, Torrevieja.",
      facts: [
        ["В городе", "Центр, порт или район, который вам удобнее. Договариваемся с вами."],
        ["Без доплаты", "Выдача и возврат в Аликанте ничего не добавляют к цене."],
        ["У моря", "Замок Санта-Барбара, Эспланада, пляж Постигет и порт рядом."],
      ],
      paragraphs: [
        "Аликанте — столица провинции. Отсюда дорога в горы Айтаны, в Санта-Полу, Вильяхойосу или вниз по побережью в Гуардамар и Торревьеху. До острова Табарка в хороший день короткий путь на пароме.",
        "Открытого офиса в центре нет. При подтверждении заявки пишем точку и время. Минимум 3 дня, те же три автодома. Аэропорт Аликанте-Эльче — отдельная выдача, тоже бесплатно: если рейс садится там, удобнее встретиться в аэропорту, а не ехать в город.",
      ],
      fleetTitle: shared.ru.fleetTitle,
      pricesTitle: shared.ru.pricesTitle,
      priceNote: `${shared.ru.priceNote} Peugeot с 19 октября по 28 декабря 2026: 100 € в день.`,
      moreTitle: shared.ru.moreTitle,
      cta: shared.ru.cta,
    },
    ua: {
      title: "Оренда автодома в Аліканте | Caravan Rent",
      description: "Видача і повернення в місті Аліканте, без доплати. Замок, Еспланада і пляж Постігет. Аеропорт — окрема видача, теж безкоштовно.",
      kicker: "Видача в місті",
      h1: "Оренда автодома в Аліканте",
      lead: "Видаємо і забираємо автодім у місті Аліканте, без доплати. Це не аеропорт: якщо ви прилітаєте, видача там теж безкоштовна і в неї своя сторінка.",
      addressTitle: "Де зустрічаємося",
      address: "У місті Аліканте точку називаємо під час підтвердження. База: Calle La Sagra 92, Torrevieja.",
      facts: [
        ["У місті", "Центр, порт або район, який вам зручніший. Домовляємося з вами."],
        ["Без доплати", "Видача і повернення в Аліканте нічого не додають до ціни."],
        ["Біля моря", "Замок Санта-Барбара, Еспланада, пляж Постігет і порт поруч."],
      ],
      paragraphs: [
        "Аліканте — столиця провінції. Звідси дорога в гори Айтани, у Санта-Полу, Вільяхойосу або вниз узбережжям у Гуардамар і Торрев'єху. До острова Табарка в гарний день коротка дорога поромом.",
        "Відкритого офісу в центрі немає. Під час підтвердження заявки пишемо точку і час. Мінімум 3 дні, ті самі три автодоми. Аеропорт Аліканте-Ельче — окрема видача, теж безкоштовно: якщо рейс сідає там, зручніше зустрітися в аеропорту, а не їхати в місто.",
      ],
      fleetTitle: shared.ua.fleetTitle,
      pricesTitle: shared.ua.pricesTitle,
      priceNote: `${shared.ua.priceNote} Peugeot з 19 жовтня по 28 грудня 2026: 100 € на день.`,
      moreTitle: shared.ua.moreTitle,
      cta: shared.ua.cta,
    },
  },
  "alquiler-autocaravana-torrevieja": {
    es: {
      title: "Alquiler de autocaravana en Torrevieja | Caravan Rent",
      description: "Recogida y devolución en nuestra base de Torrevieja, calle La Sagra 92. Autocaravanas nuevas, kilómetros ilimitados y aeropuerto de Alicante gratis.",
      kicker: "Recogida y devolución",
      h1: "Alquiler de autocaravana en Torrevieja",
      lead: "La base está en Torrevieja. Recoges y devuelves la autocaravana en calle La Sagra 92, Las Fuentes II. También podemos entregar en Elche o en el aeropuerto de Alicante, sin coste.",
      addressTitle: "Dónde estamos",
      address: "Calle La Sagra 92, Las Fuentes II, 03185 Torrevieja",
      facts: [
        ["Base propia", "La entrega se hace aquí, con tiempo para explicarte la autocaravana."],
        ["Playa y lagunas", "La Mata, las salinas y el centro de Torrevieja quedan cerca."],
        ["Sin suplemento", "Elche y el aeropuerto de Alicante-Elche también están incluidos."],
      ],
      paragraphs: [
        "Torrevieja es el punto de salida habitual. No hace falta ir hasta Alicante ciudad: la base está en la urbanización Las Fuentes II, con acceso fácil en coche.",
        "Al confirmar la solicitud te decimos la hora de entrega. El mínimo es de 3 días. El precio del día depende del mes y de si el vehículo es manual o automático.",
      ],
      fleetTitle: shared.es.fleetTitle,
      pricesTitle: shared.es.pricesTitle,
      priceNote: shared.es.priceNote,
      moreTitle: shared.es.moreTitle,
      cta: shared.es.cta,
    },
    en: {
      title: "Motorhome rental in Torrevieja | Caravan Rent",
      description: "Pickup and return at our Torrevieja base, Calle La Sagra 92. New motorhomes, unlimited mileage, and free Alicante Airport handover.",
      kicker: "Pickup and return",
      h1: "Motorhome rental in Torrevieja",
      lead: "The base is in Torrevieja. You pick up and return the motorhome at Calle La Sagra 92, Las Fuentes II. We can also hand it over in Elche or at Alicante Airport, at no extra cost.",
      addressTitle: "Where we are",
      address: "Calle La Sagra 92, Las Fuentes II, 03185 Torrevieja",
      facts: [
        ["Our own base", "Handover happens here, with time to walk you through the motorhome."],
        ["Beach and lagoons", "La Mata, the salt lakes and Torrevieja centre are close."],
        ["No extra fee", "Elche and Alicante-Elche Airport are included as well."],
      ],
      paragraphs: [
        "Torrevieja is the usual starting point. You do not need to go into Alicante city: the base is in Las Fuentes II, easy to reach by car.",
        "When we confirm the request we agree the handover time. The minimum stay is 3 days. The daily price depends on the month and on whether the vehicle is manual or automatic.",
      ],
      fleetTitle: shared.en.fleetTitle,
      pricesTitle: shared.en.pricesTitle,
      priceNote: shared.en.priceNote,
      moreTitle: shared.en.moreTitle,
      cta: shared.en.cta,
    },
    fr: {
      title: "Location de camping-car à Torrevieja | Caravan Rent",
      description: "Prise en charge et retour à notre base de Torrevieja, calle La Sagra 92. Camping-cars neufs, kilométrage illimité et aéroport d'Alicante gratuit.",
      kicker: "Prise en charge et retour",
      h1: "Location de camping-car à Torrevieja",
      lead: "La base est à Torrevieja. Vous prenez et rendez le camping-car au calle La Sagra 92, Las Fuentes II. Nous pouvons aussi le remettre à Elche ou à l'aéroport d'Alicante, sans frais.",
      addressTitle: "Où nous sommes",
      address: "Calle La Sagra 92, Las Fuentes II, 03185 Torrevieja",
      facts: [
        ["Base à nous", "La remise se fait ici, avec le temps d'expliquer le véhicule."],
        ["Plage et lagunes", "La Mata, les salines et le centre de Torrevieja sont proches."],
        ["Sans supplément", "Elche et l'aéroport d'Alicante-Elche sont aussi inclus."],
      ],
      paragraphs: [
        "Torrevieja est le départ habituel. Pas besoin d'aller jusqu'à Alicante ville : la base est à Las Fuentes II, facile d'accès en voiture.",
        "À la confirmation, nous fixons l'heure. Le minimum est de 3 jours. Le prix du jour dépend du mois et de la boîte, manuelle ou automatique.",
      ],
      fleetTitle: shared.fr.fleetTitle,
      pricesTitle: shared.fr.pricesTitle,
      priceNote: shared.fr.priceNote,
      moreTitle: shared.fr.moreTitle,
      cta: shared.fr.cta,
    },
    de: {
      title: "Wohnmobil mieten in Torrevieja | Caravan Rent",
      description: "Abholung und Rückgabe an unserer Basis in Torrevieja, Calle La Sagra 92. Neue Wohnmobile, unbegrenzte Kilometer und kostenloser Flughafen Alicante.",
      kicker: "Abholung und Rückgabe",
      h1: "Wohnmobil mieten in Torrevieja",
      lead: "Die Basis liegt in Torrevieja. Sie holen das Wohnmobil in der Calle La Sagra 92, Las Fuentes II, ab und bringen es dorthin zurück. Elche und der Flughafen Alicante sind ohne Aufpreis möglich.",
      addressTitle: "Wo wir sind",
      address: "Calle La Sagra 92, Las Fuentes II, 03185 Torrevieja",
      facts: [
        ["Eigene Basis", "Die Übergabe findet hier statt, mit Zeit für die Erklärung."],
        ["Strand und Lagunen", "La Mata, die Salinen und das Zentrum von Torrevieja liegen nah."],
        ["Ohne Aufpreis", "Elche und der Flughafen Alicante-Elche sind ebenfalls inklusive."],
      ],
      paragraphs: [
        "Torrevieja ist der übliche Start. Sie müssen nicht in die Stadt Alicante fahren: die Basis liegt in Las Fuentes II und ist mit dem Auto gut erreichbar.",
        "Mit der Bestätigung nennen wir die Uhrzeit. Mindestens 3 Tage. Der Tagespreis hängt vom Monat und vom Getriebe ab.",
      ],
      fleetTitle: shared.de.fleetTitle,
      pricesTitle: shared.de.pricesTitle,
      priceNote: shared.de.priceNote,
      moreTitle: shared.de.moreTitle,
      cta: shared.de.cta,
    },
    ru: {
      title: "Аренда автодома в Торревьехе | Caravan Rent",
      description: "Выдача и возврат на базе в Торревьехе, улица Ла Сагра 92. Новые автодома, безлимитный пробег и бесплатная выдача в аэропорту Аликанте.",
      kicker: "Выдача и возврат",
      h1: "Аренда автодома в Торревьехе",
      lead: "База в Торревьехе. Автодом получаете и возвращаете на улице Ла Сагра 92, Лас-Фуэнтес II. Можем также выдать в Эльче или в аэропорту Аликанте, без доплаты.",
      addressTitle: "Где мы",
      address: "Calle La Sagra 92, Las Fuentes II, 03185 Torrevieja",
      facts: [
        ["Своя база", "Выдача здесь, с временем, чтобы показать автодом."],
        ["Пляж и лагуны", "Рядом Ла-Мата, солёные озёра и центр Торревьехи."],
        ["Без доплаты", "Эльче и аэропорт Аликанте тоже входят в выдачу."],
      ],
      paragraphs: [
        "Торревьеха — обычная точка старта. В город Аликанте ехать не нужно: база в Лас-Фуэнтес II, до неё удобно добраться на машине.",
        "После подтверждения заявки называем время выдачи. Минимум 3 дня. Цена дня зависит от месяца и от коробки: механика или автомат.",
      ],
      fleetTitle: shared.ru.fleetTitle,
      pricesTitle: shared.ru.pricesTitle,
      priceNote: shared.ru.priceNote,
      moreTitle: shared.ru.moreTitle,
      cta: shared.ru.cta,
    },
    ua: {
      title: "Оренда автодома в Торрев'єсі | Caravan Rent",
      description: "Видача і повернення на базі в Торрев'єсі, вулиця Ла Сагра 92. Нові автодоми, безлімітний пробіг і безкоштовна видача в аеропорту Аліканте.",
      kicker: "Видача і повернення",
      h1: "Оренда автодома в Торрев'єсі",
      lead: "База в Торрев'єсі. Автодім отримуєте і повертаєте на вулиці Ла Сагра 92, Лас-Фуентес II. Можемо також видати в Ельче або в аеропорту Аліканте, без доплати.",
      addressTitle: "Де ми",
      address: "Calle La Sagra 92, Las Fuentes II, 03185 Torrevieja",
      facts: [
        ["Своя база", "Видача тут, з часом, щоб показати автодім."],
        ["Пляж і лагуни", "Поруч Ла-Мата, солоні озера і центр Торрев'єхи."],
        ["Без доплати", "Ельче й аеропорт Аліканте теж входять у видачу."],
      ],
      paragraphs: [
        "Торрев'єха — звична точка старту. У місто Аліканте їхати не потрібно: база в Лас-Фуентес II, до неї зручно дістатися машиною.",
        "Після підтвердження заявки називаємо час видачі. Мінімум 3 дні. Ціна дня залежить від місяця і від коробки: механіка чи автомат.",
      ],
      fleetTitle: shared.ua.fleetTitle,
      pricesTitle: shared.ua.pricesTitle,
      priceNote: shared.ua.priceNote,
      moreTitle: shared.ua.moreTitle,
      cta: shared.ua.cta,
    },
  },
  "alquiler-autocaravana-elche": {
    es: {
      title: "Alquiler de autocaravana en Elche | Caravan Rent",
      description: "Recogida y devolución de autocaravana en Elche, sin suplemento. Entre Alicante y Torrevieja. Aeropuerto de Alicante gratis.",
      kicker: "Recogida y devolución",
      h1: "Alquiler de autocaravana en Elche",
      lead: "Entregamos y recogemos la autocaravana en Elche, sin coste añadido. El punto exacto lo acordamos al confirmar la solicitud. La base está en Torrevieja, calle La Sagra 92.",
      addressTitle: "Punto de entrega",
      address: "En Elche, el lugar se acuerda al confirmar. Base: calle La Sagra 92, Torrevieja",
      facts: [
        ["En Elche", "No tienes que desplazarte hasta la base si Elche te viene mejor."],
        ["Entre dos costas", "Sales hacia Alicante, Santa Pola, Torrevieja o el interior."],
        ["Aeropuerto cerca", "El aeropuerto de Alicante-Elche también está incluido, gratis."],
      ],
      paragraphs: [
        "Elche queda entre la ciudad de Alicante y Torrevieja. Sirve si duermes aquí, si vienes del Palmeral o si el aeropuerto te deja más cerca de Elche que de nuestra base.",
        "No tenemos una segunda oficina con calle propia en Elche. Al confirmar te decimos el punto y la hora. El resto es igual: 3 días mínimo, kilómetros ilimitados en España y las mismas tres autocaravanas.",
      ],
      fleetTitle: shared.es.fleetTitle,
      pricesTitle: shared.es.pricesTitle,
      priceNote: shared.es.priceNote,
      moreTitle: shared.es.moreTitle,
      cta: shared.es.cta,
    },
    en: {
      title: "Motorhome rental in Elche | Caravan Rent",
      description: "Motorhome pickup and return in Elche, at no extra cost. Between Alicante and Torrevieja. Free Alicante Airport handover.",
      kicker: "Pickup and return",
      h1: "Motorhome rental in Elche",
      lead: "We hand over and collect the motorhome in Elche, at no extra cost. The exact spot is agreed when we confirm the request. The base is in Torrevieja, Calle La Sagra 92.",
      addressTitle: "Handover point",
      address: "In Elche, the place is agreed on confirmation. Base: Calle La Sagra 92, Torrevieja",
      facts: [
        ["In Elche", "You do not have to come to the base if Elche suits you better."],
        ["Between two coasts", "Leave towards Alicante, Santa Pola, Torrevieja or inland."],
        ["Airport nearby", "Alicante-Elche Airport is included too, free of charge."],
      ],
      paragraphs: [
        "Elche sits between Alicante city and Torrevieja. It works if you stay here, if you are coming from the palm grove, or if the airport drops you closer to Elche than to our base.",
        "We do not have a second office with its own street address in Elche. On confirmation we tell you the point and the time. Everything else is the same: 3-day minimum, unlimited mileage in Spain and the same three motorhomes.",
      ],
      fleetTitle: shared.en.fleetTitle,
      pricesTitle: shared.en.pricesTitle,
      priceNote: shared.en.priceNote,
      moreTitle: shared.en.moreTitle,
      cta: shared.en.cta,
    },
    fr: {
      title: "Location de camping-car à Elche | Caravan Rent",
      description: "Prise en charge et retour d'un camping-car à Elche, sans supplément. Entre Alicante et Torrevieja. Aéroport d'Alicante gratuit.",
      kicker: "Prise en charge et retour",
      h1: "Location de camping-car à Elche",
      lead: "Nous remettons et récupérons le camping-car à Elche, sans frais. Le point exact est fixé à la confirmation. La base est à Torrevieja, calle La Sagra 92.",
      addressTitle: "Point de remise",
      address: "À Elche, le lieu est fixé à la confirmation. Base : calle La Sagra 92, Torrevieja",
      facts: [
        ["À Elche", "Pas besoin de venir à la base si Elche vous arrange mieux."],
        ["Entre deux côtes", "Départ vers Alicante, Santa Pola, Torrevieja ou l'intérieur."],
        ["Aéroport proche", "L'aéroport d'Alicante-Elche est aussi inclus, gratuitement."],
      ],
      paragraphs: [
        "Elche se trouve entre Alicante ville et Torrevieja. C'est pratique si vous dormez ici, si vous venez de la palmeraie, ou si l'aéroport vous laisse plus près d'Elche que de la base.",
        "Nous n'avons pas de second bureau avec une adresse propre à Elche. À la confirmation, nous indiquons le point et l'heure. Le reste ne change pas : 3 jours minimum, kilométrage illimité en Espagne et les trois mêmes camping-cars.",
      ],
      fleetTitle: shared.fr.fleetTitle,
      pricesTitle: shared.fr.pricesTitle,
      priceNote: shared.fr.priceNote,
      moreTitle: shared.fr.moreTitle,
      cta: shared.fr.cta,
    },
    de: {
      title: "Wohnmobil mieten in Elche | Caravan Rent",
      description: "Wohnmobil-Abholung und Rückgabe in Elche, ohne Aufpreis. Zwischen Alicante und Torrevieja. Flughafen Alicante kostenlos.",
      kicker: "Abholung und Rückgabe",
      h1: "Wohnmobil mieten in Elche",
      lead: "Wir übergeben und holen das Wohnmobil in Elche ab, ohne Aufpreis. Den genauen Punkt nennen wir mit der Bestätigung. Die Basis liegt in Torrevieja, Calle La Sagra 92.",
      addressTitle: "Übergabepunkt",
      address: "In Elche wird der Ort bei der Bestätigung vereinbart. Basis: Calle La Sagra 92, Torrevieja",
      facts: [
        ["In Elche", "Sie müssen nicht zur Basis kommen, wenn Elche besser liegt."],
        ["Zwischen zwei Küsten", "Abfahrt Richtung Alicante, Santa Pola, Torrevieja oder ins Landesinnere."],
        ["Flughafen nah", "Der Flughafen Alicante-Elche ist ebenfalls inklusive und kostenlos."],
      ],
      paragraphs: [
        "Elche liegt zwischen der Stadt Alicante und Torrevieja. Das passt, wenn Sie hier übernachten, vom Palmenhain kommen oder der Flughafen Sie näher an Elche lässt als an unsere Basis.",
        "Ein zweites Büro mit eigener Straße in Elche haben wir nicht. Mit der Bestätigung nennen wir Punkt und Uhrzeit. Der Rest ist gleich: mindestens 3 Tage, unbegrenzte Kilometer in Spanien und dieselben drei Wohnmobile.",
      ],
      fleetTitle: shared.de.fleetTitle,
      pricesTitle: shared.de.pricesTitle,
      priceNote: shared.de.priceNote,
      moreTitle: shared.de.moreTitle,
      cta: shared.de.cta,
    },
    ru: {
      title: "Аренда автодома в Эльче | Caravan Rent",
      description: "Выдача и возврат автодома в Эльче, без доплаты. Между Аликанте и Торревьехой. Аэропорт Аликанте бесплатно.",
      kicker: "Выдача и возврат",
      h1: "Аренда автодома в Эльче",
      lead: "Выдаём и забираем автодом в Эльче, без доплаты. Точную точку называем при подтверждении заявки. База в Торревьехе, улица Ла Сагра 92.",
      addressTitle: "Точка выдачи",
      address: "В Эльче место согласуем при подтверждении. База: Calle La Sagra 92, Torrevieja",
      facts: [
        ["В Эльче", "На базу ехать не нужно, если вам удобнее Эльче."],
        ["Между двумя берегами", "Выезд к Аликанте, Санта-Поле, Торревьехе или вглубь."],
        ["Аэропорт рядом", "Аэропорт Аликанте-Эльче тоже входит, бесплатно."],
      ],
      paragraphs: [
        "Эльче между городом Аликанте и Торревьехой. Удобно, если ночуете здесь, идёте от пальмовой рощи или аэропорт оставляет вас ближе к Эльче, чем к базе.",
        "Второго офиса с отдельным адресом в Эльче нет. При подтверждении пишем точку и время. Остальное то же: минимум 3 дня, безлимит по Испании и те же три автодома.",
      ],
      fleetTitle: shared.ru.fleetTitle,
      pricesTitle: shared.ru.pricesTitle,
      priceNote: shared.ru.priceNote,
      moreTitle: shared.ru.moreTitle,
      cta: shared.ru.cta,
    },
    ua: {
      title: "Оренда автодома в Ельче | Caravan Rent",
      description: "Видача і повернення автодома в Ельче, без доплати. Між Аліканте і Торрев'єхою. Аеропорт Аліканте безкоштовно.",
      kicker: "Видача і повернення",
      h1: "Оренда автодома в Ельче",
      lead: "Видаємо і забираємо автодім в Ельче, без доплати. Точну точку називаємо під час підтвердження заявки. База в Торрев'єсі, вулиця Ла Сагра 92.",
      addressTitle: "Точка видачі",
      address: "В Ельче місце погоджуємо під час підтвердження. База: Calle La Sagra 92, Torrevieja",
      facts: [
        ["В Ельче", "На базу їхати не потрібно, якщо вам зручніше Ельче."],
        ["Між двома берегами", "Виїзд до Аліканте, Санта-Поли, Торрев'єхи або вглиб."],
        ["Аеропорт поруч", "Аеропорт Аліканте-Ельче теж входить, безкоштовно."],
      ],
      paragraphs: [
        "Ельче між містом Аліканте і Торрев'єхою. Зручно, якщо ночуєте тут, ідете від пальмового гаю або аеропорт залишає вас ближче до Ельче, ніж до бази.",
        "Другого офісу з окремою адресою в Ельче немає. Під час підтвердження пишемо точку і час. Решта те саме: мінімум 3 дні, безліміт Іспанією і ті самі три автодоми.",
      ],
      fleetTitle: shared.ua.fleetTitle,
      pricesTitle: shared.ua.pricesTitle,
      priceNote: shared.ua.priceNote,
      moreTitle: shared.ua.moreTitle,
      cta: shared.ua.cta,
    },
  },
  "alquiler-autocaravana-aeropuerto-alicante": {
    es: {
      title: "Alquiler de autocaravana en el aeropuerto de Alicante | Caravan Rent",
      description: "Recogida y devolución gratis en el aeropuerto de Alicante-Elche (ALC). Sin suplemento. Autocaravanas en Torrevieja, Elche y Alicante.",
      kicker: "Incluido, sin suplemento",
      h1: "Autocaravana en el aeropuerto de Alicante",
      lead: "La recogida y la devolución en el aeropuerto de Alicante-Elche Miguel Hernández (ALC) son gratis. El punto y la hora se acuerdan con tu vuelo cuando confirmamos la solicitud.",
      addressTitle: "Aeropuerto",
      address: "Aeropuerto de Alicante-Elche (ALC). Base: calle La Sagra 92, Torrevieja",
      facts: [
        ["Sin coste", "Ni la ida ni la vuelta al aeropuerto llevan suplemento."],
        ["Con el vuelo", "Al confirmar cruzamos la hora con tu llegada o tu salida."],
        ["También en tierra", "Si te encaja más, entregamos en Torrevieja o en Elche."],
      ],
      paragraphs: [
        "El aeropuerto está entre Elche y Alicante. No cobramos por llevar la autocaravana hasta allí ni por recogerla al final del viaje.",
        "No es una oficina dentro de la terminal. Quedamos en el punto que te indicamos al confirmar, según la hora del vuelo. La base, el mantenimiento y la salida habitual siguen en Torrevieja.",
      ],
      fleetTitle: shared.es.fleetTitle,
      pricesTitle: shared.es.pricesTitle,
      priceNote: shared.es.priceNote,
      moreTitle: shared.es.moreTitle,
      cta: shared.es.cta,
    },
    en: {
      title: "Motorhome rental at Alicante Airport | Caravan Rent",
      description: "Free pickup and return at Alicante-Elche Airport (ALC). No surcharge. Motorhomes for Torrevieja, Elche and Alicante.",
      kicker: "Included, no surcharge",
      h1: "Motorhome at Alicante Airport",
      lead: "Pickup and return at Alicante-Elche Miguel Hernández Airport (ALC) are free. The spot and the time are agreed around your flight when we confirm the request.",
      addressTitle: "Airport",
      address: "Alicante-Elche Airport (ALC). Base: Calle La Sagra 92, Torrevieja",
      facts: [
        ["No fee", "Neither the airport pickup nor the return carries a surcharge."],
        ["Around your flight", "On confirmation we match the time to your arrival or departure."],
        ["On the ground too", "If it suits you better, we hand over in Torrevieja or Elche."],
      ],
      paragraphs: [
        "The airport sits between Elche and Alicante. We do not charge to bring the motorhome there or to collect it at the end of the trip.",
        "There is no office inside the terminal. We meet at the point we send you on confirmation, according to the flight time. The base, the servicing and the usual departure stay in Torrevieja.",
      ],
      fleetTitle: shared.en.fleetTitle,
      pricesTitle: shared.en.pricesTitle,
      priceNote: shared.en.priceNote,
      moreTitle: shared.en.moreTitle,
      cta: shared.en.cta,
    },
    fr: {
      title: "Location de camping-car à l'aéroport d'Alicante | Caravan Rent",
      description: "Prise en charge et retour gratuits à l'aéroport d'Alicante-Elche (ALC). Sans supplément. Camping-cars pour Torrevieja, Elche et Alicante.",
      kicker: "Inclus, sans supplément",
      h1: "Camping-car à l'aéroport d'Alicante",
      lead: "La prise en charge et le retour à l'aéroport d'Alicante-Elche Miguel Hernández (ALC) sont gratuits. Le point et l'heure se calent sur votre vol à la confirmation.",
      addressTitle: "Aéroport",
      address: "Aéroport d'Alicante-Elche (ALC). Base : calle La Sagra 92, Torrevieja",
      facts: [
        ["Sans frais", "Ni l'aller ni le retour à l'aéroport ne sont facturés."],
        ["Avec le vol", "À la confirmation, l'heure suit votre arrivée ou votre départ."],
        ["Aussi au sol", "Si c'est plus simple, remise à Torrevieja ou à Elche."],
      ],
      paragraphs: [
        "L'aéroport est entre Elche et Alicante. Nous ne facturons pas le trajet pour y amener le camping-car ni pour le récupérer en fin de voyage.",
        "Il n'y a pas de bureau dans le terminal. Nous nous retrouvons au point indiqué à la confirmation, selon l'heure du vol. La base, l'entretien et le départ habituel restent à Torrevieja.",
      ],
      fleetTitle: shared.fr.fleetTitle,
      pricesTitle: shared.fr.pricesTitle,
      priceNote: shared.fr.priceNote,
      moreTitle: shared.fr.moreTitle,
      cta: shared.fr.cta,
    },
    de: {
      title: "Wohnmobil am Flughafen Alicante mieten | Caravan Rent",
      description: "Kostenlose Abholung und Rückgabe am Flughafen Alicante-Elche (ALC). Kein Aufpreis. Wohnmobile für Torrevieja, Elche und Alicante.",
      kicker: "Inklusive, ohne Aufpreis",
      h1: "Wohnmobil am Flughafen Alicante",
      lead: "Abholung und Rückgabe am Flughafen Alicante-Elche Miguel Hernández (ALC) sind kostenlos. Ort und Uhrzeit richten sich nach Ihrem Flug, sobald wir die Anfrage bestätigen.",
      addressTitle: "Flughafen",
      address: "Flughafen Alicante-Elche (ALC). Basis: Calle La Sagra 92, Torrevieja",
      facts: [
        ["Ohne Gebühr", "Weder die Abholung noch die Rückgabe am Flughafen kostet extra."],
        ["Zum Flug", "Mit der Bestätigung passen wir die Uhrzeit an Ankunft oder Abflug an."],
        ["Auch an Land", "Wenn es besser passt, übergeben wir in Torrevieja oder Elche."],
      ],
      paragraphs: [
        "Der Flughafen liegt zwischen Elche und Alicante. Die Fahrt dorthin und die Abholung am Ende der Reise berechnen wir nicht.",
        "Ein Büro im Terminal gibt es nicht. Wir treffen uns an dem Punkt, den wir mit der Bestätigung schicken, passend zur Flugzeit. Basis, Wartung und der übliche Start bleiben in Torrevieja.",
      ],
      fleetTitle: shared.de.fleetTitle,
      pricesTitle: shared.de.pricesTitle,
      priceNote: shared.de.priceNote,
      moreTitle: shared.de.moreTitle,
      cta: shared.de.cta,
    },
    ru: {
      title: "Аренда автодома в аэропорту Аликанте | Caravan Rent",
      description: "Бесплатная выдача и возврат в аэропорту Аликанте-Эльче (ALC). Без доплаты. Автодома для Торревьехи, Эльче и Аликанте.",
      kicker: "Входит в стоимость",
      h1: "Автодом в аэропорту Аликанте",
      lead: "Выдача и возврат в аэропорту Аликанте-Эльче имени Мигеля Эрнандеса (ALC) бесплатные. Точку и время согласуем с вашим рейсом при подтверждении заявки.",
      addressTitle: "Аэропорт",
      address: "Аэропорт Аликанте-Эльче (ALC). База: Calle La Sagra 92, Torrevieja",
      facts: [
        ["Без доплаты", "Ни выдача, ни возврат в аэропорту ничего не добавляют к цене."],
        ["Под рейс", "При подтверждении ставим время к прилёту или вылету."],
        ["И на земле", "Если удобнее, выдадим в Торревьехе или в Эльче."],
      ],
      paragraphs: [
        "Аэропорт между Эльче и Аликанте. Мы не берём денег за то, чтобы привезти автодом туда и забрать его в конце поездки.",
        "Офиса в терминале нет. Встречаемся в точке, которую присылаем при подтверждении, по времени рейса. База, обслуживание и обычный выезд остаются в Торревьехе.",
      ],
      fleetTitle: shared.ru.fleetTitle,
      pricesTitle: shared.ru.pricesTitle,
      priceNote: shared.ru.priceNote,
      moreTitle: shared.ru.moreTitle,
      cta: shared.ru.cta,
    },
    ua: {
      title: "Оренда автодома в аеропорту Аліканте | Caravan Rent",
      description: "Безкоштовна видача і повернення в аеропорту Аліканте-Ельче (ALC). Без доплати. Автодоми для Торрев'єхи, Ельче й Аліканте.",
      kicker: "Входить у вартість",
      h1: "Автодім в аеропорту Аліканте",
      lead: "Видача і повернення в аеропорту Аліканте-Ельче імені Мігеля Ернандеса (ALC) безкоштовні. Точку і час погоджуємо з вашим рейсом під час підтвердження заявки.",
      addressTitle: "Аеропорт",
      address: "Аеропорт Аліканте-Ельче (ALC). База: Calle La Sagra 92, Torrevieja",
      facts: [
        ["Без доплати", "Ні видача, ні повернення в аеропорту нічого не додають до ціни."],
        ["Під рейс", "Під час підтвердження ставимо час до прильоту або вильоту."],
        ["І на землі", "Якщо зручніше, видамо в Торрев'єсі або в Ельче."],
      ],
      paragraphs: [
        "Аеропорт між Ельче й Аліканте. Ми не беремо грошей за те, щоб привезти автодім туди і забрати його наприкінці поїздки.",
        "Офісу в терміналі немає. Зустрічаємося в точці, яку надсилаємо під час підтвердження, за часом рейсу. База, обслуговування і звичний виїзд лишаються в Торрев'єсі.",
      ],
      fleetTitle: shared.ua.fleetTitle,
      pricesTitle: shared.ua.pricesTitle,
      priceNote: shared.ua.priceNote,
      moreTitle: shared.ua.moreTitle,
      cta: shared.ua.cta,
    },
  },
};

const fleet = [
  {
    href: "/mirror/ford-weinsberg",
    img: "/mirror/wp-content/uploads/2025/01/2ford.webp",
    name: "Ford Weinsberg",
    auto: false,
  },
  {
    href: "/mirror/peugeot-chausson",
    img: "/mirror/wp-content/uploads/2025/01/1-1024x1024.webp",
    name: "Peugeot Chausson",
    auto: false,
  },
  {
    href: "/mirror/fiat-mclouis-mc4-379",
    img: "/mirror/wp-content/uploads/2026/10/fiat-01.webp",
    name: "Fiat McLouis",
    auto: true,
  },
];

function esc(value: string) {
  return value.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}

export function isPlaceSlug(slug: string): slug is PlaceSlug {
  return (placeSlugs as readonly string[]).includes(slug);
}

export function placeMeta(slug: string, lang: Lang) {
  if (!isPlaceSlug(slug)) return null;
  const copy = pages[slug][lang];
  return { title: copy.title, description: copy.description };
}

export function homePlaceLinks(lang: Lang) {
  const items = placeSlugs
    .map((slug) => `<a href="${pagePath(lang, slug)}">${esc(names[slug][lang])}</a>`)
    .join("");
  return `<nav class="cr-home-places" aria-label="${esc(shared[lang].moreTitle)}">${items}</nav>`;
}

export function placeHtml(slug: string, lang: Lang) {
  if (!isPlaceSlug(slug)) return null;
  const copy = pages[slug][lang];
  const price = shared[lang];
  const facts = copy.facts
    .map(([title, text]) => `<article><h2>${esc(title)}</h2><p>${esc(text)}</p></article>`)
    .join("");
  const paragraphs = copy.paragraphs.map((text) => `<p>${esc(text)}</p>`).join("");
  const cards = fleet
    .map(
      (van) => `<a class="cr-place-card" href="${pagePath(lang, van.href.replace("/mirror/", ""))}"><img src="${van.img}" alt="${esc(van.name)}"><strong>${esc(van.name)}</strong><span>${esc(van.auto ? price.auto : price.manual)}</span><em>${esc(copy.cta)}</em></a>`,
    )
    .join("");
  const rows = price.rows
    .map(([season, manual, auto]) => `<tr><td>${esc(season)}</td><td>${esc(manual)}</td><td>${esc(auto)}</td></tr>`)
    .join("");
  const more = placeSlugs
    .filter((item) => item !== slug)
    .map((item) => `<a href="${pagePath(lang, item)}">${esc(names[item][lang])}</a>`)
    .join("");
  const map =
    slug === "alquiler-autocaravana-torrevieja"
      ? `<p class="cr-place-map"><a href="https://www.google.com/maps/dir/?api=1&destination=Calle%20La%20Sagra%2092%2C%20Torrevieja" target="_blank" rel="noopener">${esc(copy.address)}</a></p>`
      : slug === "alquiler-autocaravana-alicante"
        ? `<p class="cr-place-map"><a href="https://www.google.com/maps/search/?api=1&query=Alicante" target="_blank" rel="noopener">${esc(copy.address)}</a></p>`
        : `<p class="cr-place-map">${esc(copy.address)}</p>`;

  return `<main class="cr-place">
    <section class="cr-place-hero">
      <p class="cr-place-kicker">${esc(copy.kicker)}</p>
      <h1>${esc(copy.h1)}</h1>
      <p>${esc(copy.lead)}</p>
    </section>
    <section class="cr-place-facts">${facts}</section>
    <section class="cr-place-copy">
      <h2>${esc(copy.addressTitle)}</h2>
      ${map}
      ${paragraphs}
    </section>
    <section class="cr-place-fleet">
      <h2>${esc(copy.fleetTitle)}</h2>
      <div class="cr-place-cards">${cards}</div>
    </section>
    <section class="cr-place-prices">
      <h2>${esc(copy.pricesTitle)}</h2>
      <table>
        <thead><tr><th></th><th>${esc(price.manual)}</th><th>${esc(price.auto)}</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p>${esc(copy.priceNote)}</p>
    </section>
    <nav class="cr-place-more" aria-label="${esc(copy.moreTitle)}">
      <h2>${esc(copy.moreTitle)}</h2>
      ${more}
    </nav>
  </main>
  <footer class="footer footer_main"><div class="footer-bottom"><div class="container"><div class="copyright"><div class="row align-items-center"><div class="col-md-12 text-center"><div class="copyright-text"><p><strong><a href="/mirror/terms-conditions/">Terms & Conditions</a> | <a href="/mirror/privacy-policy-2/">Privacy Policy</a></strong><br> Copyright 2024-2025 © Caravanrent-Alicante S.L., All Rights Reserved. <br></p></div></div></div></div></div></div></footer>`;
}

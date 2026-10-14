import { useEffect, useMemo, useState, type FormEvent } from "react";
import { getYescapaBusy, type BusyRange } from "@/mirror/availability";
import { logPriceLook } from "@/mirror/price-log";
import type { Lang } from "@/mirror/locales";

const copy = {
  es: {
    title: "Calcula el precio y reserva",
    lead: "Elige las fechas, el lugar de recogida y el de devolución, y envía la solicitud para confirmar la reserva.",
    van: "Autocaravana",
    from: "Recogida",
    to: "Devolución",
    place: "Lugar de recogida",
    drop: "Lugar de devolución",
    name: "Nombre",
    phone: "Teléfono",
    email: "Correo",
    note: "Comentario",
    days: "días",
    day: "día",
    cleaning: "Limpieza final",
    total: "Total",
    deposit: "Depósito",
    send: "Enviar solicitud",
    sending: "Enviando…",
    ok: "En breve nos pondremos en contacto para confirmar su reserva.",
    thanks: "Muchas gracias",
    fail: "No se pudo enviar el correo. Escríbenos por WhatsApp, el mensaje ya está preparado.",
    whatsapp: "Enviar por WhatsApp",
    min: "El alquiler mínimo es de 3 días.",
    dates: "Elige una fecha de devolución posterior a la recogida.",
    who: "Escribe tu nombre y un teléfono.",
    busy: "Esas fechas ya están ocupadas. Elige otras.",
    calendar: "Calendario de disponibilidad",
    tap: "Pulsa el día de recogida y luego el de devolución.",
    manual: "manual",
    auto: "automático",
  },
  en: {
    title: "Check the price and request",
    lead: "Choose the dates, the pickup place and the return place, then send a request to confirm the booking.",
    van: "Motorhome",
    from: "Pickup",
    to: "Return",
    place: "Pickup place",
    drop: "Return place",
    name: "Name",
    phone: "Phone",
    email: "Email",
    note: "Note",
    days: "days",
    day: "day",
    cleaning: "Final clean",
    total: "Total",
    deposit: "Deposit",
    send: "Send request",
    sending: "Sending…",
    ok: "We will contact you shortly to confirm your booking.",
    thanks: "Thank you very much",
    fail: "The email did not go through. Message us on WhatsApp, the text is ready.",
    whatsapp: "Send on WhatsApp",
    min: "The minimum rental is 3 days.",
    dates: "The return date has to be after pickup.",
    who: "Add your name and a phone number.",
    busy: "Those dates are already taken. Pick others.",
    calendar: "Availability calendar",
    tap: "Tap the pickup day, then the return day.",
    manual: "manual",
    auto: "automatic",
  },
  fr: {
    title: "Calculez le prix et réservez",
    lead: "Choisissez les dates, le lieu de départ et celui du retour, puis envoyez la demande pour confirmer la réservation.",
    van: "Camping-car",
    from: "Départ",
    to: "Retour",
    place: "Lieu de prise en charge",
    drop: "Lieu de retour",
    name: "Nom",
    phone: "Téléphone",
    email: "E-mail",
    note: "Commentaire",
    days: "jours",
    day: "jour",
    cleaning: "Nettoyage final",
    total: "Total",
    deposit: "Caution",
    send: "Envoyer la demande",
    sending: "Envoi…",
    ok: "Nous vous contacterons très bientôt pour confirmer votre réservation.",
    thanks: "Un grand merci",
    fail: "L'e-mail n'est pas parti. Écrivez-nous sur WhatsApp, le texte est prêt.",
    whatsapp: "Envoyer sur WhatsApp",
    min: "La location minimale est de 3 jours.",
    dates: "Le retour doit être après le départ.",
    who: "Indiquez votre nom et un téléphone.",
    busy: "Ces dates sont déjà prises. Choisissez-en d'autres.",
    calendar: "Calendrier des disponibilités",
    tap: "Touchez le jour de départ, puis celui du retour.",
    manual: "manuelle",
    auto: "automatique",
  },
  de: {
    title: "Preis berechnen und anfragen",
    lead: "Wählen Sie die Daten, den Abholort und den Rückgabeort und senden Sie die Anfrage zur Bestätigung der Buchung.",
    van: "Wohnmobil",
    from: "Abholung",
    to: "Rückgabe",
    place: "Abholort",
    drop: "Rückgabeort",
    name: "Name",
    phone: "Telefon",
    email: "E-Mail",
    note: "Kommentar",
    days: "Tage",
    day: "Tag",
    cleaning: "Endreinigung",
    total: "Summe",
    deposit: "Kaution",
    send: "Anfrage senden",
    sending: "Senden…",
    ok: "Wir melden uns in Kürze, um Ihre Buchung zu bestätigen.",
    thanks: "Vielen Dank",
    fail: "Die E-Mail ging nicht raus. Schreiben Sie uns per WhatsApp, der Text steht bereit.",
    whatsapp: "Per WhatsApp senden",
    min: "Mindestmiete sind 3 Tage.",
    dates: "Die Rückgabe muss nach der Abholung liegen.",
    who: "Name und Telefonnummer eintragen.",
    busy: "Diese Tage sind schon belegt. Bitte andere wählen.",
    calendar: "Verfügbarkeitskalender",
    tap: "Tippen Sie zuerst auf die Abholung, dann auf die Rückgabe.",
    manual: "Schaltgetriebe",
    auto: "Automatik",
  },
  ru: {
    title: "Посчитать цену и оставить заявку",
    lead: "Выберите даты, место выдачи и возврата и отправьте заявку для подтверждения бронирования.",
    van: "Автодом",
    from: "Выдача",
    to: "Возврат",
    place: "Место выдачи",
    drop: "Место возврата",
    name: "Имя",
    phone: "Телефон",
    email: "Почта",
    note: "Комментарий",
    days: "дней",
    day: "день",
    cleaning: "Финальная уборка",
    total: "Итого",
    deposit: "Депозит",
    send: "Отправить заявку",
    sending: "Отправка…",
    ok: "В ближайшее время мы свяжемся с вами для подтверждения вашего бронирования.",
    thanks: "Большое спасибо",
    fail: "Письмо не ушло. Напишите в WhatsApp, текст уже готов.",
    whatsapp: "Отправить в WhatsApp",
    min: "Минимальный срок аренды — 3 дня.",
    dates: "Дата возврата должна быть позже выдачи.",
    who: "Напишите имя и телефон.",
    busy: "Эти даты уже заняты. Выберите другие.",
    calendar: "Календарь доступности",
    tap: "Нажмите день выдачи, потом день возврата.",
    manual: "механика",
    auto: "автомат",
  },
  ua: {
    title: "Порахувати ціну і залишити заявку",
    lead: "Оберіть дати, місце видачі та повернення і надішліть заявку для підтвердження бронювання.",
    van: "Автодім",
    from: "Видача",
    to: "Повернення",
    place: "Місце видачі",
    drop: "Місце повернення",
    name: "Ім'я",
    phone: "Телефон",
    email: "Пошта",
    note: "Коментар",
    days: "днів",
    day: "день",
    cleaning: "Фінальне прибирання",
    total: "Разом",
    deposit: "Депозит",
    send: "Надіслати заявку",
    sending: "Надсилання…",
    ok: "Найближчим часом ми зв’яжемося з вами для підтвердження вашого бронювання.",
    thanks: "Дуже дякуємо",
    fail: "Лист не пішов. Напишіть у WhatsApp, текст уже готовий.",
    whatsapp: "Надіслати в WhatsApp",
    min: "Мінімальний строк оренди — 3 дні.",
    dates: "Дата повернення має бути пізніше видачі.",
    who: "Напишіть ім'я і телефон.",
    busy: "Ці дати вже зайняті. Оберіть інші.",
    calendar: "Календар доступності",
    tap: "Натисніть день видачі, потім день повернення.",
    manual: "механіка",
    auto: "автомат",
  },
} as const;

const vans = [
  { id: "ford-weinsberg", name: "Ford Weinsberg", auto: false },
  { id: "peugeot-chausson", name: "Peugeot Chausson", auto: false },
  { id: "fiat-mclouis-mc4-379", name: "Fiat McLouis", auto: true },
] as const;

const flags: Record<string, string> = {
  "34": "🇪🇸",
  "380": "🇺🇦",
  "44": "🇬🇧",
  "33": "🇫🇷",
  "49": "🇩🇪",
  "39": "🇮🇹",
  "31": "🇳🇱",
  "32": "🇧🇪",
  "351": "🇵🇹",
  "48": "🇵🇱",
  "7": "🇷🇺",
  "1": "🇺🇸",
  "41": "🇨🇭",
  "43": "🇦🇹",
  "46": "🇸🇪",
  "47": "🇳🇴",
  "45": "🇩🇰",
  "353": "🇮🇪",
  "420": "🇨🇿",
  "40": "🇷🇴",
};

const places = {
  es: ["Alicante", "Torrevieja", "Elche", "Aeropuerto de Alicante, gratis"],
  en: ["Alicante", "Torrevieja", "Elche", "Alicante Airport, free"],
  fr: ["Alicante", "Torrevieja", "Elche", "Aéroport d'Alicante, gratuit"],
  de: ["Alicante", "Torrevieja", "Elche", "Flughafen Alicante, kostenlos"],
  ru: ["Аликанте", "Торревьеха", "Эльче", "Аэропорт Аликанте, бесплатно"],
  ua: ["Аліканте", "Торрев'єха", "Ельче", "Аеропорт Аліканте, безкоштовно"],
} as const;

const WEEK = ["L", "M", "X", "J", "V", "S", "D"];

function dayRate(month: number, auto: boolean, iso = "", vehicleId = "") {
  if (vehicleId === "peugeot-chausson" && iso >= "2026-10-19" && iso <= "2026-12-28") return 100;
  const manual = month === 8 ? 175 : month === 6 || month === 7 || month === 9 ? 145 : month === 4 || month === 5 ? 135 : 120;
  return auto ? manual + 10 : manual;
}

function parseDay(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function euro(value: number) {
  return `${value.toLocaleString("es-ES")} €`;
}

function monthGrid(anchor: Date) {
  const year = anchor.getFullYear();
  const month = anchor.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - ((first.getDay() + 6) % 7));
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return { iso: `${date.getFullYear()}-${m}-${d}`, inMonth: date.getMonth() === month, label: date.getDate() };
  });
}

function nightsBetween(from: string, to: string) {
  return Math.round((parseDay(to).getTime() - parseDay(from).getTime()) / 86400000);
}

function rangeBusy(from: string, to: string, ranges: BusyRange[]) {
  return ranges.some((range) => from < range.end && to >= range.start);
}

function dayBusy(iso: string, ranges: BusyRange[]) {
  return ranges.some((range) => iso >= range.start && iso < range.end);
}

export function quoteFor(vehicleId: string, from: string, to: string) {
  const van = vans.find((item) => item.id === vehicleId) ?? vans[0];
  if (!from || !to) return null;
  const start = parseDay(from);
  const end = parseDay(to);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) return { error: "dates" as const };
  const lines = new Map<number, number>();
  for (let cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
    const month = String(cursor.getMonth() + 1).padStart(2, "0");
    const day = String(cursor.getDate()).padStart(2, "0");
    const iso = `${cursor.getFullYear()}-${month}-${day}`;
    const rate = dayRate(cursor.getMonth() + 1, van.auto, iso, van.id);
    lines.set(rate, (lines.get(rate) ?? 0) + 1);
  }
  const nights = [...lines.values()].reduce((sum, count) => sum + count, 0);
  if (nights < 3) return { error: "min" as const };
  const rental = [...lines.entries()].reduce((sum, [rate, count]) => sum + rate * count, 0);
  return {
    van,
    lines: [...lines.entries()],
    nights,
    rental,
    cleaning: 50,
    total: rental + 50,
    deposit: van.auto ? 1200 : 800,
  };
}

export function BookingForm({ lang, vehicle }: { lang: Lang; vehicle?: string }) {
  const text = copy[lang];
  const van = vans.find((item) => item.id === vehicle);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [place, setPlace] = useState(places[lang][1]);
  const [drop, setDrop] = useState(places[lang][1]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dial, setDial] = useState("34");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "fail">("idle");
  const [busy, setBusy] = useState<BusyRange[]>([]);
  const [month, setMonth] = useState(() => new Date(2026, 9, 1));

  const linked = Boolean(van);
  const quote = useMemo(() => (van ? quoteFor(van.id, from, to) : null), [van, from, to]);
  const taken = linked && from && to && quote && !("error" in quote) ? rangeBusy(from, to, busy) : false;
  const days = useMemo(() => monthGrid(month), [month]);

  useEffect(() => {
    if (!van || !from || !to || !quote || "error" in quote || taken) return;
    const timer = window.setTimeout(() => {
      const key = "cr-look-session";
      let session = sessionStorage.getItem(key);
      if (!session) {
        session = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
        sessionStorage.setItem(key, session);
      }
      logPriceLook({ data: { vehicle: van.id, from, to, total: quote.total, session } }).catch(() => undefined);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [van, from, to, quote, taken]);

  useEffect(() => {
    if (!vehicle) return;
    getYescapaBusy({ data: vehicle })
      .then(setBusy)
      .catch(() => setBusy([]));
  }, [vehicle]);

  const summary = () => {
    if (!van || !quote || "error" in quote) return "";
    const stay = quote.lines.map(([rate, count]) => `${count} × ${euro(rate)}`).join(", ");
    return [
      `${van.name} (${van.auto ? text.auto : text.manual})`,
      `${from} → ${to} (${quote.nights} ${quote.nights === 1 ? text.day : text.days}: ${stay})`,
      `${text.place}: ${place}`,
      `${text.drop}: ${drop}`,
      `${text.cleaning}: ${euro(quote.cleaning)}`,
      `${text.total}: ${euro(quote.total)}`,
      `${text.deposit}: ${euro(quote.deposit)}`,
      `${text.name}: ${name}`,
      `${text.phone}: +${dial} ${phone}`,
      `${text.email}: ${email}`,
      note ? `${text.note}: ${note}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!quote || "error" in quote || !van) {
      setError(quote && "error" in quote && quote.error === "min" ? text.min : text.dates);
      return;
    }
    if (taken) {
      setError(text.busy);
      return;
    }
    if (name.trim().length < 2 || phone.trim().length < 6) {
      setError(text.who);
      return;
    }
    const body = summary();
    setStatus("sending");
    try {
      const response = await fetch("https://formsubmit.co/ajax/info@caravanrent-alicante.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || "info@caravanrent-alicante.com",
          phone: phone.trim(),
          _subject: `Reserva ${van.name} ${from} – ${to} · ${euro(quote.total)}`,
          _template: "table",
          _captcha: "false",
          message: body,
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setFrom("");
      setTo("");
      setPlace(places[lang][1]);
      setDrop(places[lang][1]);
      setName("");
      setPhone("");
      setEmail("");
      setNote("");
      setError("");
      setStatus("ok");
    } catch {
      setStatus("fail");
    }
  }

  const ranges = linked ? busy : [];
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  function pickDay(iso: string) {
    if (iso < today) return;
    if (iso === from || iso === to) {
      setFrom("");
      setTo("");
      setError("");
      return;
    }
    const blockedDay = linked && dayBusy(iso, busy);
    if (!from || to || iso <= from) {
      if (blockedDay) {
        setError(text.busy);
        return;
      }
      setError("");
      setFrom(iso);
      setTo("");
      return;
    }
    if (nightsBetween(from, iso) < 2) {
      setError(text.min);
      return;
    }
    if (linked && rangeBusy(from, iso, busy)) {
      setError(text.busy);
      return;
    }
    setError("");
    setTo(iso);
  }
  const whatsapp = `https://wa.me/34607223726?text=${encodeURIComponent(summary() || text.title)}`;
  const title = month.toLocaleDateString(lang === "ua" ? "uk" : lang, { month: "long", year: "numeric" });
  if (!van) return null;
  if (status === "ok") {
    return (
      <section className="cr-book cr-done">
        <p className="cr-thanks">{text.thanks}</p>
        <p className="cr-thanks-rest">{text.ok}</p>
      </section>
    );
  }

  return (
    <section className="cr-book">
      <h2>{text.calendar}</h2>
      <p className="cr-van-name">{van.name}</p>
      <p>{text.lead}</p>
      <form onSubmit={onSubmit}>
        <div className="cr-cal wide">
          <div className="cr-cal-head">
            <button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} aria-label="prev">
              ‹
            </button>
            <span>{title}</span>
            <button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} aria-label="next">
              ›
            </button>
          </div>
          <div className="cr-cal-grid">
            {WEEK.map((item) => (
              <span key={item} className="cr-cal-dow">{item}</span>
            ))}
            {days.map((day) => {
              const past = day.iso < today;
              const blocked = !past && dayBusy(day.iso, ranges);
              const waitingReturn = Boolean(from && !to && day.iso > from);
              const tooShort = waitingReturn && nightsBetween(from, day.iso) < 2;
              const crosses = waitingReturn && linked && rangeBusy(from, day.iso, busy);
              const on = day.iso === from || day.iso === to;
              const between = Boolean(from && to && day.iso > from && day.iso < to);
              const className = [
                "cr-cal-day",
                day.inMonth ? "" : "cr-cal-out",
                past ? "cr-cal-past" : "",
                blocked ? "cr-cal-busy" : "",
                !past && (tooShort || crosses) ? "cr-cal-off" : "",
                between ? "cr-cal-range" : "",
                on ? "cr-cal-on" : "",
              ].filter(Boolean).join(" ");
              const price = !blocked && !past ? dayRate(Number(day.iso.slice(5, 7)), van.auto, day.iso, van.id) : null;
              return (
                <button key={day.iso} type="button" className={className} disabled={past || tooShort || crosses} onClick={() => pickDay(day.iso)}>
                  <span>{day.label}</span>
                  {price ? <small className="cr-cal-price">{price}€</small> : null}
                </button>
              );
            })}
          </div>
        </div>
        <div className="cr-places wide">
          <label>
            {text.place}
            <select value={place} onChange={(event) => setPlace(event.target.value)}>
              {places[lang].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            {text.drop}
            <select value={drop} onChange={(event) => setDrop(event.target.value)}>
              {places[lang].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        <label>
          {text.name}
          <input value={name} onChange={(event) => setName(event.target.value)} required />
        </label>
        <label>
          {text.phone}
          <span className="cr-phone">
            <span className="cr-dial">
              <span aria-hidden="true">{flags[dial] ?? "🌐"}</span>
              <span>+</span>
              <input
                value={dial}
                onChange={(event) => setDial(event.target.value.replace(/\D/g, "").slice(0, 4))}
                inputMode="numeric"
                aria-label="+"
                placeholder="34"
              />
            </span>
            <input value={phone} onChange={(event) => setPhone(event.target.value)} inputMode="tel" placeholder="600 000 000" required />
          </span>
        </label>
        <label>
          {text.email}
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nombre@email.com" />
        </label>
        <label>
          {text.note}
          <input value={note} onChange={(event) => setNote(event.target.value)} />
        </label>
        <div className="cr-quote wide">
          {quote && !("error" in quote) ? (
            <>
              {quote.lines.map(([rate, count]) => (
                <div key={rate}>
                  {count} {count === 1 ? text.day : text.days} × {euro(rate)} = {euro(rate * count)}
                </div>
              ))}
              <div>
                {text.cleaning}: {euro(quote.cleaning)}
              </div>
              <strong>
                {text.total}: {euro(quote.total)}
              </strong>
              <div>
                {text.deposit}: {euro(quote.deposit)}
              </div>
              {taken ? <div className="cr-book-error">{text.busy}</div> : null}
            </>
          ) : (
            <div>{quote && "error" in quote ? (quote.error === "min" ? text.min : text.dates) : text.lead}</div>
          )}
        </div>
        {error ? <p className="cr-book-error wide">{error}</p> : null}
        {status === "ok" ? <p className="cr-book-ok wide">{text.ok}</p> : null}
        {status === "fail" ? (
          <p className="cr-book-error wide">
            {text.fail}{" "}
            <a href={whatsapp} target="_blank" rel="noopener">
              {text.whatsapp}
            </a>
          </p>
        ) : null}
        <button className="wide" type="submit" disabled={status === "sending" || taken}>
          {status === "sending" ? text.sending : text.send}
        </button>
      </form>
    </section>
  );
}

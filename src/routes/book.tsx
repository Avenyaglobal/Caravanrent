import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Shell } from "@/components/shell";
import { heldOn, pickupLabel, pickups, vehicleBySlug, vehicles, type PickupId } from "@/lib/fleet";
import { loadInquiries, removeInquiry, saveInquiry, type Inquiry } from "@/lib/inquiries";

type BookSearch = {
  vehicle?: string;
  from?: string;
  to?: string;
  guests?: number;
  pickup?: string;
};

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>): BookSearch => ({
    vehicle: typeof search.vehicle === "string" ? search.vehicle : undefined,
    from: typeof search.from === "string" ? search.from : undefined,
    to: typeof search.to === "string" ? search.to : undefined,
    guests:
      typeof search.guests === "number"
        ? search.guests
        : typeof search.guests === "string" && search.guests
          ? Number(search.guests)
          : undefined,
    pickup: typeof search.pickup === "string" ? search.pickup : undefined,
  }),
  component: BookPage,
});

const field =
  "h-11 w-full rounded-xl border border-line bg-foam px-3 text-sm text-ink outline-none focus:border-pine";

function BookPage() {
  const search = Route.useSearch();
  const [vehicle, setVehicle] = useState(search.vehicle && vehicleBySlug(search.vehicle) ? search.vehicle : vehicles[0].slug);
  const [pickup, setPickup] = useState<PickupId>(
    pickups.some((p) => p.id === search.pickup) ? (search.pickup as PickupId) : "torrevieja",
  );
  const [from, setFrom] = useState(search.from ?? "");
  const [to, setTo] = useState(search.to ?? "");
  const [guests, setGuests] = useState(search.guests && search.guests > 0 ? search.guests : 2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState<Inquiry | null>(null);
  const [saved, setSaved] = useState<Inquiry[]>([]);

  useEffect(() => {
    setSaved(loadInquiries());
  }, []);

  const van = vehicleBySlug(vehicle) ?? vehicles[0];
  const busy = heldOn(van, from, to);
  const tooMany = guests > van.berths;

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (name.trim().length < 2) {
      setError("Add the name we should ask for at handover.");
      return;
    }
    if (phone.trim().length < 6) {
      setError("Add a phone number so we can confirm on WhatsApp.");
      return;
    }
    if (!from || !to || to < from) {
      setError("Choose a start date and an end date after it.");
      return;
    }
    if (tooMany) {
      setError(`${van.name} sleeps ${van.berths}. Pick another van or fewer guests.`);
      return;
    }
    const entry = saveInquiry({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      vehicle: van.slug,
      pickup,
      from,
      to,
      guests,
      message: message.trim(),
    });
    setSent(entry);
    setSaved(loadInquiries());
  }

  const wa = `https://wa.me/34607223726?text=${encodeURIComponent(
    `Hello, I would like the ${van.name} from ${from || "…"} to ${to || "…"} for ${guests}. Pickup: ${pickupLabel(pickup)}. ${name}`,
  )}`;

  return (
    <Shell>
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-medium tracking-[0.16em] text-pine">REQUEST</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight md:text-5xl">Tell us the dates</h1>
          <p className="mt-3 max-w-xl text-muted">
            This stays on your phone as a request. We confirm availability, the price and the handover
            on WhatsApp before anything is booked.
          </p>
          {sent ? (
            <div className="mt-8 rounded-card border border-line bg-foam p-6">
              <h2 className="font-display text-3xl">Request saved</h2>
              <p className="mt-2 text-muted">
                {sent.name}, {van.name}, {sent.from} → {sent.to}, {pickupLabel(sent.pickup)}.
                {busy ? " Those dates are currently on hold — we will suggest the nearest free window." : " Those dates look open."}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center rounded-full bg-pine px-5 text-sm font-medium text-foam"
                >
                  Send it on WhatsApp
                </a>
                <button
                  type="button"
                  className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm font-medium"
                  onClick={() => setSent(null)}
                >
                  Make another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 grid gap-3 rounded-card border border-line bg-foam p-5 sm:grid-cols-2">
              <label className="block text-sm sm:col-span-2">
                <span className="mb-1 block font-medium">Motorhome</span>
                <select className={field} value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
                  {vehicles.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name} · sleeps {item.berths} · from €{item.price}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="mb-1 block font-medium">Pickup</span>
                <select className={field} value={pickup} onChange={(e) => setPickup(e.target.value as PickupId)}>
                  {pickups.map((place) => (
                    <option key={place.id} value={place.id}>
                      {place.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">From</span>
                <input className={field} type="date" value={from} min="2026-10-10" onChange={(e) => setFrom(e.target.value)} />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">To</span>
                <input className={field} type="date" value={to} min={from || "2026-10-10"} onChange={(e) => setTo(e.target.value)} />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">Guests</span>
                <select className={field} value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">Name</span>
                <input className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">Phone</span>
                <input className={field} value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" inputMode="tel" />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">Email, if you want one</span>
                <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="mb-1 block font-medium">Notes</span>
                <textarea
                  className="min-h-24 w-full rounded-xl border border-line bg-foam px-3 py-2 text-sm outline-none focus:border-pine"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Dog, airport flight, first time driving a motorhome…"
                />
              </label>
              {tooMany && (
                <p className="text-sm text-clay-deep sm:col-span-2">
                  This van sleeps {van.berths}. Choose fewer guests or another model.
                </p>
              )}
              {busy && from && to && (
                <p className="text-sm text-clay-deep sm:col-span-2">
                  These dates are on hold. You can still send the request and we will offer the nearest free days.
                </p>
              )}
              {error && <p className="text-sm text-clay-deep sm:col-span-2">{error}</p>}
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-full bg-clay text-sm font-medium text-foam hover:bg-clay-deep sm:col-span-2"
              >
                Save request
              </button>
            </form>
          )}
        </div>
        <aside>
          <img src={van.image} alt="" className="h-52 w-full rounded-card object-cover" />
          <div className="mt-4 rounded-card border border-line bg-foam p-5">
            <h2 className="font-display text-2xl">{van.name}</h2>
            <p className="mt-1 text-sm text-muted">
              from €{van.price} / day · sleeps {van.berths} · {van.base}
            </p>
            <Link to="/fleet/$slug" params={{ slug: van.slug }} className="mt-3 inline-block text-sm font-medium text-pine">
              Full details
            </Link>
          </div>
          {saved.length > 0 && (
            <div className="mt-4 rounded-card border border-line bg-foam p-5">
              <h2 className="text-sm font-medium tracking-[0.14em] text-pine">YOUR REQUESTS</h2>
              <ul className="mt-3 space-y-3">
                {saved.map((item) => {
                  const named = vehicleBySlug(item.vehicle);
                  return (
                    <li key={item.id} className="border-t border-line pt-3 text-sm first:border-0 first:pt-0">
                      <p className="font-medium">{named?.name ?? item.vehicle}</p>
                      <p className="text-muted">
                        {item.from} → {item.to} · {item.name}
                      </p>
                      <button
                        type="button"
                        className="mt-1 text-clay"
                        onClick={() => setSaved(removeInquiry(item.id))}
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </Shell>
  );
}

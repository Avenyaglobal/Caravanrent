import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { included, vehicleBySlug } from "@/lib/fleet";

export const Route = createFileRoute("/fleet/$slug")({
  component: VehiclePage,
});

function VehiclePage() {
  const { slug } = Route.useParams();
  const van = vehicleBySlug(slug);

  if (!van) {
    return (
      <Shell>
        <div className="mx-auto max-w-3xl px-5 py-20">
          <h1 className="font-display text-4xl">That van is not in the fleet</h1>
          <Link to="/" className="mt-6 inline-flex h-11 items-center text-pine">
            Back to the three we do have
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <article className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-2">
        <img src={van.image} alt={van.name} className="h-80 w-full rounded-card object-cover md:h-[32rem]" />
        <div>
          <p className="text-sm font-medium tracking-[0.16em] text-pine">
            {van.chassis.toUpperCase()} · {van.year}
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight tracking-tight md:text-5xl">{van.name}</h1>
          <p className="mt-4 text-muted">{van.blurb}</p>
          <p className="mt-5 font-display text-3xl">
            from €{van.price}
            <span className="font-sans text-base text-muted"> / day</span>
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {van.highlights.map((item) => (
              <li key={item} className="rounded-full bg-sand px-3 py-1 text-sm">
                {item}
              </li>
            ))}
          </ul>
          <Link
            to="/book"
            search={{ vehicle: van.slug }}
            className="mt-6 inline-flex h-11 items-center rounded-full bg-clay px-5 text-sm font-medium text-foam hover:bg-clay-deep"
          >
            Request these dates
          </Link>
        </div>
      </article>
      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl">On this van</h2>
          <dl className="mt-4 divide-y divide-line rounded-card border border-line bg-foam">
            {van.specs.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 px-4 py-3 text-sm">
                <dt className="text-muted">{row.label}</dt>
                <dd className="text-right font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="font-display text-3xl">Included</h2>
          <ul className="mt-4 space-y-3">
            {included.map((item) => (
              <li key={item} className="rounded-2xl border border-line bg-foam px-4 py-3 text-sm">
                {item}
              </li>
            ))}
          </ul>
          {van.holds.length > 0 && (
            <p className="mt-4 text-sm text-muted">
              Already held:{" "}
              {van.holds.map((hold) => `${hold.from} → ${hold.to}`).join(", ")}. Other dates are open to request.
            </p>
          )}
        </div>
      </section>
    </Shell>
  );
}

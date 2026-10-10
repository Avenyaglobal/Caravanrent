import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/privacy")({ component: Privacy });

const sections = [
  {
    h: "Who we are",
    p: "Caravan Rent Alicante rents motorhomes from Calle La Sagra 92, 03185 Torrevieja, Alicante. Phone and WhatsApp: +34 607 223 726.",
  },
  {
    h: "What a request stores",
    p: "The booking form on this site keeps your name, phone, email, dates and notes in this browser only. It is not sent to a server. Clearing the site data on your phone removes it.",
  },
  {
    h: "When you actually book",
    p: "A confirmed rental needs your name, contact details, driving licence, the dates and how you will pay. We use that to hand over the van, meet legal duties and reach you if something on the road needs a person.",
  },
  {
    h: "Who else sees it",
    p: "We do not sell the list. A payment provider or the insurer sees what they must see to do their job. Authorities see it only when the law says so.",
  },
  {
    h: "How long",
    p: "Rental records stay for the time Spanish accounting and traffic rules require. A request that never became a booking can be deleted as soon as you ask.",
  },
  {
    h: "Your rights",
    p: "You can ask what we hold, correct it, or ask us to delete what we are not obliged to keep. Write on WhatsApp or by phone. You can also complain to the Agencia Española de Protección de Datos.",
  },
];

function Privacy() {
  return (
    <Shell>
      <article className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="font-display text-5xl tracking-tight">Privacy</h1>
        <p className="mt-3 text-muted">How Caravan Rent Alicante handles what you send us.</p>
        <div className="mt-8 space-y-6">
          {sections.map((section) => (
            <section key={section.h}>
              <h2 className="font-display text-2xl">{section.h}</h2>
              <p className="mt-2 text-muted">{section.p}</p>
            </section>
          ))}
        </div>
      </article>
    </Shell>
  );
}

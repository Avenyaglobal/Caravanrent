import { createFileRoute } from "@tanstack/react-router";
import termsText from "@/lib/terms-text.txt?raw";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/terms")({ component: Terms });

const body = termsText.slice(termsText.indexOf("Condiciones Generales"));

function Terms() {
  return (
    <Shell>
      <article className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="text-4xl font-black text-ink">Terms & Conditions</h1>
        <div className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-muted">{body}</div>
      </article>
    </Shell>
  );
}

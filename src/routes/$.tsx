import { createFileRoute, redirect } from "@tanstack/react-router";
import { MirrorPage, mirrorHead } from "@/mirror/page";

export const Route = createFileRoute("/$")({
  beforeLoad: ({ params }) => {
    const splat = params._splat ?? "";
    const aliases: Record<string, string> = {
      chausson: "/peugeot-chausson",
      ford: "/ford-weinsberg",
      fiat: "/fiat-mclouis-mc4-379",
    };
    if (aliases[splat]) throw redirect({ href: aliases[splat] });
    if (splat === "uk" || splat.startsWith("uk/")) {
      throw redirect({ href: `/ua${splat.slice(2)}` });
    }
  },
  head: ({ params }) => mirrorHead("es", params._splat ?? ""),
  component: SpanishPage,
});

function SpanishPage() {
  const { _splat } = Route.useParams();
  return <MirrorPage lang="es" slug={_splat ?? ""} />;
}

import { createFileRoute, redirect } from "@tanstack/react-router";
import { MirrorPage, mirrorHead } from "@/mirror/page";

export const Route = createFileRoute("/$")({
  beforeLoad: ({ params }) => {
    const splat = params._splat ?? "";
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

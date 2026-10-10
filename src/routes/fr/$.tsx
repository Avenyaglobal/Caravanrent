import { createFileRoute } from "@tanstack/react-router";
import { MirrorPage, mirrorHead } from "@/mirror/page";

export const Route = createFileRoute("/fr/$")({
  head: ({ params }) => mirrorHead("fr", params._splat ?? ""),
  component: FrenchPage,
});

function FrenchPage() {
  const { _splat } = Route.useParams();
  return <MirrorPage lang="fr" slug={_splat ?? ""} />;
}

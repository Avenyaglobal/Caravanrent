import { createFileRoute } from "@tanstack/react-router";
import { MirrorPage, mirrorHead } from "@/mirror/page";

export const Route = createFileRoute("/de/$")({
  head: ({ params }) => mirrorHead("de", params._splat ?? ""),
  component: GermanPage,
});

function GermanPage() {
  const { _splat } = Route.useParams();
  return <MirrorPage lang="de" slug={_splat ?? ""} />;
}

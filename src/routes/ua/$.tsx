import { createFileRoute } from "@tanstack/react-router";
import { MirrorPage, mirrorHead } from "@/mirror/page";

export const Route = createFileRoute("/ua/$")({
  head: ({ params }) => mirrorHead("ua", params._splat ?? ""),
  component: UkrainianPage,
});

function UkrainianPage() {
  const { _splat } = Route.useParams();
  return <MirrorPage lang="ua" slug={_splat ?? ""} />;
}

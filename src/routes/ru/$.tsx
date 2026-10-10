import { createFileRoute } from "@tanstack/react-router";
import { MirrorPage, mirrorHead } from "@/mirror/page";

export const Route = createFileRoute("/ru/$")({
  head: ({ params }) => mirrorHead("ru", params._splat ?? ""),
  component: RussianPage,
});

function RussianPage() {
  const { _splat } = Route.useParams();
  return <MirrorPage lang="ru" slug={_splat ?? ""} />;
}

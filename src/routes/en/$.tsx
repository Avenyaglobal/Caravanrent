import { createFileRoute } from "@tanstack/react-router";
import { MirrorPage, mirrorHead } from "@/mirror/page";

export const Route = createFileRoute("/en/$")({
  head: ({ params }) => mirrorHead("en", params._splat ?? ""),
  component: EnglishPage,
});

function EnglishPage() {
  const { _splat } = Route.useParams();
  return <MirrorPage lang="en" slug={_splat ?? ""} />;
}

import { createFileRoute } from "@tanstack/react-router";
import { MirrorPage, mirrorHead } from "@/mirror/page";

export const Route = createFileRoute("/ru/")({
  head: () => mirrorHead("ru"),
  component: () => <MirrorPage lang="ru" />,
});

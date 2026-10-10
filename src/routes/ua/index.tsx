import { createFileRoute } from "@tanstack/react-router";
import { MirrorPage, mirrorHead } from "@/mirror/page";

export const Route = createFileRoute("/ua/")({
  head: () => mirrorHead("ua"),
  component: () => <MirrorPage lang="ua" />,
});

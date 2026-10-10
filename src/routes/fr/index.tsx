import { createFileRoute } from "@tanstack/react-router";
import { MirrorPage, mirrorHead } from "@/mirror/page";

export const Route = createFileRoute("/fr/")({
  head: () => mirrorHead("fr"),
  component: () => <MirrorPage lang="fr" />,
});

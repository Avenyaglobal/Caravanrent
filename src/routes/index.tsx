import { createFileRoute } from "@tanstack/react-router";
import { MirrorPage, mirrorHead } from "@/mirror/page";

export const Route = createFileRoute("/")({
  head: () => mirrorHead("es"),
  component: () => <MirrorPage lang="es" />,
});

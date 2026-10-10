import { createFileRoute } from "@tanstack/react-router";
import { MirrorPage, mirrorHead } from "@/mirror/page";

export const Route = createFileRoute("/de/")({
  head: () => mirrorHead("de"),
  component: () => <MirrorPage lang="de" />,
});

import { createFileRoute } from "@tanstack/react-router";
import { MirrorPage, mirrorHead } from "@/mirror/page";

export const Route = createFileRoute("/en/")({
  head: () => mirrorHead("en"),
  component: () => <MirrorPage lang="en" />,
});

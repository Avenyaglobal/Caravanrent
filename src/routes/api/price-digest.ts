import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/price-digest")({
  server: {
    handlers: {
      GET: async () => Response.json({ sent: false, reason: "scheduled" }),
    },
  },
});

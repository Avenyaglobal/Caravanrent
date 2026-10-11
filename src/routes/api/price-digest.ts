import { createFileRoute } from "@tanstack/react-router";
import { sendPriceDigest } from "@/mirror/price-log";

export const Route = createFileRoute("/api/price-digest")({
  server: {
    handlers: {
      GET: async () => Response.json(await sendPriceDigest()),
    },
  },
});

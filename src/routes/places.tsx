import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/places")({
  beforeLoad: () => {
    throw redirect({ to: "/bocconi-101/places", statusCode: 301 });
  },
});

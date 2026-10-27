import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dorm-tours")({
  beforeLoad: () => {
    throw redirect({ to: "/bocconi-101/dorm-tours", statusCode: 301 });
  },
});

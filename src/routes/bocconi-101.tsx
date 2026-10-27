import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/bocconi-101")({
  component: () => <Outlet />,
});

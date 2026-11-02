import { render, screen } from "@testing-library/react";
import { createMemoryRouter, matchRoutes } from "react-router";
import { RouterProvider } from "react-router/dom";
import { describe, expect, it } from "vitest";

import { routes } from "@/router";

describe("App routing", () => {
  it.each([
    "/",
    "/about",
    "/italy",
    "/turkey",
    "/turkish-culture",
    "/bocconi-101",
    "/bocconi-101/dorm-tours",
    "/bocconi-101/places",
    "/bocconi-101/notes",
  ])("matches a page for %s instead of falling back to not found", (path) => {
    expect(matchRoutes(routes, path)?.at(-1)?.route.path).not.toBe("*");
  });

  it("shows the not found page for unknown paths", async () => {
    render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ["/nope"] })} />);

    expect(await screen.findByText("Page not found")).toBeInTheDocument();
  });

  it("redirects old URLs to where the page moved", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/contact"] });
    render(<RouterProvider router={router} />);

    expect(await screen.findByText("Dört temel alan")).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/about");
  });
});

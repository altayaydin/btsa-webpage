import { createBrowserRouter, Navigate, type RouteObject } from "react-router";

import About from "@/pages/about";
import DormTours from "@/pages/bocconi-101/dorm-tours";
import Guide from "@/pages/bocconi-101/guide";
import Notes from "@/pages/bocconi-101/notes";
import Places from "@/pages/bocconi-101/places";
import Home from "@/pages/home";
import Italy from "@/pages/italy";
import { NotFound, RootLayout, RouteError } from "@/pages/root";
import Turkey from "@/pages/turkey";
import TurkishCulture from "@/pages/turkish-culture";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: RouteError,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "italy", Component: Italy },
      { path: "turkey", Component: Turkey },
      { path: "turkish-culture", Component: TurkishCulture },
      {
        path: "bocconi-101",
        children: [
          { index: true, Component: Guide },
          { path: "dorm-tours", Component: DormTours },
          { path: "places", Component: Places },
          { path: "notes", Component: Notes },
        ],
      },
      // Old URLs that moved, kept so existing links still work
      { path: "contact", element: <Navigate to="/about" replace /> },
      { path: "dorm-tours", element: <Navigate to="/bocconi-101/dorm-tours" replace /> },
      { path: "places", element: <Navigate to="/bocconi-101/places" replace /> },
      { path: "*", Component: NotFound },
    ],
  },
];

export const router = createBrowserRouter(routes);

import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Collection } from "./pages/Collection";
import { Breed } from "./pages/Breed";
import { ApiClient } from "./services/clients";
import { Mint } from "./pages/Mint";

const router = createBrowserRouter([
  { path: "/", element: <Collection /> },
  {
    path: "/breed",
    element: <Breed />,
  },
  { path: "/breed/mint", element: <Mint /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

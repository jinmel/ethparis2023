import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Collection } from "./pages/Collection";
import { Breed } from "./pages/Breed";
import { Generate } from "./pages/Generate";
import { ApiClient } from "./services/clients";

const apiClientContext = createContext(new ApiClient("http://localhost:8080"));

const router = createBrowserRouter([
  { path: "/", element: <Collection /> },
  {
    path: "/breed",
    element: <Generate />,
  },
  { path: "/breed/mint", element: <Breed /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

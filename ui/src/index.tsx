import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Collection } from "./page/Collection";
import { Breed } from "./page/Breed";

const router = createBrowserRouter([
  { path: "/", element: <Collection /> },
  { path: "/breed", element: <Breed /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);

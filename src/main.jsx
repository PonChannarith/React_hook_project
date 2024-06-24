
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./page/products/Products";
import AboutUs from "./page/about-us/AboutUs";
import Layout from "./Components/layout/Layout";
import ProductDetails from "./page/product-details/ProductDetails";
import ErrorPage from "./Components/ErrorPage";
import Register from "./page/auth/register/Register"; // Ensure this path is correct

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/product-details",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

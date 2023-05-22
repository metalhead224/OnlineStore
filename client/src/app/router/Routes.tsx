import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ProductDetail from "../../features/catalog/ProductDetail";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import Orders from "../../features/orders/Orders";
import Register from "../account/Register";
import ServerError from "../errors/ServerError";
import Login from "../account/Login";
import ContactPage from "../../features/contact/ContactPage";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import NotFound from "../errors/NotFound";
import RequireAuth from "./RequireAuth";
import Inventory from "../../features/admin/inventory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "checkout", element: <CheckoutWrapper /> },
          { path: "orders", element: <Orders /> },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          { path: "inventory", element: <Inventory /> },
        ],
      },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:id", element: <ProductDetail /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "basket", element: <BasketPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
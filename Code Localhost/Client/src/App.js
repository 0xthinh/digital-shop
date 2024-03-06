import logo from "./logo.svg";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage, { trendingLoader } from "./components/HomePage";
import ShopPage, { productLoader } from "./components/ShopPage";
import DetailPage from "./components/DetailPage";
import CartPage from "./components/CartPage";
import CheckoutPage, { getUserInfo } from "./components/CheckoutPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ErrorPage from "./ErrorPage";
import History from "./components/History";
import HistoryDetail from "./components/HistoryDetail";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  // Create router

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage />, loader: trendingLoader },
        { path: "shop", element: <ShopPage />, loader: productLoader },
        {
          path: "detail/:productId",
          element: <DetailPage />,
          loader: productLoader,
        },
        { path: "cart", element: <CartPage /> },
        { path: "checkout", element: <CheckoutPage />, loader: getUserInfo },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "history", element: <History /> },
        { path: "history/:orderId", element: <HistoryDetail /> },
      ],
    },
  ]);
  return (
    <RouterProvider router={router}>
      <Layout />
    </RouterProvider>
  );
}

export default App;

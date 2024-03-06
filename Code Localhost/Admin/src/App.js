import logo from "./logo.svg";
import "./App.css";
import ErrorPage from "./ErrorPage";
import AdminPage, { checkUser } from "./components/AdminPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import LoginPage from "./components/LoginPage";

function App() {
  // Create router

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        { index: true, element: <AdminPage />, loader: checkUser },
        { path: "login", element: <LoginPage /> },
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

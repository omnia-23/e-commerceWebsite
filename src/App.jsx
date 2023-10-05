import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { UserContext } from "./Context/UserContext";
import NotFound from "./Pages/NotFound";
import { useContext, useEffect } from "react";
import CartProvider from "./Context/CartContext";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";

function App() {
  let { setRole, setToken } = useContext(UserContext);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  }, []);
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      errorElement: <Layout />,
      children: [
        { index: true, element: <Home />, errorElement: <Layout /> },
        { path: "/home", element: <Home />, errorElement: <Layout /> },
        {
          path: "/productdetails/:id",
          element: <ProductDetails />,
          errorElement: <Layout />,
        },
        { path: "/cart", element: <Cart />, errorElement: <Layout /> },
        {
          path: "/checkout/:id",
          element: <Checkout />,
          errorElement: <Layout />,
        },
        { path: "/login", element: <Login />, errorElement: <Layout /> },
        { path: "/register", element: <Register />, errorElement: <Layout /> },
        { path: "*", element: <NotFound />, errorElement: <Layout /> },
      ],
    },
  ]);

  return (
    <>
      <CartProvider>
        <RouterProvider router={routes}></RouterProvider>
      </CartProvider>
    </>
  );
}
export default App;

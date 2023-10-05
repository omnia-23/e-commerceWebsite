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
      errorElement: <Home />,
      children: [
        { index: true, element: <Home />, errorElement: <Home /> },
        { path: "/home", element: <Home />, errorElement: <Home /> },
        {
          path: "/productdetails/:id",
          element: <ProductDetails />,
          errorElement: <Home />,
        },
        { path: "/cart", element: <Cart />, errorElement: <Home /> },
        {
          path: "/checkout/:id",
          element: <Checkout />,
          errorElement: <Home />,
        },
        { path: "/login", element: <Login />, errorElement: <Home /> },
        { path: "/register", element: <Register />, errorElement: <Home /> },
        { path: "*", element: <NotFound />, errorElement: <Home /> },
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

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
import ForgetPassword from "./Pages/ForgetPassword";
import Categories from "./Pages/Categories";
import Brands from "./Pages/Brands";

function App() {
  let { setRole, setToken } = useContext(UserContext);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  }, []);
  const routes = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,

        children: [
          {
            index: true,
            element: <Home />,
            errorElement: <Home />,
          },
          { path: "home", element: <Home />, errorElement: <Home /> },
          {
            path: "categories",
            element: <Categories />,
            errorElement: <Home />,
          },
          { path: "brands", element: <Brands />, errorElement: <Home /> },
          {
            path: "productdetails/:id",
            element: <ProductDetails />,
            errorElement: <Home />,
          },
          { path: "cart", element: <Cart />, errorElement: <Home /> },
          {
            path: "checkout/:id",
            element: <Checkout />,
            errorElement: <Home />,
          },
          { path: "login", element: <Login />, errorElement: <Home /> },
          {
            path: "forgetpassword",
            element: <ForgetPassword />,
            errorElement: <Home />,
          },
          { path: "register", element: <Register />, errorElement: <Home /> },
          { path: "*", element: <NotFound />, errorElement: <Home /> },
        ],
      },
    ],
    { basename: "/e-commerceWebsite" }
  );

  return (
    <div>
      <CartProvider>
        <RouterProvider router={routes}></RouterProvider>
      </CartProvider>
    </div>
  );
}
export default App;

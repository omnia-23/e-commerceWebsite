import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export let CartContext = createContext();

export default function CartProvider(props) {
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState(null);

  let { token } = useContext(UserContext);
  

  async function addtoCart(id) {
    return await axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId: id },
      {
        headers: {
          token: token,
        },
      }
    );
  }

  async function getall() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: {
        token: token,
      },
    });
  }

  async function removeProduct(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers: {
        token: token,
      },
    });
  }
  async function paying(id, body) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
      body,
      {
        headers: {
          token: token,
        },
      }
    );
  }

  async function updateProduct(id, num) {
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count: num,
      },
      {
        headers: {
          token: token,
        },
      }
    );
  }

  return (
    <CartContext.Provider
      value={{
        addtoCart,
        count,
        setCount,
        cart,
        getall,
        setCart,
        removeProduct,
        updateProduct,
        paying,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

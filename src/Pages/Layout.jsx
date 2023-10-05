import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav/Nav";
import Footer from "../Components/Footer/Footer";
import { CartContext } from "../Context/CartContext";

export default function Layout() {
  // let{setCart,setCount,getall}= useContext(CartContext);
  
  // async function get() {
  //   await getall()
  //     .then((res) => {
  //       setCount(res.data.data.products.length);
  //       setCart(res.data.data);
  //     })
  //     .catch((err) => {
  //      console.log(err);
  //     });
  // }
  // useEffect(() => {
  //   get();
  // }, []);

  
  return (
    <>
      <Nav />
      <div className="container web">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

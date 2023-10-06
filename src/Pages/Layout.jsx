import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav/Nav";
import Footer from "../Components/Footer/Footer";

export default function Layout() {
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

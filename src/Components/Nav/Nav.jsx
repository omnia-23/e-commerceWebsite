import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import style from "./nav.module.css";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import logo from "../../images/freshcart-logo.svg";

export default function Nav() {
  let { count, setCart, setCount } = useContext(CartContext);
  let { role, token, setRole, setToken } = useContext(UserContext);
  function logOut() {
    setRole(null);
    setToken(null);
    setCart(null);
    setCount(0);
    localStorage.removeItem("token");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="FreshCart" className="w-100"></img>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/home"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/categories"
              >
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/brands"
              >
                Brands
              </NavLink>
            </li>
          </ul>

          <div className="ms-auto d-flex align-items-center justify-content-between">
            <div>
              <a className={style.link} href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a className={style.link} href="#">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a className={style.link} href="#">
                <i className="fa-brands fa-tiktok"></i>
              </a>
              <a className={style.link} href="#">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a className={style.link} href="#">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a className={style.link} href="#">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <Link className="position-relative text-dark mx-2" to="/cart">
                <i className="fa-solid fa-cart-shopping"></i>
                {count > 0 ? (
                  <span className="position-absolute top-5 start-10 translate-middle badge rounded-pill bg-success">
                    {count}
                  </span>
                ) : (
                  ""
                )}
              </Link>
            </div>
            {role === null || token === null ? (
              <>
                <button className="btn ">
                  <Link className={style.link} to="/register">
                    Register
                  </Link>
                </button>
                <button className="btn">
                  <Link className={style.link} to="/login">
                    Login
                  </Link>
                </button>
              </>
            ) : (
              <button onClick={logOut} className="btn">
                <Link className={style.link} to="/login">
                  Sign Out
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

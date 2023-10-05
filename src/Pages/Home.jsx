import React, { useContext, useEffect, useState } from "react";
import MainSlider from "../Components/Sliders/MainSlider";
import CategorySlider from "../Components/Sliders/CategorySlider";
import axios from "axios";
import $ from "jquery";
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(true);
  let { addtoCart, setCount } = useContext(CartContext);

  async function getProducts(page = 1) {
    setLoad(true);
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoad(false);
    action();
  }

  async function addProduct(id) {
    await addtoCart(id)
      .then((res) => {
        setCount(res.data.numOfCartItems);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  }

  function action() {
    $(".num").on("click", function (e) {
      let p = $(e.target).html();
      getProducts(p);
    });
  }
  useEffect(() => {
    getProducts(1);
  }, []);

  useEffect(() => {
    action();
  }, [load]);

  return (
    <>
      {load ? (
        <div className="loading bg-info">
          <i className="fa-solid fa-spinner fa-spin"></i>
        </div>
      ) : (
        <>
          <Toaster />
          <MainSlider />
          <CategorySlider />
          <div className="row g-2">
            {products
              ? products.map((product) => {
                  return (
                    <div
                      key={product._id}
                      className="col-lg-2 col-md-3 product"
                    >
                      <Link to={"/productdetails/" + product._id}>
                        <div className="cursor-pointer">
                          <img
                            src={product.imageCover}
                            className="w-100"
                            alt={product.title}
                          />
                          <span className="text-main product-title">
                            {product.category.name}
                          </span>
                          <h3 className="h6 fw-bold">
                            {product.title.split(" ").slice(0, 2).join(" ")}
                          </h3>
                          <div className="d-flex justify-content-between my-2">
                            <span className="small">{product.price}$</span>
                            <span className="small">
                              <i className="fa-solid fa-star rating-color"></i>
                              {product.ratingsAverage}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <button
                        onClick={() => {
                          addProduct(product._id);
                        }}
                        className="text-center w-100 bg-main btn text-light"
                      >
                        Add to Cart
                      </button>
                    </div>
                  );
                })
              : ""}
          </div>
          <nav className="my-3 d-flex justify-content-center">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link num">1</a>
              </li>
              <li className="page-item">
                <a className="page-link num">2</a>
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  );
}

import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import toast, { Toaster } from "react-hot-toast";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

export default function ProductDetails() {
  let { addtoCart } = useContext(CartContext);
  let { id } = useParams();
  const [product, setProduct] = useState(null);

  async function getDetails() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        toast.error("Something is wrong, Please try later");
      });
  }

  async function addProduct(id) {
    await addtoCart(id)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <>
      <Toaster />
      {product ? (
        <div className="row">
          <div className="col-md-3">
            <OwlCarousel className="owl-theme" dots loop items="1" autoplay>
              {product.images.map((img, ind) => {
                return (
                  <div className="item">
                    <img src={img} key={ind} className="w-100" alt="" />
                  </div>
                );
              })}
            </OwlCarousel>
          </div>
          <div className="col-md-8 d-flex flex-column justify-content-center">
            <h2 className="mt-5 mb-3">{product.title}</h2>
            <p>{product.description}</p>
            <h6 className="text-main">{product.category.name}</h6>
            <div className="d-flex justify-content-between">
              <span>{product.price} EGP</span>
              <span>
                {product.ratingsAverage}
                <i className="fa-solid fa-star rating-color"></i>
              </span>
            </div>
            <button
              onClick={() => {
                addProduct(product._id);
              }}
              className="text-center w-100 bg-main btn text-light my-3"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

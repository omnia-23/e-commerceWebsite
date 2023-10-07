import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let { cart, removeProduct, updateProduct, getall, setCart, setCount } =
    useContext(CartContext);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    get();
  }, []);
  async function get() {
    await getall()
      .then((res) => {
        setCount(res.data.data.products.length);
        setCart(res.data.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  async function deleteCart(id) {
    await removeProduct(id)
      .then((res) => {
        setCount(res.data.data.products.length);
        setCart(res.data.data);
        toast.success("Done Successfully");
      })
      .catch((err) => {
        toast.error("something went Wrong");
      });
  }

  async function add(id, num) {
    setLoad(true);
    await updateProduct(id, num + 1)
      .then((res) => {
        setCount(res.data.data.products.length);
        setCart(res.data.data);
        toast.success("Done Successfully");
      })
      .catch((err) => {
        toast.error("something went Wrong");
      });
    setLoad(false);
  }

  async function sub(id, num) {
    setLoad(true);
    if (num - 1 > 0) {
      await updateProduct(id, num - 1)
        .then((res) => {
          setCount(res.data.data.products.length);
          setCart(res.data.data);
          toast.success("Done Successfully");
        })
        .catch((err) => {
          toast.error("something went Wrong");
        });
    } else if (num - 1 === 0) {
      deleteCart(id);
    } else toast.error("something went Wrong");

    setLoad(false);
  }

  return (
    <div>
      <Toaster />
      {cart ? (
        <>
          <h2>Shop Cart :</h2>
          <div className="d-flex justify-content-between my-3">
            <h3 className=" text-main">total price : {cart.totalCartPrice}</h3>
            <Link
              to={"/checkout/" + cart._id}
              className="btn bg-main text-light"
            >
              Check out
            </Link>
          </div>
          {cart.products.map((el) => {
            return (
              <div key={el.product._id} className="row py-2 border bg-light">
                <div className="col-md-2">
                  <img src={el.product.imageCover} className="w-100" />
                </div>
                <div className="col-md-10 d-flex flex-column justify-content-around">
                  <h4 className="mt-3">{el.product.title}</h4>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <div className="text-main">price :{el.price}</div>

                    <div className=" d-flex align-items-center">
                      <button
                        disabled={load}
                        className="btn bt bg-danger"
                        onClick={() => sub(el.product._id, el.count)}
                      >
                        -
                      </button>
                      <span className="mx-1 fw-bold fs-5">{el.count}</span>
                      <button
                        disabled={load}
                        className="btn bt bg-main"
                        onClick={() => add(el.product._id, el.count)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteCart(el.product._id)}
                    className="btn bg-main text-light mt-auto"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

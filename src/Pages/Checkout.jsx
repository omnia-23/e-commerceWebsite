import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import { CartContext } from "../Context/CartContext";
import { useParams } from "react-router-dom";

export default function Checkout() {
  let { id } = useParams();

  let { paying } = useContext(CartContext);
  let schema = Yup.object({
    details: Yup.string().required("Details is required"),
    phone: Yup.string().required("phone is required"),
    city: Yup.string().required("city is required"),
  });

  let pay = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: schema,
    onSubmit: function (val) {
      payingCart(val);
    },
  });
  async function payingCart(val) {
    await paying(id, val)
      .then((res) => {
        console.log(res);
        if (res.data.status == "success")
          window.location.href = res.data.session.url;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <form onSubmit={pay.handleSubmit}>
        {pay.errors.details && pay.touched.details ? (
          <div className="alert alert-danger">{pay.errors.details}</div>
        ) : (
          ""
        )}
        <label htmlFor="details" className="mt-3 fs-5">
          Details :
        </label>
        <input
          onChange={pay.handleChange}
          onBlur={pay.handleBlur}
          type="text"
          id="details"
          name="details"
          className="form-control"
        />
        {pay.errors.phone && pay.touched.phone ? (
          <div class="alert alert-danger">{pay.errors.phone}</div>
        ) : (
          ""
        )}
        <label htmlFor="phone" className="mt-3 fs-5">
          Phone :
        </label>
        <input
          onChange={pay.handleChange}
          onBlur={pay.handleBlur}
          type="text"
          id="phone"
          name="phone"
          className="form-control"
        />
        {pay.errors.city && pay.touched.city ? (
          <div className="alert alert-danger">{pay.errors.city}</div>
        ) : (
          ""
        )}
        <label htmlFor="city" className="mt-3 fs-5">
          City :
        </label>
        <input
          onChange={pay.handleChange}
          onBlur={pay.handleBlur}
          type="text"
          id="city"
          name="city"
          className="form-control"
        />

        <button
          disabled={!(pay.isValid && pay.dirty)}
          type="submit"
          className="btn bg-main text-light my-5 w-100"
        >
          Pay
          <i className="fa-regular fa-credit-card mx-2"></i>
        </button>
      </form>
    </>
  );
}

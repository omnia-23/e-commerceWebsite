import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState(null);
  const navigate = useNavigate();

  let validationSchema = Yup.object({
    name: Yup.string().required().min(3, "minimum num of letters is 3"),
    email: Yup.string().required("email is required").email("not valid"),
    password: Yup.string().required("password is required"),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "not matched"),
    phone: Yup.string()
      .required()
      .matches(/^01[0125][0-9]{8}$/, "not valid"),
  });

  async function register(val) {
    setLoading(true);
    let response = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, val)
      .then((res) => {
        if (res.data.message === "success") navigate("/login");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });

    setLoading(false);
  }
  const inp = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit:register,
  });

  return (
    <>
      <div className="container my-5 w-75">
        <h1 className="my-3 fw-bold">Register Now</h1>
        {err !== null ? <div className="alert alert-danger">{err}</div> : ""}
        <form onSubmit={inp.handleSubmit}>
          <label className="my-1" htmlFor="name">
            Name
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Your Name"
            name="name"
            id="name"
            value={inp.values.name}
            onBlur={inp.handleBlur}
            onChange={inp.handleChange}
          ></input>

          {inp.errors.name && inp.touched.name ? (
            <div className="alert alert-danger">{inp.errors.name}</div>
          ) : (
            ""
          )}

          <label className="my-1" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Your Email"
            name="email"
            id="email"
            value={inp.values.email}
            onBlur={inp.handleBlur}
            onChange={inp.handleChange}
          ></input>

          {inp.errors.email && inp.touched.email ? (
            <div className="alert alert-danger">{inp.errors.email}</div>
          ) : (
            ""
          )}
          <label className="my-1" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            placeholder="Enter your password"
            name="password"
            id="password"
            value={inp.values.password}
            onBlur={inp.handleBlur}
            onChange={inp.handleChange}
          ></input>
          {inp.errors.password && inp.touched.password ? (
            <div className="alert alert-danger">{inp.errors.password}</div>
          ) : (
            ""
          )}
          <label className="my-1" htmlFor="password">
            rePassword
          </label>
          <input
            className="form-control"
            type="password"
            placeholder="Enter your password"
            name="rePassword"
            id="rePassword"
            value={inp.values.rePassword}
            onBlur={inp.handleBlur}
            onChange={inp.handleChange}
          ></input>
          {inp.errors.rePassword && inp.touched.rePassword ? (
            <div className="alert alert-danger">{inp.errors.rePassword}</div>
          ) : (
            ""
          )}
          <label className="my-1" htmlFor="password">
            Phone
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter your password"
            name="phone"
            id="phone"
            value={inp.values.phone}
            onBlur={inp.handleBlur}
            onChange={inp.handleChange}
          ></input>
          {inp.errors.phone && inp.touched.phone ? (
            <div className="alert alert-danger">{inp.errors.phone}</div>
          ) : (
            ""
          )}
          {loading ? (
            <button className="btn-main btn my-2" type="button" disabled>
              <i className="fa fa-spinner fa-spin small"></i>
            </button>
          ) : (
            <button
              disabled={!(inp.isValid && inp.dirty)}
              className="btn-main btn my-2"
              type="submit"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}

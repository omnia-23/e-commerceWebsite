import React, { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  let validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("not valid"),
    password: Yup.string().required("password is required"),
  });

  let { setRole, setToken } = useContext(UserContext);
  async function login(val) {
    setLoading(true);

    let response = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, val)
      .then((res) => {
        if (res.data.message === "success") {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", "user");
          setRole("user");
          navigate("/home");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    setLoading(false);
  }
  const inp = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });

  return (
    <>
      <div className="container my-5 w-75">
        <h1 className="my-3 fw-bold">Login</h1>
        {err !== null ? <div className="alert alert-danger">{err}</div> : ""}
        <form onSubmit={inp.handleSubmit}>
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

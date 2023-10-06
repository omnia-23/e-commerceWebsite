import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [emailPage, setEmailPage] = useState(true);
  const [codePage, setCode] = useState(false);
  const [newPass, setNewPass] = useState(false);

  let nav = useNavigate();

  useEffect(() => {
    setEmailPage(true);
    setCode(false);
    setNewPass(false);
  }, []);
  let schema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "You have entered an invalid email address!"
      ),
  });
  let forgetPass = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: function (val) {
      sendemail(val);
    },
  });
  async function sendemail(body) {
    console.log(body);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, body)
      .then((res) => {
        toast.success(res.data.message);
        setEmailPage(false);
        setCode(true);
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err.response.data.message);
      });
  }

  let verify = useFormik({
    initialValues: {
      resetCode: "",
    },
    validate: function (val) {
      let err = {};
      if (!val.resetCode) err.resetCode = "Code is required";
      else if (!/^[0-9]{1,}$/.test(val.resetCode))
        err.resetCode = "Code must be numbers";
      return err;
    },
    onSubmit: function (val) {
      sendcode(val);
    },
  });
  async function sendcode(body) {
    console.log(body);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, body)
      .then((res) => {
        console.log(res);
        toast.success(res.data.status);
        setNewPass(true);
        setCode(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  let Password = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validate: function (val) {
      let err = {};
      if (!val.email) err.email = "Email is required";
      else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val.email))
        err.email = "Email is not valid";
      if (!val.newPassword) err.newPassword = "new password is required";
      else if (val.newPassword.length < 6)
        err.newPassword = "minimum length is 6";
      return err;
    },
    onSubmit: function (val) {
      sendnewpassword(val);
    },
  });
  async function sendnewpassword(body) {
    console.log(body);
    await axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, body)
      .then((res) => {
        console.log(res);
        toast.success("Done Successfully!");
        nav("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  }

  return (
    <>
      <Toaster />
      {emailPage ? (
        <form onSubmit={forgetPass.handleSubmit}>
          <h4>Forget Password:</h4>

          <label htmlFor="email" className="fs-5 mt-3">
            Email
          </label>
          {forgetPass.errors.email && forgetPass.touched.email ? (
            <div className="alert alert-danger">{forgetPass.errors.email}</div>
          ) : (
            ""
          )}
          <input
            onChange={forgetPass.handleChange}
            onBlur={forgetPass.handleBlur}
            type="email"
            name="email"
            id="email"
            className="form-control"
          />
          <button
            disabled={!(forgetPass.dirty && forgetPass.isValid)}
            className="btn bg-main text-light my-2 ms-auto d-block"
          >
            Send Code
          </button>
        </form>
      ) : (
        ""
      )}

      {codePage ? (
        <form onSubmit={verify.handleSubmit}>
          {verify.errors.resetCode && verify.touched.resetCode ? (
            <div className="alert alert-danger">{verify.errors.resetCode}</div>
          ) : (
            ""
          )}
          <label htmlFor="resetCode" className="fs-5 mt-3">
            Enter the Code
          </label>
          <input
            type="text"
            name="resetCode"
            id="resetCode"
            onChange={verify.handleChange}
            onBlur={verify.handleBlur}
            className="form-control"
          ></input>
          <button
            disabled={!(verify.dirty && verify.isValid)}
            className="btn bg-main text-light my-2 ms-auto d-block"
          >
            Send Code
          </button>
        </form>
      ) : (
        ""
      )}
      {newPass ? (
        <form onSubmit={Password.handleSubmit}>
          {Password.errors.email && Password.touched.email ? (
            <div className="alert alert-danger">{Password.errors.email}</div>
          ) : (
            ""
          )}
          <label htmlFor="email" className="fs-5 mt-3">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={Password.handleChange}
            onBlur={Password.handleBlur}
            className="form-control"
          ></input>

          {Password.errors.newPassword && Password.touched.newPassword ? (
            <div className="alert alert-danger">
              {Password.errors.newPassword}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="newPassword" className="fs-5 mt-3">
            New Password
          </label>
          <input
            type="text"
            name="newPassword"
            id="newPassword"
            onChange={Password.handleChange}
            onBlur={Password.handleBlur}
            className="form-control"
          ></input>
          <button
            disabled={!(Password.dirty && Password.isValid)}
            className="btn bg-main text-light my-2 ms-auto d-block"
          >
            Submit
          </button>
        </form>
      ) : (
        ""
      )}
    </>
  );
}

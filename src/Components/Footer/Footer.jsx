import React from "react";
import logo1 from "../../images/Amazon_Pay-Logo.wine.svg";
import logo2 from "../../images/paypal-seeklogo.com.svg";

export default function Footer() {
  return (
    <footer className="bg-light my-4">
      <div className="container py-5 ">
        <h5 className="fw-bold">Get the FreshCart app</h5>
        <p>we will send you a link,open it on your phone to download the app</p>
        <div className="d-flex justify-content-between">
          <input
            type="email"
            placeholder="Email"
            className="form-control w-75"
          />
          <button className="btn bg-main text-light">Share the app link</button>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span>payment partners :</span>
            <img width={100} src={logo1} alt="amazon logo"></img>
            <img width={70} src={logo2} alt="paypal logo"></img>
          </div>
          <span className="fw-bold">Get deliveries with FreshCart</span>
        </div>
      </div>
    </footer>
  );
}

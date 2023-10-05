import React from "react";
import notfound from "../images/error.svg";

export default function NotFound() {
  return (
    <div className="my-5 d-flex justify-content-center">
      <img src={notfound} />
    </div>
  );
}

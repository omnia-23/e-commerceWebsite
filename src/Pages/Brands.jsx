import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Brands() {
  const [load, setLoad] = useState(true);
  const [brands, setBrands] = useState([]);

  function getBrands() {
    setLoad(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        setBrands(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoad(false);
  }

  useEffect(() => {
    getBrands();
  }, []);
  return (
    <>
      {load ? (
        <div className="loading bg-info">
          <i className="fa-solid fa-spinner fa-spin"></i>
        </div>
      ) : (
        <>
          <div className="row g-5">
            {brands
              ? brands.map((elm) => {
                  return (
                    <>
                      <div className="col-md-3">
                        <div className="card text-center">
                          <img
                            src={elm.image}
                            className="card-img-top"
                            alt={elm.name}
                          />
                          <h5 className="card-title fw-bold my-3">
                            {elm.name}
                          </h5>
                        </div>
                      </div>
                    </>
                  );
                })
              : ""}
          </div>
        </>
      )}
    </>
  );
}

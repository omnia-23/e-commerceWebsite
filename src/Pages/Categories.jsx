import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Categories() {
  const [load, setLoad] = useState(true);
  const [category, setCategory] = useState([]);
  function getCategory() {
    setLoad(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoad(false);
  }

  useEffect(() => {
    getCategory();
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
            {category
              ? category.map((elm) => {
                  return (
                    <div key={elm._id} className="col-md-3">
                      <div className="card text-center">
                        <img
                          src={elm.image}
                          className="card-img-top"
                          alt={elm.name}
                        />
                        <h5 className="card-title fw-bold my-3">{elm.name}</h5>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </>
      )}
    </>
  );
}

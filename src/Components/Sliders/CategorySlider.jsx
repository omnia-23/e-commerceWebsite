import axios from "axios";
import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function CategorySlider() {
  const [list, setList] = useState([]);

  async function getData() {
    let res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setList(res?.data?.data);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <h5>Shop Popular Category</h5>
      <OwlCarousel className="owl-theme" dots loop items="8" autoplay>
        {list
          ? list.map((e) => {
              return (
                <div key={e._id} className="item">
                  <img src={e.image} className="w-100" height={150}></img>
                  <span className="title">{e.name}</span>
                </div>
              );
            })
          : ""}
      </OwlCarousel>
    </>
  );
}

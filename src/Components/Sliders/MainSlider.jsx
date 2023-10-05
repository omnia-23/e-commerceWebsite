import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import img1 from "../../images/slider-image-1.jpeg";
import img2 from "../..//images/slider-image-2.jpeg";
import img3 from "../../images/slider-image-3.jpeg";

import blog1 from "../../images/grocery-banner.png";
import blog2 from "../../images/grocery-banner-2.jpeg";

export default function MainSlider() {
  return (
    <>
      <header className="header my-5">
        <div className="row g-0">
          <div className="col-8">
            <OwlCarousel className="owl-theme" dots loop items="1" autoplay>
              <div className="item">
                <img src={img3} height={400} className="w-100"></img>
              </div>
              <div className="item">
                <img src={img1} height={400} className="w-100"></img>
              </div>
              <div className="item">
                <img src={img2} height={400} className="w-100"></img>
              </div>
            </OwlCarousel>
          </div>
          <div className="col-4">
            <div className="row">
              <img height={200} src={blog1} className="w-100" />
            </div>
            <div className="row">
              <img height={200} src={blog2} className="w-100" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

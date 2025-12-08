import React, { memo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slick.scss";
import Logo from "../../styles/image/Logo.png";

import CardProductCbn from "../card/cardProduct/CardProductCbn";
const SlickProduct = (props) => {
  const { data, slidesToShow, slidesToScroll, category } = props;
  var settings = {
    dots: false,
    infinite: true,
    pauseOnHover: false,
    autoplay: true,
    speed: 500,
    slidesToShow: slidesToShow ? slidesToShow : 1,
    slidesToScroll: slidesToScroll ? slidesToScroll : 1,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div>
      <div className="box-product--main">
        <div className="box-product--main--header">
          <img src={Logo} className="right--image" alt="" />
          <h1>{category?.name}</h1>
        </div>
      </div>
      <Slider {...settings}>
        {data?.map((item) => (
          <div className="slick--size" key={item._id}>
            <CardProductCbn data={item} key={item._id} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default memo(SlickProduct);

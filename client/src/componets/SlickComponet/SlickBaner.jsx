import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slick.scss";
export default function Slick(props) {
  const { data, slidesToShow, slidesToScroll } = props;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow ? slidesToShow : 1,
    slidesToScroll: slidesToScroll ? slidesToScroll : 1,
  };
  return (
    <Slider {...settings}>
      {data?.map((el, index) => {
        return (
          <div className="slick--size" key={index}>
            <img className="slick--size--image" src={el?.image?.url} alt="" />
          </div>
        );
      })}
    </Slider>
  );
}

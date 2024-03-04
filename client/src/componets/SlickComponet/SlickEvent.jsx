import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slick.scss";
import CardEventCbn from "../card/cardEvent/CardEventCbn";
export default function SlickEvent(props) {
  const { data, slidesToShow, slidesToScroll } = props;
  var settings = {
    dots: false,
    infinite: true,
    pauseOnHover: false,
    autoplay: true,
    speed: 500,
    slidesToShow: slidesToShow ? slidesToShow : 1,
    slidesToScroll: slidesToScroll ? slidesToScroll : 1,
  };
  return (
    <Slider {...settings}>
      {data?.map((el, index) => {
        return (
          <div className="slick--size" key={index}>
            <CardEventCbn data={el} />
          </div>
        );
      })}
    </Slider>
  );
}

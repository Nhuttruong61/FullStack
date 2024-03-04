import React from "react";
import "./Event.scss";
import saleImage from "../../styles/image/icon-fs.png";
import { useSelector } from "react-redux";
import SlickEvent from "../SlickComponet/SlickEvent";
function Event() {
  const { data } = useSelector((state) => state.products);
  return (
    <div className="content">
      <div className="event-container">
        <div className="event-container--top">
          <img src={saleImage} alt="" />
        </div>
        <div className="event-container--bottom">
          <SlickEvent data={data} slidesToShow={5} />
        </div>
      </div>
    </div>
  );
}

export default Event;

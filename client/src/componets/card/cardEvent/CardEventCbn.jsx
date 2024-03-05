import React from "react";
import "./Card.scss";
import { formatNumber } from "../../../helper/format";
function CardEventCbn({ data }) {
  return (
    <div className="box-card-event">
      <div className="box-card-event--image">
        <img src={data.image[0].url} alt="" />
      </div>
      <div className="box-card-event--content">
        <p className="box-card-event--content--name">{data?.name}</p>
        <p className="box-card-event--content--price">
          {formatNumber(data?.price)}
        </p>
        <p className="box-card-event--content--sale">
          {formatNumber(data?.price - (data?.price * data.discount) / 100)}
        </p>
        <div className="box-card-event--content--loader">
          <div className="box-card-event--content--loader--color">
            Còn {data?.quality}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardEventCbn;

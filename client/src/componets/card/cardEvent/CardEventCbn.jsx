import React from "react";
import "./Card.scss";
import { formatNumber } from "../../../helper/format";
function CardEventCbn({ data }) {
  return (
    <div className="box-card">
      <div className="box-card--image">
        <img src={data.image[0].url} alt="" />
      </div>
      <div className="box-card--content">
        <p className="box-card--content--name">{data?.name}</p>
        <p className="box-card--content--price">{formatNumber(data?.price)}</p>
        <p className="box-card--content--sale">
          {formatNumber(data?.price - (data?.price * data.discount) / 100)}
        </p>
        <div className="box-card--content--loader">
          <div className="box-card--content--loader--color">
            Còn {data?.quality}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardEventCbn;

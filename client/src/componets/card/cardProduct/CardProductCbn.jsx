import React from "react";
import "./Card.scss";
import { formatNumber } from "../../../helper/format";
function CardProductCbn({ data }) {
  return (
    <div key={data?.id} className="box-card-product">
      <div className="box-card-product--image">
        <img
          className="box-card-product--image--img"
          src={data.image[0].url}
          alt=""
        />
      </div>
      <div className="box-card-product--content">
        <p className="box-card-product--content--name">{data?.name}</p>
        {data?.discount ? (
          <div className="box-card-product--content--monney">
            <p className="box-card-product--content--monney--price">
              {formatNumber(data?.price)}
            </p>
            <p className="box-card-product--content--monney--sale">
              {formatNumber(data?.price - (data?.price * data.discount) / 100)}
            </p>
          </div>
        ) : (
          <div className="box-card-product--content--monney">
            <p className="box-card-product--content--monney--sale">
              {formatNumber(data?.price)}
            </p>
          </div>
        )}

        <div className="box-card-product--content--loader">
          <div className="box-card-product--content--loader--color">
            Còn {data?.quality}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProductCbn;

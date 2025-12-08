import React, { memo } from "react";
import "./Card.scss";
import { formatNumber } from "../../../helper/format";
import withBase from "../../../hocs/withBase.js";
import CountdownTimer from "../../Timer/CountdownTimer";

function CardEventCbn({ data, navigate, showTimer = true }) {
  const eventDiscount = data?.eventDiscount || data?.discount || 0;
  const originalPrice = parseFloat(data?.price) || 0;
  const discountedPrice = originalPrice - (originalPrice * eventDiscount) / 100;

  return (
    <div className="box-card-event" onClick={() => navigate(`/product/${data.slug || data._id}`)}>
      <div className="box-card-event--image">
        <img src={data?.image?.[0]?.url || data?.image} alt={data?.name} />
        {data?.eventDiscount && (
          <div className="event-badge">
            -{data.eventDiscount}%
          </div>
        )}
      </div>
      <div className="box-card-event--content">
        <p className="box-card-event--content--name">{data?.name}</p>
        <p className="box-card-event--content--price">{formatNumber(originalPrice)}</p>
        <p className="box-card-event--content--sale">
          {formatNumber(discountedPrice)}
        </p>
        
        {showTimer && data?.eventEndDate && (
          <div className="box-card-event--timer" onClick={(e) => e.stopPropagation()}>
            <CountdownTimer endDate={data.eventEndDate} />
          </div>
        )}
      </div>
    </div>
  );
}

export default withBase(memo(CardEventCbn));

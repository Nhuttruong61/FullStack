import React, { Suspense, lazy } from "react";
import "./Event.scss";
import saleImage from "../../styles/image/icon-fs.png";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
const SlickEvent = lazy(() => import("../Slick/SlickEvent"));
function Event() {
  const { data } = useSelector((state) => state.products);
  const dataEvent = data ? data.filter((el) => el?.discount > 0) : [];
  return !data || data?.length < 3 ? null : (
    <div className="content">
      <div className="event-container">
        <div className="event-container--top">
          <img src={saleImage} alt="" />
        </div>
        <div className="event-container--bottom">
          <Suspense fallback={<Loading />}>
            <SlickEvent data={dataEvent} slidesToShow={5} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Event;

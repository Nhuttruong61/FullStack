import React, { Suspense, lazy } from "react";
import "./Event.scss";
import saleImage from "../../styles/image/icon-fs.png";
import { useSelector } from "react-redux";
import Loading from "../LoadingComponet/Loading";
const SlickEvent = lazy(() => import("../SlickComponet/SlickEvent"));
function Event() {
  const { data } = useSelector((state) => state.products);
  return (
    <div className="content">
      <div className="event-container">
        <div className="event-container--top">
          <img src={saleImage} alt="" />
        </div>
        <div className="event-container--bottom">
          <Suspense fallback={<Loading />}>
            <SlickEvent data={data} slidesToShow={5} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Event;

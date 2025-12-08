import React, { Suspense, lazy, useEffect, useState } from "react";
import "./Event.scss";
import saleImage from "../../styles/image/icon-fs.png";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import * as eventApi from "../../api/event";
import CountdownTimer from "../Timer/CountdownTimer";
const SlickEvent = lazy(() => import("../Slick/SlickEvent"));

function Event() {
  const { data: products } = useSelector((state) => state.products);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchActiveEvents();
  }, []);

  const fetchActiveEvents = async () => {
    try {
      setLoading(true);
      const res = await eventApi.getActiveEvents();
      if (res?.success && res.events?.length > 0) {
        setEvents(res.events);
      } else {
        setEvents([]);
      }
    } catch (e) {
      console.error("Error fetching events:", e);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };
  console.log(events)

  if (loading) {
    return <Loading />;
  }

  if (!events || events.length === 0) {
    return null;
  }

  const eventProducts = events.flatMap((event) => 
    event.products?.map((product) => ({
      ...product,
      eventDiscount: event.discountPercent,
      eventId: event._id,
      eventEndDate: event.endDate,
    })) || []
  );

  return !eventProducts || eventProducts.length < 3 ? null : (
    <div className="content">
      <div className="event-container">
        <div className="event-container--top">
          <img src={saleImage} alt="Flash Sale" />
          {events[0]?.endDate && (
            <CountdownTimer endDate={events[0].endDate} />
          )}
        </div>
        <div className="event-container--bottom">
          <Suspense fallback={<Loading />}>
            <SlickEvent data={eventProducts} slidesToShow={5} isEvent={true} showTimer={false} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Event;

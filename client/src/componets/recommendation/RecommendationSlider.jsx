import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./RecommendationSlider.scss";
import { fetchForYouRecommendations, fetchTrendingProducts } from "../../redux/slice/recommendationSlice";
import CardProductCbn from "../card/cardProduct/CardProductCbn";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function RecommendationSlider({ title = "For You", type = "forYou", limit = 12 }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { forYou, trending } = useSelector((state) => state.recommendation);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = React.useRef(null);

  const data = type === "forYou" ? forYou : trending;

  useEffect(() => {
    if (type === "forYou" && user) {
      dispatch(fetchForYouRecommendations({ limit }));
    } else if (type === "trending") {
      dispatch(fetchTrendingProducts(limit));
    }
  }, [dispatch, limit, type, user]);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const newPosition = direction === "left" ? scrollPosition - scrollAmount : scrollPosition + scrollAmount;

    container.scrollLeft = newPosition;
    setScrollPosition(newPosition);
  };

  if (!data || !data.data) {
    return null;
  }

  if (data.loading) {
    return (
      <div className="recommendation-slider loading">
        <div className="skeleton-loader">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      </div>
    );
  }

  if (data.data.length === 0) {
    return null;
  }

  return (
    <div className="recommendation-slider">
      <div className="recommendation-slider--header">
        <h2>{title}</h2>
        <p className="recommendation-slider--subtitle">
          {type === "forYou" ? "Gợi ý " : "Sản phẩm đang hot"}
        </p>
      </div>

      <div className="recommendation-slider--container">
        {scrollPosition > 0 && (
          <button className="scroll-btn scroll-btn--left" onClick={() => handleScroll("left")}>
            <FaChevronLeft size={20} />
          </button>
        )}

        <div className="recommendation-slider--content" ref={scrollContainerRef}>
          {data?.data && data.data.map((product) => (
            <div key={product._id} className="recommendation-slider--item">
              <CardProductCbn data={product} />
            </div>
          ))}
        </div>

        {data?.data && scrollPosition < (data.data.length - 4) * 300 && (
          <button className="scroll-btn scroll-btn--right" onClick={() => handleScroll("right")}>
            <FaChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export default RecommendationSlider;
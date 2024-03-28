import React, { memo } from "react";
import "./CardBlog.scss";
import withBase from "../../../hocs/withBase";
function CardBlog({ data, navigate }) {
  return (
    <div className="cardBlog" onClick={() => navigate("")}>
      <div className="cardBlog--image">
        <img src={data?.avatar?.url} alt="" srcset="" />
      </div>
      <div className="cardBlog--content">
        <h3>
          {data?.title.length > 100
            ? data?.title.slice(0, 100) + "..."
            : data?.title}
        </h3>
      </div>
    </div>
  );
}

export default withBase(memo(CardBlog));

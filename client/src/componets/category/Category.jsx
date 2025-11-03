import React, { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import "./Category.scss";
import withBase from "../../hocs/withBase";
function Category({ navigate }) {
  const { data } = useSelector((state) => state.category);
  const handleNavigate = useCallback((el) => {
    navigate(`/category/${el.slug}`);
  }, []);
  return (
    <div className="content">
      <div className="box-category">
        {data?.map((el) => {
          return (
            <div key={el?._id} className="box-category--card" onClick={() => handleNavigate(el)}>
              <img src={el?.image?.url} alt="" />
              <p>{el?.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default withBase(memo(Category));

import React from "react";
import { useSelector } from "react-redux";
import "./Category.scss";
function Category() {
  const { data } = useSelector((state) => state.category);
  return (
    <div className="content">
      <div className="box-category">
        {data?.map((el) => {
          console.log("el", el);
          return (
            <div key={el?.id} className="box-category--card">
              <img src={el?.image?.url} alt="" />
              <p>{el?.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;

import React from "react";
import User from "../User/User";
import Dashboard from "../Dashboard/Dashboard";
import Category from "../AdminCategory/AdminCategory";
import Product from "../AdminProduct/AdminProduct";
import Order from "../AdminOrder/AdminOrder";
import Banner from "../AdminBanner/Banner";

function AminItem({ active }) {
  let content = null;

  switch (active) {
    case 1:
      content = <Dashboard />;
      break;
    case 2:
      content = <User />;
      break;
    case 3:
      content = <Category />;
      break;
    case 4:
      content = <Product />;
      break;
    case 5:
      content = <Order />;
      break;
    case 6:
      content = <Banner />;
      break;
    default:
      content = <div>AminItem</div>;
      break;
  }

  return content;
}

export default AminItem;

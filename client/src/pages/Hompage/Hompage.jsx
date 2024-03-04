import React, { useEffect, useState } from "react";
import Header from "../../componets/headerComponet/Header";
import "./Homepage.scss";
import Slick from "../../componets/SlickComponet/SlickBaner";
import { getBanner } from "../../api/banner";
import Event from "../../componets/eventComponet/Event";
import Category from "../../componets/categoryComponet/Category";
function Hompage() {
  const [dataBanner, setDataBanner] = useState([]);
  const fetchbanner = async () => {
    const res = await getBanner();
    setDataBanner(res?.response);
  };

  useEffect(() => {
    fetchbanner();
  }, []);
  return (
    <div className="container">
      <div className="container--header">
        <div className="content">
          <Header />
        </div>
      </div>
      <div className="container--banner">
        <Slick data={dataBanner} />
      </div>
      <div className="container--event">
        <Event />
      </div>
      <div className="container--category">
        <Category />
      </div>
    </div>
  );
}

export default Hompage;

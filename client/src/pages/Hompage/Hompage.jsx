import React, { memo, useEffect, useState, lazy, Suspense } from "react";
import "./Homepage.scss";
import { getBanner } from "../../api/banner";
import Event from "../../componets/eventComponet/Event";
import Category from "../../componets/category/Category";
import Product from "../../componets/product/Product";
import { useSelector } from "react-redux";
import intro from "../../styles/videos/intro.mp4";
import { FiCheckCircle } from "react-icons/fi";
import { LuTruck } from "react-icons/lu";
import { IoShieldOutline } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";
import Loading from "../../componets/Loading/Loading";
const Blog = lazy(() => import("../../componets/blog/Blog"));
const Slick = lazy(() => import("../../componets/Slick/SlickBaner"));
function Hompage() {
  const [dataBanner, setDataBanner] = useState([]);
  const { data } = useSelector((state) => state.products);
  const { data: category } = useSelector((state) => state.category);
  const fetchbanner = async () => {
    const res = await getBanner();
    setDataBanner(res?.response);
  };

  useEffect(() => {
    fetchbanner();
  }, []);
  return (
    <div className="container">
      <div className="container--banner">
        <Suspense fallback={<Loading />}>
          <Slick data={dataBanner} />
        </Suspense>
      </div>
      <div className="container--event">
        <Event />
      </div>
      <div className="container--category">{category && <Category />}</div>
      <div className="container--product">
        <div className="content">
          <div className="container--product--item">
            {category?.map((el) => {
              const filteredData = data
                ?.filter((item) => item?.category.name === el?.name)
                .slice(0, 4);
              if (filteredData?.length > 0) {
                return (
                  <Product key={el.id} category={el} data={filteredData} />
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
      <div className="container--blog">
        <Suspense fallback={<Loading />}>
          <Blog />
        </Suspense>
      </div>
      <div className="container--video">
        <video autoPlay muted loop>
          <source src={intro} type="video/mp4" />
        </video>
      </div>
      <div className="container--des">
        <>
          <div className="container--des--name">
            <p style={{ color: "white" }}>Top</p>
            <p style={{ color: "red" }}>P</p>
            <p style={{ color: "green" }}>h</p>
            <p style={{ color: "blue" }}>o</p>
            <p style={{ color: "pink" }}>n</p>
            <p style={{ color: "purple" }}>e</p>
          </div>
          <p className="container--des--text">
            <p>
              Tại TopPhone, khách hàng yêu mến hệ sinh thái Apple sẽ tìm thấy
              đầy đủ và đa dạng nhất các sản phẩm như
            </p>
            <p>
              iPhone, iPad, Apple Watch, MacBook và các phụ kiện Apple... với
              không gian mua sắm đẳng cấp, hiện đại.
            </p>
          </p>
        </>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div className="content">
          <div className="container--policy">
            <span>
              <FiCheckCircle size={32} />
              <p>Mẫu mã đa dạng, chính hãng</p>
            </span>
            <span>
              <LuTruck size={32} />
              <p>Giao hàng toàn quốc</p>
            </span>{" "}
            <span>
              <IoShieldOutline size={32} />
              <p>Bảo hành có cam kết tới 12 tháng</p>
            </span>{" "}
            <span>
              <FiRefreshCw size={32} />
              <p>Có thể đổi trả tại</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Hompage);

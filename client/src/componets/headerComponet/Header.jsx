import React, { useState } from "react";
import { useSelector } from "react-redux";
import { memo } from "react";
import Logo from "../../styles/image/Logo.png";
import "./Header.scss";
import { RiSearchLine } from "react-icons/ri";
import { IoBagOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import Input from "../inputComponet/Input";
import { MdClose } from "react-icons/md";
function Header() {
  const { data, isLoading } = useSelector((state) => state.category);
  const [active, setActive] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const handleNavigate = (active) => {
    setActive(active);
  };
  const handleStatusSearch = () => {
    setShowSearch(!showSearch);
  };
  return (
    <div className="header">
      <div className={`header--content ${showSearch && "none"}`}>
        <div className="header--content--left">
          <div className="left">
            <p>Top</p>
            <p style={{ color: "red" }}>P</p>
            <p style={{ color: "green" }}>h</p>
            <p style={{ color: "blue" }}>o</p>
            <p style={{ color: "pink" }}>n</p>
            <p style={{ color: "purple" }}>e</p>
          </div>
          <div className="right">
            <img src={Logo} className="right--image" alt="" srcset="" />
          </div>
        </div>
        <div className="header--content--center">
          {data?.map((el, index) => {
            return (
              <div
                className={`box  ${index == active && "active"}`}
                key={el?.id}
                onClick={() => handleNavigate(index)}
              >
                <p className="item">{el?.name}</p>
              </div>
            );
          })}
        </div>
        <div className="header--content--right">
          <div style={{ display: "flex" }}>
            <label onClick={handleStatusSearch}>
              <RiSearchLine />
            </label>
            <label>
              <IoBagOutline />
            </label>
          </div>
          <div className="">
            <label>
              <FaRegUser />
            </label>
          </div>
        </div>
      </div>
      {showSearch && (
        <div className="header--search">
          <label>
            <RiSearchLine />
          </label>
          <Input />
          <label onClick={handleStatusSearch}>
            <MdClose />
          </label>
        </div>
      )}
    </div>
  );
}

export default memo(Header);
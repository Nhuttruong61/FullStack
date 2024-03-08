import React, { memo } from "react";
import "./Header.scss";
import { useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import Logo from "../../../styles/image/Logo.png";
import withBase from "../../../hocs/withBase";
function Header({ navigate }) {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="header-ad">
      <div
        className="header-ad--left"
        onClick={() => {
          navigate("/");
        }}
      >
        <p style={{ margin: 0, fontSize: "20px" }}>Top</p>
        <p style={{ margin: 0, fontSize: "20px", color: "red" }}>P</p>
        <p style={{ margin: 0, fontSize: "20px", color: "green" }}>h</p>
        <p style={{ margin: 0, fontSize: "20px", color: "blue" }}>o</p>
        <p style={{ margin: 0, fontSize: "20px", color: "pink" }}>n</p>
        <p style={{ margin: 0, fontSize: "20px", color: "purple" }}>e</p>
        <img src={Logo} className="right--image" alt="" />
      </div>
      <div className="header-ad--right">
        <div className="header-ad--right--image">
          <FaRegUser size={20} />
        </div>
        <p>{user?.name}</p>
      </div>
    </div>
  );
}

export default withBase(memo(Header));

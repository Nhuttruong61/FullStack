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
        <img src={Logo} className="header-ad--logo" alt="Logo" />
        <div className="header-ad--brand">
          <p className="header-ad--brand-main">TopPhone</p>
          <p className="header-ad--brand-sub">Quản Lý</p>
        </div>
      </div>
      <div className="header-ad--right">
        <div className="header-ad--user-info">
          <div className="header-ad--avatar">
            <FaRegUser size={18} />
          </div>
          <span className="header-ad--username">{user?.name}</span>
        </div>
      </div>
    </div>
  );
}

export default withBase(memo(Header));

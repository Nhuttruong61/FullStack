import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { memo } from "react";
import Logo from "../../styles/image/Logo.png";
import "./Header.scss";
import { RiSearchLine } from "react-icons/ri";
import { IoBagOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import Input from "../common/inputComponet/Input";
import { MdClose } from "react-icons/md";
import Screen from "../screenOverlay/Screen";
import withBase from "../../hocs/withBase";
import { userTK } from "../../api/user";
import { getUser } from "../../redux/slice/userSlice";
import Cookies from "js-cookie";
function Header({ navigate, dispatch }) {
  const { data, isLoading } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.user);
  const [active, setActive] = useState(-1);
  const [showSearch, setShowSearch] = useState(false);
  const [showInFor, setShowInFor] = useState(false);
  const handleNavigate = (active, el) => {
    setActive(active);
    navigate(`/category/${el.name}`);
  };
  const fetchUser = async () => {
    try {
      const res = await userTK();
      if (res.success) {
        dispatch(getUser(res?.user));
      } else {
        dispatch(getUser(null));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleStatusSearch = () => {
    setShowSearch(!showSearch);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="header">
      <div className="content">
        <div className={`header--content ${showSearch && "none"}`}>
          <div
            className="header--content--left"
            onClick={() => {
              navigate("/");
            }}
          >
            <div className="left">
              <p>Top</p>
              <p style={{ color: "red" }}>P</p>
              <p style={{ color: "green" }}>h</p>
              <p style={{ color: "blue" }}>o</p>
              <p style={{ color: "pink" }}>n</p>
              <p style={{ color: "purple" }}>e</p>
            </div>
            <div className="right">
              <img src={Logo} className="right--image" alt="" />
            </div>
          </div>
          <div className="header--content--center">
            {data?.map((el, index) => {
              return (
                <div
                  className={`box  ${index === active && "active"}`}
                  key={el?.id}
                  onClick={() => handleNavigate(index, el)}
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
            {user ? (
              <div
                className="header--content--right--user"
                onClick={() => setShowInFor(!showInFor)}
              >
                <label>
                  <FaRegUser />
                </label>
                {showInFor && (
                  <div className="header--content--right--user--show">
                    {user?.role == "Admin" && (
                      <div>
                        <p onClick={() => navigate("/admin")}>Quản lý</p>
                      </div>
                    )}
                    <div>
                      <p>Tài khoản</p>
                    </div>
                    <div
                      onClick={() => {
                        Cookies.remove("accesstoken");
                        dispatch(getUser(null));
                        navigate("/auth");
                      }}
                    >
                      <p>Đăng xuất</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="authen" onClick={() => navigate("/auth")}>
                Login
              </div>
            )}
            <p
              onClick={() => setShowInFor(!showInFor)}
              style={{ color: "white", paddingLeft: "8px", cursor: "pointer" }}
            >
              {user?.name}
            </p>
          </div>
        </div>
        <div className="search">
          {showSearch && (
            <div className="header--search">
              <label>
                <RiSearchLine />
              </label>
              <Input placeholder="Tìm kiếm sản phẩm" />
              <label onClick={handleStatusSearch}>
                <MdClose />
              </label>
            </div>
          )}
        </div>
        {showSearch && <Screen />}
      </div>
    </div>
  );
}

export default withBase(memo(Header));

import React, { useEffect, useRef, useState } from "react";
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
import { resfesToken, userTK } from "../../api/user";
import { getUser } from "../../redux/slice/userSlice";
import Cookies from "js-cookie";
import { getProductSearch } from "../../api/product";
import { formatNumber } from "../../helper/format";
import { getCartUser } from "../../redux/slice/cartSlice";
import { IoMenu } from "react-icons/io5";
import Sidebar from "../sidebar/Sidebar";
import WishlistIcon from "../wishlist/WishlistIcon";
import { useSettings } from "../../contexts/SettingsContext";
function Header({ navigate, dispatch }) {
  const { settings } = useSettings();
  const { data } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.user);
  const [active, setActive] = useState(-1);
  const [showSearch, setShowSearch] = useState(false);
  const [showInFor, setShowInFor] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [listSearch, setListSearch] = useState([]);
  const [activeHeader, setActiveHeader] = useState(false);
  const [listMenuRpt, setListMenuRp] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const refSearch = useRef(null);
  const userMenuRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const { data: cart } = useSelector((state) => state.car);
  const handleNavigate = (active, el) => {
    setActive(active);
    navigate(`/category/${el.slug}`);
    document.title = `${el?.name}`;
  };
  const handleNavigateBlog = () => {
    setActive(7);
    setListMenuRp(false);
    navigate("/blog");
    document.title = "Tin tức";
  };

  const fetchUser = async () => {
    const accessToken = Cookies.get("accesstoken");
    if (!accessToken) {
      dispatch(getUser(null));
      dispatch(getCartUser(null));
      return;
    }
    try {
      const res = await userTK();
      if (res.success) {
        dispatch(getUser(res?.user));
        dispatch(getCartUser(res?.user?.cart));
      }
    } catch (e) {
      if (e?.response?.status === 401) {
        try {
          const reset = await resfesToken();
          if (reset.success) {
            Cookies.set("accesstoken", reset?.response?.token);
          }
        } catch (e2) {
          dispatch(getUser(null));
          dispatch(getCartUser(null));
        }
      } else {
        console.log(e);
      }
    }
  };
  const handleStatusSearch = () => {
    setShowSearch(!showSearch);
  };
  useEffect(() => {
    fetchUser();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const handleSearch = (e) => {
    const value = e.target.value;
    setValueSearch(value);
    if (refSearch.current !== null) {
      clearTimeout(refSearch.current);
    }
    refSearch.current = setTimeout(() => {
      if (valueSearch !== " ") {
        getDataSearch();
      }
    }, 500);
  };
  const getDataSearch = async () => {
    const res = await getProductSearch(valueSearch);
    if (res.success) {
      setListSearch(res?.products);
    }
  };
  const handleClickSearch = (item) => {
    navigate(`/product/${item.slug || item._id}`);
    setValueSearch(" ");
    setListSearch([]);
    setShowSearch(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      var scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setActiveHeader(true);
      } else {
        setActiveHeader(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowInFor(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    };

    if (showInFor || showCategoryDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInFor, showCategoryDropdown]);
  return (
    <div className={`header ${activeHeader && "activeHeader"}`}>
      <div className="content">
        <div className={`header--content ${showSearch && "none"}`}>
          <div
            className="header--content--left"
            onClick={() => {
              navigate("/");
            }}
          >
            <div className="left">
              {(settings?.websiteName || "TopPhone").split("").map((char, idx) => (
                <p key={idx} style={{ color: ["red", "green", "blue", "pink", "purple"][idx % 5] }}>
                  {char}
                </p>
              ))}
            </div>
            <div className="right">
              <img src={settings?.websiteLogo || Logo} className="right--image" alt="Logo" />
            </div>
          </div>
          <div className="header--content--reponsive">
            <span onClick={() => setListMenuRp(true)}>
              <IoMenu size={24} />
            </span>
          </div>
          <div className="header--content--logo" onClick={() => navigate("/")}>
            {(settings?.websiteName || "TopPhone").split("").map((char, idx) => (
              <p key={idx} style={{ color: ["red", "green", "blue", "pink", "purple"][idx % 5] }}>
                {char}
              </p>
            ))}
          </div>
          <div className="header--content--center">
            <div 
              className={`box ${active === -1 && "active"}`}
              onClick={() => {
                setActive(-1);
                navigate("/");
                document.title = "Trang chủ";
              }}
            >
              <p className="item">Trang chủ</p>
            </div>

            <div 
              ref={categoryDropdownRef}
              className={`box category-dropdown ${[0,1,2,3,4,5,6].includes(active) && "active"}`}
              onMouseEnter={() => setShowCategoryDropdown(true)}
              onMouseLeave={() => setShowCategoryDropdown(false)}
            >
              <p className="item">Sản phẩm ▾</p>
              {showCategoryDropdown && (
                <div className="dropdown-menu">
                  {data?.map((el, index) => (
                    <div
                      key={el?._id}
                      className="dropdown-item"
                      onClick={() => {
                        handleNavigate(index, el);
                        setShowCategoryDropdown(false);
                      }}
                    >
                      {el?.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div 
              className={`box ${active === 7 && "active"}`} 
              onClick={handleNavigateBlog}
            >
              <p className="item">Tin Tức</p>
            </div>
            
            <div 
              className={`box ${active === 8 && "active"}`} 
              onClick={() => {
                setActive(8);
                setListMenuRp(false);
                navigate("/minigames");
                document.title = "Mini Games";
              }}
            >
              <p className="item">Mini Games</p>
            </div>
            
            <div 
              className={`box ${active === 9 && "active"}`} 
              onClick={() => {
                setActive(9);
                setListMenuRp(false);
                navigate("/rewards");
                document.title = "Đổi Thưởng";
              }}
            >
              <p className="item">Đổi Thưởng</p>
            </div>
          </div>
          <div className="header--content--right">
            <div className="header--content--right--search">
              <label onClick={handleStatusSearch}>
                <RiSearchLine />
              </label>
              <WishlistIcon navigate={navigate} />
              <div className="header--content--right--card" onClick={() => navigate("/payment")}>
                <label>
                  <IoBagOutline />
                </label>
                <p className="header--content--right--card--number">{cart?.length || 0}</p>
              </div>
            </div>
            {user ? (
              <div ref={userMenuRef} className="header--content--right--user" onClick={() => setShowInFor(!showInFor)}>
                <label>
                  <FaRegUser />
                </label>
                {showInFor && (
                  <div className="header--content--right--user--show" onClick={(e) => e.stopPropagation()}>
                    {user?.role === "admin" && (
                      <>
                        <div onClick={() => navigate("/admin")}>
                          <p>Quản lý</p>
                        </div>
                        <div onClick={() => navigate("/minigames")}>
                          <p>Mini Games</p>
                        </div>
                      </>
                    )}
                    <div onClick={() => navigate("/user")}>
                      <p>Tài khoản</p>
                    </div>
                    <div onClick={() => navigate("/order")}>
                      <p>Đơn hàng</p>
                    </div>
                    <div onClick={() => navigate("/rewards")}>
                      <p>Đổi Thưởng</p>
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
              <div
                className="authen"
                onClick={() => {
                  navigate("/auth");
                  document.title = "Đăng nhập";
                }}
              >
                Đăng nhập
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
              <Input placeholder="Tìm kiếm sản phẩm" onChange={handleSearch} />
              <label onClick={handleStatusSearch}>
                <MdClose />
              </label>
              <div className="header--search--list">
                {listSearch?.map((item) => (
                  <div className="header--search--list--box" key={item._id} onClick={() => handleClickSearch(item)}>
                    <div className="header--search--list--box--left">
                      <img src={item?.image[0]?.url} alt="" />
                    </div>
                    <div className="header--search--list--box--right">
                      <h3>{item?.name}</h3>
                      <h2>{formatNumber(item?.price)}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {showSearch && <Screen />}
        {listMenuRpt && (
          <Sidebar setListMenuRp={setListMenuRp}>
            <div className="sidebarItem">
              {data?.map((el, index) => {
                return (
                  <div
                    className={`sidebarItem--box  ${index === active && "active"}`}
                    key={el?._id}
                    onClick={() => {
                      handleNavigate(index, el);
                      setListMenuRp(false);
                    }}
                  >
                  
                    <p className="item">{el?.name}</p>
                  </div>
                );
              })}
              {data && (
                <>
                  <div key="tin-tuc-sidebar" className={`sidebarItem--box  ${active === 7 && "active"}`} onClick={handleNavigateBlog}>
                    <p className="item">Tin Tức</p>
                  </div>
                  <div 
                    key="minigames-sidebar" 
                    className={`sidebarItem--box  ${active === 8 && "active"}`} 
                    onClick={() => {
                      setActive(8);
                      setListMenuRp(false);
                      navigate("/minigames");
                      document.title = "Mini Games";
                    }}
                  >
                    <p className="item">Mini Games</p>
                  </div>
                  <div 
                    key="rewards-sidebar" 
                    className={`sidebarItem--box  ${active === 9 && "active"}`} 
                    onClick={() => {
                      setActive(9);
                      setListMenuRp(false);
                      navigate("/rewards");
                      document.title = "Đổi Thưởng";
                    }}
                  >
                    <p className="item">Đổi Thưởng</p>
                  </div>
                </>
              )}
            </div>
          </Sidebar>
        )}
      </div>
    </div>
  );
}

export default withBase(memo(Header));

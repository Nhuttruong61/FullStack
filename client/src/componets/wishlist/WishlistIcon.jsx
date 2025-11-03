import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import "./WishlistIcon.scss";

const WishlistIcon = () => {
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wishlist.data || []);
  const user = useSelector((state) => state.user.user);

  const handleNavigate = () => {
    if (!user?._id) {
      alert("Vui lòng đăng nhập!");
      return;
    }
    navigate("/wishlist");
  };

  return (
    <div className="wishlist-icon" onClick={handleNavigate} title="Danh sách yêu thích">
      <AiOutlineHeart size={24} />
      {wishlist.length > 0 && (
        <span className="wishlist-badge">{wishlist.length}</span>
      )}
    </div>
  );
};

export default WishlistIcon;
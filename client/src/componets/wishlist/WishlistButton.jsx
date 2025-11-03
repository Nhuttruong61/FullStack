import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist, removeWishlist } from "../../api/user";
import { addToWishlist, removeFromWishlist } from "../../redux/slice/wishlistSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import "./WishlistButton.scss";

const WishlistButton = ({ productId, product }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const wishlist = useSelector((state) => state.wishlist);
  const [loading, setLoading] = useState(false);
  const isInWishlist = wishlist.data.some((item) => item._id === productId);

  const handleWishlistClick = async () => {
    if (!user?._id) {
      toast.error("Vui lòng đăng nhập!");
      return;
    }

    setLoading(true);
    try {
      if (isInWishlist) {
        // Remove from wishlist
        const response = await removeWishlist(user._id, { productId });
        if (response.success) {
          dispatch(removeFromWishlist(productId));
          toast.success("Xóa khỏi yêu thích thành công!");
        }
      } else {
        // Add to wishlist
        const response = await addWishlist(user._id, { productId });
        if (response.success) {
          dispatch(addToWishlist(product || { _id: productId }));
          toast.success("Thêm vào yêu thích thành công!");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.mes || "Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`wishlist-btn ${isInWishlist ? "active" : ""}`}
      onClick={handleWishlistClick}
      disabled={loading}
      title={isInWishlist ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
    >
      {isInWishlist ? (
        <AiFillHeart size={24} />
      ) : (
        <AiOutlineHeart size={24} />
      )}
    </button>
  );
};

export default WishlistButton;
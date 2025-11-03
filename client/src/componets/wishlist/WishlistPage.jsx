import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "../../api/user";
import { getWishlist as getWishlistRedux } from "../../redux/slice/wishlistSlice";
import { toast } from "react-toastify";
import CardProductCbn from "../card/cardProduct/CardProductCbn";
import "./WishlistPage.scss";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const wishlist = useSelector((state) => state.wishlist.data);

  useEffect(() => {
    if (user?._id) {
      fetchWishlist();
    }
  }, [user?._id]);

  const fetchWishlist = async () => {
    try {
      const response = await getWishlist(user._id);
      if (response.success) {
        dispatch(getWishlistRedux(response.wishlist));
      }
    } catch (error) {
      toast.error("Lỗi khi tải danh sách yêu thích!");
    }
  };

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1>Danh Sách Yêu Thích</h1>
        <p className="wishlist-count">
          {wishlist.length} sản phẩm
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-icon">💔</div>
          <h2>Danh sách yêu thích của bạn trống</h2>
          <p>Khám phá và thêm những sản phẩm yêu thích của bạn!</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <CardProductCbn key={product?._id} data={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
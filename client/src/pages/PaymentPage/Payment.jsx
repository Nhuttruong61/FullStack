import React, { memo } from "react";
import "./Payment.scss";
import { useSelector } from "react-redux";
import { formatNumber } from "../../helper/format";
import withBase from "../../hocs/withBase";
import {
  clearCart,
  decreate,
  getCartUser,
  increate,
} from "../../redux/slice/cartSlice";
import Swal from "sweetalert2";
import { createOrder } from "../../api/order";
import { toast } from "react-toastify";
import { removeCart } from "../../api/user";

function Payment({ dispatch, navigate }) {
  const { data } = useSelector((state) => state.car);
  const { user } = useSelector((state) => state.user);
  const handleDereate = (data) => {
    dispatch(decreate(data));
  };
  const handleIncreate = (data) => {
    dispatch(increate(data));
  };
  const handleDeleteCard = async (data) => {
    try {
      const res = await removeCart(user._id, { _id: data._id });
      dispatch(getCartUser(res?.user.cart));
    } catch (e) {}
  };
  const totalPrice = data?.reduce(
    (acc, cur) => acc + cur?.product?.price * cur?.quantity,
    0
  );
  const handleOrder = async () => {
    if (!user) {
      Swal.fire({
        title: "Bạn phải đăng nhập trước khi thanh toán",
        showCancelButton: true,
        confirmButtonText: "Đăng nhập",
      }).then(async (result) => {
        if (result.isConfirmed) {
          navigate("/auth");
        }
      });
    } else if (!user?.name || !user?.phone || !user?.address) {
      Swal.fire({
        title: "Bạn phải cập nhật thông tin trước khi thanh toán?",
        showCancelButton: true,
        confirmButtonText: "Cập nhật",
      }).then(async (result) => {
        if (result.isConfirmed) {
          navigate("/user");
        }
      });
    } else {
      const dataSend = {
        user: user,
        products: data?.map((el) => ({
          product: el?.product?._id,
          quantity: el?.quantity,
          color: el?.color,
        })),
        totalPrice: totalPrice,
      };

      try {
        const res = await createOrder(dataSend);
        if (res.success) {
          toast.success("Đặt hàng thành công");
          navigate("/");
          dispatch(clearCart());
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  console.log(data);
  return (
    <div className="payment">
      <div className="payment-box">
        <div className="payment-box--top">
          <span className="point">
            <p>Về trang chủ</p>
          </span>
          <p>Giỏ hàng của bạn</p>
        </div>
        <div className="payment-box--center">
          {data?.map((el) => {
            return (
              <div className="payment-box--center--box">
                <div className="payment-box--center--box--left">
                  <img src={el?.product?.image[0]?.url} alt="" />
                </div>
                <div className="payment-box--center--box--center">
                  <h3>{el?.product?.name}</h3>
                  <p>Màu: {el?.color}</p>
                  <h4>{formatNumber(el?.product?.price)}</h4>
                </div>
                <div className="payment-box--center--box--right">
                  <button
                    disabled={el.quantity <= 1}
                    onClick={() => handleDereate(el)}
                  >
                    -
                  </button>
                  <p>{el?.quantity}</p>
                  <button
                    disabled={el.quantity >= el.totalquantity}
                    onClick={() => handleIncreate(el)}
                  >
                    +
                  </button>
                </div>
                <div className="payment-box--center--box--delete">
                  <button
                    disabled={data?.length == 0}
                    onClick={() => handleDeleteCard(el)}
                    className="btn"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="payment-box--user">
          <span>
            <p>Tên khách hàng</p>
            <input readOnly type="text" defaultValue={user?.name} />
          </span>
          <span>
            <p>Số điện thoại</p>
            <input readOnly type="text" defaultValue={user?.phone} />
          </span>
          <span>
            <p>Địa chỉ</p>
            <input readOnly type="text" defaultValue={user?.address} />
          </span>
          <span style={{ display: "flex", justifyContent: "end" }}>
            <p
              className="point "
              style={{ color: "red", fontWeight: "500" }}
              onClick={() => navigate("/user")}
            >
              Chỉnh sửa
            </p>
          </span>
        </div>
        <div className="payment-box--order">
          <div className="payment-box--order--box">
            <p>Tổng tiền</p>
            <p>{formatNumber(totalPrice || 0)}</p>
          </div>

          <div disabled className="payment-box--order--pay">
            <button disabled={data?.length === 0} onClick={handleOrder}>
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withBase(memo(Payment));

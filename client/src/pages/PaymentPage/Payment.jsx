import React, { memo, useEffect, useState } from "react";
import "./Payment.scss";
import { useSelector } from "react-redux";
import { formatNumber } from "../../helper/format";
import withBase from "../../hocs/withBase";
import { clearCart, decreate, getCartUser, increate } from "../../redux/slice/cartSlice";
import Swal from "sweetalert2";
import { createOrder } from "../../api/order";
import { toast } from "react-toastify";
import { removeCart } from "../../api/user";
import { useLocation } from "react-router-dom";
import { createOrderVNpay, returnPayment } from "../../api/vnpay";

function Payment({ dispatch, navigate }) {
  const { pathname, search } = useLocation();
  const { data } = useSelector((state) => state.car);
  const { user } = useSelector((state) => state.user);
  const [choosePayment, setChoosePayment] = useState("cod");
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
  const totalPrice = data?.reduce((acc, cur) => acc + cur?.product?.price * cur?.quantity, 0);
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
          sessionStorage.getItem("urlPayment", pathname);
          navigate("/user");
        }
      });
    } else {
      const valuePayment = sessionStorage.getItem("payments");
      const dataSend = {
        user: user,
        products: data?.map((el) => ({
          product: el?.product?._id,
          quantity: el?.quantity,
          color: el?.color,
        })),
        totalPrice: totalPrice,
        payments: valuePayment || choosePayment,
      };

      try {
        if (choosePayment === "online") {
          const data = {
            amount: totalPrice,
          };
          const res = await createOrderVNpay(data);
          if (res.success) {
            window.location.href = res.paymentUrl;
          }
        } else {
          const res = await createOrder(dataSend);
          if (res?.success) {
            toast.success("Đặt hàng thành công");
            navigate("/");
            sessionStorage.removeItem("payments");
            dispatch(clearCart());
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleEdit = () => {
    navigate("/user");
    sessionStorage.setItem("urlPayment", pathname);
    navigate("/user");
  };
  const handleChoosePayment = (e) => {
    setChoosePayment(e.target.value);
    sessionStorage.setItem("payments", e.target.value);
  };
  const fetchReturn = async () => {
    try {
      const res = await returnPayment(search);
      if (res?.RspCode === "00") {
        handleOrder();
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (search) {
      fetchReturn();
    }
  }, []);

  return (
    <div className="payment">
      <div className="payment-container">
        <div className="payment-header">
          <button className="payment-header__back" onClick={() => navigate("/")}>
            ← Quay lại
          </button>
          <h1 className="payment-header__title">Giỏ hàng của bạn</h1>
        </div>

        <div className="payment-content">
          <div className="payment-items">
            {data?.length > 0 ? (
              data?.map((el) => (
                <div key={el?._id} className="payment-item">
                  <div className="payment-item__image">
                    <img src={el?.product?.image[0]?.url} alt={el?.product?.name} />
                  </div>
                  <div className="payment-item__info">
                    <h3 className="payment-item__name">{el?.product?.name}</h3>
                    <p className="payment-item__color">Màu: {el?.color}</p>
                    <p className="payment-item__price">{formatNumber(el?.product?.price)}</p>
                  </div>
                  <div className="payment-item__quantity">
                    <button 
                      className="payment-item__btn-qty" 
                      disabled={el.quantity <= 1} 
                      onClick={() => handleDereate(el)}
                    >
                      −
                    </button>
                    <input type="text" readOnly value={el?.quantity} />
                    <button 
                      className="payment-item__btn-qty" 
                      disabled={el.quantity >= el.totalquantity} 
                      onClick={() => handleIncreate(el)}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    className="payment-item__delete" 
                    onClick={() => handleDeleteCard(el)}
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <div className="payment-empty">
                <p>Giỏ hàng của bạn đang trống</p>
              </div>
            )}
          </div>

          <div className="payment-sidebar">
            <div className="payment-user">
              <h2 className="payment-user__title">Thông tin giao hàng</h2>
              <div className="payment-user__field">
                <label>Tên khách hàng</label>
                <input readOnly type="text" defaultValue={user?.name} />
              </div>
              <div className="payment-user__field">
                <label>Số điện thoại</label>
                <input readOnly type="text" defaultValue={user?.phone} />
              </div>
              <div className="payment-user__field">
                <label>Địa chỉ</label>
                <input readOnly type="text" defaultValue={user?.address} />
              </div>
              <button className="payment-user__edit" onClick={handleEdit}>
                ✏️ Chỉnh sửa
              </button>
            </div>

            <div className="payment-method">
              <h2 className="payment-method__title">Phương thức thanh toán</h2>
              <select className="payment-method__select" defaultValue="cod" onChange={handleChoosePayment}>
                <option value="cod">Thanh toán khi nhận hàng</option>
                <option value="online">Ví VNPay</option>
              </select>
            </div>

            <div className="payment-summary">
              <div className="payment-summary__item">
                <span>Tổng tiền:</span>
                <span className="payment-summary__amount">{formatNumber(totalPrice || 0)}</span>
              </div>
              <button 
                className="payment-summary__btn" 
                disabled={data?.length === 0} 
                onClick={handleOrder}
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withBase(memo(Payment));

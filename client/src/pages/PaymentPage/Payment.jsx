import React, { memo, useEffect, useState } from "react";
import "./Payment.scss";
import { useSelector } from "react-redux";
import { formatNumber } from "../../helper/format";
import withBase from "../../hocs/withBase";
import { decreate, deleteCard, increate } from "../../redux/slice/cardSlice";
import Swal from "sweetalert2";

function Payment({ dispatch, navigate }) {
  const { data } = useSelector((state) => state.car);
  const { user } = useSelector((state) => state.user);
  const handleDereate = (data) => {
    dispatch(decreate(data));
  };
  const handleIncreate = (data) => {
    dispatch(increate(data));
  };
  const handleDeleteCard = (data) => {
    dispatch(deleteCard(data));
  };
  const totalPrice = data?.reduce((acc, cur) => acc + cur.price, 0);
  const handleOrder = () => {
    if (!user.name || !user.phone || !user.address) {
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
    }
  };
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
                  <img src={el?.image[0].url} alt="" />
                </div>
                <div className="payment-box--center--box--center">
                  <h3>{el?.name}</h3>
                  <p>Màu: {el?.color}</p>
                  <h4>{formatNumber(el?.price)}</h4>
                </div>
                <div className="payment-box--center--box--right">
                  <button
                    disabled={el.quality <= 1}
                    onClick={() => handleDereate(el)}
                  >
                    -
                  </button>
                  <p>{el?.quality}</p>
                  <button
                    disabled={el.quality >= el.totalQuality}
                    onClick={() => handleIncreate(el)}
                  >
                    +
                  </button>
                </div>
                <div className="payment-box--center--box--delete">
                  <button onClick={() => handleDeleteCard(el)} className="btn">
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

          <div className="payment-box--order--pay" onClick={handleOrder}>
            <button>Thanh Toán</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withBase(memo(Payment));

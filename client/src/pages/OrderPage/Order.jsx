import React, { useEffect, useState } from "react";
import "./Order.scss";
import { cancleOrderUser, getOrderUser } from "../../api/order";
import { useSelector } from "react-redux";
import { formatNumber } from "../../helper/format";
import { toast } from "react-toastify";
function Order() {
  const { user } = useSelector((state) => state.user);
  const [dataOrder, setDataOrder] = useState([]);
  const fetchDataOrder = async () => {
    try {
      const res = await getOrderUser(user._id);
      if (res.success) {
        setDataOrder(res.response);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleCancleOrder = async (data) => {
    try {
      const res = await cancleOrderUser(data._id);
      if (res.success) {
        toast.success("Hủy đơn hàng thành công");
        fetchDataOrder();
      }
    } catch (error) {
      console.error("Error occurred while canceling order:", error);
    }
  };

  useEffect(() => {
    fetchDataOrder();
  }, [user]);
  return (
    <div className="order">
      <div className="content">
        {dataOrder?.map((el) => {
          return (
            <div className="order--list">
              <div className="order--list--left">
                {el?.products.map((item) => {
                  return (
                    <div className="order--list--left--box">
                      <img src={item?.product?.image[0].url} alt="" />
                      <p>Màu: {item.color}</p>
                      <h4>Số lượng: {item.quantity}</h4>
                    </div>
                  );
                })}
              </div>
              <div className="order--list--payment">
                <h4>Thanh toán</h4>
                {el?.payments === "cod" && el?.status !== "Đã giao" ? (
                  <p>Chưa thanh toán</p>
                ) : (
                  <p>Đã thanh toán</p>
                )}
              </div>
              <div className="order--list--center">
                <div className="order--list--center--box">
                  <h4>{formatNumber(el?.totalPrice)}</h4>
                  <h4>{el?.status}</h4>
                </div>
                {el?.status === "Chờ xử lý" && el?.payments !== "online" && (
                  <div style={{ marginLeft: "4px" }}>
                    <button
                      onClick={() => handleCancleOrder(el)}
                      className="btn"
                    >
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Order;

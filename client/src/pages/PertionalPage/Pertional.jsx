import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import "./Pertion.scss";
import { useSelector } from "react-redux";
import withBase from "../../hocs/withBase";
import { FaRegUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { updateUser } from "../../api/user";
import { getUser } from "../../redux/slice/userSlice";

function Pertional({ navigate, dispatch }) {
  const { user } = useSelector((state) => state.user);
  const [valueUser, setValueUser] = useState({
    name: "",
    phone: "",
    address: "",
  });
  useLayoutEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    setValueUser({
      name: user?.name,
      address: user?.address,
      phone: user?.phone,
    });
  }, []);
  const handleUpdate = async () => {
    try {
      if (!valueUser.name || !valueUser.address || !valueUser.phone) {
        toast.warning("Bạn phải điền đầy đủ thông tin");
      } else {
        const url = sessionStorage.getItem("urlPayment");
        const res = await updateUser(user._id, valueUser);
        if (res?.success) {
          toast.success("Cập nhật thành công");
          dispatch(getUser(res.user));
          if (url) {
            navigate(url);
            sessionStorage.removeItem("urlPayment");
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="pertional">
      <div className="content">
        <div className="pertional--box">
          <div className="pertional--box--left">
            <span>
              <FaRegUser className="icon" />
            </span>
          </div>
          <div className="pertional--box--right">
            <span>
              <label htmlFor="">Tên: </label>
              <input
                defaultValue={user?.name}
                onChange={(e) =>
                  setValueUser({ ...valueUser, name: e.target.value })
                }
              />
            </span>
            {!valueUser?.name && (
              <p className="error-message">Không được để trống</p>
            )}
            <span>
              <label htmlFor="">Số điện thoại: </label>
              <input
                defaultValue={user?.phone}
                onChange={(e) =>
                  setValueUser({ ...valueUser, phone: e.target.value })
                }
              />
            </span>
            {!valueUser?.phone && (
              <p className="error-message">Không được để trống</p>
            )}
            <span>
              <label htmlFor="">Địa chỉ: </label>
              <input
                defaultValue={user?.address}
                onChange={(e) =>
                  setValueUser({ ...valueUser, address: e.target.value })
                }
              />
            </span>
            {!valueUser?.address && (
              <p className="error-message">Không được để trống</p>
            )}
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "end",
                marginTop: "10px",
              }}
            >
              <button onClick={handleUpdate} className="btn">
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withBase(memo(Pertional));

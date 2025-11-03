import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import "./Pertion.scss";
import { useSelector } from "react-redux";
import withBase from "../../hocs/withBase";
import { FaRegUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
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
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    address: false,
  });
  const [isSaved, setIsSaved] = useState(false);

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
  }, [user]);

  const validateForm = () => {
    const newErrors = {
      name: !valueUser.name || valueUser.name.trim() === "",
      phone: !valueUser.phone || valueUser.phone.trim() === "",
      address: !valueUser.address || valueUser.address.trim() === "",
    };
    setErrors(newErrors);
    return !newErrors.name && !newErrors.phone && !newErrors.address;
  };

  const handleFieldBlur = (field) => {
    setErrors({
      ...errors,
      [field]: !valueUser[field] || valueUser[field].trim() === "",
    });
  };

  const handleUpdate = async () => {
    try {
      if (!validateForm()) {
        toast.warning("Bạn phải điền đầy đủ thông tin");
        return;
      }

      const url = sessionStorage.getItem("urlPayment");
      const res = await updateUser(user._id, valueUser);
      if (res?.success) {
        toast.success("Cập nhật thành công");
        dispatch(getUser(res.user));
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
        if (url) {
          navigate(url);
          sessionStorage.removeItem("urlPayment");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="pertional">
      <div className="pertional-container">
        <div className="pertional-header">
          <h1 className="pertional-header__title">Thông tin cá nhân</h1>
          <p className="pertional-header__subtitle">Cập nhật và quản lý thông tin tài khoản của bạn</p>
        </div>

        <div className="pertional-content">
          <div className="pertional-profile">
            <div className="pertional-profile__avatar">
              <FaRegUser className="pertional-profile__icon" />
            </div>
            <div className="pertional-profile__info">
              <h2 className="pertional-profile__name">{user?.name || "Người dùng"}</h2>
              <p className="pertional-profile__email">{user?.email || "email@example.com"}</p>
              <span className="pertional-profile__badge">Khách hàng</span>
            </div>
          </div>

          <div className="pertional-form">
            <div className="pertional-section">
              <h3 className="pertional-section__title">Thông tin liên hệ</h3>

              <div className="pertional-form__group">
                <label className="pertional-form__label">
                  <FaRegUser className="pertional-form__icon" />
                  Tên đầy đủ
                </label>
                <input
                  type="text"
                  className={`pertional-form__input ${errors.name ? 'pertional-form__input--error' : ''}`}
                  placeholder="Nhập tên đầy đủ của bạn"
                  value={valueUser?.name || ""}
                  onChange={(e) =>
                    setValueUser({ ...valueUser, name: e.target.value })
                  }
                  onBlur={() => handleFieldBlur("name")}
                />
                {errors.name && (
                  <p className="pertional-form__error">Không được để trống</p>
                )}
              </div>

              <div className="pertional-form__group">
                <label className="pertional-form__label">
                  <FaPhone className="pertional-form__icon" />
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  className={`pertional-form__input ${errors.phone ? 'pertional-form__input--error' : ''}`}
                  placeholder="Nhập số điện thoại"
                  value={valueUser?.phone || ""}
                  onChange={(e) =>
                    setValueUser({ ...valueUser, phone: e.target.value })
                  }
                  onBlur={() => handleFieldBlur("phone")}
                />
                {errors.phone && (
                  <p className="pertional-form__error">Không được để trống</p>
                )}
              </div>

              <div className="pertional-form__group">
                <label className="pertional-form__label">
                  <FaMapMarkerAlt className="pertional-form__icon" />
                  Địa chỉ giao hàng
                </label>
                <input
                  type="text"
                  className={`pertional-form__input ${errors.address ? 'pertional-form__input--error' : ''}`}
                  placeholder="Nhập địa chỉ giao hàng"
                  value={valueUser?.address || ""}
                  onChange={(e) =>
                    setValueUser({ ...valueUser, address: e.target.value })
                  }
                  onBlur={() => handleFieldBlur("address")}
                />
                {errors.address && (
                  <p className="pertional-form__error">Không được để trống</p>
                )}
              </div>
            </div>

            <div className="pertional-actions">
              <button 
                onClick={handleUpdate} 
                className={`pertional-btn pertional-btn--primary ${isSaved ? 'pertional-btn--saved' : ''}`}
              >
                {isSaved ? '✓ Đã lưu' : 'Cập nhật thông tin'}
              </button>
              <button 
                onClick={() => navigate("/")}
                className="pertional-btn pertional-btn--secondary"
              >
                Quay lại
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withBase(memo(Pertional));

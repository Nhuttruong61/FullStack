import React, { memo, useState, useEffect } from "react";
import "./AdminLogin.scss";
import Button from "../../componets/common/Button/Button";
import { useForm } from "react-hook-form";
import withBase from "../../hocs/withBase";
import * as UserService from "../../api/user";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/slice/userSlice";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

function AdminLogin({ navigate, dispatch: propsDispatch }) {
  const reduxDispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await UserService.login(data);
      console.log("Login response:", res);
      if (res?.success) {
        if (res.user?.role !== "admin") {
          toast.error("Tài khoản này không có quyền admin");
          return;
        }
        Cookies.set("accesstoken", res.token);
        reduxDispatch(getUser(res.user));
        localStorage.setItem("userRole", res.user.role);
        console.log("User dispatched:", res.user);
        reset();
        
        setTimeout(() => {
          navigate("/admin");
        }, 100);
      }
    } catch (e) {
      toast.error(e?.response?.data?.mes || "Đăng nhập thất bại");
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("AdminLogin - user updated:", user);
    if (user && user.role === "admin") {
      console.log("Navigating to /admin");
      navigate("/admin");
    }
  }, [user, navigate]);

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-wrapper">
          <div className="admin-login-header">
            <h1>🔒 Đăng nhập Admin</h1>
            <p>Chỉ dành cho quản trị viên hệ thống</p>
          </div>

          <form className="admin-login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Nhập email admin"
                {...register("email", {
                  required: "Email là bắt buộc",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email không hợp lệ",
                  },
                })}
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label>Mật khẩu</label>
              <div className="password-input">
                <input
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  {...register("password", {
                    required: "Mật khẩu là bắt buộc",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải ít nhất 6 ký tự",
                    },
                  })}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? <FaEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>

            <Button className="admin-login-btn" type="submit">
              Đăng nhập
            </Button>
          </form>

          <div className="admin-login-footer">
            <p>Nếu không phải admin, vui lòng quay lại sau</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withBase(memo(AdminLogin));

import React from "react";
import { useNavigate } from "react-router-dom";
import "./MaintenancePage.scss";

function MaintenancePage({ message }) {
  const navigate = useNavigate();

  return (
    <div className="maintenance-page">
      <div className="maintenance-container">
        <div className="maintenance-icon">🔧</div>
        <h1>Hệ thống đang bảo trì</h1>
        <p className="maintenance-message">
          {message || "Chúng tôi sẽ quay lại sớm. Vui lòng thử lại sau."}
        </p>
        <div className="maintenance-loader">
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
        </div>
        <button 
          className="maintenance-login-btn"
          onClick={() => navigate("/admin-login")}
        >
          Đăng nhập Admin
        </button>
      </div>
    </div>
  );
}

export default MaintenancePage;

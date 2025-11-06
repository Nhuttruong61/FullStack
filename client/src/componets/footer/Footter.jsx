import React from "react";
import "./Fotter.scss";
import Logo from "../../styles/image/Logo.png";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import image1 from "../../styles/image/certify-bct.png";
import image2 from "../../styles/image/_dmca_premi_badge_4.png";
import image3 from "../../styles/image/handle_cert.png";
import { useSettings } from "../../contexts/SettingsContext";

export default function Footter() {
  const { settings } = useSettings();

  return (
    <div className="footer">
      <div className="content">
        <div className="footer--top">
          <div className="footer--top--name">
            {(settings?.websiteName || "TopPhone").split("").map((char, idx) => (
              <p key={idx} style={{ color: ["red", "green", "blue", "pink", "purple"][idx % 5] }}>
                {char}
              </p>
            ))}
          </div>
          <div className="footer--top--logo">
            <img src={settings?.websiteLogo || Logo} className="right--image" alt="Logo" />
          </div>
        </div>
        <div className="footer--center">
          <div className="footer--center--column">
            <p className="name">Tổng đài</p>
            <p className="point">Mua hàng: {settings?.companyPhone || "1900.9696.42"} (7:30 - 22:00)</p>
            <p className="point">Khiếu nại: {settings?.companyPhone || "1900.9868.43"} (8:00 - 21:30)</p>
            <p style={{ color: "#ccc" }}>Kết nối với chúng tôi</p>
            <div className="footer--center--column--listIcon">
              <div className="footer--center--column--listIcon--item">
                <FaFacebookF className="footer--center--column--listIcon--item--icon" />
              </div>
              <div className="footer--center--column--listIcon--item">
                <FaYoutube className="footer--center--column--listIcon--item--icon" />
              </div>
              <div className="footer--center--column--listIcon--item">
                <SiZalo className="footer--center--column--listIcon--item--icon" />
              </div>
            </div>
          </div>
          <div className="footer--center--column">
            <p className="name">Hệ thống cửa hàng</p>
            <p className="point">Xem 97 cửa hàng</p>
            <p className="point">Nội quy cửa hàng</p>
            <p className="point">Chất lượng phục vụ</p>
            <p className="point">Chính sách bảo hành & đổi trả</p>
          </div>
          <div className="footer--center--column">
            <p className="name">Hỗ trợ khách hàng</p>
            <p className="point"> Điều kiện giao dịch chung</p>
            <p className="point">Hướng dẫn mua hàng online</p>
            <p className="point">Chính sách giao hàng</p>
            <p className="point">Hướng dẫn thanh toán</p>
          </div>
          <div className="footer--center--column">
            <p className="name"> Trung tâm bảo hành TopCare</p>
            <p className="point">Giới thiệu TopCare</p>
          </div>
        </div>
        <div className="footer--bottom">
          <div className="footer--bottom--left">
            <p>© 2018. Công ty cổ phần {settings?.websiteName || "TopPhone"}. GPDKKD: 0303217354 do sở KH & ĐT TP.HCM</p>
            <p>© 2018. Công ty cổ phần {settings?.websiteName || "TopPhone"}. GPDKKD: 0303217354 do sở KH & ĐT TP.HCM</p>
            <p>Địa chỉ: {settings?.companyAddress || "128 Trần Quang Khải, P.Tân Định, Q.1, TP. Hồ Chí Minh"}. Điện thoại: {settings?.companyPhone || "028 38125960"}.</p>
            <p>Chịu trách nhiệm nội dung: Huỳnh Văn Tốt. Email: {settings?.companyEmail || "huynhA@topPhone.com"}.</p>
          </div>
          <div className="footer--bottom--right">
            <span>
              <img src={image1} alt="" />
            </span>
            <span>
              <img src={image3} alt="" />
            </span>
            <span>
              <img src={image2} alt="" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

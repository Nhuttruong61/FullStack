import React, { useEffect, useState } from "react";
import { getUserPromoCodes } from "../../api/reward";
import { toast } from "react-toastify";
import LoyaltyDashboard from "../../componets/Loyalty/LoyaltyDashboard";
import "./Rewards.scss";

function Rewards() {
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const fetchPromoCodes = async () => {
    setLoading(true);
    try {
      const promoRes = await getUserPromoCodes();

      if (promoRes.success) {
        setPromoCodes(promoRes.data);
      }
    } catch (err) {
      console.error("Error fetching promo codes:", err);
      toast.error("Không thể tải mã giảm giá");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("Đã sao chép mã!");
  };

  if (loading) {
    return <div className="rewards-loading">Đang tải...</div>;
  }

  return (
    <div className="rewards-container">
      <div className="rewards-header">
        <h1>Chương Trình Tích Điểm</h1>
        <p>Mua sắm, tích điểm và nhận thưởng</p>
      </div>

      <LoyaltyDashboard />

      <div className="promo-section">
        <h2>Mã giảm giá của bạn</h2>
        {promoCodes.length > 0 ? (
          <div className="promo-list">
            {promoCodes.map((promo) => (
              <div key={promo._id} className="promo-card">
                <div className="promo-info">
                  <div className="promo-code-wrapper">
                    <span className="promo-code">{promo.code}</span>
                    {promo.isPublic && <span className="promo-badge public">Công khai</span>}
                    {!promo.isPublic && promo.source === 'game' && <span className="promo-badge game">Từ trò chơi</span>}
                    {!promo.isPublic && promo.source === 'loyalty' && <span className="promo-badge loyalty">Đổi điểm</span>}
                    <button
                      className="btn-copy"
                      onClick={() => copyToClipboard(promo.code)}
                    >
                      Sao chép
                    </button>
                  </div>
                  <p className="promo-details">
                    Giảm {promo.discountType === "percentage" ? `${promo.discountValue}%` : `${promo.discountValue.toLocaleString()}đ`} {promo.maxDiscount ? `- Tối đa ${promo.maxDiscount?.toLocaleString()}đ` : ""}
                  </p>
                  <p className="promo-expiry">
                    Hết hạn: {new Date(promo.expiryDate).toLocaleDateString('vi-VN')}
                  </p>
                </div>
                <div className="promo-status">
                  <span className="status-active">Sẵn sàng sử dụng</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-promos">
            <p>Bạn chưa có mã giảm giá nào</p>
            <p className="hint">Đổi điểm để nhận mã giảm giá!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rewards;

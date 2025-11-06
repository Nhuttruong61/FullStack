import React, { useEffect, useState } from "react";
import { getRewardOptions, redeemReward, getUserPromoCodes } from "../../api/reward";
import { getUserGameStats } from "../../api/minigame";
import { toast } from "react-toastify";
import "./Rewards.scss";

function Rewards() {
  const [rewardOptions, setRewardOptions] = useState([]);
  const [promoCodes, setPromoCodes] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [rewardsRes, promoRes, statsRes] = await Promise.all([
        getRewardOptions(),
        getUserPromoCodes(),
        getUserGameStats(),
      ]);

      if (rewardsRes.success) {
        setRewardOptions(rewardsRes.data);
      }

      if (promoRes.success) {
        setPromoCodes(promoRes.data);
      }

      if (statsRes.success) {
        setUserPoints(statsRes.data.totalPoints || 0);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (rewardId) => {
    const reward = rewardOptions.find((r) => r._id === rewardId);
    
    const hasSameDiscountType = promoCodes.some(
      (p) =>
        p.discountType === reward.discountType &&
        p.discountValue === reward.discountValue &&
        p.source === reward.source
    );

    const hasUsedCode = promoCodes.some(
      (p) =>
        p.discountType === reward.discountType &&
        p.discountValue === reward.discountValue &&
        p.source === reward.source &&
        p.usedCount > 0
    );

    if (hasSameDiscountType || hasUsedCode) {
      toast.error("Bạn đã đổi loại voucher này rồi. Mỗi loại voucher chỉ được đổi 1 lần");
      return;
    }

    setRedeeming(rewardId);
    try {
      const res = await redeemReward(rewardId);
      if (res.success) {
        toast.success("Đổi thưởng thành công!");
        await fetchData();
      } else {
        toast.error(res.message || "Đổi thưởng thất bại");
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setRedeeming(null);
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
        <h1>Đổi thưởng</h1>
        <p>Sử dụng điểm để đổi lấy mã giảm giá</p>
        <div className="points-badge">
          Điểm của bạn: <strong>{userPoints}</strong>
        </div>
      </div>

      <div className="rewards-section">
        <h2>Phần thưởng có sẵn</h2>
        <div className="rewards-grid">
          {rewardOptions.length > 0 ? (
            rewardOptions.map((reward) => {
              const hasSameDiscountType = promoCodes.some(
                (p) =>
                  p.discountType === reward.discountType &&
                  p.discountValue === reward.discountValue &&
                  p.source === reward.source
              );

              const hasUsedCode = promoCodes.some(
                (p) =>
                  p.discountType === reward.discountType &&
                  p.discountValue === reward.discountValue &&
                  p.source === reward.source &&
                  p.usedCount > 0
              );

              const isDisabled = hasSameDiscountType || hasUsedCode;

              return (
                <div key={reward._id} className="reward-card">
                  <div className="reward-icon">🎁</div>
                  <h3>{reward.name}</h3>
                  <p className="reward-description">{reward.description}</p>
                  <div className="reward-cost">
                    <span className="points-required">{reward.pointsCost} điểm</span>
                  </div>
                  {isDisabled && (
                    <p className="reward-redeemed-notice">
                      ✓ Đã đổi loại voucher này rồi
                    </p>
                  )}
                  <button
                    className="btn-redeem"
                    onClick={() => handleRedeem(reward._id)}
                    disabled={
                      userPoints < reward.pointsCost ||
                      redeeming === reward._id ||
                      isDisabled
                    }
                    title={
                      isDisabled
                        ? "Bạn đã đổi loại voucher này rồi"
                        : userPoints < reward.pointsCost
                        ? "Không đủ điểm"
                        : ""
                    }
                  >
                    {redeeming === reward._id ? "Đang xử lý..." : isDisabled ? "Đã đổi" : "Đổi ngay"}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="no-rewards">
              <p>Hiện không có phần thưởng nào</p>
            </div>
          )}
        </div>
      </div>

      <div className="promo-section">
        <h2>Mã giảm giá của bạn</h2>
        {promoCodes.length > 0 ? (
          <div className="promo-list">
            {promoCodes.map((promo) => (
              <div key={promo._id} className="promo-card">
                <div className="promo-info">
                  <div className="promo-code-wrapper">
                    <span className="promo-code">{promo.code}</span>
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
                  <p className="promo-source">
                    Nguồn: {promo.source === 'game' ? 'Trò chơi' : promo.source === 'loyalty' ? 'Điểm thành viên' : 'Khác'}
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

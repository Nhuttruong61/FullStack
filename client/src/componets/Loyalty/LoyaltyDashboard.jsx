import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./LoyaltyDashboard.scss";
import { useSettings } from "../../contexts/SettingsContext";

const LoyaltyDashboard = ({ userId }) => {
  const { settings } = useSettings();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch loyalty info
  const { data: loyaltyData, isLoading: loyaltyLoading } = useQuery({
    queryKey: ["loyalty", userId],
    queryFn: async () => {
      const res = await fetch(`/api/loyalty/info/${userId}`);
      return res.json();
    },
  });

  // Fetch available rewards
  const { data: rewardsData, isLoading: rewardsLoading } = useQuery({
    queryKey: ["loyalty-rewards", userId],
    queryFn: async () => {
      const res = await fetch(`/api/loyalty/rewards/${userId}`);
      return res.json();
    },
  });

  // Fetch transaction history
  const { data: historyData } = useQuery({
    queryKey: ["loyalty-history", userId],
    queryFn: async () => {
      const res = await fetch(`/api/loyalty/history/${userId}`);
      return res.json();
    },
  });

  const loyalty = loyaltyData?.data;
  const tierColors = {
    bronze: "#CD7F32",
    silver: "#C0C0C0",
    gold: "#FFD700",
    platinum: "#E5E4E2",
  };

  const handleRedeemReward = async (rewardId) => {
    try {
      const response = await fetch(`/api/loyalty/redeem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rewardId }),
      });

      const result = await response.json();

      if (result.success) {
        alert(
          `✅ Đổi thành công! Mã voucher: ${result.voucherCode?.code || "N/A"}`
        );
        // Refresh loyalty data
      } else {
        alert(`❌ ${result.message}`);
      }
    } catch (error) {
      alert("Lỗi khi đổi phần thưởng");
    }
  };

  if (loyaltyLoading) {
    return <div className="loyalty-loading">Đang tải...</div>;
  }

  return (
    <div className="loyalty-dashboard">
      {/* Header - Points Overview */}
      <div className="loyalty-header">
        <div className="points-card">
          <h3>Điểm hiện tại</h3>
          <div className="points-display">
            <span className="points-value">{loyalty?.balance || 0}</span>
            <span className="points-label">Points</span>
          </div>
        </div>

        <div className="tier-card" style={{ borderColor: tierColors[loyalty?.tier] }}>
          <h3>Hạng thành viên</h3>
          <div className="tier-display">
            <div
              className="tier-badge"
              style={{ backgroundColor: tierColors[loyalty?.tier] }}
            >
              {loyalty?.tier?.toUpperCase()}
            </div>
            {loyalty?.nextTierPoints && (
              <p className="next-tier">
                Còn lại: {loyalty.nextTierPoints.toLocaleString()} điểm để lên tier tiếp theo
              </p>
            )}
          </div>
        </div>

        <div className="lifetime-card">
          <h3>Tổng tiêu dùng</h3>
          <div className="lifetime-display">
            <span className="lifetime-value">{loyalty?.lifetime || 0}</span>
            <span className="lifetime-label">Points từng kiếm</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="loyalty-tabs">
        <button
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Tổng Quan
        </button>
        <button
          className={`tab-btn ${activeTab === "rewards" ? "active" : ""}`}
          onClick={() => setActiveTab("rewards")}
        >
          Đổi Thưởng ({rewardsData?.data?.length || 0})
        </button>
        <button
          className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          Lịch Sử
        </button>
      </div>

      {/* Tab Content */}
      <div className="loyalty-content">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="overview-tab">
            <div className="tier-progress">
              <h4>Tiến Độ Hạng Thành Viên</h4>
              <div className="tier-progress-bar">
                {["bronze", "silver", "gold", "platinum"].map((tier, idx) => {
                  const isActive =
                    ["bronze", "silver", "gold", "platinum"].indexOf(
                      loyalty?.tier
                    ) >= idx;

                  return (
                    <div
                      key={tier}
                      className={`tier-step ${isActive ? "active" : ""}`}
                      style={{
                        backgroundColor: isActive
                          ? tierColors[tier]
                          : "#ddd",
                      }}
                    >
                      <span className="tier-label">{tier}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="referral-section">
              <h4>Mã Giới Thiệu</h4>
              <div className="referral-code-box">
                <input
                  type="text"
                  readOnly
                  value={loyalty?.referralCode || ""}
                  className="referral-code"
                />
                <button
                  className="copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(loyalty?.referralCode);
                    alert("Đã copy mã giới thiệu!");
                  }}
                >
                  Copy
                </button>
              </div>
              <p className="referral-info">
                Giới thiệu bạn bè và nhận {settings?.loyalty?.pointsForReferral || 500} điểm cho mỗi bạn đăng ký thành công!
              </p>
              <p className="referral-stat">
                Đã giới thiệu: {loyalty?.referredCount || 0} bạn
              </p>
            </div>
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === "rewards" && (
          <div className="rewards-tab">
            {rewardsLoading ? (
              <p>Đang tải phần thưởng...</p>
            ) : rewardsData?.data?.length > 0 ? (
              <div className="rewards-grid">
                {rewardsData.data.map((reward) => (
                  <div
                    key={reward._id}
                    className={`reward-card ${
                      reward.available ? "" : "unavailable"
                    }`}
                  >
                    {reward.image && (
                      <img
                        src={reward.image}
                        alt={reward.name}
                        className="reward-image"
                      />
                    )}
                    <h5>{reward.name}</h5>
                    <p className="reward-description">
                      {reward.description}
                    </p>
                    <div className="reward-points">
                      <span>{reward.pointRequired.toLocaleString()} Points</span>
                    </div>

                    <button
                      className={`redeem-btn ${
                        reward.canRedeem && reward.available
                          ? ""
                          : "disabled"
                      }`}
                      onClick={() => handleRedeemReward(reward._id)}
                      disabled={!reward.canRedeem || !reward.available}
                    >
                      {!reward.available
                        ? "Hết hạn"
                        : reward.canRedeem
                        ? "Đổi Ngay"
                        : `Còn thiếu ${(reward.pointRequired - loyalty?.balance).toLocaleString()} điểm`}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-rewards">
                Không có phần thưởng khả dụng. Tiếp tục mua sắm để nhận điểm!
              </p>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="history-tab">
            {historyData?.data?.length > 0 ? (
              <div className="history-list">
                {historyData.data.map((transaction, idx) => (
                  <div key={idx} className="history-item">
                    <div className="history-left">
                      <span className={`history-type ${transaction.type}`}>
                        {transaction.type === "earn" && "➕"}
                        {transaction.type === "redeem" && "➖"}
                        {transaction.type === "bonus" && "🎁"}
                      </span>
                      <div className="history-info">
                        <p className="history-reason">{transaction.reason}</p>
                        <p className="history-date">
                          {new Date(transaction.createdAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className={`history-amount ${transaction.type}`}>
                      {transaction.type === "earn" ? "+" : "-"}
                      {transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-history">Chưa có lịch sử giao dịch</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoyaltyDashboard;
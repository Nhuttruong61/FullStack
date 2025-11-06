import React, { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../../../api/settings";
import { useSettings } from "../../../contexts/SettingsContext";
import "./Settings.scss";

function Settings() {
  const { refetchSettings } = useSettings();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("general");

  // Fetch settings
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await getSettings();
      if (response.success) {
        setSettings(response.data);
        setError("");
      } else {
        setError("Lỗi khi tải cài đặt");
      }
    } catch (err) {
      setError("Lỗi khi tải cài đặt: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e, path) => {
    const { value, type, checked } = e.target;
    const actualValue = type === "checkbox" ? checked : value;
    
    const newSettings = JSON.parse(JSON.stringify(settings));
    const keys = path.split(".");
    let obj = newSettings;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    
    obj[keys[keys.length - 1]] = actualValue;
    setSettings(newSettings);
  };

  // Save settings
  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await updateSettings(settings);
      if (response.success) {
        setSaveSuccess("Cài đặt đã được cập nhật thành công!");
        refetchSettings();
        setTimeout(() => setSaveSuccess(""), 3000);
      } else {
        setError(response.message || "Lỗi khi lưu cài đặt");
      }
    } catch (err) {
      setError("Lỗi khi lưu cài đặt: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !settings) {
    return <div className="settings-loading">Đang tải...</div>;
  }

  if (!settings) {
    return <div className="settings-error">Không thể tải cài đặt</div>;
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Cài đặt hệ thống</h1>
        <button className="btn-save" onClick={handleSave} disabled={loading}>
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>

      {saveSuccess && <div className="alert alert-success">{saveSuccess}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="settings-tabs">
        <button 
          className={`tab ${activeTab === "general" ? "active" : ""}`}
          onClick={() => setActiveTab("general")}
        >
          Thông tin chung
        </button>
        <button 
          className={`tab ${activeTab === "features" ? "active" : ""}`}
          onClick={() => setActiveTab("features")}
        >
          Tính năng
        </button>
        <button 
          className={`tab ${activeTab === "loyalty" ? "active" : ""}`}
          onClick={() => setActiveTab("loyalty")}
        >
          Chương trình tích điểm
        </button>
        <button 
          className={`tab ${activeTab === "games" ? "active" : ""}`}
          onClick={() => setActiveTab("games")}
        >
          Mini Games
        </button>
        <button 
          className={`tab ${activeTab === "promo" ? "active" : ""}`}
          onClick={() => setActiveTab("promo")}
        >
          Mã giảm giá
        </button>
      </div>

      <div className="settings-content">
        {/* TAB: General Settings */}
        {activeTab === "general" && (
          <div className="tab-content">
            <h2>Thông tin chung</h2>
            
            <div className="form-group">
              <label>Tên website</label>
              <input 
                type="text"
                value={settings.websiteName}
                onChange={(e) => handleChange(e, "websiteName")}
                placeholder="Nhập tên website"
              />
            </div>

            <div className="form-group">
              <label>Logo URL</label>
              <input 
                type="text"
                value={settings.websiteLogo}
                onChange={(e) => handleChange(e, "websiteLogo")}
                placeholder="Nhập URL logo"
              />
              {settings.websiteLogo && (
                <div className="logo-preview">
                  <img src={settings.websiteLogo} alt="Logo preview" />
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Mô tả website</label>
              <textarea 
                value={settings.websiteDescription}
                onChange={(e) => handleChange(e, "websiteDescription")}
                placeholder="Nhập mô tả website"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Email công ty</label>
              <input 
                type="email"
                value={settings.companyEmail}
                onChange={(e) => handleChange(e, "companyEmail")}
                placeholder="Nhập email"
              />
            </div>

            <div className="form-group">
              <label>Số điện thoại công ty</label>
              <input 
                type="text"
                value={settings.companyPhone}
                onChange={(e) => handleChange(e, "companyPhone")}
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div className="form-group">
              <label>Địa chỉ công ty</label>
              <textarea 
                value={settings.companyAddress}
                onChange={(e) => handleChange(e, "companyAddress")}
                placeholder="Nhập địa chỉ"
                rows="3"
              />
            </div>

            <div className="form-group checkbox">
              <label>
                <input 
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleChange(e, "maintenanceMode")}
                />
                Chế độ bảo trì
              </label>
            </div>

            {settings.maintenanceMode && (
              <div className="form-group">
                <label>Thông báo bảo trì</label>
                <textarea 
                  value={settings.maintenanceMessage}
                  onChange={(e) => handleChange(e, "maintenanceMessage")}
                  placeholder="Nhập thông báo"
                  rows="2"
                />
              </div>
            )}
          </div>
        )}

        {/* TAB: Features */}
        {activeTab === "features" && (
          <div className="tab-content">
            <h2>Quản lý tính năng</h2>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-header">
                  <h3>Mã giảm giá</h3>
                  <label className="switch">
                    <input 
                      type="checkbox"
                      checked={settings.features?.promoCode?.enabled}
                      onChange={(e) => handleChange(e, "features.promoCode.enabled")}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <p>{settings.features?.promoCode?.description}</p>
              </div>

              <div className="feature-card">
                <div className="feature-header">
                  <h3>Chương trình tích điểm</h3>
                  <label className="switch">
                    <input 
                      type="checkbox"
                      checked={settings.features?.loyaltyProgram?.enabled}
                      onChange={(e) => handleChange(e, "features.loyaltyProgram.enabled")}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <p>{settings.features?.loyaltyProgram?.description}</p>
              </div>

              <div className="feature-card">
                <div className="feature-header">
                  <h3>Mini Games</h3>
                  <label className="switch">
                    <input 
                      type="checkbox"
                      checked={settings.features?.miniGames?.enabled}
                      onChange={(e) => handleChange(e, "features.miniGames.enabled")}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <p>{settings.features?.miniGames?.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Loyalty Program */}
        {activeTab === "loyalty" && (
          <div className="tab-content">
            <h2>Cấu hình chương trình tích điểm</h2>
            
            <div className="form-group">
              <label>Điểm trên 1 VND</label>
              <input 
                type="number"
                value={settings.loyalty?.pointsPerDong}
                onChange={(e) => handleChange(e, "loyalty.pointsPerDong")}
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label>Số ngày hết hạn điểm</label>
              <input 
                type="number"
                value={settings.loyalty?.pointExpiryDays}
                onChange={(e) => handleChange(e, "loyalty.pointExpiryDays")}
              />
            </div>

            <div className="form-group">
              <label>Điểm thưởng khi refer bạn</label>
              <input 
                type="number"
                value={settings.loyalty?.pointsForReferral}
                onChange={(e) => handleChange(e, "loyalty.pointsForReferral")}
              />
            </div>

            <div className="form-group checkbox">
              <label>
                <input 
                  type="checkbox"
                  checked={settings.loyalty?.enableTierSystem}
                  onChange={(e) => handleChange(e, "loyalty.enableTierSystem")}
                />
                Kích hoạt hệ thống Tier
              </label>
            </div>

            <div className="tiers-section">
              <h3>Cấu hình Tier</h3>
              {["bronze", "silver", "gold", "platinum"].map((tier) => (
                <div key={tier} className="tier-card">
                  <h4>{settings.loyalty?.tiers?.[tier]?.name}</h4>
                  <div className="form-group">
                    <label>Số tiền tối thiểu (VND)</label>
                    <input 
                      type="number"
                      value={settings.loyalty?.tiers?.[tier]?.minSpent}
                      onChange={(e) => handleChange(e, `loyalty.tiers.${tier}.minSpent`)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Hệ số điểm</label>
                    <input 
                      type="number"
                      value={settings.loyalty?.tiers?.[tier]?.pointMultiplier}
                      onChange={(e) => handleChange(e, `loyalty.tiers.${tier}.pointMultiplier`)}
                      step="0.1"
                    />
                  </div>
                  <div className="form-group">
                    <label>Điểm thưởng khi lên tier</label>
                    <input 
                      type="number"
                      value={settings.loyalty?.tiers?.[tier]?.bonusPointsOnTierUp}
                      onChange={(e) => handleChange(e, `loyalty.tiers.${tier}.bonusPointsOnTierUp`)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Mini Games */}
        {activeTab === "games" && (
          <div className="tab-content">
            <h2>Cấu hình Mini Games</h2>
            
            <div className="form-group">
              <label>Giới hạn lượt chơi/ngày</label>
              <input 
                type="number"
                value={settings.miniGames?.dailyPlayLimit}
                onChange={(e) => handleChange(e, "miniGames.dailyPlayLimit")}
              />
            </div>

            <div className="form-group">
              <label>Điểm tối đa có thể thắng/ngày</label>
              <input 
                type="number"
                value={settings.miniGames?.dailyMaxPoints}
                onChange={(e) => handleChange(e, "miniGames.dailyMaxPoints")}
              />
            </div>

            <div className="form-group">
              <label>Điểm tối đa có thể thắng/tuần</label>
              <input 
                type="number"
                value={settings.miniGames?.weeklyMaxPoints}
                onChange={(e) => handleChange(e, "miniGames.weeklyMaxPoints")}
              />
            </div>

            <div className="form-group">
              <label>Giá điểm cho mỗi lượt chơi trả phí</label>
              <input 
                type="number"
                value={settings.miniGames?.pointsPerFreePlay}
                onChange={(e) => handleChange(e, "miniGames.pointsPerFreePlay")}
              />
            </div>

            <div className="form-group">
              <label>Giờ reset lượt chơi (HH:mm)</label>
              <input 
                type="time"
                value={settings.miniGames?.rewardResetTime}
                onChange={(e) => handleChange(e, "miniGames.rewardResetTime")}
              />
            </div>

            <div className="games-list">
              <h3>Các trò chơi & Lượt miễn phí</h3>
              
              <div className="game-config-card">
                <div className="game-toggle">
                  <label>
                    <input 
                      type="checkbox"
                      checked={settings.miniGames?.spinWheelEnabled}
                      onChange={(e) => handleChange(e, "miniGames.spinWheelEnabled")}
                    />
                    <span>Quay bánh xe</span>
                  </label>
                </div>
                {settings.miniGames?.spinWheelEnabled && (
                  <div className="form-group">
                    <label>Lượt miễn phí/ngày</label>
                    <input 
                      type="number"
                      value={settings.miniGames?.spinWheelFreePlayLimit}
                      onChange={(e) => handleChange(e, "miniGames.spinWheelFreePlayLimit")}
                    />
                  </div>
                )}
              </div>

              <div className="game-config-card">
                <div className="game-toggle">
                  <label>
                    <input 
                      type="checkbox"
                      checked={settings.miniGames?.scratchCardEnabled}
                      onChange={(e) => handleChange(e, "miniGames.scratchCardEnabled")}
                    />
                    <span>Cào lộ phần thưởng</span>
                  </label>
                </div>
                {settings.miniGames?.scratchCardEnabled && (
                  <div className="form-group">
                    <label>Lượt miễn phí/ngày</label>
                    <input 
                      type="number"
                      value={settings.miniGames?.scratchCardFreePlayLimit}
                      onChange={(e) => handleChange(e, "miniGames.scratchCardFreePlayLimit")}
                    />
                  </div>
                )}
              </div>

              <div className="game-config-card">
                <div className="game-toggle">
                  <label>
                    <input 
                      type="checkbox"
                      checked={settings.miniGames?.mysteryBoxEnabled}
                      onChange={(e) => handleChange(e, "miniGames.mysteryBoxEnabled")}
                    />
                    <span>Hộp quà bí ẩn</span>
                  </label>
                </div>
                {settings.miniGames?.mysteryBoxEnabled && (
                  <div className="form-group">
                    <label>Lượt miễn phí/ngày</label>
                    <input 
                      type="number"
                      value={settings.miniGames?.mysteryBoxFreePlayLimit}
                      onChange={(e) => handleChange(e, "miniGames.mysteryBoxFreePlayLimit")}
                    />
                  </div>
                )}
              </div>

              <div className="game-config-card">
                <div className="game-toggle">
                  <label>
                    <input 
                      type="checkbox"
                      checked={settings.miniGames?.quizGameEnabled}
                      onChange={(e) => handleChange(e, "miniGames.quizGameEnabled")}
                    />
                    <span>Quiz game</span>
                  </label>
                </div>
                {settings.miniGames?.quizGameEnabled && (
                  <div className="form-group">
                    <label>Lượt miễn phí/ngày</label>
                    <input 
                      type="number"
                      value={settings.miniGames?.quizGameFreePlayLimit}
                      onChange={(e) => handleChange(e, "miniGames.quizGameFreePlayLimit")}
                    />
                  </div>
                )}
              </div>

              <div className="game-config-card">
                <div className="game-toggle">
                  <label>
                    <input 
                      type="checkbox"
                      checked={settings.miniGames?.luckyDrawEnabled}
                      onChange={(e) => handleChange(e, "miniGames.luckyDrawEnabled")}
                    />
                    <span>Lucky draw</span>
                  </label>
                </div>
                {settings.miniGames?.luckyDrawEnabled && (
                  <div className="form-group">
                    <label>Lượt miễn phí/ngày</label>
                    <input 
                      type="number"
                      value={settings.miniGames?.luckyDrawFreePlayLimit}
                      onChange={(e) => handleChange(e, "miniGames.luckyDrawFreePlayLimit")}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB: Promo Code */}
        {activeTab === "promo" && (
          <div className="tab-content">
            <h2>Cấu hình mã giảm giá</h2>
            
            <div className="form-group">
              <label>Phần trăm giảm tối đa (%)</label>
              <input 
                type="number"
                value={settings.promoCode?.maxDiscountPercentage}
                onChange={(e) => handleChange(e, "promoCode.maxDiscountPercentage")}
              />
            </div>

            <div className="form-group">
              <label>Số tiền giảm tối đa (VND)</label>
              <input 
                type="number"
                value={settings.promoCode?.maxFixedDiscount}
                onChange={(e) => handleChange(e, "promoCode.maxFixedDiscount")}
              />
            </div>

            <div className="form-group">
              <label>Số ngày hiệu lực mặc định</label>
              <input 
                type="number"
                value={settings.promoCode?.defaultValidityDays}
                onChange={(e) => handleChange(e, "promoCode.defaultValidityDays")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
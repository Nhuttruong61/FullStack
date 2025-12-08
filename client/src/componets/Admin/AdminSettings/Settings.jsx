import React, { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../../../api/settings";
import { useSettings } from "../../../contexts/SettingsContext";
import "./Settings.scss";

const THEME_PRESETS = [
  {
    id: "light-modern",
    name: "Light Modern",
    description: "Giao diện sáng hiện đại, dễ nhìn",
    config: {
      primaryColor: "#007bff",
      secondaryColor: "#6c757d",
      accentColor: "#28a745",
      successColor: "#28a745",
      dangerColor: "#dc3545",
      warningColor: "#ffc107",
      infoColor: "#17a2b8",
      backgroundColor: "#ffffff",
      backgroundSecondaryColor: "#f8f9fa",
      surfaceColor: "#ffffff",
      cardBackgroundColor: "#ffffff",
      textColor: "#212529",
      textSecondaryColor: "#6c757d",
      textLightColor: "#868e96",
      borderColor: "#dee2e6",
      borderLightColor: "#e9ecef",
      hoverColor: "#0056b3",
      shadowColor: "rgba(0, 0, 0, 0.1)",
      overlayColor: "rgba(0, 0, 0, 0.5)",
      linkColor: "#007bff",
      linkHoverColor: "#0056b3",
      buttonPrimaryBg: "#007bff",
      buttonPrimaryText: "#ffffff",
      buttonSecondaryBg: "#6c757d",
      buttonSecondaryText: "#ffffff",
      inputBorderColor: "#ced4da",
      inputBackgroundColor: "#ffffff",
      inputTextColor: "#212529",
      footerBackgroundColor: "#1a1a1a",
      footerTextColor: "#ffffff",
      headerBackgroundColor: "#ffffff",
      headerTextColor: "#212529",
      headerHoverColor: "#007bff",
      headerFontFamily: "'Roboto', sans-serif",
      headerFontSize: 16,
      borderRadius: 8,
      fontFamily: "'Roboto', sans-serif",
      fontSize: 16,
    }
  },
  {
    id: "dark-elegant",
    name: "Dark Elegant",
    description: "Giao diện tối thanh lịch, sang trọng",
    config: {
      primaryColor: "#6366f1",
      secondaryColor: "#8b5cf6",
      accentColor: "#ec4899",
      successColor: "#10b981",
      dangerColor: "#ef4444",
      warningColor: "#f59e0b",
      infoColor: "#3b82f6",
      backgroundColor: "#0f172a",
      backgroundSecondaryColor: "#1e293b",
      surfaceColor: "#1e293b",
      cardBackgroundColor: "#1e293b",
      textColor: "#f1f5f9",
      textSecondaryColor: "#94a3b8",
      textLightColor: "#64748b",
      borderColor: "#334155",
      borderLightColor: "#475569",
      hoverColor: "#818cf8",
      shadowColor: "rgba(0, 0, 0, 0.3)",
      overlayColor: "rgba(0, 0, 0, 0.7)",
      linkColor: "#6366f1",
      linkHoverColor: "#818cf8",
      buttonPrimaryBg: "#6366f1",
      buttonPrimaryText: "#ffffff",
      buttonSecondaryBg: "#475569",
      buttonSecondaryText: "#f1f5f9",
      inputBorderColor: "#475569",
      inputBackgroundColor: "#1e293b",
      inputTextColor: "#f1f5f9",
      footerBackgroundColor: "#020617",
      footerTextColor: "#f1f5f9",
      headerBackgroundColor: "#0f172a",
      headerTextColor: "#f1f5f9",
      headerHoverColor: "#818cf8",
      headerFontFamily: "'Inter', sans-serif",
      headerFontSize: 16,
      borderRadius: 12,
      fontFamily: "'Inter', sans-serif",
      fontSize: 16,
    }
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    description: "Màu xanh dương biển, mát mẻ",
    config: {
      primaryColor: "#0ea5e9",
      secondaryColor: "#06b6d4",
      accentColor: "#14b8a6",
      successColor: "#10b981",
      dangerColor: "#ef4444",
      warningColor: "#f59e0b",
      infoColor: "#3b82f6",
      backgroundColor: "#f0f9ff",
      backgroundSecondaryColor: "#e0f2fe",
      surfaceColor: "#ffffff",
      cardBackgroundColor: "#ffffff",
      textColor: "#0c4a6e",
      textSecondaryColor: "#075985",
      textLightColor: "#0369a1",
      borderColor: "#bae6fd",
      borderLightColor: "#e0f2fe",
      hoverColor: "#0284c7",
      shadowColor: "rgba(14, 165, 233, 0.15)",
      overlayColor: "rgba(12, 74, 110, 0.5)",
      linkColor: "#0ea5e9",
      linkHoverColor: "#0284c7",
      buttonPrimaryBg: "#0ea5e9",
      buttonPrimaryText: "#ffffff",
      buttonSecondaryBg: "#06b6d4",
      buttonSecondaryText: "#ffffff",
      inputBorderColor: "#7dd3fc",
      inputBackgroundColor: "#ffffff",
      inputTextColor: "#0c4a6e",
      footerBackgroundColor: "#075985",
      footerTextColor: "#f0f9ff",
      headerBackgroundColor: "#e0f2fe",
      headerTextColor: "#0c4a6e",
      headerHoverColor: "#0284c7",
      headerFontFamily: "'Poppins', sans-serif",
      headerFontSize: 16,
      borderRadius: 10,
      fontFamily: "'Poppins', sans-serif",
      fontSize: 16,
    }
  },
  {
    id: "sunset-warm",
    name: "Sunset Warm",
    description: "Màu ấm áp như hoàng hôn",
    config: {
      primaryColor: "#f97316",
      secondaryColor: "#fb923c",
      accentColor: "#facc15",
      successColor: "#84cc16",
      dangerColor: "#dc2626",
      warningColor: "#eab308",
      infoColor: "#06b6d4",
      backgroundColor: "#fffbeb",
      backgroundSecondaryColor: "#fef3c7",
      surfaceColor: "#ffffff",
      cardBackgroundColor: "#ffffff",
      textColor: "#78350f",
      textSecondaryColor: "#92400e",
      textLightColor: "#b45309",
      borderColor: "#fed7aa",
      borderLightColor: "#fef3c7",
      hoverColor: "#ea580c",
      shadowColor: "rgba(249, 115, 22, 0.15)",
      overlayColor: "rgba(120, 53, 15, 0.5)",
      linkColor: "#f97316",
      linkHoverColor: "#ea580c",
      buttonPrimaryBg: "#f97316",
      buttonPrimaryText: "#ffffff",
      buttonSecondaryBg: "#fb923c",
      buttonSecondaryText: "#ffffff",
      inputBorderColor: "#fdba74",
      inputBackgroundColor: "#ffffff",
      inputTextColor: "#78350f",
      footerBackgroundColor: "#92400e",
      footerTextColor: "#fffbeb",
      headerBackgroundColor: "#fef3c7",
      headerTextColor: "#78350f",
      headerHoverColor: "#ea580c",
      headerFontFamily: "'Montserrat', sans-serif",
      headerFontSize: 16,
      borderRadius: 8,
      fontFamily: "'Montserrat', sans-serif",
      fontSize: 16,
    }
  },
  {
    id: "forest-nature",
    name: "Forest Nature",
    description: "Màu xanh lá tự nhiên, thân thiện",
    config: {
      primaryColor: "#059669",
      secondaryColor: "#10b981",
      accentColor: "#34d399",
      successColor: "#22c55e",
      dangerColor: "#dc2626",
      warningColor: "#f59e0b",
      infoColor: "#06b6d4",
      backgroundColor: "#f0fdf4",
      backgroundSecondaryColor: "#dcfce7",
      surfaceColor: "#ffffff",
      cardBackgroundColor: "#ffffff",
      textColor: "#064e3b",
      textSecondaryColor: "#065f46",
      textLightColor: "#047857",
      borderColor: "#a7f3d0",
      borderLightColor: "#d1fae5",
      hoverColor: "#047857",
      shadowColor: "rgba(5, 150, 105, 0.15)",
      overlayColor: "rgba(6, 78, 59, 0.5)",
      linkColor: "#059669",
      linkHoverColor: "#047857",
      buttonPrimaryBg: "#059669",
      buttonPrimaryText: "#ffffff",
      buttonSecondaryBg: "#10b981",
      buttonSecondaryText: "#ffffff",
      inputBorderColor: "#6ee7b7",
      inputBackgroundColor: "#ffffff",
      inputTextColor: "#064e3b",
      footerBackgroundColor: "#065f46",
      footerTextColor: "#f0fdf4",
      headerBackgroundColor: "#dcfce7",
      headerTextColor: "#064e3b",
      headerHoverColor: "#047857",
      headerFontFamily: "'Open Sans', sans-serif",
      headerFontSize: 16,
      borderRadius: 8,
      fontFamily: "'Open Sans', sans-serif",
      fontSize: 16,
    }
  },
  {
    id: "purple-luxury",
    name: "Purple Luxury",
    description: "Màu tím sang trọng, đẳng cấp",
    config: {
      primaryColor: "#9333ea",
      secondaryColor: "#a855f7",
      accentColor: "#c084fc",
      successColor: "#22c55e",
      dangerColor: "#ef4444",
      warningColor: "#f59e0b",
      infoColor: "#3b82f6",
      backgroundColor: "#faf5ff",
      backgroundSecondaryColor: "#f3e8ff",
      surfaceColor: "#ffffff",
      cardBackgroundColor: "#ffffff",
      textColor: "#581c87",
      textSecondaryColor: "#6b21a8",
      textLightColor: "#7e22ce",
      borderColor: "#d8b4fe",
      borderLightColor: "#e9d5ff",
      hoverColor: "#7e22ce",
      shadowColor: "rgba(147, 51, 234, 0.15)",
      overlayColor: "rgba(88, 28, 135, 0.5)",
      linkColor: "#9333ea",
      linkHoverColor: "#7e22ce",
      buttonPrimaryBg: "#9333ea",
      buttonPrimaryText: "#ffffff",
      buttonSecondaryBg: "#a855f7",
      buttonSecondaryText: "#ffffff",
      inputBorderColor: "#c084fc",
      inputBackgroundColor: "#ffffff",
      inputTextColor: "#581c87",
      footerBackgroundColor: "#6b21a8",
      footerTextColor: "#faf5ff",
      headerBackgroundColor: "#f3e8ff",
      headerTextColor: "#581c87",
      headerHoverColor: "#7e22ce",
      headerFontFamily: "'Playfair Display', serif",
      headerFontSize: 16,
      borderRadius: 10,
      fontFamily: "'Playfair Display', serif",
      fontSize: 16,
    }
  },
  {
    id: "minimal-gray",
    name: "Minimal Gray",
    description: "Tối giản, tinh tế với tông xám",
    config: {
      primaryColor: "#18181b",
      secondaryColor: "#3f3f46",
      accentColor: "#71717a",
      successColor: "#22c55e",
      dangerColor: "#ef4444",
      warningColor: "#f59e0b",
      infoColor: "#3b82f6",
      backgroundColor: "#fafafa",
      backgroundSecondaryColor: "#f4f4f5",
      surfaceColor: "#ffffff",
      cardBackgroundColor: "#ffffff",
      textColor: "#18181b",
      textSecondaryColor: "#52525b",
      textLightColor: "#71717a",
      borderColor: "#e4e4e7",
      borderLightColor: "#f4f4f5",
      hoverColor: "#27272a",
      shadowColor: "rgba(0, 0, 0, 0.08)",
      overlayColor: "rgba(24, 24, 27, 0.5)",
      linkColor: "#18181b",
      linkHoverColor: "#3f3f46",
      buttonPrimaryBg: "#18181b",
      buttonPrimaryText: "#ffffff",
      buttonSecondaryBg: "#71717a",
      buttonSecondaryText: "#ffffff",
      inputBorderColor: "#d4d4d8",
      inputBackgroundColor: "#ffffff",
      inputTextColor: "#18181b",
      footerBackgroundColor: "#27272a",
      footerTextColor: "#fafafa",
      headerBackgroundColor: "#ffffff",
      headerTextColor: "#18181b",
      headerHoverColor: "#3f3f46",
      headerFontFamily: "'Lato', sans-serif",
      headerFontSize: 15,
      borderRadius: 6,
      fontFamily: "'Lato', sans-serif",
      fontSize: 15,
    }
  },
  {
    id: "rose-gold",
    name: "Rose Gold",
    description: "Màu hồng vàng sang trọng, nữ tính",
    config: {
      primaryColor: "#e11d48",
      secondaryColor: "#f43f5e",
      accentColor: "#fb7185",
      successColor: "#22c55e",
      dangerColor: "#dc2626",
      warningColor: "#f59e0b",
      infoColor: "#3b82f6",
      backgroundColor: "#fff1f2",
      backgroundSecondaryColor: "#ffe4e6",
      surfaceColor: "#ffffff",
      cardBackgroundColor: "#ffffff",
      textColor: "#881337",
      textSecondaryColor: "#9f1239",
      textLightColor: "#be123c",
      borderColor: "#fecdd3",
      borderLightColor: "#ffe4e6",
      hoverColor: "#be123c",
      shadowColor: "rgba(225, 29, 72, 0.15)",
      overlayColor: "rgba(136, 19, 55, 0.5)",
      linkColor: "#e11d48",
      linkHoverColor: "#be123c",
      buttonPrimaryBg: "#e11d48",
      buttonPrimaryText: "#ffffff",
      buttonSecondaryBg: "#f43f5e",
      buttonSecondaryText: "#ffffff",
      inputBorderColor: "#fda4af",
      inputBackgroundColor: "#ffffff",
      inputTextColor: "#881337",
      footerBackgroundColor: "#9f1239",
      footerTextColor: "#fff1f2",
      headerBackgroundColor: "#ffe4e6",
      headerTextColor: "#881337",
      headerHoverColor: "#be123c",
      headerFontFamily: "'Quicksand', sans-serif",
      headerFontSize: 16,
      borderRadius: 12,
      fontFamily: "'Quicksand', sans-serif",
      fontSize: 16,
    }
  }
];

const HEADER_LAYOUT_PRESETS = [
  {
    id: "modern",
    name: "Modern",
    description: "Hiện đại, rộng rãi",
    config: {
      logoSize: 50,
      logoPosition: "left",
      headerHeight: 80,
      stickyHeader: true,
      menuSpacing: 24,
      layoutStyle: "modern",
      showSearchBar: true,
      showWishlist: true,
      transparentOnTop: false,
      dropShadow: true,
    }
  },
  {
    id: "classic",
    name: "Classic",
    description: "Cổ điển, thanh lịch",
    config: {
      logoSize: 45,
      logoPosition: "left",
      headerHeight: 70,
      stickyHeader: true,
      menuSpacing: 20,
      layoutStyle: "classic",
      showSearchBar: true,
      showWishlist: true,
      transparentOnTop: false,
      dropShadow: true,
    }
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Tối giản, gọn gàng",
    config: {
      logoSize: 40,
      logoPosition: "left",
      headerHeight: 60,
      stickyHeader: false,
      menuSpacing: 30,
      layoutStyle: "minimal",
      showSearchBar: true,
      showWishlist: false,
      transparentOnTop: true,
      dropShadow: false,
    }
  },
  {
    id: "bold",
    name: "Bold",
    description: "Táo bạo, nổi bật",
    config: {
      logoSize: 55,
      logoPosition: "left",
      headerHeight: 85,
      stickyHeader: true,
      menuSpacing: 25,
      layoutStyle: "bold",
      showSearchBar: true,
      showWishlist: true,
      transparentOnTop: false,
      dropShadow: true,
    }
  },
  {
    id: "compact",
    name: "Compact",
    description: "Nhỏ gọn, tiết kiệm không gian",
    config: {
      logoSize: 38,
      logoPosition: "left",
      headerHeight: 55,
      stickyHeader: true,
      menuSpacing: 18,
      layoutStyle: "minimal",
      showSearchBar: false,
      showWishlist: true,
      transparentOnTop: false,
      dropShadow: false,
    }
  }
];

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

  // Apply theme preset
  const applyThemePreset = (presetConfig) => {
    const newSettings = JSON.parse(JSON.stringify(settings));
    if (!newSettings.theme) {
      newSettings.theme = {};
    }
    
    Object.keys(presetConfig).forEach(key => {
      newSettings.theme[key] = presetConfig[key];
    });
    
    setSettings(newSettings);
    setSaveSuccess("Đã áp dụng theme! Nhớ click 'Lưu thay đổi' để lưu vĩnh viễn.");
    setTimeout(() => setSaveSuccess(""), 4000);
  };

  // Apply header preset
  const applyHeaderPreset = (presetConfig) => {
    const newSettings = JSON.parse(JSON.stringify(settings));
    if (!newSettings.header) {
      newSettings.header = {};
    }
    
    Object.keys(presetConfig).forEach(key => {
      newSettings.header[key] = presetConfig[key];
    });
    
    setSettings(newSettings);
    setSaveSuccess("Đã áp dụng mẫu! Nhớ click 'Lưu thay đổi' để lưu vĩnh viễn.");
    setTimeout(() => setSaveSuccess(""), 4000);
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
        <button 
          className={`tab ${activeTab === "email" ? "active" : ""}`}
          onClick={() => setActiveTab("email")}
        >
          Email
        </button>
        <button 
          className={`tab ${activeTab === "theme" ? "active" : ""}`}
          onClick={() => setActiveTab("theme")}
        >
          Giao diện
        </button>
        <button 
          className={`tab ${activeTab === "header" ? "active" : ""}`}
          onClick={() => setActiveTab("header")}
        >
          Header
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

        {/* TAB: Email */}
        {activeTab === "email" && (
          <div className="tab-content">
            <h2>Cấu hình Email</h2>
            
            <div className="form-group checkbox">
              <label>
                <input 
                  type="checkbox"
                  checked={settings.email?.enableEmailNotification}
                  onChange={(e) => handleChange(e, "email.enableEmailNotification")}
                />
                Kích hoạt thông báo Email
              </label>
            </div>

            <div className="form-group">
              <label>SMTP Host</label>
              <input 
                type="text"
                value={settings.email?.smtpHost}
                onChange={(e) => handleChange(e, "email.smtpHost")}
                placeholder="smtp.gmail.com"
              />
            </div>

            <div className="form-group">
              <label>SMTP Port</label>
              <input 
                type="number"
                value={settings.email?.smtpPort}
                onChange={(e) => handleChange(e, "email.smtpPort")}
                placeholder="587"
              />
            </div>

            <div className="form-group">
              <label>SMTP User (Email)</label>
              <input 
                type="email"
                value={settings.email?.smtpUser}
                onChange={(e) => handleChange(e, "email.smtpUser")}
                placeholder="your-email@gmail.com"
              />
            </div>

            <div className="form-group">
              <label>SMTP Password</label>
              <input 
                type="password"
                value={settings.email?.smtpPassword}
                onChange={(e) => handleChange(e, "email.smtpPassword")}
                placeholder="Nhập password hoặc app password"
              />
            </div>
          </div>
        )}

        {/* TAB: Theme */}
        {activeTab === "theme" && (
          <div className="tab-content">
            <h2>Cấu hình giao diện</h2>
            
            {/* Theme Presets Section */}
            <div className="presets-section">
              <h3>🎨 Theme có sẵn</h3>
              <p className="presets-description">Chọn một theme có sẵn hoặc tùy chỉnh chi tiết bên dưới</p>
              
              <div className="presets-grid">
                {THEME_PRESETS.map((preset) => (
                  <div key={preset.id} className="preset-card theme-preset-card">
                    <div 
                      className="preset-preview theme-preset-preview"
                      style={{
                        background: `linear-gradient(135deg, ${preset.config.backgroundColor} 0%, ${preset.config.backgroundSecondaryColor} 100%)`,
                        borderBottom: `3px solid ${preset.config.primaryColor}`,
                        padding: "20px",
                        minHeight: "120px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                      }}
                    >
                      <div style={{
                        color: preset.config.textColor,
                        fontFamily: preset.config.fontFamily,
                        fontSize: "14px",
                        fontWeight: "bold"
                      }}>
                        Sample Heading
                      </div>
                      <div style={{
                        color: preset.config.textSecondaryColor,
                        fontFamily: preset.config.fontFamily,
                        fontSize: "12px"
                      }}>
                        Sample text content
                      </div>
                      <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
                        <span style={{
                          backgroundColor: preset.config.buttonPrimaryBg,
                          color: preset.config.buttonPrimaryText,
                          padding: "4px 12px",
                          borderRadius: `${preset.config.borderRadius}px`,
                          fontSize: "11px",
                          fontFamily: preset.config.fontFamily
                        }}>
                          Button
                        </span>
                        <span style={{
                          backgroundColor: preset.config.accentColor,
                          color: "#ffffff",
                          padding: "4px 12px",
                          borderRadius: `${preset.config.borderRadius}px`,
                          fontSize: "11px",
                          fontFamily: preset.config.fontFamily
                        }}>
                          Accent
                        </span>
                      </div>
                    </div>
                    
                    <div className="preset-info">
                      <h4>{preset.name}</h4>
                      <p>{preset.description}</p>
                      
                      <div className="preset-colors">
                        <span 
                          className="color-dot" 
                          style={{ backgroundColor: preset.config.primaryColor }}
                          title="Primary"
                        ></span>
                        <span 
                          className="color-dot" 
                          style={{ backgroundColor: preset.config.secondaryColor }}
                          title="Secondary"
                        ></span>
                        <span 
                          className="color-dot" 
                          style={{ backgroundColor: preset.config.accentColor }}
                          title="Accent"
                        ></span>
                        <span 
                          className="color-dot" 
                          style={{ backgroundColor: preset.config.backgroundColor }}
                          title="Background"
                        ></span>
                      </div>
                      
                      <button 
                        className="btn-apply-preset"
                        onClick={() => applyThemePreset(preset.config)}
                      >
                        Áp dụng theme này
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr style={{ margin: "30px 0", border: "1px solid #e0e0e0" }} />

            <h3>🎨 Tùy chỉnh chi tiết</h3>

            <h4 style={{ marginTop: "20px", color: "#555" }}>Màu chính</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Màu chủ đạo (Primary)</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.primaryColor || "#007bff"}
                    onChange={(e) => handleChange(e, "theme.primaryColor")}
                  />
                  <span className="color-value">{settings.theme?.primaryColor || "#007bff"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Màu phụ (Secondary)</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.secondaryColor || "#6c757d"}
                    onChange={(e) => handleChange(e, "theme.secondaryColor")}
                  />
                  <span className="color-value">{settings.theme?.secondaryColor || "#6c757d"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Màu nhấn (Accent)</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.accentColor || "#28a745"}
                    onChange={(e) => handleChange(e, "theme.accentColor")}
                  />
                  <span className="color-value">{settings.theme?.accentColor || "#28a745"}</span>
                </div>
              </div>
            </div>

            <h4 style={{ marginTop: "20px", color: "#555" }}>Màu trạng thái</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Màu thành công (Success)</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.successColor || "#28a745"}
                    onChange={(e) => handleChange(e, "theme.successColor")}
                  />
                  <span className="color-value">{settings.theme?.successColor || "#28a745"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Màu nguy hiểm (Danger)</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.dangerColor || "#dc3545"}
                    onChange={(e) => handleChange(e, "theme.dangerColor")}
                  />
                  <span className="color-value">{settings.theme?.dangerColor || "#dc3545"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Màu cảnh báo (Warning)</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.warningColor || "#ffc107"}
                    onChange={(e) => handleChange(e, "theme.warningColor")}
                  />
                  <span className="color-value">{settings.theme?.warningColor || "#ffc107"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Màu thông tin (Info)</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.infoColor || "#17a2b8"}
                    onChange={(e) => handleChange(e, "theme.infoColor")}
                  />
                  <span className="color-value">{settings.theme?.infoColor || "#17a2b8"}</span>
                </div>
              </div>
            </div>

            <h4 style={{ marginTop: "20px", color: "#555" }}>Màu nền</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Nền chính (Background)</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.backgroundColor || "#ffffff"}
                    onChange={(e) => handleChange(e, "theme.backgroundColor")}
                  />
                  <span className="color-value">{settings.theme?.backgroundColor || "#ffffff"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Nền phụ</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.backgroundSecondaryColor || "#f8f9fa"}
                    onChange={(e) => handleChange(e, "theme.backgroundSecondaryColor")}
                  />
                  <span className="color-value">{settings.theme?.backgroundSecondaryColor || "#f8f9fa"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Nền bề mặt (Surface)</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.surfaceColor || "#ffffff"}
                    onChange={(e) => handleChange(e, "theme.surfaceColor")}
                  />
                  <span className="color-value">{settings.theme?.surfaceColor || "#ffffff"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Nền card</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.cardBackgroundColor || "#ffffff"}
                    onChange={(e) => handleChange(e, "theme.cardBackgroundColor")}
                  />
                  <span className="color-value">{settings.theme?.cardBackgroundColor || "#ffffff"}</span>
                </div>
              </div>
            </div>

            <h4 style={{ marginTop: "20px", color: "#555" }}>Màu chữ</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Text chính</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.textColor || "#212529"}
                    onChange={(e) => handleChange(e, "theme.textColor")}
                  />
                  <span className="color-value">{settings.theme?.textColor || "#212529"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Text phụ</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.textSecondaryColor || "#6c757d"}
                    onChange={(e) => handleChange(e, "theme.textSecondaryColor")}
                  />
                  <span className="color-value">{settings.theme?.textSecondaryColor || "#6c757d"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Text nhạt</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.textLightColor || "#868e96"}
                    onChange={(e) => handleChange(e, "theme.textLightColor")}
                  />
                  <span className="color-value">{settings.theme?.textLightColor || "#868e96"}</span>
                </div>
              </div>
            </div>

            <h4 style={{ marginTop: "20px", color: "#555" }}>Màu viền & Đường nét</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Border chính</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.borderColor || "#dee2e6"}
                    onChange={(e) => handleChange(e, "theme.borderColor")}
                  />
                  <span className="color-value">{settings.theme?.borderColor || "#dee2e6"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Border nhạt</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.borderLightColor || "#e9ecef"}
                    onChange={(e) => handleChange(e, "theme.borderLightColor")}
                  />
                  <span className="color-value">{settings.theme?.borderLightColor || "#e9ecef"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Màu hover</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.hoverColor || "#0056b3"}
                    onChange={(e) => handleChange(e, "theme.hoverColor")}
                  />
                  <span className="color-value">{settings.theme?.hoverColor || "#0056b3"}</span>
                </div>
              </div>
            </div>

            <h4 style={{ marginTop: "20px", color: "#555" }}>Link</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Màu link</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.linkColor || "#007bff"}
                    onChange={(e) => handleChange(e, "theme.linkColor")}
                  />
                  <span className="color-value">{settings.theme?.linkColor || "#007bff"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Màu link hover</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.linkHoverColor || "#0056b3"}
                    onChange={(e) => handleChange(e, "theme.linkHoverColor")}
                  />
                  <span className="color-value">{settings.theme?.linkHoverColor || "#0056b3"}</span>
                </div>
              </div>
            </div>

            <h4 style={{ marginTop: "20px", color: "#555" }}>Button</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Button Primary - Nền</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.buttonPrimaryBg || "#007bff"}
                    onChange={(e) => handleChange(e, "theme.buttonPrimaryBg")}
                  />
                  <span className="color-value">{settings.theme?.buttonPrimaryBg || "#007bff"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Button Primary - Text</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.buttonPrimaryText || "#ffffff"}
                    onChange={(e) => handleChange(e, "theme.buttonPrimaryText")}
                  />
                  <span className="color-value">{settings.theme?.buttonPrimaryText || "#ffffff"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Button Secondary - Nền</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.buttonSecondaryBg || "#6c757d"}
                    onChange={(e) => handleChange(e, "theme.buttonSecondaryBg")}
                  />
                  <span className="color-value">{settings.theme?.buttonSecondaryBg || "#6c757d"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Button Secondary - Text</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.buttonSecondaryText || "#ffffff"}
                    onChange={(e) => handleChange(e, "theme.buttonSecondaryText")}
                  />
                  <span className="color-value">{settings.theme?.buttonSecondaryText || "#ffffff"}</span>
                </div>
              </div>
            </div>

            <h4 style={{ marginTop: "20px", color: "#555" }}>Input</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Input - Border</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.inputBorderColor || "#ced4da"}
                    onChange={(e) => handleChange(e, "theme.inputBorderColor")}
                  />
                  <span className="color-value">{settings.theme?.inputBorderColor || "#ced4da"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Input - Nền</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.inputBackgroundColor || "#ffffff"}
                    onChange={(e) => handleChange(e, "theme.inputBackgroundColor")}
                  />
                  <span className="color-value">{settings.theme?.inputBackgroundColor || "#ffffff"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Input - Text</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.inputTextColor || "#212529"}
                    onChange={(e) => handleChange(e, "theme.inputTextColor")}
                  />
                  <span className="color-value">{settings.theme?.inputTextColor || "#212529"}</span>
                </div>
              </div>
            </div>

            <h4 style={{ marginTop: "20px", color: "#555" }}>Footer</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Footer - Nền</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.footerBackgroundColor || "#1a1a1a"}
                    onChange={(e) => handleChange(e, "theme.footerBackgroundColor")}
                  />
                  <span className="color-value">{settings.theme?.footerBackgroundColor || "#1a1a1a"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Footer - Text</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.footerTextColor || "#ffffff"}
                    onChange={(e) => handleChange(e, "theme.footerTextColor")}
                  />
                  <span className="color-value">{settings.theme?.footerTextColor || "#ffffff"}</span>
                </div>
              </div>
            </div>

            <h4 style={{ marginTop: "20px", color: "#555" }}>Typography & Layout</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Font Family</label>
                <select 
                  value={settings.theme?.fontFamily || "'Roboto', sans-serif"}
                  onChange={(e) => handleChange(e, "theme.fontFamily")}
                >
                  <option value="'Roboto', sans-serif">Roboto</option>
                  <option value="'Inter', sans-serif">Inter</option>
                  <option value="'Poppins', sans-serif">Poppins</option>
                  <option value="'Open Sans', sans-serif">Open Sans</option>
                  <option value="'Lato', sans-serif">Lato</option>
                  <option value="'Montserrat', sans-serif">Montserrat</option>
                  <option value="'Playfair Display', serif">Playfair Display</option>
                  <option value="'Times New Roman', serif">Times New Roman</option>
                </select>
              </div>

              <div className="form-group">
                <label>Font Size (px)</label>
                <input 
                  type="number"
                  value={settings.theme?.fontSize || 16}
                  onChange={(e) => handleChange(e, "theme.fontSize")}
                  min="12"
                  max="24"
                />
              </div>

              <div className="form-group">
                <label>Border Radius (px)</label>
                <input 
                  type="number"
                  value={settings.theme?.borderRadius || 8}
                  onChange={(e) => handleChange(e, "theme.borderRadius")}
                  min="0"
                  max="20"
                />
              </div>
            </div>

            <h4 style={{ marginTop: "20px", color: "#555" }}>Header</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Màu nền Header</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.headerBackgroundColor || "#1a1a1a"}
                    onChange={(e) => handleChange(e, "theme.headerBackgroundColor")}
                  />
                  <span className="color-value">{settings.theme?.headerBackgroundColor || "#1a1a1a"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Màu chữ Header</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.headerTextColor || "#ffffff"}
                    onChange={(e) => handleChange(e, "theme.headerTextColor")}
                  />
                  <span className="color-value">{settings.theme?.headerTextColor || "#ffffff"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Màu hover Header</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.headerHoverColor || "#ff6b6b"}
                    onChange={(e) => handleChange(e, "theme.headerHoverColor")}
                  />
                  <span className="color-value">{settings.theme?.headerHoverColor || "#ff6b6b"}</span>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Font Header</label>
                <select 
                  value={settings.theme?.headerFontFamily || settings.theme?.fontFamily || "'Roboto', sans-serif"}
                  onChange={(e) => handleChange(e, "theme.headerFontFamily")}
                >
                  <option value="'Roboto', sans-serif">Roboto</option>
                  <option value="'Inter', sans-serif">Inter</option>
                  <option value="'Poppins', sans-serif">Poppins</option>
                  <option value="'Open Sans', sans-serif">Open Sans</option>
                  <option value="'Lato', sans-serif">Lato</option>
                  <option value="'Montserrat', sans-serif">Montserrat</option>
                  <option value="'Playfair Display', serif">Playfair Display</option>
                  <option value="'Quicksand', sans-serif">Quicksand</option>
                </select>
              </div>

              <div className="form-group">
                <label>Font Size Header (px)</label>
                <input 
                  type="number"
                  value={settings.theme?.headerFontSize || 16}
                  onChange={(e) => handleChange(e, "theme.headerFontSize")}
                  min="12"
                  max="24"
                />
              </div>
            </div>

            <h4 style={{ marginTop: "20px", color: "#555" }}>Footer</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Màu nền Footer</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.footerBackgroundColor || "#1a1a1a"}
                    onChange={(e) => handleChange(e, "theme.footerBackgroundColor")}
                  />
                  <span className="color-value">{settings.theme?.footerBackgroundColor || "#1a1a1a"}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Màu chữ Footer</label>
                <div className="color-input-group">
                  <input 
                    type="color"
                    value={settings.theme?.footerTextColor || "#ffffff"}
                    onChange={(e) => handleChange(e, "theme.footerTextColor")}
                  />
                  <span className="color-value">{settings.theme?.footerTextColor || "#ffffff"}</span>
                </div>
              </div>
            </div>

            <div className="theme-preview" style={{ marginTop: "30px" }}>
              <h3>Xem trước</h3>
              <div className="preview-card" style={{
                backgroundColor: settings.theme?.cardBackgroundColor || "#ffffff",
                color: settings.theme?.textColor || "#212529",
                border: `1px solid ${settings.theme?.borderColor || "#dee2e6"}`,
                borderRadius: `${settings.theme?.borderRadius || 8}px`,
                fontFamily: settings.theme?.fontFamily || "'Roboto', sans-serif",
                fontSize: `${settings.theme?.fontSize || 16}px`
              }}>
                <h4 style={{color: settings.theme?.primaryColor || "#007bff"}}>Sample Heading</h4>
                <p style={{color: settings.theme?.textSecondaryColor || "#6c757d"}}>This is sample text to preview the theme</p>
                <div style={{ display: "flex", gap: "10px", marginTop: "15px", flexWrap: "wrap" }}>
                  <button style={{
                    backgroundColor: settings.theme?.buttonPrimaryBg || "#007bff",
                    color: settings.theme?.buttonPrimaryText || "#ffffff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: `${settings.theme?.borderRadius || 8}px`,
                    fontFamily: settings.theme?.fontFamily || "'Roboto', sans-serif",
                    cursor: "pointer"
                  }}>
                    Primary Button
                  </button>
                  <button style={{
                    backgroundColor: settings.theme?.buttonSecondaryBg || "#6c757d",
                    color: settings.theme?.buttonSecondaryText || "#ffffff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: `${settings.theme?.borderRadius || 8}px`,
                    fontFamily: settings.theme?.fontFamily || "'Roboto', sans-serif",
                    cursor: "pointer"
                  }}>
                    Secondary Button
                  </button>
                  <button style={{
                    backgroundColor: settings.theme?.successColor || "#28a745",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: `${settings.theme?.borderRadius || 8}px`,
                    fontFamily: settings.theme?.fontFamily || "'Roboto', sans-serif",
                    cursor: "pointer"
                  }}>
                    Success
                  </button>
                  <button style={{
                    backgroundColor: settings.theme?.dangerColor || "#dc3545",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: `${settings.theme?.borderRadius || 8}px`,
                    fontFamily: settings.theme?.fontFamily || "'Roboto', sans-serif",
                    cursor: "pointer"
                  }}>
                    Danger
                  </button>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <a href="#" style={{
                    color: settings.theme?.linkColor || "#007bff",
                    fontFamily: settings.theme?.fontFamily || "'Roboto', sans-serif"
                  }}>
                    Sample Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Header */}
        {activeTab === "header" && (
          <div className="tab-content">
            <h2>Cấu hình Layout Header</h2>
            
            <div className="info-box" style={{ 
              backgroundColor: "#e8f5e9", 
              padding: "15px", 
              borderRadius: "8px", 
              marginBottom: "20px",
              border: "1px solid #4caf50"
            }}>
              <strong>💡 Lưu ý:</strong> Màu sắc và font chữ của Header được quản lý trong tab <strong>Giao diện (Theme)</strong>. 
              Ở đây bạn chỉ cấu hình về bố cục, kích thước và hiển thị.
            </div>

            {/* Layout Presets Section */}
            <div className="presets-section">
              <h3>📐 Mẫu bố cục nhanh</h3>
              <p className="presets-description">Chọn một mẫu bố cục có sẵn hoặc tùy chỉnh chi tiết bên dưới</p>
              
              <div className="presets-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
                {HEADER_LAYOUT_PRESETS.map((preset) => (
                  <div key={preset.id} className="preset-card">
                    <div className="preset-info">
                      <h4>{preset.name}</h4>
                      <p>{preset.description}</p>
                      <div style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>
                        <div>• Chiều cao: {preset.config.headerHeight}px</div>
                        <div>• Logo: {preset.config.logoSize}px</div>
                        <div>• {preset.config.stickyHeader ? "✓" : "✗"} Sticky</div>
                      </div>
                      
                      <button 
                        className="btn-apply-preset"
                        onClick={() => applyHeaderPreset(preset.config)}
                        style={{ marginTop: "10px" }}
                      >
                        Áp dụng bố cục
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr style={{ margin: "30px 0", border: "1px solid #e0e0e0" }} />

            <h3>📐 Tùy chỉnh chi tiết</h3>
            
            <div className="form-group">
              <label>Kiểu Header</label>
              <select 
                value={settings.header?.layoutStyle || "modern"}
                onChange={(e) => handleChange(e, "header.layoutStyle")}
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="minimal">Minimal</option>
                <option value="bold">Bold</option>
              </select>
            </div>

            <h3>Logo & Kích thước</h3>

            <div className="form-group">
              <label>Kích thước Logo (px)</label>
              <input 
                type="number"
                value={settings.header?.logoSize || 50}
                onChange={(e) => handleChange(e, "header.logoSize")}
                min="20"
                max="200"
              />
            </div>

            <div className="form-group">
              <label>Vị trí Logo</label>
              <select 
                value={settings.header?.logoPosition || "left"}
                onChange={(e) => handleChange(e, "header.logoPosition")}
              >
                <option value="left">Trái</option>
                <option value="center">Giữa</option>
              </select>
            </div>

            <div className="form-group">
              <label>Chiều cao Header (px)</label>
              <input 
                type="number"
                value={settings.header?.headerHeight || 80}
                onChange={(e) => handleChange(e, "header.headerHeight")}
                min="50"
                max="150"
              />
            </div>

            <div className="form-group">
              <label>Khoảng cách Menu (px)</label>
              <input 
                type="number"
                value={settings.header?.menuSpacing || 20}
                onChange={(e) => handleChange(e, "header.menuSpacing")}
                min="5"
                max="50"
              />
            </div>

            <h3>Tùy chọn hiển thị</h3>

            <div className="form-group checkbox">
              <label>
                <input 
                  type="checkbox"
                  checked={settings.header?.stickyHeader || false}
                  onChange={(e) => handleChange(e, "header.stickyHeader")}
                />
                Header dính (Sticky Header)
              </label>
            </div>

            <div className="form-group checkbox">
              <label>
                <input 
                  type="checkbox"
                  checked={settings.header?.transparentOnTop || false}
                  onChange={(e) => handleChange(e, "header.transparentOnTop")}
                />
                Trong suốt khi ở đầu trang
              </label>
            </div>

            <div className="form-group checkbox">
              <label>
                <input 
                  type="checkbox"
                  checked={settings.header?.dropShadow || false}
                  onChange={(e) => handleChange(e, "header.dropShadow")}
                />
                Đổ bóng Header
              </label>
            </div>

            <div className="form-group checkbox">
              <label>
                <input 
                  type="checkbox"
                  checked={settings.header?.showSearchBar !== false}
                  onChange={(e) => handleChange(e, "header.showSearchBar")}
                />
                Hiển thị thanh tìm kiếm
              </label>
            </div>

            <div className="form-group checkbox">
              <label>
                <input 
                  type="checkbox"
                  checked={settings.header?.showWishlist !== false}
                  onChange={(e) => handleChange(e, "header.showWishlist")}
                />
                Hiển thị Wishlist
              </label>
            </div>

            <div className="header-preview">
              <h3>Xem trước Layout</h3>
              <p style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}>
                Màu sắc hiển thị ở đây lấy từ Theme hiện tại. Để thay đổi màu Header, vào tab Giao diện.
              </p>
              <div 
                className="preview-header" 
                style={{
                  backgroundColor: "var(--header-bg, #1a1a1a)",
                  color: "var(--header-text, #ffffff)",
                  height: `${settings.header?.headerHeight || 80}px`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: settings.header?.logoPosition === "center" ? "center" : "space-between",
                  padding: "0 20px",
                  boxShadow: settings.header?.dropShadow ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
                  gap: `${settings.header?.menuSpacing || 20}px`,
                  borderRadius: "8px",
                  border: "1px solid #ddd"
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: `${settings.header?.logoSize || 50}px` }}>📱</div>
                <div style={{ display: "flex", gap: `${settings.header?.menuSpacing || 20}px` }}>
                  <span style={{ cursor: "pointer" }}>Trang chủ</span>
                  <span 
                    style={{ 
                      cursor: "pointer",
                      color: "var(--header-hover, #ff6b6b)"
                    }}
                  >
                    Sản phẩm
                  </span>
                  <span style={{ cursor: "pointer" }}>Tin tức</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
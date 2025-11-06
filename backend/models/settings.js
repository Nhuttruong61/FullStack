const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    // Website General Settings
    websiteName: {
      type: String,
      default: "TopPhone",
    },
    websiteLogo: {
      type: String,
      default: "",
    },
    websiteDescription: {
      type: String,
      default: "E-commerce website for phones",
    },
    companyEmail: {
      type: String,
      default: "",
    },
    companyPhone: {
      type: String,
      default: "",
    },
    companyAddress: {
      type: String,
      default: "",
    },

    // Feature Toggle - Mã Giảm Giá
    features: {
      promoCode: {
        enabled: { type: Boolean, default: true },
        description: { type: String, default: "Mã giảm giá" },
      },
      // Feature Toggle - Tích Điểm
      loyaltyProgram: {
        enabled: { type: Boolean, default: true },
        description: { type: String, default: "Chương trình tích điểm" },
      },
      // Feature Toggle - Mini Games
      miniGames: {
        enabled: { type: Boolean, default: true },
        description: { type: String, default: "Mini games - quay bánh xe" },
      },
    },

    // Loyalty Program Configuration
    loyalty: {
      pointsPerDong: { type: Number, default: 1 }, // 1 VND = ? point
      pointExpiryDays: { type: Number, default: 365 }, // Điểm hết hạn sau bao nhiêu ngày
      pointsForReferral: { type: Number, default: 500 }, // Điểm nhận khi refer bạn
      enableTierSystem: { type: Boolean, default: true },
      // Tier Configuration
      tiers: {
        bronze: {
          name: { type: String, default: "Bronze" },
          minSpent: { type: Number, default: 0 }, // VND
          pointMultiplier: { type: Number, default: 1.0 },
          bonusPointsOnTierUp: { type: Number, default: 100 },
        },
        silver: {
          name: { type: String, default: "Silver" },
          minSpent: { type: Number, default: 5000000 },
          pointMultiplier: { type: Number, default: 1.2 },
          bonusPointsOnTierUp: { type: Number, default: 200 },
        },
        gold: {
          name: { type: String, default: "Gold" },
          minSpent: { type: Number, default: 20000000 },
          pointMultiplier: { type: Number, default: 1.5 },
          bonusPointsOnTierUp: { type: Number, default: 500 },
        },
        platinum: {
          name: { type: String, default: "Platinum" },
          minSpent: { type: Number, default: 50000000 },
          pointMultiplier: { type: Number, default: 2.0 },
          bonusPointsOnTierUp: { type: Number, default: 1000 },
        },
      },
    },

    // Mini Games Configuration
    miniGames: {
      dailyPlayLimit: { type: Number, default: 3 }, // Lượt chơi tối đa/ngày
      dailyMaxPoints: { type: Number, default: 500 }, // Điểm tối đa có thể thắng/ngày
      weeklyMaxPoints: { type: Number, default: 2500 }, // Điểm tối đa có thể thắng/tuần
      pointsPerFreePlay: { type: Number, default: 10 }, // Giá điểm cho mỗi lượt chơi trả phí
      spinWheelEnabled: { type: Boolean, default: true },
      spinWheelFreePlayLimit: { type: Number, default: 1 }, // Lượt miễn phí/ngày
      scratchCardEnabled: { type: Boolean, default: true },
      scratchCardFreePlayLimit: { type: Number, default: 1 }, // Lượt miễn phí/ngày
      mysteryBoxEnabled: { type: Boolean, default: true },
      mysteryBoxFreePlayLimit: { type: Number, default: 1 }, // Lượt miễn phí/ngày
      quizGameEnabled: { type: Boolean, default: true },
      quizGameFreePlayLimit: { type: Number, default: 1 }, // Lượt miễn phí/ngày
      luckyDrawEnabled: { type: Boolean, default: true },
      luckyDrawFreePlayLimit: { type: Number, default: 1 }, // Lượt miễn phí/ngày
      rewardResetTime: { type: String, default: "00:00" }, // HH:mm format
    },

    // Promo Code Configuration
    promoCode: {
      maxDiscountPercentage: { type: Number, default: 50 }, // Tối đa % giảm
      maxFixedDiscount: { type: Number, default: 500000 }, // Tối đa tiền giảm
      defaultValidityDays: { type: Number, default: 30 }, // Hiệu lực mặc định
    },

    // Email Configuration
    email: {
      smtpHost: { type: String, default: "" },
      smtpPort: { type: Number, default: 587 },
      smtpUser: { type: String, default: "" },
      smtpPassword: { type: String, default: "" },
      enableEmailNotification: { type: Boolean, default: false },
    },

    // Other Settings
    maintenanceMode: { type: Boolean, default: false },
    maintenanceMessage: { type: String, default: "Website đang bảo trì" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Settings", settingsSchema);
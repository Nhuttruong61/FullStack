const Settings = require("../models/settings");

const seedSettings = async () => {
  try {
    const existingSettings = await Settings.findOne();
    
    if (existingSettings) {
      return;
    }

    const defaultSettings = new Settings({
      websiteName: "TopPhone",
      websiteLogo: "",
      websiteDescription: "E-commerce website for phones",
      companyEmail: "info@topphone.com",
      companyPhone: "+84 123 456 789",
      companyAddress: "123 Main St, City",
      features: {
        promoCode: {
          enabled: true,
          description: "Mã giảm giá",
        },
        loyaltyProgram: {
          enabled: true,
          description: "Chương trình tích điểm",
        },
        miniGames: {
          enabled: true,
          description: "Mini games - quay bánh xe",
        },
      },
      miniGames: {
        dailyPlayLimit: 3,
        spinWheelEnabled: true,
        scratchCardEnabled: true,
        mysteryBoxEnabled: true,
        quizGameEnabled: true,
        luckyDrawEnabled: true,
        rewardResetTime: "00:00",
      },
      loyalty: {
        pointsPerDong: 1,
        pointExpiryDays: 365,
        pointsForReferral: 500,
        enableTierSystem: true,
        tiers: {
          bronze: {
            name: "Bronze",
            minSpent: 0,
            pointMultiplier: 1.0,
            bonusPointsOnTierUp: 100,
          },
          silver: {
            name: "Silver",
            minSpent: 5000000,
            pointMultiplier: 1.2,
            bonusPointsOnTierUp: 200,
          },
          gold: {
            name: "Gold",
            minSpent: 20000000,
            pointMultiplier: 1.5,
            bonusPointsOnTierUp: 500,
          },
          platinum: {
            name: "Platinum",
            minSpent: 50000000,
            pointMultiplier: 2.0,
            bonusPointsOnTierUp: 1000,
          },
        },
      },
      promoCode: {
        maxDiscountPercentage: 50,
        maxFixedDiscount: 500000,
        defaultValidityDays: 30,
      },
      email: {
        smtpHost: "",
        smtpPort: 587,
        smtpUser: "",
        smtpPassword: "",
        enableEmailNotification: false,
      },
      maintenanceMode: false,
      maintenanceMessage: "Website đang bảo trì",
    });

    await defaultSettings.save();
  } catch (error) {
    console.error("✗ Error seeding settings:", error.message);
    throw error;
  }
};

module.exports = { seedSettings };

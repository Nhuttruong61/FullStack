import axios from "./axios";

export const getRewardOptions = async () => {
  try {
    const res = await axios.get("/rewards/options");
    return res.data;
  } catch (e) {
    console.error("getRewardOptions error:", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};

export const redeemReward = async (rewardId) => {
  try {
    const res = await axios.post("/rewards/redeem", { rewardId });
    return res.data;
  } catch (e) {
    console.error("redeemReward error:", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};

export const getUserPromoCodes = async () => {
  try {
    const res = await axios.get("/rewards/promo-codes");
    return res.data;
  } catch (e) {
    console.error("getUserPromoCodes error:", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};

export const validatePromoCode = async (code, orderValue) => {
  try {
    const res = await axios.post("/rewards/validate", { code, orderValue });
    return res.data;
  } catch (e) {
    console.error("validatePromoCode error:", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};

import axios from "./axios";

export const getLoyaltyInfo = async () => {
  try {
    const res = await axios.get("/loyalty/info");
    return res.data;
  } catch (e) {
    console.error("getLoyaltyInfo error:", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};

export const getAvailableLoyaltyRewards = async () => {
  try {
    const res = await axios.get("/loyalty/rewards");
    return res.data;
  } catch (e) {
    console.error("getAvailableLoyaltyRewards error:", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};

export const redeemLoyaltyReward = async (rewardId) => {
  try {
    const res = await axios.post("/loyalty/redeem", { rewardId });
    return res.data;
  } catch (e) {
    console.error("redeemLoyaltyReward error:", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};

export const getLoyaltyTransactions = async (page = 1, limit = 20) => {
  try {
    const res = await axios.get("/loyalty/transactions", {
      params: { page, limit },
    });
    return res.data;
  } catch (e) {
    console.error("getLoyaltyTransactions error:", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};

export const getAllLoyaltyRewards = async () => {
  try {
    const res = await axios.get("/loyalty/admin/rewards");
    return res.data;
  } catch (e) {
    console.error("getAllLoyaltyRewards error:", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};

export const createLoyaltyReward = async (rewardData) => {
  try {
    const res = await axios.post("/loyalty/admin/rewards", rewardData);
    return res.data;
  } catch (e) {
    console.error("createLoyaltyReward error:", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};

export const updateLoyaltyReward = async (id, rewardData) => {
  try {
    const res = await axios.put(`/loyalty/admin/rewards/${id}`, rewardData);
    return res.data;
  } catch (e) {
    console.error("updateLoyaltyReward error:", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};

export const deleteLoyaltyReward = async (id) => {
  try {
    const res = await axios.delete(`/loyalty/admin/rewards/${id}`);
    return res.data;
  } catch (e) {
    console.error("deleteLoyaltyReward error:", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};

export const addBonusPoints = async (userId, points, reason) => {
  try {
    const res = await axios.post("/loyalty/admin/bonus", {
      userId,
      points,
      reason,
    });
    return res.data;
  } catch (e) {
    console.error("addBonusPoints error:", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};

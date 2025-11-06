import axios from "./axios";

// Get all settings (admin only)
export const getSettings = async () => {
  try {
    const res = await axios.get("/settings");
    return res.data;
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

// Update settings (admin only)
export const updateSettings = async (data) => {
  try {
    const res = await axios.put("/settings", data);
    return res.data;
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

// Toggle specific feature (admin only)
export const toggleFeature = async (featureKey, enabled) => {
  try {
    const res = await axios.post("/settings/toggle-feature", {
      featureKey,
      enabled,
    });
    return res.data;
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

// Get public settings (no auth required)
export const getPublicSettings = async () => {
  try {
    const res = await axios.get("/settings/public");
    return res.data;
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};
import axios from "./axios";

export const getAllPromoCodes = async () => {
  try {
    const res = await axios.get("/admin/promo-codes");
    return res.data;
  } catch (e) {
    console.error("getAllPromoCodes error:", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};

export const createPromoCode = async (data) => {
  try {
    const res = await axios.post("/admin/promo-codes", data);
    return res.data;
  } catch (e) {
    console.error("createPromoCode error:", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};

export const updatePromoCode = async (id, data) => {
  try {
    const res = await axios.put(`/admin/promo-codes/${id}`, data);
    return res.data;
  } catch (e) {
    console.error("updatePromoCode error:", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};

export const deletePromoCode = async (id) => {
  try {
    const res = await axios.delete(`/admin/promo-codes/${id}`);
    return res.data;
  } catch (e) {
    console.error("deletePromoCode error:", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};

export const togglePromoCodeStatus = async (id) => {
  try {
    const res = await axios.patch(`/admin/promo-codes/${id}/toggle`);
    return res.data;
  } catch (e) {
    console.error("togglePromoCodeStatus error:", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};

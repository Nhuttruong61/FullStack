import axios from "./axios";

export const playMiniGame = async (gameType, result, isPaidPlay = false) => {
  try {
    const res = await axios.post("/minigames/play", { gameType, result, isPaidPlay });
    return res.data;
  } catch (e) {
    console.error("playMiniGame error:", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};

export const getUserGameStats = async () => {
  try {
    const res = await axios.get("/minigames/stats");
    return res.data;
  } catch (e) {
    console.error("getUserGameStats error:", e);
    return { success: false, message: e.message };
  }
};

export const getGameHistory = async () => {
  try {
    const res = await axios.get("/minigames/history");
    return res.data;
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

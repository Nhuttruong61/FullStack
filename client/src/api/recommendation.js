import axios from "./axios";

/**
 * Track product view
 * @param {string} productId
 * @param {number} duration - view duration in seconds
 */
export const trackProductView = async (productId, duration = 0) => {
  try {
    const response = await axios.post("/recommendation/track-view", {
      productId,
      duration,
    });
    return response.data;
  } catch (error) {
    console.error("Error tracking view:", error);
    throw error;
  }
};

/**
 * Get personalized recommendations
 * @param {number} limit - number of recommendations
 * @param {string} categoryId - optional category filter
 */
export const getForYouRecommendations = async (limit = 12, categoryId = null) => {
  try {
    const params = new URLSearchParams();
    params.append("limit", limit);
    if (categoryId) {
      params.append("categoryId", categoryId);
    }

    const response = await axios.get(`/recommendation/for-you?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error getting recommendations:", error);
    throw error;
  }
};

/**
 * Get trending products
 * @param {number} limit - number of products
 */
export const getTrendingProducts = async (limit = 12) => {
  try {
    const response = await axios.get(`/recommendation/trending?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error getting trending products:", error);
    throw error;
  }
};
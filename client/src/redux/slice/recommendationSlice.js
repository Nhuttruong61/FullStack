import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getForYouRecommendations,
  getTrendingProducts,
} from "../../api/recommendation";

export const fetchForYouRecommendations = createAsyncThunk(
  "recommendation/fetchForYou",
  async ({ limit = 12, categoryId = null } = {}, { rejectWithValue }) => {
    try {
      const response = await getForYouRecommendations(limit, categoryId);
      return response?.data || [];
    } catch (error) {
      console.error("Error fetching for you recommendations:", error);
      return rejectWithValue(error?.message || "Error fetching recommendations");
    }
  }
);

export const fetchTrendingProducts = createAsyncThunk(
  "recommendation/fetchTrending",
  async (limit = 12, { rejectWithValue }) => {
    try {
      const response = await getTrendingProducts(limit);
      return response?.data || [];
    } catch (error) {
      console.error("Error fetching trending products:", error);
      return rejectWithValue(error?.message || "Error fetching trending products");
    }
  }
);

const initialState = {
  forYou: {
    data: [],
    loading: false,
    error: null,
  },
  trending: {
    data: [],
    loading: false,
    error: null,
  },
};

const recommendationSlice = createSlice({
  name: "recommendation",
  initialState,
  reducers: {
    clearForYou: (state) => {
      state.forYou = { data: [], loading: false, error: null };
    },
    clearTrending: (state) => {
      state.trending = { data: [], loading: false, error: null };
    },
  },
  extraReducers: (builder) => {
    // For You Recommendations
    builder
      .addCase(fetchForYouRecommendations.pending, (state) => {
        state.forYou.loading = true;
        state.forYou.error = null;
      })
      .addCase(fetchForYouRecommendations.fulfilled, (state, action) => {
        state.forYou.loading = false;
        state.forYou.data = action.payload;
      })
      .addCase(fetchForYouRecommendations.rejected, (state, action) => {
        state.forYou.loading = false;
        state.forYou.error = action.payload;
      });

    // Trending Products
    builder
      .addCase(fetchTrendingProducts.pending, (state) => {
        state.trending.loading = true;
        state.trending.error = null;
      })
      .addCase(fetchTrendingProducts.fulfilled, (state, action) => {
        state.trending.loading = false;
        state.trending.data = action.payload;
      })
      .addCase(fetchTrendingProducts.rejected, (state, action) => {
        state.trending.loading = false;
        state.trending.error = action.payload;
      });
  },
});

export const { clearForYou, clearTrending } = recommendationSlice.actions;
export default recommendationSlice.reducer;
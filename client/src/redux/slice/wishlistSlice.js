import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {
    getWishlist: (state, action) => {
      state.data = action.payload;
    },

    addToWishlist: (state, action) => {
      const existingProduct = state.data.find(
        (item) => item._id === action.payload._id
      );
      if (!existingProduct) {
        state.data.push(action.payload);
      }
    },

    removeFromWishlist: (state, action) => {
      state.data = state.data.filter(
        (item) => item._id !== action.payload
      );
    },

    clearWishlist: (state) => {
      state.data = [];
    },
  },
});

export const { getWishlist, addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
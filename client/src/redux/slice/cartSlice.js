import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const cartSlice = createSlice({
  name: "card",
  initialState: initialState,
  reducers: {
    getCartUser: (state, action) => {
      state.data = action.payload;
    },

    // deleteCard: (state, action) => {
    //   const listData = state.data.filter(
    //     (item) => item.id !== action.payload.id
    //   );
    //   if (listData) {
    //     state.data = listData;
    //   }
    // },
    increate: (state, action) => {
      const checkIndex = state.data.findIndex(
        (item) => item._id === action.payload._id
      );
      if (checkIndex !== -1) {
        state.data[checkIndex].quantity = action.payload.quantity + 1;
      }
    },
    decreate: (state, action) => {
      const checkIndex = state.data.findIndex(
        (item) => item._id === action.payload._id
      );
      if (checkIndex !== -1) {
        state.data[checkIndex].quantity = action.payload.quantity - 1;
      }
    },
    clearCart: (state, action) => {
      state.data = [];
    },
  },
});

export const { deleteCard, increate, decreate, clearCart, getCartUser } =
  cartSlice.actions;
export default cartSlice.reducer;

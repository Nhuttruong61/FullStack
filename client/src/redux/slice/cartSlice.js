import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const cartSlice = createSlice({
  name: "card",
  initialState: initialState,
  reducers: {
    addCard: (state, action) => {
      const checkIndex = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (checkIndex !== -1) {
        state.data[checkIndex] = action.payload;
      } else {
        state.data.push(action.payload);
      }
    },
    deleteCard: (state, action) => {
      const listData = state.data.filter(
        (item) => item.id !== action.payload.id
      );
      if (listData) {
        state.data = listData;
      }
    },
    increate: (state, action) => {
      const checkIndex = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (checkIndex !== -1) {
        console.log(action.payload);
        state.data[checkIndex].quality = action.payload.quality + 1;
      }
    },
    decreate: (state, action) => {
      const checkIndex = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (checkIndex !== -1) {
        console.log(action.payload);
        state.data[checkIndex].quality = action.payload.quality - 1;
      }
    },
    clearCart: (state, action) => {
      state.data = [];
    },
  },
});

export const { addCard, deleteCard, increate, decreate, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

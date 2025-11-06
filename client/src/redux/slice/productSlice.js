import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProduct } from "../../api/product";

const initialState = {
  data: null,
  isLoading: true,
  totalProducts: 0,
  currentPage: 1,
  totalPages: 1,
  filters: {
    page: 1,
    limit: 10,
    name: "",
    category: "",
    minPrice: undefined,
    maxPrice: undefined,
  },
};

export const fetchProduct = createAsyncThunk(
  "product/fetch",
  async (filters = {}) => {
    const res = await getProduct(filters);
    return {
      products: res.products,
      totalProducts: res.totalProducts,
      currentPage: res.currentPage,
      totalPages: res.totalPages,
    };
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.data = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.data = null;
        state.isLoading = false;
      });
  },
});

export const { setFilters, resetFilters } = productSlice.actions;
export default productSlice.reducer;

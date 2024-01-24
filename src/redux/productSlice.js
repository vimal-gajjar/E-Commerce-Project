import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: { products: [] },
  reducers: {
    STORE_PRODUCTS(state, action) {
      state.products = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { STORE_PRODUCTS } = productSlice.actions;
export const selectproducts = (state) => state.product.products;

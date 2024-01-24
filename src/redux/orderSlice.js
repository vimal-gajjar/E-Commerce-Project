import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: { orders: [] },
  reducers: {
    STORE_ORDERS(state, action) {
      state.orders = action.payload;
    },
  },
});

export default orderSlice.reducer;
export const { STORE_ORDERS } = orderSlice.actions;
export const selectorders = (state) => state.order.orders;

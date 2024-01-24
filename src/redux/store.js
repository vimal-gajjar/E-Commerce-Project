import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";
import sliderSlice from "./sliderSlice";
import cartSlice from "./cartSlice";
import checkoutSlice from "./checkoutSlice";
import userSlice from "./userSlice";
import orderSlice from "./orderSlice";
import filterSlice from "./filterSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    product: productSlice,
    slider: sliderSlice,
    cart: cartSlice,
    checkout: checkoutSlice,
    user: userSlice,
    order: orderSlice,
    filter: filterSlice,
  },
});

export default store;

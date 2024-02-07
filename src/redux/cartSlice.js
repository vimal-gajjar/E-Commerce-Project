import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "../style/cart.css";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    totalAmount: localStorage.getItem("total")
      ? localStorage.getItem("total")
      : 0,
    previousURL: "",
  },
  reducers: {
    add_to_cart(state, action) {
      let itemIndex = state.cartItems.findIndex(
        (item) => item.id == action.payload.id
      );
      if (itemIndex == -1) {
        state.cartItems.push({ ...action.payload, cartQty: 1 });
      } else {
        if (state.cartItems[itemIndex].cartQty < action.payload.stock) {
          state.cartItems[itemIndex].cartQty += 1;
        } else {
          toast.info(`only ${action.payload.stock} stock is available`);
        }
      }
      window.scrollTo(0, 0);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decrease(state, action) {
      let itemIndex = state.cartItems.findIndex(
        (item) => item.id == action.payload.id
      );
      if (state.cartItems[itemIndex].cartQty > 1) {
        state.cartItems[itemIndex].cartQty -= 1;
      } else {
        state.cartItems[itemIndex].cartQty = 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    remove_from_cart(state, action) {
      state.cartItems.splice(action.payload, 1);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    empty_cart(state, action) {
      state.cartItems = [];
      state.totalAmount = 0;
      localStorage.removeItem("cartItems");
      localStorage.removeItem("total");
    },
    calculate_total(state, action) {
      let total = state.cartItems.reduce((prev, item) => {
        return (prev += item.price * item.cartQty);
      }, 0);
      state.totalAmount = total;
      localStorage.setItem("total", state.totalAmount);
    },
    saveURL(state, action) {
      state.previousURL = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const {
  add_to_cart,
  decrease,
  remove_from_cart,
  empty_cart,
  calculate_total,
  saveURL,
} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalAmount = (state) => state.cart.totalAmount;
export const selectURL = (state) => state.cart.previousURL;

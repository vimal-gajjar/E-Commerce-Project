import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems, selectTotalAmount } from "../redux/cartSlice";

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectTotalAmount);
  return (
    <div>
      <div class="card">
        <div class="card-header bg-warning text-dark">
          <h4 className="newH1">Order Summary</h4>
        </div>
        <div class="card-body">
          {cartItems.map((cart, i) => (
            <div className="card mb-1 p-2">
              <h4>Product Name: {cart.name}</h4>
              <p className="m-0">Price: Rs.{cart.price}</p>
              <span>Quantity: {cart.cartQty}</span>
            </div>
          ))}

          <div class="mt-3">
            <h5>Total: Rs.{total}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;

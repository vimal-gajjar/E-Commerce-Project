import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <div className="container col-6 mt-4 p-3">
      <h2 className="newH1">Thank you for your order</h2>
      <hr />
      <Link type="button" to="/" className="btn btn-secondary">
        Shop Now
      </Link>
    </div>
  );
};

export default CheckoutSuccess;

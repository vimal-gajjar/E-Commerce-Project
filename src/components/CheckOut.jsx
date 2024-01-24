import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../pages/CheckoutForm";
import { useSelector } from "react-redux";
import { selectCartItems, selectTotalAmount } from "../redux/cartSlice";
import { selectCheckout } from "../redux/checkoutSlice";

const stripePromise = loadStripe(
  "pk_test_51ORXzoSJw2K8vE8VT4OWBJ5BDJgTQI8physI21WoxTZp9l71fZBchvFqmIgyHOAlh0K4RW9qgTpb3U9OhwIuBB6m003rXjSWiZ"
);

const CheckOut = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("Initializing Checkouts....!!!");


  const cartItems = useSelector(selectCartItems);
  // console.log(cartItems);
  const total = useSelector(selectTotalAmount);
  // console.log(total);
  const shippingAdd = useSelector(selectCheckout);
  // console.log(shippingAdd);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:1012/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        amount: total,
        shipping: shippingAdd,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => {
        setMessage("Something Went Wrong...!!!");
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="container mt-5">
      {!clientSecret && <h1>{message}</h1>}
      {clientSecret && (
        <Elements options={options} key={clientSecret} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default CheckOut;

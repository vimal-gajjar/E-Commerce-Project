import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserEmail,
  selectUserId,
  selectUserName,
} from "../redux/authSlice";
import {
  empty_cart,
  selectCartItems,
  selectTotalAmount,
} from "../redux/cartSlice";
import { selectCheckout, selectcheckouts } from "../redux/checkoutSlice";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { database } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import CheckoutSummary from "../components/CheckoutSummary";
import { selectproducts } from "../redux/productSlice";

let CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  let userEmail = useSelector(selectUserEmail);
  let userId = useSelector(selectUserId);
  let cartItems = useSelector(selectCartItems);
  let products = useSelector(selectproducts);
  let filterPro = cartItems.map((item) =>
    products.find((product) => product.id == item.id)
  );
  // console.log(cartItems);
  // console.log(filterPro);

  let cartQuantity = cartItems.map((cart) => cart.cartQty);
  let newStock = filterPro.map((item) => item.stock);
  let updatedStock = newStock.map((stock, index) => {
    return stock - cartQuantity[index];
  });
  // console.log(updatedStock);
  // console.log(cartQuantity);
  // console.log(newStock);

  let totalAmount = useSelector(selectTotalAmount);
  let shippingAddress = useSelector(selectCheckout);
  let username = useSelector(selectUserName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let saveorder = () => {
    let today = new Date();
    let orderDate = today.toLocaleDateString();
    let orderTime = today.toLocaleTimeString();
    let orderConfig = {
      userEmail,
      userId,
      cartItems,
      totalAmount,
      shippingAddress,
      orderDate,
      orderTime,
      orderStatus: "Order Placed",
      createdAt: Timestamp.now().toDate(),
    };
    try {
      let docRef = collection(database, "orders");
      addDoc(docRef, orderConfig);
      dispatch(empty_cart());

      // For updating the stock based on quantity
      filterPro.forEach(async (item, i) => {
        const proId = item.id;
        const docRef = doc(database, "products", proId);
        await setDoc(docRef, { ...item, stock: updatedStock[i] });
      });

      // for mail send using emailjs to the users
      emailjs
        .send(
          "service_g0ea6u9",
          "template_g1o4sss",
          {
            user_email: orderConfig.userEmail,
            user_name: username,
            order_status: orderConfig.orderStatus,
            amount: orderConfig.totalAmount,
          },
          "8ZPGnmWsGq57x0Jqi"
        )
        .then(
          () => {
            toast.success("order placed");
            navigate("/checkoutsuccess");
          },
          (error) => {
            console.log(error.text);
          }
        );
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setMessage(null);
    setIsLoading(true);
    const confirmpayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/checkoutsuccess",
        },
        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status == "succeeded") {
            setIsLoading(false);
            toast.success("payment success");
            saveorder();
          }
        }
      });
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="row mt-5 mb-5 p-2">
      <div className="col-6">
        <CheckoutSummary />
      </div>
      <div className="col-6">
        <div className="card">
          <div className="card-header bg-info text-dark">
            <h4 className="newH1">Stripe Checkout</h4>
          </div>
          {/* <hr /> */}
          <div className="card-body">
            <form id="payment-form" onSubmit={handleSubmit}>
              <PaymentElement
                id="payment-element"
                options={paymentElementOptions}
              />
              <div class="d-grid gap-2 mt-3">
                <button
                  disabled={isLoading || !stripe || !elements}
                  id="submit"
                  className="btn btn-primary"
                >
                  <span id="button-text">
                    {isLoading ? (
                      <div class="spinner-border text-warning" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Pay now"
                    )}
                  </span>
                </button>
              </div>

              {/* Show any error or success messages */}
              {message && <div id="payment-message">{message}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutForm;

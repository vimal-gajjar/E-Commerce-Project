import { Timestamp, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { database } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { useSelector } from "react-redux";
import { selectUserName } from "../redux/authSlice";

const ChangeOrderStatus = ({ id, orderStatus, order }) => {
  const [status, setStatus] = useState(orderStatus);
  const navigate = useNavigate();
  const username = useSelector(selectUserName);
  let handleSubmit = (e) => {
    e.preventDefault();
    const orderInfo = {
      userEmail: order.userEmail,
      userId: order.userId,
      cartItems: order.cartItems,
      totalAmount: order.totalAmount,
      shippingAddress: order.shippingAddress,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderStatus: status,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toMillis(),
    };
    try {
      setDoc(doc(database, "orders", id), orderInfo);
      emailjs
        .send(
          "service_g0ea6u9",
          "template_g1o4sss",
          {
            user_email: orderInfo.userEmail,
            user_name: username,
            order_status: orderInfo.orderStatus,
            amount: orderInfo.totalAmount,
          },
          "8ZPGnmWsGq57x0Jqi"
        )
        .then(
          () => {
            toast.success("order status updated");
            navigate("/admin/vieworders");
          },
          (error) => {
            console.log(error.text);
          }
        );
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div>
      <h1 className="newH1">Change Order Status</h1>
      <form onSubmit={handleSubmit}>
        <div class="col-4 mb-3">
          <select
            class="form-select"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Order Placed</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delievered</option>
            <option>Canceled</option>
          </select>
          <button type="submit" className="btn btn-info mt-3">
            Update Status
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeOrderStatus;

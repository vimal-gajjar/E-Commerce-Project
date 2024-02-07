import React, { useEffect } from "react";
import useFetchCollection from "../customhooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { STORE_ORDERS, selectorders } from "../redux/orderSlice";
import { selectUserId } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../pages/Loader";

const Orders = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [data]);
  const userID = useSelector(selectUserId);
  const allorders = useSelector(selectorders);

  let handleOrder = (id) => {
    navigate(`/admin/order-details/${id}`);
  };
  return (
    <div className="mt-4">
      {isLoading && <Loader />}
      <h1>All Orders</h1>
      <hr />
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>User Email</th>
              <th>Order Date</th>
              <th>Order ID</th>
              <th>Order Amount</th>
              <th>Order Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {allorders.length == 0 && (
              <tr>
                <td colSpan={7}>No Orders Found</td>
              </tr>
            )}
            {allorders.map((order, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{order.userEmail}</td>
                <td>
                  {order.orderDate} at {order.orderTime}
                </td>
                <td>{order.id}</td>
                <td>Rs. {order.totalAmount}</td>
                <td>{order.orderStatus}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleOrder(order.id)}
                    class="btn btn-primary"
                    disabled={order.orderStatus == "Order Placed" ? "true" : ""}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

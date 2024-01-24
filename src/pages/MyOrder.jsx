import React, { useEffect } from "react";
import useFetchCollection from "../customhooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { STORE_ORDERS, selectorders } from "../redux/orderSlice";
import { selectUserId } from "../redux/authSlice";
import { Link } from "react-router-dom";
import EmptyOrder from "../assets/Shopping Options.gif";

const MyOrder = () => {
  const { data } = useFetchCollection("orders");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [data]);
  const userID = useSelector(selectUserId);
  const allorders = useSelector(selectorders);
  const myorders = allorders.filter((item) => item.userId == userID);

  return (
    <div className="container mt-4">
      {allorders.length == 0 ? (
        <>
          <div className="img-fluid text-center">
            <img src={EmptyOrder} alt="Empty Cart Image" />
            <h1 className="mb-4 newH1">No orders Found</h1>
            <Link type="button" className="btn btn-info" to="/">
              Shop Now
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="newH1">My Orders</h1>
          <hr />
          <div class="table-responsive">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Order Date</th>
                  <th>Order ID</th>
                  <th>Order Amount</th>
                  <th>Order Status</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {myorders.map((order, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      {order.orderDate} at {order.orderTime}
                    </td>
                    <td>{order.id}</td>
                    <td>Rs. {order.totalAmount}</td>
                    <td>{order.orderStatus}</td>
                    <td>
                      <Link
                        type="button"
                        class="btn btn-primary"
                        to={`/myorder-details/${order.id}`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrder;

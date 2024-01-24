import React, { useEffect, useState } from "react";
import useFetchDocument from "../customhooks/useFetchDocument";
import { Link, useParams } from "react-router-dom";
import Loader from "../pages/Loader";

const MyOrderDetails = () => {
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (document !== null) {
      setOrder(document);
    }
  }, [document]);

  return (
    <>
      {order == null ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="container mt-4">
          <h1 className="newH1">Order Details</h1>
          <hr />
          <Link type="button" class="btn btn-primary" to="/myorders">
            Back to orders
          </Link>

          <div className="mt-2">
            <h2>Order Status: "{order.orderStatus}"</h2>
            <h5 className="mt-4 text-secondary">Shipping Address</h5>
            <h6 className="m-0">
              Address:
              {order.shippingAddress.add1} {order.shippingAddress.add2}
            </h6>
            <h6 className="m-0">City: {order.shippingAddress.city}</h6>
            <h6 className="m-0">State: {order.shippingAddress.state}</h6>
            <h6>Country: {order.shippingAddress.country}</h6>
          </div>

          <div class="table-responsive mt-4">
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Product Name</th>
                  <th>Product Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <img src={item.imageURL} height={50} />
                    </td>
                    <td>Rs. {item.price}</td>
                    <td>{item.cartQty}</td>
                    <td>Rs. {order.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default MyOrderDetails;

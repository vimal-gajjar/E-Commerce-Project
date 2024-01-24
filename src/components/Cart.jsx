import React, { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  add_to_cart,
  calculate_total,
  decrease,
  empty_cart,
  remove_from_cart,
  saveURL,
  selectCartItems,
  selectTotalAmount,
} from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/authSlice";
import EmptyCart from "../assets/empty-cart-3613108-3020773.webp";
import { PiCurrencyInrBold } from "react-icons/pi";

const Cart = () => {
  const cartItem = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(calculate_total());
  }, [cartItem]);

  let url = window.location.href;
  let handleCheckout = () => {
    if (LoggedIn) {
      navigate("/checkout-details");
    } else {
      dispatch(saveURL(url));
      navigate("/login");
    }
  };
  return (
    <div className="container mt-5 p-4">
      {cartItem.length == 0 ? (
        <>
          <div className="img-fluid text-center">
            <img src={EmptyCart} alt="Empty Cart Image" />
            <h1 className="mb-4 newH1">Your Cart is Empty</h1>
            <Link type="button" className="btn btn-info" to="/">
              Shop Now
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="newH1">Cart Page</h1>
          <hr />
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItem.map((c, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{c.name}</td>
                    <td>
                      <img src={c.imageURL} height={50} />
                    </td>
                    <td>{c.price}</td>
                    <td>
                      <div className="btns-main">
                        <button
                          className="cart-btn"
                          onClick={() => dispatch(decrease(c))}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="cart-qty"
                          value={c.cartQty}
                        />
                        <button
                          className="cart-btn"
                          onClick={() => dispatch(add_to_cart(c))}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{c.price * c.cartQty}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => dispatch(remove_from_cart(index))}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row p-3">
            <div className="col-8">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => dispatch(empty_cart())}
              >
                Empty Cart
              </button>
            </div>
            <div className="col-4">
              <div className="card p-3">
                <h2>
                  Total{" "}
                  <span className="float-end">
                    <PiCurrencyInrBold /> {totalAmount}
                  </span>
                </h2>
                <hr />
                <div className="d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

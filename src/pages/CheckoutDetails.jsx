import React, { useEffect, useState } from "react";
import CheckoutSummary from "../components/CheckoutSummary";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import { store_checkout } from "../redux/checkoutSlice";
import { useNavigate } from "react-router-dom";

const CheckoutDetails = () => {
  let initialState = {
    name: "",
    number: "",
    add1: "",
    add2: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  };
  let navigate = useNavigate();
  let [shippingAdd, setShippingAdd] = useState(initialState);
  let dispatch = useDispatch();

  let handleAdd = (e) => {
    setShippingAdd({ ...shippingAdd, [e.target.name]: e.target.value });
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(store_checkout(shippingAdd));
    sessionStorage.setItem("shippingAddress", JSON.stringify(shippingAdd));
    navigate("/checkout");
  };
  return (
    <div class="container mt-4 shadow p-4">
      <h1 className="newH1">Checkout Details</h1>
      <hr />
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-info text-white">
              <h4>Shipping Address</h4>
            </div>
            <div class="card-body">
              <form onSubmit={handleSubmit}>
                <div class="form-group mb-2">
                  <label>Recipient Name</label>
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    placeholder="Enter Your Name"
                    value={shippingAdd.name}
                    onChange={handleAdd}
                  />
                </div>
                <div class="form-group mb-2">
                  <label>Mobile Number</label>
                  <input
                    type="number"
                    name="number"
                    class="form-control"
                    placeholder="Mobile No."
                    value={shippingAdd.number}
                    onChange={handleAdd}
                  />
                </div>
                <div className="row">
                  <div class="form-group mb-2 col-6">
                    <label>Address 1</label>
                    <input
                      type="text"
                      name="add1"
                      class="form-control"
                      placeholder="Line 1"
                      value={shippingAdd.line1}
                      onChange={handleAdd}
                    />
                  </div>
                  <div class="form-group mb-2 col-6">
                    <label>Address 2</label>
                    <input
                      type="text"
                      name="add2"
                      class="form-control"
                      placeholder="Line 2"
                      value={shippingAdd.line2}
                      onChange={handleAdd}
                    />
                  </div>
                </div>

                <div className="row">
                  <div class="form-group mb-2 col-6">
                    <label>City</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="City"
                      name="city"
                      value={shippingAdd.city}
                      onChange={handleAdd}
                    />
                  </div>
                  <div class="form-group mb-2 col-6">
                    <label>State</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="State"
                      name="state"
                      value={shippingAdd.state}
                      onChange={handleAdd}
                    />
                  </div>
                </div>

                <div class="form-group mb-2">
                  <label>Country</label>
                  <CountryDropdown
                    classes="form-select"
                    value={shippingAdd.country}
                    onChange={(val) =>
                      setShippingAdd({ ...shippingAdd, country: val })
                    }
                  />
                </div>
                <div class="form-group mb-2">
                  <label>Pin Code</label>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="123456"
                    name="pincode"
                    value={shippingAdd.pincode}
                    onChange={handleAdd}
                  />
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                  Complete Purchase
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;

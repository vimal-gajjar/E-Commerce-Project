import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectproducts } from "../redux/productSlice";
import { useParams } from "react-router-dom";
import {
  add_to_cart,
  decrease,
  increase,
  selectCartItems,
} from "../redux/cartSlice";
import { FaCheck } from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";
import { toast } from "react-toastify";
import ReactImageMagnify from "react-image-magnify";
import { PiCurrencyInrBold } from "react-icons/pi";
import Footer from "../pages/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const products = useSelector(selectproducts);
  const product = products.find((item) => item.id == id);

  const cartitems = useSelector(selectCartItems);
  const cartProduct = cartitems.find((item) => item.id == id);
  const cartProductIndex = cartitems.findIndex((item) => item.id == id);

  return (
    <>
      <div className="container mt-5">
        <h1 className="newH1">Product Details</h1>
        <hr />
        <div className="row pb-5">
          <div className="col-md-6">
            {/* <ReactImageMagnify
              {...{
                smallImage: {
                  alt: product.name,
                  isFluidWidth: true,
                  src: product.imageURL,
                },
                largeImage: {
                  src: product.imageURL,
                  width: 1850,
                  height: 1700,
                },
              }}
            /> */}
            <img
            src={product.imageURL}
            alt="product-image"
            className="img-fluid"
          />
          </div>
          <div className="col-md-6 pro-detail">
            <div className="row">
              <div className="col-md-10">
                <h2>{product.name}</h2>
              </div>
              <div className="col-md-2">
                {product.stock > 0 ? (
                  <span className="badge rounded-pill text-bg-success mb-2 stock-badge">
                    <FaCheck /> In stock
                  </span>
                ) : (
                  <span className="badge rounded-pill text-bg-danger mb-2 stock-badge">
                    <GiCrossMark /> Out of stock
                  </span>
                )}
              </div>
            </div>
            <h4 className="mb-4">
              <PiCurrencyInrBold /> {product.price}.00
            </h4>
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>

            {/* {product.stock > 0 ? (
              <span className="badge rounded-pill text-bg-success mb-2 stock-badge">
                <FaCheck /> In stock
              </span>
            ) : (
              <span className="badge rounded-pill text-bg-danger mb-2 stock-badge">
                <GiCrossMark /> Out of stock
              </span>
            )} */}

            {product.stock > 0 && (
              <p>
                <strong>Availabel:</strong> {product.stock}
              </p>
            )}

            <p className="m-0">
              <strong>Description:</strong>
            </p>
            <p>{product.description}</p>

            <div className="mb-2">
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  if (product.stock > 0) {
                    dispatch(add_to_cart(product));
                  } else {
                    toast.info(`${product.name} is out of stock`);
                  }
                }}
              >
                Add to Cart
              </button>
            </div>

            {cartProductIndex != -1 && (
              <div className="btns-main">
                <button
                  className="cart-btn"
                  onClick={() => dispatch(decrease(cartProduct))}
                >
                  -
                </button>
                <input
                  type="text"
                  value={cartProduct.cartQty}
                  className="cart-qty"
                />
                <button
                  className="cart-btn"
                  onClick={() => dispatch(increase(cartProduct))}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;

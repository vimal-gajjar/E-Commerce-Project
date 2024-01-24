import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectproducts } from "../redux/productSlice";
import { useParams } from "react-router-dom";
import { add_to_cart, decrease, selectCartItems } from "../redux/cartSlice";
import { FaCheck } from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";
import { toast } from "react-toastify";
import ReactImageMagnify from "react-image-magnify";
import RatingStars from "./RatingStars";
import Loader from "../pages/Loader";
import useFetchCollection from "../customhooks/useFetchCollection";
import { PiCurrencyInrBold } from "react-icons/pi";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(selectproducts);

  const { IsLoading } = useFetchCollection("products");

  const product = products.find((item) => item.id == id);

  const cartitems = useSelector(selectCartItems);
  const cartProduct = cartitems.find((item) => item.id == id);
  const cartProductIndex = cartitems.findIndex((item) => item.id == id);
  return (
    <div className="container mt-5">
      {IsLoading && <Loader />}
      <h1 className="newH1">Product Details</h1>
      <hr />
      <div className="row">
        <div className="col-6">
          <ReactImageMagnify
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
          />
          {/* <img
            src={product.imageURL}
            alt="product-image"
            className="img-fluid"
          /> */}
        </div>
        <div className="col-6">
          <h2>{product.name}</h2>
          <h4 className="mb-4"><PiCurrencyInrBold /> {product.price}.00</h4>
          <p>Brand: {product.brand}</p>

          {product.stock > 0 ? (
            <span className="badge rounded-pill text-bg-success mb-2">
              <FaCheck /> In stock
            </span>
          ) : (
            <span className="badge rounded-pill text-bg-danger mb-2">
              <GiCrossMark /> Out of stock
            </span>
          )}

          {product.stock > 0 && <p>Availabel: {product.stock}</p>}
          <p className="m-0">Description:</p>
          <p>{product.description}</p>

          <p className="mb-1">Ratings</p>
          <RatingStars />

          {cartProductIndex == -1 ? (
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
          ) : (
            <div className="btns-main">
              <button className="cart-btn" onClick={() => dispatch(decrease(cartProduct))}>-</button>
              <input
                type="text"
                value={cartProduct.cartQty}
                className="cart-qty"
              />
              <button className="cart-btn" onClick={() => dispatch(add_to_cart(cartProduct))}>
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

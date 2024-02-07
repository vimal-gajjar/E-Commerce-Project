import React from "react";
import { useDispatch } from "react-redux";
import { add_to_cart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PiCurrencyInrBold } from "react-icons/pi";
import { GoPlus } from "react-icons/go";
import "../style/Product.css";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  let handleCart = () => {
    if (product.stock > 0) {
      dispatch(add_to_cart(product));
      toast.success("Product Added To Cart");
    } else {
      toast.info(`${product.name} is out of stock`);
    }
  };
  return (
    <>
      <div className="col-3 mb-3">
        <div className="card">
          <Link to={`/productdetail/${product.id}`}>
            <img
              className="card-img-top"
              src={product.imageURL}
              alt={product.name}
              height={180}
            />
          </Link>

          <div className="card-body">
            <h4 className="card-title">{product.name}</h4>
            <p className="card-text">
              <strong> Price:</strong> <PiCurrencyInrBold /> {product.price}
            </p>

            <button type="button" className="btn add-btn" onClick={handleCart}>
              Add <GoPlus />
            </button>
            {/* <Link
              to={`/productdetail/${product.id}`}
              className="btn btn-success"
            >
              View
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;

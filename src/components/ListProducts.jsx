import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import useFetchCollection from "../customhooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { filter_by_category, filter_by_price } from "../redux/filterSlice";
import { selectproducts } from "../redux/productSlice";
import { selectCategories, store_categories } from "../redux/categorySlice";
import Loader from "../pages/Loader";

const ListProducts = ({ products }) => {
  const { data, IsLoading } = useFetchCollection("categories");
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [category, setCategory] = useState("");
  const allProducts = useSelector(selectproducts);

  const [price, setPrice] = useState(1000);

  useEffect(() => {
    dispatch(filter_by_category({ allProducts, category }));
  }, [category]);

  useEffect(() => {
    dispatch(store_categories(data));
  }, [data]);

  useEffect(() => {
    dispatch(filter_by_price({ allProducts, price }));
  }, [price]);

  let handleCategory = (e) => {
    setCategory(e.target.value);
    dispatch(filter_by_category({ allProducts, category }));
  };

  return (
    <>
      {products.length == 0 && <h1>No product found</h1>}
      {IsLoading && <Loader />}
      <div className="row">
        {/* <div className="col-md-2">
          <h3>Filters</h3>
          <hr />
          <div className="mb-3">
            <label className="form-label">Categories</label>
            <select
              className="form-select"
              name="category"
              value={category}
              onChange={handleCategory}
            >
              {categories.map((cat, i) => (
                <option key={i}>{cat.title}</option>
              ))}
            </select>

            <div className="mb-3 mt-2">
              <label className="form-label">Filter by Price</label>
              <input
                type="range"
                className="form-range"
                name="price"
                aria-describedby="helpId"
                min={0}
                max={10000}
                step={1000}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <p>Rs.{price}</p>
            </div>
          </div>
        </div> */}
        {products.map((product, i) => {
          return <ProductItem key={product.id} product={product} />;
        })}
      </div>
    </>
  );
};

export default ListProducts;

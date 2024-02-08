import React, { useEffect, useState } from "react";
import ListProducts from "./ListProducts";
import useFetchCollection from "../customhooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectproducts } from "../redux/productSlice";
import {
  filter_by_category,
  filter_by_price,
  selectFilter,
} from "../redux/filterSlice";
import Pagination from "./Pagination";
import { selectCategories, store_categories } from "../redux/categorySlice";

const Products = () => {
  let { data } = useFetchCollection("products");
  let product = useSelector(selectproducts);
  let filterdProduct = useSelector(selectFilter);
  let dispatch = useDispatch();

  let [currentPage, setCurrentPage] = useState(1);
  let [postPerPage, setPostperPage] = useState(8);

  useEffect(() => {
    dispatch(STORE_PRODUCTS(data));
  }, [data]);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentProducts = product.slice(firstPostIndex, lastPostIndex);
  // const { data, IsLoading } = useFetchCollection("categories");
  const categories = useSelector(selectCategories);
  const [category, setCategory] = useState("");
  const allProducts = useSelector(selectproducts);

  const [price, setPrice] = useState(1000);

  useEffect(() => {
    dispatch(filter_by_category({ allProducts, category }));
  }, [category]);

  // useEffect(() => {
  //   dispatch(store_categories(data));
  // }, [data]);

  useEffect(() => {
    dispatch(filter_by_price({ allProducts, price }));
  }, [price]);

  let handleCategory = (e) => {
    setCategory(e.target.value);
    dispatch(filter_by_category({ allProducts, category }));
  };
  // let editproduct = [];
  return (
    <>
      <div className="container mt-3 mb-3">
        <h1 className="newH1">Products</h1>
        <hr />
        <div className="row">
          <div className="col-md-2">
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
          </div>
          <div className="col-md-10">
            {filterdProduct.length == 0 ? (
              <>
                <ListProducts products={currentProducts} />
                <Pagination
                  totalPosts={product.length}
                  postPerPage={postPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </>
            ) : (
              <>
                <ListProducts products={filterdProduct} />
                {filterdProduct.length > postPerPage ?? (
                  <Pagination
                    totalPosts={filterdProduct.length}
                    postPerPage={postPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;

import React, { useEffect, useState } from "react";
import ListProducts from "./ListProducts";
import useFetchCollection from "../customhooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectproducts } from "../redux/productSlice";
import {
  filter_by_category,
  filter_by_price,
  selectFilter,
  selectcategory,
  selectprice,
  selectsearchvalue,
} from "../redux/filterSlice";
import Pagination from "./Pagination";
import { selectCategories, store_categories } from "../redux/categorySlice";
import Footer from "../pages/Footer";

const Products = () => {
  let { data } = useFetchCollection("products");
  let product = useSelector(selectproducts);
  let filterdProduct = useSelector(selectFilter);
  let dispatch = useDispatch();

  let [currentPage, setCurrentPage] = useState(1);
  let [postPerPage, setPostperPage] = useState(8);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    dispatch(STORE_PRODUCTS(data));
  }, [data]);

  // Pagination products
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentProducts = product.slice(firstPostIndex, lastPostIndex);

  // Category from redux
  const category1 = useFetchCollection("categories");
  useEffect(() => {
    dispatch(store_categories(category1.data));
  }, [category1.data]);
  const categories = useSelector(selectCategories);
  const [category, setCategory] = useState("");
  const allProducts = useSelector(selectproducts);

  const [price, setPrice] = useState(500);
  const searchvalue = useSelector(selectsearchvalue);
  const pricevalue = useSelector(selectprice);
  const categoryvalue = useSelector(selectcategory);

  let handleCategory = (e) => {
    setCategory(e.target.value);
  };
  useEffect(() => {
    if (!initialRender) {
      dispatch(filter_by_category({ allProducts, category }));
    }
  }, [category, initialRender]);

  let handlePrice = (e) => {
    setPrice(e.target.value);
  };
  useEffect(() => {
    if (!initialRender) {
      dispatch(filter_by_price({ allProducts, price }));
    } else {
      setInitialRender(false);
    }
  }, [price, initialRender]);

  return (
    <>
      <div className="container mt-5 mb-5">
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
                  <option key={i} value={cat.title}>
                    {cat.title}
                  </option>
                ))}
              </select>

              <div className="mb-3 mt-2">
                <label className="form-label">Filter by Price</label>
                <input
                  type="range"
                  className="form-range"
                  name="price"
                  aria-describedby="helpId"
                  min={500}
                  max={10000}
                  step={500}
                  value={price}
                  onChange={handlePrice}
                />
                <p>Rs.{price}</p>
              </div>
            </div>
          </div>
          <div className="col-md-10">
            {searchvalue != "" || pricevalue != 0 || categoryvalue != "" ? (
              <>
                {filterdProduct.length == 0 ? (
                  <h1>No Product Found</h1>
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
              </>
            ) : (
              <>
                <ListProducts products={currentProducts} />
                <Pagination
                  totalPosts={allProducts.length}
                  postPerPage={postPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;

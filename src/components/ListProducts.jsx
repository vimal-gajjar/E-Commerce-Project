import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import useFetchCollection from "../customhooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { filter_by_category, filter_by_price } from "../redux/filterSlice";
import { selectproducts } from "../redux/productSlice";
import { selectCategories, store_categories } from "../redux/categorySlice";
import Loader from "../pages/Loader";

const ListProducts = ({ products }) => {
  const { IsLoading } = useFetchCollection("categories");
  return (
    <>
      {products.length == 0 && <h1>No product found</h1>}
      {IsLoading && <Loader />}
      <div className="row">
        {products.map((product, i) => {
          return <ProductItem key={product.id} product={product} />;
        })}
      </div>
    </>
  );
};

export default ListProducts;

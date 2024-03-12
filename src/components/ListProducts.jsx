import React from "react";
import ProductItem from "./ProductItem";
import useFetchCollection from "../customhooks/useFetchCollection";
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

import React, { useEffect, useState } from "react";
import ListProducts from "./ListProducts";
import useFetchCollection from "../customhooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectproducts } from "../redux/productSlice";
import { selectFilter } from "../redux/filterSlice";
import Pagination from "./Pagination";

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

  return (
    <>
      <div className="container mt-3">
        <h1 className="newH1">Products</h1>
        <hr />
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
    </>
  );
};

export default Products;

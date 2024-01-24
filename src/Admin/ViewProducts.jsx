import React, { useEffect, useState } from "react";
import { FaPenFancy, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { STORE_PRODUCTS, selectproducts } from "../redux/productSlice";
import useFetchCollection from "../customhooks/useFetchCollection";
import { toast } from "react-toastify";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { database, storage } from "../firebase/config";
import { deleteObject, ref } from "firebase/storage";

const ViewProducts = () => {
  let { data } = useFetchCollection("products");
  let product = useSelector(selectproducts);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(STORE_PRODUCTS(data));
  }, [data]);

  let handleDelete = async (id, imgURL) => {
    if (window.confirm("Are you sure ??")) {
      try {
        await deleteObject(ref(storage, imgURL));
        const docref = doc(database, "products", id);
        await deleteDoc(docref);
        toast.success("Product deleted");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  return (
    <div className="container-fluid shadow">
      <h1>View Products</h1>
      <hr />
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>ID</th>
              <th>Category</th>
              <th>Product name</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Image</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {product.length == 0 && (
              <tr>
                <td colSpan={8}>No Product Found</td>
              </tr>
            )}
            {product.map((product, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{product.id}</td>
                <td>{product.category}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.brand}</td>
                <td>
                  <img src={product.imageURL} width={50} height={50} />
                </td>
                <td>{product.stock}</td>
                <td>
                  <Link
                    type="button"
                    className="btn btn-success me-1"
                    to={`/admin/editproducts/${product.id}`}
                  >
                    <FaPenFancy />
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(product.id, product.imageURL)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewProducts;

import { Timestamp, addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { database } from "../firebase/config";
import { toast } from "react-toastify";

const AddCategory = () => {
  let [category, setCategory] = useState({ title: "", desc: "" });
  let navigate = useNavigate();
  let handleSubmit = async (e) => {
    e.preventDefault();
    const docref = collection(database, "categories");
    try {
      await addDoc(docref, {
        ...category,
        createdAt: Timestamp.now().toMillis(),
      });
      toast.success("Category Added SuccessFully");
      navigate("/admin/viewcategories");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div>
      <h1>
        Add Category
        <Link
          type="button"
          className="btn btn-warning float-end"
          to="/admin/viewcategories"
        >
          View Category
        </Link>
      </h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder=""
            aria-describedby="helpId"
            value={category.title}
            onChange={(e) =>
              setCategory({ ...category, title: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="desc"
            rows="3"
            style={{ resize: "none" }}
            value={category.desc}
            onChange={(e) => setCategory({ ...category, desc: e.target.value })}
          >
            {category.desc}
          </textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;

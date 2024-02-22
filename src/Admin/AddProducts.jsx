import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectCategories, store_categories } from "../redux/categorySlice";
import { GiCrossMark } from "react-icons/gi";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { database, storage } from "../firebase/config";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { selectproducts } from "../redux/productSlice";
import useFetchCollection from "../customhooks/useFetchCollection";

const AddProducts = () => {
  let { id } = useParams();
  let categories = useSelector(selectCategories);
  let products = useSelector(selectproducts);
  let { data } = useFetchCollection("categories");
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(store_categories(data));
  }, [data]);

  let obj = {
    category: "",
    name: "",
    price: "",
    brand: "",
    stock: "",
    imageURL: "",
    description: "",
  };
  let [product, setProduct] = useState({ ...obj });
  let [progress, setProgress] = useState(0);
  let redirect = useNavigate();
  let productEdit = products.find((item) => item.id == id);
  let [productImages, setProductImages] = useState([]);
  let [newImages, setNewImages] = useState([]);

  let handleproduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  //image add function
  let handleImage = (e) => {
    let file = e.target.files;
    let arr = [];
    Array.from(file).forEach((file) => {
      const storageref = ref(storage, `project-images-multiple/${Date.now()}`);
      const uploadtask = uploadBytesResumable(storageref, file);
      uploadtask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (err) => {
          toast.error(err.message);
        },
        () => {
          getDownloadURL(uploadtask.snapshot.ref)
            .then((url) => {
              arr.push(url);
              setNewImages((prevImages) => [...prevImages, url]);
            })
            .catch((err) => {
              toast.error(err.message);
            });
        }
      );
    });
    setProduct({ ...product, imageURL: arr });
    // setProduct({
    //   ...product,
    //   imageURL: `/src/assets/${e.target.files[0].name}`,
    // });
  };

  let handleDelete = async (index, imageURL) => {
    try {
      let updatedImage = [...productImages];
      updatedImage.splice(index, 1);
      setProductImages(updatedImage);
      await deleteObject(ref(storage, imageURL));
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    if (id) {
      setProduct({ ...productEdit });
      setProductImages(productEdit.imageURL || []);
    } else {
      setProduct(obj);
    }
  }, [id]);

  // add or edit product function
  let handlesubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      addDoc(collection(database, "products"), {
        ...product,
        createdAt: Timestamp.now().toMillis(),
      });
      toast.success("product added");
      redirect("/admin/viewproducts");
    } else {
      // if (product.imageURL != productEdit.imageURL) {
      //   await deleteObject(ref(storage, productEdit.imageURL))
      //     .then(() => {
      //       toast.success("old image delete successfully");
      //     })
      //     .catch((err) => {
      //       toast.error(err.message);
      //     });
      // }
      const updatedURL = [...productImages, ...newImages];
      await setDoc(doc(database, "products", id), {
        ...product,
        imageURL: updatedURL,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toMillis(),
      });
      toast.success("product updated");
      redirect("/admin/viewproducts");
    }
  };
  return (
    <div className="container-fluid p-3">
      <h1>{id ? "Edit" : "Add"} Products</h1>
      <hr />
      <form onSubmit={handlesubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="category"
            className="form-select"
            onChange={handleproduct}
            value={product.category}
          >
            <option selected disabled value="">
              -------Choose One--------
            </option>
            {categories.map((cat, i) => {
              return <option key={i}>{cat.title}</option>;
            })}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter Product Name"
            value={product.name}
            onChange={handleproduct}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            placeholder="Enter Price"
            value={product.price}
            onChange={handleproduct}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input
            type="text"
            name="brand"
            className="form-control"
            placeholder="Enter Brand"
            value={product.brand}
            onChange={handleproduct}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            name="stock"
            className="form-control"
            placeholder="Quantity"
            value={product.stock}
            onChange={handleproduct}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            multiple
            name="imageURL"
            className="form-control"
            placeholder="Select Image"
            onChange={handleImage}
          />
        </div>

        
        {/* progress bar div */}
        {progress != 0 && (
          <div
            className="progress mb-2"
            role="progressbar"
            aria-label="Success example"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="progress-bar bg-success"
              style={{ width: `${progress}%` }}
            >
              {progress < 100
                ? `Uploading ${progress}%`
                : `Image Uploaded ${progress}%`}
            </div>
          </div>
        )}
        {id && (
          <>
            {productImages.map((image, i) => (
              <>
                <img
                  src={image}
                  height="60px"
                  width="60px"
                  style={{ marginRight: "5px", border: "1px solid #000" }}
                />
                <a
                  type="button"
                  className="text-danget me-2"
                  style={{ position: "relative", top: "-30px", left: "-3px" }}
                  onClick={() => handleDelete(i, image)}
                >
                  <GiCrossMark />
                </a>
              </>
            ))}
          </>
        )}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            cols="30"
            rows="5"
            value={product.description}
            onChange={handleproduct}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddProducts;

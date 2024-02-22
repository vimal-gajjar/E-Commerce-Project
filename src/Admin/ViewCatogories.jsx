import { deleteDoc, doc } from "firebase/firestore";
import React, { useEffect } from "react";
import { database } from "../firebase/config";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import useFetchCollection from "../customhooks/useFetchCollection";
import Loader from "../pages/Loader";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories, store_categories } from "../redux/categorySlice";

const ViewCatogories = () => {
  const { data, IsLoading } = useFetchCollection("categories");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(store_categories(data));
  }, [data]);

  let categories = useSelector(selectCategories);
  // let [category, setCategory] = useState([]);
  // useEffect(() => {
  //   getData();
  // }, []);

  // let getData = async () => {
  //   await getDocs(collection(database, "categories")).then((docSnap) => {
  //     const newData = docSnap.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setCategory(newData);
  //   });
  // };

  let handleDelete = (id) => {
    try {
      let docref = doc(database, "categories", id);
      deleteDoc(docref);
      toast.success("Category Deleted..!!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="p-3">
      <div className="table-responsive">
        {IsLoading && <Loader />}
        <h1>All Category</h1>
        <hr />
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length == 0 && (
              <tr>
                <td colSpan={4}>No Categories Found</td>
              </tr>
            )}
            {categories.map((cat, i) => (
              <tr key={i}>
                <td>{cat.id}</td>
                <td>{cat.title}</td>
                <td>{cat.desc}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(cat.id)}
                  >
                    <FaTrashAlt />
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

export default ViewCatogories;

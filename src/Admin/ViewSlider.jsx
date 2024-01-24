import React, { useEffect } from "react";
import useFetchCollection from "../customhooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { Add_slider, selectslider } from "../redux/sliderSlice";
import { FaTrashAlt } from "react-icons/fa";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { database, storage } from "../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";

const ViewSlider = () => {
  let { data } = useFetchCollection("sliders");
  let slider = useSelector(selectslider);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(Add_slider(data));
  }, [data]);

  let handleDelete = async (id, imageURL) => {
    if (window.confirm("Are you sure ??")) {
      try {
        if (imageURL != null) {
          const imgdoc = ref(storage, imageURL);
          await deleteObject(imgdoc);
        }
        const docref = doc(database, "sliders", id);
        await deleteDoc(docref);
        toast.success("Slider deleted");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  return (
    <div>
      <h1>All Sliders</h1>
      <hr />
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {slider.length == 0 && (
              <tr>
                <td colSpan={4}>No Sliders Found</td>
              </tr>
            )}
            {slider.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.desc}</td>
                <td>
                  <img src={item.imageURL} width={50} height={50} />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id, item.imageURL)}
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

export default ViewSlider;

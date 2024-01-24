import { Timestamp, addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { database, storage } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";

const AddSlider = () => {
  let initialstate = { title: "", desc: "", imageURL: "", status: "" };
  let [slider, setSlider] = useState(initialstate);
  let navigate = useNavigate();
  let handleSlider = (e) => {
    setSlider({ ...slider, [e.target.name]: e.target.value });
  };

  let handleImage = (e) => {
    // setSlider({ ...slider, image: `/src/assets/${e.target.files[0].name}` });
    let file = e.target.files[0];
    const storageref = ref(storage, `/slider-images/${Date.now()}`);
    const uploadtask = uploadBytesResumable(storageref, file);
    uploadtask.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        toast.error(err.message);
      },
      () => {
        getDownloadURL(uploadtask.snapshot.ref).then((url) => {
          console.log(url);
          setSlider({ ...slider, imageURL: url });
        });
      }
    );
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(database, "sliders"), {
        ...slider,
        createdAt: Timestamp.now().toMillis(),
      });
      navigate("/admin/viewsliders");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div>
      <h1>Add Sliders</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={slider.title}
            onChange={handleSlider}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            name="desc"
            className="form-control"
            value={slider.desc}
            onChange={handleSlider}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            name="imageURL"
            className="form-control"
            onChange={handleImage}
          />
        </div>
        <div className="mb-3">
          Status{" "}
          <input
            type="checkbox"
            name="status"
            value="active"
            onChange={handleSlider}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddSlider;

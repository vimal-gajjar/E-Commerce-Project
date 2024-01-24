import React from "react";
import loader from "../assets/Ellipsis-2.1s-400px.gif";
import "./loader.css";
import ReactDOM from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={loader} alt="loader..!!" />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;

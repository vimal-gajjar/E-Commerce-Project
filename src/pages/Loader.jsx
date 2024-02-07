import React from "react";
import loader from "../assets/Ellipsis-2.1s-400px.gif";
import "./loader.css";
import ReactDOM from "react-dom";
import Lottie from "lottie-react";
import animationData from '../assets/Animation - 1707300599338.json'

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        {/* <img src={loader} alt="loader..!!" /> */}
        <Lottie animationData={animationData}/>
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;

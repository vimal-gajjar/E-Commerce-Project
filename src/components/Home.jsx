import React from "react";
import Slider from "./Slider";
import Products from "./Products";

const Home = () => {
  return (
    <div>
      <Slider />
      <div className="container mt-4">
        <Products />
      </div>
    </div>
  );
};

export default Home;

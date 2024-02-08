import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/team-animation.json";

const AdminHome = () => {
  return (
    <div>
      <div className="text-center admin-home">
        <Lottie animationData={animationData} />
      </div>
    </div>
  );
};

export default AdminHome;

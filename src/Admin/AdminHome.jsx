import React from "react";
import AdminGif from "../assets/Creative Team.gif";

const AdminHome = () => {
  return (
    <div>
      <div className="text-center">
        <img src={AdminGif} alt="" width={1000} style={{ marginTop: "-12%" }} />
      </div>
    </div>
  );
};

export default AdminHome;

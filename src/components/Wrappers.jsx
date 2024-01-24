import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserRole } from "../redux/authSlice";
import { Navigate } from "react-router-dom";

export const ShowOnlogin = ({ children }) => {
  const IsloggedIn = useSelector(selectIsLoggedIn);
  if (IsloggedIn) {
    return children;
  } else {
    return null;
  }
};

export const ShowOnlogout = ({ children }) => {
  const IsloggedIn = useSelector(selectIsLoggedIn);
  if (IsloggedIn == false) {
    return children;
  } else {
    return null;
  }
};

export const AdminProtected = ({ children }) => {
  const IsloggedIn = useSelector(selectIsLoggedIn);
  const role = useSelector(selectUserRole);
  if (IsloggedIn && role == "admin") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

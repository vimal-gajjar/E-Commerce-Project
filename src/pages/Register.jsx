import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, database } from "../firebase/config";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import "../style/Register.css";

const Register = () => {
  let initialstate = {
    username: "",
    email: "",
    password: "",
    cpassword: "",
    role: "user",
  };
  let [user, setUser] = useState({ ...initialstate });
  let [IsLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let handleuser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  let handlesubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(async (userCredential) => {
        const user1 = userCredential.user;
        const docref = doc(database, "users", user1.uid);
        await setDoc(docref, {
          ...user,
          createdAt: Timestamp.now().toMillis(),
        });

        setIsLoading(false);
        toast.success("Registered successfully");
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <div className="register-bg">
      {IsLoading && <Loader />}
      <h1 className="newH1 text-center">Register Page</h1>
      <div className="row justify-content-center">
        <div className="col-md-4 form-box">
          <form onSubmit={handlesubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter Your Name"
                value={user.username}
                onChange={handleuser}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email ID</label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Enter Your Email"
                value={user.email}
                onChange={handleuser}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter Password"
                value={user.password}
                onChange={handleuser}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="cpassword"
                className="form-control"
                placeholder="Confirm Password"
                value={user.cpassword}
                onChange={handleuser}
              />
            </div>
            <div className="reg-btn-main">
              <button type="submit" className="btn reg-btn">
                Register
              </button>
            </div>
          </form>
          <div className="alredy-login">
            <p>Already have an account ??</p>
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

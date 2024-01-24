import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, database } from "../firebase/config";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectURL } from "../redux/cartSlice";
import "../style/Login.css";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [IsLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let PrevURL = useSelector(selectURL);

  let checkOut = () => {
    if (PrevURL.includes("cart")) {
      navigate("/cart");
    } else {
      navigate("/");
    }
  };

  let handlesubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const docref = doc(database, "users", user.uid);
        const snapshot = await getDoc(docref);
        const role = snapshot.data().role;

        if (role == "admin") {
          setIsLoading(false);
          toast.success("Logged in successfully");
          navigate("/admin");
        } else if (role == "user") {
          setIsLoading(false);
          toast.success("Logged in successfully");
          checkOut();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  const provider = new GoogleAuthProvider();
  let handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const docref = doc(database, "users", user.uid);
        await setDoc(docref, {
          username: user.displayName,
          email: user.email,
          createdAt: Timestamp.now().toMillis(),
        });

        toast.success("Loggedin successfully");
        checkOut();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="login-container">
      {IsLoading && <Loader />}
      <h1 className="newH1 text-center">Login Page</h1>
      <div className="row justify-content-center">
        <div className="col-3">
          <form onSubmit={handlesubmit} noValidate>
            <div className="mb-4">
              <label className="form-label">Email ID</label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-main">
              <button type="submit" className="btn login-btn">
                Login
              </button>
            </div>
            <p className="btns-seperator">OR</p>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn login-ggl-btn"
                onClick={handleGoogle}
              >
                Login with Google
              </button>
            </div>
          </form>
          <div className="for-reg">
            <p>Create an account ??</p>
            <Link to="/register">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { database } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { Store_users, selectUsers } from "../redux/userSlice";
import useFetchCollection from "../customhooks/useFetchCollection";

const AddUsers = () => {
  let { id } = useParams();
  let obj = { username: "", email: "", password: "", cpassword: "", role: "" };
  let [user, setuser] = useState(obj);
  let redirect = useNavigate();
  let users = useSelector(selectUsers);
  const UserData = users.find((item) => item.id == id);
  const [showPassword, setShowPassword] = useState(false);

  const handleVisible = () => {
    setShowPassword(!showPassword);
  };

  let handleuser = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (id) {
      setuser(UserData);
    } else {
      setuser(obj);
    }
  }, [id]);

  let handleData = async (e) => {
    e.preventDefault();
    if (!id) {
      try {
        let docRef = collection(database, "users");
        await addDoc(docRef, {
          ...user,
          createdAt: Timestamp.now().toMillis(),
        });
        toast.success("user added");
        redirect("/admin/view-users");
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      try {
        let docRef = doc(database, "users", id);
        await setDoc(docRef, {
          ...user,
          createdAt: user.createdAt,
          editedAt: Timestamp.now().toMillis(),
        });
        toast.success("user Upadated");
        redirect("/admin/view-users");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div>
      <h1>{id ? "Edit" : "Add"} Users</h1>
      <hr />
      <form onSubmit={handleData}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Enter Name"
            onChange={handleuser}
            value={user.username}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter Email-Address"
            onChange={handleuser}
            value={user.email}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type={showPassword ? "password" : "text"}
            name="password"
            className="form-control"
            placeholder="Enter Password"
            onChange={handleuser}
            value={user.password}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleVisible}
          >
            {showPassword ? "Show" : "Hide"}
          </button>
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            name="cpassword"
            className="form-control"
            placeholder="Confirm Password"
            onChange={handleuser}
            value={user.cpassword}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Select Role</label>
          <select
            className="form-control"
            name="role"
            onChange={handleuser}
            value={user.role}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>

        <button type="Submit" className="btn btn-primary">
          {id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddUsers;

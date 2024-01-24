import { deleteDoc, doc, getDocs } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
import { FaPenAlt, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { database } from "../firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
// import { Store_users } from "../redux/userSlice";
import useFetchCollection from "../customhooks/useFetchCollection";
import { useEffect } from "react";
import { Store_users, selectUsers } from "../redux/userSlice";

const ViewUsers = () => {
  let dispatch=useDispatch()
  const { data } = useFetchCollection("users");
  let users=useSelector(selectUsers)
  useEffect(()=>{
    dispatch(Store_users(data))
  },[data])
  ;
  let handledelete = async (id) => {
    if (window.confirm("Are you sure ??")) {
      let docRef = doc(database, "users", id);
      await deleteDoc(docRef);
      toast.success("User deleted");
      window.location.reload();
    }
  };
  let table = (
    <div>
      <h1>All Users</h1>
      <hr />
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length == 0 && (
              <tr>
                <td colSpan={4}>No Users Found</td>
              </tr>
            )}
            {users.map((user, i) => (
              <tr>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Link
                    type="button"
                    class="btn btn-primary me-2"
                    to={`/admin/editusers/${user.id}`}
                  >
                    <FaPenAlt />
                  </Link>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handledelete(user.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  return table;
};

export default ViewUsers;

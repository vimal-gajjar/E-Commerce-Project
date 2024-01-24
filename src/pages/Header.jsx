import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowAltCircleLeft,
  FaLock,
  FaPenNib,
  FaSearch,
  FaShoppingCart,
} from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, database } from "../firebase/config";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { loginuser, logoutuser, selectUserName } from "../redux/authSlice";
import { ShowOnlogin, ShowOnlogout } from "../components/Wrappers";
import { selectCartItems } from "../redux/cartSlice";
import { filter_by_search } from "../redux/filterSlice";
import useFetchCollection from "../customhooks/useFetchCollection";
import { STORE_PRODUCTS, selectproducts } from "../redux/productSlice";

const Header = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let username = useSelector(selectUserName);
  let cartItems = useSelector(selectCartItems);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const docref = doc(database, "users", uid);
        const snapshot = await getDoc(docref);
        // console.log(snapshot);
        let obj = {
          userEmail: snapshot.data().email,
          userName: snapshot.data().username,
          userId: uid,
          userRole: snapshot.data().role,
        };
        dispatch(loginuser(obj));
      } else {
        dispatch(logoutuser());
      }
    });
  }, []);

  let handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("logged out successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  let [search, setSearch] = useState("");
  let { data } = useFetchCollection("products");
  let products = useSelector(selectproducts);
  useEffect(() => {
    dispatch(STORE_PRODUCTS(data));
  }, [data]);

  let handleSearch = (e) => {
    e.preventDefault();
    dispatch(filter_by_search({ products, search }));
  };

  useEffect(() => {
    dispatch(filter_by_search({ products, search }));
  }, [search]);
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/products"
                  aria-current="page"
                >
                  Products
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav mt-2 mt-lg-0">
              <ShowOnlogout>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="/login"
                    aria-current="page"
                  >
                    <FaLock /> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="/register"
                    aria-current="page"
                  >
                    <FaPenNib /> Register
                  </Link>
                </li>
              </ShowOnlogout>

              <form className="d-flex" role="search">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="btn btn-success"
                    type="submit"
                    onClick={handleSearch}
                  >
                    <FaSearch />
                  </button>
                </div>
              </form>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/cart"
                  aria-current="page"
                >
                  <FaShoppingCart size={25} />
                  <span
                    className="badge rounded-pill text-bg-warning"
                    style={{ position: "relative", top: "-10px" }}
                  >
                    {cartItems.length}
                  </span>
                </Link>
              </li>
              <ShowOnlogin>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="/myorders"
                    aria-current="page"
                  >
                    My orders
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="#" aria-current="page">
                    Welcome {username}
                  </a>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link active"
                    aria-current="page"
                    onClick={handleLogout}
                  >
                    <FaArrowAltCircleLeft /> LogOut
                  </button>
                </li>
              </ShowOnlogin>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;

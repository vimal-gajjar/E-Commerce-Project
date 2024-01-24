import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  const [activeLink, setActiveLink] = useState("/admin/adminhome");

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div>
      <h1 className="mb-4">Admin Dashboard</h1>
      <hr />
      <div className="row me-auto">
        <div className="col-2">
          <ul className="nav nav-pills flex-column mb-auto text-center">
            <li className="nav-item ">
              <Link
                to="/admin/adminhome"
                className={`nav-link ${
                  activeLink === "/admin/adminhome"
                    ? "bg-primary text-light"
                    : ""
                }`}
                onClick={() => handleLinkClick("/admin/adminhome")}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/addproducts"
                className={`nav-link ${
                  activeLink === "/admin/addproducts"
                    ? "bg-primary text-light"
                    : ""
                }`}
                onClick={() => handleLinkClick("/admin/addproducts")}
              >
                Add Products
              </Link>
            </li>
            <li>
              <Link
                to="/admin/viewproducts"
                className={`nav-link ${
                  activeLink === "/admin/viewproducts"
                    ? "bg-primary text-light"
                    : ""
                }`}
                onClick={() => handleLinkClick("/admin/viewproducts")}
              >
                View Products
              </Link>
            </li>
            <li>
              <li>
                <Link
                  to="/admin/vieworders"
                  className={`nav-link ${
                    activeLink === "/admin/vieworders"
                      ? "bg-primary text-light"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("/admin/vieworders")}
                >
                  View Orders
                </Link>
              </li>
              <Link
                to="/admin/addcategory"
                className={`nav-link ${
                  activeLink === "/admin/addcategory"
                    ? "bg-primary text-light"
                    : ""
                }`}
                onClick={() => handleLinkClick("/admin/addcategory")}
              >
                Add Category
              </Link>
            </li>
            <li>
              <Link
                to="/admin/viewcategories"
                className={`nav-link ${
                  activeLink === "/admin/viewcategories"
                    ? "bg-primary text-light"
                    : ""
                }`}
                onClick={() => handleLinkClick("/admin/viewcategories")}
              >
                View Categories
              </Link>
            </li>
            <li>
              <Link
                to="/admin/addsliders"
                className={`nav-link ${
                  activeLink === "/admin/addsliders"
                    ? "bg-primary text-light"
                    : ""
                }`}
                onClick={() => handleLinkClick("/admin/addsliders")}
              >
                Add Slider
              </Link>
            </li>
            <li>
              <Link
                to="/admin/viewsliders"
                className={`nav-link ${
                  activeLink === "/admin/viewsliders"
                    ? "bg-primary text-light"
                    : ""
                }`}
                onClick={() => handleLinkClick("/admin/viewsliders")}
              >
                View Slider
              </Link>
            </li>
            <li>
              <Link
                to="/admin/addusers"
                className={`nav-link ${
                  activeLink === "/admin/addusers"
                    ? "bg-primary text-light"
                    : ""
                }`}
                onClick={() => handleLinkClick("/admin/addusers")}
              >
                Add Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/view-users"
                className={`nav-link ${
                  activeLink === "/admin/view-users"
                    ? "bg-primary text-light"
                    : ""
                }`}
                onClick={() => handleLinkClick("/admin/view-users")}
              >
                View Users
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;

import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-white shadow-sm"
        style={{ color: "#3a3d40" }}
      >
        <div className="container-fluid">
          <div
            className="navbar-brand text-tertiary fs-3 d-none d-md-block"
            style={{ color: "#3a3d40" }}
          >
            <span style={{ color: "#0da308" }}>Admin</span>Panel
          </div>
          <div className="d-flex justify-content-between">
            <div className="ms-2">
              <div className="nav-link fs-5 mt-3 active">
                {/* FIX 1: Point to the admin index route */}
                <Link
                  to="/admin"
                  style={{ color: "#3a3d40", textDecoration: "none" }}
                >
                  Home
                </Link>
              </div>
            </div>
            <div className="ms-3">
              <div className="nav-link fs-5 mt-3 active">
                {/* FIX 2: Add "/admin/" prefix */}
                <Link
                  to="/admin/products"
                  style={{ color: "#3a3d40", textDecoration: "none" }}
                >
                  Products
                </Link>
              </div>
            </div>
            <div>
              <div className="ms-3 fs-5 mt-3 nav-link">
                {/* FIX 3: Add "/admin/" prefix */}
                <Link
                  to="/admin/orders"
                  style={{ color: "#3a3d40", textDecoration: "none" }}
                >
                  Orders
                </Link>
              </div>
            </div>
          </div>

          <div className=" ">
            <div className="dropdown ">
              <button
                className="btn  me-5 fs-2 "
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                style={{ color: "#3a3d40" }}
              >
                <BsFillPersonFill />
              </button>
              <ul
                className={`dropdown-menu  ${isOpen ? "show" : ""} `}
                style={{ right: 0, left: "auto" }}
              >
                <li>
                  <div
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    {/* FIX 4: Add "/admin/" prefix */}
                    <Link className="dropdown-item " to="/admin/register">
                      Add Admin
                    </Link>
                  </div>
                </li>
                {/* NOTE: This link goes to a User page, which is fine! */}
                <li>
                  <div
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <Link className="dropdown-item" to="/accounts">
                      My Account
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
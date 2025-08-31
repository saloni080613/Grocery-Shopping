import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { PiShoppingCartBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from 'react';


export default function Navbar() {
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
            FreshMart
          </div>
          <div className="d-flex justify-content-between">
            <div className="ms-2">
              <div className="nav-link fs-5 mt-3 active">
                <Link
                  to="/"
                  style={{ color: "#3a3d40", textDecoration: "none" }}
                >
                  home
                </Link>
              </div>
            </div>
            <div>
              <div className="ms-3 fs-5 mt-3 nav-link">
                <Link
                  to="/Order"
                  style={{ color: "#3a3d40", textDecoration: "none" }}
                >
                  orders
                </Link>
              </div>
            </div>
          </div>
          <div className="nav-icons d-flex me-3">
            <div className="ms-3 fs-2 mt-2 ">
              <Link to="/Search" style={{ color: "#3a3d40" }}>
                <IoSearch />
              </Link>
            </div>

                  <div className=" ">
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle ms-2 fs-2 "
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  style={{ color: "#3a3d40" }}
                >
                  <BsFillPersonFill />
                </button>
                <ul className={`dropdown-menu   ${isOpen ? 'show' : ''}`}>
                  <li onClick={() => {setIsOpen(false)}}>
                    <Link className="dropdown-item " to="/Login" >
                      Login
                    </Link>
                  </li>
                  <li onClick={() => {setIsOpen(false)}}>
                    <Link className="dropdown-item" to="/SignUp">
                      Sign Up
                    </Link>
                  </li >
                  <li onClick={() => {setIsOpen(false)}} >
                    <Link className="dropdown-item" to="/Account">
                      My Account
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
             <div className="ms-3 mt-2 fs-2">
              <Link to="/Cart" style={{ color: "#3a3d40" }}>
                <PiShoppingCartBold />
              </Link>
            </div>

          </div>
        </div>
      </nav>
    </div>
  );
}

import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { PiShoppingCartBold } from "react-icons/pi";
import { IoHeart, IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  // const [userState, setuserState] = useState(true);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("UserState:", userState);
   
  // };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-white shadow-sm nav-underline"
        style={{ color: "#3a3d40" }}
      >
        <div className="container-fluid">
          {/* Left hamburger for small screens */}
          <button
            className="btn d-inline d-md-none me-2"
            type="button"
            aria-label="Open menu"
            onClick={() => setNavOpen(true)}
            style={{ color: "#3a3d40", fontSize: 26 }}
          >
            <IoMenu />
          </button>
          <div
            className="navbar-brand text-tertiary fs-3 d-none d-md-block"
            style={{ color: "#3a3d40" }}
          >
            Fresh<span style={{ color: "#0da308" }}>Mart</span>
          </div>
          {/* Main nav links - hidden on small screens */}
          <div className="d-none d-md-flex justify-content-between">
            <div className="ms-2">
              <div className="nav-link fs-5 mt-3 ">
                <Link
                  to="/"
                  style={{ color: "#3a3d40", textDecoration: "none" }}
                >
                  Home
                </Link>
              </div>
            </div>
            <div>
              <div className="ms-3 fs-5 mt-3 nav-link">
                <Link
                  to="/OrderTrack"
                  style={{ color: "#3a3d40", textDecoration: "none" }}
                >
                  Orders
                </Link>
              </div>
            </div>
            <div className="ms-3">
              <div className="nav-link fs-5 mt-3 ">
                <Link
                  to="/Services"
                  style={{ color: "#3a3d40", textDecoration: "none" }}
                >
                  Services
                </Link>
              </div>
            </div>
            <div className="ms-3">
              <div className="nav-link fs-5 mt-3 ">
                <Link
                  to="/AboutUs"
                  style={{ color: "#3a3d40", textDecoration: "none" }}
                >
                  About us
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
                  className="btn  ms-2 fs-2 "
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  style={{ color: "#3a3d40" }}
                >
                  <BsFillPersonFill />
                </button>
                <ul className={`dropdown-menu   ${isOpen ? "show" : ""}`}>
                  {/* {userState && (
                    <li
                      onClick={() => {
                        setIsOpen(false);
                        setuserState(false);
                      
                      }}
                    >
                      <Link className="dropdown-item " to="/Login">
                        Log out
                      </Link>
                    </li>
                  )} */}
                  
                    <>
                      <li
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        <Link className="dropdown-item " to="/Login">
                          Login
                        </Link>
                      </li>
                      <li
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        <Link className="dropdown-item" to="/SignUp">
                          Sign Up
                        </Link>
                      </li>
                    </>
                 
                  <li
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <Link className="dropdown-item" to="/Account">
                      My Account
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="ms-3 mt-2 fs-2">
              <Link to="/Wishlist" style={{ color: "#3a3d40" }}>
                <IoHeart />
              </Link>
            </div>
            <div className="ms-3 mt-2 fs-2">
              <Link to="/Cart" style={{ color: "#3a3d40" }}>
                <PiShoppingCartBold />
              </Link>
            </div>

          </div>
        </div>
      </nav>

      {/* Slide-in drawer for small screens */}
      {navOpen && (
        <div
          role="presentation"
          onClick={() => setNavOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 1040
          }}
        />
      )}
      <aside
        aria-label="Mobile navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: 260,
          background: "#fff",
          boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
          transform: navOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 200ms ease-in-out",
          zIndex: 1041,
          padding: 16
        }}
        className="d-md-none"
      >
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="fs-3" style={{ color: "#3a3d40" }}>
            Fresh<span style={{ color: "#0da308" }}>Mart</span>
          </div>
          <button
            className="btn"
            aria-label="Close menu"
            onClick={() => setNavOpen(false)}
            style={{ color: "#3a3d40", fontSize: 24 }}
          >
            <IoClose />
          </button>
        </div>

        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
            <li>
              <Link
                to="/"
                className="nav-link"
                style={{ color: "#3a3d40" }}
                onClick={() => setNavOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/OrderTrack"
                className="nav-link"
                style={{ color: "#3a3d40" }}
                onClick={() => setNavOpen(false)}
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/Services"
                className="nav-link"
                style={{ color: "#3a3d40" }}
                onClick={() => setNavOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/AboutUs"
                className="nav-link"
                style={{ color: "#3a3d40" }}
                onClick={() => setNavOpen(false)}
              >
                About us
              </Link>
            </li>
            
          </ul>
        </nav>
      </aside>
    </div>
    
  );
}

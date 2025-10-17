
import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
    const [isOpen, setIsOpen] = useState(false);
  // { const [isOpen, setIsOpen] = useState(false);
  //       const [userState, setuserState] = useState(true);
      
  //       const handleSubmit = (e) => {
  //         e.preventDefault();
  //         console.log("UserState:", userState);
         
  //       };
  //      }
       
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
                      <Link
                        to="/AdminHome"
                        style={{ color: "#3a3d40", textDecoration: "none" }}
                      >
                        Home
                      </Link>
                    </div>
                  </div>
                  <div className="ms-3">
                    <div className="nav-link fs-5 mt-3 active">
                      <Link
                        to="/AdminProducts"
                        style={{ color: "#3a3d40", textDecoration: "none" }}
                      >
                        Products
                      </Link>
                    </div>
                  </div>
                  <div>
                    <div className="ms-3 fs-5 mt-3 nav-link">
                      <Link
                        to="/AdminOrders"
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
                      <ul className={`dropdown-menu  ${isOpen ? "show" : ""} `} style={{ right: 0, left: 'auto' }}>
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
                              <Link className="dropdown-item " to="/AdminRegister">
                                Add Admin
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
              </div>
            </nav>
          </div>
          
    
  )
}

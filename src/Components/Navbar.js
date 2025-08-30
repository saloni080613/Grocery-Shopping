import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { PiShoppingCartBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import {Link} from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-white shadow-sm" style={{color: "#3a3d40"}}>
        <div className="container-fluid ">
          <div className="navbar-brand text-tertiary" style={{color: "#3a3d40"}}>FreshMart</div>
          <div className="d-flex justify-content-between">
            <div className="ms-3" >
              <div className="nav-link active" >
                <Link to="/" style={{color: "#3a3d40",textDecoration:"none"}}>
                home
                </Link>
              </div>
            </div>
            <div  >
              <div className="nav-link" >
                <Link to ="/Order"  style={{color: "#3a3d40",textDecoration:"none"}}>
                orders
                </Link>
              </div>
            </div>
          </div>
          <div className="nav-icons d-flex" >
            <div className="ms-3 fs-2">
              <Link to="/Search" style={{color: "#3a3d40"}}>
                  <IoSearch />
                </Link>
             
            </div>
            <div className="ms-3 fs-2">
              <Link to="/Cart" style={{color: "#3a3d40"}}>
                   <PiShoppingCartBold />
                </Link>
             
            </div>
            <div className=" fs-2">
              <Link to="/Profile" style={{color: "#3a3d40"}}>
                   <BsFillPersonFill />
                </Link>
             
            </div>
        </div> 
       </div>
      </nav>
    </div>
  );
}

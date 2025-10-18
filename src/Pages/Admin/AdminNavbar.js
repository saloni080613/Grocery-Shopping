import React, { useState, useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link, useSearchParams, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const adminId = searchParams.get('adminId');

  useEffect(() => {
    // Check if adminId exists in the URL to determine login state
    if (adminId) {
      setIsAdminLoggedIn(true);
    } else {
      setIsAdminLoggedIn(false);
    }
  }, [location.search, adminId]);

  const handleLogout = async () => {
    if (adminId) {
      try {
        const response = await fetch(`/api/admins/logout/${adminId}`, { method: 'PUT' });
        if (response.ok) {
          toast.success("Logged out successfully!");
          navigate('/');
        } else {
          const errorText = await response.text();
          toast.error(`Logout failed: ${errorText}`);
        }
      } catch (error) {
        toast.error("An error occurred during logout.");
      }
    }
  };

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
                  to={`/admin?adminId=${adminId}`}
                  style={{ color: "#3a3d40", textDecoration: "none" }}
                >
                  Home
                </Link>
              </div>
            </div>
            <div className="ms-3">
              <div className="nav-link fs-5 mt-3 active">
                
                <Link
                  to={`/admin/products?adminId=${adminId}`}
                  style={{ color: "#3a3d40", textDecoration: "none" }}
                >
                  Products
                </Link>
              </div>
            </div>
            <div>
              <div className="ms-3 fs-5 mt-3 nav-link">
                
                <Link
                  to={`/admin/orders?adminId=${adminId}`}
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
                {isAdminLoggedIn ? (
                  <>
                    <li>
                      <div onClick={() => setIsOpen(false)}>
                        <Link className="dropdown-item" to={`/admin/account?adminId=${adminId}`}>
                          My Account
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div onClick={() => setIsOpen(false)}>
                        <Link className="dropdown-item" to={`/admin/register?adminId=${adminId}`}>
                          Add Admin
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div
                        className="dropdown-item"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setIsOpen(false);
                          handleLogout();
                        }}
                      >
                        Log out
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <div onClick={() => setIsOpen(false)}>
                        <Link className="dropdown-item" to="/AdminLogin">
                          Login
                        </Link>
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userIs, setuserIs] = useState("Customer");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginRequest = {
      email: userName,
      password: password,
      role: userIs,
    };

    try {
      
      const response = await fetch('/api/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { userId } = responseData; // Correctly get userId from the response

        if (userIs === 'Customer') {
          navigate(`/?customerId=${userId}`);
        } else if (userIs === 'Admin') {
          navigate(`/admin?adminId=${userId}`);
        }
      } else {
        const errorText = await response.text();
        if (errorText === 'invalid credential') {
          toast.error('Invalid credentials. Please try again.');
        } else {
          toast.error(`Login failed: ${errorText}`);
        }
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row align-items-center " style={{ marginTop: "10vh" }}>
          <div className="col-md-5 d-none d-md-block">
            <img
              src="/login.png"
              alt="login"
              className="img-fluid"
              style={{ maxHeight: "400px" }}
            />
          </div>
          <div className="col-md-5 text-center shadow rounded-4 p-3">
            <form
              className="d-flex flex-column gap-2 m-4 "
              style={{ color: "#3a3d40" }}
              onSubmit={handleSubmit}
            >
              <label
                className="text-start fw-medium "
                style={{ color: "#646663" }}
                htmlfor="email"
              >
                Email*
              </label>
              <input
                style={{ border: "2px solid #9a9896ff", borderRadius: "6px" }}
                id="email"
                required
                value={userName}
                type="email"
                onChange={(e) => setuserName(e.target.value)}
              ></input>

              <label
                className="text-start fw-medium "
                style={{ color: "#646663" }}
                htmlfor="password"
              >
                Password*
              </label>
              <input
                style={{ border: "2px solid #9a9896ff", borderRadius: "6px" }}
                type="password"
                id="confirmPassword"
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              ></input>
              <button
                type="submit"
                className="btn w-50 mt-4 btn-success "
              >
                Login
              </button>
              <div className="dropend">
                <button
                  className="btn "
                  type="button"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Login as <span style={{ color: "#0da308" }}>{userIs}</span>
                </button>
                <ul className={`dropdown-menu ${isOpen ? "show" : ""}`} style={{ left: "50%", transform: "translateX(-50%)" }}>
                  <li
                    className="dropdown-item active"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Customer
                  </li>
                  <li
                    className="dropdown-item"
                    onClick={() => {
                      setIsOpen(false);
                      setuserIs("Admin");
                    }}
                  >
                    Admin
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";

export default function Login() {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
    const [userIs, setuserIs] = useState("customer");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", userName);
    console.log("Password:", password);
       console.log("UserIs:", userIs);
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
                htmlfor="userName"
              >
                Username*
              </label>
              <input
                style={{ border: "2px solid #9a9896ff", borderRadius: "6px" }}
                id="userName"
                required
                value={userName}
                type="text"
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
                Log in
              </button>
              <div className="dropend">
                <button
                  className="btn "
                  type="button"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Log in as <span style={{ color: "#0da308" }}>{userIs}</span>
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

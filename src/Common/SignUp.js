

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [password, setpassword] = useState("");
  const [C_password, setC_password] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== C_password) {
      setPasswordError("Passwords do not match.");
      return;
     
    }
    setPasswordError("");

    console.log("Username:", userName);
    console.log("Email:", email);
    console.log("Phone Number:", phoneNo);
    console.log("Password:", password);
    console.log("Confirm Password:", C_password);
    console.log("role : Customer");
  const registerRequest = {
      username: userName,
      email: email,
      mobileNo: phoneNo,
      password: password,
    };
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerRequest),
      });
if (response.ok) {
        const savedCustomer = await response.json();
        console.log('Registration successful:', savedCustomer);
        alert('Registration successful! You can now log in.');
        navigate('/Login');
      } else {
        const errorMessage = await response.text();
        console.error('Registration failed:', errorMessage);
        alert(`Registration Failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };

 

  return (
      <div className="container">
        <div className="row align-items-center " style={{ marginTop: "10vh" }}>
          <div className="col-md-5 d-none d-md-block ">
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
                htmlfor="email"
              >
                Email
              </label>
              <input
                style={{ border: "2px solid #9a9896ff", borderRadius: "6px" }}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              ></input>
              <label
                className="text-start fw-medium "
                style={{ color: "#646663" }}
                htmlfor="phoneNo"
              >
                Mobile No*
              </label>
              <input
                style={{ border: "2px solid #9a9896ff", borderRadius: "6px" }}
                type="tel"
                id="phoneNo"
                required
                value={phoneNo}
                onChange={(e) => setphoneNo(e.target.value)}
              ></input>
              <label
                className="text-start fw-medium "
                style={{ color: "#646663" }}
                htmlfor="password"
              >
                Create password*
              </label>
              <input
                style={{ border: "2px solid #9a9896ff", borderRadius: "6px" }}
                type="text"
                id="password"
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              ></input>
              <label
                className="text-start fw-medium "
                style={{ color: "#646663" }}
                htmlfor="password"
              >
                Confirm password*
              </label>
              <input
                style={{ border: "2px solid #9a9896ff", borderRadius: "6px" }}
                type="password"
                id="confirmPassword"
                required
                value={C_password}
                onChange={(e) => setC_password(e.target.value)}
              ></input>
              {passwordError && (
                <p
                  style={{ color: "red", fontSize: "0.8rem", marginTop: "5px" }}
                >
                  {passwordError}
                </p>
              )}
              <button type="submit" className="btn w-50 mt-4 btn-success ">
                Register Now
              </button>
              <div className="text-start text-small">
                already have an account?{" "}
                <Link to="/Login" style={{ color: "#0da308" }}>
                  login now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
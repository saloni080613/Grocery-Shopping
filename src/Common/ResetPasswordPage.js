// ResetPasswordPage.js (using fetch)
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from "react-icons/bs";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // 1. Get the token from the URL query string
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages
        setIsSuccess(null);

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        if (!token) {
            setMessage("Error: No reset token found. Please use the link from your email again.");
            setIsSuccess(false);
            return;
        }

        try {
            // 2. Call your Spring Boot API with token and new password
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                    newPassword: password
                }),
            });

            const data = await response.json();

            // Check for HTTP errors
            if (!response.ok) {
                setIsSuccess(false);
                throw new Error(data.message || "Failed to reset password.");
            }

            setIsSuccess(true);
            setMessage(data.message + " Redirecting to login...");
            
            // 3. Redirect to login after success
            setTimeout(() => navigate("/login"), 3000);

        } catch (error) {
            setIsSuccess(false);
            console.error("Error during password reset:", error);
            setMessage(error.message || "Error resetting password.");
        }
    };

    return (
        <div className="container">
            <div className="row align-items-center justify-content-center" style={{ marginTop: "15vh" }}>
                <div className="col-md-5 d-none d-md-block">
                    <img
                        src="/login.png"
                        alt="Reset Password"
                        className="img-fluid"
                        style={{ maxHeight: "400px" }}
                    />
                </div>
                <div className="col-md-5 text-center shadow rounded-4 p-4">
                    <h2 className="fw-bold mb-4" style={{ color: "#3a3d40" }}>Reset Your Password</h2>
                    <form
                        className="d-flex flex-column gap-3 m-4"
                        onSubmit={handleSubmit}
                    >
                        <label className="text-start fw-medium" style={{ color: "#646663" }} htmlFor="password">
                            New Password*
                        </label>
                        <div className="position-relative">
                            <input
                                style={{ border: "2px solid #9a9896ff", borderRadius: "6px", padding: "8px", width: "100%" }}
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                required
                            />
                            <span onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}>
                                {showPassword ? <BsEye /> : <BsEyeSlash />}
                            </span>
                        </div>

                        <label className="text-start fw-medium" style={{ color: "#646663" }} htmlFor="confirmPassword">
                            Confirm New Password*
                        </label>
                        <div className="position-relative">
                            <input
                                style={{ border: "2px solid #9a9896ff", borderRadius: "6px", padding: "8px", width: "100%" }}
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                required
                            />
                            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}>
                                {showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
                            </span>
                        </div>

                        <button type="submit" className="btn btn-success w-100 mt-3">
                            Reset Password
                        </button>
                    </form>
                    {message && <p className="mt-3" style={{ color: isSuccess ? 'green' : 'red' }}>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
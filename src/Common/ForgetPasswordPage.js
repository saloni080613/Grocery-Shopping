
import React, { useState } from 'react';

const ForgotPasswordPage = () => {
    const [emailId, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(null); // To track API call status

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages
        setIsSuccess(null); // Reset status on new submission
        
        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: emailId }), 
            });

            const data = await response.json();

            // fetch doesn't throw an error on bad HTTP status, so we check 'response.ok'
            if (!response.ok) {
                setIsSuccess(false);
                // Use the error message from the backend if available
                throw new Error(data.message || "Network response was not ok");
            }

            setIsSuccess(true);
            setMessage(data.message);

        } catch (error) {
            console.error("Error during forgot password request:", error);
            setMessage(error.message || "Error: Could not send request.");
            setIsSuccess(false);
        }
    };

    return (
        <div className="container">
            <div className="row align-items-center justify-content-center" style={{ marginTop: "15vh" }}>
                <div className="col-md-5 d-none d-md-block">
                    <img
                        src="/login.png"
                        alt="Forgot Password"
                        className="img-fluid"
                        style={{ maxHeight: "400px" }}
                    />
                </div>
                <div className="col-md-5 text-center shadow rounded-4 p-4">
                    <h2 className="fw-bold mb-4" style={{ color: "#3a3d40" }}>Forgot Password</h2>
                    <p style={{ color: "#646663" }}>Enter your email and we'll send you a link to reset your password.</p>
                    <form
                        className="d-flex flex-column gap-3 m-4"
                        onSubmit={handleSubmit}
                    >
                        <label
                            className="text-start fw-medium"
                            style={{ color: "#646663" }}
                            htmlFor="email"
                        >
                            Email Address*
                        </label>
                        <input
                            style={{ border: "2px solid #9a9896ff", borderRadius: "6px", padding: "8px" }}
                            id="email"
                            type="email"
                            value={emailId}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                        <button type="submit" className="btn btn-success w-100 mt-3">
                            Send Reset Link
                        </button>
                    </form>
                    {message && <p className="mt-3" style={{ color: isSuccess ? 'green' : 'red' }}>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BsPerson, BsEnvelope, BsPhone } from "react-icons/bs";
import { Spinner, Alert } from "react-bootstrap";

export default function AdminAccount() {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const adminId = searchParams.get("adminId");

  useEffect(() => {
    if (!adminId) {
      setError("Admin ID not found in URL.");
      setLoading(false);
      return;
    }

    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/admins/${adminId}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to fetch admin data.");
        }
        const data = await response.json();
        setAdminData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [adminId]);

  return (
    <div className="container">
      <div
        className="row align-items-center justify-content-center"
        style={{ marginTop: "10vh" }}
      >
        <div className="col-md-5 d-none d-md-block">
          <img
            src="/login.png" // Using the same image for consistency
            alt="account"
            className="img-fluid"
            style={{ maxHeight: "400px" }}
          />
        </div>
        <div className="col-md-6 shadow rounded-4 p-4">
          <div
            className="m-4 fw-bold"
            style={{ textAlign: "left", fontSize: 25, color: "#4b4e4aff" }}
          >
            My Account
          </div>
          {loading ? (
            <div className="text-center p-5">
              <Spinner animation="border" variant="success" />
              <p className="mt-2">Loading Account Details...</p>
            </div>
          ) : error ? (
            <Alert variant="danger" className="m-4">
              {error}
            </Alert>
          ) : adminData ? (
            <div
              className="d-flex flex-column gap-3 m-4"
              style={{ color: "#3a3d40" }}
            >
              <div className="d-flex align-items-center gap-3 p-2 border-bottom">
                <BsPerson size={24} style={{ color: "#0da308" }} />
                <div>
                  <label className="fw-medium text-muted" style={{ fontSize: '0.9rem' }}>Username</label>
                  <p className="mb-0 fs-5">{adminData.name}</p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 p-2 border-bottom">
                <BsEnvelope size={24} style={{ color: "#0da308" }} />
                <div>
                  <label className="fw-medium text-muted" style={{ fontSize: '0.9rem' }}>Email</label>
                  <p className="mb-0 fs-5">{adminData.email}</p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 p-2 border-bottom">
                <BsPhone size={24} style={{ color: "#0da308" }} />
                <div>
                  <label className="fw-medium text-muted" style={{ fontSize: '0.9rem' }}>Mobile No</label>
                  <p className="mb-0 fs-5">{adminData.phone_no}</p>
                </div>
              </div>
            </div>
          ) : (
            <Alert variant="warning" className="m-4">
              Could not load admin details.
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

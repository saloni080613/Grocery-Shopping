import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import toast from "react-hot-toast";

export default function Account() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const customerId = queryParams.get("customerId");

  const [user, setUser] = useState(null);
  const [selectedAddressType, setSelectedAddressType] = useState("Home");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!customerId) {
      setError("Customer ID is missing. Please log in.");
      setLoading(false);
      return;
    }

    const fetchAccountDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/customers/${customerId}`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch account details: ${response.statusText}`
          );
        }
        const data = await response.json();
        
        // Ensure all address types exist, even if empty
        const addressTypes = ["Home", "Office", "Other"];
        const addresses = addressTypes.map(type => {
          const existing = data.addresses?.find(a => a.type === type);
          return existing || { type, street: '', city: '', state: '', postal_code: '', country: 'India', landmark: '' };
        });

        setUser({
          ...data,
          addresses,
        });

      } catch (err) {
        setError(err.message);
        toast.error("Could not load account details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccountDetails();
  }, [customerId]);

  const handleAddressTypeChange = (e) => {
    setSelectedAddressType(e.target.value);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      let addressExists = false;
      const updatedAddresses = prev.addresses.map((addr) => {
        if (addr.type === selectedAddressType) {
          addressExists = true;
          return { ...addr, [name]: value };
        }
        return addr;
      });

      // If the address type didn't exist, create it.
      if (!addressExists) {
        const newAddress = { type: selectedAddressType, country: 'India', [name]: value };
        updatedAddresses.push(newAddress);
      }

      return { ...prev, addresses: updatedAddresses };
    });
  };

  const validateAddress = () => {
    const activeAddress = user.addresses.find(
      (addr) => addr.type === selectedAddressType
    );
    if (!activeAddress) return true; // Should not happen

    const { street, city, state, postal_code } = activeAddress;
    const addressFields = [street, city, state, postal_code];
    const filledFields = addressFields.filter((field) => field && field.trim() !== "").length;

    // If any address field is filled, all required ones must be filled.
    if (filledFields > 0 && filledFields < 4) {
      return false;
    }
    return true;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (isSaving) return;

    const newErrors = {};

    if (!validateAddress()) {
      newErrors.address = "Please fill all required address fields (Street, City, State, Postal Code) or leave them all empty.";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSaving(true);
      const activeAddress = user.addresses.find(
        (addr) => addr.type === selectedAddressType
      );

      // Only save if there's something to save.
      if (activeAddress && activeAddress.street) {
        const payload = {
          customerId: parseInt(customerId, 10),
          type: activeAddress.type,
          street: activeAddress.street,
          city: activeAddress.city,
          state: activeAddress.state,
          postalCode: activeAddress.postal_code,
          country: activeAddress.country,
          landmark: activeAddress.landmark,
        };

        try {
          const response = await fetch('/api/addresses', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error('Failed to save address.');
          }
          toast.success("Address saved successfully!");
        } catch (err) {
          toast.error(err.message || "Could not save address.");
        } finally {
          setIsSaving(false);
        }
      } else {
        // If the form is empty, we can just inform the user.
        toast.success("No changes to save.");
      }
    } else {
      toast.error("Please correct the errors before saving.");
    }
  };

  // This is now safe because we ensure all address types exist in state.
  const activeAddress = user
    ? user.addresses.find((addr) => addr.type === selectedAddressType)
    : {};


  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading Account Details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  if (!user) return null; // Should not happen if loading/error is handled

  return (
    <section style={{ padding: "24px", background: "#f8f9fa" }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4 p-md-5">
                <h2 className="fw-bold mb-4" style={{ color: "#2d362f" }}>
                  My Account
                </h2>
                <Form noValidate onSubmit={handleSave}>
                  {/* Personal Details */}
                  <h4 className="mb-3 fs-5" style={{ color: "#043b0d" }}>Personal Details</h4>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        plaintext
                        readOnly
                        name="username"
                        value={user.username}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        plaintext
                        readOnly
                        name="email"
                        value={user.email}
                      />
                    </Form.Group>
                  </Row>
                  <Form.Group className="mb-4" controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" name="phone" value={user.phone} plaintext readOnly />
                  </Form.Group>

                  {/* Address Details */}
                  <h4 className="mb-3 fs-5" style={{ color: "#043b0d" }}>Address</h4>
                  {errors.address && <Alert variant="danger">{errors.address}</Alert>}
                  <Form.Group className="mb-3">
                    <Form.Label>Address Type</Form.Label>
                    <div>
                      {["Home", "Office", "Other"].map((type) => (
                        <Form.Check
                          inline
                          key={type}
                          type="radio"
                          label={type}
                          name="type"
                          value={type}
                          checked={selectedAddressType === type}
                          onChange={handleAddressTypeChange}
                        />
                      ))}
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="street">
                    <Form.Label>Street</Form.Label>
                    <Form.Control name="street" value={activeAddress.street || ''} onChange={handleAddressChange} />
                  </Form.Group>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control name="city" value={activeAddress.city || ''} onChange={handleAddressChange} />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="state">
                      <Form.Label>State</Form.Label>
                      <Form.Control name="state" value={activeAddress.state || ''} onChange={handleAddressChange} />
                    </Form.Group>
                  </Row>
                  <Row className="mb-4">
                    <Form.Group as={Col} md="6" controlId="postal_code">
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control name="postal_code" value={activeAddress.postal_code || ''} onChange={handleAddressChange} />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="country">
                      <Form.Label>Country</Form.Label>
                      <Form.Control name="country" value={activeAddress.country || ''} onChange={handleAddressChange} />
                    </Form.Group>
                  </Row>
                  <Form.Group className="mb-4" controlId="landmark">
                    <Form.Label>Landmark (Optional)</Form.Label>
                    <Form.Control name="landmark" value={activeAddress.landmark || ''} onChange={handleAddressChange} />
                  </Form.Group>

                  <div className="d-grid">
                    <Button type="submit" disabled={isSaving} style={{ background: "#043b0d", border: "none" }}>
                      {isSaving ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                          <span className="ms-2">Saving...</span>
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
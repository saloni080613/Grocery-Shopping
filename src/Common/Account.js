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
} from "react-bootstrap";
import toast from "react-hot-toast";

// Mock data for now, to be replaced with API calls
const mockUser = {
  username: "Salonee",
  email: "salonee@example.com",
  phone: "123-456-7890",
  addresses: [
    {
      type: "Home",
      street: "123 Green Valley",
      city: "Pune",
      state: "Maharashtra",
      postal_code: "411001",
      country: "India",
      landmark: "Near FreshMart",
    },
    {
      type: "Office",
      street: "456 Business Park",
      city: "Mumbai",
      state: "Maharashtra",
      postal_code: "400051",
      country: "India",
      landmark: "Opposite Central Mall",
    },
    {
      type: "Other",
      street: "",
      city: "",
      state: "",
      postal_code: "",
      country: "India",
      landmark: "",
    },
  ],
};

export default function Account() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const customerId = queryParams.get("customerId");

  const [user, setUser] = useState(mockUser);
  const [selectedAddressType, setSelectedAddressType] = useState("Home");
  const [errors, setErrors] = useState({});

  // In the future, you can fetch user data here
  useEffect(() => {
    if (customerId) {
      // Example: fetch(`/api/user/${customerId}`).then(...)
      setUser(mockUser);
    }
  }, [customerId]);

  const handleAddressTypeChange = (e) => {
    setSelectedAddressType(e.target.value);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      const updatedAddresses = prev.addresses.map((addr) =>
        addr.type === selectedAddressType
          ? { ...addr, [name]: value }
          : addr
      );
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

  const handleSave = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateAddress()) {
      newErrors.address = "Please fill all required address fields .";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // In the future, this will be an API call
      console.log("Saving user data:", user);
      toast.success("Account details saved successfully!");
    } else {
      toast.error("Please correct the errors before saving.");
    }
  };

  const activeAddress =
    user.addresses.find((addr) => addr.type === selectedAddressType) || {};

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
                    <Button type="submit" style={{ background: "#043b0d", border: "none" }}>
                      Save Changes
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
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
  Image,
} from "react-bootstrap";
import toast from "react-hot-toast";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const customerId = queryParams.get("customerId");

  const [cartItems, setCartItems] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [selectedAddressType, setSelectedAddressType] = useState("Home");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
    landmark: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const fetchCheckoutData = useCallback(async () => {
    if (!customerId) {
      setError("Customer ID is missing. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [cartRes, customerRes] = await Promise.all([
        fetch(`/api/cart/${customerId}`),
        fetch(`/api/customers/${customerId}`),
      ]);

      if (!cartRes.ok) throw new Error("Failed to fetch cart items.");
      if (!customerRes.ok) throw new Error("Failed to fetch customer details.");

      const cartData = await cartRes.json();
      if (cartData.length === 0) {
        toast.error("Your cart is empty. Add items to checkout.");
        navigate(`/Search?customerId=${customerId}`);
        return;
      }
      const customerData = await customerRes.json();

      setCartItems(cartData);

      const addressTypes = ["Home", "Office", "Other"];
      const addresses = addressTypes.map((type) => {
        const existing = customerData.addresses?.find((a) => a.type === type);
        return (
          existing || {
            type, street: "", city: "", state: "", postal_code: "", country: "India", landmark: "",
          }
        );
      });
      setCustomer({ ...customerData, addresses });

      // Initialize shippingAddress with the default 'Home' address
      const homeAddress = addresses.find(a => a.type === 'Home') || {};
      setShippingAddress(homeAddress);

    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [customerId, navigate]); // navigate is a dependency of fetchCheckoutData

  useEffect(() => {
    fetchCheckoutData();
  }, [fetchCheckoutData]);

  const handleAddressTypeChange = (e) => {
    const type = e.target.value;
    setSelectedAddressType(type);
    if (type === "None") {
      setShippingAddress({ street: "", city: "", state: "", postal_code: "", country: "India", landmark: "" });
    } else {
      const newAddress = customer.addresses.find((addr) => addr.type === type) || {};
      setShippingAddress(newAddress);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const validateShippingAddress = () => {
    
    const { street, city, state, postal_code } = shippingAddress;
    if (!street || !city || !state || !postal_code) {
      toast.error("Please fill all required address fields.");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateShippingAddress()) {
      return;
    }

    setIsPlacingOrder(true);

    const orderPayload = {
      customerId: parseInt(customerId, 10),
      total_amount: totalAmount,
      total_quantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      ...shippingAddress,
    };

    try {
      // 1. Create the order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (!orderResponse.ok) throw new Error('Failed to create order.');
      const savedOrder = await orderResponse.json();
      const { orderId } = savedOrder;

      // 2. Add items to the order
      const itemsPayload = cartItems.map(item => ({
        productId: item.id,
        product_quantity: item.quantity,
        product_price: item.price,
      }));

      await fetch(`/api/orders/${orderId}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemsPayload),
      });

      toast.success(`Order placed successfully!`);
      navigate(`/OrderTrack?customerId=${customerId}`);
     

    } catch (err) {
      toast.error(err.message || "Could not place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading Checkout...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="m-4">{error}</Alert>;
  }

  if (!cartItems.length || !customer) return null;

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section style={{ padding: "24px", background: "#f8f9fa" }}>
      <Container>
        <h2 className="fw-bold mb-4" style={{ color: "#2d362f" }}>
          Checkout
        </h2>
        <Row className="g-4">
          {/* Left Column: Items and Customer Details */}
          <Col lg={8}>
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body className="p-4">
                <h4 className="mb-3 fs-5" style={{ color: "#043b0d" }}>Order Items</h4>
                {cartItems.map(item => (
                  <div key={item.id} className="d-flex align-items-center mb-3 border-bottom pb-3">
                    <Image src={item.image} rounded width={60} height={60} style={{ objectFit: 'cover' }} />
                    <div className="ms-3 flex-grow-1">
                      <div className="fw-bold">{item.name}</div>
                      <div className="text-muted small">
                        {item.quantity} x ₹{item.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="fw-bold">₹{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </Card.Body>
            </Card>

            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <h4 className="mb-3 fs-5" style={{ color: "#043b0d" }}>Customer Details</h4>
                <Row className="mb-2">
                  <Col md={8}><Form.Label>Username:</Form.Label> <p className="fw-light">{customer.username}</p></Col>
                  <Col md={4}><Form.Label>Phone:</Form.Label> <p className="fw-light">{customer.phone}</p></Col>
                </Row>
                <Row>
                  <Col><Form.Label>Email:</Form.Label> <p className="fw-light">{customer.email}</p></Col>
                </Row>
                <hr />
                <h5 className="mb-3 fs-6">Shipping Address</h5>
                <Form.Group className="mb-3">
                  {["Home", "Office", "Other", "None"].map((type) => (
                    <Form.Check inline key={type} type="radio" label={type} name="addressType" value={type} checked={selectedAddressType === type} onChange={handleAddressTypeChange} />
                  ))}
                </Form.Group>
                <>
                  <Form.Group className="mb-3"><Form.Control name="street" value={shippingAddress.street || ''} onChange={handleAddressChange} placeholder="Street" /></Form.Group>
                  <Row>
                    <Col md={6}><Form.Group className="mb-3"><Form.Control name="city" value={shippingAddress.city || ''} onChange={handleAddressChange} placeholder="City" /></Form.Group></Col>
                    <Col md={6}><Form.Group className="mb-3"><Form.Control name="state" value={shippingAddress.state || ''} onChange={handleAddressChange} placeholder="State" /></Form.Group></Col>
                  </Row>
                  <Row>
                    <Col md={6}><Form.Group className="mb-3"><Form.Control name="postal_code" value={shippingAddress.postal_code || ''} onChange={handleAddressChange} placeholder="Postal Code" /></Form.Group></Col>
                    <Col md={6}><Form.Group className="mb-3"><Form.Control name="country" value={shippingAddress.country || 'India'} onChange={handleAddressChange} placeholder="Country" /></Form.Group></Col>
                  </Row>
                  <Form.Group><Form.Control name="landmark" value={shippingAddress.landmark || ''} onChange={handleAddressChange} placeholder="Landmark (Optional)" /></Form.Group>
                </>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column: Order Summary */}
          <Col lg={4}>
            <Card className="shadow-sm border-0 position-sticky" style={{ top: "24px" }}>
              <Card.Body className="p-4">
                <h4 className="mb-3 fs-5" style={{ color: "#043b0d" }}>Order Summary</h4>
                <div className="d-flex justify-content-between mb-2"><span>Subtotal</span><span>₹{totalAmount.toFixed(2)}</span></div>
                <div className="d-flex justify-content-between mb-3 pb-3 border-bottom"><span>Shipping</span><span>Free</span></div>
                <div className="d-flex justify-content-between fw-bold fs-5 mb-4"><span>Total</span><span>₹{totalAmount.toFixed(2)}</span></div>
                
                <h5 className="mb-3 fs-6">Payment Method</h5>
                <Form.Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="mb-4">
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>Net Banking</option>
                  <option>Cash on Delivery</option>
                </Form.Select>

                <div className="d-grid">
                  <Button onClick={handlePlaceOrder} disabled={isPlacingOrder} style={{ background: "#043b0d", border: "none", padding: "12px" }}>
                    {isPlacingOrder ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="ms-2">Placing Order...</span>
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
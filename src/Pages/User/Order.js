import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsPerson, BsGeoAlt } from "react-icons/bs";
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
import { IoAdd, IoRemove } from "react-icons/io5";
import toast from "react-hot-toast";

export default function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("productId");
  const customerId = queryParams.get("customerId");
  const initialQuantity = parseInt(queryParams.get("quantity") || "1", 10);

  const [product, setProduct] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [quantity, setQuantity] = useState(initialQuantity);
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

  const fetchOrderData = useCallback(async () => {
    if (!productId || !customerId) {
      setError("Missing product or customer information.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // Fetch product and customer data concurrently
      const [productRes, customerRes] = await Promise.all([
        fetch('/api/products/details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify([parseInt(productId, 10)]), // API expects an array of IDs
        }),
        fetch(`/api/customers/${customerId}`),
      ]);

      if (!productRes.ok) throw new Error("Failed to fetch product details.");
      if (!customerRes.ok) throw new Error("Failed to fetch customer details.");

      const productDataArray = await productRes.json();
      if (productDataArray.length === 0) {
        throw new Error(`Product with ID ${productId} not found.`);
      }
      const productData = productDataArray[0]; // The API returns an array, we need the first item
      const customerData = await customerRes.json();
      setProduct(productData);

      const addressTypes = ["Home", "Office", "Other"];
      const addresses = addressTypes.map((type) => {
        const existing = customerData.addresses?.find((a) => a.type === type);
        return (
          existing || {
            type,
            street: "",
            city: "",
            state: "",
            postal_code: "", // Use snake_case to match form field name
            country: "India",
            landmark: "",
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
  }, [productId, customerId]);

  useEffect(() => {
    fetchOrderData();
  }, [fetchOrderData]);

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0 && newQuantity <= product.stock_quantity) {
      setQuantity(newQuantity);
    } else if (newQuantity > product.stock_quantity) {
      toast.error(`Only ${product.stock_quantity} items in stock!`);
    }
  };

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
    if (isPlacingOrder) return;
    if (!validateShippingAddress()) {
      return;
    }

    setIsPlacingOrder(true);

    const payload = {
      customerId: parseInt(customerId, 10),
      total_amount: totalAmount,
      total_quantity: quantity,
      street: shippingAddress.street || "",
      city: shippingAddress.city || "",
      state: shippingAddress.state || "",
      postal_code: shippingAddress.postal_code || "",
      country: shippingAddress.country || "India",
      landmark: shippingAddress.landmark || "",
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to place order.');
      }

      const savedOrder = await response.json();
      const { orderId } = savedOrder;

      // 2. Add item to the order
      const itemsPayload = [{
        productId: product.id,
        product_quantity: quantity,
        product_price: product.price,
      }];

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
        <p className="mt-2">Loading Order Details...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="m-4">{error}</Alert>;
  }

  if (!product || !customer) return null;

  const totalAmount = product.price * quantity;

  return (
    <section style={{ padding: "24px", background: "#f8f9fa" }}>
      <Container>
        <h2 className="fw-bold mb-4" style={{ color: "#043b0d" }}>
          Order Checkout
        </h2>
        <Row className="g-4">
          {/* Left Column: Product and Customer Details */}
          <Col lg={8}>
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body className="p-4">
                <h4 className="mb-3 fs-5" style={{ color: "#043b0d" }}>Product Details</h4>
                <div className="d-flex align-items-center"> 
                  <Image src={product.image_url || product.image} rounded width={80} height={80} style={{ objectFit: 'cover' }} />
                  <div className="ms-3 flex-grow-1">
                    <div className="fw-bold">{product.name}</div>
                    <div className="text-muted small">{product.category_name}</div>
                    <div className="fw-bold" style={{ color: "#0da308" }}>₹{product.price.toFixed(2)}</div>
                  </div>
                  <div className="d-flex align-items-center border rounded p-1">
                    <Button variant="light" size="sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}><IoRemove /></Button>
                    <span className="mx-2 fw-bold">{quantity}</span>
                    <Button variant="light" size="sm" onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock_quantity}><IoAdd /></Button>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <h4 className="mb-3 fs-5" style={{ color: "#043b0d" }}>
                  <BsPerson className="me-2" />Customer Details</h4>
                <Row className="mb-2">
                  <Col md={8}><Form.Label>Username:</Form.Label> <p className="fw-light">{customer.username}</p></Col>
                  <Col md={4}><Form.Label>Phone:</Form.Label> <p className="fw-light">{customer.phone}</p></Col>
                </Row>
                <Row>
                  <Col><Form.Label>Email:</Form.Label> <p className="fw-light">{customer.email}</p></Col>
                </Row>
                <hr />
                <h5 className="mb-3 fs-6">
                  <BsGeoAlt className="me-2" />
                  Shipping Address</h5>
                <Form.Group className="mb-3">
                  {["Home", "Office", "Other", "None"].map((type) => (
                    <Form.Check inline key={type} type="radio" label={type} name="addressType" value={type} checked={selectedAddressType === type} onChange={handleAddressTypeChange} />
                  ))}
                </Form.Group>
                {/* Address form is now always visible */}
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
                <div className="d-flex justify-content-between fw-bold fs-5 mb-4" style={{ color: "#198754" }}><span>Total</span><span>₹{totalAmount.toFixed(2)}</span></div>
                
                <h5 className="mb-3 fs-6">Payment Method</h5>
                <Form.Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="mb-4">
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>Net Banking</option>
                  <option>Cash on Delivery</option>
                </Form.Select>

                <div className="d-grid">
                  <Button variant="success" onClick={handlePlaceOrder} disabled={isPlacingOrder} style={{ padding: "12px" }}>
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

import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Image,
  Form,
} from "react-bootstrap";
import { BsPerson, BsGeoAlt } from "react-icons/bs";
import toast from "react-hot-toast";

// Status options for the dropdown
const statusOptions = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Failed",
];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/orders`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders. Please try again later.");
      }
      const data = await response.json();
      // Sort orders by most recent first
      const sortedData = data.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
      setOrders(sortedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Extract the numeric part from the string ID (e.g., "ORD-123" -> 123)
      const numericOrderId = parseInt(orderId.replace('ORD-', ''), 10);

      // Add a check to ensure parsing was successful before sending
      if (isNaN(numericOrderId)) {
        toast.error(`Invalid Order ID format received: ${orderId}`);
        return;
      }

      const response = await fetch(`/api/orders/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        // Use the correctly parsed numericOrderId
        body: JSON.stringify({ orderId: numericOrderId, status: newStatus }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update order status.');
      }

      // Update the status in the local state for immediate UI feedback
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success(`Order #${orderId} status updated to ${newStatus}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading All Orders...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="m-4">{error}</Alert>;
  }

  return (
    <section style={{ padding: "24px", background: "#f8f9fa" }}>
      <Container>
        <h2 className="fw-bold mb-4" style={{ color: "#043b0d" }}>
          Manage Orders
        </h2>
        {orders.length === 0 ? (
          <Alert variant="info">There are no orders to display.</Alert>
        ) : (
          orders.map((order) => (
            <Card key={order.orderId} className="shadow-sm border-0 mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                <div>
                  <span className="fw-bold">Order ID:</span> {order.orderId}
                  <span className="mx-3 text-muted">|</span>
                  <span className="fw-bold">Date:</span>{" "}
                  {new Date(order.order_date).toLocaleDateString()}
                </div>
                <div className="d-flex align-items-center">
                  <span className="me-2">Status:</span>
                  <Form.Select
                    size="sm"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                    style={{ width: '150px' }}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </Form.Select>
                </div>
              </Card.Header>
              <Card.Body className="p-4">
                <Row className="g-4">
                  {/* Left: Product Details */}
                  <Col md={7}>
                    <h5 className="mb-3 fs-6" style={{ color: "#043b0d" }}>
                      Products
                    </h5>
                    {order.items.map((item) => (
                      <div
                        key={item.product_id}
                        className="d-flex align-items-center mb-3 border-bottom pb-3"
                      >
                        <Image
                          src={item.image_url}
                          rounded
                          width={60}
                          height={60}
                          style={{ objectFit: "cover" }}
                        />
                        <div className="ms-3 flex-grow-1">
                          <div className="fw-bold">{item.product_name}</div>
                          <div className="text-muted small">
                            {item.category}
                          </div>
                          <div className="small">
                            {item.quantity} x ₹{item.price.toFixed(2)}
                          </div>
                        </div>
                        <div className="fw-bold" style={{ color: "#043b0d" }}>
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </Col>

                  {/* Right: Customer & Shipping */}
                  <Col md={5}>
                    <div className="mb-4">
                      <h5 className="mb-3 fs-6" style={{ color: "#043b0d" }}>
                        <BsPerson className="me-2" />
                        Customer Details
                      </h5>
                      <p className="mb-1 small">
                        <strong>Username:</strong> {order.customer.username}
                      </p>
                      <p className="mb-1 small">
                        <strong>Email:</strong> {order.customer.email}
                      </p>
                      <p className="mb-1 small">
                        <strong>Phone:</strong> {order.customer.phone_no}
                      </p>
                    </div>
                    <div>
                      <h5 className="mb-3 fs-6" style={{ color: "#043b0d" }}>
                        <BsGeoAlt className="me-2" />
                        Shipping Address
                      </h5>
                      <address className="small mb-0">
                        {order.shipping_address.street}
                        <br />
                        {order.shipping_address.city},{" "}
                        {order.shipping_address.state}{" "}
                        {order.shipping_address.postal_code}
                        <br />
                        {order.shipping_address.country}
                      </address>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-end bg-white border-top-0 p-3">
                <span className="fs-5 fw-bold" style={{ color: "#198754" }}>
                  Total: ₹{order.total_amount.toFixed(2)}
                </span>
              </Card.Footer>
            </Card>
          ))
        )}
      </Container>
    </section>
  );
}

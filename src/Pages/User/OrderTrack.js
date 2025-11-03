import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Image,
  Badge,
  Button,
} from "react-bootstrap";
import {
  BsBoxSeam,
  BsTruck,
  BsHouseCheck,
  BsPerson,
  BsGeoAlt,
  BsHourglassSplit,
  BsXCircle,
  BsExclamationCircle,
} from "react-icons/bs";
import toast from "react-hot-toast";




const statusMap = {
  Pending: { icon: <BsHourglassSplit />, variant: "warning", step: 1 },
  Processing: { icon: <BsBoxSeam />, variant: "secondary", step: 1 },
  Shipped: { icon: <BsTruck />, variant: "info", step: 2 },
  Delivered: { icon: <BsHouseCheck />, variant: "success", step: 3 },
  Cancelled: { icon: <BsXCircle />, variant: "danger", step: 0 },
  Failed: { icon: <BsExclamationCircle />, variant: "danger", step: 0 },
};

export default function OrderTrack() {
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("customerId");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!customerId) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`/api/customers/${customerId}/orders`);
        if (!response.ok) {
          throw new Error(
            "Failed to fetch your orders. Please try again later."
          );
        }
        const data = await response.json();
        // Assuming the API returns orders sorted by date, otherwise you might want to sort them here.
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      const numericOrderId = parseInt(orderId.replace("ORD-", ""), 10);
      if (isNaN(numericOrderId)) {
        toast.error(`Invalid Order ID format: ${orderId}`);
        return;
      }

      const response = await fetch(`/api/orders/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: numericOrderId, status: "Cancelled" }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to cancel order.");
      }

      // Update local state to reflect the change immediately
      setOrders((prevOrders) =>
        prevOrders.map((o) => (o.orderId === orderId ? { ...o, status: "Cancelled" } : o))
      );
      toast.success(`Order #${orderId} has been cancelled.`);
    } catch (err) {
      toast.error(err.message || "Could not cancel the order.");
    }
  };
  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading Your Orders...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="m-4">{error}</Alert>;
  }

  if (!customerId) {
    return (
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: 8,
          textAlign: "center",
        }}
      >
        <p>To access order history, please login first.</p>
        <button onClick={() => navigate(`/login`)} className="btn btn-dark">
          please login to continue
        </button>
      </div>
    );
  }

  return (
    <section style={{ padding: "24px", background: "#f8f9fa" }}>
      <Container>
        <h2 className="fw-bold mb-4" style={{ color: "#2d362f" }}>
          My Orders
        </h2>
        {orders.length === 0 ? (
          <Alert variant="info">You have no orders yet.</Alert>
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
                <Badge
                  pill
                  bg={statusMap[order.status]?.variant || "secondary"}
                  className="fs-6 p-2"
                >
                  {statusMap[order.status]?.icon} {order.status}
                </Badge>
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
                        <div className="fw-bold" style={{ color: "#11651fff" }}>
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
              <Card.Footer className="d-flex justify-content-between align-items-center bg-white border-top-0 p-3">
                <div>
                  {["Pending", "Processing"].includes(order.status) && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleCancelOrder(order.orderId)}
                    >
                      Cancel Order
                    </Button>
                  )}
                </div>
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

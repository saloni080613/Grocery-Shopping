import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";

export default function Wishlist() {
  const location = useLocation();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const customerId = queryParams.get("customerId");

  useEffect(() => {
    if (!customerId) {
      setMessage("Please log in to see wishlist");
      setLoading(false);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const response = await fetch(`/api/wishlist/${customerId}`);
        if (!response.ok) throw new Error("Failed to fetch wishlist");
        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error(error);
        setMessage("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [customerId]);

  const handleRemove = async (productId) => {
    const wishlistRequest = {
      customerId: parseInt(customerId),
      productId: productId,
    };
    try {
      const response = await fetch("/api/wishlist/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wishlistRequest),
      });

      if (response.ok) {
        const message = await response.text();
        alert(message);
        setWishlist((prev) => prev.filter((item) => item.id !== productId));
      } else {
        const errorText = await response.text();
        alert(`Failed to update wishlist: ${errorText}`);
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading...</p>
      </div>
    );

  if (message)
    return <p className="text-center mt-5 fs-5 text-muted">{message}</p>;

  return (
    <section style={{ padding: "24px", background: "#f8f9fa" }}>
      <h2 className="fw-bold mb-3" style={{ color: "#2d362f" }}>
        My Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <div
          style={{
            background: "#fff",
            padding: "24px",
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <p>Your wishlist is empty.</p>
          <Button
            variant="dark"
            onClick={() => navigate("/search")}
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <Container className="my-5">
          <Row className="g-4">
            {wishlist.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="shadow-sm h-100">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      alt={product.name}
                      style={{ height: "160px", objectFit: "cover" }}
                    />
                    <Card.Body className="d-flex flex-column p-3">
                      <Card.Title className="fs-6">{product.name}</Card.Title>
                      <Card.Text className="text-muted mb-1 small">
                        {product.category}
                      </Card.Text>
                      <Card.Text className="fw-semibold text-success mb-2 small">
                        ₹{product.price.toFixed(2)}
                      </Card.Text>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemove(product.id)}
                        className="mt-auto"
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </section>
  );
}

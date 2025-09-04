import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function AboutUs() {
  return (
    <div
      style={{
        backgroundImage:
          "url('/grocery3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        position: "relative",
        color: "white",
      }}
    >
      
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)", 
        }}
      />

      <Container className="position-relative py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="bg-light bg-opacity-75 p-4 border-0 shadow-lg">
              <Card.Body>
                <h2 className="text-success fw-bold mb-4 text-center">
                  About Us
                </h2>
                <p className="text-dark">
                  Welcome to <strong>FreshMart</strong> — your one-stop
                  destination for fresh groceries. We believe that healthy
                  eating starts with quality ingredients, and we’re here to
                  deliver the best of fruits, vegetables, and daily essentials
                  right to your doorstep.
                </p>
                <p className="text-dark">
                  Founded with a mission to make grocery shopping easy and
                  reliable, FreshMart is committed to freshness, fair pricing,
                  and convenience. Our team carefully sources products directly
                  from farmers and trusted suppliers, ensuring only the best
                  quality reaches your kitchen.
                </p>
                <p className="text-dark">
                  Join thousands of happy customers who shop with us every day.
                  Together, let’s make healthy living simple, sustainable, and
                  delightful.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

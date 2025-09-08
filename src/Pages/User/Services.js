import React from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Services() {
 
    const services = [
    {
      title: "Fresh Produce Delivery",
      description:
        "Get fresh fruits, vegetables, and groceries delivered straight to your doorstep with guaranteed freshness.",
      icon: "🥦",
    },
    {
      title: "Same-Day Delivery",
      description:
        "Order before 12 PM and enjoy same-day delivery for all your essentials.",
      icon: "🚚",
    },
    {
      title: "Easy Online Payment",
      description:
        "Pay securely through UPI, debit/credit cards, net banking, or cash on delivery.",
      icon: "💳",
    },
    {
      title: "Responsive & User-Friendly Interface",
      description:
        "Enjoy a seamless browsing experience on any device—desktop or mobile—and find what you need quickly.",
      icon: "📱",
    },
    {
      title: "Order Tracking (In-Site Only)",
      description:
        "live status in the website: Placed → Packed → Out for Delivery → Delivered/Returned.",
      icon: "📦",
    },
    {
      title: "Performance-Focused Design",
      description:
        "Pages load quickly, even on slower connections—so you don’t wait to shop, add, or check out.",
      icon: "⚙️",
    },
    
  ];

  return (
    <div className="bg-light py-5">
      <Container>
        <h2 className="text-center text-success fw-bold mb-4">Our Services</h2>
        <p className="text-center text-muted mb-5">
          We offer a wide range of services to make grocery shopping convenient, affordable, and reliable.
        </p>
        <Row>
          {services.map((service, index) => (
            <Col md={4} sm={6} className="mb-4" key={index}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="text-center">
                  <div style={{ fontSize: "2rem" }}>{service.icon}</div>
                  <h5 className="mt-3 text-success">{service.title}</h5>
                  <p className="text-muted small">{service.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

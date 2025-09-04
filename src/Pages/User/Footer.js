import React from "react";

import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className=" text-white py-5 mt-5" style={{ backgroundColor: "#252925ff" }}>
      <Container>
        <Row>
         
          <Col md={3} sm={6} className="mb-4">
            <h2 className="fw-bold">FreshMart</h2>
            <p className="small mt-2">
              Freshness at your doorstep — shop smart, eat healthy.
            </p>
          </Col>

       
          <Col md={3} sm={6} className="mb-4">
            <h5 className="fw-semibold">Quick Links</h5>
            <ul className="list-unstyled small mt-2">
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/Services" className="text-white text-decoration-none">
                  Services
                </a>
              </li>
              <li>
                <a href="/AboutUs" className="text-white text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </Col>

       
          <Col md={3} sm={6} className="mb-4">
            <h5 className="fw-semibold">Customer Support</h5>
            <ul className="list-unstyled small mt-2">
              <li>
                <a href="/faq" className="text-white text-decoration-none">
                  FAQ
                </a>
              </li>
             
              <li>
                <a href="/privacy" className="text-white text-decoration-none">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-white text-decoration-none">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </Col>

         
          <Col md={3} sm={6} className="mb-4">
            <h5 className="fw-semibold">Get in Touch</h5>
            <p className="small mb-1">📍 123 Fresh Street, Your City</p>
            <p className="small mb-1">📞 +91 98765 43210</p>
            <p className="small mb-2">✉️ support@freshmart.com</p>
            
          </Col>
        </Row>

       
        <Row>
          <Col className="text-center pt-3 border-top border-light small">
            © {new Date().getFullYear()} FreshMart. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

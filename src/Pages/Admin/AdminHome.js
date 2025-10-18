import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUsers, FaClipboardList, FaBoxOpen, FaRupeeSign } from 'react-icons/fa';

const statIconStyle = {
  color: '#198754', // A lighter, standard green
};

const statValueStyle = {
  fontSize: '2.5rem',
  fontWeight: 700,
  color: '#198754', // A lighter, standard green
  lineHeight: 1.2,
};

const baseCardStyle = {
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
};

const hoveredCardStyle = {
  ...baseCardStyle,
  transform: 'translateY(-5px)',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
};

const statsData = [
  {
    icon: <FaUsers size={40} className="stat-icon" />,
    title: 'Total Customers',
    value: '1,250',
    bg: 'primary'
  },
  {
    icon: <FaClipboardList size={40} className="stat-icon" />,
    title: 'Total Orders',
    value: '3,420',
    bg: 'success'
  },
  {
    icon: <FaBoxOpen size={40} className="stat-icon" />,
    title: 'Total Products',
    value: '78',
    bg: 'warning'
  },
  {
    icon: <FaRupeeSign size={40} className="stat-icon" />,
    title: 'Total Revenue',
    value: '₹8,50,000',
    bg: 'danger'
  }
];

export default function AdminHome() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <Container fluid className="p-4">
      <h1 className="mb-4">Dashboard Overview</h1>
      <Row>
        {statsData.map((stat, index) => (
          <Col key={index} md={6} xl={3} className="mb-4">
            <Card
              className="h-100 shadow-sm border-0 bg-light"
              style={hoveredIndex === index ? hoveredCardStyle : baseCardStyle}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card.Body className="d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-start">
                  <Card.Title as="h5" className="text-muted">{stat.title}</Card.Title>
                  <span style={statIconStyle}>{stat.icon}</span>
                </div>
                <div style={statValueStyle} className="mt-2">{stat.value}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

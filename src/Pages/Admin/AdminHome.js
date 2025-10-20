import React, { useState, useEffect } from 'react';
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

export default function AdminHome() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/dashboard/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats');
        }
        const data = await response.json();

        // Format the fetched data to match the structure the component expects
        const formattedStats = [
          { icon: <FaUsers size={40} />, title: 'Total Customers', value: data.totalCustomers.toLocaleString('en-IN') },
          { icon: <FaClipboardList size={40} />, title: 'Total Orders', value: data.totalOrders.toLocaleString('en-IN') },
          { icon: <FaBoxOpen size={40} />, title: 'Total Products', value: data.totalProducts.toLocaleString('en-IN') },
          { icon: <FaRupeeSign size={40} />, title: 'Total Revenue', value: `₹${data.totalRevenue.toLocaleString('en-IN')}` },
        ];
        setStats(formattedStats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <Container fluid className="p-4 text-center"><h2>Loading Dashboard...</h2></Container>;
  }

  if (error) {
    return <Container fluid className="p-4 text-center text-danger"><h2>Error: {error}</h2></Container>;
  }

  return (
    <Container fluid className="p-4">
      <h1 className="mb-4">Dashboard Overview</h1>
      <Row>
        {stats && stats.map((stat, index) => (
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

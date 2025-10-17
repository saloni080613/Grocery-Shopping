import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoTrash, IoAdd, IoRemove } from "react-icons/io5";
import toast from "react-hot-toast";


export default function Cart() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const customerId = queryParams.get("customerId");
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener('resize', handleResize);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchCartItems = useCallback(async () => {
    if (!customerId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`/api/cart/${customerId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch cart items.");
      }
      const data = await response.json();
      setCartItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    const item = cartItems.find(i => i.id === productId);
    if (newQuantity > item.stockQuantity) {
      toast.error(`Cannot add more than available stock (${item.stockQuantity}).`);
      return;
    }

    // Optimistically update UI
    const updatedCartItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ).filter(item => item.quantity > 0);
    setCartItems(updatedCartItems);

    try {
      const response = await fetch('/api/cart/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: parseInt(customerId), productId, quantity: newQuantity }),
      });

      if (!response.ok) {
        // Revert on error
        fetchCartItems();
        toast.error('Failed to update cart.');
      }
    } catch (error) {
      fetchCartItems(); // Revert
      toast.error('An error occurred while updating cart.');
    }
  };

  const handleRemoveFromCart = async (productId) => {
    // Optimistic UI update
    setCartItems(prev => prev.filter(item => item.id !== productId));

    try {
      const response = await fetch(`/api/cart/remove?customerId=${customerId}&productId=${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        fetchCartItems(); // Revert
        toast.error('Failed to remove item from cart.');
      }
    } catch (error) {
      fetchCartItems(); // Revert
      toast.error('An error occurred while removing item.');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Example shipping cost
  const total = subtotal + shipping;

  if (!customerId) {
    return <div style={{ background: '#fff', padding: '24px', borderRadius: 8, textAlign: 'center' }}>
      <p>To access cart, please login first.</p>
          <button onClick={() => navigate(`/login`)} className="btn btn-dark">
            please login to continue
          </button>
        </div>;
  }

  if (loading) {
    return <div style={{ padding: 16 }}><p>Loading cart...</p></div>;
  }

  if (error) {
    return <div style={{ padding: 16 }}><p>Error: {error}</p></div>;
  }

  return (
    <section style={{ padding: "24px", background: "#f8f9fa" }}>
      <h2 className="fw-bold mb-3" style={{ color: "#2d362f" }}>
        My Cart
      </h2>
      {cartItems.length === 0 ? (
        <div style={{ background: '#fff', padding: '24px', borderRadius: 8, textAlign: 'center' }}>
          <p>Your cart is empty.</p>
          <button onClick={() => navigate(`/Search${search}`)} className="btn btn-dark">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div style={{
          display: "grid",
          // Use 1 column for mobile, 2 for desktop
          gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr",
          gap: "24px",
          alignItems: 'start'
        }}>
          {/* Cart Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{ display: 'flex', background: '#fff', padding: '16px', borderRadius: 8, gap: '16px', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontSize: 14, color: '#666' }}>₹{item.price.toFixed(2)}</div>
                </div>
                {/* Quantity Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #ddd', borderRadius: 6 }}>
                  <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} style={{ border: 'none', background: 'transparent', padding: '8px', cursor: 'pointer' }}><IoRemove /></button>
                  <span style={{ padding: '0 8px', fontWeight: 600 }}>{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stockQuantity} style={{ border: 'none', background: 'transparent', padding: '8px', cursor: 'pointer' }}><IoAdd /></button>
                </div>
                {/* Total Price & Remove */}
                <div style={{ fontWeight: 700, width: '80px', textAlign: 'right' }}>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
                <button onClick={() => handleRemoveFromCart(item.id)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#e53935' }}>
                  <IoTrash size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <aside style={{
            background: '#fff',
            padding: '24px',
            borderRadius: 8,
            position: isMobile ? 'static' : 'sticky', // Make summary static on mobile
            top: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <h4 className="fw-bold mb-3">Order Summary</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 600 }}>₹{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
              <span>Shipping</span>
              <span style={{ fontWeight: 600 }}>₹{shipping.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700 }}>
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate(`/checkout?customerId=${customerId}`)}
              style={{
                background: '#043b0d',
                color: '#fff',
                border: 'none',
                padding: '12px',
                borderRadius: 6,
                cursor: 'pointer',
                width: '100%',
                marginTop: '24px',
                fontSize: '1rem'
              }}
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}

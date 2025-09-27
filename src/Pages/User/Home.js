import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoHeart, IoHeartOutline } from 'react-icons/io5';

function ProductCard({ product, wishlisted, onToggleWishlist, onAddToCart, onOrderNow }) {
  return (
    <article style={{ border: '1px solid #eee', borderRadius: 8, overflow: 'hidden', background: '#fff', position: 'relative' }}>
      <button
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        onClick={onToggleWishlist}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          border: 'none',
          background: 'rgba(255,255,255,0.9)',
          borderRadius: 999,
          width: 36,
          height: 36,
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
          cursor: 'pointer'
        }}
      >
        {wishlisted ? (
          <IoHeart style={{ color: '#e53935', fontSize: 20 }} />
        ) : (
          <IoHeartOutline style={{ color: '#3a3d40', fontSize: 20 }} />
        )}
      </button>
      <div style={{ aspectRatio: '4 / 3', background: '#f7f7f7' }}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : null}
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ fontWeight: 600 }}>{product.name}</div>
        <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{product.category}</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
          <span style={{ fontWeight: 700 }}>${product.price.toFixed(2)}</span>
          
          {!product.inStock && <span style={{ fontSize: 12, color: 'crimson' }}>Out of stock</span>}
        </div>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={onAddToCart}
            disabled={!product.inStock}
            style={{
              background: '#0da308',
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: 6,
              cursor: product.inStock ? 'pointer' : 'not-allowed',
              opacity: product.inStock ? 1 : 0.7,
              width: '100%'
            }}
          >
            Add to cart
          </button>
          <button
            onClick={onOrderNow}
            disabled={!product.inStock}
            style={{
              background: '#043b0d',
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: 6,
              cursor: product.inStock ? 'pointer' : 'not-allowed',
              opacity: product.inStock ? 1 : 0.7,
              width: '100%'
            }}
          >
            Order now
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [wishlistIds, setWishlistIds] = useState([]);

  const DEMO_PRODUCTS = [
    { id: 1, name: 'Fresh Apples', category: 'Fruits', price: 2.99, rating: 4.5, inStock: true, image: '/grocery1.jpg' },
    { id: 2, name: 'Whole Milk', category: 'Dairy', price: 3.49, rating: 4.2, inStock: true, image: '/grocery2.jpg' },
    { id: 3, name: 'Brown Bread', category: 'Bakery', price: 1.99, rating: 3.9, inStock: false, image: '/grocery3.jpg' },
    { id: 4, name: 'Spinach Bunch', category: 'Vegetables', price: 1.49, rating: 4.7, inStock: true, image: '/grocery4.png' },
    { id: 5, name: 'Cheddar Cheese', category: 'Dairy', price: 4.99, rating: 4.3, inStock: true, image: '/_veggie.png' },
  ];

  function toggleWishlist(productId) {
    setWishlistIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  }

  function handleAddToCart(product) {
    // Replace with actual cart logic/integration later
    console.log('Add to cart:', product);
  }

  function handleOrderNow(product) {
    // Navigate to Order page with product id as query param
    navigate(`/Order?productId=${product.id}`);
  }


  return (
    <div>
      {/* Hero Section */}
      <div
        className="container-fluid shadow-sm"
        style={{
          backgroundImage: "url(_veggie.png)",
          backgroundSize: "cover",
          backgroundPosition: "centre",
          height: "400px",
        }}
      >
        <div className="row ">
          <div className="col-md-6 ">
            <div className="mt-5 ms-2">
              <h3 className="mb-4" style={{ color: "#0da308" }}>Freshness at your doorstep</h3>

              <h1 className="fw-bold mb-4" style={{ color: "#2d362f" }}>
                shop smart, shop online.
              </h1>

              <p className="col-10 mb-4" style={{ color: "#3a3d40" }}>
                <i>"Freshness and convenience, all in one place. Order your favorite
                groceries online and have them delivered right to your doorstep.<br/>
                Eat well, live well, and shop smart with us."</i>
              </p>
              <Link to="/Search" className="btn btn-dark " >Shop Now </Link>
            </div>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="container-fluid py-5" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <h2 className="text-center mb-2" style={{ color: "#2d362f" }}>Featured Products</h2>
              <p className="text-center text-muted">Discover our most popular items</p>
            </div>
          </div>
          <div className="row">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 16,
              width: '100%'
            }}>
              {DEMO_PRODUCTS.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  wishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={() => toggleWishlist(product.id)}
                  onAddToCart={() => handleAddToCart(product)}
                  onOrderNow={() => handleOrderNow(product)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

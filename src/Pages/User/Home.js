import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoHeart, IoHeartOutline } from 'react-icons/io5';


export default function Home() {
  const navigate = useNavigate();
  const [wishlistIds, setWishlistIds] = useState([]);

  const DEMO_PRODUCTS = [
    { id: 1, name: 'Fresh Apples', category: 'Fruits', price: 2.99, inStock: true, image: '/grocery1.jpg' },
    { id: 2, name: 'Whole Milk', category: 'Dairy', price: 3.49, inStock: true, image: '/grocery2.jpg' },
    { id: 3, name: 'Brown Bread', category: 'Bakery', price: 1.99, inStock: false, image: '/grocery3.jpg' },
    { id: 4, name: 'Spinach Bunch', category: 'Vegetables', price: 1.49, inStock: true, image: '/grocery4.png' },
    { id: 5, name: 'Cheddar Cheese', category: 'Dairy', price: 4.99, inStock: true, image: '/_veggie.png' },
  ];

  function toggleWishlist(productId) {
    setWishlistIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  }

  function handleAddToCart(product) {
    // Replace with actual cart logic later
    // eslint-disable-next-line no-console
    console.log('Add to cart:', product);
  }

  function handleOrderNow(product) {
    navigate(`/Order?productId=${product.id}`);
  }

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

  return (
    <>
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
    {/* Products grid */}
    <section style={{ padding: 16 }}>
      <h2 className="fw-bold mb-3" style={{ color: '#2d362f' }}>Popular products</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 12
      }}>
        {DEMO_PRODUCTS.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            wishlisted={wishlistIds.includes(p.id)}
            onToggleWishlist={() => toggleWishlist(p.id)}
            onAddToCart={() => handleAddToCart(p)}
            onOrderNow={() => handleOrderNow(p)}
          />
        ))}
      </div>
    </section>
    </>
  );
}

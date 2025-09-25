import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoTrash } from 'react-icons/io5'

const DEMO_PRODUCTS = [
  { id: 1, name: 'Fresh Apples', category: 'Fruits', price: 2.99, inStock: true, image: '/grocery1.jpg' },
  { id: 2, name: 'Whole Milk', category: 'Dairy', price: 3.49, inStock: true, image: '/grocery2.jpg' },
  { id: 3, name: 'Brown Bread', category: 'Bakery', price: 1.99, inStock: false, image: '/grocery3.jpg' },
]

export default function Cart() {
  const navigate = useNavigate()
  const [cartIds, setCartIds] = useState([1, 2])

  function removeFromCart(productId) {
    setCartIds(prev => prev.filter(id => id !== productId))
  }

  function handleOrderNow(product) {
    navigate(`/Order?productId=${product.id}`)
  }

  function ProductCard({ product }) {
    return (
      <article style={{ border: '1px solid #eee', borderRadius: 8, overflow: 'hidden', background: '#fff', position: 'relative' }}>
        <button
          aria-label={'Remove from cart'}
          onClick={() => removeFromCart(product.id)}
          title="Remove from cart"
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
          <IoTrash style={{ color: '#e53935', fontSize: 20 }} />
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
              onClick={() => handleOrderNow(product)}
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
    )
  }

  const products = DEMO_PRODUCTS.filter(p => cartIds.includes(p.id))

  return (
    <section style={{ padding: 16 }}>
      <h2 className="fw-bold mb-3" style={{ color: '#2d362f' }}>My Cart</h2>
      {products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 12
        }}>
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  )
}

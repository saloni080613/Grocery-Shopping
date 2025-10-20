import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

/**
 * A card component specifically for displaying a product in the admin panel.
 * It includes Edit and Delete actions.
 */
function AdminProductCard({ product, onEdit, onDelete }) {
  return (
    <article style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      overflow: 'hidden',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
    }}>
      <div style={{ aspectRatio: '4 / 3', background: '#f7f7f7' }}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ display: 'grid', placeItems: 'center', height: '100%', color: '#aaa' }}>No Image</div>
        )}
      </div>
      <div style={{ padding: 12, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontWeight: 600, fontSize: '1rem' }}>{product.name}</div>
        <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{product.category}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>₹{product.price.toFixed(2)}</span>
          <span style={{
            fontSize: 12,
            fontWeight: 500,
            color: '#fff',
            background: product.inStock ? '#28a745' : '#dc3545',
            padding: '2px 8px',
            borderRadius: 4
          }}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
      <div style={{
        display: 'flex',
        borderTop: '1px solid #eee',
      }}>
        <button
          onClick={onEdit}
          aria-label={`Edit ${product.name}`}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            borderRight: '1px solid #eee',
            padding: '10px',
            cursor: 'pointer',
            color: '#007bff'
          }}
        >
          <FaEdit /> Edit
        </button>
        <button
          onClick={onDelete}
          aria-label={`Delete ${product.name}`}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            padding: '10px',
            cursor: 'pointer',
            color: '#dc3545'
          }}
        >
          <FaTrash /> Delete
        </button>
      </div>
    </article>
  );
}

/**
 * The main page for managing products in the admin panel.
 */
export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const adminId = searchParams.get('adminId');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products/list");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        setError(e.message);
        toast.error(`Failed to fetch products: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    navigate(`/admin/products/edit/${productId}?adminId=${adminId || ""}`);
  };

  const handleDelete = async (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      try {
        const response = await fetch(`/api/admin/products/${productId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Failed to delete product.');
        }

        toast.success(`Product "${productName}" deleted successfully.`);
        // Refresh the list by removing the deleted product from state
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));

      } catch (error) {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const handleAddNew = () => {
    navigate(`/admin/products/add?adminId=${adminId || ''}`);
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading products...</div>;
  if (error) return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0 }}>Manage Products</h1>
        <button
          onClick={handleAddNew}
          style={{
            background: '#0da308', color: '#fff', border: 'none', padding: '10px 16px',
            borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: '1rem'
          }}
        >
          <FaPlus /> Add New Product
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '1.5rem'
      }}>
        {products.map(p => (
          <AdminProductCard
            key={p.id}
            product={p}
            onEdit={() => handleEdit(p.id)}
            onDelete={() => handleDelete(p.id, p.name)}
          />
        ))}
      </div>
    </div>
  );
}

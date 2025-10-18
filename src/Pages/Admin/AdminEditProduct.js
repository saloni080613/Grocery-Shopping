import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const formStyle = {
  background: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  maxWidth: '600px',
  margin: '2rem auto',
};

const inputGroupStyle = {
  marginBottom: '1.5rem',
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: 600,
  color: '#333',
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '1rem',
};

const buttonStyle = {
  background: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '0.75rem 1.5rem',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 600,
  width: '100%',
};

export default function AdminEditProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const adminId = searchParams.get('adminId');

  const [product, setProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the existing /api/products/details endpoint with a POST request
        const [productResponse, categoriesResponse] = await Promise.all([
          fetch(`/api/products/details`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([parseInt(productId, 10)]) // Send product ID in an array
          }),
          fetch('/api/categories/name')
        ]);

        if (!productResponse.ok) {
          throw new Error('Failed to fetch product details.');
        }
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          if (Array.isArray(categoriesData)) setCategories(categoriesData);
        }

        const productData = await productResponse.json();
        // The endpoint returns an array, so we take the first element
        if (productData && productData.length > 0) {
          setProduct(productData[0]);
        } else {
          throw new Error('Product not found.');
        }
      } catch (error) {
        toast.error(error.message);
        navigate(`/admin/products?adminId=${adminId || ''}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, navigate, adminId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/products/update/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...product,
          price: parseFloat(product.price),
          stock: parseInt(product.stock, 10) || 0,
          inStock: (parseInt(product.stock, 10) || 0) > 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to update product');
      }

      toast.success('Product updated successfully!');
      navigate(`/admin/products?adminId=${adminId || ''}`);

    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading product details...</div>;
  if (!product) return <div style={{ padding: '2rem', textAlign: 'center' }}>Product not found.</div>;

  return (
    <div style={{ padding: '1.5rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Edit Product</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="name" style={labelStyle}>Product Name</label>
          <input type="text" id="name" name="name" value={product.name} onChange={handleChange} style={inputStyle} required />
        </div>

        <div style={inputGroupStyle}>
          <label htmlFor="category" style={labelStyle}>Category</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            style={inputStyle}
            required
          >
            <option value="" disabled>-- Select a category --</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div style={inputGroupStyle}>
          <label htmlFor="price" style={labelStyle}>Price (₹)</label>
          <input type="number" id="price" name="price" value={product.price} onChange={handleChange} style={inputStyle} min="0" step="0.01" required />
        </div>

        <div style={inputGroupStyle}>
          <label htmlFor="image" style={labelStyle}>Image URL</label>
          <input type="text" id="image" name="image" value={product.image} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={inputGroupStyle}>
          <label htmlFor="stock" style={labelStyle}>Stock Quantity</label>
          <input type="number" id="stock" name="stock" value={product.stock} onChange={handleChange} style={inputStyle} min="0" required />
        </div>

        <button type="submit" style={buttonStyle} disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
}
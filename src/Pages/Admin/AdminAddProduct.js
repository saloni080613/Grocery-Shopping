import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  background: '#0da308',
  color: '#fff',
  border: 'none',
  padding: '0.75rem 1.5rem',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 600,
  width: '100%',
};

export default function AdminAddProduct() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const adminId = searchParams.get('adminId');

  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    image: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories/name');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setCategories(data);
          }
        } else {
          toast.error('Could not fetch category suggestions.');
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; // Keep 'checked' for potential future use, but it's unused now.
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddNewCategory = async () => {
    const newCategory = window.prompt("Enter the name for the new category:");
    if (newCategory && newCategory.trim() !== "") {
      const trimmedCategory = newCategory.trim();
      if (!categories.includes(trimmedCategory)) {
        // --- Step 1: Save the new category to the backend ---
        try {
          const response = await fetch('/api/categories/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: trimmedCategory }),
          });

          if (!response.ok) {
            throw new Error('Failed to save the new category.');
          }

          // --- Step 2: If successful, update the UI ---
          setCategories(prev => [...prev, trimmedCategory].sort());
          setProduct(prev => ({ ...prev, category: trimmedCategory }));
          toast.success(`New category "${trimmedCategory}" created and selected.`);

        } catch (error) {
          console.error('Error adding new category:', error);
          toast.error(error.message);
        }
      } else {
        // If it already exists, just select it
        setProduct(prev => ({ ...prev, category: trimmedCategory }));
        toast.info(`Category "${trimmedCategory}" already exists. It has been selected for you.`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!product.name || !product.category || !product.price || !product.stock) {
      toast.error('Please fill in all required fields (Name, Category, Price).');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...product,
          price: parseFloat(product.price), // Ensure price is a number
          stock: parseInt(product.stock, 10) || 0, // Ensure stock is a number, default to 0
          inStock: (parseInt(product.stock, 10) || 0) > 0, // Derive inStock status
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to add product');
      }

      toast.success('Product added successfully!');
      navigate(`/admin/products?adminId=${adminId || ''}`);

    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Add New Product</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="name" style={labelStyle}>Product Name</label>
          <input type="text" id="name" name="name" value={product.name} onChange={handleChange} style={inputStyle} required />
        </div>

        <div style={inputGroupStyle}>
          <label htmlFor="category" style={labelStyle}>Category</label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              style={{ ...inputStyle, flex: 1 }}
              required
            >
              <option value="" disabled>-- Select a category --</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddNewCategory}
              style={{ ...buttonStyle, width: 'auto', background: '#555' }}
            >
              New
            </button>
          </div>
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
          {isSubmitting ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}
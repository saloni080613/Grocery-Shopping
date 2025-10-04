
import React, { useMemo, useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';

// const DEMO_PRODUCTS = [
//   { id: 1, name: 'Fresh Apples', category: 'Fruits', price: 2.99, inStock: true, image: '/grocery1.jpg' },
//   { id: 2, name: 'Whole Milk', category: 'Dairy', price: 3.49, inStock: true, image: '/grocery2.jpg' },
//   { id: 3, name: 'Brown Bread', category: 'Bakery', price: 1.99, inStock: false, image: '/grocery3.jpg' },
//   { id: 4, name: 'Spinach Bunch', category: 'Vegetables', price: 1.49, inStock: true, image: '/grocery4.png' },
//   { id: 5, name: 'Cheddar Cheese', category: 'Dairy', price: 4.99, inStock: true, image: '/_veggie.png' },
// ];

// // Demo categories array to mirror future Categories table
// const DEMO_CATEGORIES = [
//   'Fruits',
//   'Dairy',
//   'Bakery',
//   'Vegetables',
// ];

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

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('relevance'); // 'name-asc' | 'price-asc' | 'price-desc' | 'rating-desc'
  const [wishlistIds, setWishlistIds] = useState([]);
    const [products, setProducts] = useState([]);
  const [categories_name, setCategories] = useState([]);

  const [loading, setLoading] = useState(true); // To show a loading message
  const [error, setError] = useState(null); 
    useEffect(() => {
     
     const fetchUsers = async () => {
         try {
             const response = await fetch('/api/products/list');
             
            
             if (!response.ok) {
                 throw new Error(`HTTP error! status: ${response.status}`);
             }
 
             const data = await response.json();
             setProducts(data); 
         } catch (e) {
             setError(e.message); 
         } finally {
             setLoading(false); 
         }
     };
     fetchUsers(); 
}, []);

useEffect(() => {
     
     const fetchUsers = async () => {
         try {
             const response = await fetch('/api/categories/name');
             
            
             if (!response.ok) {
                 throw new Error(`HTTP error! status: ${response.status}`);
             }
 
             const data = await response.json();
             setCategories(data); 
         } catch (e) {
             setError(e.message); 
         } finally {
             setLoading(false); 
         }
     };
     fetchUsers(); 
}, []);




  const categories = categories_name;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const minP = priceMin === '' ? Number.NEGATIVE_INFINITY : Number(priceMin);
    const maxP = priceMax === '' ? Number.POSITIVE_INFINITY : Number(priceMax);
    
    let items = products.filter(p => {
      const matchesQuery = q.length === 0
        ? true
        : (p.name + ' ' + p.category).toLowerCase().includes(q);
      const matchesCat = selectedCategories.length === 0
        ? true
        : selectedCategories.includes(p.category);
      const matchesPrice = p.price >= minP && p.price <= maxP;
    
      const matchesStock = inStockOnly ? p.inStock : true;

      return matchesQuery && matchesCat && matchesPrice  && matchesStock;
    });

    switch (sortBy) {
      case 'name-asc':
        items.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'price-asc':
        items.sort((a, b) => a.price - b.price); break;
      case 'price-desc':
        items.sort((a, b) => b.price - a.price); break;
      
      default:
        // relevance: keep natural order or simple heuristic
        if (q) {
          items.sort((a, b) => {
            const ai = a.name.toLowerCase().indexOf(q);
            const bi = b.name.toLowerCase().indexOf(q);
            return (ai === -1 ? 9999 : ai) - (bi === -1 ? 9999 : bi);
          });
        }
        break;
    }

    return items;
  }, [query, selectedCategories, priceMin, priceMax, inStockOnly, sortBy]);

 
  if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>Error fetching users: {error}</p>;
    }

  function toggleCategory(cat) {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  }

  function toggleWishlist(productId) {
    setWishlistIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  }

  function handleAddToCart(product) {
    // Replace with actual cart logic/integration later
    // eslint-disable-next-line no-console
    console.log('Add to cart:', product);
  }

  function handleOrderNow(product) {
    // Navigate to Order page with product id as query param
    navigate(`/Order?productId=${product.id}`);
  }

   

  return (
    <section style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16, padding: 16 }}>
      {/* Left: Filters */}
      <aside aria-label="Filters" style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, background: '#fff' }}>
        <h2 style={{ margin: 0, marginBottom: 12, fontSize: 18 }}>Filters</h2>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Categories</div>
          <div style={{ display: 'grid', gap: 6 }}>
            {categories.map(cat => (
              <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Price</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="number"
              min="0"
              placeholder="Min"
              value={priceMin}
              onChange={e => setPriceMin(e.target.value)}
              style={{ width: '100%' }}
            />
            <input
              type="number"
              min="0"
              placeholder="Max"
              value={priceMax}
              onChange={e => setPriceMax(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        

        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} />
          <span>In stock only</span>
        </label>

        <hr style={{ margin: '16px 0' }} />

        <div>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Sort by</div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: '100%' }}>
            <option value="relevance">Relevance</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            
          </select>
        </div>
      </aside>

      {/* Right: Search + Results */}
      <div>
        <div style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          marginBottom: 12,
          position: 'sticky',
          top: 0,
          background: 'transparent',
          paddingTop: 4,
          zIndex: 1
        }}>
          <input
            type="search"
            placeholder="Search products (name or category)…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ flex: 1, padding: '0.6rem 0.75rem' }}
            aria-label="Search products"
          />
        </div>

        {filtered.length === 0 ? (
          <p>No products found. Try adjusting filters.</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 12
          }}>
            {filtered.map(p => (
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
        )}
      </div>
    </section>
  );
}

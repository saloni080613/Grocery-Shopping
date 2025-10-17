import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation, } from "react-router-dom";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import toast from "react-hot-toast";

function ProductCard({
  product,
  wishlisted,
  onToggleWishlist,
  onAddToCart,
  onOrderNow,
}) {
  return (
    <article
      style={{
        border: "1px solid #eee",
        borderRadius: 8,
        overflow: "hidden",
        background: "#fff",
        position: "relative",
      }}
    >
      <button
        onClick={onToggleWishlist}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          border: "none",
          background: "rgba(255,255,255,0.9)",
          borderRadius: 999,
          width: 36,
          height: 36,
          display: "grid",
          placeItems: "center",
          boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
          cursor: "pointer",
        }}
      >
        {wishlisted ? (
          <IoHeart style={{ color: "#e53935", fontSize: 20 }} />
        ) : (
          <IoHeartOutline style={{ color: "#3a3d40", fontSize: 20 }} />
        )}
      </button>
      <div style={{ aspectRatio: "4 / 3", background: "#f7f7f7" }}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : null}
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ fontWeight: 600 }}>{product.name}</div>
        <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
          {product.category}
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <span style={{ fontWeight: 700 }}>₹{product.price.toFixed(2)}</span>

          {!product.inStock && (
            <span style={{ fontSize: 12, color: "crimson" }}>Out of stock</span>
          )}
        </div>
        <div
          style={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <button
            onClick={onAddToCart}
            disabled={!product.inStock}
            style={{
              background: "#0da308",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: 6,
              cursor: product.inStock ? "pointer" : "not-allowed",
              opacity: product.inStock ? 1 : 0.7,
              width: "100%",
            }}
          >
            Add to cart
          </button>
          <button
            onClick={onOrderNow}
            disabled={!product.inStock}
            style={{
              background: "#043b0d",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: 6,
              cursor: product.inStock ? "pointer" : "not-allowed",
              opacity: product.inStock ? 1 : 0.7,
              width: "100%",
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
  const location = useLocation();
  const navigate = useNavigate();
  const [wishlistIds, setWishlistIds] = useState([]);
  const [PRODUCTS, setPRODUCTS] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const fetchWishlist = useCallback(async () => {
    const queryParams = new URLSearchParams(location.search);
    const customerId = queryParams.get("customerId");

    if (customerId) {
      try {
        const response = await fetch(
          `/api/wishlist/products?customerId=${customerId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setWishlistIds(data);
        } else {
          setWishlistIds([]);
        }
      } catch (e) {
        console.error("Failed to fetch wishlist:", e.message);
       
        setWishlistIds([]);
      }
    } else {
      // If there's no customer, ensure the wishlist is empty
      setWishlistIds([]);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/products/list");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPRODUCTS(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch both products and the initial wishlist
    Promise.all([fetchUsers(), fetchWishlist()]);

  }, [location.search, fetchWishlist]);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching users: {error}</p>;
  }

  const toggleWishlist = async (productId) => {
    const queryParams = new URLSearchParams(location.search);
    const customerId = queryParams.get("customerId");

    if (!customerId) {
      toast.error("Please log in to modify your wishlist.");
      navigate("/Login");
      return;
    }

    const wishlistRequest = {
      customerId: parseInt(customerId),
      productId: productId,
    };

    try {
      const response = await fetch("/api/wishlist/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wishlistRequest),
      });

      if (response.ok) {
        const message = await response.text();
        toast.success(message); // Show "Added to wishlist" or "Removed from wishlist"
        // Refetch the wishlist to get the latest state from the database
        await fetchWishlist();
      } else {
        const errorText = await response.text();
        toast.error(`Failed to update wishlist: ${errorText}`);
      }
    } catch (error) {
      console.error("An error occurred while toggling wishlist:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleAddToCart = async (product) => {
    const queryParams = new URLSearchParams(location.search);
    const customerId = queryParams.get("customerId");

    if (!customerId) {
      toast.error("Please log in to add items to your cart.");
      navigate("/Login");
      return;
    }

    const addToCartRequest = {
      customerId: parseInt(customerId),
      productId: product.id,
    };

    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addToCartRequest),
      });

      if (response.ok) {
        toast.success(`${product.name} has been added to your cart!`);
      } else {
        const errorText = await response.text();
        toast.error(`Failed to add to cart: ${errorText}`);
      }
    } catch (error) {
      console.error("An error occurred while adding to cart:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  function handleOrderNow(product) {
    const queryParams = new URLSearchParams(location.search);
    const customerId = queryParams.get("customerId");
    // Navigate to Order page with product id as query param
    navigate(`/Order?productId=${product.id}${customerId ? `&customerId=${customerId}` : ''}`);
  }

  return (
    <div>
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
              <h3 className="mb-4" style={{ color: "#0da308" }}>
                Freshness at your doorstep
              </h3>

              <h1 className="fw-bold mb-4" style={{ color: "#2d362f" }}>
                shop smart, shop online.
              </h1>

              <p className="col-10 mb-4" style={{ color: "#3a3d40" }}>
                <i>
                  "Freshness and convenience, all in one place. Order your
                  favorite groceries online and have them delivered right to
                  your doorstep.
                  <br />
                  Eat well, live well, and shop smart with us."
                </i>
              </p>
              <Link to={`/Search${location.search}`} className="btn btn-dark ">
                Shop Now{" "}
              </Link>
            </div>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>

      <div className="container-fluid py-5" style={{ background: "#f8f9fa" }}>
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <h2 className="text-center mb-2" style={{ color: "#2d362f" }}>
                Featured Products
              </h2>
              
            </div>
          </div>
          <div className="row">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 16,
                width: "100%",
              }}
            >
              {PRODUCTS.map((product) => (
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

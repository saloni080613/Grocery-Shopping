import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

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
      <div style={{ padding: 12, flexGrow: 1, display: "flex", flexDirection: "column" }}>
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
            marginTop: "auto",
            paddingTop: 12,
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
            {product.inStock ? "Add to Cart" : "Out of Stock"}
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
export default function Wishlist() {
  const location = useLocation();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const customerId = queryParams.get("customerId");


  useEffect(() => {
    if (!customerId) {
      
      setLoading(false);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const response = await fetch(`/api/wishlist/${customerId}`);
        if (!response.ok) throw new Error("Failed to fetch wishlist");
        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error(error);
        setMessage("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [customerId]);

  const handleRemove = async (productId) => {
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
        toast.success(message);
        setWishlist((prev) => prev.filter((item) => item.id !== productId));
      } else {
        const errorText = await response.text();
        toast.error(`Failed to update wishlist: ${errorText}`);
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("An error occurred while removing the product.");
    }
  };

  const handleAddToCart = async (product) => {
    if (!customerId) {
      toast.error("Please log in to add items to your cart.");
      navigate("/login");
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
    // Navigate to Order page with product id as query param
    navigate(`/Order?productId=${product.id}${customerId ? `&customerId=${customerId}` : ''}`);
  }

   if (!customerId) {
    return <div style={{ background: '#fff', padding: '24px', borderRadius: 8, textAlign: 'center' }}>
      <p>To access wishlist, please login first.</p>
          <button onClick={() => navigate(`/login`)} className="btn btn-dark">
            please login to continue
          </button>
        </div>;
  }

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading...</p>
      </div>
    );

  if (message)
    return <p className="text-center mt-5 fs-5 text-muted">{message}</p>;

  return (
    <section style={{ padding: "24px", background: "#f8f9fa" }}>
      <h2 className="fw-bold mb-3" style={{ color: "#2d362f" }}>
        My Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <div
          style={{
            background: "#fff",
            padding: "24px",
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <p>Your wishlist is empty.</p>
          <Button
            variant="dark"
            onClick={() => navigate(`/search${location.search}`)}
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <Container className="my-5">
          <Row className="g-4">
            {wishlist.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  product={product}
                  wishlisted={true} // All items on wishlist page are wishlisted
                  onToggleWishlist={() => handleRemove(product.id)} // Heart icon now removes
                  onAddToCart={() => handleAddToCart(product)}
                  onOrderNow={() => handleOrderNow(product)}
                />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </section>
  );
}

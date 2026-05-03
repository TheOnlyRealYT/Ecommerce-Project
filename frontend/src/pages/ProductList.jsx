import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { useCart } from "../context/CartContext.jsx";
import { getAccessToken, removeToken } from "../utils/auth.js";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cartItems } = useCart();

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    fetch(`${BASEURL}api/products/`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="min-h-screen py-16 px-6"
      style={{
        background: "linear-gradient(160deg, #fdf8f0 0%, #f5f0e8 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="max-w-5xl mx-auto mb-12 justify-between">
        <div className="flex gap-4 justify-between">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-600 mb-2">
            Our Collection
          </p>
          {getAccessToken() ? (
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-600 mb-2">
              <Link onClick={removeToken} to="/login/">
                Logout
              </Link>
            </p>
          ) : (
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-600 mb-2">
              <Link to="/login/">Login</Link>
            </p>
          )}
        </div>
        <div className="flex items-center gap-4 justify-between">
          <h1 className="text-5xl font-black text-stone-800 leading-none playfair-display">
            Featured Products
          </h1>
          <div>
            <Link to="/cart/">
              {cartCount > 0 && (
                <span className="relative inline-flex">
                  <span className="absolute -top-2 -right-2 bg-[#d97706] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                </span>
              )}
              <svg
                className="w-6 h-6 text-neutral-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
        <div className="mt-4 h-0.5 w-16 bg-amber-400 rounded-full" />
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {error && (
          <p className="col-span-3 text-center text-red-400">{error}</p>
        )}
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}

export default ProductList;

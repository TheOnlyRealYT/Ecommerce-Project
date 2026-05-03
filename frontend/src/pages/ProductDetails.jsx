import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import { getAccessToken, removeToken } from "../utils/auth.js";

export default function ProductDetails() {
  const { id } = useParams();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { cartItems, AddToCart } = useCart();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navigate = useNavigate()

  const handleAdd = (id) =>{
    getAccessToken() ? AddToCart(id) : navigate('/login')
  };

  useEffect(() => {
    fetch(`${BASEURL}api/products/${id}/`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch product.");
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, BASEURL]);

  return (
    <div
      className="min-h-screen py-16 px-6"
      style={{
        background: "linear-gradient(160deg, #fdf8f0 0%, #f5f0e8 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="max-w-5xl mx-auto mb-12 justify-between">
        <div className="flex gap-4 justify-between">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-600 mb-2">
            <Link to='/'>
              Back To Collection
            </Link>
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
            One of our finest..
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

        {/* Loading */}
        {loading && (
          <div className="grid md:grid-cols-2 gap-12 animate-pulse">
            <div className="bg-stone-200 rounded-2xl h-96" />
            <div className="space-y-4 pt-4">
              <div className="h-3 bg-stone-200 rounded w-24" />
              <div className="h-8 bg-stone-200 rounded w-3/4" />
              <div className="h-0.5 bg-stone-200 rounded w-16" />
              <div className="h-4 bg-stone-200 rounded w-full" />
              <div className="h-4 bg-stone-200 rounded w-5/6" />
              <div className="h-10 bg-stone-200 rounded w-32 mt-8" />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-24 text-red-400 font-medium">
            {error}
          </div>
        )}

        {/* Not found */}
        {!loading && !error && !product && (
          <div className="text-center py-24 text-stone-400 font-medium">
            Product not found.
          </div>
        )}

        {/* Product */}
        {product && (
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div
              className="bg-white rounded-2xl overflow-hidden flex items-center justify-center p-8"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
            >
              <img
                src={`${BASEURL}${product.image}`}
                alt={product.name}
                className="object-contain w-full max-h-80 transition-tranform duration-400 ease-in-out hover:scale-104 scale-100"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              {product.category?.name && (
                <span className="inline-block mb-3 px-2 py-0.5 text-xs font-semibold tracking-widest uppercase rounded-full bg-amber-100 text-amber-800 border border-amber-200 w-fit">
                  {product.category.name}
                </span>
              )}

              <h1
                className="text-4xl font-black text-stone-800 leading-tight mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {product.name}
              </h1>

              <div className="h-0.5 w-16 bg-amber-400 rounded-full mb-5" />

              <p className="text-stone-500 leading-relaxed mb-8 whitespace-pre-line">
                {product.discription}
              </p>

              <div className="flex items-center gap-6">
                <span
                  className="text-4xl font-black text-stone-800"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    letterSpacing: "-1px",
                  }}
                >
                  ${product.price}
                </span>
                <button
                  onClick={() => handleAdd(product.id)}
                  className="cursor-pointer px-6 py-3 rounded-xl text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:opacity-80 bg-linear-to-r from-[#d97706] via-[#e0841a] to-[#b45309]"
                >
                  Add to Cart
                </button>
              </div>
              <p className="text-xs text-stone-500 mt-6 tracking-wide">
                Added{" "}
                {new Date(product.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { getAccessToken, removeToken } from "../utils/auth.js";

const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

const Badge = ({ children }) => (
  <span className="inline-block px-2 py-0.5 text-xs font-semibold tracking-widest uppercase rounded-full bg-amber-100 text-amber-800 border border-amber-200">
    {children}
  </span>
);

export default function ProductCard({ product }){
  const [hovered, setHovered] = useState(false);
  const { AddToCart } = useCart();
  const navigate = useNavigate()

  const handleAdd = (id) =>{
    getAccessToken() ? AddToCart(id) : navigate('/login')
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition:
          "transform 0.3s cubic-bezier(.22,.68,0,1.2), box-shadow 0.3s ease",
        boxShadow: hovered
          ? "0 20px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07)"
          : "0 2px 12px rgba(0,0,0,0.07)",
      }}
      className="bg-white rounded-2xl overflow-hidden flex flex-col border border-stone-100"
    >
      <Link to={`/products/${product.id}/`}>
        {/* Image */}
        <div className="relative bg-stone-50 h-52 flex items-center justify-center overflow-hidden group">
          {product.image ? (
            <img
              src={`${BASEURL}${product.image}`}
              alt={product.name}
              className="object-contain h-full w-full p-6 transition-transform duration-400 ease-in-out group-hover:scale-105"
            />
          ) : (
            <div className="text-stone-300 text-5xl select-none">📦</div>
          )}
          <div className="absolute top-3 left-3">
            <Badge>{product.category?.name || "General"}</Badge>
          </div>
        </div>
      </Link>
      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <Link to={`/products/${product.id}/`}>
          <h2 className="text-lg font-bold text-stone-800 leading-snug mb-1 playfair-display">
            {product.name}
          </h2>
          <p className="text-sm text-stone-400 flex-1 mb-4 leading-relaxed">
            {product.discription}
          </p>
        </Link>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-black text-stone-800 tracking-[-0.5px] playfair-display">
            ${product.price}
          </span>
          <button 
          onClick = {() => handleAdd(product.id)}
          className="px-4 py-2 rounded-xl text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:opacity-80 bg-linear-to-r from-[#d97706] via-[#e0841a] to-[#b45309]">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
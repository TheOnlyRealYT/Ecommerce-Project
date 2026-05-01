import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";

export default function CheckOut() {
  const { cartItems, total, ClearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  return (
    <div
      className="min-h-screen py-16 px-6"
      style={{
        background: "linear-gradient(160deg, #fdf8f0 0%, #f5f0e8 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="max-w-5xl mx-auto mb-12">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-600 mb-2">
          <Link to='/cart/'>
            Return to cart
          </Link>
        </p>
        <h1 className="text-5xl font-black text-stone-800 leading-none playfair-display">
          Check Out
        </h1>
        <div className="mt-4 h-0.5 w-16 bg-amber-400 rounded-full" />
      </div>

    </div>
  );
}

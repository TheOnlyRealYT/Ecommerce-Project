import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { authFetch } from "../utils/auth.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CheckOut() {
  const navigate = useNavigate();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const { ClearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment_method: "COD",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const response = await authFetch(`${BASEURL}api/orders/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Order placed successfully!");
        ClearCart();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage(data.error || "Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setMessage(error.message || "An error occurred while placing the order.");
    } finally {
      setIsProcessing(false);
    }
  };

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
          <Link to="/cart/">Return to cart</Link>
        </p>
        <h1 className="text-5xl font-black text-stone-800 leading-none playfair-display">
          Check Out
        </h1>
        <div className="mt-4 h-0.5 w-16 bg-amber-400 rounded-full" />
      </div>
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <form className="w-[80%] mx-auto" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name='name'
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                name='address'
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                required
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name='phone'
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <select
                name='payment_method'
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                value={form.payment_method}
                onChange={(e) => setForm({ ...form, payment_method: e.target.value })}
              >
                <option value="COD">Cash on Delivery</option>
                <option value="Card">Credit/Debit Card</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-amber-500 text-white font-semibold py-3 rounded-md hover:bg-amber-600 transition-colors disabled:opacity-50"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </button>
            { message && <p className="mt-4 text-center text-sm text-green-600">{message}</p> }
        </form>
      </div>
    </div>
  );
}

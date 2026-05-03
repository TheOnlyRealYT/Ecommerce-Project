import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth";
import { Link } from "react-router-dom";

export default function Signup() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [message, setMessage] = useState("");
  const navigater = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    form.username = form.username.toLowerCase();
    try {
      const response = await fetch(`${BASE}api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const errorData = await response.json();
        errorData.non_field_errors ? setMessage(errorData.non_field_errors[0]) : setMessage(errorData.username[0])
        return;
      }
      const data = await response.json();
      setToken(data);
      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => {
        navigater("/login/");
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage("An error occurred. Please try again.");
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
        <h1 className="text-5xl font-black text-stone-800 leading-none playfair-display">
          Signup
        </h1>
        <div className="mt-4 h-0.5 w-16 bg-amber-400 rounded-full" />
      </div>
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <form className="w-[80%] mx-auto" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="Email"
              name="email"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="password2"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
              value={form.password2}
              onChange={(e) => setForm({ ...form, password2: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 text-white font-semibold py-3 rounded-md hover:bg-amber-600 transition-colors disabled:opacity-50"
          >
            Signup
          </button>
          {message && (
            <p className="mt-4 text-center text-sm text-green-600">{message}</p>
          )}
        </form>
        <p className="pt-5">
          Already have an account? <Link to='/login/'>Log-in!</Link>
        </p>
      </div>
    </div>
  );
}

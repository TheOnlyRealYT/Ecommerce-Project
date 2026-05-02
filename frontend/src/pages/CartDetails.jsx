import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

export default function ProductDetails() {
  const {
    cartItems,
    total,
    AddToCart,
    RemoveFromCart,
    UpdateCartItemQuantity,
    ClearCart,
  } = useCart();

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
          <Link to='/'>
            Return to products
          </Link>
        </p>
        <h1 className="text-5xl font-black text-stone-800 leading-none playfair-display">
          Your cart
        </h1>
        <div className="mt-4 h-0.5 w-16 bg-amber-400 rounded-full" />
      </div>
      {cartItems.length === 0 && (
        <p className="text-center text-stone-600 italic">Your cart is empty.</p>
      )}
      <div className="max-w-5xl mx-auto flex-box">
        {cartItems
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrement={UpdateCartItemQuantity}
              onDecrement={UpdateCartItemQuantity}
              onRemove={RemoveFromCart}
            />
          ))}
      </div>
      <div className="max-w-5xl mx-auto mt-12">
        <div className="mb-4 h-0.5 w-16 bg-amber-400 rounded-full" />
        <div className="grid grid-cols-2 justify-between items-center gap-6">
          <p className="text-lg text-stone-700 playfair-display">
            total:{" "}
            <span className="col text-lg font-black mt-0.5 tracking-[-0.5px] playfair-display">
              ${total}
            </span>
          </p>
          <div className="flex justify-end gap-10 align-center">
            <button
              onClick={ClearCart}
              className="col px-4 py-2 rounded-xl text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:opacity-80 bg-linear-to-r from-[#d97706] via-[#e0841a] to-[#b45309]"
            >
              Clear Cart
            </button>
            {cartItems.length === 0 ? (
              <p
                className="cursor-not-allowed col px-4 py-2 rounded-xl text-sm font-semibold tracking-wide text-white bg-linear-to-r from-[#d97706] via-[#e0841a] to-[#b45309]"
              >
                No Items in Cart...
              </p>
            ) : (
              <Link
                to="/checkout/"
                className="col px-4 py-2 rounded-xl text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:opacity-80 bg-linear-to-r from-[#d97706] via-[#e0841a] to-[#b45309]"
              >
                Proceed to Checkout
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

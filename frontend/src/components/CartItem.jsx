import { Link } from 'react-router-dom';

export default function CartItem({ item, onIncrement, onDecrement, onRemove }) {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  return (
    <div
      className="bg-white rounded-2xl hover:scale-101 transition-transform ease-in-out w-full overflow-hproductden flex items-center gap-5 px-5 py-4 border border-stone-100 my-5"
      style={{
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Image */}
      <Link to={`/products/${item.product}/`}>
      <div className="bg-stone-50 rounded-xl flex items-center justify-center h-20 w-20 shrink-0 overflow-hproductden p-2">
        {item.product_image ? (
          <img
            src={`${BASEURL}${item.product_image}`}
            alt={item.name}
            className="object-contain h-full w-full"
          />
        ) : (
          <span className="text-3xl">📦</span>
        )}
      </div>
      </Link>

      {/* Name & Category */}
      <div className="flex-1 min-w-0">
        <Link to={`/products/${item.product}/`}>
        <h3 className="text-base font-bold text-stone-800 truncate playfair-display">
          {item.product_name}
        </h3>
        <p className="text-lg font-black text-stone-700 mt-0.5 tracking-[-0.5px] playfair-display">
          ${(parseFloat(item.product_price) * item.quantity).toFixed(2)}
        </p>
        </Link>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => onDecrement(item.id, item.quantity - 1)}
          className="h-8 w-8 rounded-lg border border-stone-200 text-stone-500 font-bold text-lg flex items-center justify-center hover:bg-stone-100 transition-colors"
        >
          −
        </button>
        <span className="w-6 text-center text-sm font-semibold text-stone-700">
          {item.quantity}
        </span>
        <button
          onClick={() => onIncrement(item.id, item.quantity + 1)}
          className="h-8 w-8 rounded-lg text-white font-bold text-lg flex items-center justify-center transition-opacity hover:opacity-85"
          style={{ background: "linear-gradient(135deg, #d97706, #b45309)" }}
        >
          +
        </button>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(item.id)}
        className="shrink-0 ml-2 h-8 w-8 rounded-lg border border-red-100 text-red-300 flex items-center justify-center hover:bg-red-50 hover:text-red-400 transition-colors text-lg"
        title="Remove item"
      >
        ✕
      </button>
    </div>
  );
}

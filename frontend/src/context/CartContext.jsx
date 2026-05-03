import { createContext, useContext, useState, useEffect, use } from "react";
import { authFetch, getAccessToken } from "../utils/auth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCart = async () => {
    try {
      const response = await authFetch(`${BASEURL}api/cart/`);
      const data = await response.json();
      setCartItems(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);
  
  const UpdateCart = async () => {
    fetchCart();
  };

  //add product to cart
  const AddToCart = async (id) => {
    try {
      const response = await authFetch(`${BASEURL}api/cart/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: id }),
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  //remove product from cart
  const RemoveFromCart = async (id) => {
    try {
      const response = await authFetch(`${BASEURL}api/cart/remove/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_id: id }),
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  //update product quantity in cart
  const UpdateCartItemQuantity = async (id, quantity) => {
    if (quantity <= 0) {
      await RemoveFromCart(id);
      return;
    }
    try {
      const response = await authFetch(`${BASEURL}api/cart/update/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_id: id, quantity }),
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  //clear cart
  const ClearCart = async () => {
    try {
      const response = await authFetch(`${BASEURL}api/cart/clear/`, {
        method: "DELETE",
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const value = { cartItems, total, AddToCart, RemoveFromCart, UpdateCartItemQuantity, ClearCart, UpdateCart };
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
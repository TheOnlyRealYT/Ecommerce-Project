import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import CartDetails from "./pages/CartDetails";
import CheckOut from "./pages/CheckOut";
import Login from "./pages/Login";

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart/" element={<CartDetails />} />
        <Route path="/checkout/" element={<CheckOut />} />
        <Route path="/login/" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App;
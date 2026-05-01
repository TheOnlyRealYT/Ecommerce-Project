import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import CartDetails from "./pages/CartDetails";
import CheckOut from "./pages/CheckOut";

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart/" element={<CartDetails />} />
        <Route path="/checkout/" element={<CheckOut />} />
      </Routes>
    </Router>
  )
}

export default App;
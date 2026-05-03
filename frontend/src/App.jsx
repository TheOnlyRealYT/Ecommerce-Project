import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import CartDetails from "./pages/CartDetails";
import CheckOut from "./pages/CheckOut";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRouter from './components/PrivateRouter'

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route element={<PrivateRouter />}>
          <Route path="/cart/" element={<CartDetails />} />
          <Route path="/checkout/" element={<CheckOut />} />
        </Route>
        <Route path="/login/" element={<Login />} />
        <Route path="/signup/" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App;
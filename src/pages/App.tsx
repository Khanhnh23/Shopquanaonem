import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetail from "../pages/ProductDetail";
import Products from "../pages/Products";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";

function App() {
  return (
    <BrowserRouter>

      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <Routes>

        <Route path="/" element={<Home />} />

        {/* PRODUCTS */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<Products />} />

        {/* OTHER */}
        <Route path="/collection" element={<Home />} />
        <Route path="/sale" element={<Home />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />

      </Routes>

      {/* FOOTER */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;
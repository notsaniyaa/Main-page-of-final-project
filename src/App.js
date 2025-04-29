import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import AboutUs from "./pages/AboutUs";
import { CartProvider } from "./context/cartContext";
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 

function App() {
  return (
    <CartProvider>
      <Router>
        <div style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh"
        }}>
          <Navbar />
          
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />       
              <Route path="/register" element={<Register />} /> 
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

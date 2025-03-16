import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import AboutUs from "./pages/AboutUs"; // Добавили импорт AboutUs
import { CartProvider } from "./context/cartContext"; // Провайдер корзины
import OrderForm from "./pages/OrderForm"; // Импортируем страницу
import Checkout from "./pages/Checkout"; // Убедись, что путь правильный

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-form" element={<OrderForm />} /> {/* Новый маршрут */}
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}
export default App;


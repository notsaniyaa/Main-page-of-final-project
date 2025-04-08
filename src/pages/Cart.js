import React, { useState } from "react";
import { useCart } from "../context/cartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    alert("Order submitted!");
    console.log("Order details:", formData);
    setFormData({ name: "", email: "", address: "", phone: "" });
    setShowForm(false);
  };

  const totalCartPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Your Cart</h2>
        {cart.length === 0 ? (
          <p style={styles.emptyMessage}>Your cart is empty</p>
        ) : (
          <div style={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                <img 
                  src={`/images/${item.image}`} 
                  alt={item.name} 
                  style={styles.image} 
                  onError={(e) => (e.target.src = "/images/default.png")} 
                />
                <div style={styles.details}>
                  <h3>{item.name}</h3>
                  <p style={styles.price}>KZT {item.price} per piece.</p>
                  <div style={styles.controls}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={styles.button}>-</button>
                    <span style={styles.quantity}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={styles.button}>+</button>
                  </div>
                  <p style={styles.totalPrice}>Total: KZT {item.quantity * item.price}</p>
                  <button onClick={() => removeFromCart(item.id)} style={styles.removeButton}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div style={styles.summary}>
            <h3>Total: <span style={styles.totalSum}>KZT {totalCartPrice}</span></h3>
          </div>
        )}

        {cart.length > 0 && !showForm && (
          <button onClick={() => setShowForm(true)} style={styles.orderButton}>
            Place Order
          </button>
        )}

        {showForm && (
          <div style={styles.formContainer}>
            <h3 style={styles.formTitle}>Fill in your order details</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div style={styles.inputGroup}>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div style={styles.inputGroup}>
                <label>Delivery Address:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
              </div>
              <div style={styles.inputGroup}>
                <label>Phone:</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>

              <button type="submit" style={styles.submitButton}>Submit Order</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: { display: "flex", flexDirection: "column", minHeight: "100vh" },
  container: { padding: "20px", maxWidth: "800px", margin: "auto", flex: "1" },
  heading: { textAlign: "center", marginBottom: "20px", fontSize: "24px", fontWeight: "bold", color: "#333" },
  emptyMessage: { textAlign: "center", fontSize: "18px", color: "#777" },
  cartItems: { display: "flex", flexDirection: "column", gap: "15px" },
  cartItem: { display: "flex", alignItems: "center", background: "#f8f8f8", padding: "10px", borderRadius: "8px" },
  image: { width: "80px", height: "80px", borderRadius: "10px", objectFit: "cover", marginRight: "15px" },
  details: { flex: 1 },
  price: { fontWeight: "bold", color: "#333" },
  totalPrice: { fontWeight: "bold", color: "#ff6b81", marginTop: "5px" },
  controls: { display: "flex", alignItems: "center", gap: "10px" },
  button: { padding: "5px 10px", fontSize: "16px", cursor: "pointer" },
  quantity: { fontSize: "18px", fontWeight: "bold" },
  removeButton: { background: "#ff4d4d", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "5px" },
  summary: { textAlign: "center", marginTop: "20px", fontSize: "18px", fontWeight: "bold" },
  totalSum: { color: "#ff6b81", fontSize: "22px" },
  orderButton: { background: "#ff6b81", color: "white", border: "none", padding: "12px 18px", cursor: "pointer", borderRadius: "5px", marginTop: "20px", fontSize: "16px", fontWeight: "bold" },
  formContainer: { marginTop: "20px", padding: "20px", background: "white", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", maxWidth: "500px", margin: "auto" },
  formTitle: { textAlign: "center", marginBottom: "15px", fontSize: "20px", fontWeight: "bold", color: "#ff6b81" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "5px" },
  submitButton: { background: "#ff6b81", color: "white", border: "none", padding: "12px", cursor: "pointer", borderRadius: "5px", fontSize: "16px", fontWeight: "bold", marginTop: "10px" },
};

export default Cart;


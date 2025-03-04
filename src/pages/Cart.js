import React from "react";
import { useCart } from "../context/cartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

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
                  <p style={styles.price}>${item.price}</p>
                  <div style={styles.controls}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={styles.button}>-</button>
                    <span style={styles.quantity}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={styles.button}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={styles.removeButton}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: { display: "flex", flexDirection: "column", minHeight: "100vh" },
  container: { padding: "20px", maxWidth: "800px", margin: "auto", flex: "1" },
  heading: { textAlign: "center", marginBottom: "20px" },
  emptyMessage: { textAlign: "center", fontSize: "18px", color: "#777" },
  cartItems: { display: "flex", flexDirection: "column", gap: "15px" },
  cartItem: { display: "flex", alignItems: "center", background: "#f8f8f8", padding: "10px", borderRadius: "8px" },
  image: { width: "80px", height: "80px", borderRadius: "10px", objectFit: "cover", marginRight: "15px" },
  details: { flex: 1 },
  price: { fontWeight: "bold", color: "#333" },
  controls: { display: "flex", alignItems: "center", gap: "10px" },
  button: { padding: "5px 10px", fontSize: "16px", cursor: "pointer" },
  quantity: { fontSize: "18px", fontWeight: "bold" },
  removeButton: { background: "#ff4d4d", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "5px" },
  footer: { textAlign: "center", padding: "10px", background: "#333", color: "#fff", marginTop: "auto" } // Фиксируем футер
};

export default Cart;



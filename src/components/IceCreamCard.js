function IceCreamCard({ ice, addToCart }) {
  return (
    <div style={styles.card}>
      <img src={`/images/${ice.image}`} alt={ice.name} style={styles.image} />
      <h3>{ice.name}</h3>
      <p>{ice.price} KZT</p>
      <button onClick={() => addToCart(ice)} style={styles.button}>Add to Cart</button>
    </div>
  );
}

const styles = {
  card: { border: "1px solid #ddd", padding: "15px", borderRadius: "10px", textAlign: "center", background: "#fff", boxShadow: "0 5px 10px rgba(0,0,0,0.1)" },
  image: { width: "100%", borderRadius: "8px" },
  button: { background: "#d9534f", color: "#fff", padding: "8px 15px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }
};

export default IceCreamCard;

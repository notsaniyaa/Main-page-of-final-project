import { useCart } from "../context/cartContext"; 
import iceCreams from "../data/iceCreams";
import { useNavigate } from "react-router-dom"; 

function Home() {
  const { addToCart } = useCart();
  const navigate = useNavigate(); 

  return (
    <div style={styles.container}>

      <div style={styles.bannerSection}>
        <img src="/images/banner.jpg" alt="Ice Cream Shop" style={styles.banner} />
        <div style={styles.bannerText}>
          <h2>Welcome to the Best Ice Cream Shop!</h2>
          <p>Enjoy the finest ice creams made with love 🍦</p>
          <button style={styles.exploreButton} onClick={() => navigate("/about")}>
            Learn More
          </button>
        </div>
      </div>

      <h2 style={styles.title}>🍨 Our Ice Creams 🍨</h2>

      <div style={styles.iceCreamGrid}>
        {iceCreams.map((iceCream) => (
          <div key={iceCream.id} style={styles.card}>
            <img src={`/images/${iceCream.image}`} alt={iceCream.name} style={styles.image} />
            <h3 style={styles.name}>{iceCream.name}</h3>
            <p style={styles.price}>{iceCream.price} KZT</p>
            <button style={styles.button} onClick={() => addToCart(iceCream)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "20px", textAlign: "center" },

  bannerSection: { display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginBottom: "30px" },
  banner: { width: "50%", borderRadius: "10px" },
  bannerText: { maxWidth: "40%", textAlign: "left", fontSize: "18px" },

  exploreButton: {
    background: "#d9534f",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
    marginTop: "10px",
  },

  title: { fontSize: "26px", fontWeight: "bold", color: "#d9534f", marginBottom: "20px" },

  iceCreamGrid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(3, 1fr)", 
    gap: "20px", 
    maxWidth: "800px", 
    margin: "0 auto" 
  },

  card: { 
    padding: "15px", 
    border: "2px solid #ddd", 
    borderRadius: "10px", 
    background: "#fff", 
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)", 
    textAlign: "center", 
    transition: "transform 0.2s" 
  },

  image: { 
    width: "100px", 
    height: "100px", 
    borderRadius: "50%", 
    objectFit: "cover" 
  },

  name: { fontSize: "18px", fontWeight: "bold", margin: "10px 0" },

  price: { color: "#d9534f", fontSize: "16px", fontWeight: "bold" },

  button: { 
    background: "#d9534f", 
    color: "#fff", 
    padding: "8px 12px", 
    border: "none", 
    borderRadius: "5px", 
    cursor: "pointer", 
    fontSize: "16px", 
    transition: "0.3s"
  },
};

export default Home;


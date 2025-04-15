import { FixedSizeGrid as Grid } from "react-window";
import iceCreams from "../data/iceCreams";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";

const COLUMN_COUNT = 4;
const CARD_WIDTH = 240;
const CARD_HEIGHT = 280;

function HomeGridVirtualized({ disableVirtualization = false }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const rowCount = Math.ceil(iceCreams.length / COLUMN_COUNT);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const itemIndex = rowIndex * COLUMN_COUNT + columnIndex;
    if (itemIndex >= iceCreams.length) return null;
    const iceCream = iceCreams[itemIndex];

    return (
      <div data-testid="ice-cream-card" style={{ ...style, padding: "10px", boxSizing: "border-box" }}>
        <div style={styles.card}>
          <img src={`/images/${iceCream.image}`} alt={iceCream.name} style={styles.image} />
          <h3 style={styles.name}>{iceCream.name}</h3>
          <p style={styles.price}>{iceCream.price} KZT</p>
          <button style={styles.button} onClick={() => addToCart(iceCream)}>Add to Cart</button>
        </div>
      </div>
    );
  };

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

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {disableVirtualization ? (
          iceCreams.map((iceCream, index) => (
            <div data-testid="ice-cream-card" key={index} style={{ padding: "10px" }}>
              <div style={styles.card}>
                <img src={`/images/${iceCream.image}`} alt={iceCream.name} style={styles.image} />
                <h3 style={styles.name}>{iceCream.name}</h3>
                <p style={styles.price}>{iceCream.price} KZT</p>
                <button style={styles.button} onClick={() => addToCart(iceCream)}>Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <Grid
            columnCount={COLUMN_COUNT}
            columnWidth={CARD_WIDTH}
            height={600}
            rowCount={rowCount}
            rowHeight={CARD_HEIGHT}
            width={CARD_WIDTH * COLUMN_COUNT}
          >
            {Cell}
          </Grid>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    boxSizing: "border-box",
  },
  bannerSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  banner: {
    width: "100%",
    maxWidth: "500px",
    borderRadius: "10px",
  },
  bannerText: {
    maxWidth: "500px",
    textAlign: "left",
    fontSize: "18px",
  },
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
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#d9534f",
    marginBottom: "20px",
  },
  card: {
    padding: "15px",
    border: "2px solid #ddd",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
    height: "100%",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  price: {
    color: "#d9534f",
    fontSize: "16px",
    fontWeight: "bold",
  },
  button: {
    background: "#d9534f",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  },
};

export default HomeGridVirtualized;

import { useState, useMemo, useEffect } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import iceCreams from "../data/iceCreams";

const CARD_WIDTH = 240;
const CARD_HEIGHT = 280;

function HomeGridVirtualized({ disableVirtualization = false, onEdit = null }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterTag, setFilterTag] = useState("All");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getColumnCount = () => {
    if (windowWidth >= 1200) return 4;
    if (windowWidth >= 768) return 2;
    return 1;
  };

  const COLUMN_COUNT = getColumnCount();
  const gridWidth = Math.min(windowWidth, COLUMN_COUNT * CARD_WIDTH);

  const filteredIceCreams = useMemo(() => {
    return iceCreams
      .filter((iceCream) => {
        const matchesSearch = iceCream.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === "All" || iceCream.category === filterCategory;
        const matchesTag = filterTag === "All" || iceCream.tags.includes(filterTag);
        return matchesSearch && matchesCategory && matchesTag;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "price") return a.price - b.price;
        return 0;
      });
  }, [searchTerm, sortBy, filterCategory, filterTag]);

  const rowCount = Math.ceil(filteredIceCreams.length / COLUMN_COUNT);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const itemIndex = rowIndex * COLUMN_COUNT + columnIndex;
    if (itemIndex >= filteredIceCreams.length) return null;
    const iceCream = filteredIceCreams[itemIndex];

    return (
      <div
        data-testid="ice-cream-card"
        style={{ ...style, padding: "10px", boxSizing: "border-box" }}
        onClick={() => onEdit && onEdit(iceCream)}
      >
        <div style={styles.card}>
          <img
            src={`${process.env.PUBLIC_URL}/images/${iceCream.image}`}
            alt={iceCream.name}
            style={styles.image}
          />
          <h3 style={styles.name}>{iceCream.name}</h3>
          <p style={styles.price}>{iceCream.price} KZT</p>
          <button
            style={styles.button}
            onClick={(e) => {
              e.stopPropagation(); 
              addToCart(iceCream);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <section style={styles.bannerSection}>
        <img
          src={`${process.env.PUBLIC_URL}/images/banner.jpg`}
          alt="Ice Cream Shop"
          style={styles.banner}
        />
        <div style={styles.bannerText}>
          <h2>Welcome to the Best Ice Cream Shop!</h2>
          <p>Enjoy the finest ice creams made with love 🍦</p>
          <button style={styles.exploreButton} onClick={() => navigate("/about")}>
            Learn More
          </button>
        </div>
      </section>

      <h2 style={styles.title}>🍨 Our Ice Creams 🍨</h2>

      <div style={styles.filterBar}>
        <input
          type="text"
          placeholder="🔍 Search ice cream..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={styles.select}
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={styles.select}
        >
          <option value="All">All Categories</option>
          <option value="Classic">Classic</option>
          <option value="Fruity">Fruity</option>
          <option value="Nutty">Nutty</option>
          <option value="Fresh">Fresh</option>
        </select>
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          style={styles.select}
        >
          <option value="All">All Tags</option>
          <option value="sweet">Sweet</option>
          <option value="basic">Basic</option>
          <option value="popular">Popular</option>
          <option value="fruity">Fruity</option>
          <option value="pink">Pink</option>
          <option value="minty">Minty</option>
          <option value="refreshing">Refreshing</option>
          <option value="nutty">Nutty</option>
          <option value="green">Green</option>
          <option value="tropical">Tropical</option>
        </select>
      </div>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {disableVirtualization ? (
          filteredIceCreams.map((iceCream, index) => (
            <div
              data-testid="ice-cream-card"
              key={index}
              style={{ padding: "10px" }}
              onClick={() => onEdit && onEdit(iceCream)}
            >
              <div style={styles.card}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/${iceCream.image}`}
                  alt={iceCream.name}
                  style={styles.image}
                />
                <h3 style={styles.name}>{iceCream.name}</h3>
                <p style={styles.price}>{iceCream.price} KZT</p>
                <button
                  style={styles.button}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(iceCream);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ overflowX: "auto" }}>
            <Grid
              columnCount={COLUMN_COUNT}
              columnWidth={CARD_WIDTH}
              height={600}
              rowCount={rowCount}
              rowHeight={CARD_HEIGHT}
              width={gridWidth}
            >
              {Cell}
            </Grid>
          </div>
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
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    transition: "background 0.3s",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#d9534f",
    marginBottom: "25px",
  },
  filterBar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "12px",
    padding: "16px",
    borderRadius: "16px",
    background: "#f8f9fa",
    boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
    marginBottom: "40px",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    minWidth: "240px",
    fontSize: "16px",
    transition: "all 0.3s ease",
    outline: "none",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  select: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    minWidth: "200px",
    fontSize: "16px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    outline: "none",
  },
  card: {
    padding: "15px",
    border: "1px solid #e3e3e3",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
    height: "100%",
    width: "100%",
    maxWidth: "240px",
    margin: "0 auto",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "8px 0",
  },
  price: {
    color: "#d9534f",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  button: {
    background: "#d9534f",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.3s",
  },
};

export default HomeGridVirtualized;

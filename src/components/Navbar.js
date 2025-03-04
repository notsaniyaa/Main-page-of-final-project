import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/about" style={styles.link}>About Us</Link>
      <Link to="/cart" style={styles.link}>Cart</Link>
      <a href="#contact" style={styles.link}>Contact Us</a>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    padding: "15px",
    background: "#ff6666",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "color 0.3s",
  },
};

export default Navbar;




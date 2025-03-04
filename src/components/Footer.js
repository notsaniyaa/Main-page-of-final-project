import { FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

function Footer() {
  return (
    <footer style={styles.footer} id="contact">
      <div style={styles.container}>
        <p style={styles.title}>© 2024 Ice Cream Shop</p>
        <div style={styles.socials}>
        <a href="https://instagram.com/icecream" target="_blank" rel="noopener noreferrer" style={styles.link}>
            <FaInstagram /> Instagram
          </a>
          <a href="mailto:temirkhanovasaniya@gmail.com" style={styles.link}>
            <FaEnvelope /> Gmail
          </a>
          <a href="tel:+77057062482" style={styles.link}>
            <FaPhone /> +7 (705) 706-2482
          </a>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: "center",
    padding: "20px",
    background: "#333",
    color: "white",
    marginTop: "20px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  socials: {
    marginTop: "10px",
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "16px",
  }
};

export default Footer;
